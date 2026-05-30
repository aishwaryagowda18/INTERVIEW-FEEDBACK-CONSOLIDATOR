"""
Sample report_history rows for development and demo (18 reports).
"""

from __future__ import annotations

import json


def _iv(name: str, rating: float, recommendation: str, notes: str) -> dict:
    return {
        "name": name,
        "rating": rating,
        "recommendation": recommendation,
        "notes": notes,
    }


def _feedback(pairs: list[tuple]) -> str:
    return json.dumps(
        [_iv(n, r, rec, notes) for n, r, rec, notes in pairs]
    )


def _row(
    report_id: str,
    candidate_name: str,
    role_applied: str,
    experience_level: str,
    department: str,
    interview_date: str,
    recommendation: str,
    overall_score: float,
    created_at: str,
    executive_summary: str,
    strengths: str,
    concerns: str,
    risk_areas: str,
    next_round_focus: str,
    interviewers: list[tuple],
) -> dict:
    return {
        "report_id": report_id,
        "candidate_name": candidate_name,
        "role_applied": role_applied,
        "experience_level": experience_level,
        "department": department,
        "interview_date": interview_date,
        "interviewer_feedback_json": _feedback(interviewers),
        "executive_summary": executive_summary,
        "recommendation": recommendation,
        "overall_score": overall_score,
        "strengths": strengths,
        "concerns": concerns,
        "risk_areas": risk_areas,
        "next_round_focus": next_round_focus,
        "created_at": created_at,
    }


SAMPLE_REPORTS = [
    _row(
        "rpt-001", "Priya Sharma", "Software Engineer", "Fresher / Entry Level",
        "Engineering", "2026-05-29", "Hire", 8.5, "2026-05-30T10:30:00",
        "Strong technical fundamentals and clear communication. Panel aligned on hire recommendation.",
        "Technical skills · Problem-solving", "None noted", "None identified", "Not applicable",
        [("Alex Chen", 8.5, "Hire", "Strong DSA and clean code."),
         ("Maria Lopez", 8.5, "Hire", "Great communication and culture fit.")],
    ),
    _row(
        "rpt-002", "Rahul Gupta", "Data Analyst", "1–2 Years",
        "Data & Analytics", "2026-05-28", "Hold", 6.2, "2026-05-29T14:15:00",
        "Solid analytical skills but mixed feedback on stakeholder communication.",
        "SQL · Data visualization", "Communication under pressure",
        "Medium — stakeholder management", "Case study presentation",
        [("Sam Patel", 6.0, "Hold", "Good SQL; needs polish on storytelling."),
         ("Jordan Lee", 6.4, "Hold", "Solid viz skills, hesitant under pressure.")],
    ),
    _row(
        "rpt-003", "Anamya Nair", "Product Manager", "3–5 Years",
        "Product", "2026-05-27", "Hire", 9.1, "2026-05-28T09:00:00",
        "Exceptional product sense and leadership examples. Unanimous hire.",
        "Strategy · Cross-functional leadership", "None noted", "None identified", "Offer discussion",
        [("Chris Wong", 9.0, "Hire", "Excellent prioritization framework."),
         ("Taylor Kim", 9.2, "Hire", "Strong leadership examples.")],
    ),
    _row(
        "rpt-004", "Vikram Kumar", "DevOps Engineer", "2–3 Years",
        "DevOps", "2026-05-26", "Reject", 4.3, "2026-05-27T16:45:00",
        "Gaps in CI/CD depth and incident response scenarios.",
        "Linux basics", "CI/CD · Incident handling", "High — production readiness", "Not applicable",
        [("Pat Rivera", 4.0, "Reject", "Weak CI/CD depth."),
         ("Jamie Fox", 4.6, "Reject", "Incident response gaps.")],
    ),
    _row(
        "rpt-005", "Sneha Reddy", "UX Designer", "2–3 Years",
        "Design", "2026-05-25", "Hire", 8.8, "2026-05-26T11:20:00",
        "Portfolio demonstrates strong user research and visual craft.",
        "UX research · Prototyping", "Low", "None identified", "Design challenge review",
        [("Riley Adams", 8.8, "Hire", "Portfolio shows strong research."),
         ("Casey Morgan", 8.7, "Hire", "Strong visual hierarchy in case studies.")],
    ),
    _row(
        "rpt-006", "Arjun Mehta", "Backend Engineer", "3–5 Years",
        "Engineering", "2026-05-24", "Hire", 7.9, "2026-05-25T15:00:00",
        "Solid system design and API experience. Minor concerns on documentation habits.",
        "System design · APIs", "Documentation", "Low", "Architecture deep-dive",
        [("Dana Brooks", 8.0, "Hire", "Strong API design examples."),
         ("Lee Park", 7.8, "Hire", "Good distributed systems intuition.")],
    ),
    _row(
        "rpt-007", "Kavya Iyer", "HR Business Partner", "5+ Years",
        "HR", "2026-05-23", "Hold", 6.8, "2026-05-24T10:10:00",
        "Strong HR ops background; panel split on strategic partnering examples.",
        "HR operations · Compliance", "Strategic partnering", "Medium", "Panel interview with leadership",
        [("Nina Shah", 7.0, "Hold", "Excellent compliance knowledge."),
         ("Omar Ali", 6.6, "Hold", "Limited executive partnering examples.")],
    ),
    _row(
        "rpt-008", "Rohan Desai", "Sales Executive", "1–2 Years",
        "Sales", "2026-05-22", "Reject", 5.1, "2026-05-23T13:30:00",
        "Below target on objection handling and pipeline management scenarios.",
        "Enthusiasm", "Objection handling · CRM usage", "High — quota attainment", "Not applicable",
        [("Mike Torres", 5.0, "Reject", "Struggled on objection handling role-play."),
         ("Sara Bell", 5.2, "Reject", "Pipeline management answers were vague.")],
    ),
    _row(
        "rpt-009", "Meera Joshi", "Frontend Engineer", "Fresher / Entry Level",
        "Engineering", "2026-05-21", "Hire", 8.2, "2026-05-22T09:45:00",
        "Impressive React fundamentals and eagerness to learn. Recommended for hire.",
        "React · CSS · Collaboration", "None noted", "None identified", "Team pairing session",
        [("Elena Ruiz", 8.3, "Hire", "Clean React component design."),
         ("Tom Wright", 8.1, "Hire", "Good CSS fundamentals and accessibility awareness.")],
    ),
    _row(
        "rpt-010", "Aditya Singh", "Machine Learning Engineer", "3–5 Years",
        "Data & Analytics", "2026-05-20", "Hire", 9.0, "2026-05-21T17:00:00",
        "Deep ML pipeline experience and clear explanation of trade-offs. Strong hire.",
        "ML pipelines · Python · MLOps", "None noted", "None identified", "Offer discussion",
        [("Dr. Kim", 9.1, "Hire", "Strong ML system design."),
         ("Ava Stone", 8.9, "Hire", "Clear on model monitoring and drift.")],
    ),
    _row(
        "rpt-011", "Divya Krishnan", "Product Designer", "1–2 Years",
        "Design", "2026-05-19", "Hold", 6.5, "2026-05-20T12:00:00",
        "Good visual design; needs stronger end-to-end case studies for senior IC track.",
        "Visual design · Figma", "Case study depth", "Medium", "Take-home design exercise",
        [("Jules Hart", 6.6, "Hold", "Strong visuals, thin research narrative."),
         ("Mo Chen", 6.4, "Hold", "Needs more end-to-end product stories.")],
    ),
    _row(
        "rpt-012", "Nikhil Verma", "Cloud Engineer", "2–3 Years",
        "DevOps", "2026-05-18", "Hire", 7.6, "2026-05-19T14:30:00",
        "AWS and Terraform experience aligns with team needs.",
        "AWS · Terraform · Monitoring", "Low", "Low", "Security review",
        [("Raj Nair", 7.7, "Hire", "Solid Terraform modules experience."),
         ("Flo Martin", 7.5, "Hire", "Good observability practices.")],
    ),
    _row(
        "rpt-013", "Pooja Malhotra", "Technical Program Manager", "5+ Years",
        "Product", "2026-05-17", "Hire", 8.7, "2026-05-18T11:00:00",
        "Demonstrated large-scale program delivery and stakeholder alignment.",
        "Program management · Communication", "None noted", "None identified", "Executive round",
        [("Greg Liu", 8.8, "Hire", "Led complex cross-team programs successfully."),
         ("Irene Cole", 8.6, "Hire", "Excellent stakeholder communication.")],
    ),
    _row(
        "rpt-014", "Karan Patel", "QA Engineer", "2–3 Years",
        "Engineering", "2026-05-16", "Reject", 4.8, "2026-05-17T16:20:00",
        "Limited automation experience and weak test strategy articulation.",
        "Manual testing basics", "Automation · Test strategy", "High", "Not applicable",
        [("Ben Cruz", 4.7, "Reject", "Weak test automation examples."),
         ("Amy Vo", 4.9, "Reject", "Test strategy answers lacked depth.")],
    ),
    _row(
        "rpt-015", "Ishita Banerjee", "Business Analyst", "1–2 Years",
        "Data & Analytics", "2026-05-15", "Hire", 7.4, "2026-05-16T10:00:00",
        "Clear requirements gathering examples and solid SQL. Recommended hire.",
        "Requirements · SQL · Documentation", "Low", "None identified", "Stakeholder interview",
        [("Helen Ortiz", 7.5, "Hire", "Strong requirements workshop example."),
         ("Jay Holt", 7.3, "Hire", "Solid SQL and documentation skills.")],
    ),
    _row(
        "rpt-016", "Varun Choudhary", "Solutions Architect", "5+ Years",
        "Engineering", "2026-05-14", "Hold", 7.1, "2026-05-15T13:45:00",
        "Strong architecture background; panel wants more client-facing examples.",
        "Architecture · Cloud", "Client-facing experience", "Medium",
        "Presentation to sales engineering",
        [("Victor Lane", 7.2, "Hold", "Strong cloud architecture depth."),
         ("Uma Das", 7.0, "Hold", "Needs more customer-facing war stories.")],
    ),
    _row(
        "rpt-017", "Lakshmi Rao", "Recruiter", "3–5 Years",
        "HR", "2026-05-13", "Hire", 8.0, "2026-05-14T09:30:00",
        "Strong sourcing track record and culture add. Hire recommended.",
        "Sourcing · ATS · Relationship building", "None noted", "None identified", "Team meet",
        [("Paula Grant", 8.1, "Hire", "Excellent sourcing metrics."),
         ("Rick Dean", 7.9, "Hire", "Strong candidate experience focus.")],
    ),
    _row(
        "rpt-018", "Harsh Trivedi", "Account Executive", "3–5 Years",
        "Sales", "2026-05-12", "Hire", 8.3, "2026-05-13T15:15:00",
        "Exceeded expectations on enterprise deal walkthrough and negotiation role-play.",
        "Enterprise sales · Negotiation", "None noted", "None identified", "Reference checks",
        [("Claire Moss", 8.4, "Hire", "Excellent enterprise deal walkthrough."),
         ("Dan Price", 8.2, "Hire", "Strong negotiation role-play.")],
    ),
]


def seed_reports(conn) -> int:
    """Insert sample rows that are not already present. Returns number inserted."""
    existing = {
        row[0]
        for row in conn.execute("SELECT report_id FROM report_history").fetchall()
    }
    inserted = 0
    for row in SAMPLE_REPORTS:
        if row["report_id"] in existing:
            continue
        try:
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
                row,
            )
            inserted += 1
        except Exception:
            pass
    conn.commit()
    return inserted


def seed_if_empty() -> int:
    """Ensure all demo seed reports exist (idempotent)."""
    from modules.history.models.history_model import get_connection, init_db

    init_db()
    with get_connection() as conn:
        return seed_reports(conn)
