import { useEffect } from 'react'

export default function HistoryToast({ message, type = 'error', onDismiss }) {
  useEffect(() => {
    if (!message) return undefined
    const t = setTimeout(() => onDismiss?.(), 4500)
    return () => clearTimeout(t)
  }, [message, onDismiss])

  if (!message) return null

  return (
    <div
      className={`history-toast history-toast--${type}`}
      role="status"
      aria-live="polite"
    >
      <span>{message}</span>
      <button
        type="button"
        className="history-toast-close"
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}
