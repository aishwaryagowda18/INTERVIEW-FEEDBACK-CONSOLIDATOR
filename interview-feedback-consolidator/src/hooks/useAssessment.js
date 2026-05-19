import { useState, useCallback } from 'react'
import { consolidateFeedback } from '../services/claudeApi'

const EMPTY_INTERVIEWER = () => ({
  id: Math.random().toString(36).slice(2),
  name: '',
  role: '',
  round: '',
  rating: 0,
  technicalSkills: '',
  problemSolving: '',
  communication: '',
  culturalFit: '',
  overallImpression: '',
  recommendation: '',
})

const EMPTY_CANDIDATE = {
  name: '',
  role: '',
  level: '',
  date: '',
  department: '',
}

export function useAssessment() {
  const [step, setStep] = useState(1)
  const [candidate, setCandidate] = useState({ ...EMPTY_CANDIDATE })
  const [interviewers, setInterviewers] = useState([EMPTY_INTERVIEWER(), EMPTY_INTERVIEWER()])
  const [activeIdx, setActiveIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const updateCandidate = useCallback((field, value) => {
    setCandidate((prev) => ({ ...prev, [field]: value }))
  }, [])

  const updateInterviewer = useCallback((idx, field, value) => {
    setInterviewers((prev) => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], [field]: value }
      return copy
    })
  }, [])

  const addInterviewer = useCallback(() => {
    if (interviewers.length >= 4) return
    setInterviewers((prev) => [...prev, EMPTY_INTERVIEWER()])
    setActiveIdx(interviewers.length)
  }, [interviewers.length])

  const removeInterviewer = useCallback(
    (idx) => {
      if (interviewers.length <= 2) return
      setInterviewers((prev) => prev.filter((_, i) => i !== idx))
      setActiveIdx((prev) => Math.min(prev, interviewers.length - 2))
    },
    [interviewers.length]
  )

  const isFilled = (iv) => iv.name.trim() !== '' && iv.overallImpression.trim() !== ''

  const filledCount = interviewers.filter(isFilled).length

  const runAnalysis = useCallback(async () => {
    setLoading(true)
    setError(null)
    setStep(3)
    try {
      const data = await consolidateFeedback(candidate, interviewers)
      setResult(data)
      setStep(4)
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.')
      setStep(2)
    } finally {
      setLoading(false)
    }
  }, [candidate, interviewers])

  const reset = useCallback(() => {
    setStep(1)
    setCandidate({ ...EMPTY_CANDIDATE })
    setInterviewers([EMPTY_INTERVIEWER(), EMPTY_INTERVIEWER()])
    setActiveIdx(0)
    setResult(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    step, setStep,
    candidate, updateCandidate,
    interviewers, updateInterviewer, addInterviewer, removeInterviewer,
    activeIdx, setActiveIdx,
    loading, result, error,
    filledCount, isFilled,
    runAnalysis, reset,
  }
}
