import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const downloadCV = () => {
    // Create a dummy CV file for download
    const cvContent = `
John Doe - Frontend Developer
========================

📧 john.doe@email.com
🌐 www.johndoe.dev
📱 +1 (555) 123-4567

EXPERIENCE
----------
Senior Frontend Developer @ TechCorp (2021-Present)
- Led development of React applications serving 100k+ users
- Implemented modern UI/UX designs with 95% satisfaction rate
- Mentored junior developers and established coding standards

Frontend Developer @ StartupXYZ (2019-2021)
- Built responsive web applications using React, TypeScript
- Collaborated with design team to create pixel-perfect interfaces
- Improved application performance by 40%

SKILLS
------
• Frontend: React, TypeScript, Next.js, Vue.js
• Styling: Tailwind CSS, Styled Components, SASS
• Animation: Framer Motion, GSAP, Three.js
• Tools: Git, Webpack, Vite, Figma

EDUCATION
---------
Bachelor of Computer Science
University of Technology (2015-2019)
    `.trim()

    const blob = new Blob([cvContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'John_Doe_CV.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold gradient-text"
          >
            JD.dev
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-text-secondary hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <Button
              onClick={downloadCV}
              className="btn-glow"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              CV
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-text-secondary hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={() => {
                downloadCV()
                setIsMobileMenuOpen(false)
              }}
              className="btn-glow mt-4 w-full"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}