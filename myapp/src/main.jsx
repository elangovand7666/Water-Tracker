import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import Elango from './Elango.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elango />
  </StrictMode>,
)
