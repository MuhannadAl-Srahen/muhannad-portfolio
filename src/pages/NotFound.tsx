import { useEffect } from 'react'
import { ArrowRight, Code2, Sparkles } from 'lucide-react'
import { GlobalBackground } from '@/components/common'

// Entrance animations are the CSS enter-* classes from index.css (same as the Hero)
export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Page Not Found | Muhannad Al-Srahen'
  }, [])

  const handleGoHome = () => {
    window.location.assign('/')
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <section className='relative min-h-screen bg-background text-foreground overflow-hidden'>
      {/* Background Effects matching main site */}
      <GlobalBackground />

      {/* Content Container */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20'>
        {/* Large 404 Number with gradient */}
        <div className='enter-zoom [--enter-duration:1.2s] mb-12 text-center'>
          <h1 className='text-[180px] md:text-[240px] font-black leading-none select-none'>
            <span className='bg-linear-to-r from-primary via-primary/70 to-primary/40 bg-clip-text text-transparent'>
              404
            </span>
          </h1>
          <div className='flex items-center justify-center gap-2 -mt-8 mb-6 text-primary'>
            <Code2 size={32} className='animate-pulse' />
            <Sparkles size={32} className='animate-bounce' />
          </div>
        </div>

        {/* Title */}
        <div className='enter-up [--enter-distance:30px] [--enter-delay:0.2s] text-center mb-6'>
          <h2 className='text-4xl md:text-5xl font-bold mb-2'>
            Page Not Found
          </h2>
          <p className='text-xl text-muted-foreground'>
            The page you're looking for has wandered off...
          </p>
        </div>

        {/* Description */}
        <div className='enter-up [--enter-delay:0.4s] max-w-2xl text-center mb-12'>
          <p className='text-lg text-muted-foreground leading-relaxed'>
            It might have been moved, deleted, or the URL might be incorrect. But don't worry, 
            you can navigate back to explore the rest of my portfolio or use one of the quick links below.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='enter-pop [--enter-duration:0.6s] [--enter-delay:0.6s] [--enter-ease:cubic-bezier(0.34,1.56,0.64,1)] flex flex-col sm:flex-row gap-4 mb-12'>
          <button
            onClick={handleGoHome}
            className='group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105'
          >
            Return Home
            <ArrowRight size={20} className='group-hover:translate-x-1 transition-transform' />
          </button>
          <button
            onClick={handleGoBack}
            className='inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-medium rounded-xl hover:bg-primary/10 transition-all duration-300'
          >
            Go Back
          </button>
        </div>

        {/* Footer Note */}
        <p className='text-center text-muted-foreground text-sm'>
          Lost in the digital space?{' '}
          <a href='/#contact' className='text-primary hover:underline font-medium'>
            Let me know
          </a>
          {' '}and I'll help you find your way.
        </p>
      </div>
    </section>
  )
}
