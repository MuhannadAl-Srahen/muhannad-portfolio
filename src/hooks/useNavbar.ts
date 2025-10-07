import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Desktop scroll behavior (existing)
      if (!isMobileMenuOpen && window.innerWidth >= 768) {
        setIsScrolled(currentScrollY > 50)
      }

      // Mobile navbar hide/show behavior
      if (window.innerWidth < 768 && !isMobileMenuOpen) {
        if (currentScrollY < 10) {
          // At the top, always show
          setIsNavVisible(true)
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down, hide navbar
          setIsNavVisible(false)
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up, show navbar
          setIsNavVisible(true)
        }
      }

      setLastScrollY(currentScrollY)
    }

    const handleActiveSection = () => {
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    const handleResize = () => {
      // Close mobile menu on desktop resize
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
        setIsNavVisible(true) // Always show on desktop
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleActiveSection)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleActiveSection)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileMenuOpen, navItems, lastScrollY])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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
