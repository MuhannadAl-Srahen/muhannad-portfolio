import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostman,
  SiNotion,
  SiVercel,
  SiSupabase,
  SiCloudflare,
} from 'react-icons/si'
import { TbBrandRedux } from 'react-icons/tb'
import { VscCode } from 'react-icons/vsc'
import { FaServer, FaCode, FaPalette, FaTools, FaRocket } from 'react-icons/fa'
import type { SkillCategory, Project } from '@/types'
import {
  neboImage1,
  neboImage2,
  neboImage3,
  ecampusImage1,
  ecampusImage2,
  ecampusImage3,
  ecampusImage4,
  pexfectImage1,
  pexfectImage2,
  pexfectImage3,
  pexfectImage4,
  pexfectImage5,
} from '@/assets'

// Tech Icons Registry - reusable across the app
export const techIcons = {
  React: { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss3, color: '#1572B6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express.js': { icon: SiExpress, color: '#000000' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  Supabase: { icon: SiSupabase, color: '#3ECF8E' },
  Git: { icon: SiGit, color: '#F05032' },
  GitHub: { icon: SiGithub, color: '#181717' },
  Figma: { icon: SiFigma, color: '#F24E1E' },
  Postman: { icon: SiPostman, color: '#FF6C37' },
  Notion: { icon: SiNotion, color: '#000000' },
  Vercel: { icon: SiVercel, color: '#000000' },
  Cloudflare: { icon: SiCloudflare, color: '#F38020' },
  'VS Code': { icon: VscCode, color: '#007ACC' },
  Redux: { icon: TbBrandRedux, color: '#764ABC' },
} as const

// Skill Categories for Skills Section
export const skillCategories: SkillCategory[] = [
  {
    icon: FaCode,
    iconColor: '#D4A853',
    title: 'Frontend Development',
    description:
      'Building responsive and optimized web applications with modern frameworks.',
    skills: [
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#888888' },
    ],
  },
  {
    icon: FaPalette,
    iconColor: '#D4A853',
    title: 'Styling & UI Frameworks',
    description:
      'Crafting modern and maintainable UI components with efficient styling techniques.',
    skills: [
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'ShadCN/UI', icon: SiReact, color: '#888888' },
      { name: 'Framer Motion', icon: SiReact, color: '#0055FF' },
      { name: 'CSS Modules', icon: SiCss3, color: '#1572B6' },
    ],
  },
  {
    icon: TbBrandRedux,
    iconColor: '#D4A853',
    title: 'State Management',
    description:
      'Handling application state efficiently for scalable applications.',
    skills: [
      { name: 'Context API', icon: SiReact, color: '#61DAFB' },
      { name: 'Tanstack Query', icon: SiReact, color: '#FF4154' },
      { name: 'Redux Toolkit', icon: TbBrandRedux, color: '#764ABC' },
    ],
  },
  {
    icon: FaServer,
    iconColor: '#D4A853',
    title: 'Backend Development',
    description:
      'Connecting frontend applications to databases and backend services.',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#888888' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    ],
  },
  {
    icon: FaRocket,
    iconColor: '#D4A853',
    title: 'Version Control & Deployment',
    description:
      'Managing code collaboration and deploying applications efficiently.',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#888888' },
      { name: 'Vercel', icon: SiVercel, color: '#888888' },
      { name: 'Netlify', icon: SiReact, color: '#00C7B7' },
      { name: 'Cloudflare', icon: SiCloudflare, color: '#F38020' },
    ],
  },
  {
    icon: FaTools,
    iconColor: '#D4A853',
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

// Projects Data
export const projects: Project[] = [
  {
    id: 1,
    title: 'PexFect',
    description:
      'Modern frontend coding challenge platform with AI-powered feedback using Google Gemini 2.5 Pro',
    longDescription:
      'A comprehensive coding challenge platform featuring AI feedback system, submission tracking, mismatch detection, and structured analysis across best practices, code formatting, functionality, and accessibility.',
    technologies: [
      { name: 'React', ...techIcons['React'] },
      { name: 'TypeScript', ...techIcons['TypeScript'] },
      { name: 'Tailwind CSS', ...techIcons['Tailwind CSS'] },
      { name: 'Supabase', ...techIcons['Supabase'] },
    ],
    images: [pexfectImage1, pexfectImage2, pexfectImage3, pexfectImage4, pexfectImage5],
    liveUrl: 'https://pex-fect.vercel.app/',
    codeUrl: 'https://github.com/MuhannadAl-Srahen/PexFect',
    featured: true,
    status: 'completed',
    year: '2025',
    category: 'Platform',
    highlights: [
      'AI-powered feedback with Gemini 2.5 Pro',
      'Submission tracking & improvement comparison',
      'Mismatch detection & priority code fetching',
      'TanStack Router + Query for performance',
    ],
  },
  {
    id: 2,
    title: 'eCampus Platform',
    description:
      'Full-stack educational platform with real-time features and comprehensive LMS',
    longDescription:
      'Built a complete learning management system serving 500+ students with features including real-time collaboration, course management, and analytics dashboard.',
    technologies: [
      { name: 'Next.js', ...techIcons['Next.js'] },
      { name: 'Supabase', ...techIcons['Supabase'] },
      { name: 'TypeScript', ...techIcons['TypeScript'] },
      { name: 'Tailwind CSS', ...techIcons['Tailwind CSS'] },
    ],
    images: [ecampusImage1, ecampusImage2, ecampusImage3, ecampusImage4],
    liveUrl: 'https://www.ecampusjo.com/en',
    codeUrl: 'https://github.com/MuhannadAl-Srahen',
    featured: true,
    status: 'completed',
    year: '2025',
    category: 'Platform',
    highlights: [
      'Serves 500+ active students daily',
      'Real-time collaboration features',
      'Advanced analytics dashboard',
      'Course & content management system',
    ],
  },
  {
    id: 3,
    title: 'Nebo Landing Page',
    description:
      'Modern, responsive landing page with glassmorphism design and buttery-smooth animations',
    longDescription:
      'Designed and developed a premium landing page featuring glassmorphism aesthetics, micro-interactions, and performance-optimized animations that increased user engagement by 40%.',
    technologies: [
      { name: 'React', ...techIcons['React'] },
      { name: 'TypeScript', ...techIcons['TypeScript'] },
      { name: 'Tailwind CSS', ...techIcons['Tailwind CSS'] },
      { name: 'shadcn/ui', icon: SiReact, color: '#000000' },
    ],
    images: [neboImage1, neboImage2, neboImage3],
    liveUrl: 'https://comf-tech-muhannad-alsrahens-projects.vercel.app/',
    codeUrl: 'https://github.com/MuhannadAl-Srahen',
    featured: true,
    status: 'completed',
    year: '2025',
    category: 'Landing Page',
    highlights: [
      '40% increase in user engagement',
      'Lighthouse performance score 98+',
      'Pixel-perfect responsive design',
      'Glassmorphism aesthetics & micro-interactions',
    ],
  },
  {
    id: 4,
    title: 'Coming Soon',
    description: 'Exciting new project in the works — stay tuned!',
    longDescription:
      'A cutting-edge project currently in development. Follow my GitHub for updates!',
    technologies: [
      { name: 'React', ...techIcons['React'] },
      { name: 'Node.js', ...techIcons['Node.js'] },
      { name: 'PostgreSQL', ...techIcons['PostgreSQL'] },
    ],
    images: [],
    liveUrl: null,
    codeUrl: null,
    featured: false,
    status: 'coming-soon',
    year: '2025',
    category: 'Coming Soon',
    highlights: ['In active development', 'Modern tech stack', 'Stay tuned!'],
  },
]

// About Stats
export const aboutStats = [
  { label: 'Experience', value: '2+', unit: 'Years' },
  { label: 'Projects', value: '10+', unit: 'Completed' },
  { label: 'Technologies', value: '15+', unit: 'Mastered' },
  { label: 'Contributions', value: '500+', unit: 'GitHub' },
]

// Social Links for Contact
export const contactSocialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/MuhannadAl-Srahen',
    icon: SiGithub,
    color: '#181717',
    description: 'Check out my code',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhannad-alsrahen',
    icon: SiGithub, // We'll use proper LinkedIn icon
    color: '#0A66C2',
    description: "Let's connect",
  },
]

// Hero Titles for Typewriter Effect
export const heroTitles = [
  'Full Stack Developer',
  'Software Engineer',
  'UI/UX Developer',
]
