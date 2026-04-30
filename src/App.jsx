import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HexBackground from './components/HexBackground.jsx'
import Hero from './sections/Hero.jsx'
import Clients from './sections/Clients.jsx'
import Problems from './sections/Problems.jsx'
import Services from './sections/Services.jsx'
import Audience from './sections/Audience.jsx'
import Capabilities from './sections/Capabilities.jsx'
import System from './sections/System.jsx'
import Pricing from './sections/Pricing.jsx'
import Team from './sections/Team.jsx'
import Faq from './sections/Faq.jsx'
import Contact from './sections/Contact.jsx'
import HexBgLab from './labs/HexBgLab.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

const LIGHT_VARS = { '--theme-fg': '#0B0B0C', '--theme-bg': '#FFFFFF' }

function getLab() {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search).get('lab')
}

export default function App() {
  const lab = getLab()
  if (lab === 'hex') return <HexBgLab />
  return <MainSite />
}

function MainSite() {
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
      <HexBackground />
      <Navbar />
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content" ref={content}>
          <main>
            <Hero />
            <Clients />
            <Problems />
            <section id="servizi" data-bg-light style={LIGHT_VARS}>
              <Services />
            </section>
            <section id="a-chi">
              <Audience />
            </section>
            <section id="capabilities" data-bg-light style={LIGHT_VARS}>
              <Capabilities />
            </section>
            <section id="sistema">
              <System />
            </section>
            <section id="piani" data-bg-light style={LIGHT_VARS}>
              <Pricing />
            </section>
            <section id="team">
              <Team />
            </section>
            <Faq />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
