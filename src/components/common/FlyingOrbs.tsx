interface FlyingOrbsProps {
  /** Variant for slight positioning differences per section */
  variant?: 'default' | 'hero' | 'projects'
}

/**
 * Lightweight animated background - disabled on mobile for performance
 */
export default function FlyingOrbs({ variant = 'default' }: FlyingOrbsProps) {

  const offsets = {
    default: { primary: 10, accent: 15 },
    hero: { primary: 20, accent: 25 },
    projects: { primary: 12, accent: 14 },
  }

  const offset = offsets[variant]

  return (
    <div className='absolute inset-0 z-0 pointer-events-none'>
      {/* 5 orbs with random circular movements */}
      {[...Array(5)].map((_, i) => {
        const animations = ['orb-float-1', 'orb-float-2', 'orb-float-3', 'orb-float-4', 'orb-float-1']
        const isAccent = i >= 3
        return (
          <div
            key={`orb-${i}`}
            className={`absolute rounded-full ${isAccent ? 'w-2 h-2 bg-accent/60' : 'w-3 h-3 bg-primary/50'}`}
            style={{
              left: i < 3 ? `${offset.primary + i * 25}%` : undefined,
              right: i >= 3 ? `${offset.accent + (i - 3) * 25}%` : undefined,
              top: i < 3 ? `${25 + i * 20}%` : undefined,
              bottom: i >= 3 ? `${20 + (i - 3) * 30}%` : undefined,
              animation: `${animations[i]} ${12 + i * 2}s ease-in-out infinite`,
            }}
          />
        )
      })}

      {/* Simple background glow - no blur-3xl */}
      <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full' style={{filter: 'blur(80px)'}} />
      <div className='absolute bottom-1/3 right-1/3 w-48 h-48 bg-accent/8 rounded-full' style={{filter: 'blur(80px)'}} />
    </div>
  )
}
