import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from './components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='portfolio-theme'>
      <div className='min-h-screen bg-background text-foreground'>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  )
}
