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

  // Hero entrance animations
  useEffect(() => {

    const ctx = gsap.context(() => {
      // Content slide in from left
      gsap.set(contentRef.current, { x: -50, opacity: 0 })
      gsap.to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      })

      // Image slide in from right
      gsap.set(imageRef.current, { x: 50, opacity: 0 })
      gsap.to(imageRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      })

      // Main heading - fade in
      const mainHeading = document.querySelector('.hero-main-heading')
      if (mainHeading) {
        gsap.set(mainHeading, { y: 30, opacity: 0 })
        gsap.to(mainHeading, {
          y: 0,
          opacity: 1,
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

      // Supporting text - fade in
      const supportingText = document.querySelectorAll('.hero-supporting-text')
      gsap.set(supportingText, { opacity: 0 })
      gsap.to(supportingText, {
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.9,
        ease: 'power2.out',
      })

      // CTA Buttons - pop in
      const ctaButtons = document.querySelector('.hero-cta-buttons')
      if (ctaButtons) {
        gsap.set(ctaButtons, { y: 20, opacity: 0 })
        gsap.to(ctaButtons, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 1.3,
          ease: 'power2.out',
        })
      }

      // Image itself - gentle fade
      const heroImage = document.querySelector('.hero-image')
      gsap.set(heroImage, { opacity: 0 })
      gsap.to(heroImage, {
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
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
      {/* Animated floating particles background */}
      <div className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
          {/* Large slow-moving gradient orbs */}
          {/* Large floating orbs - on left side only */}
          <div 
            className='absolute w-[400px] h-[400px] bg-primary/10 rounded-full animate-hero-float-1'
            style={{ filter: 'blur(80px)', top: '10%', left: '5%' }}
          />
          <div 
            className='absolute w-[320px] h-[320px] bg-accent/8 rounded-full animate-hero-float-2'
            style={{ filter: 'blur(70px)', bottom: '20%', left: '8%' }}
          />
          
          {/* Small floating particles - scattered across left and center */}
          {[...Array(8)].map((_, i) => {
            // Create scattered positions spreading to center
            const positions = [
              { left: 8, top: 20 },
              { left: 25, top: 35 },
              { left: 5, top: 55 },
              { left: 40, top: 42 },
              { left: 15, top: 72 },
              { left: 32, top: 58 },
              { left: 10, top: 15 },
              { left: 45, top: 80 },
            ]
            const pos = positions[i] || { left: 10, top: 50 }
            return (
              <div
                key={i}
                className={`absolute rounded-full bg-primary/30 animate-hero-particle-${(i % 4) + 1}`}
                style={{
                  width: `${8 + (i % 3) * 4}px`,
                  height: `${8 + (i % 3) * 4}px`,
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
              />
            )
          })}
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
            {/* Floating orbs around image */}
            <>
                {/* Corner accents */}
                <div className='absolute -top-6 -left-6 w-12 h-12 border-2 border-primary/40 rounded-lg animate-spin-slow' />
                <div className='absolute -bottom-6 -right-6 w-10 h-10 bg-accent/25 rounded-full animate-spin-slow-reverse' />
                
                {/* Floating orbs on the right side */}
                <div className='absolute -right-16 top-1/4 w-4 h-4 bg-primary/50 rounded-full animate-image-orb' />
                <div className='absolute -right-12 top-1/2 w-3 h-3 bg-accent/60 rounded-full animate-image-orb' style={{ animationDelay: '0.5s' }} />
                <div className='absolute -right-20 top-2/3 w-5 h-5 bg-primary/40 rounded-full animate-image-orb' style={{ animationDelay: '1s' }} />
                <div className='absolute -right-14 bottom-1/4 w-3 h-3 bg-primary/60 rounded-full animate-image-orb' style={{ animationDelay: '1.5s' }} />
                
                {/* A couple on the left too */}
                <div className='absolute -left-12 top-1/3 w-3 h-3 bg-accent/50 rounded-full animate-image-orb' style={{ animationDelay: '0.8s' }} />
                <div className='absolute -left-16 bottom-1/3 w-4 h-4 bg-primary/45 rounded-full animate-image-orb' style={{ animationDelay: '1.2s' }} />
            </>

            {/* Main Image Container */}
            <div className='hero-image relative bg-linear-to-br from-background/50 to-muted/30 border border-border/50 rounded-3xl p-2 shadow-2xl'>
              <div className='absolute inset-[-18px] rounded-4xl border border-primary/25 blur-sm' />
              <div className='relative group overflow-hidden rounded-2xl border-2 border-primary/90'>
                <img
                  src={headshotImage}
                  srcSet={`${headshotImage}?w=400 400w, ${headshotImage}?w=600 600w, ${headshotImage}?w=800 800w`}
                  sizes="(max-width: 640px) 400px, (max-width: 1024px) 600px, 800px"
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
          </div>
        </div>
      </div>
    </section>
  )
}
