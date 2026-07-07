import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PageRenderer from './PageRenderer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageRenderer />
  </StrictMode>,
)
