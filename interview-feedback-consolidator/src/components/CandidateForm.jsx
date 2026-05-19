export default function CandidateForm({ candidate, updateCandidate, onNext }) {
  const set = (field) => (e) => updateCandidate(field, e.target.value)

  return (
    <>
      <div className="card">
        <div className="card-title">Candidate Information</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Candidate Full Name *</label>
            <input
              type="text"
              value={candidate.name}
              onChange={set('name')}
              placeholder="e.g. Priya Sharma"
            />
          </div>
          <div className="form-group">
            <label>Role Applied For *</label>
            <input
              type="text"
              value={candidate.role}
              onChange={set('role')}
              placeholder="e.g. Software Engineer"
            />
          </div>
          <div className="form-group">
            <label>Experience Level</label>
            <select value={candidate.level} onChange={set('level')}>
              <option value="">Select level</option>
              <option>Fresher / Entry Level</option>
              <option>Junior (1-3 years)</option>
              <option>Mid Level (3-5 years)</option>
              <option>Senior (5+ years)</option>
              <option>Lead / Principal</option>
            </select>
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              value={candidate.department}
              onChange={set('department')}
              placeholder="e.g. Engineering"
            />
          </div>
          <div className="form-group">
            <label>Interview Date</label>
            <input
              type="date"
              value={candidate.date}
              onChange={set('date')}
            />
          </div>
        </div>
      </div>

      <div className="action-row-end">
        <button className="btn-primary" onClick={onNext}>
          Continue to Feedback →
        </button>
      </div>
    </>
  )
}
