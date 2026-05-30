import { useState, useEffect, useCallback } from 'react'

import Header from './components/Header'
import StepIndicator from './components/StepIndicator'
import CandidateForm from './components/CandidateForm'
import InterviewerForm from './components/InterviewerForm'
import LoadingScreen from './components/LoadingScreen'
import ResultReport from './components/ResultReport'
import HomePage from './components/HomePage'

import HistoryPage from './modules/history/pages/HistoryPage'
import ReportDetailsPage from './modules/history/pages/ReportDetailsPage'
import HistoryToast from './modules/history/components/HistoryToast'
import { useReportDetail } from './modules/history/hooks/useReportDetail'

import { useAssessment } from './hooks/useAssessment'

import './modules/history/styles/history.css'

function HistoryReportView({ reportId, onBack }) {
  const { report, loading, error, retry } = useReportDetail(reportId)

  if (loading) {
    return (
      <div className="history-loading" style={{ minHeight: '50vh' }}>
        <div className="history-spinner" />
        <p>Loading report…</p>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <HistoryToast message={error} type="error" onDismiss={onBack} />
        <main className="history-main">
          <button type="button" className="history-details-back" onClick={onBack}>
            ← Back to Report History
          </button>
          <div className="history-empty history-empty--error">
            <h3>Unable to load report</h3>
            <p>{error}</p>
            <button type="button" className="history-btn-new" onClick={retry}>
              Retry
            </button>
          </div>
        </main>
      </>
    )
  }

  return <ReportDetailsPage report={report} onBack={onBack} embedded />
}

function HistoryRoute({ navigate }) {
  const [selectedReportId, setSelectedReportId] = useState(null)

  if (selectedReportId) {
    return (
      <>
        <Header activeView="history" onNavigate={navigate} />
        <HistoryReportView
          reportId={selectedReportId}
          onBack={() => setSelectedReportId(null)}
        />
      </>
    )
  }

  return (
    <>
      <Header activeView="history" onNavigate={navigate} />
      <HistoryPage
        embedded
        onViewReport={setSelectedReportId}
        onNewAssessment={() => navigate('/')}
      />
    </>
  )
}

export default function App() {
  const [showHome, setShowHome] = useState(true)
  const [pathname, setPathname] = useState(() => window.location.pathname)

  const {
    step,
    setStep,
    candidate,
    updateCandidate,
    interviewers,
    updateInterviewer,
    addInterviewer,
    removeInterviewer,
    activeIdx,
    setActiveIdx,
    loading,
    result,
    error,
    filledCount,
    isFilled,
    runAnalysis,
    reset,
  } = useAssessment()

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('assessmentHistory')) || []
  )

  const [selectedReport, setSelectedReport] = useState(
    JSON.parse(localStorage.getItem('selectedReport')) || null
  )

  const navigate = useCallback((path) => {
    window.history.pushState({}, '', path)
    setPathname(path)
    if (path === '/history') return
    if (path === '/' || path === '') {
      setShowHome(true)
    } else {
      setShowHome(false)
    }
  }, [])

  /* SAVE HISTORY — localStorage (unchanged) */
  useEffect(() => {
    if (!result) return

    const latest = history[0]

    if (
      latest &&
      latest.candidate?.name === candidate?.name &&
      latest.result?.finalRecommendation === result?.finalRecommendation
    ) {
      return
    }

    const newHistory = [
      {
        id: Date.now(),
        candidate,
        interviewers,
        result,
        date: new Date().toLocaleString(),
      },
      ...history,
    ]

    setHistory(newHistory)

    localStorage.setItem('assessmentHistory', JSON.stringify(newHistory))
  }, [result])

  /* BACK BUTTON + /history route support */
  useEffect(() => {
    const handlePop = () => {
      const path = window.location.pathname
      setPathname(path)
      if (path === '/history') return
      if (path === '/' || path === '') {
        setShowHome(true)
      } else {
        setShowHome(false)
      }
    }

    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  if (pathname === '/history') {
    return <HistoryRoute navigate={navigate} />
  }

  if (showHome) {
    return (
      <HomePage
        onStart={() => {
          window.history.pushState({}, '', '/')
          setPathname('/')
          setShowHome(false)
        }}
        onHistory={() => navigate('/history')}
      />
    )
  }

  return (
    <>
      <Header activeView="app" onNavigate={navigate} />

      <div className="main">
        <div className="hero">
          <div className="hero-eyebrow">AI-Powered Hiring Tool</div>

          <h1>
            Interview Feedback
            <br />
            Consolidator
          </h1>

          <p>
            Collect structured feedback from 2–4 interviewers and generate a
            consolidated hiring recommendation powered by AI.
          </p>
        </div>

        <StepIndicator step={step} setStep={setStep} />

        {loading && <LoadingScreen count={interviewers.length} />}

        {!loading && step === 1 && (
          <CandidateForm
            candidate={candidate}
            updateCandidate={updateCandidate}
            onNext={() => setStep(2)}
          />
        )}

        {!loading && step === 2 && (
          <InterviewerForm
            interviewers={interviewers}
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
            updateInterviewer={updateInterviewer}
            addInterviewer={addInterviewer}
            removeInterviewer={removeInterviewer}
            isFilled={isFilled}
            filledCount={filledCount}
            onBack={() => setStep(1)}
            onAnalyze={runAnalysis}
            error={error}
          />
        )}

        {!loading && step === 4 && (result || selectedReport) && (
          <ResultReport
            result={result}
            candidate={candidate}
            interviewers={interviewers}
            onEdit={() => setStep(2)}
            onReset={() => {
              localStorage.removeItem('selectedReport')
              setSelectedReport(null)
              reset()
              setShowHome(true)
              window.history.pushState({}, '', '/')
              setPathname('/')
            }}
          />
        )}
      </div>
    </>
  )
}
