import { useCallback, useEffect, useRef, useState } from 'react'
import { historyService, HistoryApiError } from '../services/historyService'

const PAGE_SIZE = 5
const SEARCH_DEBOUNCE_MS = 400

export function useHistory() {
  const [reports, setReports] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [recommendation, setRecommendation] = useState('All')
  const [department, setDepartment] = useState('All')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState({ message: '', type: 'error' })

  const fetchIdRef = useRef(0)

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type })
  }, [])

  const dismissToast = useCallback(() => {
    setToast({ message: '', type: 'error' })
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, recommendation, department, dateStart, dateEnd, sortBy])

  const fetchReports = useCallback(async () => {
    const id = ++fetchIdRef.current
    setLoading(true)
    setApiError(null)

    try {
      const data = await historyService.listReports({
        search: debouncedSearch,
        recommendation,
        department,
        date_from: dateStart || undefined,
        date_to: dateEnd || undefined,
        sort: sortBy,
        page,
        page_size: PAGE_SIZE,
      })

      if (id !== fetchIdRef.current) return

      setReports(data.items || [])
      setTotalCount(data.total ?? 0)
      setTotalPages(data.total_pages ?? 1)
    } catch (err) {
      if (id !== fetchIdRef.current) return

      setReports([])
      setTotalCount(0)
      setTotalPages(1)

      const message =
        err instanceof HistoryApiError
          ? err.message
          : 'Failed to load reports.'

      setApiError(message)
      showToast(message, 'error')
    } finally {
      if (id === fetchIdRef.current) setLoading(false)
    }
  }, [
    debouncedSearch,
    recommendation,
    department,
    dateStart,
    dateEnd,
    sortBy,
    page,
    showToast,
  ])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  const clearFilters = useCallback(() => {
    setSearch('')
    setDebouncedSearch('')
    setRecommendation('All')
    setDepartment('All')
    setDateStart('')
    setDateEnd('')
    setSortBy('latest')
    setPage(1)
  }, [])

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget || deleting) return

    setDeleting(true)
    try {
      await historyService.deleteReport(deleteTarget.report_id)
      setDeleteTarget(null)
      showToast(
        `Report for ${deleteTarget.candidate_name} deleted.`,
        'success'
      )
      await fetchReports()
    } catch (err) {
      const message =
        err instanceof HistoryApiError
          ? err.message
          : 'Failed to delete report.'
      showToast(message, 'error')
    } finally {
      setDeleting(false)
    }
  }, [deleteTarget, deleting, fetchReports, showToast])

  const hasActiveFilters =
    search.trim() !== '' ||
    recommendation !== 'All' ||
    department !== 'All' ||
    dateStart !== '' ||
    dateEnd !== ''

  const isEmpty = !loading && !apiError && totalCount === 0

  return {
    reports,
    totalCount,
    totalPages,
    page,
    setPage,
    loading,
    apiError,
    retry: fetchReports,
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
  }
}
