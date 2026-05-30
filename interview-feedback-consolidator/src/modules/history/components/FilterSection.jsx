import SearchBar from './SearchBar'
import { DEPARTMENTS } from '../mock/mockReports'

const RECOMMENDATIONS = ['All', 'Hire', 'Hold', 'Reject']

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'highest', label: 'Highest Score' },
  { value: 'lowest', label: 'Lowest Score' },
]

export default function FilterSection({
  search,
  onSearchChange,
  recommendation,
  onRecommendationChange,
  department,
  onDepartmentChange,
  dateStart,
  onDateStartChange,
  dateEnd,
  onDateEndChange,
  sortBy,
  onSortChange,
  onClearFilters,
}) {
  return (
    <div className="history-filters">
      <div className="history-filters-row">
        <SearchBar value={search} onChange={onSearchChange} />

        <div className="history-field history-field-sm">
          <label htmlFor="history-rec">Recommendation</label>
          <select
            id="history-rec"
            className="history-select"
            value={recommendation}
            onChange={(e) => onRecommendationChange(e.target.value)}
          >
            {RECOMMENDATIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="history-field history-field-md">
          <label htmlFor="history-dept">Department</label>
          <select
            id="history-dept"
            className="history-select"
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="history-field">
          <label>Date Range</label>
          <div className="history-date-range">
            <input
              type="date"
              className="history-input"
              value={dateStart}
              onChange={(e) => onDateStartChange(e.target.value)}
              aria-label="Interview date from"
            />
            <span style={{ color: '#94a3b8' }}>–</span>
            <input
              type="date"
              className="history-input"
              value={dateEnd}
              onChange={(e) => onDateEndChange(e.target.value)}
              aria-label="Interview date to"
            />
          </div>
        </div>

        <div className="history-field history-field-md">
          <label htmlFor="history-sort">Sort By</label>
          <select
            id="history-sort"
            className="history-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="history-btn-clear"
          onClick={onClearFilters}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 4v5h5M20 20v-5h-5M20 9A8 8 0 0 0 5.5 6.5M4 15a8 8 0 0 0 14.5 2.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Clear Filters
        </button>
      </div>
    </div>
  )
}
