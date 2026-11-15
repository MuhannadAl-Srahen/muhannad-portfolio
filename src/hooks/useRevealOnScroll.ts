import { useEffect, type RefObject } from 'react'

/**
 * Adds the `animate-in` class to elements when they scroll into view, the same
 * reveal effect the other sections use. Pass the section ref and a CSS selector
 * for the elements to reveal; each one gets a small extra delay so they stagger.
 */
export function useRevealOnScroll(
  sectionRef: RefObject<HTMLElement | null>,
  selector: string,
  staggerMs = 100
) {
  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll<HTMLElement>(selector)
    if (!elements?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target) // reveal once, then stop watching
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    elements.forEach((element, index) => {
      element.style.transitionDelay = `${index * staggerMs}ms`
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sectionRef, selector, staggerMs])
}
