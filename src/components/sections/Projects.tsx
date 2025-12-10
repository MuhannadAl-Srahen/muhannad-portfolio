import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, X, Grid3x3, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { projects } from '@/data'
import type { Project } from '@/types'
import { SectionHeader, FlyingOrbs } from '@/components/common'

// Image Gallery Component with arrows
function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Handle empty images array for coming soon projects
  if (!images || images.length === 0) {
    return (
      <div className='absolute inset-0 bg-linear-to-br from-muted/50 to-muted/30 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>🚀</div>
          <p className='text-sm text-muted-foreground font-medium'>Coming Soon</p>
        </div>
      </div>
    )
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className='relative h-full w-full group/gallery'>
      <img
        src={images[currentIndex]}
        alt={`${title} - Image ${currentIndex + 1}`}
        className='w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110'
        style={{ minHeight: '100%' }}
      />
      
      {/* Dark overlay - only on hover */}
      <div className='absolute inset-0 bg-transparent group-hover/gallery:bg-black/40 transition-all duration-300 pointer-events-none' />
      
      {/* Navigation Arrows - Only show on hover and if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className='absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 hover:bg-primary text-white hover:text-black rounded-full flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:scale-110 z-10 cursor-pointer'
            aria-label='Previous image'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
          <button
            onClick={nextImage}
            className='absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 hover:bg-primary text-white hover:text-black rounded-full flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:scale-110 z-10 cursor-pointer'
            aria-label='Next image'
          >
            <ChevronRight className='w-5 h-5' />
          </button>
          
          {/* Dots indicator */}
          <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 z-10'>
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(idx)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  idx === currentIndex ? 'bg-primary w-4' : 'bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Flip Card Component for Modal
function FlipCard({ project }: { project: Project }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className='relative h-[480px] sm:h-[520px] cursor-pointer'
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Front of Card */}
      <div
        className={`absolute inset-0 bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 shadow-lg hover:shadow-xl transition-all ${
          isFlipped
            ? 'opacity-0 scale-95 pointer-events-none'
            : 'opacity-100 scale-100'
        }`}
        style={{
          transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
          {/* Image Gallery */}
          <div className='relative h-40 sm:h-48 overflow-hidden bg-muted/20'>
            <ImageGallery images={project.images} title={project.title} />
            
            {/* Badges */}
            <div className='absolute top-3 left-3 flex gap-2 z-20'>
              <span className='px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-black text-xs font-bold rounded-full'>
                {project.year}
              </span>
              <span className='px-2.5 py-1 bg-accent/90 backdrop-blur-sm text-white text-xs font-bold rounded-full'>
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className='p-5 flex flex-col'>
            <h3 className='text-lg font-bold text-foreground mb-2'>
              {project.title}
            </h3>
            
            <p className='text-sm text-foreground/75 mb-4 leading-relaxed line-clamp-2'>
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className='flex flex-wrap gap-2 mb-4'>
              {project.technologies.slice(0, 4).map((tech) => {
                const Icon = tech.icon
                return (
                  <div
                    key={tech.name}
                    className='inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-lg'
                  >
                    <Icon className='w-4 h-4' style={{ color: tech.color }} />
                    <span className='text-sm text-foreground'>{tech.name}</span>
                  </div>
                )
              })}
            </div>

            {/* Flip hint */}
            <div className='mt-auto text-center text-sm text-muted-foreground pt-3 border-t border-border flex items-center justify-center gap-2'>
              <RotateCcw className='w-4 h-4' />
              <span>Click to see details</span>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className={`absolute inset-0 bg-card border border-primary/40 rounded-2xl overflow-hidden shadow-xl ${
            isFlipped
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
          style={{
            transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className='p-5 h-full flex flex-col'>
            {/* Header */}
            <div className='pb-3 border-b border-primary/20'>
              <div className='flex items-center justify-between gap-2 mb-1'>
                <h3 className='text-lg font-bold text-primary'>
                  {project.title}
                </h3>
                <span className='px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full'>
                  {project.category}
                </span>
              </div>
              <p className='text-sm text-muted-foreground leading-snug'>
                {project.description}
              </p>
            </div>

            {/* KEY FEATURES */}
            <div className='py-3 border-b border-border/50'>
              <h4 className='text-sm font-bold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2'>
                <span className='w-1 h-4 bg-primary rounded-full'></span>
                Key Features
              </h4>
              <ul className='space-y-1'>
                {project.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className='flex items-start gap-2 text-sm text-muted-foreground'
                  >
                    <span className='text-primary shrink-0'>✦</span>
                    <span className='leading-snug'>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TECHNOLOGIES */}
            <div className='py-3'>
              <h4 className='text-sm font-bold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2'>
                <span className='w-1 h-4 bg-primary rounded-full'></span>
                Technologies
              </h4>
              <div className='flex flex-wrap gap-1.5'>
                {project.technologies.map((tech) => {
                  const Icon = tech.icon
                  return (
                    <div
                      key={tech.name}
                      className='inline-flex items-center gap-1 px-2 py-1 bg-primary/10 border border-primary/20 rounded-md'
                    >
                      <Icon className='w-4 h-4' style={{ color: tech.color }} />
                      <span className='text-sm text-foreground'>{tech.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='mt-auto pt-3 border-t border-primary/20'>
              <div className='flex gap-2 mb-2'>
                <a
                  href={project.liveUrl || '#'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] text-black font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm'
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className='w-4 h-4' />
                  Live Demo
                </a>
                <a
                  href={project.codeUrl || '#'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 bg-muted hover:bg-muted/60 hover:border-primary/50 hover:shadow-md hover:scale-[1.02] border border-border text-foreground font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm'
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className='w-4 h-4' />
                  Code
                </a>
              </div>
              <div className='text-center text-sm text-muted-foreground flex items-center justify-center gap-2'>
                <RotateCcw className='w-4 h-4' />
                <span>Click to go back</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default function ProjectsNew() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleCloseModal = () => {
    setIsClosing(true)
    // Remove modal-open class immediately so navbar shows while modal closes
    document.body.classList.remove('modal-open')
    setTimeout(() => {
      setShowAllProjects(false)
      setIsClosing(false)
    }, 300) // Match animation duration
  }

  const handleOpenModal = () => {
    setShowAllProjects(true)
  }

  // Lock body scroll and hide navbar when modal is open
  useEffect(() => {
    if (showAllProjects) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('modal-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('modal-open')
    }
  }, [showAllProjects])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    const header = headerRef.current
    const projectCards = sectionRef.current?.querySelectorAll('.project-timeline-card')

    if (header) observer.observe(header)
    if (projectCards) {
      projectCards.forEach((card) => observer.observe(card))
    }

    return () => {
      if (header) observer.unobserve(header)
      if (projectCards) projectCards.forEach((card) => observer.unobserve(card))
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id='projects'
      className='py-20 relative overflow-hidden'
    >
      <FlyingOrbs variant='projects' />

      <div className='container mx-auto px-6 relative z-10'>
        {/* Section Header */}
        <div
          ref={headerRef}
          className='mb-24 opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 [&.animate-in]:scale-100'
        >
          <SectionHeader
            title='Featured'
            highlight='Projects'
            subtitle='A showcase of innovative solutions and creative executions'
          />
        </div>

        {/* Vertical Timeline */}
        <div className='max-w-6xl mx-auto relative'>
          {/* Timeline Line */}
          <div className='absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-primary/50 to-transparent hidden lg:block' />

          {/* Projects */}
          <div className='space-y-16 sm:space-y-24 lg:space-y-32'>
            {projects.filter(p => p.status === 'completed').map((project, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={project.id}
                  className={`project-timeline-card relative opacity-0 transition-all duration-700 ease-out ${
                    isEven ? 'translate-x-[-100px]' : 'translate-x-[100px]'
                  } [&.animate-in]:opacity-100 [&.animate-in]:translate-x-0`}
                >
                  <div
                    className={`grid lg:grid-cols-2 gap-8 items-start ${
                      isEven ? '' : 'lg:grid-flow-dense'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className='hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20'>
                      <div className='relative'>
                        <div className='w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50 animate-pulse-slow' />
                        <div className='absolute inset-0 w-6 h-6 bg-primary/30 rounded-full animate-ping' />
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className={`relative group ${isEven ? '' : 'lg:col-start-2'}`}>
                      <div className='absolute -inset-4 bg-linear-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700' />
                      <div className='relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-border/50 group-hover:border-primary/50 shadow-2xl transition-all duration-500 h-[280px] sm:h-[350px] md:h-[400px]'>
                        <ImageGallery images={project.images} title={project.title} />
                        
                        {/* Floating Tags */}
                        <div className='absolute top-6 left-6 flex gap-2 z-20'>
                          <span className='px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-black text-xs font-bold rounded-full'>
                            {project.year}
                          </span>
                          <span className='px-3 py-1.5 bg-accent/90 backdrop-blur-sm text-white text-xs font-bold rounded-full'>
                            {project.category}
                          </span>
                        </div>

                        {/* Bottom overlay */}
                        <div className='absolute bottom-0 left-0 right-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20'>
                          <div className='flex gap-3'>
                            {project.technologies.slice(0, 3).map((tech) => {
                              const Icon = tech.icon
                              return (
                                <div
                                  key={tech.name}
                                  className='w-10 h-10 bg-card/90 backdrop-blur-md rounded-full flex items-center justify-center border border-border/50'
                                >
                                  <Icon className='w-5 h-5' style={{ color: tech.color }} />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`space-y-6 flex flex-col justify-start ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                      <div>
                        <div className='inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-bold mb-4'>
                          Project #{String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight'>
                          {project.title}
                        </h3>
                        <p className='text-lg text-foreground/75 leading-relaxed'>
                          {project.description}
                        </p>
                      </div>

                      {/* Highlights Grid */}
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 content-center'>
                        {project.highlights.map((highlight, i) => (
                          <div
                            key={i}
                            className='bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 flex flex-col gap-2 hover:scale-105'
                          >
                            <div className='flex items-start gap-2'>
                              <span className='text-primary text-xl mt-0.5'>✦</span>
                              <span className='text-sm text-muted-foreground leading-snug'>
                                {highlight}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className='flex flex-wrap gap-2'>
                        {project.technologies.map((tech) => {
                          const Icon = tech.icon
                          return (
                            <div
                              key={tech.name}
                              className='inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-md border border-border/50 rounded-xl hover:border-primary/50 hover:scale-105 transition-all duration-300'
                            >
                              <Icon className='w-4 h-4' style={{ color: tech.color }} />
                              <span className='text-sm font-medium text-foreground'>
                                {tech.name}
                              </span>
                            </div>
                          )
                        })}
                      </div>

                      {/* CTA Buttons */}
                      <div className='flex gap-4 pt-2'>
                        <a
                          href={project.liveUrl || '#'}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex-1 bg-primary hover:bg-primary/90 text-black font-bold px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 hover:scale-105'
                        >
                          <ExternalLink className='w-5 h-5' />
                          View Project
                        </a>
                        <a
                          href={project.codeUrl || '#'}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex-1 bg-card hover:bg-muted border-2 border-border hover:border-primary/50 text-foreground font-bold px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105'
                        >
                          <Github className='w-5 h-5' />
                          Source Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* View All Projects Button */}
          <div className='flex justify-center mt-20'>
            <button
              onClick={handleOpenModal}
              className='group bg-card/80 backdrop-blur-md hover:bg-primary/10 border-2 border-border hover:border-primary/50 text-foreground font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 hover:scale-105 shadow-lg hover:shadow-xl'
            >
              <Grid3x3 className='w-5 h-5 text-primary' />
              View All Projects
              <span className='text-xs text-muted-foreground'>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* All Projects Modal - Rendered as Portal-like fixed overlay */}
      {showAllProjects && (
        <div
          className={`fixed inset-0 z-9999 flex items-start sm:items-center justify-center p-0 sm:p-4 md:p-6 backdrop-blur-lg transition-all duration-300 ${
            isClosing ? 'bg-black/0 opacity-0' : 'bg-black/60 opacity-100'
          }`}
          onClick={handleCloseModal}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div
            className={`relative w-full sm:max-w-[95vw] lg:max-w-[1400px] h-full sm:h-auto sm:max-h-[90vh] bg-linear-to-br from-background via-background to-muted/20 sm:rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border-0 sm:border border-primary/10 ${
              isClosing 
                ? 'opacity-0 scale-95 translate-y-8' 
                : 'opacity-100 scale-100 translate-y-0'
            }`}
            style={{ animation: isClosing ? 'none' : 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            onClick={(e) => e.stopPropagation()}
          >
              {/* Modal Header */}
              <div className='sticky top-0 z-10 bg-linear-to-r from-background via-background to-muted/10 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-b border-primary/10'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex-1 min-w-0'>
                    <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 sm:gap-3 md:gap-4'>
                      <span className='w-1 sm:w-1.5 h-6 sm:h-7 md:h-8 bg-primary rounded-full flex-shrink-0'></span>
                      All Projects
                    </h3>
                    <p className='text-xs sm:text-sm text-muted-foreground ml-4 sm:ml-5 md:ml-6 mt-1 sm:mt-2 truncate'>
                      {projects.length} projects showcasing diverse skills and expertise
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className='p-2 sm:p-2.5 md:p-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90 group flex-shrink-0'
                    aria-label='Close modal'
                  >
                    <X className='w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary/70 group-hover:text-primary transition-colors' />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className='overflow-y-auto h-[calc(100vh-100px)] sm:h-auto sm:max-h-[calc(90vh-120px)] px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 bg-linear-to-b from-transparent via-background to-muted/10 scrollbar-hide'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6'>
                  {projects.map((project) => (
                    <FlipCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </section>
  )
}
