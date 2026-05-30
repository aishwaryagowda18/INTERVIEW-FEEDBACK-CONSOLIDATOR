export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) pages.push(i)

  return (
    <nav className="history-pagination" aria-label="Report history pagination">
      <button
        type="button"
        className="history-page-btn"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        ←
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`history-page-btn ${p === page ? 'is-active' : ''}`}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        className="history-page-btn"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  )
}
