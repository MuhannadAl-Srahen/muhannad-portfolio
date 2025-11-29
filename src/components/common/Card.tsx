import { type ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  /** Whether to apply hover scale effect */
  hoverable?: boolean
  /** Card padding size */
  padding?: 'sm' | 'md' | 'lg'
}

/**
 * Unified card component with consistent styling
 * Standard glassmorphism card used across all sections
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hoverable = true, padding = 'md' }, ref) => {
    const paddingClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm',
          'transition-all duration-300 ease-out',
          hoverable && 'hover:border-primary/30 hover:shadow-xl hover:scale-[1.02]',
          paddingClasses[padding],
          className
        )}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
