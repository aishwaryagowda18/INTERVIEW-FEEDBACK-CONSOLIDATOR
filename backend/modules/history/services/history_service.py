"""
Business logic for report history.
"""

from __future__ import annotations

import math
from typing import Optional

from modules.history.repository import history_repository as repo
from modules.history.schemas.history_schema import (
    ReportCreate,
    ReportListResponse,
    ReportResponse,
    ReportUpdate,
    row_to_response,
)


def create_report(data: ReportCreate) -> ReportResponse:
    row = repo.create_report(data)
    return row_to_response(row)


def get_report(report_id: str) -> ReportResponse:
    row = repo.get_by_id(None, report_id)
    return row_to_response(row)


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
) -> ReportListResponse:
    rows, total = repo.list_reports(
        search=search,
        recommendation=recommendation,
        department=department,
        date_from=date_from,
        date_to=date_to,
        sort=sort,
        page=page,
        page_size=page_size,
    )
    total_pages = max(1, math.ceil(total / page_size)) if total else 1
    return ReportListResponse(
        items=[row_to_response(r) for r in rows],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


def update_report(report_id: str, data: ReportUpdate) -> ReportResponse:
    row = repo.update_report(report_id, data)
    return row_to_response(row)


def delete_report(report_id: str) -> None:
    repo.delete_report(report_id)
