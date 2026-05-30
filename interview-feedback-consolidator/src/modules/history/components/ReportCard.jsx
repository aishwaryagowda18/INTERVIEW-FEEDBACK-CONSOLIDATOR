import {
  getInitials,
  formatInterviewDate,
  formatGeneratedAt,
  recommendationClass,
  avatarColorIndex,
} from '../utils/format'

function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function IconStar({ className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export default function ReportCard({
  report,
  onView,
  onDownload,
  onEdit,
  onDelete,
}) {
  const recClass = recommendationClass(report.recommendation)
  const colorIdx = avatarColorIndex(report.report_id)

  return (
    <article className="history-card">
      <div
        className={`history-avatar history-avatar--${colorIdx}`}
        aria-hidden
      >
        {getInitials(report.candidate_name)}
      </div>

      <div className="history-candidate">
        <h3>{report.candidate_name}</h3>
        <p className="role">{report.role_applied}</p>
        <span className="history-exp">
          <IconBriefcase />
          {report.experience_level}
        </span>
      </div>

      <div className="history-meta">
        <div className="history-meta-label">
          <IconCalendar />
          Interview Date
        </div>
        <div className="history-meta-value">
          {formatInterviewDate(report.interview_date)}
        </div>
      </div>

      <div className="history-meta">
        <div className="history-meta-label">Recommendation</div>
        <span className={`history-badge history-badge--${recClass}`}>
          {report.recommendation}
        </span>
      </div>

      <div className="history-meta">
        <div className="history-meta-label">Overall Score</div>
        <div className={`history-score history-score--${recClass}`}>
          <IconStar />
          {report.overall_score} / 10
        </div>
      </div>

      <div className="history-meta">
        <div className="history-meta-label">
          <IconClock />
          Generated On
        </div>
        <div className="history-meta-value">
          {formatGeneratedAt(report.created_at)}
        </div>
      </div>

      <div className="history-actions">
        <button
          type="button"
          className="history-action-btn history-action-btn--view"
          onClick={() => onView(report)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          </svg>
          View Report
        </button>
        <button
          type="button"
          className="history-action-btn history-action-btn--download"
          onClick={() => onDownload(report)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 3v12M7 10l5 5 5-5M4 21h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Download
        </button>
        <button
          type="button"
          className="history-action-btn history-action-btn--edit"
          onClick={() => onEdit(report)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Edit Feedback
        </button>
        <button
          type="button"
          className="history-action-btn history-action-btn--delete"
          onClick={() => onDelete(report)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Delete
        </button>
      </div>
    </article>
  )
}
