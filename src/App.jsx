import { useEffect, useRef, useState } from 'react'
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

const FORCE_DARK_STORAGE_KEY = 'twobee.forceDark'

export default function App() {
  const wrapper = useRef(null)
  const content = useRef(null)
  const [forceDark, setForceDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(FORCE_DARK_STORAGE_KEY) === '1'
  })

  useEffect(() => {
    window.localStorage.setItem(FORCE_DARK_STORAGE_KEY, forceDark ? '1' : '0')
    ScrollTrigger.refresh()
  }, [forceDark])

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
      <LivingBackground forceDark={forceDark} />
      <Navbar />
      <ThemeModeToggle active={forceDark} onToggle={() => setForceDark((v) => !v)} />
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

function ThemeModeToggle({ active, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      title={
        active
          ? 'Tema scuro uniforme attivo — clicca per tornare alla transizione'
          : 'Tema con transizione attivo — clicca per forzare scuro uniforme'
      }
      className={[
        'fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border px-4 py-2',
        'text-[11px] font-bold uppercase tracking-[0.18em] shadow-lg backdrop-blur-md transition',
        active
          ? 'border-brand-yellow bg-brand-yellow text-brand-black hover:brightness-95'
          : 'border-white/30 bg-black/70 text-white hover:border-brand-yellow/60',
      ].join(' ')}
    >
      <span
        aria-hidden
        className={[
          'h-2 w-2 rounded-full',
          active ? 'bg-brand-black' : 'bg-brand-yellow',
        ].join(' ')}
      />
      Scuro uniforme · {active ? 'ON' : 'OFF'}
    </button>
  )
}
