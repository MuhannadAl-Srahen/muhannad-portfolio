import { useEffect, lazy, Suspense } from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Navbar, Footer } from '@/components/layout'
import { GlobalBackground, SectionErrorBoundary } from '@/components/common'
import { Hero } from '@/components/sections'

// Everything below the first screen is code-split: it downloads right after the
// hero renders instead of before it, so the first thing visitors see appears sooner.
const About = lazy(() => import('@/components/sections/About'))
const Experience = lazy(() => import('@/components/sections/Experience'))
const Skills = lazy(() => import('@/components/sections/Skills'))
const Projects = lazy(() => import('@/components/sections/Projects'))
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
          {/* One Suspense so the sections appear together, in order. The error
              boundary keeps a failed download from blanking the whole page. */}
          <SectionErrorBoundary>
            <Suspense fallback={<div className='min-h-screen' />}>
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
            </Suspense>
          </SectionErrorBoundary>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
