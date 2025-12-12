import { useState, useEffect, useCallback } from 'react'

export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

export interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

export function useNavbar(navItems: NavItem[]) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Handle scroll with throttling for better performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const currentScrollY = window.scrollY

        // Desktop scroll behavior - show scrolled state
        if (!isMobileMenuOpen && window.innerWidth >= 1024) {
          setIsScrolled(currentScrollY > 100)
          setIsNavVisible(true) // Always visible on desktop
        }

        // Mobile & Tablet navbar hide/show behavior
        if (window.innerWidth < 1024 && !isMobileMenuOpen) {
          setIsScrolled(currentScrollY > 100)
          
          if (currentScrollY < 10) {
            // At the top, always show
            setIsNavVisible(true)
          } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
            // Scrolling down, hide navbar
            setIsNavVisible(false)
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up, show navbar
            setIsNavVisible(true)
          }
        }

        setLastScrollY(currentScrollY)
      }, 10) // 10ms throttle for smooth performance
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobileMenuOpen, lastScrollY])

  // Handle active section detection
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleActiveSection = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const sections = navItems.map((item) => item.href.substring(1))
        const scrollPosition = window.scrollY + 150 // Offset for better detection

        // Find the current section
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i]
          const element = document.getElementById(section)
          
          if (element) {
            const rect = element.getBoundingClientRect()
            const elementTop = rect.top + window.scrollY
            
            if (scrollPosition >= elementTop - 100) {
              setActiveSection(section)
              break
            }
          }
        }

        // Special case: if at the very top, set to 'home'
        if (window.scrollY < 100) {
          setActiveSection('home')
        }
      }, 50) // 50ms throttle
    }

    window.addEventListener('scroll', handleActiveSection, { passive: true })
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleActiveSection)
    }
  }, [navItems])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Close mobile menu on desktop resize
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
        setIsNavVisible(true) // Always show on desktop
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offset = 100 // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  return {
    isScrolled,
    activeSection,
    isMobileMenuOpen,
    isNavVisible,
    handleNavClick,
    toggleMobileMenu,
    setIsMobileMenuOpen,
  }
}
