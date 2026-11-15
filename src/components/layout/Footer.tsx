import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { socialLinks } from '@/data'
import { useTheme } from '@/contexts/ThemeContext'
import { logoDark, logoLight } from '@/assets'

export default function Footer() {
  const { resolvedTheme } = useTheme()
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    let frame = 0

    const updateProgress = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY

      // Rounded so React skips the re-render when the visible value didn't change
      setScrollProgress(
        totalScroll > 0 ? Math.round((scrollTop / totalScroll) * 100) : 0
      )
      setShowBackToTop(scrollTop > 400)
    }

    // Scroll fires many times per frame; update at most once per screen frame
    const handleScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateProgress() // Initial calculation
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Watch for modal open/close
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsModalOpen(document.body.classList.contains('modal-open'))
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Determine which logo to use
  const currentLogo = resolvedTheme === 'dark' ? logoLight : logoDark

  return (
    <>
      <footer className='relative z-10 bg-card/30 backdrop-blur-sm border-t border-border/50'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            {/* Left: Logo and Copyright */}
            <div className='flex items-center gap-3'>
              <img
                src={currentLogo}
                alt='Muhannad Al-Srahen'
                className='h-8 w-auto'
              />
              <div className='h-6 w-px bg-border/50' />
              <p className='text-sm text-muted-foreground'>
                © {currentYear} All rights reserved
              </p>
            </div>

            {/* Right: Social Links */}
            <div className='flex items-center gap-3'>
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 bg-background/80 border border-border/50 rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 hover:scale-110 transition-all duration-300 ease-out group'
                    aria-label={social.name}
                  >
                    <IconComponent className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300' />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button with Progress Ring - Hidden on mobile, only show when no modal is open */}
      {showBackToTop && !isModalOpen && (
        <button
          onClick={scrollToTop}
          className='hidden md:flex fixed bottom-20 right-8 z-40 w-16 h-16 items-center justify-center group animate-fade-in-up cursor-pointer'
          aria-label='Back to top'
        >
          {/* Progress Ring */}
          <svg
            className='absolute inset-0 w-16 h-16 -rotate-90'
            viewBox='0 0 64 64'
          >
            {/* Background Circle */}
            <circle
              cx='32'
              cy='32'
              r='30'
              fill='none'
              stroke='currentColor'
              strokeWidth='3'
              className='text-muted/20'
            />
            {/* Progress Circle */}
            <circle
              cx='32'
              cy='32'
              r='30'
              fill='none'
              stroke='currentColor'
              strokeWidth='3'
              strokeDasharray={`${2 * Math.PI * 30}`}
              strokeDashoffset={`${2 * Math.PI * 30 * (1 - scrollProgress / 100)}`}
              className='text-primary transition-all duration-150 ease-linear drop-shadow-[0_0_8px_rgba(245,197,66,0.5)]'
              strokeLinecap='round'
            />
          </svg>
          
          {/* Button Content */}
          <div className='relative w-12 h-12 bg-background/95 backdrop-blur-sm border-2 border-primary/20 text-foreground rounded-full shadow-lg flex items-center justify-center group-hover:scale-105 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300 ease-out'>
            <ArrowUp className='w-5 h-5 text-primary group-hover:-translate-y-0.5 transition-transform duration-300 ease-out' />
          </div>
        </button>
      )}
    </>
  )
}
