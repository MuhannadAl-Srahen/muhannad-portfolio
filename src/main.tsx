import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { injectSpeedInsights } from '@vercel/speed-insights'
import './index.css'
import App from './App.tsx'

// The 404 page is loaded only when someone actually lands on a wrong URL
const NotFound = lazy(() => import('./pages/NotFound.tsx'))

// Initialize Vercel Speed Insights on client side only
injectSpeedInsights()

// The site has two pages: the portfolio at "/" and a 404 for anything else.
// Vercel sends every URL to index.html, so a simple path check picks the page.
// (A router library did this before, but added ~20 KB of JavaScript to every visit.)
const isHomePage = ['/', '/index.html'].includes(window.location.pathname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isHomePage ? (
      <App />
    ) : (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    )}
  </StrictMode>,
)

const preloader = document.getElementById('preloader')
if (preloader) {
  preloader.classList.add('fade-out')
  setTimeout(() => preloader.remove(), 220)
}
