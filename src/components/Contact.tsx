import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'john.doe@email.com',
    href: 'mailto:john.doe@email.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#'
  }
]

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate contact cards
      gsap.fromTo(
        '.contact-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // Animate form
      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate email sending
    setTimeout(() => {
      toast.success('Message sent successfully! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring 
            your ideas to life. I'm always excited to take on new challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Let's Connect
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, creative projects, 
                or just having a friendly chat about technology and development.
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="contact-card flex items-center p-4 card-glow group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{info.label}</div>
                    <div className="text-text-secondary">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <h4 className="text-lg font-semibold mb-4 text-text-primary">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-background hover:shadow-glow-primary transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="card-glow p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">
              Send Message
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  className="bg-background-secondary border-card-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                  className="bg-background-secondary border-card-border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Subject
              </label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Project Discussion"
                required
                className="bg-background-secondary border-card-border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Message
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project..."
                rows={6}
                required
                className="bg-background-secondary border-card-border resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="btn-glow w-full"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}