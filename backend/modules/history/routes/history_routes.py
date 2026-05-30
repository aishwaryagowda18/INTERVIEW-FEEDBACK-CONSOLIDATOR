"""
FastAPI router for /history/reports endpoints.
"""

from __future__ import annotations

from typing import Optional

from fastapi import APIRouter, HTTPException, Query, status

from modules.history.repository.history_repository import (
    ReportAlreadyExistsError,
    ReportNotFoundError,
)
from modules.history.schemas.history_schema import (
    ErrorResponse,
    ReportCreate,
    ReportListResponse,
    ReportResponse,
    ReportUpdate,
    SortOption,
)
from modules.history.services import history_service as service

router = APIRouter(prefix="/reports", tags=["Report History"])


@router.post(
    "",
    response_model=ReportResponse,
    status_code=status.HTTP_201_CREATED,
    responses={409: {"model": ErrorResponse}},
)
def create_report(body: ReportCreate):
    try:
        return service.create_report(body)
    except ReportAlreadyExistsError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc


@router.get("", response_model=ReportListResponse)
def list_reports(
    search: Optional[str] = Query(None, max_length=200),
    recommendation: Optional[str] = Query(None),
    department: Optional[str] = Query(None),
    date_from: Optional[str] = Query(None, description="Interview date from YYYY-MM-DD"),
    date_to: Optional[str] = Query(None, description="Interview date to YYYY-MM-DD"),
    sort: SortOption = Query("latest"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
):
    return service.list_reports(
        search=search,
        recommendation=recommendation,
        department=department,
        date_from=date_from,
        date_to=date_to,
        sort=sort,
        page=page,
        page_size=page_size,
    )


@router.get(
    "/{report_id}",
    response_model=ReportResponse,
    responses={404: {"model": ErrorResponse}},
)
def get_report(report_id: str):
    try:
        return service.get_report(report_id)
    except ReportNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


@router.put(
    "/{report_id}",
    response_model=ReportResponse,
    responses={404: {"model": ErrorResponse}},
)
def update_report(report_id: str, body: ReportUpdate):
    if not body.model_dump(exclude_unset=True):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least one field must be provided for update",
        )
    try:
        return service.update_report(report_id, body)
    except ReportNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


@router.delete(
    "/{report_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={404: {"model": ErrorResponse}},
)
def delete_report(report_id: str):
    try:
        service.delete_report(report_id)
    except ReportNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
