/* Hallmark · macrostructure: Workbench · tone: playful-bold · anchor hue: brand-yellow #FFC501
 * theme: Twobee brand (honeycomb dark · League Spartan display · Inter body) — preserved, not catalog
 * pre-emit critique: P4 H4 E4 S4 R4 V4
 *
 * 🧮 CALCOLATORE ROI (/calcolatore) — variante "calcolatore" della coppia di landing A/B.
 * Scegli il settore, muovi 3 leve e scopri quanto fatturato stai lasciando sul tavolo.
 * Il gate sblocca il breakdown completo + i prossimi passi + la CTA alla call.
 *
 * La gemella è /flappybee (src/pages/Flappybee.jsx). Solo le sezioni Team
 * (TeamHive) e Calendario (BookCall) sono condivise e IDENTICHE tra le due (da
 * ./landingShared.jsx): il resto del "sotto" qui resta a tema-report.
 *
 * ⚠️ MOCKUP — il motore di calcolo è DIMOSTRATIVO. Numeri di esempio dalle slide del
 * piano growth (luglio 2026). Formula/benchmark reali = da definire col manager.
 * Il gate emette solo eventi calc_* sul dataLayer, NON invia nulla: destinazione lead
 * (CRM/WhatsApp/Klaviyo) e mappatura GTM le collega Gabriele.
 *
 * NB: niente ScrollSmoother qui (a differenza di App.jsx). L'auto-scroll dell'embed Cal
 * ridimensiona l'iframe e va in conflitto con lo scroll "smussato" via transform → salti
 * a caso su altre sezioni. Scroll nativo = prenotazione fluida.
 */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HexBackground from '../components/HexBackground.jsx'
import CookieBanner from '../components/CookieBanner.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { track, scrollToBooking, SocialProof, BookCall, TeamHive } from './landingShared.jsx'

gsap.registerPlugin(useGSAP)

const VARIANT = 'calcolatore'

/* ------------------------------------------------------------------ */
/* CONFIG NUMERICA — DEMO. min/max/step/default reali → dal manager.    */
/* `benchmark` = valore "potenziale". `euro` = €/mese per unità di gap   */
/* (parametro-volume nascosto, qui tarato per riprodurre i mockup).      */
/* ------------------------------------------------------------------ */
const VERTICALS = {
  ecommerce: {
    levers: [
      { key: 'aov', fmt: 'euro', min: 20, max: 300, step: 5, def: 60, benchmark: 78, euro: 77.8 },
      { key: 'margine', fmt: 'pct', min: 5, max: 60, step: 1, def: 25, benchmark: 32, euro: 157 },
      { key: 'traffico', fmt: 'num', min: 500, max: 40000, step: 500, def: 5000, benchmark: 7500, euro: 0.92 },
    ],
  },
  pmi: {
    levers: [
      { key: 'valoreCliente', fmt: 'euro', min: 200, max: 20000, step: 100, def: 2000, benchmark: 2600, euro: 2.1 },
      { key: 'marginalita', fmt: 'pct', min: 5, max: 70, step: 1, def: 30, benchmark: 38, euro: 190 },
      { key: 'lead', fmt: 'num', min: 5, max: 300, step: 1, def: 30, benchmark: 45, euro: 95 },
    ],
  },
  startup: {
    levers: [
      { key: 'cac', fmt: 'euro', min: 10, max: 500, step: 5, def: 80, benchmark: 62, euro: 34, invert: true },
      { key: 'ltv', fmt: 'euro', min: 50, max: 3000, step: 10, def: 400, benchmark: 560, euro: 6.4 },
      { key: 'mrr', fmt: 'euro', min: 500, max: 50000, step: 500, def: 5000, benchmark: 7200, euro: 0.78 },
    ],
  },
}

const SEGMENTS = ['ecommerce', 'pmi', 'startup']

/* ------------------------------------------------------------------ */
/* COPY it/en — SOLO i pezzi specifici del calcolatore (hero, segments, */
/* levers, result, gate, faq, nextSteps). Il copy condiviso vive in     */
/* ./landingShared.jsx.                                                 */
/* ------------------------------------------------------------------ */
const COPY = {
  it: {
    hero: {
      eyebrow: '🐝 Calcolatore ROI · gratuito',
      h1a: 'Quanto puoi far ',
      h1hl: 'crescere il tuo business?',
      sub: 'Scegli il tuo settore, muovi 3 leve e scopri quanto fatturato stai lasciando sul tavolo. In meno di un minuto.',
      trust: ['Nessun impegno', '3 dati bastano', 'Report immediato'],
      social: 'Già al fianco di PMI e brand del Sud Italia',
      cardTitle: 'Scegli il settore e inserisci 3 dati',
      liveScore: 'Punteggio',
      ctaCalc: 'Calcola il mio potenziale',
      demoNote: 'Stima dimostrativa · formula in definizione',
    },
    segments: { ecommerce: 'E-commerce', pmi: 'PMI', startup: 'Startup' },
    levers: {
      aov: 'Valore medio ordine (AOV)',
      margine: 'Margine per ordine',
      traffico: 'Traffico mensile',
      valoreCliente: 'Valore medio cliente',
      marginalita: 'Marginalità',
      lead: 'Lead mensili',
      cac: 'CAC (costo acquisizione)',
      ltv: 'LTV (valore cliente)',
      mrr: 'MRR mensile',
    },
    result: {
      eyebrow: 'Il tuo report di crescita',
      generatedFor: 'Generato per',
      scoreLabel: 'Punteggio complessivo',
      zones: { crit: 'zona: critica', opt: 'zona: da ottimizzare', good: 'zona: solida' },
      potentialLabel: 'Potenziale extra stimato',
      potentialSuffix: 'al mese, agendo sulle 3 leve sotto',
      perMonth: '/mese',
      breakdownEyebrow: 'Breakdown per leva',
      here: 'Sei qui',
      potentialWord: 'Potenziale',
      stepsTitle: 'Prossimi passi consigliati',
      demoNote: 'Anteprima dimostrativa · i numeri sono di esempio (formula reale in definizione)',
    },
    gate: {
      eyebrow: '🔒 Ultimo step',
      title: 'Sblocca il breakdown completo',
      sub: 'Ti mandiamo il report dettagliato e ti richiamiamo per una call strategica gratuita.',
      fields: {
        nome: { label: 'Nome e cognome*', placeholder: 'Come ti chiami?' },
        azienda: { label: 'Azienda*', placeholder: 'Nome della tua attività' },
        email: { label: 'Email*', placeholder: 'La tua email' },
        telefono: { label: 'Telefono*', placeholder: 'Il tuo numero' },
      },
      privacyPre: 'Ho letto la',
      privacyLink: 'Privacy Policy',
      privacyPost: ' e autorizzo Two Bee S.r.l. a ricontattarmi.*',
      submit: 'Sblocca il report',
      demoBadge: 'Mockup: in demo il form sblocca solo il report, non invia nulla',
    },
    faq: {
      eyebrow: 'FAQ',
      headingPre: 'Domande ',
      headingHl: 'frequenti',
      body: 'I dubbi più comuni sul calcolatore e su come lavoriamo.',
      faqs: [
        { q: 'I numeri sono reali?', a: 'Il calcolatore restituisce una stima basata sui dati che inserisci. Non è una promessa di risultato: è un ordine di grandezza per capire se vale la pena parlarne. In call entriamo nel dettaglio con i tuoi dati veri.' },
        { q: 'Cosa succede dopo che sblocco il report?', a: 'Ricevi il breakdown completo e ti ricontattiamo per fissare una call gratuita di 30 minuti. Nessun impegno, nessuna carta di credito.' },
        { q: 'Perché mi chiedete i contatti?', a: 'Per mandarti il report dettagliato e, se lo vuoi, prepararti la call. I tuoi dati li trattiamo secondo la Privacy Policy, niente spam.' },
        { q: 'Devo essere già un cliente?', a: 'No. Il calcolatore è aperto a tutti. È anzi il modo più veloce per capire se possiamo esserti utili.' },
      ],
    },
    call: {
      heading: 'Prenota la tua call strategica gratuita',
      sub: '30 minuti con il team Two Bee per trasformare queste stime in un piano. Nessun impegno.',
      button: 'Prenota la call →',
    },
    receive: {
      eyebrow: 'Cosa ricevi',
      heading: 'Non un numero. Un piano.',
      items: [
        { title: 'Report di crescita personalizzato', body: 'Il breakdown delle 3 leve con il potenziale in euro, tarato sul tuo settore.' },
        { title: 'Le prossime 3 mosse', body: 'Azioni concrete e prioritizzate per colmare il gap più costoso per primo.' },
        { title: 'Call strategica con il team', body: '30 minuti con chi costruisce sistemi di crescita, non chi vende fuffa.' },
      ],
      whoEyebrow: 'Chi siamo',
      whoTitle: 'Two Bee, sistemi di crescita per le PMI.',
      whoBody:
        'Trasformiamo il marketing in un sistema di acquisizione clienti misurabile, con impatto diretto sui ricavi. Data-driven, KPI di fatturato, zero vanity metrics.',
    },
    fit: {
      eyebrow: 'È per te?',
      heading: 'Onestà prima del preventivo.',
      forTitle: 'Fa per te se',
      forItems: [
        'Hai un business attivo e vuoi scalare i ricavi, non i follower',
        'Sei pronto a investire in ads con metodo, non a caso',
        'Vuoi un partner decisionale, non un esecutore di campagne',
      ],
      notForTitle: 'Non fa per te se',
      notForItems: [
        'Cerchi risultati magici senza budget né dati',
        'Vuoi solo “più like” senza guardare al fatturato',
        'Non hai tempo per una call di 30 minuti',
      ],
    },
    finalCta: {
      eyebrow: 'Tocca a te',
      heading: 'Scopri quanto stai lasciando sul tavolo.',
      body: 'Un minuto adesso può valere migliaia di euro al mese. Muovi le leve e sblocca il tuo report.',
      button: 'Vai al calcolatore ↑',
    },
    // prossimi passi per verticale (DEMO)
    nextSteps: {
      ecommerce: [
        'Introduci bundle e upsell in pagina prodotto per alzare l’AOV.',
        'Rivedi la struttura dei costi per un margine per ordine più sano.',
        'Attiva campagne lookalike per aumentare il traffico qualificato.',
      ],
      pmi: [
        'Costruisci un’offerta di ingresso per alzare il valore medio cliente.',
        'Alza la marginalità ripulendo i servizi a basso ritorno.',
        'Sistema il funnel di lead gen per aumentare i lead qualificati/mese.',
      ],
      startup: [
        'Ottimizza i canali per abbassare il CAC sotto la soglia sostenibile.',
        'Lavora su onboarding e retention per far crescere l’LTV.',
        'Riduci il churn per stabilizzare e far salire l’MRR.',
      ],
    },
  },
  en: {
    hero: {
      eyebrow: '🐝 ROI Calculator · free',
      h1a: 'How much can you ',
      h1hl: 'grow your business?',
      sub: 'Pick your industry, move 3 levers and see how much revenue you’re leaving on the table. In under a minute.',
      trust: ['No commitment', '3 inputs is enough', 'Instant report'],
      social: 'Already backing SMEs and brands across Southern Italy',
      cardTitle: 'Pick your industry and enter 3 numbers',
      liveScore: 'Score',
      ctaCalc: 'Calculate my potential',
      demoNote: 'Demonstrative estimate · formula being finalized',
    },
    segments: { ecommerce: 'E-commerce', pmi: 'SME', startup: 'Startup' },
    levers: {
      aov: 'Average order value (AOV)',
      margine: 'Margin per order',
      traffico: 'Monthly traffic',
      valoreCliente: 'Average customer value',
      marginalita: 'Margin',
      lead: 'Monthly leads',
      cac: 'CAC (acquisition cost)',
      ltv: 'LTV (customer value)',
      mrr: 'Monthly MRR',
    },
    result: {
      eyebrow: 'Your growth report',
      generatedFor: 'Generated for',
      scoreLabel: 'Overall score',
      zones: { crit: 'zone: critical', opt: 'zone: to optimize', good: 'zone: solid' },
      potentialLabel: 'Estimated extra potential',
      potentialSuffix: 'per month, acting on the 3 levers below',
      perMonth: '/mo',
      breakdownEyebrow: 'Breakdown by lever',
      here: 'You’re here',
      potentialWord: 'Potential',
      stepsTitle: 'Recommended next steps',
      demoNote: 'Demonstrative preview · numbers are examples (real formula TBD)',
    },
    gate: {
      eyebrow: '🔒 Last step',
      title: 'Unlock the full breakdown',
      sub: 'We’ll send the detailed report and call you for a free strategy session.',
      fields: {
        nome: { label: 'Full name*', placeholder: 'What’s your name?' },
        azienda: { label: 'Company*', placeholder: 'Your business name' },
        email: { label: 'Email*', placeholder: 'Your email' },
        telefono: { label: 'Phone*', placeholder: 'Your number' },
      },
      privacyPre: 'I’ve read the',
      privacyLink: 'Privacy Policy',
      privacyPost: ' and authorize Two Bee S.r.l. to contact me.*',
      submit: 'Unlock the report',
      demoBadge: 'Mockup: in demo the form only unlocks the report, it sends nothing',
    },
    faq: {
      eyebrow: 'FAQ',
      headingPre: 'Frequently asked ',
      headingHl: 'questions',
      body: 'The most common doubts about the calculator and how we work.',
      faqs: [
        { q: 'Are the numbers real?', a: 'The calculator returns an estimate based on what you enter. It’s not a guarantee — it’s an order of magnitude to see if it’s worth talking. On the call we dig into your real data.' },
        { q: 'What happens after I unlock the report?', a: 'You get the full breakdown and we reach out to book a free 30-minute call. No commitment, no credit card.' },
        { q: 'Why do you ask for my details?', a: 'To send the detailed report and, if you want, prep the call. We handle your data per the Privacy Policy — no spam.' },
        { q: 'Do I need to be a client already?', a: 'No. The calculator is open to everyone. It’s actually the fastest way to see if we can help.' },
      ],
    },
    call: {
      heading: 'Book your free strategy call',
      sub: '30 minutes with the Two Bee team to turn these estimates into a plan. No commitment.',
      button: 'Book the call →',
    },
    receive: {
      eyebrow: 'What you get',
      heading: 'Not a number. A plan.',
      items: [
        { title: 'Personalized growth report', body: 'The 3-lever breakdown with potential in euros, tuned to your industry.' },
        { title: 'Your next 3 moves', body: 'Concrete, prioritized actions to close the costliest gap first.' },
        { title: 'Strategy call with the team', body: '30 minutes with people who build growth systems, not sell fluff.' },
      ],
      whoEyebrow: 'Who we are',
      whoTitle: 'Two Bee, growth systems for SMEs.',
      whoBody:
        'We turn marketing into a measurable customer-acquisition system with direct revenue impact. Data-driven, revenue KPIs, zero vanity metrics.',
    },
    fit: {
      eyebrow: 'Is it for you?',
      heading: 'Honesty before the quote.',
      forTitle: 'It’s for you if',
      forItems: [
        'You run an active business and want to scale revenue, not followers',
        'You’re ready to invest in ads with method, not by chance',
        'You want a decision-making partner, not a campaign executor',
      ],
      notForTitle: 'Not for you if',
      notForItems: [
        'You want magic results with no budget and no data',
        'You just want “more likes” without looking at revenue',
        'You don’t have time for a 30-minute call',
      ],
    },
    finalCta: {
      eyebrow: 'Your turn',
      heading: 'See what you’re leaving on the table.',
      body: 'A minute now can be worth thousands per month. Move the levers and unlock your report.',
      button: 'Back to the calculator ↑',
    },
    nextSteps: {
      ecommerce: [
        'Add bundles and upsells on the product page to lift AOV.',
        'Review your cost structure for a healthier margin per order.',
        'Launch lookalike campaigns to grow qualified traffic.',
      ],
      pmi: [
        'Build an entry offer to raise average customer value.',
        'Increase margin by cutting low-return services.',
        'Fix the lead-gen funnel to grow qualified leads/month.',
      ],
      startup: [
        'Optimize channels to bring CAC below the sustainable line.',
        'Work on onboarding and retention to grow LTV.',
        'Cut churn to stabilize and grow MRR.',
      ],
    },
  },
}

/* ------------------------------------------------------------------ */
/* HELPERS                                                              */
/* ------------------------------------------------------------------ */
function defaultsFor(vertical) {
  const out = {}
  VERTICALS[vertical].levers.forEach((l) => {
    out[l.key] = l.def
  })
  return out
}

function fmtNum(n) {
  return Math.round(n).toLocaleString('it-IT')
}
function fmtValue(lever, n) {
  if (lever.fmt === 'euro') return `€${fmtNum(n)}`
  if (lever.fmt === 'pct') return `${fmtNum(n)}%`
  return fmtNum(n)
}
function fmtEuro(n) {
  return `€${fmtNum(n)}`
}

// Compute demo report. `invert` levers (es. CAC) migliorano scendendo.
function computeReport(vertical, values) {
  const levers = VERTICALS[vertical].levers.map((lev) => {
    const current = values[lev.key]
    let gap, pct
    if (lev.invert) {
      gap = Math.max(0, current - lev.benchmark) // quanto puoi tagliare
      pct = Math.min(1, lev.benchmark / Math.max(current, 1))
    } else {
      gap = Math.max(0, lev.benchmark - current) // quanto puoi guadagnare
      pct = Math.min(1, current / lev.benchmark)
    }
    const euroMonth = Math.round(gap * lev.euro)
    return { ...lev, current, euroMonth, pct }
  })
  const total = levers.reduce((s, l) => s + l.euroMonth, 0)
  const score = Math.round((levers.reduce((s, l) => s + l.pct, 0) / levers.length) * 100)
  const rangeLow = Math.round((total * 0.667) / 100) * 100
  const rangeHigh = Math.round((total * 1.208) / 100) * 100
  return { levers, total, score, rangeLow, rangeHigh }
}

function zoneOf(score, zones) {
  if (score < 40) return zones.crit
  if (score < 70) return zones.opt
  return zones.good
}

/* ------------------------------------------------------------------ */
/* ICONE settore                                                        */
/* ------------------------------------------------------------------ */
function SegIcon({ type, className }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (type === 'ecommerce')
    return (
      <svg {...common}>
        <path d="M3 4h2l1.6 10.4a1.5 1.5 0 0 0 1.5 1.3h8a1.5 1.5 0 0 0 1.5-1.2L20 7H6" />
        <circle cx="9" cy="20" r="1.2" />
        <circle cx="17" cy="20" r="1.2" />
      </svg>
    )
  if (type === 'pmi')
    return (
      <svg {...common}>
        <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16" />
        <path d="M15 10h4a1 1 0 0 1 1 1v10" />
        <path d="M8 8h3M8 12h3M8 16h3M2 21h20" />
      </svg>
    )
  return (
    <svg {...common}>
      <path d="M12 3c3 1.5 5 4.5 5 8 0 2-1 4-2 5l-3 2-3-2c-1-1-2-3-2-5 0-3.5 2-6.5 5-8Z" />
      <circle cx="12" cy="10" r="1.6" />
      <path d="M8 17c-2 .5-3 2-3 4 2 0 3.5-1 4-3M16 17c2 .5 3 2 3 4-2 0-3.5-1-4-3" />
    </svg>
  )
}

/* ================================================================== */
/* PAGE                                                                 */
/* ================================================================== */
export default function CalcolatorePage() {
  useEffect(() => {
    track('landing_view', { variant: VARIANT })
    track('calc_view', { page: 'calcolatore' })
  }, [])

  return (
    <div id="top" className="text-white">
      <HexBackground />
      <Navbar landing />
      <main>
        <Experience />
        <BookCall variant={VARIANT} />
        <WhatYouGet />
        <TeamHive />
        <Fit />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* EXPERIENCE — hero + calcolatore + risultato (stato condiviso)        */
/* ------------------------------------------------------------------ */
function Experience() {
  const lang = useLang()
  const t = COPY[lang]
  const root = useRef(null)

  const [segment, setSegment] = useState('ecommerce')
  const [values, setValues] = useState(() => defaultsFor('ecommerce'))
  const [calculated, setCalculated] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  const report = computeReport(segment, values)

  useGSAP(
    () => {
      const fader = gsap.utils.toArray('.cx-fade', root.current)
      gsap.set(fader, { y: 24, opacity: 0 })
      gsap.to(fader, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.15 })
    },
    { scope: root }
  )

  const changeSegment = (seg) => {
    if (seg === segment) return
    setSegment(seg)
    setValues(defaultsFor(seg))
    setCalculated(false)
    setUnlocked(false)
    track('calc_segment_select', { segmento: seg })
  }

  const changeValue = (key, v) => setValues((s) => ({ ...s, [key]: v }))

  const onCalcolate = () => {
    setCalculated(true)
    track('calc_risultato_visualizzato', { segmento: segment, score: report.score })
    setTimeout(() => {
      const el = document.getElementById('risultato')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const onUnlock = (e, form) => {
    e.preventDefault()
    setUnlocked(form || true)
    track('calc_lead_inviato', { segmento: segment, score: report.score })
    // NB: nessun invio reale. Destinazione lead (CRM/WhatsApp/EmailJS) → Gabriele.
  }

  return (
    <section ref={root} className="relative overflow-hidden">
      {/* scrim per profondità in cima */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

      <div className="container-x relative grid items-center gap-12 pt-32 pb-16 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* colonna testo */}
        <div>
          <span className="cx-fade eyebrow text-outlined-sm">{t.hero.eyebrow}</span>
          <h1 className="cx-fade text-outlined mt-5 font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            {t.hero.h1a}
            <span className="text-brand-yellow">{t.hero.h1hl}</span>
          </h1>
          <p className="cx-fade mt-6 max-w-md text-base text-white/75 sm:text-lg">{t.hero.sub}</p>
          <ul className="cx-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.2em] text-white/55 sm:text-sm">
            {t.hero.trust.map((tag) => (
              <li key={tag} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                {tag}
              </li>
            ))}
          </ul>
          <SocialProof label={t.hero.social} className="cx-fade mt-10" />
        </div>

        {/* colonna calcolatore */}
        <div className="cx-fade">
          <CalculatorCard
            t={t}
            segment={segment}
            onSegment={changeSegment}
            values={values}
            onValue={changeValue}
            score={report.score}
            onCalcolate={onCalcolate}
          />
        </div>
      </div>

      {/* RISULTATO */}
      <AnimatePresence>
        {calculated && (
          <motion.div
            id="risultato"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="scroll-mt-24"
          >
            <ResultReport t={t} lang={lang} segment={segment} report={report} unlocked={unlocked} onUnlock={onUnlock} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CALCULATOR CARD                                                      */
/* ------------------------------------------------------------------ */
function CalculatorCard({ t, segment, onSegment, values, onValue, score, onCalcolate }) {
  const levers = VERTICALS[segment].levers
  return (
    <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-8">
      {/* alone giallo dietro la card */}
      <div aria-hidden className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand-yellow/10 blur-3xl" />
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-yellow">Calcolatore ROI</p>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-brand-black/50 px-3 py-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{t.hero.liveScore}</span>
          <span className="font-display text-lg font-extrabold leading-none text-brand-yellow">
            {score}
            <span className="text-xs text-white/40">/100</span>
          </span>
        </div>
      </div>

      <h2 className="mt-4 font-display text-xl font-extrabold leading-tight sm:text-2xl">{t.hero.cardTitle}</h2>

      {/* tabs settore */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {SEGMENTS.map((seg) => {
          const active = seg === segment
          return (
            <button
              key={seg}
              type="button"
              onClick={() => onSegment(seg)}
              aria-pressed={active}
              className={[
                'flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition',
                active
                  ? 'border-brand-yellow bg-brand-yellow text-brand-black'
                  : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white',
              ].join(' ')}
            >
              <SegIcon type={seg} className="h-5 w-5" />
              <span className="text-xs font-bold">{t.segments[seg]}</span>
            </button>
          )
        })}
      </div>

      {/* slider */}
      <div className="mt-6 space-y-5">
        {levers.map((lev) => (
          <Slider
            key={lev.key}
            label={t.levers[lev.key]}
            lever={lev}
            value={values[lev.key]}
            onChange={(v) => onValue(lev.key, v)}
            onCommit={() => track('calc_step_completato', { segmento: segment, step: lev.key })}
          />
        ))}
      </div>

      <button type="button" onClick={onCalcolate} className="btn-primary mt-7 w-full">
        {t.hero.ctaCalc}
      </button>
      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-white/35">{t.hero.demoNote}</p>
    </div>
  )
}

function Slider({ label, lever, value, onChange, onCommit }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-white/80">{label}</span>
        <span className="font-display text-base font-extrabold text-brand-yellow">{fmtValue(lever, value)}</span>
      </div>
      <input
        type="range"
        min={lever.min}
        max={lever.max}
        step={lever.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerUp={onCommit}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-brand-yellow"
        aria-label={label}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* RESULT REPORT — score + range + breakdown (gated)                    */
/* ------------------------------------------------------------------ */
function ResultReport({ t, lang, segment, report, unlocked, onUnlock }) {
  const r = t.result
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="container-x pb-20 pt-4 sm:pb-28">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-brand-dark/70 p-6 shadow-2xl backdrop-blur-md sm:p-9">
        {/* header report */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="eyebrow">{r.eyebrow}</span>
          <span className="rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-yellow">
            {t.segments[segment]}
          </span>
        </div>
        {unlocked && (
          <p className="mt-2 text-xs text-white/45">
            {r.generatedFor} <span className="text-white/70">{unlocked.azienda || '—'}</span> · {today}
          </p>
        )}

        {/* score + potenziale */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/45">{r.scoreLabel}</p>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-5xl font-extrabold leading-none">{report.score}</span>
              <span className="mb-1 text-sm text-white/40">/100</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-brand-yellow transition-all" style={{ width: `${report.score}%` }} />
            </div>
            <p className="mt-2 text-xs font-semibold text-brand-yellow">{zoneOf(report.score, r.zones)}</p>
          </div>

          <div className="rounded-2xl border border-brand-yellow/20 bg-brand-yellow/[0.06] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/45">{r.potentialLabel}</p>
            <div className="mt-2 font-display text-3xl font-extrabold leading-none text-brand-yellow sm:text-4xl">
              {fmtEuro(report.rangeLow)} – {fmtEuro(report.rangeHigh)}
            </div>
            <p className="mt-2 text-xs text-white/50">
              {r.perMonth} · {r.potentialSuffix}
            </p>
          </div>
        </div>

        {/* breakdown */}
        <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellow">{r.breakdownEyebrow}</p>
        <div className="relative mt-3">
          <div className={['grid gap-3', unlocked ? '' : 'pointer-events-none select-none blur-[7px]'].join(' ')} aria-hidden={!unlocked}>
            {report.levers.map((l) => (
              <LeverRow key={l.key} lever={l} t={t} />
            ))}
          </div>
          {!unlocked && <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark/90" />}
        </div>

        {/* gate oppure prossimi passi */}
        {unlocked ? <UnlockedExtra t={t} segment={segment} /> : <GateForm t={t} onUnlock={onUnlock} />}
      </div>
    </div>
  )
}

function LeverRow({ lever, t }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-white/85">{t.levers[lever.key]}</span>
        <span className="font-display text-lg font-extrabold text-brand-yellow">
          +{fmtEuro(lever.euroMonth)}
          <span className="text-xs font-bold text-white/40">{t.result.perMonth}</span>
        </span>
      </div>
      <div className="relative mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-brand-yellow/70" style={{ width: `${Math.round(lever.pct * 100)}%` }} />
        <span className="absolute right-0 top-1/2 h-3 w-0.5 -translate-y-1/2 bg-white/60" />
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-white/45">
        <span>
          {t.result.here}: {fmtValue(lever, lever.current)}
        </span>
        <span>
          {t.result.potentialWord}: {fmtValue(lever, lever.benchmark)}
        </span>
      </div>
    </div>
  )
}

function GateForm({ t, onUnlock }) {
  const g = t.gate
  const [form, setForm] = useState({ nome: '', azienda: '', email: '', telefono: '', privacy: false })
  const onChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  useEffect(() => {
    track('calc_lead_gate_visualizzato', {})
  }, [])
  return (
    <form onSubmit={(e) => onUnlock(e, form)} className="mt-6 rounded-2xl border border-brand-yellow/25 bg-brand-black/50 p-5 sm:p-7">
      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellow">{g.eyebrow}</span>
      <h3 className="mt-2 font-display text-xl font-extrabold leading-tight sm:text-2xl">{g.title}</h3>
      <p className="mt-1.5 text-sm text-white/60">{g.sub}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <GateField label={g.fields.nome.label} name="nome" value={form.nome} onChange={onChange} placeholder={g.fields.nome.placeholder} required />
        <GateField label={g.fields.azienda.label} name="azienda" value={form.azienda} onChange={onChange} placeholder={g.fields.azienda.placeholder} required />
        <GateField label={g.fields.email.label} name="email" type="email" value={form.email} onChange={onChange} placeholder={g.fields.email.placeholder} required />
        <GateField label={g.fields.telefono.label} name="telefono" type="tel" value={form.telefono} onChange={onChange} placeholder={g.fields.telefono.placeholder} required />
      </div>

      <label className="mt-4 flex items-start gap-3 text-left text-xs leading-relaxed text-white/60">
        <input type="checkbox" name="privacy" checked={form.privacy} onChange={onChange} required className="mt-0.5 h-4 w-4 shrink-0 accent-brand-yellow" />
        <span>
          {g.privacyPre}{' '}
          <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-yellow">
            {g.privacyLink}
          </a>
          {g.privacyPost}
        </span>
      </label>

      <button type="submit" className="btn-primary mt-5 w-full">
        {g.submit}
      </button>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-white/30">{g.demoBadge}</p>
    </form>
  )
}

function GateField({ label, name, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/60">{label}</span>
      <input
        name={name}
        {...rest}
        className="w-full rounded-full border border-white/10 bg-brand-black/60 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30"
      />
    </label>
  )
}

// Sbloccato: prossimi passi + CTA alla call. Il CTA funnela al calendario
// on-page (#prenota), NON alla home #contatti (parità con /flappybee).
function UnlockedExtra({ t, segment }) {
  const call = t.call
  const steps = t.nextSteps[segment]
  const onBook = () => {
    track('landing_book_cta', { variant: VARIANT, source: 'result' })
    scrollToBooking()
  }
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }} className="mt-7">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellow">{t.result.stepsTitle}</p>
      <ol className="mt-3 space-y-2.5">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/75">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow font-display text-xs font-extrabold text-brand-black">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>

      <div className="mt-7 rounded-2xl bg-brand-yellow p-5 text-center text-brand-black sm:p-7">
        <h3 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">{call.heading}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-brand-black/75">{call.sub}</p>
        <button
          type="button"
          onClick={onBook}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
        >
          {call.button}
        </button>
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-white/30">{t.result.demoNote}</p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* COSA RICEVI + CHI SIAMO — page-local, copy a tema-report.           */
/* ------------------------------------------------------------------ */
function WhatYouGet() {
  const lang = useLang()
  const t = COPY[lang].receive
  return (
    <section className="section-y bg-brand-black">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">{t.heading}</h2>
          <div className="mt-8 space-y-4">
            {t.items.map((it) => (
              <div key={it.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-black">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base font-extrabold sm:text-lg">{it.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{it.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-[0.08]"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', background: '#FFC501' }}
          />
          <span className="eyebrow">{t.whoEyebrow}</span>
          <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{t.whoTitle}</h3>
          <p className="mt-4 text-base leading-relaxed text-white/70">{t.whoBody}</p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CHECKLIST IDONEITÀ — page-local.                                    */
/* ------------------------------------------------------------------ */
function Fit() {
  const lang = useLang()
  const t = COPY[lang].fit
  return (
    <section
      data-bg-light
      className="relative z-10 rounded-t-[2.5rem] bg-white shadow-[0_-30px_60px_-25px_rgba(0,0,0,0.55)] sm:rounded-t-[3rem]"
      style={{ '--theme-fg': '#0B0B0C', '--theme-bg': '#FFFFFF' }}
    >
      <div className="container-x section-y">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-brand-black sm:text-4xl md:text-5xl">{t.heading}</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-brand-yellow bg-brand-yellow/[0.08] p-7">
            <h3 className="font-display text-lg font-extrabold text-brand-black">{t.forTitle}</h3>
            <ul className="mt-4 space-y-3">
              {t.forItems.map((it) => (
                <li key={it} className="flex items-start gap-3 text-sm text-brand-black/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-black text-brand-yellow">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-brand-black/10 bg-brand-black/[0.02] p-7">
            <h3 className="font-display text-lg font-extrabold text-brand-black/70">{t.notForTitle}</h3>
            <ul className="mt-4 space-y-3">
              {t.notForItems.map((it) => (
                <li key={it} className="flex items-start gap-3 text-sm text-brand-black/55">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-black/25 text-brand-black/40">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CTA FINALE — page-local, torna al calcolatore in cima.              */
/* ------------------------------------------------------------------ */
function FinalCta() {
  const lang = useLang()
  const t = COPY[lang].finalCta
  const scrollTop = () => {
    const el = document.getElementById('top')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section className="relative overflow-hidden bg-brand-yellow text-brand-black">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-12 h-72 w-72 opacity-15 sm:h-96 sm:w-96"
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', background: 'rgba(0,0,0,0.4)' }}
      />
      <div className="container-x relative py-20 text-center md:py-28">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-black/70 sm:text-sm">{t.eyebrow}</span>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
          {t.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base font-medium sm:text-lg">{t.body}</p>
        <button
          type="button"
          onClick={scrollTop}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-brand-black px-10 py-5 text-base font-bold uppercase tracking-wider text-white shadow-[0_18px_60px_-12px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.03] sm:text-lg"
        >
          {t.button}
        </button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */
function FaqSection() {
  const lang = useLang()
  const t = COPY[lang].faq
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <section className="section-y bg-brand-black">
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t.headingPre}
            <span className="text-brand-yellow">{t.headingHl}</span>
          </h2>
          <p className="mt-4 text-base text-white/65">{t.body}</p>
        </div>
        <div className="space-y-3">
          {t.faqs.map((f, i) => (
            <FaqItem key={f.q} faq={f} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqItem({ faq, open, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/[0.05]">
        <span className="font-display text-base font-extrabold sm:text-lg">{faq.q}</span>
        <span
          className={[
            'flex h-8 w-8 flex-none items-center justify-center rounded-full border border-brand-yellow/40 transition',
            open ? 'rotate-180 bg-brand-yellow text-brand-black' : 'text-brand-yellow',
          ].join(' ')}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm leading-relaxed text-white/70">{faq.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
