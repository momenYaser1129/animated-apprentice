import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import heroImage from '@/assets/hero-bg.jpg'

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text elements
      gsap.fromTo(
        '.hero-text',
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2,
          ease: 'power3.out'
        }
      )

      // Floating animation for the arrow
      gsap.to('.scroll-arrow', {
        y: 10,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={textRef} className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-primary p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-6xl font-bold gradient-text">
                JD
              </div>
            </div>
          </motion.div>

          <h1 className="hero-text text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">Frontend</span>
            <br />
            <span className="text-text-primary">Developer</span>
          </h1>

          <p className="hero-text text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Crafting exceptional digital experiences with modern web technologies. 
            Passionate about clean code, beautiful design, and innovative solutions.
          </p>

          <div className="hero-text flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="btn-glow">
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" size="lg" className="glass">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="glass">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="scroll-arrow"
          >
            <a 
              href="#about" 
              className="inline-flex flex-col items-center text-text-tertiary hover:text-primary transition-colors"
            >
              <span className="text-sm mb-2">Scroll Down</span>
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}