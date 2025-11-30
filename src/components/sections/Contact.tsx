import { useEffect, useRef, useState } from 'react'
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  ArrowUpRight,
  Clock,
  User,
  FileText,
  MessageSquare,
} from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa'
import { SectionHeader, FlyingOrbs, Card } from '@/components/common'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/MuhannadAl-Srahen',
    icon: FaGithub,
    color: '#181717',
    description: 'Check out my code',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhannad-alsrahen/',
    icon: FaLinkedin,
    color: '#0A66C2',
    description: "Let's connect",
  },
  {
    name: 'Twitter',
    href: 'https://x.com/_glock_x',
    icon: FaTwitter,
    color: '#1DA1F2',
    description: 'Follow my journey',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/_glock_x/',
    icon: FaInstagram,
    color: '#E4405F',
    description: 'Behind the scenes',
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState('')

  // Update local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const jordanTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Amman',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      setCurrentTime(jordanTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

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
    const info = infoRef.current
    const form = formRef.current
    const socialLinks = sectionRef.current?.querySelectorAll('.social-link')

    if (header) observer.observe(header)
    if (info) {
      ;(info as HTMLElement).style.transitionDelay = '100ms'
      observer.observe(info)
    }
    if (form) {
      ;(form as HTMLElement).style.transitionDelay = '200ms'
      observer.observe(form)
    }
    if (socialLinks) {
      socialLinks.forEach((link, index) => {
        ;(link as HTMLElement).style.transitionDelay = `${300 + index * 50}ms`
        observer.observe(link)
      })
    }

    return () => {
      if (header) observer.unobserve(header)
      if (info) observer.unobserve(info)
      if (form) observer.unobserve(form)
      if (socialLinks) socialLinks.forEach((link) => observer.unobserve(link))
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setIsSubmitted(true)

      // Reset form after showing success
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again or email me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const inputClasses = (fieldName: string, hasError: boolean) => `
    w-full px-4 py-3 bg-card/50 border-2 rounded-xl
    text-foreground placeholder:text-muted-foreground/60
    transition-all duration-300 ease-out outline-none
    ${
      hasError
        ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
        : focusedField === fieldName
        ? 'border-primary ring-2 ring-primary/20'
        : 'border-border hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20'
    }
  `

  return (
    <section
      ref={sectionRef}
      id='contact'
      className='py-20 relative overflow-hidden'
    >
      <FlyingOrbs variant='default' />

      <div className='container mx-auto px-6 relative z-10'>
        {/* Section Header */}
        <div
          ref={headerRef}
          className='opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 [&.animate-in]:scale-100'
        >
          <SectionHeader
            title='Get in'
            highlight='Touch'
            subtitle="Have a project in mind or just want to chat? I'd love to hear from you"
          />
        </div>

        <div className='max-w-6xl mx-auto'>
          <div className='grid lg:grid-cols-3 gap-8 lg:gap-12'>
            {/* Contact Info & Social Links */}
            <div
              ref={infoRef}
              className='lg:col-span-1 space-y-6 opacity-0 -translate-x-8 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-x-0'
            >
              {/* Quick Contact Cards */}
              <div className='space-y-4'>
                <a
                  href='mailto:muhannadalsrahen@gmail.com'
                  className='block'
                >
                  <Card
                    hoverable={true}
                    className='group'
                    padding='md'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='shrink-0 w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300'>
                        <Mail className='w-5 h-5 text-primary' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='font-medium text-foreground group-hover:text-primary transition-colors duration-300 ease-out'>
                          Email Me
                        </p>
                        <p className='text-sm text-muted-foreground truncate'>
                          muhannadalsrahen@gmail.com
                        </p>
                      </div>
                      <ArrowUpRight className='shrink-0 w-4 h-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out' />
                    </div>
                  </Card>
                </a>

                <Card hoverable={true} padding='md' className='group'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center group-hover:border-accent/30 transition-colors duration-300 ease-out'>
                      <MapPin className='w-5 h-5 text-accent' />
                    </div>
                    <div>
                      <p className='font-medium text-foreground group-hover:text-accent transition-colors duration-300 ease-out'>Location</p>
                      <p className='text-sm text-muted-foreground'>
                        Amman, Jordan 🇯🇴
                      </p>
                    </div>
                  </div>
                </Card>

                <Card hoverable={true} padding='md' className='group'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300 ease-out'>
                      <Clock className='w-5 h-5 text-primary' />
                    </div>
                    <div>
                      <p className='font-medium text-foreground group-hover:text-primary transition-colors duration-300 ease-out'>Local Time</p>
                      <p className='text-sm text-muted-foreground'>
                        {currentTime} (GMT+3)
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social Links */}
              <div className='space-y-4'>
                <h4 className='text-lg font-semibold text-foreground'>
                  Find me on
                </h4>
                <div className='grid grid-cols-2 gap-3'>
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='social-link opacity-0 translate-y-10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0'
                      >
                        <Card
                          hoverable={true}
                          className='group'
                          padding='sm'
                        >
                          <div className='flex items-center gap-3'>
                            <IconComponent className='w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 ease-out' />
                            <span className='text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 ease-out'>
                              {link.name}
                            </span>
                          </div>
                        </Card>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className='lg:col-span-2 opacity-0 translate-x-8 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&.animate-in]:opacity-100 [&.animate-in]:translate-x-0'
            >
              <Card hoverable={false} padding='lg' className='h-full'>
                {isSubmitted ? (
                  <div className='flex flex-col items-center justify-center py-12 text-center'>
                    <div className='w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6'>
                      <CheckCircle className='w-10 h-10 text-green-500' />
                    </div>
                    <h3 className='text-2xl font-bold text-foreground mb-2'>
                      Message Sent!
                    </h3>
                    <p className='text-muted-foreground'>
                      Thanks for reaching out. I'll get back to you soon!
                    </p>
                  </div>
                ) : (
                  <div className='space-y-6'>
                    <div className='grid md:grid-cols-2 gap-6'>
                      {/* Name Field */}
                      <div className='space-y-2'>
                        <label
                          htmlFor='name'
                          className='text-sm font-medium text-foreground flex items-center gap-2'
                        >
                          <User className='w-4 h-4 text-primary' />
                          Name <span className='text-primary'>*</span>
                        </label>
                        <input
                          type='text'
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder='John Doe'
                          className={inputClasses('name', !!errors.name)}
                        />
                        {errors.name && (
                          <p className='text-sm text-destructive'>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className='space-y-2'>
                        <label
                          htmlFor='email'
                          className='text-sm font-medium text-foreground flex items-center gap-2'
                        >
                          <Mail className='w-4 h-4 text-primary' />
                          Email <span className='text-primary'>*</span>
                        </label>
                        <input
                          type='email'
                          id='email'
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder='john@example.com'
                          className={inputClasses('email', !!errors.email)}
                        />
                        {errors.email && (
                          <p className='text-sm text-destructive'>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className='space-y-2'>
                      <label
                        htmlFor='subject'
                        className='text-sm font-medium text-foreground flex items-center gap-2'
                      >
                        <FileText className='w-4 h-4 text-primary' />
                        Subject{' '}
                        <span className='text-muted-foreground'>
                          (optional)
                        </span>
                      </label>
                      <input
                        type='text'
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        placeholder='Project Inquiry'
                        className={inputClasses('subject', false)}
                      />
                    </div>

                    {/* Message Field */}
                    <div className='space-y-2'>
                      <label
                        htmlFor='message'
                        className='text-sm font-medium text-foreground flex items-center gap-2'
                      >
                        <MessageSquare className='w-4 h-4 text-primary' />
                        Message <span className='text-primary'>*</span>
                      </label>
                      <textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell me about your project or just say hi..."
                        rows={5}
                        className={`${inputClasses('message', !!errors.message)} resize-none`}
                      />
                      {errors.message && (
                        <p className='text-sm text-destructive'>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='group w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer transition-all duration-300 ease-out'
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className='w-5 h-5 animate-spin' />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className='w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out' />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                )}
              </Card>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
