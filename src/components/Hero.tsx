import { motion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'
import { useHero } from '@/hooks/useHero'
import headshotImage from '@/assets/My_personal_image.jpeg'

export default function Hero() {
  const { displayText, mousePosition, handleDownloadCV, handleGetInTouch } =
    useHero()

  return (
    <section
      id='home'
      className='min-h-screen flex items-center justify-center px-12 pt-20 relative overflow-hidden'
    >
      {/* Flying Orbs Background Animation */}
      <div className='absolute inset-0 z-0'>
        {/* Primary Flying Orbs - Minimal and Elegant */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className='absolute w-4 h-4 bg-primary/40 rounded-full'
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              x: [0, 150, 0],
              y: [0, -100, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Accent Orbs - Subtle Movement */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`accent-${i}`}
            className='absolute w-2 h-2 bg-accent/50 rounded-full'
            style={{
              right: `${30 + i * 20}%`,
              bottom: `${25 + i * 20}%`,
            }}
            animate={{
              x: [0, -80, 0],
              y: [0, 120, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: i * 4,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Large Ambient Background Lights - Slow and Subtle */}
        <motion.div
          className='absolute top-1/4 left-1/4 w-80 h-80 bg-primary/12 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-1/3 right-1/3 w-64 h-64 bg-accent/6 rounded-full blur-3xl'
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            delay: 10,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute top-1/2 right-1/4 w-96 h-96 bg-primary/6 rounded-full blur-3xl'
          animate={{
            scale: [0.9, 1.3, 0.9],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            delay: 5,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl'
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            delay: 12,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className='container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10'>
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='space-y-8 text-center lg:text-left order-2 lg:order-1'
        >
          {/* Headline with Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className='space-y-4'
          >
            <h1 className='text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight lg:whitespace-nowrap'>
              I'm <span className='text-primary'>Muhannad</span>
              <br />
              <span className='text-foreground min-h-[1.2em] inline-block'>
                {displayText}
                <span className='animate-pulse text-primary'>|</span>
              </span>
            </h1>
          </motion.div>

          {/* Supporting Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className='space-y-6 text-lg md:text-xl text-muted-foreground max-w-2xl'
          >
            <p>
              I design and implement polished — focused on{' '}
              <span className='text-primary font-semibold'>clarity</span>,{' '}
              <span className='text-primary font-semibold'>motion</span>, and{' '}
              <span className='text-primary font-semibold'>performance</span>.
            </p>
            <p>
              I transform{' '}
              <span className='text-primary font-semibold'>ideas</span> into
              <span className='text-foreground font-semibold'>
                {' '}
                exceptional digital experiences{' '}
              </span>
              that engage users and drive results.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'
          >
            <motion.button
              onClick={handleGetInTouch}
              className='group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg overflow-hidden transition-all duration-200 hover:shadow-lg'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
              <div className='relative flex items-center justify-center space-x-2'>
                <Mail className='w-5 h-5' />
                <span>Get in Touch</span>
              </div>
            </motion.button>

            <motion.button
              onClick={handleDownloadCV}
              className='group relative px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-xl font-medium text-lg overflow-hidden transition-all duration-200 hover:text-primary-foreground'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left' />
              <div className='relative flex items-center justify-center space-x-2'>
                <Download className='w-5 h-5' />
                <span>Download CV</span>
              </div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='flex justify-center order-1 lg:order-2'
        >
          <motion.div
            className='relative'
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${
                mousePosition.y * 0.5
              }px)`,
            }}
          >
            {/* Floating Accents */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className='absolute -top-8 -left-8 w-16 h-16 border-2 border-primary/30 rounded-lg'
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className='absolute -bottom-8 -right-8 w-12 h-12 bg-accent/20 rounded-full'
            />

            {/* Main Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className='relative bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm border border-border/50 rounded-3xl p-2 shadow-2xl'
            >
              <motion.img
                src={headshotImage}
                alt='Muhannad Al-Srahen - Frontend Developer'
                className='w-full max-w-md rounded-2xl object-cover aspect-[4/5] border-2 border-primary/90'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />

              {/* Gradient Overlay */}
              <div className='absolute inset-2 rounded-2xl bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none'/>
            </motion.div>

            {/* Floating Particles Around Image */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className='absolute w-2 h-2 bg-primary rounded-full'
                style={{
                  top: `${15 + i * 15}%`,
                  right: `${-15 + (i % 2) * 10}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, Math.sin(i) * 10, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
