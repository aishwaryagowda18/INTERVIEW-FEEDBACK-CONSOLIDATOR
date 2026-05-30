import HistoryHeader from '../components/HistoryHeader'
import FilterSection from '../components/FilterSection'
import ReportCard from '../components/ReportCard'
import EmptyState from '../components/EmptyState'
import Pagination from '../components/Pagination'
import DeleteModal from '../components/DeleteModal'
import HistoryToast from '../components/HistoryToast'
import { useHistory } from '../hooks/useHistory'

function downloadReportJson(report) {
  const blob = new Blob([JSON.stringify(report, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${report.candidate_name.replace(/\s+/g, '_')}_report.json`
  a.click()
  URL.revokeObjectURL(url)
}

export default function HistoryPage({
  embedded = false,
  onViewReport,
  onNewAssessment,
}) {
  const {
    reports,
    totalCount,
    totalPages,
    page,
    setPage,
    loading,
    apiError,
    retry,
    search,
    setSearch,
    recommendation,
    setRecommendation,
    department,
    setDepartment,
    dateStart,
    setDateStart,
    dateEnd,
    setDateEnd,
    sortBy,
    setSortBy,
    clearFilters,
    hasActiveFilters,
    deleteTarget,
    setDeleteTarget,
    confirmDelete,
    deleting,
    isEmpty,
    toast,
    dismissToast,
  } = useHistory()

  const showList = !loading && !apiError && !isEmpty

  return (
    <div className={embedded ? 'history-embedded' : 'history-app'}>
      {!embedded && <HistoryHeader />}

      <HistoryToast
        message={toast.message}
        type={toast.type}
        onDismiss={dismissToast}
      />

      <main className="history-main">
        <div className="history-page-top">
          <div>
            <h1>Report History</h1>
            <p>View, search and manage generated interview reports.</p>
          </div>
          <button
            type="button"
            className="history-btn-new"
            onClick={() => onNewAssessment?.()}
          >
            <span aria-hidden>+</span>
            New Assessment
          </button>
        </div>

        <FilterSection
          search={search}
          onSearchChange={setSearch}
          recommendation={recommendation}
          onRecommendationChange={setRecommendation}
          department={department}
          onDepartmentChange={setDepartment}
          dateStart={dateStart}
          onDateStartChange={setDateStart}
          dateEnd={dateEnd}
          onDateEndChange={setDateEnd}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={clearFilters}
        />

        <p className="history-total">
          Total Reports: <strong>{loading ? '—' : totalCount}</strong>
        </p>

        {loading ? (
          <div className="history-loading" aria-live="polite">
            <div className="history-spinner" />
            <p>Loading reports…</p>
          </div>
        ) : apiError || isEmpty ? (
          <EmptyState
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            apiError={apiError}
            onRetry={retry}
          />
        ) : null}

        {showList && (
          <>
            <div className="history-list">
              {reports.map((report) => (
                <ReportCard
                  key={report.report_id}
                  report={report}
                  onView={() => onViewReport?.(report.report_id)}
                  onDownload={downloadReportJson}
                  onEdit={() => {
                    window.alert(
                      `Edit Feedback for ${report.candidate_name} — available after main app integration.`
                    )
                  }}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </main>

      <DeleteModal
        report={deleteTarget}
        onCancel={() => !deleting && setDeleteTarget(null)}
        onConfirm={confirmDelete}
        deleting={deleting}
      />
    </div>
  )
}
