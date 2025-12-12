interface SectionHeaderProps {
  title: string
  highlight: string
  subtitle: string
  /** Whether title comes before highlight. Default: true */
  titleFirst?: boolean
}

/**
 * Unified section header component with consistent styling
 * Used across About, Skills, Projects, and Contact sections
 */
export default function SectionHeader({
  title,
  highlight,
  subtitle,
  titleFirst = true,
}: SectionHeaderProps) {
  return (
    <div className='mb-20'>
      <div className='flex items-center gap-4 mb-3'>
        <div className='h-px flex-1 bg-linear-to-r from-transparent via-primary to-primary' />
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
          {titleFirst ? (
            <>
              {title}{' '}
              <span className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
                {highlight}
              </span>
            </>
          ) : (
            <>
              <span className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
                {highlight}
              </span>{' '}
              {title}
            </>
          )}
        </h2>
        <div className='h-px flex-1 bg-linear-to-l from-transparent via-primary to-primary' />
      </div>
      <p className='text-center text-base text-muted-foreground'>{subtitle}</p>
    </div>
  )
}
