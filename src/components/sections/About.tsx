import { useEffect, useRef } from 'react'
import { profileImage2 } from '@/assets'
import { aboutStats } from '@/data'
import { SectionHeader, FlyingOrbs, Card } from '@/components/common'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    const header = headerRef.current
    const image = imageRef.current
    const content = contentRef.current
    const statCards = sectionRef.current?.querySelectorAll('.stat-card')

    if (header) observer.observe(header)
    if (image) {
      ;(image as HTMLElement).style.transitionDelay = '100ms'
      observer.observe(image)
    }
    if (content) {
      ;(content as HTMLElement).style.transitionDelay = '200ms'
      observer.observe(content)
    }
    if (statCards) {
      statCards.forEach((card, index) => {
        ;(card as HTMLElement).style.transitionDelay = `${300 + index * 100}ms`
        observer.observe(card)
      })
    }

    return () => {
      if (header) observer.unobserve(header)
      if (image) observer.unobserve(image)
      if (content) observer.unobserve(content)
      if (statCards) statCards.forEach((card) => observer.unobserve(card))
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id='about'
      className='py-20 relative overflow-hidden'
    >
      <FlyingOrbs variant='default' />

      {/* Decorative floating particles */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        {[...Array(5)].map((_, i) => {
          // Show only first 3 on mobile
          if (i >= 3 && window.innerWidth < 768) return null
          return (
            <div
              key={i}
              className='absolute w-2 h-2 bg-primary/40 rounded-full animate-float-orb'
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i * 18) % 70}%`,
                animationDuration: `${10 + i}s`,
              }}
            />
          )
        })}
      </div>

      {/* Additional side orbs (4 on mobile, 6 on desktop) */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        {/* Left side orbs */}
        <div 
          className='absolute w-3 h-3 bg-primary/50 rounded-full'
          style={{
            left: '5%',
            top: '15%',
            animation: 'orb-float-1 14s ease-in-out infinite',
          }}
        />
        <div 
          className='absolute w-2 h-2 bg-accent/60 rounded-full max-md:hidden'
          style={{
            left: '8%',
            top: '45%',
            animation: 'orb-float-2 16s ease-in-out infinite',
          }}
        />
        <div 
          className='absolute w-3 h-3 bg-primary/45 rounded-full'
          style={{
            left: '6%',
            bottom: '25%',
            animation: 'orb-float-3 15s ease-in-out infinite',
          }}
        />
        
        {/* Right side orbs */}
        <div 
          className='absolute w-2 h-2 bg-accent/55 rounded-full max-md:hidden'
          style={{
            right: '7%',
            top: '20%',
            animation: 'orb-float-4 13s ease-in-out infinite',
          }}
        />
        <div 
          className='absolute w-3 h-3 bg-primary/50 rounded-full'
          style={{
            right: '5%',
            top: '55%',
            animation: 'orb-float-1 17s ease-in-out infinite',
          }}
        />
        <div 
          className='absolute w-2 h-2 bg-accent/60 rounded-full max-md:hidden'
          style={{
            right: '9%',
            bottom: '20%',
            animation: 'orb-float-2 14s ease-in-out infinite',
          }}
        />
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        {/* Section Header */}
        <div
          ref={headerRef}
          className='opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 [&.animate-in]:scale-100'
        >
          <SectionHeader
            title='About'
            highlight='Me'
            subtitle='Building the future, one line of code at a time'
          />
        </div>

        <div className='max-w-7xl mx-auto'>
          {/* Main Content */}
          <div className='grid lg:grid-cols-5 gap-8 lg:gap-12 mb-12'>
            {/* Image Column */}
            <div
              ref={imageRef}
              className='lg:col-span-2 opacity-0 -translate-x-8 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-x-0'
            >
              <div className='relative group'>
                <div className='absolute -inset-1 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-400 ease-out' />
                <div className='relative rounded-2xl overflow-hidden border border-border/50 shadow-xl group-hover:border-primary/30 transition-all duration-300 ease-out'>
                  <img
                    src={profileImage2}
                    srcSet={`${profileImage2}?w=640 640w, ${profileImage2}?w=800 800w, ${profileImage2}?w=1024 1024w`}
                    sizes="(max-width: 640px) 640px, (max-width: 1024px) 800px, 1024px"
                    alt='Muhannad Al-Srahen'
                    className='w-full h-[450px] lg:h-[550px] object-cover'
                    loading='lazy'
                    width='640'
                    height='800'
                  />
                  <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent' />
                  
                  {/* Name Overlay */}
                  <div className='absolute bottom-0 left-0 right-0 p-6'>
                    <h3 className='text-2xl font-bold text-white mb-1'>
                      Muhannad Al-Srahen
                    </h3>
                    <p className='text-base text-primary font-semibold'>
                      Software Engineer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div
              ref={contentRef}
              className='lg:col-span-3 space-y-6 opacity-0 translate-x-8 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-x-0'
            >
              {/* Main Intro Card */}
              <Card padding='lg' hoverable={true}>
                <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4 flex flex-wrap items-center gap-2'>
                  Hi, I'm <span className='text-primary'>Muhannad</span>
                  <span className='text-2xl sm:text-3xl'>👋</span>
                </h3>
                <div className='space-y-4 text-base leading-relaxed text-foreground/75'>
                  <p>
                    I'm a <span className='text-primary font-semibold'>software engineer</span> who loves building <span className='text-primary font-semibold'>products</span> that make a difference. 
                    I combine <span className='text-primary font-semibold'>technical expertise</span> with creative problem-solving to deliver 
                    exceptional digital experiences.
                  </p>
                  <p className='text-foreground/75'>
                    My goal is to write <span className='text-primary font-semibold'>clean, maintainable code</span> that not only works great 
                    but is also a joy to work with for other developers.
                  </p>
                </div>
              </Card>

              {/* Two Column Cards */}
              <div className='grid md:grid-cols-2 gap-6'>
                <Card>
                  <h4 className='text-lg font-bold text-foreground mb-3'>
                    What I Do
                  </h4>
                  <p className='text-sm leading-relaxed text-muted-foreground'>
                    I specialize in building <span className='text-primary font-semibold'>modern, scalable</span> web applications using <span className='text-primary font-semibold'>React</span>, 
                    <span className='text-primary font-semibold'> TypeScript</span>, and <span className='text-primary font-semibold'>Next.js</span>. My work focuses on creating <span className='text-primary font-semibold'>user experiences</span> 
                    that are not only <span className='text-primary font-semibold'>fast and accessible</span>, but also delightful and intuitive. 
                    I believe great products come from attention to detail and thoughtful design.
                  </p>
                </Card>

                <Card>
                  <h4 className='text-lg font-bold text-foreground mb-3'>
                    My Experience
                  </h4>
                  <p className='text-sm leading-relaxed text-muted-foreground'>
                    Throughout my career, I've had the opportunity to work with <span className='text-primary font-semibold'>amazing teams</span> 
                    at <span className='text-primary font-semibold'>ComfTech</span> and{' '}
                    <span className='text-primary font-semibold'>eCampusJo</span>. 
                    I've contributed to <span className='text-primary font-semibold'>projects</span> that significantly improved <span className='text-primary font-semibold'>user engagement</span>, 
                    streamlined <span className='text-primary font-semibold'>workflows</span>, and delivered <span className='text-primary font-semibold'>real value</span> to end users.
                  </p>
                </Card>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {aboutStats.map((item) => (
              <div
                key={item.label}
                className='stat-card opacity-0 translate-y-10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0'
              >
                <Card className='text-center h-full'>
                  <div className='text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent mb-2'>
                    {item.value}
                  </div>
                  <div className='text-sm font-semibold text-foreground mb-1'>
                    {item.unit}
                  </div>
                  <div className='text-xs text-muted-foreground uppercase tracking-wider'>
                    {item.label}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
