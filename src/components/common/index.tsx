// Common UI Components - barrel export
export { default as GlobalBackground } from './GlobalBackground'
export { default as SectionHeader } from './SectionHeader'
export { default as FlyingOrbs } from './FlyingOrbs'
export { default as TechBadge } from './TechBadge'
export { default as Card } from './Card'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  onLoad?: () => void
}

/**
 * Optimized image component with loading state, lazy loading, and proper sizing
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  onLoad,
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} animate-fade-in-up`}
      loading={priority ? 'eager' : 'lazy'}
      decoding='async'
      onLoad={onLoad}
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        aspectRatio: 'auto'
      }}
    />
  )
}

/**
 * Background decoration component - extracted for reuse (CSS-based)
 */
export function BackgroundOrb({
  className,
  animationClass = 'animate-pulse-slow',
  style,
}: {
  className: string
  animationClass?: string
  style?: React.CSSProperties
}) {
  return <div className={`${className} ${animationClass}`} style={style} />
}

/**
 * Animated section wrapper with fade-in animation
 */
export function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`animate-fade-in-up ${className}`}>{children}</div>
}
