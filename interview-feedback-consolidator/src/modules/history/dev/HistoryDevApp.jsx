import { useState } from 'react'
import HistoryPage from '../pages/HistoryPage'
import ReportDetailsPage from '../pages/ReportDetailsPage'
import HistoryToast from '../components/HistoryToast'
import { useReportDetail } from '../hooks/useReportDetail'
import '../styles/history.css'

function ReportDetailsView({ reportId, onBack }) {
  const { report, loading, error, retry } = useReportDetail(reportId)

  if (loading) {
    return (
      <div className="history-app">
        <div className="history-loading" style={{ minHeight: '60vh' }}>
          <div className="history-spinner" />
          <p>Loading report…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="history-app">
        <HistoryToast message={error} type="error" onDismiss={onBack} />
        <main className="history-main">
          <button type="button" className="history-details-back" onClick={onBack}>
            ← Back to Report History
          </button>
          <div className="history-empty history-empty--error">
            <h3>Unable to load report</h3>
            <p>{error}</p>
            <button type="button" className="history-btn-new" onClick={retry}>
              Retry
            </button>
          </div>
        </main>
      </div>
    )
  }

  return <ReportDetailsPage report={report} onBack={onBack} />
}

/**
 * Standalone dev shell — previews Report History without App.jsx.
 */
export default function HistoryDevApp() {
  const [selectedReportId, setSelectedReportId] = useState(null)

  if (selectedReportId) {
    return (
      <ReportDetailsView
        reportId={selectedReportId}
        onBack={() => setSelectedReportId(null)}
      />
    )
  }

  return (
    <HistoryPage
      onViewReport={setSelectedReportId}
      onNewAssessment={() => {
        window.alert(
          'New Assessment — will navigate to main flow after integration.'
        )
      }}
    />
  )
}
