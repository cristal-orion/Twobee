import { lazy, Suspense, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

import { LanguageProvider, localePath } from './i18n/LanguageContext.jsx'
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
import Scorecard from './sections/Scorecard.jsx'
import Pricing from './sections/Pricing.jsx'
import Game from './sections/Game.jsx'
import Team from './sections/Team.jsx'
import Faq from './sections/Faq.jsx'
import Contact from './sections/Contact.jsx'

// Route/lab-gated views: split out of the main bundle so the homepage
// doesn't pay for code it never renders.
const HexBgLab = lazy(() => import('./labs/HexBgLab.jsx'))
const HexFloatLab = lazy(() => import('./labs/HexFloatLab.jsx'))
const CareersPage = lazy(() => import('./pages/Careers.jsx'))
// Landing gemelle A/B: stesso "sotto", hero diverso — /flappybee = gioco,
// /test-crescita = scorecard diagnostica. Entrambe indicizzate e con un
// ingresso dalla home, ma in posizioni diverse (il test prima dei piani, il
// gioco dopo): nei report l'A/B va segmentato per sorgente, non sommato.
const FlappybeePage = lazy(() => import('./pages/Flappybee.jsx'))
const TestCrescitaPage = lazy(() => import('./pages/TestCrescita.jsx'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudies.jsx'))

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

const SITE = 'https://twobee.it'

// Rotte online ma fuori dall'indice. Non basta ometterle da sitemap.xml e dai
// link: /casestudy gira nelle proposte commerciali (mail, WhatsApp, PDF) e da
// quei link i crawler la raggiungono comunque. Serve il noindex esplicito.
// Title e description restano: servono alla scheda di anteprima quando il link
// viene condiviso. Per farla indicizzare basta togliere la rotta da qui e
// aggiungerla a sitemap.xml, llms.txt e al <noscript> di index.html.
const NOINDEX_PATHS = ['/casestudy']

// Lo stesso index.html è servito su ogni rotta, quindi title/description/canonical
// statici descrivono la home: senza questi override una sottopagina si presenta a
// Google come duplicato della home (canonical → "/") e non viene indicizzata.
// Le rotte NON elencate qui (i lab) restano volutamente così.
const PAGE_HEAD = {
  '/test-crescita': {
    it: {
      title: 'Test: quanto è prevedibile la crescita della tua azienda? | TwoBee',
      description:
        'Otto domande, novanta secondi, nessun numero da sapere: scopri dove perde colpi il tuo sistema di acquisizione clienti e quali sono le tre mosse da fare prima.',
      locale: 'it_IT',
    },
    en: {
      title: 'Test: how predictable is your company’s growth? | TwoBee',
      description:
        'Eight questions, ninety seconds, no figures to look up: find out where your customer-acquisition system leaks and the three moves to make first.',
      locale: 'en_US',
    },
  },
  '/flappybee': {
    it: {
      title: 'Flappy Twobee | Il gioco dei pain point delle PMI',
      description:
        'Fai volare l’apina e schiva i cinque ostacoli che frenano la crescita delle PMI italiane. 30 secondi, niente da compilare: quando ne colpisci uno ti mostriamo come lo risolviamo.',
      locale: 'it_IT',
    },
    en: {
      title: 'Flappy Twobee | The SME pain-point game',
      description:
        'Fly the bee and dodge the five obstacles that hold back Italian SMEs. 30 seconds, nothing to fill in: hit one and we show you how we fix it.',
      locale: 'en_US',
    },
  },
  '/casestudy': {
    it: {
      title: 'Case study: CRM e automazioni per PMI | TwoBee',
      description:
        'I lavori di TwoBee raccontati per intero: il problema di partenza, il sistema che abbiamo costruito (CRM, automazioni, integrazioni) e i numeri dopo.',
      locale: 'it_IT',
    },
    en: {
      title: 'Case studies: CRM and automation for SMEs | TwoBee',
      description:
        'TwoBee’s work told in full: the starting problem, the system we built (CRM, automation, integrations) and the numbers afterwards.',
      locale: 'en_US',
    },
  },
  '/lavora-con-noi': {
    it: {
      title: 'Lavora con noi | TwoBee',
      description:
        'Niente lettere motivazionali infinite: candidati con un videomessaggio da 60 secondi su WhatsApp e il tuo CV. Rispondiamo a tutti.',
      locale: 'it_IT',
    },
    en: {
      title: 'Careers | TwoBee',
      description:
        'No endless cover letters: apply with a 60-second WhatsApp video message and your resume. We reply to everyone.',
      locale: 'en_US',
    },
  },
}

// No per-locale HTML build (single index.html serves / and /en/), so the
// <html lang>/title/meta swap happens client-side on mount instead.
function useSyncHead(lang, path) {
  useEffect(() => {
    const page = PAGE_HEAD[path]
    const copy = (page && page[lang]) || HEAD_COPY[lang]
    document.documentElement.lang = lang
    document.title = copy.title
    const setAttr = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }
    const setMeta = (selector, content) => setAttr(selector, 'content', content)
    setMeta('meta[name="description"]', copy.description)
    setMeta('meta[property="og:title"]', copy.title)
    setMeta('meta[property="og:description"]', copy.description)
    setMeta('meta[property="og:locale"]', copy.locale)
    setMeta('meta[name="twitter:title"]', copy.title)
    setMeta('meta[name="twitter:description"]', copy.description)
    // Il robots statico di index.html dice "index, follow": va riscritto qui,
    // non solo omesso, perché lo stesso file è servito su ogni rotta.
    if (NOINDEX_PATHS.includes(path)) {
      setMeta('meta[name="robots"]', 'noindex, follow')
    }
    if (!page) return
    setAttr('link[rel="canonical"]', 'href', SITE + localePath(path, lang))
    setMeta('meta[property="og:url"]', SITE + localePath(path, lang))
    setAttr('link[rel="alternate"][hreflang="it"]', 'href', SITE + localePath(path, 'it'))
    setAttr('link[rel="alternate"][hreflang="en"]', 'href', SITE + localePath(path, 'en'))
    setAttr('link[rel="alternate"][hreflang="x-default"]', 'href', SITE + localePath(path, 'it'))
  }, [lang, path])
}

export default function App() {
  const lab = getLab()
  const { lang, path } = getLangAndPath()
  useSyncHead(lang, path)
  if (lab === 'hex') return <Suspense fallback={null}><HexBgLab /></Suspense>
  if (lab === 'hexfloat') return <Suspense fallback={null}><HexFloatLab /></Suspense>
  let page = <MainSite />
  if (path === '/lavora-con-noi') {
    page = <Suspense fallback={null}><CareersPage /></Suspense>
  } else if (path === '/flappybee') {
    page = <Suspense fallback={null}><FlappybeePage /></Suspense>
  } else if (path === '/test-crescita') {
    page = <Suspense fallback={null}><TestCrescitaPage /></Suspense>
  } else if (path === '/casestudy') {
    page = <Suspense fallback={null}><CaseStudiesPage /></Suspense>
  } else if (path === '/hiddenwork') {
    page = <Suspense fallback={null}><HexFloatLab /></Suspense>
  }
  return <LanguageProvider lang={lang}>{page}</LanguageProvider>

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
            <Scorecard />
            <section
              id="piani"
              data-bg-light
              className="bg-white"
              style={LIGHT_VARS}
            >
              <Pricing />
            </section>
            <Game />
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
