import type { ComponentType, CSSProperties } from 'react'

interface TechBadgeProps {
  name: string
  icon: ComponentType<{ className?: string; style?: CSSProperties }>
  color: string
  /** Size variant: sm for compact, md for standard */
  size?: 'sm' | 'md'
}

/**
 * Unified tech badge component for consistent styling
 * Used in Skills, Projects, and other sections
 */
export default function TechBadge({
  name,
  icon: Icon,
  color,
  size = 'md',
}: TechBadgeProps) {
  const sizeClasses = {
    sm: 'gap-1 px-2 py-1 text-xs',
    md: 'gap-1.5 px-3 py-1.5 text-xs',
  }

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  }

  return (
    <div
      className={`inline-flex items-center ${sizeClasses[size]} bg-primary/8 text-primary border border-primary/15 rounded-lg font-medium hover:bg-primary/12 transition-colors duration-300 ease-out`}
    >
      <Icon className={iconSizeClasses[size]} style={{ color }} />
      {name}
    </div>
  )
}
