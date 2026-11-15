// Navigation Types
export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

export interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

// Image Types
/** One image in several widths; the browser picks the best file from srcSet */
export interface ResponsiveImage {
  src: string
  srcSet: string
}

// Project Types
export interface ProjectTechnology {
  name: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: ProjectTechnology[] // empty while the stack is still a TODO
  images: ResponsiveImage[] // screenshots for the gallery; empty shows a placeholder
  liveUrl: string | null
  codeUrl: string | null
  /** Company-internal system: no public links, shows a "Private / Internal" badge */
  isInternal: boolean
  year?: string
  category: string // Project category for display
  highlights: string[]
}

// Experience Types
export interface Experience {
  role: string
  company: string
  period: string
  location: string
  highlights: string[]
  link?: { label: string; href: string }
}

// Skills Types
export interface Skill {
  name: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}

export interface SkillCategory {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  skills: Skill[]
}

// Contact Types
export interface ContactMethod {
  label: string
  value: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

// About Stats Types
export interface StatItem {
  label: string
  value: string
  unit: string
}
