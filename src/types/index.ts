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

// Project Types
export interface ProjectTechnology {
  name: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}

export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: ProjectTechnology[]
  images: string[] // Changed from single image to array of images
  liveUrl: string | null
  codeUrl: string | null
  featured: boolean
  status: 'completed' | 'in-progress' | 'coming-soon'
  year: string
  category: string // Project category for display
  highlights: string[]
}

// Skills Types
export interface Skill {
  name: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}

export interface SkillCategory {
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  title: string
  description: string
  skills: Skill[]
}

// Contact Types
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
