interface FlyingOrbsProps {
  /** Variant for slight positioning differences per section */
  variant?: 'default' | 'hero' | 'projects'
}

/**
 * Reusable flying orbs background animation component
 * Provides consistent animated background across all sections
 * Optimized with reduced orb count and GPU-accelerated animations
 */
export default function FlyingOrbs({ variant = 'default' }: FlyingOrbsProps) {
  // Slight position variations based on variant to avoid visual repetition
  const offsets = {
    default: { primary: 10, accent: 15, small: 30 },
    hero: { primary: 20, accent: 25, small: 35 },
    projects: { primary: 12, accent: 14, small: 25 },
  }

  const offset = offsets[variant]

  return (
    <div className='absolute inset-0 z-0 pointer-events-none' style={{contain: 'strict', contentVisibility: 'auto'}}>
      {/* Primary Flying Orbs - reduced from 6 to 4 */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className='absolute w-4 h-4 bg-primary/60 rounded-full animate-float-orb shadow-lg shadow-primary/40'
          style={{
            left: `${offset.primary + i * 20}%`,
            top: `${20 + i * 15}%`,
            animationDelay: `${i * 2.5}s`,
            animationDuration: `${14 + i * 2}s`,
            zIndex: 20,
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Accent Orbs - reduced from 5 to 3 */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`accent-${i}`}
          className='absolute w-2 h-2 bg-accent/70 rounded-full animate-float-orb-reverse shadow-lg shadow-accent/50'
          style={{
            right: `${offset.accent + i * 20}%`,
            bottom: `${15 + i * 25}%`,
            animationDelay: `${i * 3.5}s`,
            animationDuration: `${16 + i * 3}s`,
            zIndex: 20,
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Small Scattered Orbs - reduced from 4 to 2 */}
      {[...Array(2)].map((_, i) => (
        <div
          key={`small-${i}`}
          className='absolute w-1.5 h-1.5 bg-primary/50 rounded-full animate-float-orb shadow-md shadow-primary/30'
          style={{
            left: `${offset.small + i * 20}%`,
            top: `${45 + i * 15}%`,
            animationDelay: `${i * 5}s`,
            animationDuration: `${20 + i * 4}s`,
            zIndex: 20,
            transform: 'translateZ(0)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Large Ambient Background Lights - reduced blur for performance */}
      <div className='absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-2xl animate-pulse-slow' style={{transform: 'translateZ(0)'}} />
      <div
        className='absolute bottom-1/3 right-1/3 w-64 h-64 bg-accent/12 rounded-full blur-2xl animate-pulse-slow'
        style={{ animationDelay: '5s', transform: 'translateZ(0)' }}
      />
    </div>
  )
}
