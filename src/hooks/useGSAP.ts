import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

/**
 * Hook for scroll-triggered fade-in animations
 */
export function useScrollFadeIn<T extends HTMLElement>(
  options: {
    y?: number
    x?: number
    duration?: number
    delay?: number
    stagger?: number
    childSelector?: string
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const {
    y = 30,
    x = 0,
    duration = 0.6,
    delay = 0,
    stagger = 0.1,
    childSelector,
  } = options

  useEffect(() => {
    if (!ref.current) return

    const targets = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : ref.current

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        x,
        opacity: 0,
        duration,
        delay,
        stagger: childSelector ? stagger : 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [y, x, duration, delay, stagger, childSelector])

  return ref
}

/**
 * Hook for hero entrance animations (no scroll trigger)
 */
export function useHeroAnimation<T extends HTMLElement>(
  delay: number = 0
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay,
        ease: 'power2.out',
      })
    })

    return () => ctx.revert()
  }, [delay])

  return ref
}

/**
 * Hook for staggered children animations
 */
export function useStaggerAnimation<T extends HTMLElement>(
  childSelector: string,
  options: {
    y?: number
    duration?: number
    stagger?: number
    delay?: number
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { y = 20, duration = 0.5, stagger = 0.1, delay = 0 } = options

  useEffect(() => {
    if (!ref.current) return

    const children = ref.current.querySelectorAll(childSelector)
    if (!children.length) return

    const ctx = gsap.context(() => {
      gsap.from(children, {
        y,
        opacity: 0,
        duration,
        stagger,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [childSelector, y, duration, stagger, delay])

  return ref
}

export { gsap, ScrollTrigger }
