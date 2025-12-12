# 🎨 Muhannad Al-Srahen - Portfolio

A modern, high-performance portfolio showcasing innovative projects and technical expertise with smooth animations, dark/light themes, and seamless user experience.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://www.muhannadalsrahen.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## ✨ Features

### 🎭 **Theme System**

- Dark/Light/System mode with localStorage persistence
- Smooth theme transitions using CSS variables and OKLCH color space
- Automatic theme detection based on system preferences

### 🎬 **Advanced Animations**

- GSAP-powered scroll-triggered animations
- Smooth entrance effects with stagger delays
- Interactive hover states and micro-interactions
- Sticky navbar with slide-down animation

### 📱 **Responsive Design**

- Mobile-first approach with breakpoint optimization
- Full-screen modal views on mobile devices
- Touch-optimized interactions
- Responsive typography and spacing

### ⚡ **Performance Optimized**

- Lighthouse Score: 92+ Performance, 94+ Accessibility, 100 SEO
- Image optimization with WebP format and lazy loading
- Custom scrollbar styling with primary brand colors
- Smooth scroll behavior and GPU-accelerated animations

### 🎨 **UI/UX Excellence**

- Custom scrollbar matching brand identity
- Text selection styling with primary colors
- Enhanced focus indicators for accessibility
- Animated underlines and glow effects
- Flying orb background effects

### 📊 **Project Showcase**

- Interactive flip cards with 3D transformations
- Image galleries with navigation arrows
- Timeline-based project display
- Detailed project modal with full specifications
- Technology badges with brand colors

### 📧 **Contact Integration**

- Serverless email API using Resend
- Form validation and error handling
- Social media links integration
- Verified domain email sending

---

## 🚀 Live Demo

**[Visit Portfolio →](https://www.muhannadalsrahen.dev/)**

Experience the live version with all features, animations, and interactions.

---

## 🛠️ Tech Stack

### **Frontend**

- **React 19.2.3** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.2.7** - Lightning-fast build tool
- **Tailwind CSS 4.1.18** - Utility-first styling with custom design system

### **Animation Libraries**

- **GSAP 3.14.1** - Professional-grade animations
- **ScrollTrigger** - Scroll-based animation triggers

### **Icons & UI**

- **Lucide React** - Beautiful, consistent icon set
- **React Icons 5.5** - Extensive icon library for tech badges

### **Backend/API**

- **Vercel Serverless Functions** - API endpoints
- **Resend 6.6.0** - Email delivery service
- **@vercel/node 5.5.15** - Vercel runtime

### **Developer Tools**

- **ESLint 9.39** - Code quality enforcement
- **TypeScript ESLint** - TypeScript-specific linting
- **Git** - Version control

---

## 📂 Project Structure

```
portfolio/
├── public/              # Static assets
│   ├── manifest.json    # PWA manifest
│   ├── robots.txt       # SEO crawler instructions
│   ├── sitemap.xml      # XML sitemap
│   └── og-preview.webp  # Open Graph image (1200x630)
├── src/
│   ├── assets/          # Images, icons, documents
│   ├── components/
│   │   ├── common/      # Reusable components
│   │   ├── layout/      # Navbar, Footer
│   │   ├── sections/    # Hero, About, Skills, Projects, Contact
│   │   └── ui/          # UI primitives (buttons, etc.)
│   ├── contexts/        # React contexts (ThemeContext)
│   ├── data/            # Static content (projects, skills)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Route pages (NotFound)
│   ├── types/           # TypeScript type definitions
│   └── config/          # Configuration files
├── api/                 # Vercel serverless functions
│   └── send-email.ts    # Email API endpoint
└── vercel.json          # Deployment configuration
```

---

## 💻 Getting Started

### Prerequisites

- **Node.js 18+** or **Bun 1.0+**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/MuhannadAl-Srahen/muhannad-portfolio.git

# Navigate to project directory
cd muhannad-portfolio

# Install dependencies
npm install
# or
bun install

# Create environment file (optional for local email testing)
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file for local development:

```env
# Resend API Key (for email functionality)
RESEND_API_KEY=your_resend_api_key_here

# Google Analytics (optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

> **Note:** For production, set these in Vercel dashboard under Settings → Environment Variables

### Development

```bash
# Start development server (http://localhost:2000)
npm run dev

# Type check
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables:
   - `RESEND_API_KEY`
   - `VITE_GA_MEASUREMENT_ID` (optional)
4. Deploy automatically on push to `main`

### Manual Build

```bash
# Build for production
npm run build

# Output in dist/ folder
# Upload dist/ contents to any static hosting service
```

---

## 🎨 Customization

### Theme Colors

Edit `src/index.css` to customize color palette:

```css
:root {
  --primary: oklch(0.88 0.18 94.01); /* Yellow/Gold */
  --background: oklch(0.95 0.01 255); /* Light background */
  /* ... more colors */
}

.dark {
  --background: oklch(0.15 0 0); /* Dark background */
  /* ... dark mode colors */
}
```

### Content

- **Projects**: Edit `src/data/index.ts` → `projects` array
- **Skills**: Edit `src/data/index.ts` → `skillCategories` array
- **Navigation**: Edit `src/config/navigation.ts`
- **Personal Info**: Edit `src/data/index.ts` → `aboutContent`

### Images

Place images in `src/assets/images/` and export from `src/assets/index.ts`

---

## 📊 SEO Features

- ✅ Open Graph meta tags (8 tags)
- ✅ Twitter Card support (6 tags)
- ✅ Schema.org structured data (Person + WebSite)
- ✅ XML sitemap (`/sitemap.xml`)
- ✅ Robots.txt configuration
- ✅ PWA manifest for installability
- ✅ Canonical URLs
- ✅ Optimized meta descriptions with keywords
- ✅ Image alt texts and lazy loading
- ✅ Semantic HTML structure

---

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Focus indicators on all interactive elements
- ARIA labels and roles
- Proper heading hierarchy (h1 → h2 → h3)
- Color contrast ratios meet standards
- Screen reader friendly

---

## 📧 Contact Integration

Email functionality powered by [Resend](https://resend.com/):

1. Sign up for Resend account
2. Verify your domain
3. Add SPF record to DNS: `v=spf1 include:_spf.resend.com ~all`
4. Set `RESEND_API_KEY` in environment variables

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact

**Muhannad Al-Srahen**

- 🌐 Website: [muhannadalsrahen.dev](https://www.muhannadalsrahen.dev)
- 📧 Email: [muhannadalsrahen@gmail.com](mailto:muhannadalsrahen@gmail.com)
- 💼 LinkedIn: [muhannad-alsrahen](https://linkedin.com/in/muhannad-alsrahen)
- 🐙 GitHub: [MuhannadAl-Srahen](https://github.com/MuhannadAl-Srahen)
- 🐦 Twitter: [@\_glock_x](https://twitter.com/_glock_x)

---

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from Lucide and React Icons
- Animation techniques from GSAP documentation
- Color system using OKLCH for smooth theme transitions

---

**Built with 💛 by Muhannad Al-Srahen** | © 2025
