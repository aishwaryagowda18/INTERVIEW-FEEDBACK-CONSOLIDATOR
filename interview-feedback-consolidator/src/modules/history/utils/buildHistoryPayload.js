/**
 * Map assessment data (same sources as ResultReport) → POST /history/reports body.
 */

function mapRecommendation(panelRecommendation) {
  const r = (panelRecommendation || '').toLowerCase()
  if (r.includes('no hire') || r.includes('reject')) return 'Reject'
  if (r.includes('hold') || r.includes('defer') || r.includes('reservation')) {
    return 'Hold'
  }
  if (r.includes('hire')) return 'Hire'
  return 'Hold'
}

function mapInterviewerRecommendation(rec) {
  const r = (rec || '').toLowerCase()
  if (r.includes('no hire') || r.includes('reject')) return 'Reject'
  if (r.includes('hold') || r.includes('defer') || r.includes('reservation')) {
    return 'Hold'
  }
  if (r.includes('hire')) return 'Hire'
  return undefined
}

function formatInterviewDate(dateStr) {
  if (!dateStr) return new Date().toISOString().slice(0, 10)
  const d = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T00:00:00`)
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10)
  return d.toISOString().slice(0, 10)
}

function formatStrengths(strengths = []) {
  if (!strengths.length) return 'None noted'
  return strengths
    .map((s) => {
      const freq = s.frequency ? ` (${s.frequency})` : ''
      return `${s.point || s}${freq}`
    })
    .join(' · ')
}

function formatConcerns(concerns = []) {
  if (!concerns.length) return 'None noted'
  return concerns
    .map((c) => `${c.point || c}${c.severity ? ` — ${c.severity}` : ''}`)
    .join(' · ')
}

function formatRiskAreas(riskAreas = []) {
  if (!riskAreas.length) return 'None identified'
  return riskAreas
    .map((rk) => `${rk.area || ''}: ${rk.description || ''}`.trim())
    .join(' · ')
}

function formatNextRound(nextRoundFocus = []) {
  if (!nextRoundFocus.length) return 'Not applicable'
  return nextRoundFocus
    .map((n) => n.focus || n.notes || JSON.stringify(n))
    .join(' · ')
}

export function buildHistoryPayload({
  candidate = {},
  interviewers = [],
  result = {},
  score = 0,
  finalRecommendation = 'Hold',
}) {
  const apiRecommendation = mapRecommendation(finalRecommendation)

  const interviewer_feedback = interviewers
    .filter((iv) => iv.name?.trim())
    .map((iv) => ({
      name: iv.name.trim(),
      rating: Number(iv.rating) || undefined,
      recommendation: mapInterviewerRecommendation(iv.recommendation),
      notes: [
        iv.overallImpression,
        iv.technicalSkills && `Technical: ${iv.technicalSkills}`,
        iv.communication && `Communication: ${iv.communication}`,
      ]
        .filter(Boolean)
        .join('\n'),
    }))

  if (interviewer_feedback.length === 0) {
    interviewer_feedback.push({
      name: 'Panel',
      rating: score || undefined,
      recommendation: apiRecommendation,
      notes: 'Consolidated feedback',
    })
  }

  const payload = {
    candidate_name: candidate.name?.trim() || 'Unknown Candidate',
    role_applied: candidate.role?.trim() || 'Role not specified',
    experience_level: candidate.level?.trim() || 'Not specified',
    department: candidate.department?.trim() || 'General',
    interview_date: formatInterviewDate(candidate.date),
    interviewer_feedback,
    executive_summary:
      result.summary?.trim() ||
      result.recommendationRationale?.trim() ||
      'AI consolidated hiring report.',
    recommendation: apiRecommendation,
    overall_score: Math.min(10, Math.max(0, Number(score) || 0)),
    strengths: formatStrengths(result.strengths),
    concerns: formatConcerns(result.concerns),
    risk_areas: formatRiskAreas(result.riskAreas),
    next_round_focus: formatNextRound(result.nextRoundFocus),
  }

  payload._dedupeKey = [
    payload.candidate_name,
    payload.interview_date,
    apiRecommendation,
    payload.overall_score,
    result.summary?.slice(0, 80),
  ].join('|')

  return payload
}
