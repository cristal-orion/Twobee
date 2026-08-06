/* CASE STUDY (/casestudy)
 * -----------------------
 * Vetrina dei lavori — soprattutto CRM e automazioni. Un progetto = una sezione,
 * con ancora propria (/casestudy#slug) così un singolo caso è linkabile nelle
 * proposte commerciali senza dover creare una pagina per cliente.
 *
 * I DATI STANNO IN ./caseStudiesData.js, non qui: questa pagina è solo layout.
 * Aggiungere un progetto NON richiede di toccare questo file.
 *
 * Ritmo visivo: hero scuro (unico punto dove si vede la trama esagonale, come
 * chiesto nella review del team) e poi sezioni che alternano bianco/nero come in
 * home. La trama sotto l'hero resta coperta dai fondi pieni.
 *
 * Sui fondi chiari il tema si ribalta via LIGHT_VARS: le utility .text-white/NN,
 * .border-white/NN e .bg-white/[0.0N] sono ridefinite su --theme-fg in
 * index.css, quindi si invertono da sole. ⚠️ Solo i valori presenti in
 * index.css sono sicuri (text-white/40…80, border-white/5,10,
 * bg-white/[0.03…0.07]): un valore fuori lista resta bianco fisso e sul bianco
 * diventa invisibile.
 *
 * Niente giallo su bianco per il testo piccolo (illeggibile): gli occhielli
 * usano testo neutro + un esagono giallo come marcatore, il giallo pieno resta
 * per i chip e i numeri grandi.
 */
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HexBackground from '../components/HexBackground.jsx'
import CookieBanner from '../components/CookieBanner.jsx'
import { localePath, useLang } from '../i18n/LanguageContext.jsx'
import { CASES, CATEGORIES } from './caseStudiesData.js'
import { BLUEPRINTS } from './caseStudyBlueprints.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

const LIGHT_VARS = { '--theme-fg': '#0B0B0C', '--theme-bg': '#FFFFFF' }
const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
const EMAIL = 'info@twobee.it'

const COPY = {
  it: {
    hero: {
      eyebrow: '🍯 Case study',
      headingLine1: 'CRM e automazioni',
      headingHighlight: 'che girano davvero.',
      body: 'Ogni blocco qui sotto è un sistema che gira: il problema da cui è partito, cosa abbiamo costruito e come funziona. Niente slide, niente mockup.',
      filtersLabel: 'Filtra',
      all: 'Tutti',
      count: (n) => `${n} ${n === 1 ? 'progetto' : 'progetti'}`,
    },
    labels: {
      challenge: 'Il problema',
      build: 'Cosa abbiamo costruito',
      visit: 'Vedi il sito',
      template: 'Esempio — struttura da riempire',
    },
    empty: {
      heading: 'I primi case study stanno arrivando.',
      body: 'Stiamo mettendo in fila i lavori con i numeri confermati dai clienti. Nel frattempo, se vuoi vedere un sistema dal vivo, chiedicelo in call.',
    },
    cta: {
      eyebrow: 'Il prossimo',
      headingLine1: 'Il prossimo case study',
      headingLine2: 'può essere il tuo.',
      body: '45 minuti, gratis: guardiamo come gestisci oggi i contatti e ti diciamo cosa automatizzeremmo per primo. Senza impegno.',
      primary: 'Prenota un audit gratuito',
      footer: 'Nessun impegno · Rispondiamo entro 24 ore',
    },
  },
  en: {
    hero: {
      eyebrow: '🍯 Case studies',
      headingLine1: 'CRM and automations',
      headingHighlight: 'that actually run.',
      body: 'Every block below is a system that runs: the problem it started from, what we built, and how it works. No slides, no mockups.',
      filtersLabel: 'Filter',
      all: 'All',
      count: (n) => `${n} ${n === 1 ? 'project' : 'projects'}`,
    },
    labels: {
      challenge: 'The problem',
      build: 'What we built',
      visit: 'Visit the site',
      template: 'Example — layout placeholder',
    },
    empty: {
      heading: 'The first case studies are on their way.',
      body: 'We’re lining up the projects whose numbers the clients have confirmed. In the meantime, ask us on a call and we’ll walk you through a live system.',
    },
    cta: {
      eyebrow: 'Next up',
      headingLine1: 'The next case study',
      headingLine2: 'could be yours.',
      body: '45 minutes, free: we look at how you handle leads today and tell you what we’d automate first. No strings attached.',
      primary: 'Book a free audit',
      footer: 'No commitment · We reply within 24 hours',
    },
  },
}

/* Chip di filtro: una categoria compare solo se almeno un progetto la usa,
 * così l'elenco non mostra filtri che non filtrano niente. */
const USED_CATEGORIES = Object.keys(CATEGORIES).filter((key) =>
  CASES.some((c) => c.categories?.includes(key))
)

export default function CaseStudiesPage() {
  const lang = useLang()
  const t = COPY[lang]
  const wrapper = useRef(null)
  const content = useRef(null)
  const [filter, setFilter] = useState('all')

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Come nelle altre pagine: smoothing solo su dispositivi a puntatore, sul
    // touch l'inerzia nativa è migliore e ScrollSmoother le va contro.
    let smoother
    if (!reduce && ScrollTrigger.isTouch !== 1) {
      smoother = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.1,
        effects: false,
      })
    }

    ScrollTrigger.refresh()

    // Deep link a un singolo caso (/casestudy#slug): il salto nativo del browser
    // avviene prima che ScrollSmoother esista e viene annullato dal suo init,
    // quindi ci riportiamo noi sull'ancora dopo il refresh.
    // L'hash si rilegge a ogni chiamata e non si cattura: serve anche a
    // hashchange, dove è cambiato proprio quello.
    const goToAnchor = (smooth) => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const target = id && document.getElementById(id)
      if (!target) return
      if (smoother) smoother.scrollTo(target, smooth, 'top 110px')
      else target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
    }
    goToAnchor(false)

    // Secondo tentativo a caricamento finito. Le dimensioni dichiarate sui
    // blueprint tengono già il posto, ma i font del display arrivano dopo e
    // cambiano l'altezza dei titoli: su un'ancora in fondo alla pagina gli
    // scarti si sommano. Rifare il conto una volta costa niente.
    const onLoad = () => {
      ScrollTrigger.refresh()
      goToAnchor(false)
    }
    if (window.location.hash) {
      window.addEventListener('load', onLoad, { once: true })
    }

    // Cambiare solo l'hash mentre la pagina è già aperta è una navigazione nello
    // stesso documento: React non rimonta, questo effetto non rigira e il salto
    // nativo del browser viene annullato da ScrollSmoother. Senza questo, chi è
    // già sulla pagina e apre un link /casestudy#altro-caso non si muove.
    const onHashChange = () => goToAnchor(true)
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('load', onLoad)
      window.removeEventListener('hashchange', onHashChange)
      if (smoother) smoother.kill()
    }
  }, [])

  const visible =
    filter === 'all'
      ? CASES
      : CASES.filter((c) => c.categories?.includes(filter))

  return (
    <div id="top" className="text-white">
      <HexBackground />
      <Navbar subpage />
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content" ref={content}>
          <main>
            <Hero filter={filter} onFilter={setFilter} count={visible.length} />
            {visible.length === 0 ? (
              <EmptyState />
            ) : (
              visible.map((item, i) => (
                <CaseSection
                  key={item.slug}
                  item={item}
                  index={i}
                  light={i % 2 === 0}
                />
              ))
            )}
            <FinalCta />
          </main>
          <Footer />
        </div>
      </div>
      <CookieBanner />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* HERO — unico blocco dove si vede la trama esagonale                 */
/* ------------------------------------------------------------------ */

function Hero({ filter, onFilter, count }) {
  const lang = useLang()
  const t = COPY[lang].hero
  const root = useRef(null)

  useGSAP(
    () => {
      const fader = gsap.utils.toArray('.cs-hero-fade', root.current)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.set(fader, { y: 24, opacity: 0 })
      gsap.to(fader, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.15,
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-transparent"
      />

      <div className="container-x relative pt-32 pb-14 sm:pt-40 sm:pb-20">
        <span className="cs-hero-fade eyebrow text-outlined-sm">{t.eyebrow}</span>

        <h1 className="cs-hero-fade text-outlined mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
          {t.headingLine1}
          <br />
          <span className="text-brand-yellow">{t.headingHighlight}</span>
        </h1>

        <p className="cs-hero-fade mt-7 max-w-2xl text-base text-white/75 sm:text-lg">
          {t.body}
        </p>

        {USED_CATEGORIES.length > 0 && (
          <div className="cs-hero-fade mt-10 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
              {t.filtersLabel}
            </span>
            <FilterChip
              active={filter === 'all'}
              onClick={() => onFilter('all')}
            >
              {t.all}
            </FilterChip>
            {USED_CATEGORIES.map((key) => (
              <FilterChip
                key={key}
                active={filter === key}
                onClick={() => onFilter(key)}
              >
                {CATEGORIES[key][lang]}
              </FilterChip>
            ))}
            <span className="ml-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/40">
              {t.count(count)}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? 'rounded-full bg-brand-yellow px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-black'
          : 'rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/60 transition hover:text-white'
      }
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* UN CASE STUDY = UNA SEZIONE                                         */
/* ------------------------------------------------------------------ */

function CaseSection({ item, index, light }) {
  const lang = useLang()
  const t = COPY[lang].labels
  const root = useRef(null)

  useGSAP(
    () => {
      const els = gsap.utils.toArray('.cs-reveal', root.current)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      // gsap.from (e non set + onEnter manuale): se al momento dell'init la
      // sezione è già stata superata — deep link a un'ancora, ripristino della
      // posizione di scroll, salto programmatico — ScrollTrigger recupera e fa
      // partire il tween subito, invece di lasciare il contenuto a opacity 0.
      gsap.from(els, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          once: true,
        },
      })
    },
    { scope: root }
  )

  const number = String(index + 1).padStart(2, '0')

  return (
    <section
      id={item.slug}
      // scroll-mt: con la navbar fissa un'ancora senza margine finisce sotto il logo
      className={[
        'relative scroll-mt-28',
        light
          ? 'z-10 rounded-t-[2.5rem] bg-white shadow-[0_-30px_60px_-25px_rgba(0,0,0,0.55)] sm:rounded-t-[3rem]'
          : 'bg-brand-black',
      ].join(' ')}
      style={light ? LIGHT_VARS : undefined}
      {...(light ? { 'data-bg-light': true } : {})}
      ref={root}
    >
      <div className="container-x relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-4 right-0 select-none font-display text-[6rem] font-extrabold leading-none sm:text-[10rem] lg:text-[13rem]"
          style={{ color: 'color-mix(in srgb, var(--theme-fg) 7%, transparent)' }}
        >
          {number}
        </span>

        <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* colonna identità cliente + numeri */}
          <div className="lg:col-span-5">
            {item.template && (
              <span className="cs-reveal mb-5 inline-flex items-center gap-2 rounded-full border border-dashed border-brand-yellow/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                <span
                  aria-hidden
                  className="h-2 w-2 bg-brand-yellow"
                  style={{ clipPath: HEX_CLIP }}
                />
                {t.template}
              </span>
            )}

            <div className="cs-reveal flex flex-wrap items-center gap-2">
              {item.categories?.map((key) => (
                <span
                  key={key}
                  className="rounded-full bg-brand-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-black"
                >
                  {CATEGORIES[key]?.[lang] || key}
                </span>
              ))}
              {item.year && (
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                  {item.year}
                </span>
              )}
            </div>

            {item.logo && (
              <img
                src={item.logo}
                alt={item.client}
                loading="lazy"
                // I loghi partner in public/ sono bianchi pieni (servono al
                // marquee su fondo nero della home): su una sezione chiara
                // sparirebbero. `logoMono` dichiara che il logo è monocromatico
                // e quindi invertibile senza falsare i colori del marchio.
                style={
                  light && item.logoMono ? { filter: 'invert(1)' } : undefined
                }
                className="cs-reveal mt-6 h-14 w-auto max-w-[190px] object-contain object-left sm:h-16"
              />
            )}

            {/* `text-white` esplicito e non ereditato: il colore ereditato dal
                wrapper è già stato risolto in bianco, e sul fondo chiaro
                sparirebbe. Sull'elemento invece --theme-fg vale il nero. */}
            <h2 className="cs-reveal mt-5 font-display text-3xl font-extrabold leading-[1.05] text-white sm:text-4xl lg:text-[2.75rem]">
              {item.client}
            </h2>

            {item.sector && (
              <p className="cs-reveal mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
                {item.sector[lang]}
              </p>
            )}

            <p className="cs-reveal mt-6 text-lg font-medium leading-snug text-white/80 sm:text-xl">
              {item.headline[lang]}
            </p>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-reveal mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/60 transition hover:text-brand-yellow"
              >
                {t.visit}
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}

          </div>

          {/* colonna racconto del lavoro */}
          <div className="lg:col-span-7">
            <div className="cs-reveal">
              <Label>{t.challenge}</Label>
              <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
                {item.challenge[lang]}
              </p>
            </div>

            {item.build?.[lang]?.length > 0 && (
              <div className="cs-reveal mt-9">
                <Label>{t.build}</Label>
                <ul className="mt-4 space-y-3.5">
                  {item.build[lang].map((line, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-base leading-relaxed text-white/75"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-2.5 w-2.5 shrink-0 bg-brand-yellow"
                        style={{ clipPath: HEX_CLIP }}
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.quote && (
              <blockquote className="cs-reveal mt-10 rounded-3xl border border-white/10 border-l-[3px] border-l-brand-yellow bg-white/[0.04] p-5 sm:p-7">
                <p className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                  «{item.quote.text[lang]}»
                </p>
                <footer className="mt-4 text-sm text-white/60">
                  <span className="font-semibold text-white/80">
                    {item.quote.author}
                  </span>
                  {item.quote.role && <> · {item.quote.role[lang]}</>}
                </footer>
              </blockquote>
            )}

          </div>
        </div>

        <Blueprint item={item} />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* BLUEPRINT — il diagramma che spiega il sistema a colpo d'occhio     */
/* ------------------------------------------------------------------ */

/* Il diagramma del sistema, disegnato a codice in caseStudyBlueprints.jsx e non
 * più un'immagine generata: essendo DOM si inverte col tema della sezione, resta
 * nitido a ogni zoom, si legge da telefono (in colonna sotto xl) e si corregge con
 * una Edit. Non c'è niente da caricare, quindi niente lazy loading, niente
 * dimensioni da dichiarare e nessuno spostamento del layout che sballi il deep
 * link a un'ancora più in basso.
 *
 * La didascalia non descrive il disegno — quello si vede — ma dice la cosa che il
 * disegno non riesce a mostrare: la regola, la condizione, il perché. */
function Blueprint({ item }) {
  const lang = useLang()
  const Diagram = BLUEPRINTS[item.slug]
  if (!Diagram) return null

  const caption = item.blueprint?.caption?.[lang]

  return (
    <figure className="cs-reveal mt-14 sm:mt-16">
      <Diagram lang={lang} />
      {caption && (
        <figcaption className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-white/60">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* Occhiello: testo neutro (si inverte col tema) + esagono giallo come marcatore.
 * Il giallo piccolo su bianco non si legge, quindi l'accento è la forma. */
function Label({ children }) {
  return (
    <h3 className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white/60">
      <span
        aria-hidden
        className="h-2.5 w-2.5 shrink-0 bg-brand-yellow"
        style={{ clipPath: HEX_CLIP }}
      />
      {children}
    </h3>
  )
}

/* ------------------------------------------------------------------ */
/* NESSUN CASO PUBBLICATO                                              */
/* ------------------------------------------------------------------ */

function EmptyState() {
  const lang = useLang()
  const t = COPY[lang].empty
  return (
    <section className="relative">
      <div className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center sm:p-10">
          <h2 className="text-outlined font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-base text-white/70">{t.body}</p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CTA FINALE (giallo)                                                 */
/* ------------------------------------------------------------------ */

function FinalCta() {
  const lang = useLang()
  const t = COPY[lang].cta
  const contactHref = `${localePath('/', lang)}#contatti`

  return (
    <section className="relative">
      <div className="relative overflow-hidden bg-brand-yellow text-brand-black">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 opacity-20 sm:h-96 sm:w-96"
          style={{ clipPath: HEX_CLIP, background: 'rgba(0,0,0,0.4)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 opacity-15 sm:h-[28rem] sm:w-[28rem]"
          style={{ clipPath: HEX_CLIP, background: 'rgba(0,0,0,0.4)' }}
        />

        <div className="container-x relative py-20 text-center md:py-28">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-black/70 sm:text-sm">
            {t.eyebrow}
          </span>
          <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            {t.headingLine1}
            <br />
            {t.headingLine2}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-snug sm:text-lg md:text-xl">
            {t.body}
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={contactHref}
              className="inline-flex items-center gap-3 rounded-full bg-brand-black px-10 py-5 text-base font-bold uppercase tracking-wider text-white shadow-[0_18px_60px_-12px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.03] sm:text-lg md:px-12 md:py-6"
            >
              {t.primary}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-black/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-black transition hover:bg-brand-black hover:text-white sm:text-base"
            >
              {EMAIL}
            </a>
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-brand-black/60 sm:text-sm">
            {t.footer}
          </p>
        </div>
      </div>
    </section>
  )
}
