import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useNavbar } from '@/hooks/useNavbar'
import { navItems, socialLinks } from '@/config/navigation'
import { cn } from '@/lib/utils'
import logoDark from '@/assets/ms_dark_logo.svg'
import logoLight from '@/assets/ms_white_logo.svg'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const {
    isScrolled,
    activeSection,
    isMobileMenuOpen,
    isNavVisible,
    handleNavClick,
    toggleMobileMenu,
    setIsMobileMenuOpen,
  } = useNavbar(navItems)

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition duration-300 ease-out',
          !isNavVisible && !isMobileMenuOpen
            ? 'md:translate-y-0 -translate-y-full'
            : 'translate-y-0',
          isScrolled && !isMobileMenuOpen ? 'py-2' : 'py-0'
        )}
      >
        <div
          className={cn(
            'transition-all duration-300 ease-out',
            isScrolled && !isMobileMenuOpen
              ? 'max-w-4xl mx-auto bg-background/90 backdrop-blur-lg border border-border shadow-lg rounded-full px-6 py-2'
              : 'container mx-auto px-6 py-2 md:bg-transparent bg-background/90 md:backdrop-blur-none backdrop-blur-lg md:border-none border-b border-border'
          )}
        >
          <div
            className={cn(
              'flex items-center transition-all duration-300',
              'md:justify-around justify-between'
            )}
          >
            {/* Logo */}
            <div className='flex items-center'>
              <img
                src={theme === 'dark' ? logoLight : logoDark}
                alt='Muhannad Al-Srahen'
                className='h-13 w-13 object-contain transition-transform duration-200 hover:scale-105'
              />
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-6'>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.href.substring(1)
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 relative group',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    )}
                  >
                    <Icon size={18} />
                    <span className='font-medium'>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId='activeIndicator'
                        className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full'
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Desktop Theme Toggle Only */}
            <div className='hidden md:flex items-center'>
              {/* Elegant Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={cn(
                  'relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200',
                  'bg-gradient-to-br from-background to-muted/50',
                  'border border-border/30 shadow-sm',
                  'hover:shadow-md hover:from-muted/30 hover:to-background'
                )}
                aria-label='Toggle theme'
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    rotate: theme === 'dark' ? 180 : 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {theme === 'dark' ? (
                    <Sun size={18} className='text-primary drop-shadow-sm' />
                  ) : (
                    <Moon size={18} className='text-muted-foreground' />
                  )}
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={cn(
                'md:hidden p-2 transition-colors duration-200',
                'text-muted-foreground hover:text-primary'
              )}
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 z-[60] md:hidden'>
          <div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200'
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
            className={cn(
              'absolute right-0 top-0 h-full w-80 bg-background',
              'border-l border-border p-6 flex flex-col shadow-2xl'
            )}
          >
            {/* Mobile Header */}
            <div className='flex items-center justify-between mb-8 pt-4'>
              <img
                src={theme === 'dark' ? logoLight : logoDark}
                alt='Muhannad Al-Srahen'
                className='h-8 w-8 object-contain'
              />
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200',
                  'bg-muted/30 border border-border/50',
                  'active:bg-muted/50 active:scale-95 transition-all duration-150'
                )}
                aria-label='Toggle theme'
              >
                {theme === 'dark' ? (
                  <Sun size={18} className='text-primary' />
                ) : (
                  <Moon size={18} className='text-muted-foreground' />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className='flex-1 flex flex-col space-y-3'>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.href.substring(1)
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-lg',
                      'transition-all duration-200 text-left',
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:text-primary hover:bg-accent'
                    )}
                  >
                    <Icon size={20} />
                    <span className='font-medium'>{item.name}</span>
                  </button>
                )
              })}
            </nav>

            {/* Mobile Footer */}
            <div className='border-t border-border pt-6 space-y-4'>
              {/* Get in Touch Button */}
              <button
                onClick={() => handleNavClick('#contact')}
                className={cn(
                  'w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg',
                  'bg-primary text-primary-foreground font-medium',
                  'transition-all duration-200 active:scale-95'
                )}
              >
                <span>Get in touch</span>
              </button>

              {/* Social Links */}
              <div className='flex items-center justify-center space-x-6'>
                {socialLinks.map((link) => {
                  const IconComponent = link.icon
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={cn(
                        'text-muted-foreground hover:text-primary',
                        'transition-all duration-200 hover:scale-110 transform'
                      )}
                      aria-label={link.name}
                    >
                      <IconComponent size={24} />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
