export default function Header({ activeView = 'app', onNavigate }) {
  const pillStyle = (active) => ({
    cursor: onNavigate ? 'pointer' : 'default',
    border: 'none',
    fontFamily: 'inherit',
    color: 'white',
    background: active
      ? 'rgba(255,255,255,0.22)'
      : 'rgba(255,255,255,0.12)',
  })

  return (
    <header className="header">
      <div
        className="header-logo"
        style={{ cursor: onNavigate ? 'pointer' : 'default' }}
        onClick={() => onNavigate?.('/')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onNavigate?.('/')
        }}
        role={onNavigate ? 'button' : undefined}
        tabIndex={onNavigate ? 0 : undefined}
      >
        <div className="header-logo-dot" />
        <span>HireInsight</span>
      </div>

      <nav
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          className="header-badge"
          style={pillStyle(activeView === 'app')}
          onClick={() => onNavigate?.('/')}
        >
          Interview Feedback Consolidator
        </button>
        <button
          type="button"
          className="header-badge"
          style={pillStyle(activeView === 'history')}
          onClick={() => onNavigate?.('/history')}
        >
          Report History
        </button>
      </nav>
    </header>
  )
}
