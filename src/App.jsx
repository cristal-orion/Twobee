import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import LivingBackground from './components/LivingBackground.jsx'
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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

export default function App() {
  const wrapper = useRef(null)
  const content = useRef(null)

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current,
      content: content.current,
      smooth: 1.1,
      smoothTouch: 0,
      effects: true,
      normalizeScroll: true,
    })
    ScrollTrigger.refresh()
    return () => smoother && smoother.kill()
  }, [])

  return (
    <div id="top" className="text-white">
      <LivingBackground />
      <Navbar />
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content" ref={content}>
          <main>
            <div data-bg-zone="hero">
              <Hero />
            </div>
            <div data-bg-zone="clients">
              <Clients />
            </div>
            <section id="servizi" data-bg-zone="services">
              <Problems />
              <Services />
            </section>
            <section id="sistema" data-bg-zone="light">
              <System />
            </section>
            <section id="piani" data-bg-zone="light">
              <Pricing />
            </section>
            <section id="risultati" data-bg-zone="results">
              <CaseStudy />
            </section>
            <section id="team" data-bg-zone="results">
              <Team />
            </section>
            <div data-bg-zone="finale">
              <Guarantees />
              <Faq />
              <Contact />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
