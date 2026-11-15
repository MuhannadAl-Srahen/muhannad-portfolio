/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

type Theme = 'dark' | 'light' | 'system'
type ResolvedTheme = 'dark' | 'light'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  /** What the visitor chose: 'dark', 'light' or 'system' (follow the OS) */
  theme: Theme
  /** What is actually on screen: always 'dark' or 'light'. Use this for UI decisions like the logo. */
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const darkQuery = '(prefers-color-scheme: dark)'
const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia(darkQuery).matches ? 'dark' : 'light'

/**
 * Puts 'dark' or 'light' on <html>, with every CSS transition switched off for that
 * one change. Without this, elements with their own transitions (cards, buttons...)
 * fade at different speeds than plain text, so for a moment you'd see dark text on
 * dark cards. Now every color changes in the same frame.
 */
function applyThemeClass(next: ResolvedTheme) {
  const root = document.documentElement
  if (root.classList.contains(next)) return // already showing this theme

  const noTransitions = document.createElement('style')
  noTransitions.textContent = '*, *::before, *::after { transition: none !important; }'
  document.head.appendChild(noTransitions)

  root.classList.remove('light', 'dark')
  root.classList.add(next)

  void getComputedStyle(root).color // make the browser apply the new colors right now
  requestAnimationFrame(() => noTransitions.remove()) // hover effects etc. work again
}

const initialState: ThemeProviderState = {
  theme: 'system',
  resolvedTheme: 'dark',
  setTheme: () => null,
  toggleTheme: () => null,
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme)

  // Keep following the OS if the visitor switches dark mode while the page is open
  useEffect(() => {
    const media = window.matchMedia(darkQuery)
    const onChange = () => setSystemTheme(media.matches ? 'dark' : 'light')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const resolvedTheme = theme === 'system' ? systemTheme : theme

  // Covers every other way the theme can change (e.g. the OS switches to dark mode).
  // On page load the inline script in index.html already set the class, so this does nothing.
  useEffect(() => {
    applyThemeClass(resolvedTheme)
  }, [resolvedTheme])

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    // Flip whatever is on screen right now (also works when the theme is 'system')
    toggleTheme: () => {
      const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
      const commit = () => {
        localStorage.setItem(storageKey, newTheme)
        applyThemeClass(newTheme)
        // Re-render now (not later) so the new logo is part of the "after" picture below
        flushSync(() => setTheme(newTheme))
      }

      // Supported browsers take a picture of the page before and after and cross-fade
      // the two on the GPU: one smooth fade for the whole page. Others switch instantly.
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (document.startViewTransition && !prefersReducedMotion) {
        document.startViewTransition(commit)
      } else {
        commit()
      }
    },
  }

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
