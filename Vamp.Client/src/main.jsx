import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LocalizationProvider } from './context/LocalizationContext'
import { ToastProvider } from './context/ToastContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocalizationProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </LocalizationProvider>
  </StrictMode>,
)
