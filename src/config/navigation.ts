import { Home, User, Building2, Wrench, Briefcase, Mail } from 'lucide-react'
import type { NavItem } from '@/types'

export const navItems: NavItem[] = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Building2 },
  { name: 'Skills', href: '#skills', icon: Wrench },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
]
