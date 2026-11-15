// Soft blurred orbs fixed behind the whole page.
// They drift with the CSS `.bg-orb` animation (index.css), which runs on the GPU.
// The old version ran a GSAP tween in JavaScript on every frame, forever.

// Start delays so the orbs don't all move in sync (like GSAP's random stagger)
const driftDelays = [1.5, 0, 3, 0.5, 2.5, 1, 3.5, 2]

export default function GlobalBackground() {
  return (
    <div className='pointer-events-none select-none fixed inset-0 -z-10 overflow-hidden'>
      {/* Primary orbs */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className='bg-orb absolute rounded-full bg-primary/15'
          style={{
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            left: `${10 + i * 25}%`,
            top: `${15 + i * 20}%`,
            filter: 'blur(60px)',
            animationDelay: `${driftDelays[i]}s`,
          }}
        />
      ))}
      {/* Accent orbs */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`accent-${i}`}
          className='bg-orb absolute rounded-full bg-accent/12'
          style={{
            width: `${100 + i * 30}px`,
            height: `${100 + i * 30}px`,
            right: `${5 + i * 22}%`,
            bottom: `${10 + i * 18}%`,
            filter: 'blur(50px)',
            animationDelay: `${driftDelays[4 + i]}s`,
          }}
        />
      ))}
    </div>
  )
}
