import { buildHistoryPayload } from './buildHistoryPayload'
import { historyService } from '../services/historyService'

let lastDedupeKey = null

/**
 * POST /history/reports after successful AI generation.
 * Never throws — caller should still catch if desired.
 */
export async function saveReportToHistoryApi({
  candidate,
  interviewers,
  result,
  score,
  finalRecommendation,
}) {
  const built = buildHistoryPayload({
    candidate,
    interviewers,
    result,
    score,
    finalRecommendation,
  })

  const { _dedupeKey, ...payload } = built

  if (lastDedupeKey === _dedupeKey) {
    return null
  }

  const saved = await historyService.createReport(payload)
  lastDedupeKey = _dedupeKey
  return saved
}
