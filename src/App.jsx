import { useEffect } from 'react'
import Lenis from 'lenis'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx'
import Clients from './sections/Clients.jsx'
import Problems from './sections/Problems.jsx'
import Services from './sections/Services.jsx'
import System from './sections/System.jsx'
import Pricing from './sections/Pricing.jsx'
import CaseStudy from './sections/CaseStudy.jsx'
import Team from './sections/Team.jsx'
import Guarantees from './sections/Guarantees.jsx'
import Faq from './sections/Faq.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })
    let raf
    const tick = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div id="top" className="min-h-screen bg-brand-dark text-white">
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <section id="servizi">
          <Problems />
          <Services />
        </section>
        <section id="sistema">
          <System />
        </section>
        <section id="piani">
          <Pricing />
        </section>
        <section id="risultati">
          <CaseStudy />
        </section>
        <section id="team">
          <Team />
        </section>
        <Guarantees />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
