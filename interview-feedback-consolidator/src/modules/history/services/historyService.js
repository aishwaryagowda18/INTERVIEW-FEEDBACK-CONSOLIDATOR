/**
 * Report History API client.
 * Integrated app (main.py): http://localhost:8000
 * Standalone dev (standalone_app): set VITE_HISTORY_API_URL=http://localhost:8001
 */

const API_BASE =
  import.meta.env.VITE_HISTORY_API_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8000'

export class HistoryApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'HistoryApiError'
    this.status = status
  }
}

async function parseError(res) {
  try {
    const data = await res.json()
    if (data?.detail) {
      return typeof data.detail === 'string'
        ? data.detail
        : JSON.stringify(data.detail)
    }
  } catch {
    /* ignore */
  }
  return res.statusText || `Request failed (${res.status})`
}

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`
  let res
  try {
    res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
      ...options,
    })
  } catch {
    throw new HistoryApiError(
      `Cannot reach Report History API at ${API_BASE}.`,
      0
    )
  }

  if (res.status === 204) return null

  if (!res.ok) {
    const msg = await parseError(res)
    throw new HistoryApiError(msg, res.status)
  }

  return res.json()
}

function buildQuery(params) {
  const q = new URLSearchParams()
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '' && val !== 'All') {
      q.set(key, String(val))
    }
  })
  const s = q.toString()
  return s ? `?${s}` : ''
}

export const historyService = {
  baseUrl: API_BASE,

  /**
   * @param {object} params
   * @returns {Promise<{ items: object[], total: number, page: number, page_size: number, total_pages: number }>}
   */
  async listReports({
    search,
    recommendation,
    department,
    date_from,
    date_to,
    sort = 'latest',
    page = 1,
    page_size = 5,
  } = {}) {
    const query = buildQuery({
      search: search?.trim() || undefined,
      recommendation,
      department,
      date_from,
      date_to,
      sort,
      page,
      page_size,
    })
    return request(`/history/reports${query}`)
  },

  /**
   * @param {string} reportId
   * @returns {Promise<object>}
   */
  async getReport(reportId) {
    return request(`/history/reports/${encodeURIComponent(reportId)}`)
  },

  /**
   * @param {string} reportId
   */
  async deleteReport(reportId) {
    return request(`/history/reports/${encodeURIComponent(reportId)}`, {
      method: 'DELETE',
    })
  },

  /**
   * @param {object} payload — report_history create body
   */
  async createReport(payload) {
    return request('/history/reports', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
