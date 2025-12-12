import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Code2, Sparkles } from 'lucide-react'
import { GlobalBackground } from '@/components/common'
import gsap from 'gsap'

export default function NotFound() {
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = '404 - Page Not Found | Muhannad Al-Srahen'
  }, [])

  // GSAP animations matching the Hero section
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 404 Number - fade in with blur and scale
      if (numberRef.current) {
        gsap.set(numberRef.current, { scale: 0.8, opacity: 0, filter: 'blur(10px)' })
        gsap.to(numberRef.current, {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
        })
      }

      // Title - slide up with fade
      if (titleRef.current) {
        gsap.set(titleRef.current, { y: 30, opacity: 0 })
        gsap.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        })
      }

      // Description - fade in
      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 0, y: 20 })
        gsap.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power2.out',
        })
      }

      // Buttons - pop in
      if (buttonsRef.current) {
        gsap.set(buttonsRef.current, { opacity: 0, scale: 0.95, y: 20 })
        gsap.to(buttonsRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: 0.6,
          ease: 'back.out(1.4)',
        })
      }
    }, contentRef)

    return () => ctx.revert()
  }, [])

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <section className='relative min-h-screen bg-background text-foreground overflow-hidden'>
      {/* Background Effects matching main site */}
      <GlobalBackground />

      {/* Content Container */}
      <div ref={contentRef} className='relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20'>
        {/* Large 404 Number with gradient */}
        <div ref={numberRef} className='mb-12 text-center'>
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
        <div ref={titleRef} className='text-center mb-6'>
          <h2 className='text-4xl md:text-5xl font-bold mb-2'>
            Page Not Found
          </h2>
          <p className='text-xl text-muted-foreground'>
            The page you're looking for has wandered off...
          </p>
        </div>

        {/* Description */}
        <div ref={descRef} className='max-w-2xl text-center mb-12'>
          <p className='text-lg text-muted-foreground leading-relaxed'>
            It might have been moved, deleted, or the URL might be incorrect. But don't worry, 
            you can navigate back to explore the rest of my portfolio or use one of the quick links below.
          </p>
        </div>

        {/* Action Buttons */}
        <div ref={buttonsRef} className='flex flex-col sm:flex-row gap-4 mb-12'>
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
