import { Home, User, Wrench, Briefcase, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa'
import type { NavItem, SocialLink } from '@/types'

export const navItems: NavItem[] = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Wrench },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
]

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/MuhannadAl-Srahen',
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhannad-alsrahen/',
    icon: FaLinkedin,
  },
  {
    name: 'Twitter',
    href: 'https://x.com/_glock_x',
    icon: FaTwitter,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/_glock_x/',
    icon: FaInstagram,
  },
]
