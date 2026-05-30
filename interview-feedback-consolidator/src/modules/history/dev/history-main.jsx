import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HistoryDevApp from './HistoryDevApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HistoryDevApp />
  </StrictMode>
)
