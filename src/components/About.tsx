import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Code, Palette, Rocket, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Code, label: 'Projects Completed', value: '50+' },
  { icon: Users, label: 'Happy Clients', value: '30+' },
  { icon: Rocket, label: 'Years Experience', value: '5+' },
  { icon: Palette, label: 'Technologies', value: '20+' },
]

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.fromTo(
        '.about-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      )

      // Animate stats
      gsap.fromTo(
        '.stat-item',
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            I'm a passionate frontend developer with a love for creating beautiful, 
            functional, and user-centered digital experiences. With expertise in modern 
            web technologies and a keen eye for design, I bring ideas to life through code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="about-card card-glow p-8">
            <h3 className="text-2xl font-bold mb-4 gradient-text">My Journey</h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              Started my journey in web development 5 years ago, driven by curiosity and 
              passion for technology. Since then, I've worked with startups and established 
              companies, helping them build amazing digital products that users love.
            </p>
            <p className="text-text-secondary leading-relaxed">
              I believe in continuous learning and staying up-to-date with the latest 
              technologies and best practices. Every project is an opportunity to grow 
              and create something extraordinary.
            </p>
          </div>

          <div className="about-card card-glow p-8">
            <h3 className="text-2xl font-bold mb-4 gradient-text">What I Do</h3>
            <ul className="space-y-4 text-text-secondary">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                <span>Frontend Development with React, Vue, and modern frameworks</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                <span>UI/UX Implementation with pixel-perfect precision</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                <span>Performance optimization and responsive design</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                <span>Modern animations and interactive experiences</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item text-center p-6 card-glow"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-background" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}