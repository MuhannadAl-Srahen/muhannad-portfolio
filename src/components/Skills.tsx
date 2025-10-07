import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostman,
  SiNotion,
  SiVercel,
} from 'react-icons/si'
import { TbBrandRedux } from 'react-icons/tb'
import { VscCode } from 'react-icons/vsc'
import { FaServer, FaCode, FaPalette, FaTools, FaRocket } from 'react-icons/fa'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      icon: FaCode,
      iconColor: 'rgb(var(--primary))',
      title: 'Frontend Development',
      description:
        'Building responsive and optimized web applications with modern frameworks.',
      skills: [
        { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
        { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      ],
    },
    {
      icon: FaPalette,
      iconColor: 'rgb(var(--primary))',
      title: 'Styling & UI Frameworks',
      description:
        'Crafting modern and maintainable UI components with efficient styling techniques.',
      skills: [
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'ShadCN/UI', icon: SiReact, color: '#000000' },
        { name: 'Framer Motion', icon: SiReact, color: '#0055FF' },
        { name: 'CSS Modules', icon: SiCss3, color: '#1572B6' },
      ],
    },
    {
      icon: TbBrandRedux,
      iconColor: 'rgb(var(--primary))',
      title: 'State Management',
      description:
        'Handling application state efficiently for scalable applications.',
      skills: [
        { name: 'Context API', icon: SiReact, color: '#61DAFB' },
        { name: 'Tanstack Query', icon: SiReact, color: '#FF4154' },
        { name: 'Redux Toolkit', icon: TbBrandRedux, color: '#764ABC' },
      ],
    },
    {
      icon: FaServer,
      iconColor: 'rgb(var(--primary))',
      title: 'Backend Development',
      description:
        'Connecting frontend applications to databases and backend services.',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, color: '#000000' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      ],
    },
    {
      icon: FaRocket,
      iconColor: 'rgb(var(--primary))',
      title: 'Version Control & Deployment',
      description:
        'Managing code collaboration and deploying applications efficiently.',
      skills: [
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'GitHub', icon: SiGithub, color: '#181717' },
        { name: 'Vercel', icon: SiVercel, color: '#000000' },
        { name: 'Netlify', icon: SiReact, color: '#00C7B7' },
      ],
    },
    {
      icon: FaTools,
      iconColor: 'rgb(var(--primary))',
      title: 'Tools',
      description:
        'Leveraging modern tools to boost productivity, collaboration, and project quality.',
      skills: [
        { name: 'VS Code', icon: VscCode, color: '#007ACC' },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
        { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
        { name: 'Notion', icon: SiNotion, color: '#000000' },
      ],
    },
  ]

  return (
    <section
      id='skills'
      className='py-20 bg-gradient-to-b from-background via-background/95 to-muted/30 relative overflow-hidden'
    >
      {/* Enhanced Background Elements - Similar to About section */}
      <div className='absolute inset-0'>
        {/* Background matching Hero section with center lighting */}
        <motion.div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/12 rounded-full blur-3xl'
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
          className='absolute top-1/3 right-1/4 w-80 h-80 bg-accent/6 rounded-full blur-3xl'
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
          className='absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary/6 rounded-full blur-3xl'
          animate={{
            scale: [0.9, 1.3, 0.9],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            delay: 5,
            ease: 'easeInOut',
          }}
        />

        {/* Side orbs for subtle movement */}
        <motion.div
          className='absolute top-1/4 left-8 w-4 h-4 bg-primary/40 rounded-full'
          animate={{
            y: [0, -8, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute top-1/2 right-8 w-2 h-2 bg-accent/50 rounded-full'
          animate={{
            y: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* CSS Animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `,
        }}
      />

      <div className='container mx-auto px-6 relative z-10'>
        {/* Section Header - Matching About section style */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-6 tracking-tight'>
            My{' '}
            <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              Skills
            </span>
          </h2>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
            Technologies and tools I use to{' '}
            <span className='text-primary font-semibold'>
              craft digital experiences
            </span>{' '}
            and bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid with Framer Motion */}
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                  className='group relative bg-background/90 dark:bg-card/90 border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 transition-all duration-200 ease-out'
                >
                  {/* Simple background effect */}
                  <div className='absolute inset-0 bg-primary/2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150' />

                  <div className='relative z-10'>
                    {/* Simple Category Icon */}
                    <div className='mb-4'>
                      <div className='w-14 h-14 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:border-primary/30 transition-colors duration-150'>
                        <IconComponent className='w-7 h-7 text-foreground/70 group-hover:text-primary transition-colors duration-150' />
                      </div>
                    </div>

                    {/* Category Title */}
                    <h3 className='text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-150'>
                      {category.title}
                    </h3>

                    {/* Category Description */}
                    <p className='text-sm text-muted-foreground mb-4 leading-relaxed'>
                      {category.description}
                    </p>

                    {/* Simple Skills Tags */}
                    <div className='flex flex-wrap gap-2'>
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/8 text-primary border border-primary/15 rounded-lg text-xs font-medium hover:bg-primary/12 transition-colors duration-100'
                        >
                          <skill.icon
                            className='w-3 h-3'
                            style={{ color: skill.color }}
                          />
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
