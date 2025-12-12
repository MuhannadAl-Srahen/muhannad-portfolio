interface FlyingOrbsProps {
  /** Variant for slight positioning differences per section */
  variant?: 'default' | 'hero' | 'projects'
}

/**
 * Reusable flying orbs background animation component
 * Provides consistent animated background across all sections
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
    <div className='absolute inset-0 z-0 pointer-events-none' style={{contain: 'layout style paint'}}>
      {/* Primary Flying Orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className='absolute w-4 h-4 bg-primary/60 rounded-full animate-float-orb shadow-lg shadow-primary/40 will-change-transform'
          style={{
            left: `${offset.primary + i * 15}%`,
            top: `${20 + i * 12}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${12 + i * 2}s`,
            zIndex: 20,
            contain: 'layout style paint',
          }}
        />
      ))}

      {/* Accent Orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`accent-${i}`}
          className='absolute w-2 h-2 bg-accent/70 rounded-full animate-float-orb-reverse shadow-lg shadow-accent/50 will-change-transform'
          style={{
            right: `${offset.accent + i * 15}%`,
            bottom: `${10 + i * 18}%`,
            animationDelay: `${i * 3}s`,
            animationDuration: `${15 + i * 2.5}s`,
            zIndex: 20,
            contain: 'layout style paint',
          }}
        />
      ))}

      {/* Small Scattered Orbs */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`small-${i}`}
          className='absolute w-1.5 h-1.5 bg-primary/50 rounded-full animate-float-orb shadow-md shadow-primary/30 will-change-transform'
          style={{
            left: `${offset.small + i * 10}%`,
            top: `${40 + i * 8}%`,
            animationDelay: `${i * 4}s`,
            animationDuration: `${18 + i * 3}s`,
            zIndex: 20,
            contain: 'layout style paint',
          }}
        />
      ))}

      {/* Large Ambient Background Lights */}
      <div className='absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse-slow will-change-transform' style={{contain: 'layout style paint'}} />
      <div
        className='absolute bottom-1/3 right-1/3 w-64 h-64 bg-accent/12 rounded-full blur-3xl animate-pulse-slow will-change-transform'
        style={{ animationDelay: '5s', contain: 'layout style paint' }}
      />
      <div
        className='absolute top-1/2 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-breathe will-change-transform'
        style={{ animationDelay: '2s', contain: 'layout style paint' }}
      />
      <div
        className='absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-breathe will-change-transform'
        style={{ animationDelay: '7s', contain: 'layout style paint' }}
      />
    </div>
  )
}
