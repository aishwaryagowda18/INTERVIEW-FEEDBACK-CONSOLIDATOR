import { useEffect, useState } from 'react'

const STEPS = [
  'Reading interviewer notes...',
  'Identifying patterns & themes...',
  'Assessing alignment across panel...',
  'Generating consolidated report...',
]

export default function LoadingScreen({ count }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p < STEPS.length - 1 ? p + 1 : p))
    }, 2200)
    return () => clearInterval(t)
  }, [])

  return (
  <div className="loading-wrap">
      <div className="loading-spinner" />
      <div className="loading-title">Consolidating Feedback…</div>
      <div className="loading-sub">
        AI is analysing {count} interviewer {count === 1 ? 'response' : 'responses'} and building your hiring report.
      </div>
      <div className="loading-steps">
        {STEPS.map((s, i) => (
          <div key={i} className={`loading-step ${i === active ? 'active' : ''}`}>
            <div className="loading-step-dot" />
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}
