import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GlobalBackground() {
  const orbRefs = useRef<HTMLDivElement[]>([])

  // Run GSAP animations
  useEffect(() => {

    const ctx = gsap.context(() => {
      gsap.to(orbRefs.current, {
        y: 20,
        x: 10,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.5, from: 'random' },
      })
    })

    return () => ctx.revert()
  }, [])

  // 8 orbs with simple GSAP animation
  return (
    <div className='pointer-events-none select-none fixed inset-0 -z-10 overflow-hidden'>
      {/* Primary orbs - just 4 */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={(el) => {
            if (el) orbRefs.current[i] = el
          }}
          className='absolute rounded-full bg-primary/15'
          style={{
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            left: `${10 + i * 25}%`,
            top: `${15 + i * 20}%`,
            filter: 'blur(60px)',
          }}
        />
      ))}
      {/* Accent orbs - just 4 */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`accent-${i}`}
          ref={(el) => {
            if (el) orbRefs.current[4 + i] = el
          }}
          className='absolute rounded-full bg-accent/12'
          style={{
            width: `${100 + i * 30}px`,
            height: `${100 + i * 30}px`,
            right: `${5 + i * 22}%`,
            bottom: `${10 + i * 18}%`,
            filter: 'blur(50px)',
          }}
        />
      ))}
    </div>
  )
}
