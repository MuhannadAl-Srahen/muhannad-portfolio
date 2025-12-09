import { useEffect, useState, useCallback, useRef } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { navItems, socialLinks } from '@/config/navigation'
import { cn } from '@/lib/utils'
import { logoDark, logoLight } from '@/assets'
import gsap from 'gsap'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hideOnMobile, setHideOnMobile] = useState(false)
  const manualActiveRef = useRef<string | null>(null)
  const lastScrollY = useRef(0)
  const navbarRef = useRef<HTMLDivElement>(null)

  // Scroll detection with mobile hide/show
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      const wasScrolled = isScrolled
      const nowScrolled = currentScrollY > 60
      
      setIsScrolled(nowScrolled)
      
      // Animate navbar when it becomes sticky
      if (!wasScrolled && nowScrolled && navbarRef.current) {
        gsap.fromTo(
          navbarRef.current,
          { 
            y: -20, 
            opacity: 0,
            scale: 0.95
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          }
        )
      }

      // Mobile navbar hide/show logic (only on mobile < 1024px)
      if (window.innerWidth < 1024) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down & past threshold
          setHideOnMobile(true)
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up
          setHideOnMobile(false)
        }
      } else {
        setHideOnMobile(false)
      }
      
      lastScrollY.current = currentScrollY

      // Detect active section (skip while a manual click is in progress)
      if (!manualActiveRef.current) {
        for (let i = navItems.length - 1; i >= 0; i--) {
          const section = document.getElementById(navItems[i].href.slice(1))
          if (section) {
            const rect = section.getBoundingClientRect()
            if (rect.top <= 120) {
              setActiveSection(navItems[i].href.slice(1))
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = useCallback((href: string) => {
    const targetId = href.startsWith('#') ? href.slice(1) : href

    // Instant active state
    setActiveSection(targetId)
    setIsMobileMenuOpen(false)
    manualActiveRef.current = targetId
    setTimeout(() => {
      manualActiveRef.current = null
    }, 800)

    const offset = 90 // guard against overlap; slightly larger to avoid stickiness

    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(targetId) ?? document.querySelector(href)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
        return
      }

      if (attempt < 6) {
        requestAnimationFrame(() => tryScroll(attempt + 1))
      }
    }

    tryScroll()
  }, [])

  return (
    <>
      {/* Navbar */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isMobileMenuOpen
            ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'
            : 'opacity-100 pointer-events-auto',
          // Hide on mobile when scrolling down
          hideOnMobile && '-translate-y-full lg:translate-y-0'
        )}
      >
        <div
          ref={navbarRef}
          className={cn(
            'transition-all duration-300',
            isScrolled
              ? 'mx-3 sm:mx-4 lg:mx-auto max-w-3xl mt-3 rounded-full bg-background/80 backdrop-blur-xl border border-border/60 shadow-lg'
              : 'border-b border-border/50 bg-background/80 backdrop-blur-lg'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between gap-4',
              isScrolled ? 'px-4 sm:px-6 h-14 max-w-3xl mx-auto' : 'px-4 sm:px-6 h-16 max-w-4xl mx-auto'
            )}
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className='cursor-pointer focus:outline-none'
              aria-label='Home'
            >
              <img
                src={theme === 'dark' ? logoLight : logoDark}
                alt='Logo'
                className='h-9 w-9 sm:h-10 sm:w-10 object-contain transition-transform duration-200 ease-out'
              />
            </button>

            {/* Desktop Nav */}
            <nav className='hidden lg:flex items-center gap-1'>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.href.slice(1)
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'group flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium cursor-pointer',
                      'transition-all duration-200 ease-out',
                      isActive
                        ? 'bg-primary/20 text-primary ring-1 ring-primary/30 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={16} className={cn('transition-colors duration-150', isActive && 'text-primary')} />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </nav>

            {/* Actions */}
            <div className='flex items-center gap-1'>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className='p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-200 ease-out cursor-pointer'
                aria-label='Toggle theme'
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className='lg:hidden p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors duration-200 ease-out cursor-pointer'
                aria-label='Open menu'
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background/90 backdrop-blur-xl shadow-2xl',
          'flex flex-col border-l border-border/50',
          'z-50 lg:hidden',
          'transition-transform duration-300 ease-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className='flex items-center justify-between px-5 py-4 border-b border-border/50'>
          <img
            src={theme === 'dark' ? logoLight : logoDark}
            alt='Logo'
            className='h-8 w-8 object-contain'
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className='p-2 rounded-lg hover:bg-muted/50 active:bg-muted transition-colors duration-300 ease-out cursor-pointer shrink-0'
            aria-label='Close menu'
          >
            <X size={24} className='text-foreground' />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 overflow-y-auto px-3 py-4'>
          <div className='space-y-1'>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.href.slice(1)
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'group w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left cursor-pointer',
                    'transition-all duration-200 ease-out',
                    isActive
                      ? 'bg-primary/20 text-primary ring-1 ring-primary/30 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={20} />
                  <span className='font-medium text-base'>{item.name}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className='border-t border-border/50 p-4 space-y-4'>
          {/* Theme Toggle */}
          <div className='flex items-center justify-between px-2'>
            <span className='text-sm text-muted-foreground font-medium'>
              Theme
            </span>
            <button
              onClick={toggleTheme}
              className='flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-300 ease-out cursor-pointer text-sm'
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span className='font-medium'>
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>
          </div>

          {/* Social Links */}
          <div className='flex justify-center gap-3'>
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-2.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/15 transition-all duration-300 ease-out cursor-pointer'
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => handleNavClick('#contact')}
            className='w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-300 ease-out cursor-pointer'
          >
            Get in Touch
          </button>
        </div>
      </div>
    </>
  )
}
