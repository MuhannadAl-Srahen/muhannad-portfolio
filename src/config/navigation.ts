import { Home, User, Wrench, Briefcase } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import type { NavItem, SocialLink } from '@/hooks/useNavbar'

export const navItems: NavItem[] = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Wrench },
  { name: 'Projects', href: '#projects', icon: Briefcase },
]

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/MuhannadAl-Srahen',
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhannad-alsrahen',
    icon: FaLinkedin,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/_glock_x/',
    icon: FaInstagram,
  },
]
