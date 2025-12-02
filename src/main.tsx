import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const preloader = document.getElementById('preloader')
if (preloader) {
  preloader.classList.add('fade-out')
  setTimeout(() => preloader.remove(), 220)
}
