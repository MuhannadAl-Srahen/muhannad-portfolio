import { motion, AnimatePresence } from 'framer-motion'
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
        animate={{
          y: !isNavVisible && !isMobileMenuOpen ? -100 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 25,
          mass: 0.8,
        }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          isScrolled && !isMobileMenuOpen ? 'py-2' : 'py-0'
        )}
        style={{
          paddingTop: isScrolled && !isMobileMenuOpen ? '0.5rem' : '0',
          paddingBottom: isScrolled && !isMobileMenuOpen ? '0.5rem' : '0',
          transition: 'padding 300ms ease-out',
        }}
      >
        <div
          className={cn(
            isScrolled && !isMobileMenuOpen
              ? 'max-w-4xl mx-auto bg-background/90 backdrop-blur-lg border border-border shadow-lg rounded-full px-6 py-2'
              : 'container mx-auto px-6 py-2 md:bg-transparent bg-background/90 md:backdrop-blur-none backdrop-blur-lg md:border-none border-b border-border'
          )}
          style={{
            transition:
              'max-width 300ms ease-out, background-color 150ms ease-out, border-radius 300ms ease-out, box-shadow 300ms ease-out',
          }}
        >
          <div className='flex items-center md:justify-around justify-between'>
            {/* Logo */}
            <div className='flex items-center'>
              <img
                src={theme === 'dark' ? logoLight : logoDark}
                alt='Muhannad Al-Srahen'
                className='h-13 w-13 object-contain transition-transform duration-200 hover:scale-105'
                style={{ transition: 'opacity 150ms ease-out' }}
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
                      'flex items-center space-x-2 px-3 py-2 rounded-lg relative group',
                      'transition-colors duration-200',
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
      <AnimatePresence mode='wait'>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='fixed inset-0 z-[60] md:hidden'
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className='absolute inset-0 bg-black/60 backdrop-blur-sm'
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{
                x: '100%',
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                x: 0,
                scale: 1,
                opacity: 1,
              }}
              exit={{
                x: '100%',
                scale: 0.95,
                opacity: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
                opacity: { duration: 0.2 },
              }}
              className={cn(
                'absolute right-0 top-0 h-full w-80 bg-background',
                'border-l border-border p-6 flex flex-col shadow-2xl'
              )}
            >
              {/* Mobile Header */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: 'easeOut' }}
                className='flex items-center justify-between mb-8 pt-4'
              >
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  src={theme === 'dark' ? logoLight : logoDark}
                  alt='Muhannad Al-Srahen'
                  className='h-8 w-8 object-contain'
                />
                {/* Mobile Theme Toggle */}
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
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
                </motion.button>
              </motion.div>

              {/* Mobile Navigation */}
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className='flex-1 flex flex-col space-y-3'
              >
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        'flex items-center space-x-3 px-4 py-3 rounded-lg text-left',
                        'transition-colors duration-200',
                        isActive
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:text-primary hover:bg-accent'
                      )}
                    >
                      <Icon size={20} />
                      <span className='font-medium'>{item.name}</span>
                    </motion.button>
                  )
                })}
              </motion.nav>

              {/* Mobile Footer */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
                className='border-t border-border pt-6 space-y-4'
              >
                {/* Get in Touch Button */}
                <motion.button
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                  onClick={() => handleNavClick('#contact')}
                  className={cn(
                    'w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg',
                    'bg-primary text-primary-foreground font-medium',
                    'transition-transform duration-200 active:scale-95'
                  )}
                >
                  <span>Get in touch</span>
                </motion.button>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className='flex items-center justify-center space-x-6'
                >
                  {socialLinks.map((link, index) => {
                    const IconComponent = link.icon
                    return (
                      <motion.a
                        key={link.name}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{
                          delay: 0.4 + index * 0.05,
                          duration: 0.2,
                          ease: 'easeOut',
                        }}
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={cn(
                          'text-muted-foreground hover:text-primary',
                          'transition-colors transition-transform duration-200 hover:scale-110 transform'
                        )}
                        aria-label={link.name}
                      >
                        <IconComponent size={24} />
                      </motion.a>
                    )
                  })}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
