import { lazy, Suspense, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HexBackground from './components/HexBackground.jsx'
import CookieBanner from './components/CookieBanner.jsx'
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

// Route/lab-gated views: split out of the main bundle so the homepage
// doesn't pay for code it never renders.
const HexBgLab = lazy(() => import('./labs/HexBgLab.jsx'))
const CareersPage = lazy(() => import('./pages/Careers.jsx'))

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

const LIGHT_VARS = { '--theme-fg': '#0B0B0C', '--theme-bg': '#FFFFFF' }

function getLab() {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search).get('lab')
}

function getPath() {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export default function App() {
  const lab = getLab()
  if (lab === 'hex') return <Suspense fallback={null}><HexBgLab /></Suspense>
  if (getPath() === '/lavora-con-noi')
    return <Suspense fallback={null}><CareersPage /></Suspense>
  return <MainSite />
}

function MainSite() {
  const wrapper = useRef(null)
  const content = useRef(null)

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // Pure-touch devices (phones/tablets) already have buttery native inertia.
    // Letting ScrollSmoother intercept touch creates a JS-vs-native tug-of-war
    // that reads as stutter — so we only smooth on mouse-driven devices.
    let smoother
    if (ScrollTrigger.isTouch !== 1) {
      smoother = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.1,
        // No data-speed/data-lag in the markup, so the effects scanner is pure
        // overhead — keep it off.
        effects: false,
      })
    }

    const pinTriggers = []
    const setupPins = () => {
      pinTriggers.forEach((t) => t.kill())
      pinTriggers.length = 0
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      if (!isDesktop) return
      ;['#problemi', '#a-chi'].forEach((sel) => {
        const el = document.querySelector(sel)
        if (!el) return
        pinTriggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
          })
        )
      })
    }
    setupPins()
    window.addEventListener('resize', setupPins)

    ScrollTrigger.refresh()
    return () => {
      window.removeEventListener('resize', setupPins)
      pinTriggers.forEach((t) => t.kill())
      smoother && smoother.kill()
    }
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
            <section id="problemi" className="relative bg-brand-black">
              <Problems />
            </section>
            <section
              id="servizi"
              data-bg-light
              className="relative z-10 rounded-t-[2.5rem] bg-white shadow-[0_-30px_60px_-25px_rgba(0,0,0,0.55)] sm:rounded-t-[3rem]"
              style={LIGHT_VARS}
            >
              <Services />
            </section>
            <section id="a-chi" className="relative bg-brand-black">
              <Audience />
            </section>
            <section
              id="capabilities"
              data-bg-light
              className="relative z-10 rounded-t-[2.5rem] bg-white shadow-[0_-30px_60px_-25px_rgba(0,0,0,0.55)] sm:rounded-t-[3rem]"
              style={LIGHT_VARS}
            >
              <Capabilities />
            </section>
            <section id="sistema">
              <System />
            </section>
            <section
              id="piani"
              data-bg-light
              className="bg-white"
              style={LIGHT_VARS}
            >
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
      <CookieBanner />
    </div>
  )
}
