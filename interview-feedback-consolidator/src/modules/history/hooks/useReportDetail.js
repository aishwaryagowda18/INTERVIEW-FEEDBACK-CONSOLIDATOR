import { useCallback, useEffect, useState } from 'react'
import { historyService, HistoryApiError } from '../services/historyService'

export function useReportDetail(reportId) {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(Boolean(reportId))
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!reportId) return
    setLoading(true)
    setError(null)
    try {
      const data = await historyService.getReport(reportId)
      setReport(data)
    } catch (err) {
      setReport(null)
      setError(
        err instanceof HistoryApiError
          ? err.message
          : 'Failed to load report details.'
      )
    } finally {
      setLoading(false)
    }
  }, [reportId])

  useEffect(() => {
    load()
  }, [load])

  return { report, loading, error, retry: load }
}
