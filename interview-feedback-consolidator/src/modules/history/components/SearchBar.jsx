export default function SearchBar({ value, onChange }) {
  return (
    <div className="history-field history-field-grow">
      <label htmlFor="history-search">Search</label>
      <div className="history-search-wrap">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M20 20L16 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          id="history-search"
          type="search"
          className="history-input"
          placeholder="Search by candidate name, role..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
