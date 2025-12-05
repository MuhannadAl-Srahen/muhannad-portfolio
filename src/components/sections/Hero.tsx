import { useEffect, useRef } from 'react'
import { Download, Mail } from 'lucide-react'
import { useHero } from '@/hooks/useHero'
import { headshotImage } from '@/assets'
import gsap from 'gsap'

export default function Hero() {
  const { displayText, mousePosition, handleDownloadCV, handleGetInTouch } =
    useHero()

  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const ambientOrbRefs = useRef<HTMLDivElement[]>([])
  const beamRefs = useRef<HTMLDivElement[]>([])

  // Hero entrance animations - run once on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content slide in from left - set initial state immediately
      gsap.set(contentRef.current, { x: -50, opacity: 0 })
      gsap.to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      })

      // Image slide in from right - set initial state immediately
      gsap.set(imageRef.current, { x: 50, opacity: 0 })
      gsap.to(imageRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      })

      // Main heading - fade in with blur
      const mainHeading = document.querySelector('.hero-main-heading')
      if (mainHeading) {
        gsap.set(mainHeading, { y: 30, opacity: 0, filter: 'blur(10px)' })
        gsap.to(mainHeading, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
        })
      }

      // Typewriter container - slide up
      const typewriterContainer = document.querySelector('.hero-typewriter')
      if (typewriterContainer) {
        gsap.set(typewriterContainer, { y: 20, opacity: 0 })
        gsap.to(typewriterContainer, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.out',
        })
      }

      // Supporting text - fade in with slight scale
      const supportingText = document.querySelectorAll('.hero-supporting-text')
      gsap.set(supportingText, { scale: 0.95, opacity: 0 })
      gsap.to(supportingText, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.9,
        ease: 'power2.out',
      })

      // CTA Buttons - pop in
      const ctaButtons = document.querySelector('.hero-cta-buttons')
      if (ctaButtons) {
        gsap.set(ctaButtons, { y: 20, opacity: 0, scale: 0.95 })
        gsap.to(ctaButtons, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 1.3,
          ease: 'back.out(1.4)',
        })
      }

      // Image container - simple fade and slide
      gsap.set(imageRef.current, { x: 50, opacity: 0 })
      gsap.to(imageRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      })

      // Image itself - gentle scale
      const heroImage = document.querySelector('.hero-image')
      gsap.set(heroImage, { scale: 0.95, opacity: 0 })
      gsap.to(heroImage, {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Hero ambient animations - continuous background effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient background motion (always runs)
      gsap.to(ambientOrbRefs.current, {
        y: 16,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.2, from: 'random' },
      })

      gsap.to(beamRefs.current, {
        opacity: 0.28,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.25, from: 'center' },
      })

      gsap.to('.hero-ring', {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id='home'
      className='min-h-screen flex items-center justify-center px-6 md:px-12 pt-24 md:pt-20 lg:pt-16 relative overflow-hidden'
    >
      {/* Flying Orbs Background Animation - Pure CSS */}
      <div className='absolute inset-0 z-0'>
        {/* Primary Flying Orbs */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className='absolute w-4 h-4 bg-primary/40 rounded-full animate-float-orb'
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 12}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${12 + i * 2}s`,
            }}
          />
        ))}

        {/* Accent Orbs */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`accent-${i}`}
            className='absolute w-2 h-2 bg-accent/50 rounded-full animate-float-orb-reverse'
            style={{
              right: `${25 + i * 15}%`,
              bottom: `${20 + i * 15}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${15 + i * 3}s`,
            }}
          />
        ))}

        {/* Large Ambient Background Lights */}
        <div className='absolute top-1/4 left-1/4 w-80 h-80 bg-primary/12 rounded-full blur-3xl animate-pulse-slow' />
        <div
          className='absolute bottom-1/3 right-1/3 w-64 h-64 bg-accent/8 rounded-full blur-3xl animate-pulse-slow'
          style={{ animationDelay: '5s' }}
        />
        <div
          className='absolute top-1/2 right-1/4 w-96 h-96 bg-primary/6 rounded-full blur-3xl animate-breathe'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-breathe'
          style={{ animationDelay: '8s' }}
        />

        {/* GSAP-driven ambient bubbles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`ambient-${i}`}
            ref={(el) => {
              if (el) ambientOrbRefs.current[i] = el
            }}
            className='absolute w-6 h-6 rounded-full bg-primary/18 blur-[2px]'
            style={{
              left: `${8 + i * 14}%`,
              top: `${10 + i * 9}%`,
              filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.12))',
            }}
          />
        ))}

        {/* Soft beams */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`beam-${i}`}
            ref={(el) => {
              if (el) beamRefs.current[i] = el
            }}
            className='absolute h-[140%] w-40 -skew-x-6 bg-linear-to-b from-primary/6 via-primary/2 to-transparent blur-3xl'
            style={{
              left: `${20 + i * 18}%`,
              top: '-20%',
              opacity: 0.16,
            }}
          />
        ))}
      </div>

      <div className='container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10'>
        {/* Left Column - Content */}
        <div
          ref={contentRef}
          className='space-y-8 text-center lg:text-left order-2 lg:order-1'
        >
          {/* Headline with Typewriter */}
          <div className='space-y-4'>
            <h1 className='hero-main-heading text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight'>
              I'm <span className='text-primary'>Muhannad</span>
            </h1>
            <div className='hero-typewriter text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight lg:whitespace-nowrap'>
              <span className='text-foreground min-h-[1.2em] inline-block'>
                {displayText}
                <span className='animate-pulse text-primary'>|</span>
              </span>
            </div>
          </div>

          {/* Supporting Text */}
          <div className='space-y-6 text-lg md:text-xl text-foreground/80 max-w-2xl'>
            <p className='hero-supporting-text'>
              I design and implement polished — focused on{' '}
              <span className='text-primary font-semibold'>clarity</span>,{' '}
              <span className='text-primary font-semibold'>motion</span>, and{' '}
              <span className='text-primary font-semibold'>performance</span>.
            </p>
            <p className='hero-supporting-text'>
              I transform{' '}
              <span className='text-primary font-semibold'>ideas</span> into
              <span className='text-foreground font-semibold'>
                {' '}
                exceptional digital experiences{' '}
              </span>
              that engage users and drive results.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='hero-cta-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
            <button
              onClick={handleGetInTouch}
              className='group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
            >
              <div className='absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out' />
              <div className='relative flex items-center justify-center space-x-2'>
                <Mail className='w-5 h-5' />
                <span>Get in Touch</span>
              </div>
            </button>

            <button
              onClick={handleDownloadCV}
              className='group relative px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-xl font-medium text-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
            >
              <div className='absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left' />
              <div className='relative flex items-center justify-center space-x-2 group-hover:text-black transition-colors duration-300 ease-out'>
                <Download className='w-5 h-5' />
                <span>Download CV</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column - Image */}
        <div
          ref={imageRef}
          className='flex justify-center order-1 lg:order-2'
        >
          <div
            className='relative'
            style={{
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {/* Floating Accents */}
            <div className='absolute -top-8 -left-8 w-16 h-16 border-2 border-primary/30 rounded-lg animate-spin-slow' />
            <div className='absolute -bottom-8 -right-8 w-12 h-12 bg-accent/20 rounded-full animate-spin-slow-reverse' />

            {/* Main Image Container */}
            <div className='hero-image relative bg-linear-to-br from-background/50 to-muted/30 backdrop-blur-sm border border-border/50 rounded-3xl p-2 shadow-2xl'>
              <div className='absolute inset-[-18px] rounded-4xl border border-primary/25 blur-sm' />
              <div className='relative group overflow-hidden rounded-2xl border-2 border-primary/90'>
                <img
                  src={headshotImage}
                  alt='Muhannad Al-Srahen - Frontend Developer'
                  className='w-full max-w-md object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-400 ease-out'
                  width='400'
                  height='500'
                  fetchPriority='high'
                  loading='eager'
                />

                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-linear-to-t from-background/20 via-transparent to-transparent pointer-events-none' />
              </div>
            </div>

            {/* Floating Particles Around Image */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className='absolute w-2 h-2 bg-primary rounded-full animate-float-particle'
                style={{
                  top: `${15 + i * 15}%`,
                  right: `${-10 + (i % 2) * 5}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${4 + i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
