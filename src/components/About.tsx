import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import myImage from '../assets/My_Personal_image2.jpeg'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id='about'
      className='py-20 bg-gradient-to-b from-background via-background/95 to-muted/30 relative overflow-hidden'
    >
      {/* Subtle Background Elements */}
      <div className='absolute inset-0'>
        {/* Gentle Background Shapes - Very Light Animation */}
        <motion.div
          className='absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary/8 via-primary/3 to-transparent rounded-full blur-3xl'
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-0 left-0 w-[350px] h-[350px] bg-gradient-to-tr from-accent/6 via-accent/2 to-transparent rounded-full blur-3xl'
          animate={{
            scale: [1.05, 0.95, 1.05],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 4,
            ease: 'easeInOut',
          }}
        />

        {/* Desktop Circles - Only show on larger screens */}
        <motion.div
          className='hidden lg:block absolute top-32 right-32 w-16 h-16 bg-primary/12 rounded-full'
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-1/4 lg:top-62 left-24 w-12 h-12 bg-accent/15 rounded-full'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 2,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='hidden md:block absolute top-1/3 left-1/12 w-8 h-8 bg-primary/18 rounded-full'
          animate={{
            x: [0, 6, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1,
            ease: 'easeInOut',
          }}
        />

        {/* Mobile-friendly circles - Fewer and better positioned */}
        <motion.div
          className='absolute top-20 right-8 md:right-20 w-6 h-6 md:w-10 md:h-10 bg-primary/20 rounded-full'
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0.5,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-20 left-8 md:left-20 w-8 h-8 md:w-14 md:h-14 bg-accent/16 rounded-full'
          animate={{
            y: [0, -6, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            delay: 1.5,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute top-2/3 right-16 w-7 h-7 bg-primary/14 rounded-full'
          animate={{
            x: [0, -4, 0],
            y: [0, 3, 0],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            delay: 3,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-6 tracking-tight'>
            About{' '}
            <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              Me
            </span>
          </h2>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
            Passionate about creating{' '}
            <span className='text-primary font-semibold'>
              digital experiences
            </span>{' '}
            that make a difference
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-5 gap-8 lg:gap-12 items-start'>
            {/* Large Image Section - Takes up more space */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='lg:col-span-2 relative'
            >
              {/* Image Container - Much Larger and Cleaner */}
              <div className='relative group'>
                {/* Subtle Shadow */}
                <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl transform translate-y-6 group-hover:translate-y-8 transition-transform duration-300' />

                {/* Main Image */}
                <motion.div
                  className='relative bg-card border border-border/50 rounded-2xl overflow-hidden shadow-xl'
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={myImage}
                    alt='Muhannad Al-Srahen - Software Engineer'
                    className='w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover'
                  />
                  {/* Subtle Overlay - Fixed to be less prominent */}
                  <div className='absolute inset-0 bg-gradient-to-t from-background/15 via-transparent to-transparent' />
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='lg:col-span-3 space-y-8'
            >
              {/* Bio Text */}
              <div className='space-y-6'>
                <p className='text-lg leading-relaxed text-foreground font-medium'>
                  Hi, I'm{' '}
                  <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold'>
                    Muhannad Al-Srahen
                  </span>
                  , a{' '}
                  <span className='text-primary font-semibold'>
                    software engineer
                  </span>{' '}
                  dedicated to crafting exceptional digital experiences. I focus
                  on building <span className='text-primary'>accessible</span>,{' '}
                  <span className='text-primary'>performant</span>, and{' '}
                  <span className='text-primary'>maintainable</span> interfaces
                  and enjoy collaborating with designers and product teams to
                  turn ideas into polished products.
                </p>

                <p className='text-lg leading-relaxed text-muted-foreground'>
                  I specialize in modern web technologies including{' '}
                  <span className='text-primary font-semibold'>React</span>,{' '}
                  <span className='text-primary font-semibold'>TypeScript</span>
                  ,{' '}
                  <span className='text-primary font-semibold'>
                    Tailwind CSS
                  </span>
                  , <span className='text-primary font-semibold'>Supabase</span>
                  , and{' '}
                  <span className='text-primary font-semibold'>Next.js</span>.
                  My focus is on building user-centric applications that solve
                  real-world problems.
                </p>

                <p className='text-lg leading-relaxed text-muted-foreground'>
                  I've contributed to projects at{' '}
                  <span className='text-primary font-semibold'>ComfTech</span>{' '}
                  and{' '}
                  <span className='text-primary font-semibold'>eCampusJo</span>,
                  where I helped improve user engagement and streamline digital
                  workflows. Beyond coding, I'm passionate about mentoring
                  aspiring developers and sharing knowledge within the tech
                  community.
                </p>
              </div>

              {/* Skills & Stats Grid */}
              <div className='grid grid-cols-2 gap-4'>
                {[
                  { label: 'Experience', value: '2+', unit: 'Years' },
                  { label: 'Projects', value: '10+', unit: 'Completed' },
                  { label: 'Technologies', value: '15+', unit: 'Mastered' },
                  { label: 'Focus', value: 'Full Stack', unit: '& UX' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className='group relative bg-background/80 dark:bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center hover:bg-background/90 dark:hover:bg-card/80 hover:border-primary/40 hover:shadow-lg transition-all duration-200'
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className='absolute inset-0 bg-gradient-to-r from-primary/8 to-accent/8 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                    <div className='relative'>
                      <div className='text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200'>
                        {item.value}
                      </div>
                      <div className='text-sm text-muted-foreground font-medium mt-1 transition-colors duration-200'>
                        {item.unit}
                      </div>
                      <div className='text-xs text-muted-foreground mt-1 uppercase tracking-wider transition-colors duration-200'>
                        {item.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
