import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from './components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='portfolio-theme'>
      <div className='min-h-screen bg-background text-foreground'>
        <Navbar />
        <main>
          <Hero />
          <About />
        </main>
      </div>
    </ThemeProvider>
  )
}
