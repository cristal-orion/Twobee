import { lazy, Suspense, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

import { LanguageProvider } from './i18n/LanguageContext.jsx'
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

// Strips a leading /en segment so the rest of the app can route on the
// bare path, and reports the detected language alongside it.
function getLangAndPath() {
  if (typeof window === 'undefined') return { lang: 'it', path: '/' }
  const raw = window.location.pathname.replace(/\/+$/, '') || '/'
  if (raw === '/en' || raw.startsWith('/en/')) {
    return { lang: 'en', path: raw.slice(3) || '/' }
  }
  return { lang: 'it', path: raw }
}

const HEAD_COPY = {
  it: {
    title: 'TwoBee | Sistemi di crescita per le PMI del Sud Italia',
    description:
      'Trasformiamo il marketing delle PMI italiane in un sistema di acquisizione clienti misurabile, con un impatto diretto sui ricavi.',
    locale: 'it_IT',
  },
  en: {
    title: "TwoBee | Growth Systems for Southern Italy's SMEs",
    description:
      "We turn Italian SMEs' marketing into a measurable customer-acquisition system, with a direct impact on revenue.",
    locale: 'en_US',
  },
}

// No per-locale HTML build (single index.html serves / and /en/), so the
// <html lang>/title/meta swap happens client-side on mount instead.
function useSyncHead(lang) {
  useEffect(() => {
    const copy = HEAD_COPY[lang]
    document.documentElement.lang = lang
    document.title = copy.title
    const setMeta = (selector, content) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute('content', content)
    }
    setMeta('meta[name="description"]', copy.description)
    setMeta('meta[property="og:title"]', copy.title)
    setMeta('meta[property="og:description"]', copy.description)
    setMeta('meta[property="og:locale"]', copy.locale)
    setMeta('meta[name="twitter:title"]', copy.title)
    setMeta('meta[name="twitter:description"]', copy.description)
  }, [lang])
}

export default function App() {
  const lab = getLab()
  const { lang, path } = getLangAndPath()
  useSyncHead(lang)
  if (lab === 'hex') return <Suspense fallback={null}><HexBgLab /></Suspense>
  return (
    <LanguageProvider lang={lang}>
      {path === '/lavora-con-noi' ? (
        <Suspense fallback={null}><CareersPage /></Suspense>
      ) : (
        <MainSite />
      )}
    </LanguageProvider>
  )
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
