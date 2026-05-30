"""
Pydantic schemas for report history API.
"""

from __future__ import annotations

import json
from datetime import datetime
from typing import Any, Literal, Optional

from pydantic import BaseModel, Field, field_validator

Recommendation = Literal["Hire", "Hold", "Reject"]
SortOption = Literal["latest", "oldest", "highest", "lowest"]


class InterviewerFeedback(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    rating: Optional[float] = Field(None, ge=0, le=10)
    recommendation: Optional[Recommendation] = None
    notes: Optional[str] = Field(None, max_length=5000)


class ReportCreate(BaseModel):
    candidate_name: str = Field(..., min_length=1, max_length=200)
    role_applied: str = Field(..., min_length=1, max_length=200)
    experience_level: str = Field(..., min_length=1, max_length=120)
    department: str = Field(..., min_length=1, max_length=120)
    interview_date: str = Field(..., description="ISO date YYYY-MM-DD")
    interviewer_feedback: list[InterviewerFeedback] = Field(..., min_length=1)
    executive_summary: str = Field(..., min_length=1, max_length=10000)
    recommendation: Recommendation
    overall_score: float = Field(..., ge=0, le=10)
    strengths: str = Field(..., min_length=1, max_length=5000)
    concerns: str = Field(..., min_length=1, max_length=5000)
    risk_areas: str = Field(..., min_length=1, max_length=5000)
    next_round_focus: str = Field(..., min_length=1, max_length=5000)
    report_id: Optional[str] = Field(None, max_length=64)

    @field_validator("interview_date")
    @classmethod
    def validate_interview_date(cls, v: str) -> str:
        try:
            datetime.strptime(v[:10], "%Y-%m-%d")
        except ValueError as exc:
            raise ValueError("interview_date must be YYYY-MM-DD") from exc
        return v[:10]


class ReportUpdate(BaseModel):
    candidate_name: Optional[str] = Field(None, min_length=1, max_length=200)
    role_applied: Optional[str] = Field(None, min_length=1, max_length=200)
    experience_level: Optional[str] = Field(None, min_length=1, max_length=120)
    department: Optional[str] = Field(None, min_length=1, max_length=120)
    interview_date: Optional[str] = None
    interviewer_feedback: Optional[list[InterviewerFeedback]] = Field(
        None, min_length=1
    )
    executive_summary: Optional[str] = Field(None, min_length=1, max_length=10000)
    recommendation: Optional[Recommendation] = None
    overall_score: Optional[float] = Field(None, ge=0, le=10)
    strengths: Optional[str] = Field(None, min_length=1, max_length=5000)
    concerns: Optional[str] = Field(None, min_length=1, max_length=5000)
    risk_areas: Optional[str] = Field(None, min_length=1, max_length=5000)
    next_round_focus: Optional[str] = Field(None, min_length=1, max_length=5000)

    @field_validator("interview_date")
    @classmethod
    def validate_interview_date(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        try:
            datetime.strptime(v[:10], "%Y-%m-%d")
        except ValueError as exc:
            raise ValueError("interview_date must be YYYY-MM-DD") from exc
        return v[:10]


class ReportResponse(BaseModel):
    report_id: str
    candidate_name: str
    role_applied: str
    experience_level: str
    department: str
    interview_date: str
    interviewer_feedback: list[InterviewerFeedback]
    executive_summary: str
    recommendation: Recommendation
    overall_score: float
    strengths: str
    concerns: str
    risk_areas: str
    next_round_focus: str
    created_at: str


class ReportListResponse(BaseModel):
    items: list[ReportResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class ErrorResponse(BaseModel):
    detail: str


def row_to_response(row: Any) -> ReportResponse:
    feedback = json.loads(row["interviewer_feedback_json"])
    return ReportResponse(
        report_id=row["report_id"],
        candidate_name=row["candidate_name"],
        role_applied=row["role_applied"],
        experience_level=row["experience_level"],
        department=row["department"],
        interview_date=row["interview_date"],
        interviewer_feedback=feedback,
        executive_summary=row["executive_summary"],
        recommendation=row["recommendation"],
        overall_score=float(row["overall_score"]),
        strengths=row["strengths"],
        concerns=row["concerns"],
        risk_areas=row["risk_areas"],
        next_round_focus=row["next_round_focus"],
        created_at=row["created_at"],
    )
