export default function EmptyState({
  hasActiveFilters,
  onClearFilters,
  apiError,
  onRetry,
}) {
  if (apiError) {
    return (
      <div className="history-empty history-empty--error">
        <h3>Unable to load reports</h3>
        <p>{apiError}</p>
        <p className="history-empty-hint">
          Ensure the history API is running:{' '}
          <code>python -m modules.history.standalone_app</code> (port 8001)
        </p>
        {onRetry && (
          <button type="button" className="history-btn-new" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="history-empty">
      <h3>No reports found</h3>
      <p>
        {hasActiveFilters
          ? 'Try adjusting your search or filters to find interview reports.'
          : 'Generated reports will appear here once assessments are saved.'}
      </p>
      {hasActiveFilters && (
        <button type="button" className="history-btn-new" onClick={onClearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  )
}
