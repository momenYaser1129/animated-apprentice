import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Mail } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:john.doe@email.com', label: 'Email' },
]

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-card-border bg-background-secondary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-6 md:mb-0"
          >
            <div className="text-2xl font-bold gradient-text mb-2">JD.dev</div>
            <p className="text-text-secondary">
              Building the future, one line of code at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-4 mb-6 md:mb-0"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-background hover:shadow-glow-primary transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center md:text-right text-text-secondary"
          >
            <p className="flex items-center justify-center md:justify-end">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by John Doe
            </p>
            <p className="text-sm mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}