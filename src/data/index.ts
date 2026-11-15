import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiShadcnui,
  SiFramer,
  SiReactquery,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostman,
  SiNotion,
  SiVercel,
  SiNetlify,
  SiCloudflare,
  SiElectron,
  SiSqlite,
  SiAstro,
  SiFastify,
} from 'react-icons/si'
import { TbBrandRedux } from 'react-icons/tb'
import { VscCode } from 'react-icons/vsc'
import {
  FaCode,
  FaPalette,
  FaTools,
  FaRocket,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Mail, Phone } from 'lucide-react'
import type {
  SkillCategory,
  Project,
  ProjectTechnology,
  Experience,
  SocialLink,
  ContactMethod,
  StatItem,
} from '@/types'
import { projectGalleries } from '@/assets'

// Tech icons used by project cards. Dark brand logos use #888888 so they stay
// visible in both light and dark mode (same rule as the Skills badges).
const techIcons = {
  React: { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#888888' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'shadcn/ui': { icon: SiShadcnui, color: '#888888' },
  Electron: { icon: SiElectron, color: '#47848F' },
  SQLite: { icon: SiSqlite, color: '#0F80CC' },
  Astro: { icon: SiAstro, color: '#FF5D01' },
  'TanStack Query': { icon: SiReactquery, color: '#FF4154' },
  Fastify: { icon: SiFastify, color: '#888888' },
} as const

type TechName = keyof typeof techIcons

// Turns a tech name into the { name, icon, color } object the project cards render
const tech = (name: TechName): ProjectTechnology => ({ name, ...techIcons[name] })

// Skill Categories for Skills Section
export const skillCategories: SkillCategory[] = [
  {
    icon: FaCode,
    title: 'Frontend Development',
    description:
      'Building responsive, production web applications with React, Next.js and modern state management.',
    skills: [
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#888888' },
      { name: 'Redux Toolkit', icon: TbBrandRedux, color: '#764ABC' },
      { name: 'TanStack Query', icon: SiReactquery, color: '#FF4154' },
      { name: 'Context API', icon: SiReact, color: '#61DAFB' },
    ],
  },
  {
    icon: FaPalette,
    title: 'Styling and UI Frameworks',
    description:
      'Crafting modern and maintainable UI components with efficient styling techniques.',
    skills: [
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'shadcn/ui', icon: SiShadcnui, color: '#888888' },
      { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
      { name: 'CSS Modules', icon: SiCss3, color: '#1572B6' },
    ],
  },
  {
    icon: FaRocket,
    title: 'Version Control and Deployment',
    description:
      'Managing code collaboration and deploying applications efficiently.',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#888888' },
      { name: 'Vercel', icon: SiVercel, color: '#888888' },
      { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
      { name: 'Cloudflare', icon: SiCloudflare, color: '#F38020' },
    ],
  },
  {
    icon: FaTools,
    title: 'Tools',
    description:
      'Leveraging modern tools to boost productivity, collaboration, and project quality.',
    skills: [
      { name: 'VS Code', icon: VscCode, color: '#007ACC' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Notion', icon: SiNotion, color: '#888888' },
    ],
  },
]

// Work Experience, newest first
export const experiences: Experience[] = [
  {
    role: 'Full Stack Developer',
    company: 'Abu Sonbul for Arab Transportation',
    period: 'Oct 2025 - Nov 2026',
    location: 'Amman, Jordan',
    highlights: [
      'Built the Aqaba container yard system used by 15 staff with role-based permissions: tracks containers by zone and slot, prints entry cards and exit permits, exports 9 report types to Excel and PDF.',
      'Replaced Excel tracking of freight loads and driver payments with a bilingual (Arabic/English) audit system covering 15+ client companies across 5 freight lines.',
      "Built and launched the company's official website.",
    ],
    link: {
      label: 'abusonbul-transporters.com',
      href: 'https://www.abusonbul-transporters.com/',
    },
  },
  {
    role: 'Frontend Developer',
    company: 'eCampusJo',
    period: 'Feb 2025 - Jul 2025',
    location: 'Jordan',
    highlights: [
      'Built and maintained Next.js and TypeScript features for an educational platform, and integrated REST APIs with the backend team.',
    ],
  },
  {
    role: 'Frontend Developer (Freelance)',
    company: 'LigaData',
    period: 'Jan 2025 - Mar 2025',
    location: 'Remote',
    highlights: [
      'Built an analytics dashboard with real-time data visualization, scoring 96+ on Lighthouse.',
      'Built a performance focused landing page for Nebo, a LigaData project.',
    ],
  },
  {
    role: 'Technical Lead (Freelance)',
    company: 'RemWay (formerly Pexfect)',
    period: 'Sep 2024 - Jan 2025',
    location: 'Remote',
    highlights: [
      'Built an AI powered learning platform where developers solve real challenges and get AI code feedback and learning roadmaps. A working beta is live.',
    ],
  },
  {
    role: 'Frontend Instructor',
    company: 'KIT Jordan',
    period: '1 year during university',
    location: 'Jordan',
    highlights: [
      'Designed and taught a frontend curriculum (HTML, CSS, JavaScript, React) and mentored students one on one.',
    ],
  },
]

// Projects Data (every fact comes from the CV; company and client data stay out)
export const projects: Project[] = [
  {
    id: 'aqaba-container-yard',
    title: 'Aqaba Container Yard System',
    description:
      'Internal system for Abu Sonbul that tracks every container on the Aqaba yard by zone and slot, with role-based access for 15 staff and Excel/PDF reports.',
    // Stack from the repo's package.json (Fastify is the API server)
    technologies: [tech('React'), tech('TypeScript'), tech('TanStack Query'), tech('Tailwind CSS'), tech('Fastify')],
    images: projectGalleries.aqaba,
    liveUrl: null, // login screen lists staff names, so it stays unlinked
    codeUrl: null,
    isInternal: true,
    year: '2026', // repo created Aug 2026
    category: 'Internal System',
    highlights: [
      'Tracks every container by zone and slot',
      'Role-based permissions for 15 staff',
      'Prints entry cards and exit permits',
      'Exports 9 report types to Excel and PDF',
    ],
  },
  {
    id: 'freight-audit',
    title: 'Freight Audit System',
    description:
      'Bilingual Arabic/English system that replaced Excel tracking of freight loads and driver payments for 15+ client companies.',
    // Stack from the repo's package.json (runs locally, data in SQLite)
    technologies: [tech('Next.js'), tech('React'), tech('TypeScript'), tech('Tailwind CSS'), tech('SQLite')],
    images: projectGalleries.audit,
    liveUrl: null,
    codeUrl: null,
    isInternal: true,
    year: '2026', // repo created May 2026
    category: 'Internal System',
    highlights: [
      'Bilingual Arabic/English interface',
      '15+ client companies across 5 freight lines',
      'Duplicate load detection',
      'WhatsApp message parser for driver and load data',
      'Excel import with real-time validation',
      'Tracks freight loads and driver payments',
    ],
  },
  {
    id: 'abu-sonbul-website',
    title: 'Abu Sonbul Company Website',
    description:
      'Official bilingual website for a transport and logistics group.',
    // Stack from the repo's package.json
    technologies: [tech('Astro'), tech('React'), tech('TypeScript'), tech('Tailwind CSS')],
    images: projectGalleries.sonbul, // English home, Arabic home, companies, why us
    liveUrl: 'https://www.abusonbul-transporters.com/',
    codeUrl: null,
    isInternal: false,
    year: '2026', // repo created May 2026
    category: 'Website',
    highlights: [
      'Official company website',
      'Bilingual Arabic/English with right-to-left layout',
    ],
  },
  {
    id: 'remway',
    title: 'RemWay',
    description:
      'AI powered platform where developers solve real challenges, submit their repos and get AI code feedback and learning roadmaps.',
    technologies: [tech('React'), tech('Next.js'), tech('TypeScript')],
    images: projectGalleries.remway,
    liveUrl: 'https://rem-way.vercel.app/',
    codeUrl: null, // private repo
    isInternal: false,
    year: '2024 - 2025', // TODO: confirm (taken from the RemWay role dates)
    category: 'Platform',
    highlights: [
      'Developers solve real-world challenges',
      'Submit GitHub repos and live demos',
      'AI code feedback and learning roadmaps',
      'Working beta is live',
    ],
  },
  {
    id: 'kozo',
    title: 'KoZo',
    description:
      'Windows desktop app that tracks playtime, sessions and achievements for PC games, including offline games, using the Steam Web API.',
    technologies: [tech('Electron'), tech('React'), tech('SQLite')],
    images: projectGalleries.kozo, // website, library, game page, sessions
    liveUrl: 'https://kozoapp.cloud/',
    codeUrl: 'https://github.com/MuhannadAl-Srahen/KoZo', // open source for now
    isInternal: false,
    year: '2026', // repo created Jul 2026
    category: 'Desktop App',
    highlights: [
      'Tracks playtime and sessions for PC games',
      'Achievements through the Steam Web API',
      'Works with offline games too',
      'Windows desktop app',
    ],
  },
  {
    id: 'ecampus',
    title: 'eCampus Platform',
    description:
      'Educational platform where I built and maintained Next.js and TypeScript features with the eCampusJo team.',
    technologies: [tech('Next.js'), tech('TypeScript'), tech('Tailwind CSS')], // TODO: confirm Tailwind CSS
    images: projectGalleries.ecampus,
    liveUrl: 'https://www.ecampusjo.com/en',
    codeUrl: null, // company repo, not public
    isInternal: false,
    year: '2025',
    category: 'Platform',
    highlights: [
      'Next.js and TypeScript features',
      'REST API integration with the backend team',
    ],
  },
  {
    id: 'nebo',
    title: 'Nebo Landing Page',
    description: 'Performance focused landing page for Nebo, a LigaData project.',
    technologies: [tech('React'), tech('TypeScript'), tech('Tailwind CSS'), tech('shadcn/ui')],
    images: projectGalleries.nebo,
    liveUrl: 'https://comf-tech-muhannad-alsrahens-projects.vercel.app/',
    codeUrl: null, // the old link pointed to the GitHub profile, not a repo
    isInternal: false,
    year: '2025',
    category: 'Landing Page',
    highlights: ['Built for LigaData', 'Delivered from scoping to deployment'],
  },
]

// Name and job title shown in the Hero and About sections
export const profile = {
  name: 'Muhannad Al-Srahen',
  title: 'Frontend Developer',
  // The hero's typewriter cycles through these (each one is backed by the CV)
  heroTitles: ['Frontend Developer', 'Software Engineer', 'React Developer'],
}

// About Stats. Counts are calculated from the lists above, so they stay correct
// when you add a project or a job; the rest come from the CV.
export const aboutStats: StatItem[] = [
  { label: 'Experience', value: '2+', unit: 'Years' },
  { label: 'Shipped', value: String(projects.length), unit: 'Projects' },
  { label: 'Worked With', value: String(experiences.length), unit: 'Companies' },
  { label: 'BSc Software Engineering', value: '92.2%', unit: 'GPA' }, // Zarqa University, from the CV
]

// Contact details: the single source for the Contact section
export const contactInfo = {
  email: 'muhannadalsrahen@gmail.com',
  phone: '+962 79 667 1361',
  location: 'Amman, Jordan',
}

// Clickable contact cards (email and phone) in the Contact section
export const contactMethods: ContactMethod[] = [
  {
    label: 'Email Me',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    icon: Mail,
  },
  {
    label: 'Call Me',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
    icon: Phone,
  },
]

// Social profiles: used by the Navbar mobile menu, Footer and Contact section
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/MuhannadAl-Srahen',
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhannad-alsraheen',
    icon: FaLinkedin,
  },
  {
    name: 'X',
    href: 'https://x.com/_glock_x',
    icon: FaXTwitter,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/_glock_x/',
    icon: FaInstagram,
  },
]
