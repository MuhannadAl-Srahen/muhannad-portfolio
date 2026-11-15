import { useState, useEffect, useRef } from 'react'
import { profile } from '@/data'

const TYPE_SPEED_MS = 100 // per character while typing
const DELETE_SPEED_MS = 50 // per character while erasing
const PAUSE_MS = 2000 // how long a full title stays on screen
const PARALLAX_STRENGTH = 3 // max pixels the photo drifts toward the cursor (same as before)

const titles = profile.heroTitles

export function useHero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  // The element that follows the mouse. We move it directly through its style
  // instead of React state, so the hero does not re-render on every mouse move.
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame) // at most one style update per screen frame
      frame = requestAnimationFrame(() => {
        if (!parallaxRef.current) return
        const x = (e.clientX / window.innerWidth - 0.5) * 2 * PARALLAX_STRENGTH
        const y = (e.clientY / window.innerHeight - 0.5) * 2 * PARALLAX_STRENGTH
        parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Typewriter: type a title, pause, erase it, then move on to the next one.
  // Each run of this effect schedules exactly one step, and the cleanup cancels it,
  // so no stray timers are left behind.
  useEffect(() => {
    const fullTitle = titles[titleIndex]
    let delay = isDeleting ? DELETE_SPEED_MS : TYPE_SPEED_MS
    let step: () => void

    if (!isDeleting && displayText === fullTitle) {
      // finished typing: wait, then start erasing
      delay = PAUSE_MS
      step = () => setIsDeleting(true)
    } else if (isDeleting && displayText === '') {
      // finished erasing: switch to the next title
      step = () => {
        setIsDeleting(false)
        setTitleIndex((index) => (index + 1) % titles.length)
      }
    } else {
      // add or remove one character
      const nextLength = displayText.length + (isDeleting ? -1 : 1)
      step = () => setDisplayText(fullTitle.slice(0, nextLength))
    }

    const timeout = setTimeout(step, delay)
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, titleIndex])

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/Muhannad_AlSrahen_CV.pdf'
    link.download = 'Muhannad_AlSrahen_CV.pdf'
    link.click()
  }

  const handleGetInTouch = () => {
    const element = document.querySelector('#contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    displayText,
    parallaxRef,
    handleDownloadCV,
    handleGetInTouch,
  }
}
