const STEPS = [
  { n: 1, label: 'Candidate Info' },
  { n: 2, label: 'Interviewer Feedback' },
  { n: 3, label: 'AI Analysis' },
  { n: 4, label: 'Results' },
]

export default function StepIndicator({ step, setStep }) {
  return (
    <div className="steps">
      {STEPS.map(({ n, label }) => {
        let cls = 'step'
        if (n === step) cls += ' active'
        else if (n < step) cls += ' done'
        return (
          <div
            key={n}
            className={cls}
            onClick={() => n < step && setStep(n)}
            style={{ cursor: n < step ? 'pointer' : 'default' }}
          >
            <div className="step-num">{n < step ? '✓' : n}</div>
            <div className="step-label">{label}</div>
          </div>
        )
      })}
    </div>
  )
}
