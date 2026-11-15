import { useRef } from 'react'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import { experiences } from '@/data'
import { SectionHeader, FlyingOrbs, Card } from '@/components/common'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

// Same bouncy fade-up the other sections use; the hook adds `animate-in` on scroll
const revealClasses =
  'reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0'

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  useRevealOnScroll(sectionRef, '.reveal-on-scroll')

  return (
    <section
      ref={sectionRef}
      id='experience'
      className='py-20 relative overflow-hidden'
    >
      <FlyingOrbs />

      <div className='container mx-auto px-6 relative z-10'>
        <div className={revealClasses}>
          <SectionHeader
            title='Work'
            highlight='Experience'
            subtitle='Where I have worked and what I built there'
          />
        </div>

        {/* Timeline: a vertical line on the left with one dot per role */}
        <div className='max-w-4xl mx-auto relative'>
          <div
            aria-hidden='true'
            className='absolute left-3 md:left-5 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-primary/50 to-transparent'
          />

          <ol className='space-y-8'>
            {experiences.map((experience) => (
              <li
                key={`${experience.company}-${experience.role}`}
                className={`relative pl-10 md:pl-14 ${revealClasses}`}
              >
                {/* Timeline dot */}
                <div
                  aria-hidden='true'
                  className='absolute left-3 md:left-5 top-8 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50'
                />
  
                <Card className='group'>
                  {/* Role, company, dates and location */}
                  <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4'>
                    <div>
                      <h3 className='text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 ease-out'>
                        {experience.role}
                      </h3>
                      <p className='text-base font-semibold text-primary'>
                        {experience.company}
                      </p>
                    </div>
                    <div className='flex flex-wrap sm:flex-col sm:items-end gap-x-4 gap-y-1 text-sm text-muted-foreground shrink-0'>
                      <span className='inline-flex items-center gap-1.5'>
                        <Calendar className='w-4 h-4' />
                        {experience.period}
                      </span>
                      <span className='inline-flex items-center gap-1.5'>
                        <MapPin className='w-4 h-4' />
                        {experience.location}
                      </span>
                    </div>
                  </div>
  
                  {/* What I did */}
                  <ul className='space-y-2'>
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className='flex items-start gap-2 text-sm md:text-base text-foreground/75 leading-relaxed'
                      >
                        <span className='text-primary shrink-0' aria-hidden='true'>✦</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
  
                  {experience.link && (
                    <a
                      href={experience.link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-sm font-medium text-primary hover:bg-primary/20 hover:border-primary/40 transition-colors duration-300 ease-out'
                    >
                      <ExternalLink className='w-4 h-4' />
                      {experience.link.label}
                    </a>
                  )}
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
