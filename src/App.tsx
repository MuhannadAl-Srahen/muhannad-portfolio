import { useEffect, lazy, Suspense } from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Navbar, Footer } from '@/components/layout'
import { GlobalBackground } from '@/components/common'
import { Hero, About, Skills, Projects } from '@/components/sections'

// Lazy load Contact form (below the fold)
const Contact = lazy(() => import('@/components/sections/Contact'))

export default function App() {
  useEffect(() => {
    // Prevent browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Force scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  return (
    <ThemeProvider defaultTheme='system' storageKey='portfolio-theme'>
      <div className='relative min-h-screen bg-background text-foreground overflow-hidden'>
        <GlobalBackground />
        <Navbar />
        <main className='relative z-10'>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Suspense fallback={<div className='min-h-screen' />}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
