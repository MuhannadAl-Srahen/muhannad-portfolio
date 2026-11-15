import { Download, Mail } from 'lucide-react'
import { useHero } from '@/hooks/useHero'
import { headshotImage } from '@/assets'
import { profile } from '@/data'

// Entrance animations are CSS classes (enter-left, enter-up, ...) from index.css.
// The [--enter-...] classes set each element's delay, duration and distance,
// matching the timings of the old GSAP version.
export default function Hero() {
  const { displayText, parallaxRef, handleDownloadCV, handleGetInTouch } =
    useHero()

  return (
    <section
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
            // Show only first 4 on mobile
            return (
              <div
                key={i}
                className={`absolute rounded-full bg-primary/30 animate-hero-particle-${(i % 4) + 1} ${i >= 4 ? 'max-md:hidden' : ''}`}
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
        <div className='enter-left space-y-8 text-center lg:text-left order-2 lg:order-1'>
          {/* Headline with Typewriter */}
          <div className='space-y-4'>
            <h1 className='enter-up [--enter-distance:30px] [--enter-duration:1s] [--enter-delay:0.2s] text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight'>
              I'm <span className='text-primary'>Muhannad</span>
            </h1>
            <div className='enter-up [--enter-delay:0.6s] text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight lg:whitespace-nowrap'>
              {/* Screen readers get one fixed title instead of the retyping text */}
              <span className='sr-only'>{profile.title}</span>
              <span className='text-foreground min-h-[1.2em] inline-block' aria-hidden='true'>
                {displayText}
                <span className='animate-pulse text-primary'>|</span>
              </span>
            </div>
          </div>

          {/* Supporting Text */}
          <div className='space-y-6 text-lg md:text-xl text-foreground/80 max-w-2xl'>
            <p className='enter-fade [--enter-delay:0.9s]'>
              Frontend developer with{' '}
              <span className='text-foreground font-semibold'>2+ years</span>{' '}
              of experience building production web apps with{' '}
              <span className='text-primary font-semibold'>React</span>,{' '}
              <span className='text-primary font-semibold'>Next.js</span> and{' '}
              <span className='text-primary font-semibold'>TypeScript</span>.
            </p>
            <p className='enter-fade [--enter-delay:1.1s]'>
              I built the{' '}
              <span className='text-primary font-semibold'>internal systems</span>{' '}
              behind daily operations at a freight and logistics company.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='enter-up [--enter-duration:0.6s] [--enter-delay:1.3s] flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
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
        <div className='enter-right flex justify-center order-1 lg:order-2'>
          <div
            ref={parallaxRef}
            className='relative'
            style={{
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {/* Floating orbs around image */}
            <>
                {/* Corner accents */}
                <div className='absolute -top-6 -left-6 w-12 h-12 border-2 border-primary/40 rounded-lg animate-spin-slow' />
                <div className='absolute -bottom-6 -right-6 w-10 h-10 bg-accent/25 rounded-full animate-spin-slow-reverse' />
                
                {/* Floating orbs on the right side (2 on mobile) */}
                <div className='absolute -right-16 top-1/4 w-4 h-4 bg-primary/50 rounded-full animate-image-orb' />
                <div className='absolute -right-12 top-1/2 w-3 h-3 bg-accent/60 rounded-full animate-image-orb' style={{ animationDelay: '0.5s' }} />
                <div className='absolute -right-20 top-2/3 w-5 h-5 bg-primary/40 rounded-full animate-image-orb max-md:hidden' style={{ animationDelay: '1s' }} />
                <div className='absolute -right-14 bottom-1/4 w-3 h-3 bg-primary/60 rounded-full animate-image-orb max-md:hidden' style={{ animationDelay: '1.5s' }} />
                
                {/* A couple on the left too (1 on mobile) */}
                <div className='absolute -left-12 top-1/3 w-3 h-3 bg-accent/50 rounded-full animate-image-orb' style={{ animationDelay: '0.8s' }} />
                <div className='absolute -left-16 bottom-1/3 w-4 h-4 bg-primary/45 rounded-full animate-image-orb max-md:hidden' style={{ animationDelay: '1.2s' }} />
            </>

            {/* Main Image Container */}
            <div className='enter-fade [--enter-duration:1s] [--enter-delay:0.2s] relative bg-linear-to-br from-background/50 to-muted/30 border border-border/50 rounded-3xl p-2 shadow-2xl'>
              <div className='absolute inset-[-18px] rounded-4xl border border-primary/25 blur-sm' />
              <div className='relative group overflow-hidden rounded-2xl border-2 border-primary/90'>
                <img
                  src={headshotImage.src}
                  srcSet={headshotImage.srcSet}
                  sizes='(max-width: 480px) calc(100vw - 64px), 448px'
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
