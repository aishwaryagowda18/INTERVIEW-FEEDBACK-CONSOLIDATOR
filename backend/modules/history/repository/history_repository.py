"""
Data access for report_history table.
"""

from __future__ import annotations

import json
import sqlite3
import uuid
from datetime import datetime, timezone
from typing import Any, Optional

from modules.history.models.history_model import get_connection
from modules.history.schemas.history_schema import ReportCreate, ReportUpdate


def _now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def _feedback_to_json(feedback: list) -> str:
    return json.dumps([f.model_dump() for f in feedback])


class ReportNotFoundError(Exception):
    def __init__(self, report_id: str):
        self.report_id = report_id
        super().__init__(f"Report '{report_id}' not found")


class ReportAlreadyExistsError(Exception):
    def __init__(self, report_id: str):
        self.report_id = report_id
        super().__init__(f"Report '{report_id}' already exists")


def _find_duplicate(conn: sqlite3.Connection, data: ReportCreate) -> sqlite3.Row | None:
    """Lightweight dedupe: same candidate + interview + role + verdict + score."""
    return conn.execute(
        """
        SELECT * FROM report_history
        WHERE LOWER(candidate_name) = LOWER(?)
          AND interview_date = ?
          AND LOWER(role_applied) = LOWER(?)
          AND recommendation = ?
          AND ABS(overall_score - ?) < 0.01
        ORDER BY created_at DESC
        LIMIT 1
        """,
        (
            data.candidate_name,
            data.interview_date,
            data.role_applied,
            data.recommendation,
            data.overall_score,
        ),
    ).fetchone()


def create_report(data: ReportCreate) -> sqlite3.Row:
    if data.report_id:
        with get_connection() as conn:
            existing = conn.execute(
                "SELECT report_id FROM report_history WHERE report_id = ?",
                (data.report_id,),
            ).fetchone()
            if existing:
                raise ReportAlreadyExistsError(data.report_id)

    with get_connection() as conn:
        duplicate = _find_duplicate(conn, data)
        if duplicate is not None:
            return duplicate

    report_id = data.report_id or f"rpt-{uuid.uuid4().hex[:12]}"
    created_at = _now_iso()

    row_data = {
        "report_id": report_id,
        "candidate_name": data.candidate_name,
        "role_applied": data.role_applied,
        "experience_level": data.experience_level,
        "department": data.department,
        "interview_date": data.interview_date,
        "interviewer_feedback_json": _feedback_to_json(data.interviewer_feedback),
        "executive_summary": data.executive_summary,
        "recommendation": data.recommendation,
        "overall_score": data.overall_score,
        "strengths": data.strengths,
        "concerns": data.concerns,
        "risk_areas": data.risk_areas,
        "next_round_focus": data.next_round_focus,
        "created_at": created_at,
    }

    try:
        with get_connection() as conn:
            conn.execute(
                """
                INSERT INTO report_history (
                    report_id, candidate_name, role_applied, experience_level,
                    department, interview_date, interviewer_feedback_json,
                    executive_summary, recommendation, overall_score,
                    strengths, concerns, risk_areas, next_round_focus, created_at
                ) VALUES (
                    :report_id, :candidate_name, :role_applied, :experience_level,
                    :department, :interview_date, :interviewer_feedback_json,
                    :executive_summary, :recommendation, :overall_score,
                    :strengths, :concerns, :risk_areas, :next_round_focus, :created_at
                )
                """,
                row_data,
            )
            conn.commit()
            return get_by_id(conn, report_id)
    except sqlite3.IntegrityError as exc:
        raise ReportAlreadyExistsError(report_id) from exc


def get_by_id_conn(conn: sqlite3.Connection, report_id: str) -> sqlite3.Row:
    row = conn.execute(
        "SELECT * FROM report_history WHERE report_id = ?",
        (report_id,),
    ).fetchone()
    if row is None:
        raise ReportNotFoundError(report_id)
    return row


def get_by_id(conn: sqlite3.Connection | None, report_id: str) -> sqlite3.Row:
    if conn is not None:
        return get_by_id_conn(conn, report_id)
    with get_connection() as c:
        return get_by_id_conn(c, report_id)


def list_reports(
    *,
    search: Optional[str] = None,
    recommendation: Optional[str] = None,
    department: Optional[str] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    sort: str = "latest",
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[sqlite3.Row], int]:
    conditions: list[str] = []
    params: list[Any] = []

    if search:
        q = f"%{search.strip().lower()}%"
        conditions.append(
            "(LOWER(candidate_name) LIKE ? OR LOWER(role_applied) LIKE ? "
            "OR LOWER(department) LIKE ?)"
        )
        params.extend([q, q, q])

    if recommendation and recommendation != "All":
        conditions.append("recommendation = ?")
        params.append(recommendation)

    if department and department != "All":
        conditions.append("department = ?")
        params.append(department)

    if date_from:
        conditions.append("interview_date >= ?")
        params.append(date_from[:10])

    if date_to:
        conditions.append("interview_date <= ?")
        params.append(date_to[:10])

    where = f"WHERE {' AND '.join(conditions)}" if conditions else ""

    sort_map = {
        "latest": "created_at DESC",
        "oldest": "created_at ASC",
        "highest": "overall_score DESC",
        "lowest": "overall_score ASC",
    }
    order = sort_map.get(sort, sort_map["latest"])

    page = max(1, page)
    page_size = min(max(1, page_size), 100)
    offset = (page - 1) * page_size

    with get_connection() as conn:
        count_row = conn.execute(
            f"SELECT COUNT(*) AS c FROM report_history {where}",
            params,
        ).fetchone()
        total = int(count_row["c"])

        rows = conn.execute(
            f"""
            SELECT * FROM report_history
            {where}
            ORDER BY {order}
            LIMIT ? OFFSET ?
            """,
            [*params, page_size, offset],
        ).fetchall()

    return rows, total


def update_report(report_id: str, data: ReportUpdate) -> sqlite3.Row:
    updates = data.model_dump(exclude_unset=True)
    if not updates:
        return get_by_id(None, report_id)

    if "interviewer_feedback" in updates:
        updates["interviewer_feedback_json"] = json.dumps(
            [f.model_dump() for f in updates.pop("interviewer_feedback")]
        )

    column_map = {
        "candidate_name": "candidate_name",
        "role_applied": "role_applied",
        "experience_level": "experience_level",
        "department": "department",
        "interview_date": "interview_date",
        "interviewer_feedback_json": "interviewer_feedback_json",
        "executive_summary": "executive_summary",
        "recommendation": "recommendation",
        "overall_score": "overall_score",
        "strengths": "strengths",
        "concerns": "concerns",
        "risk_areas": "risk_areas",
        "next_round_focus": "next_round_focus",
    }

    set_parts = []
    values = []
    for key, val in updates.items():
        col = column_map.get(key)
        if col:
            set_parts.append(f"{col} = ?")
            values.append(val)

    if not set_parts:
        return get_by_id(None, report_id)

    values.append(report_id)

    with get_connection() as conn:
        cur = conn.execute(
            f"UPDATE report_history SET {', '.join(set_parts)} WHERE report_id = ?",
            values,
        )
        conn.commit()
        if cur.rowcount == 0:
            raise ReportNotFoundError(report_id)
        return get_by_id_conn(conn, report_id)


def delete_report(report_id: str) -> None:
    with get_connection() as conn:
        cur = conn.execute(
            "DELETE FROM report_history WHERE report_id = ?",
            (report_id,),
        )
        conn.commit()
        if cur.rowcount == 0:
            raise ReportNotFoundError(report_id)
