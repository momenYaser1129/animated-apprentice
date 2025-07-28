import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ecommerceImg from '@/assets/project-ecommerce.jpg'
import dashboardImg from '@/assets/project-dashboard.jpg'
import socialImg from '@/assets/project-social.jpg'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
    image: ecommerceImg,
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 2,
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with interactive charts and data visualizations. Built for tracking business metrics and generating insights.',
    image: dashboardImg,
    technologies: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL', 'WebSocket'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 3,
    title: 'Social Media App',
    description: 'A social networking application with real-time messaging, post sharing, and user engagement features. Optimized for mobile and desktop.',
    image: socialImg,
    technologies: ['React Native', 'Firebase', 'Redux', 'Socket.io'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false
  }
]

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          }
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [index])

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`card-glow overflow-hidden group ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="sm" variant="outline" className="glass">
            <Eye className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="glass">
            <Github className="w-4 h-4" />
          </Button>
          <Button size="sm" className="btn-glow">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 gradient-text">{project.title}</h3>
        <p className="text-text-secondary leading-relaxed mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Button size="sm" className="btn-glow">
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
          <Button size="sm" variant="outline" className="glass">
            <Github className="w-4 h-4 mr-2" />
            Code
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            A showcase of my recent work, featuring modern web applications built with 
            cutting-edge technologies. Each project represents a unique challenge and solution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary mb-6">
            Want to see more of my work?
          </p>
          <Button size="lg" variant="outline" className="glass">
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  )
}