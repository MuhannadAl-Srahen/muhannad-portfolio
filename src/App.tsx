import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from './components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from './components/Skills'

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='portfolio-theme'>
      <div className='min-h-screen bg-background text-foreground'>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
        </main>
      </div>
    </ThemeProvider>
  )
}
