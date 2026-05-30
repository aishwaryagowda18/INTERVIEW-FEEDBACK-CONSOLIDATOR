"""
Standalone SQLite database for Report History module only.
"""

from __future__ import annotations

import sqlite3
from pathlib import Path

HISTORY_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = HISTORY_DIR / "data"
DB_PATH = DATA_DIR / "hireinsight_history.db"

CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS report_history (
    report_id TEXT PRIMARY KEY,
    candidate_name TEXT NOT NULL,
    role_applied TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    department TEXT NOT NULL,
    interview_date TEXT NOT NULL,
    interviewer_feedback_json TEXT NOT NULL,
    executive_summary TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    overall_score REAL NOT NULL,
    strengths TEXT NOT NULL,
    concerns TEXT NOT NULL,
    risk_areas TEXT NOT NULL,
    next_round_focus TEXT NOT NULL,
    created_at TEXT NOT NULL
);
"""

CREATE_INDEXES_SQL = [
    "CREATE INDEX IF NOT EXISTS idx_report_created_at ON report_history(created_at);",
    "CREATE INDEX IF NOT EXISTS idx_report_recommendation ON report_history(recommendation);",
    "CREATE INDEX IF NOT EXISTS idx_report_department ON report_history(department);",
    "CREATE INDEX IF NOT EXISTS idx_report_interview_date ON report_history(interview_date);",
    "CREATE INDEX IF NOT EXISTS idx_report_dedupe ON report_history("
    "candidate_name, interview_date, role_applied, recommendation, overall_score);",
]


def get_connection() -> sqlite3.Connection:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn


def init_db() -> None:
    with get_connection() as conn:
        conn.execute(CREATE_TABLE_SQL)
        for stmt in CREATE_INDEXES_SQL:
            conn.execute(stmt)
        conn.commit()


def table_is_empty() -> bool:
    with get_connection() as conn:
        row = conn.execute("SELECT COUNT(*) AS c FROM report_history").fetchone()
        return int(row["c"]) == 0
