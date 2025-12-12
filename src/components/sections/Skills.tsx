import { useEffect, useRef } from 'react'
import { skillCategories } from '@/data'
import { SectionHeader, FlyingOrbs, TechBadge, Card } from '@/components/common'

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

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
    const cards = sectionRef.current?.querySelectorAll('.skill-card')

    if (header) observer.observe(header)
    if (cards) {
      cards.forEach((card, index) => {
        ;(card as HTMLElement).style.transitionDelay = `${index * 100}ms`
        observer.observe(card)
      })
    }

    return () => {
      if (header) observer.unobserve(header)
      if (cards) cards.forEach((card) => observer.unobserve(card))
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id='skills'
      className='py-20 relative overflow-hidden'
    >
      <FlyingOrbs />

      <div className='container mx-auto px-6 relative z-10'>
        {/* Section Header */}
        <div
          ref={headerRef}
          className='opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 [&.animate-in]:scale-100'
        >
          <SectionHeader
            title='My'
            highlight='Skills'
            subtitle='Technologies and tools I use to craft digital experiences and bring ideas to life'
          />
        </div>

        {/* Skills Grid */}
        <div className='max-w-7xl mx-auto'>
          <div className='skills-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {skillCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div
                  key={category.title}
                  className='skill-card opacity-0 translate-y-10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0'
                >
                  <Card className='group relative overflow-hidden h-full'>
                    {/* Hover background effect */}
                    <div className='absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out' />

                    <div className='relative z-10'>
                    {/* Category Icon */}
                    <div className='mb-4'>
                      <div className='w-14 h-14 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300 ease-out'>
                        <IconComponent className='w-7 h-7 text-foreground/70 group-hover:text-primary transition-colors duration-300 ease-out' />
                      </div>
                    </div>

                    {/* Category Title */}
                    <h3 className='text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 ease-out'>
                      {category.title}
                    </h3>

                    {/* Category Description */}
                    <p className='text-sm text-muted-foreground mb-4 leading-relaxed'>
                      {category.description}
                    </p>

                    {/* Skills Tags */}
                    <div className='flex flex-wrap gap-2'>
                      {category.skills.map((skill) => (
                        <TechBadge
                          key={skill.name}
                          name={skill.name}
                          icon={skill.icon}
                          color={skill.color}
                        />
                      ))}
                    </div>
                  </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
