import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function GlobalBackground() {
  const orbRefs = useRef<HTMLDivElement[]>([])
  const accentOrbRefs = useRef<HTMLDivElement[]>([])
  const microOrbRefs = useRef<HTMLDivElement[]>([])
  const beamRefs = useRef<HTMLDivElement[]>([])
  const sparkRefs = useRef<HTMLDivElement[]>([])
  const haloRefs = useRef<HTMLDivElement[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbRefs.current, {
        y: 22,
        x: 12,
        duration: 5.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.25, from: 'random' },
      })

      gsap.to(accentOrbRefs.current, {
        y: 18,
        x: -10,
        duration: 6.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.22, from: 'edges' },
      })

      gsap.to(microOrbRefs.current, {
        y: 10,
        x: 6,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.12, from: 'random' },
      })

      gsap.to(beamRefs.current, {
        opacity: 0.32,
        duration: 3.3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.35, from: 'center' },
      })

      gsap.to(sparkRefs.current, {
        y: -10,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.18, from: 'random' },
      })

      gsap.to(haloRefs.current, {
        scale: 1.06,
        opacity: 0.12,
        duration: 4.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.3, from: 'edges' },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className='pointer-events-none select-none absolute inset-0 -z-10 overflow-hidden'>
      {/* Large ambient orbs - like Hero background */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`large-orb-${i}`}
          className='absolute rounded-full bg-primary/12 blur-3xl animate-pulse-slow'
          style={{
            width: `${isMobile ? 280 : 360}px`,
            height: `${isMobile ? 280 : 360}px`,
            left: `${(i * 9 + 6) % 92}%`,
            top: `${(i * 11 + 8) % 88}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${18 + i * 2}s`,
          }}
        />
      ))}

      {/* Medium animated orbs */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={(el) => {
            if (el) orbRefs.current[i] = el
          }}
          className='absolute rounded-full bg-primary/22 blur-2xl'
          style={{
            width: `${(isMobile ? 62 : 82) + (i % 4) * (isMobile ? 20 : 28)}px`,
            height: `${(isMobile ? 62 : 82) + (i % 4) * (isMobile ? 20 : 28)}px`,
            left: isMobile
              ? `${(i * 6 + 8) % 92}%`
              : `${(i * 4.8 + 3) % 97}%`,
            top: isMobile
              ? `${(i * 7 + 10) % 96}%`
              : `${(i * 6.2 + 7) % 94}%`,
          }}
        />
      ))}

      {/* Accent large orbs */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`accent-large-${i}`}
          className='absolute rounded-full bg-accent/10 blur-3xl animate-breathe'
          style={{
            width: `${isMobile ? 240 : 320}px`,
            height: `${isMobile ? 240 : 320}px`,
            left: `${(i * 12 + 8) % 88}%`,
            top: `${(i * 10 + 6) % 85}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${20 + i * 3}s`,
          }}
        />
      ))}

      {/* Accent animated orbs */}
      {[...Array(26)].map((_, i) => (
        <div
          key={`accent-orb-${i}`}
          ref={(el) => {
            if (el) accentOrbRefs.current[i] = el
          }}
          className='absolute rounded-full bg-accent/24 blur-xl'
          style={{
            width: `${(isMobile ? 54 : 64) + (i % 3) * (isMobile ? 18 : 22)}px`,
            height: `${(isMobile ? 54 : 64) + (i % 3) * (isMobile ? 18 : 22)}px`,
            left: isMobile
              ? `${(i * 7 + 6) % 92}%`
              : `${(i * 5.5 + 8) % 96}%`,
            top: isMobile
              ? `${(i * 8 + 9) % 94}%`
              : `${(i * 7.2 + 5) % 92}%`,
          }}
        />
      ))}

      {[...Array(10)].map((_, i) => (
        <div
          key={`beam-${i}`}
          ref={(el) => {
            if (el) beamRefs.current[i] = el
          }}
          className='absolute h-[150%] w-40 -skew-x-6 bg-linear-to-b from-primary/12 via-primary/20 to-transparent blur-3xl'
          style={{
            left: `${6 + i * 10}%`,
            top: '-25%',
            opacity: 0.18,
          }}
        />
      ))}

      {[...Array(35)].map((_, i) => (
        <div
          key={`spark-${i}`}
          ref={(el) => {
            if (el) sparkRefs.current[i] = el
          }}
          className='absolute w-2 h-2 rounded-full bg-accent/60'
          style={{
            left: `${(i * 4.1 + 2) % 97}%`,
            top: `${(i * 7.2 + 6) % 96}%`,
            boxShadow:
              '0 0 18px color-mix(in oklch, var(--color-primary, #7cc2ff) 50%, transparent)',
          }}
        />
      ))}

      {/* Small flying orbs like Hero section */}
      {[...Array(isMobile ? 32 : 45)].map((_, i) => (
        <div
          key={`small-fly-${i}`}
          className='absolute rounded-full bg-primary/50 animate-float-orb'
          style={{
            width: `${isMobile ? 12 : 16}px`,
            height: `${isMobile ? 12 : 16}px`,
            left: `${(i * 4.5 + 5) % 96}%`,
            top: `${(i * 5.2 + 8) % 94}%`,
            animationDelay: `${(i * 1.2) % 14}s`,
            animationDuration: `${12 + (i % 5) * 2}s`,
          }}
        />
      ))}

      {/* Accent small flying orbs */}
      {[...Array(isMobile ? 24 : 35)].map((_, i) => (
        <div
          key={`small-accent-${i}`}
          className='absolute rounded-full bg-accent/60 animate-float-orb-reverse'
          style={{
            width: `${isMobile ? 8 : 10}px`,
            height: `${isMobile ? 8 : 10}px`,
            left: `${(i * 5.8 + 9) % 94}%`,
            top: `${(i * 6.4 + 11) % 92}%`,
            animationDelay: `${(i * 1.5) % 18}s`,
            animationDuration: `${15 + (i % 4) * 3}s`,
          }}
        />
      ))}

      {/* Micro particles */}
      {[...Array(isMobile ? 40 : 50)].map((_, i) => (
        <div
          key={`micro-${i}`}
          ref={(el) => {
            if (el) microOrbRefs.current[i] = el
          }}
          className='absolute w-1.5 h-1.5 rounded-full bg-primary/85'
          style={{
            left: isMobile
              ? `${(i * 3.6 + 4) % 96}%`
              : `${(i * 2.9 + 3) % 98}%`,
            top: isMobile
              ? `${(i * 4.2 + 9) % 97}%`
              : `${(i * 3.8 + 6) % 97}%`,
            opacity: isMobile ? 0.95 : 0.85,
            boxShadow:
              '0 0 10px color-mix(in oklch, var(--color-primary, #7cc2ff) 55%, transparent)',
          }}
        />
      ))}

      {isMobile && (
        <>
          {[...Array(20)].map((_, i) => (
            <div
              key={`mobile-cluster-${i}`}
              className='absolute w-2 h-2 rounded-full bg-primary/70'
              style={{
                left: `${8 + (i % 5) * 16}%`,
                top: `${12 + Math.floor(i / 5) * 18}%`,
                boxShadow:
                  '0 0 12px color-mix(in oklch, var(--color-accent, #fcbf49) 55%, transparent)',
              }}
            />
          ))}
        </>
      )}

      {[...Array(5)].map((_, i) => (
        <div
          key={`halo-${i}`}
          ref={(el) => {
            if (el) haloRefs.current[i] = el
          }}
          className='absolute rounded-full bg-primary/8 blur-[120px]'
          style={{
            width: `${320 + i * 40}px`,
            height: `${320 + i * 40}px`,
            left: `${(i * 18 + 12) % 80}%`,
            top: `${(i * 14 + 8) % 75}%`,
            opacity: 0.1,
          }}
        />
      ))}
    </div>
  )
}
