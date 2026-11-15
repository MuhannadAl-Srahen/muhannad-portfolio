import { Component, type ReactNode } from 'react'

const RELOAD_FLAG = 'portfolio-chunk-reload'

// Browsers word a failed lazy import differently
const isChunkLoadError = (error: Error) =>
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
    error.message
  )

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Catches errors in the lazy-loaded sections so one failure can't blank the whole page.
 *
 * Most common case: you deploy while someone has the site open. Their page asks for
 * the old section files, which no longer exist, so the import fails. Reloading once
 * fetches the new files. If it still fails, a short message is shown instead.
 * (Error boundaries must be class components; React has no hook for this.)
 */
export default class SectionErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    if (isChunkLoadError(error) && !sessionStorage.getItem(RELOAD_FLAG)) {
      sessionStorage.setItem(RELOAD_FLAG, '1') // only once, so it can never loop
      window.location.reload()
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className='py-20 text-center'>
        <p className='text-muted-foreground mb-4'>
          This part of the page didn't load.
        </p>
        <button
          onClick={() => window.location.reload()}
          className='px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium cursor-pointer'
        >
          Reload the page
        </button>
      </div>
    )
  }
}
