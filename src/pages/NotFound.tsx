import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Mail, Github, Linkedin } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = '404 - Page Not Found | Muhannad Al-Srahen'
  }, [])

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className='min-h-screen bg-background text-foreground flex items-center justify-center px-6'>
      <div className='max-w-2xl w-full text-center'>
        {/* 404 Animation */}
        <div className='relative mb-8'>
          <h1 className='text-[150px] md:text-[200px] font-bold text-primary/20 leading-none select-none'>
            404
          </h1>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-6xl animate-bounce'>🔍</div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>
          Page Not Found
        </h2>
        <p className='text-lg text-muted-foreground mb-8 max-w-md mx-auto'>
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
          <button
            onClick={handleGoHome}
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors'
          >
            <Home size={20} />
            Go to Homepage
          </button>
          <button
            onClick={handleGoBack}
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors'
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className='border-t border-border pt-8'>
          <h3 className='text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider'>
            Quick Links
          </h3>
          <div className='flex flex-wrap justify-center gap-6 mb-8'>
            <a
              href='/#about'
              className='text-foreground hover:text-primary transition-colors'
            >
              About
            </a>
            <a
              href='/#skills'
              className='text-foreground hover:text-primary transition-colors'
            >
              Skills
            </a>
            <a
              href='/#projects'
              className='text-foreground hover:text-primary transition-colors'
            >
              Projects
            </a>
            <a
              href='/#contact'
              className='text-foreground hover:text-primary transition-colors'
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className='flex justify-center gap-4'>
            <a
              href='https://github.com/MuhannadAl-Srahen'
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors'
              aria-label='GitHub'
            >
              <Github size={20} />
            </a>
            <a
              href='https://linkedin.com/in/muhannad-alsrahen'
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors'
              aria-label='LinkedIn'
            >
              <Linkedin size={20} />
            </a>
            <a
              href='mailto:muhannadalsrahen@gmail.com'
              className='p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors'
              aria-label='Email'
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <p className='text-sm text-muted-foreground mt-8'>
          Need help? Feel free to{' '}
          <a href='/#contact' className='text-primary hover:underline'>
            contact me
          </a>
          .
        </p>
      </div>
    </div>
  )
}
