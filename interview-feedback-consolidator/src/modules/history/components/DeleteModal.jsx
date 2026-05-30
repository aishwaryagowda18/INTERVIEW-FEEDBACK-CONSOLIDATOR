export default function DeleteModal({
  report,
  onCancel,
  onConfirm,
  deleting = false,
}) {
  if (!report) return null

  return (
    <div
      className="history-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={deleting ? undefined : onCancel}
    >
      <div className="history-modal" onClick={(e) => e.stopPropagation()}>
        <h3 id="delete-modal-title">Delete report?</h3>
        <p>
          Are you sure you want to delete the report for{' '}
          <strong>{report.candidate_name}</strong>? This cannot be undone.
        </p>
        <div className="history-modal-actions">
          <button
            type="button"
            className="history-modal-btn history-modal-btn--cancel"
            onClick={onCancel}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="history-modal-btn history-modal-btn--danger"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
