import HistoryHeader from '../components/HistoryHeader'
import {
  formatInterviewDate,
  formatGeneratedAt,
  recommendationClass,
} from '../utils/format'

export default function ReportDetailsPage({ report, onBack, embedded = false }) {
  if (!report) return null

  const recClass = recommendationClass(report.recommendation)

  return (
    <div className={embedded ? 'history-embedded' : 'history-app'}>
      {!embedded && <HistoryHeader />}

      <main className="history-main">
        <button type="button" className="history-details-back" onClick={onBack}>
          ← Back to Report History
        </button>

        <div className="history-details-hero">
          <p style={{ fontSize: 13, color: '#f97316', marginBottom: 8 }}>
            Consolidated Hiring Report
          </p>
          <h2>{report.candidate_name}</h2>
          <p className="sub">
            {report.role_applied} · {report.experience_level} ·{' '}
            {report.department} · {formatInterviewDate(report.interview_date)}
          </p>
          <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            {report.overall_score}/10 —{' '}
            <span className={`history-badge history-badge--${recClass}`}>
              {report.recommendation}
            </span>
          </p>
          <p className="sub" style={{ marginTop: 12 }}>
            Generated {formatGeneratedAt(report.created_at)}
          </p>
        </div>

        <div className="history-details-card">
          <h4>Executive Summary</h4>
          <p>{report.executive_summary}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <div className="history-details-card">
            <h4>Strengths</h4>
            <p>{report.strengths}</p>
          </div>
          <div className="history-details-card">
            <h4>Concerns</h4>
            <p>{report.concerns}</p>
          </div>
          <div className="history-details-card">
            <h4>Risk Areas</h4>
            <p>{report.risk_areas}</p>
          </div>
          <div className="history-details-card">
            <h4>Next Round Focus</h4>
            <p>{report.next_round_focus}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
