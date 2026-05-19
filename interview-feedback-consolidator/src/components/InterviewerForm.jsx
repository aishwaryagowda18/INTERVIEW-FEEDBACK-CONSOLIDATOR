function ratingClass(selected, btn) {
  if (selected !== btn) return ''
  if (btn <= 4) return 'sel-low'
  if (btn <= 7) return 'sel-mid'
  return 'sel-high'
}

export default function InterviewerForm({
  interviewers,
  activeIdx,
  setActiveIdx,
  updateInterviewer,
  addInterviewer,
  removeInterviewer,
  isFilled,
  filledCount,
  onBack,
  onAnalyze,
  error,
}) {
  const iv = interviewers[activeIdx]
  const set = (field) => (e) => updateInterviewer(activeIdx, field, e.target.value)

  return (
    <>
      <div className="progress-row">
        <span className="progress-info">
          <span className="progress-count">{filledCount}/{interviewers.length}</span> interviewers completed
        </span>
      </div>

      {/* Tab bar */}
      <div className="interviewer-tabs">
        {interviewers.map((t, i) => {
          const filled = isFilled(t)
          let cls = 'itab'
          if (filled) cls += ' filled'
          if (i === activeIdx) cls += ' active'
          return (
            <div key={t.id} className={cls} onClick={() => setActiveIdx(i)}>
              {t.name || `Interviewer ${i + 1}`}
            </div>
          )
        })}
        {interviewers.length < 4 && (
          <button className="add-tab-btn" onClick={addInterviewer}>
            + Add Interviewer
          </button>
        )}
        {interviewers.length > 2 && (
          <button className="remove-tab-btn" onClick={() => removeInterviewer(activeIdx)}>
            Remove
          </button>
        )}
      </div>

      {/* Form card */}
      <div className="card">
        <div className="card-title">Interviewer {activeIdx + 1} Details</div>

        <div className="form-grid" style={{ marginBottom: '1rem' }}>
          <div className="form-group">
            <label>Interviewer Name *</label>
            <input type="text" value={iv.name} onChange={set('name')} placeholder="e.g. Rahul Mehta" />
          </div>
          <div className="form-group">
            <label>Designation / Role</label>
            <input type="text" value={iv.role} onChange={set('role')} placeholder="e.g. Tech Lead" />
          </div>
          <div className="form-group">
            <label>Interview Round</label>
            <select value={iv.round} onChange={set('round')}>
              <option value="">Select round</option>
              <option>HR Screening</option>
              <option>Technical Round 1</option>
              <option>Technical Round 2</option>
              <option>System Design</option>
              <option>Managerial Round</option>
              <option>Culture Fit</option>
              <option>Final Round</option>
            </select>
          </div>
          <div className="form-group">
            <label>Overall Rating (1–10)</label>
            <div className="rating-row">

{Array.from(
{ length:10 },
(_,i)=>i+1
).map((n)=>(

<button

type="button"

key={n}

className={`rating-btn ${
ratingClass(
iv.rating,
n
)
}`}

onClick={()=>

updateInterviewer(
activeIdx,
'rating',
n
)

}

>

{n}

</button>

))}

</div>
          </div>
        </div>

        <div className="form-grid" style={{ marginBottom: '1rem' }}>
          <div className="form-group">
            <label>Technical Skills Assessment</label>
            <textarea
              value={iv.technicalSkills}
              onChange={set('technicalSkills')}
              placeholder="Describe technical competency, knowledge depth, specific skills demonstrated..."
            />
          </div>
          <div className="form-group">
            <label>Problem Solving & Thinking</label>
            <textarea
              value={iv.problemSolving}
              onChange={set('problemSolving')}
              placeholder="How did the candidate approach problems? Were solutions structured and logical?"
            />
          </div>
          <div className="form-group">
            <label>Communication Skills</label>
            <textarea
              value={iv.communication}
              onChange={set('communication')}
              placeholder="Assess clarity of explanation, listening skills, ability to articulate ideas..."
            />
          </div>
          <div className="form-group">
            <label>Cultural Fit & Attitude</label>
            <textarea
              value={iv.culturalFit}
              onChange={set('culturalFit')}
              placeholder="Comments on teamwork, enthusiasm, learning mindset, company values alignment..."
            />
          </div>
          <div className="form-group span2">
            <label>Overall Impression & Specific Notes *</label>
            <textarea
              value={iv.overallImpression}
              onChange={set('overallImpression')}
              style={{ minHeight: '110px' }}
              placeholder="Summarise overall impression. Include notable observations, red flags, or standout moments..."
            />
          </div>
          <div className="form-group span2">
            <label>Your Recommendation</label>
            <select value={iv.recommendation} onChange={set('recommendation')}>
              <option value="">Select recommendation</option>
              <option>Strong Hire</option>
              <option>Hire</option>
              <option>Hire with Reservations</option>
              <option>Hold / Defer</option>
              <option>No Hire</option>
              <option>Strong No Hire</option>
            </select>
          </div>
        </div>
      </div>

      {error && <div className="error-box">⚠ {error}</div>}

      <div className="action-row">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button
          className="btn-accent"
          onClick={onAnalyze}
          disabled={filledCount < 2}
          title={filledCount < 2 ? 'Complete at least 2 interviewers to proceed' : ''}
        >
          ⚡ Generate AI Report
        </button>
      </div>
    </>
  )
}
