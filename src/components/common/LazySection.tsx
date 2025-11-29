import { Suspense, lazy } from 'react'

// Lazy load heavy components for code splitting
export const LazyProjects = lazy(() => import('@/components/sections/Projects'))
export const LazyContact = lazy(() => import('@/components/sections/Contact'))

// Loading skeleton component
export function SectionSkeleton({ height = 'h-96' }: { height?: string }) {
  return (
    <div className={`${height} w-full flex items-center justify-center`}>
      <div className='flex space-x-2'>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className='w-3 h-3 bg-primary/40 rounded-full animate-bounce'
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

// Wrapper for lazy loaded sections
export function LazySection({
  children,
  fallbackHeight = 'h-96',
}: {
  children: React.ReactNode
  fallbackHeight?: string
}) {
  return (
    <Suspense fallback={<SectionSkeleton height={fallbackHeight} />}>
      {children}
    </Suspense>
  )
}
