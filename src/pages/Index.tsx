import { useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Background3D } from '@/components/Background3D'

const Index = () => {
  useEffect(() => {
    // Add dark class to html element
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Background3D />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
