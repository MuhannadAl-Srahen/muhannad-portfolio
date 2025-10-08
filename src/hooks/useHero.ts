import { useState, useEffect } from 'react'

const titles = ['Full Stack Developer', 'Software Engineer', 'UI/UX Developer']

export function useHero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex]
    const typeSpeed = isDeleting ? 50 : 100
    const pauseDuration = isComplete ? 2000 : 0

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setIsComplete(true)
        setTimeout(() => {
          setIsDeleting(true)
          setIsComplete(false)
        }, pauseDuration)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
      } else {
        const nextText = isDeleting
          ? currentTitle.substring(0, displayText.length - 1)
          : currentTitle.substring(0, displayText.length + 1)
        setDisplayText(nextText)
      }
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTitleIndex, isComplete])

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/Muhannad_Al-Srahen_Resume.pdf'
    link.download = 'Muhannad_Al-Srahen_Resume.pdf'
    link.click()
  }

  const handleGetInTouch = () => {
    const element = document.querySelector('#contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    displayText,
    mousePosition,
    handleDownloadCV,
    handleGetInTouch,
  }
}
