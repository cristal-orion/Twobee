/* CASE STUDY (/casestudy)
 * -----------------------
 * Vetrina dei lavori — soprattutto CRM e automazioni. Un progetto = una sezione,
 * con ancora propria (/casestudy#slug) così un singolo caso è linkabile nelle
 * proposte commerciali senza dover creare una pagina per cliente.
 *
 * I DATI STANNO IN ./caseStudiesData.js, non qui: questa pagina è solo layout.
 * Aggiungere un progetto NON richiede di toccare questo file.
 *
 * ── LA SCHEDA (rifatta il 2026-08-06 sul modello mandato da Marco) ───────────
 * Ogni caso è una scheda a due colonne:
 *
 *   ┌───────────────┬──────────────────────────────────────────┐
 *   │ CHI È         │ 1. Risultati chiave   (3 schede, icone)  │
 *   │ headline      │ 2. Prima → Dopo       (3 voci per lato)  │
 *   │ settore/sist. │ 3. Come funziona      (4 tappe numerate) │
 *   │ CTA gialla    │ 4. La prova           (una schermata)    │
 *   │ link al sito  │ 5. Citazione + CTA    (in fondo)         │
 *   └───────────────┴──────────────────────────────────────────┘
 *
 * Prima al posto dei blocchi 1-3 c'erano un paragrafo «Il problema» e un elenco
 * «Cosa abbiamo costruito»: 350 parole a caso, che non leggeva nessuno. Il
 * diagramma di flusso disegnato a codice è diventato il blocco «Come funziona»,
 * e «La prova» adesso è una schermata vera (caseStudyProofs.jsx) invece di uno
 * schema. La versione lunga dei testi sta nei brief in case-studies/*.md.
 *
 * ── COLORI: le due regole che fanno funzionare la pagina su bianco e su nero ─
 * Le sezioni si alternano chiare e scure. Sui fondi chiari il tema si ribalta
 * via LIGHT_VARS:
 *
 * 1. Le utility .text-white/NN, .border-white/NN e .bg-white/[0.0N] sono
 *    ridefinite su --theme-fg in index.css, quindi si invertono da sole.
 *    ⚠️ Solo i valori presenti in index.css sono sicuri (text-white/40…80,
 *    border-white/5,10, bg-white/[0.03…0.07]): un valore fuori lista resta
 *    bianco fisso e sul bianco diventa invisibile.
 *
 * 2. Il giallo come COLORE DEL TESTO non si usa mai diretto: #FFC501 su bianco
 *    sta a 1,6:1 e sparisce a qualunque dimensione, numeri grandi compresi. Si
 *    usa .text-accent / .bg-accent / .border-accent, che leggono --theme-accent:
 *    giallo pieno sulle sezioni scure, oro scuro su quelle chiare. Il giallo
 *    pieno come SFONDO (bg-brand-yellow + text-brand-black) invece va bene
 *    ovunque, ed è il modo per dire «qui si clicca».
 */
import { Fragment, useRef, useState } from 'react'
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
import { PROOFS } from './caseStudyProofs.jsx'
import { Icon } from './caseStudyIcons.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

/* Oro scuro invece del giallo: 4,8:1 sul bianco, cioè leggibile, e resta
 * riconoscibile come colore del marchio. Vedi la regola 2 in testa al file. */
const LIGHT_VARS = {
  '--theme-fg': '#0B0B0C',
  '--theme-bg': '#FFFFFF',
  '--theme-accent': '#8F6D00',
}
const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
const EMAIL = 'info@twobee.it'
const FG = (pct) => `color-mix(in srgb, var(--theme-fg) ${pct}%, transparent)`

const COPY = {
  it: {
    hero: {
      eyebrow: '🍯 Case study',
      headingLine1: 'CRM e automazioni',
      headingHighlight: 'che girano davvero.',
      body: 'Ogni blocco qui sotto è un sistema che gira: da dove si partiva, cosa è cambiato e come funziona. Niente slide, niente mockup.',
      filtersLabel: 'Filtra',
      all: 'Tutti',
      count: (n) => `${n} ${n === 1 ? 'progetto' : 'progetti'}`,
    },
    labels: {
      caseLabel: 'Case cliente',
      results: 'Risultati chiave',
      draft: 'Numeri di esempio',
      before: 'Prima',
      after: 'Dopo',
      how: 'Come funziona',
      proof: 'La prova',
      diagnose: 'Richiedi una diagnosi',
      live: 'Guarda il progetto live',
      similar: 'Hai un processo simile?',
      talk: 'Parliamone',
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
      body: 'Every block below is a system that runs: where it started, what changed and how it works. No slides, no mockups.',
      filtersLabel: 'Filter',
      all: 'All',
      count: (n) => `${n} ${n === 1 ? 'project' : 'projects'}`,
    },
    labels: {
      caseLabel: 'Client case',
      results: 'Key results',
      draft: 'Placeholder figures',
      before: 'Before',
      after: 'After',
      how: 'How it works',
      proof: 'The proof',
      diagnose: 'Ask for a diagnosis',
      live: 'See the project live',
      similar: 'Got a similar process?',
      talk: 'Let’s talk',
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

    // Secondo tentativo a caricamento finito: i font del display arrivano dopo e
    // cambiano l'altezza dei titoli, e su un'ancora in fondo alla pagina gli
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
                <CaseSection key={item.slug} item={item} index={i} light={i % 2 === 0} />
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
/* HERO — unico blocco dove si vede la trama esagonale della pagina    */
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
            <FilterChip active={filter === 'all'} onClick={() => onFilter('all')}>
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
/* UN CASE STUDY = UNA SCHEDA A DUE COLONNE                            */
/* ------------------------------------------------------------------ */

function CaseSection({ item, index, light }) {
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
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      })
    },
    { scope: root }
  )

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
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* lg:self-start e non la stiratura di default: la colonna di destra è
              sempre più alta, e un pannello tirato a forza si riempie di vuoto
              fra la headline e la CTA. Così il vuoto sta fuori dalla scheda,
              dove non si vede. */}
          <div className="cs-reveal lg:col-span-4 lg:self-start">
            <Identity item={item} index={index} light={light} />
          </div>

          <div className="space-y-4 lg:col-span-8 lg:space-y-5">
            <Results item={item} />
            <BeforeAfter item={item} />
            <HowItWorks item={item} />
            <Proof item={item} />
            <QuoteAndCta item={item} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* COLONNA SINISTRA — chi è il cliente e cosa gli è cambiato           */
/* ------------------------------------------------------------------ */

function Identity({ item, index, light }) {
  const lang = useLang()
  const t = COPY[lang].labels
  const contactHref = `${localePath('/', lang)}#contatti`

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      <HexDeco id={item.slug} />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            {t.caseLabel}
            {item.kicker && <> · {item.kicker[lang]}</>}
            {item.year && <> · {item.year}</>}
          </p>
          <span
            aria-hidden
            className="font-display text-xs font-extrabold tracking-[0.1em] text-white/40"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {item.template && (
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-dashed border-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
            <HexDot />
            {t.template}
          </span>
        )}

        {/* Il logo È il nome quando c'è: i nostri sono tutti loghi testuali, e
            ripeterlo sotto in caratteri sarebbe la stessa parola due volte.
            L'h2 resta comunque nel documento per la struttura e per chi legge
            con uno screen reader. */}
        {item.logo ? (
          <>
            <h2 className="sr-only">{item.client}</h2>
            <img
              src={item.logo}
              alt={item.client}
              loading="lazy"
              // I loghi partner in public/ sono bianchi pieni (servono al
              // marquee su fondo nero della home): su una sezione chiara
              // sparirebbero. `logoMono` dichiara che il logo è monocromatico e
              // quindi invertibile senza falsare i colori del marchio.
              style={light && item.logoMono ? { filter: 'invert(1)' } : undefined}
              className="mt-6 h-12 w-auto max-w-[200px] object-contain object-left sm:h-14"
            />
          </>
        ) : (
          <h2 className="mt-6 font-display text-3xl font-extrabold leading-none tracking-tight text-white sm:text-4xl">
            {item.client}
          </h2>
        )}

        <span aria-hidden className="mt-5 block h-1 w-12 rounded-full bg-accent" />

        <p className="mt-6 font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-3xl">
          {item.headline[lang]}
        </p>
      </div>

      {/* mt-auto: su desktop il pannello è alto quanto la colonna di destra, e
          senza questo la CTA resterebbe appesa a metà del vuoto. */}
      <div className="relative mt-auto pt-10">
        {item.meta?.length > 0 && (
          <div className="flex gap-2.5 border-t border-white/10 pt-5">
            <Icon name="info" className="mt-px h-4 w-4 shrink-0 text-accent" />
            <p className="text-xs leading-relaxed text-white/60">
              {item.meta.map((m, i) => (
                <Fragment key={i}>
                  {i > 0 && <span className="text-white/40"> · </span>}
                  <span className="font-bold text-white/80">{m.label[lang]}:</span>{' '}
                  {m.value[lang]}
                </Fragment>
              ))}
            </p>
          </div>
        )}

        <a
          href={contactHref}
          className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-brand-yellow px-5 py-4 font-display text-base font-extrabold text-brand-black transition-transform hover:scale-[1.02]"
        >
          {t.diagnose}
          <ArrowRight className="h-4 w-4" />
        </a>

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 border-b border-white/10 pb-1 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            {t.live}
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
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 1. RISULTATI CHIAVE                                                 */
/* ------------------------------------------------------------------ */

/* Le tre schede in cima: è la prima cosa che si legge della colonna di destra,
 * e per molti l'unica.
 *
 * `resultsNote` non è una postilla decorativa: finché i numeri sono fatti
 * tecnici e non risultati misurati dal cliente, è la riga che impedisce di
 * leggere «1.044» come una promessa di guadagno.
 *
 * `resultsDraft` accende lo stato bozza — badge «numeri di esempio» e schede
 * tratteggiate. Serve a guardare il blocco prima di avere i numeri veri, e a
 * rendere impossibile spedirlo per sbaglio: la pagina gira come link nelle
 * proposte, e un numero inventato senza etichetta, sotto il logo di un cliente
 * vero, si legge come vero. Il flag si toglie insieme ai valori finti. */
function Results({ item }) {
  const lang = useLang()
  const t = COPY[lang].labels
  if (!item.results?.length) return null

  const draft = item.resultsDraft

  return (
    <div className="cs-reveal">
      <BlockHead
        title={t.results}
        right={
          draft && (
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-dashed border-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
              <HexDot />
              {t.draft}
            </span>
          )
        }
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {item.results.map((r, i) => (
          <div
            key={i}
            className={[
              'rounded-2xl bg-white/[0.04] p-5',
              draft
                ? 'border border-dashed border-white/10'
                : 'border border-white/10',
            ].join(' ')}
          >
            <Icon name={r.icon} className="h-7 w-7 text-accent" />
            <p className="mt-4 font-display text-base font-extrabold leading-tight text-white">
              {r.title[lang]}
            </p>
            {r.body?.[lang] && (
              <p className="mt-2 text-sm leading-snug text-white/60">{r.body[lang]}</p>
            )}
          </div>
        ))}
      </div>

      {item.resultsNote?.[lang] && (
        <p className="mt-3 text-xs leading-relaxed text-white/50">
          {item.resultsNote[lang]}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 2. PRIMA → DOPO                                                     */
/* ------------------------------------------------------------------ */

/* Sostituisce il paragrafo «Il problema»: le stesse tre cose che non andavano,
 * ma messe accanto a com'è adesso, che è l'unico modo in cui un problema altrui
 * interessa a qualcuno. Voci da 2-4 parole: sono etichette, non frasi. */
function BeforeAfter({ item }) {
  const lang = useLang()
  const t = COPY[lang].labels
  const before = item.before?.[lang]
  const after = item.after?.[lang]
  if (!before?.length || !after?.length) return null

  return (
    <div className="cs-reveal grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
      <StatePanel label={t.before} items={before} />
      <ArrowRight className="mx-auto h-6 w-6 rotate-90 text-accent lg:rotate-0" />
      <StatePanel label={t.after} items={after} good />
    </div>
  )
}

function StatePanel({ label, items, good }) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-2.5">
        <Icon
          name={good ? 'checkCircle' : 'xCircle'}
          className={good ? 'h-5 w-5 text-accent' : 'h-5 w-5 text-white/50'}
        />
        <span
          className={[
            'font-display text-sm font-extrabold uppercase tracking-[0.14em]',
            good ? 'text-accent' : 'text-white/60',
          ].join(' ')}
        >
          {label}
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((line, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-snug text-white/75">
            <span
              aria-hidden
              className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: good ? 'var(--theme-accent)' : FG(30) }}
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 3. COME FUNZIONA                                                    */
/* ------------------------------------------------------------------ */

/* Quello che prima era il diagramma di flusso disegnato a codice, e prima
 * ancora l'elenco «Cosa abbiamo costruito». Quattro tappe, una riga l'una: serve
 * a far vedere la forma del sistema in tre secondi, non a spiegarlo. Se una
 * tappa non entra in sette parole, la frase intera va nel brief.
 *
 * In colonna fino a xl e in riga da lì: quattro schede affiancate su un telefono
 * avrebbero il testo a due pixel. Il trattino di collegamento ruota da solo. */
function HowItWorks({ item }) {
  const lang = useLang()
  const t = COPY[lang].labels
  if (!item.steps?.length) return null

  return (
    <div className="cs-reveal">
      <BlockHead title={t.how} />

      <div className="mt-4 flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-3 xl:flex xl:flex-row xl:items-stretch xl:gap-0">
        {item.steps.map((s, i) => (
          <Fragment key={i}>
            <div className="flex min-w-0 gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 xl:flex-1">
              <div className="flex shrink-0 flex-col items-center gap-2">
                <span className="font-display text-[11px] font-extrabold tracking-[0.1em] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon name={s.icon} className="h-6 w-6 text-white/70" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-extrabold leading-tight text-white">
                  {s.title[lang]}
                </p>
                {s.body?.[lang] && (
                  <p className="mt-1 text-xs leading-snug text-white/60">{s.body[lang]}</p>
                )}
              </div>
            </div>
            {i < item.steps.length - 1 && (
              <span
                aria-hidden
                className="mx-auto h-3 w-px shrink-0 self-center bg-accent sm:hidden xl:mx-1.5 xl:block xl:h-px xl:w-4"
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 4. LA PROVA                                                         */
/* ------------------------------------------------------------------ */

/* Una schermata del sistema, o un facsimile a codice quando l'interfaccia È il
 * prodotto (vedi caseStudyProofs.jsx). Un caso senza `proof` non mostra il
 * blocco: niente cornici «schermata in arrivo», questa pagina gira come link
 * nelle proposte e un buco dichiarato è peggio di un blocco in meno. */
function Proof({ item }) {
  const lang = useLang()
  const t = COPY[lang].labels
  if (!item.proof) return null

  const Component = item.proof.component ? PROOFS[item.proof.component] : null
  const shots = item.proof.images || []
  if (!Component && shots.length === 0) return null

  return (
    <div className="cs-reveal">
      <BlockHead title={t.proof} />
      <div className="mt-4">
        {Component ? (
          <Component lang={lang} />
        ) : (
          // Due schermate affiancate invece di una lunga: un pannello alto e
          // stretto, allargato a tutta colonna, viene o minuscolo o tagliato.
          // Con una sola immagine la griglia resta a una colonna da sé.
          <div className={shots.length > 1 ? 'grid gap-3 lg:grid-cols-2' : ''}>
            {shots.map((s) => (
              // Affiancate stanno a ~425px: la forma del sistema si legge, le
              // righe dentro no. Il link apre il file a piena risoluzione — chi
              // vuole guardare i dettagli ci clicca, e costa un tag invece di
              // una lightbox.
              <a
                key={s.src}
                href={s.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-zoom-in overflow-hidden rounded-3xl border border-white/10 transition hover:border-accent"
              >
                <img
                  src={s.src}
                  alt={s.alt?.[lang] || ''}
                  // width/height dichiarate: senza, l'immagine non tiene il posto
                  // e il deep link a un'ancora più in basso finisce fuori bersaglio.
                  width={s.width}
                  height={s.height}
                  loading="lazy"
                  className="block w-full"
                />
              </a>
            ))}
          </div>
        )}
      </div>
      {/* Facoltativa, e di norma NON si usa: sotto il pannello di un prodotto
          nostro una postilla «dati di esempio» suona come una scusa, e nessuna
          pagina SaaS la mette. Serve solo se i numeri mostrati parlano di un
          cliente vero e non sono i suoi. */}
      {item.proof.caption?.[lang] && (
        <p className="mt-3 text-xs leading-relaxed text-white/50">
          {item.proof.caption[lang]}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 5. CITAZIONE + CTA                                                  */
/* ------------------------------------------------------------------ */

function QuoteAndCta({ item }) {
  const lang = useLang()
  const t = COPY[lang].labels
  const contactHref = `${localePath('/', lang)}#contatti`
  const quote = item.quote

  return (
    <div className="cs-reveal grid gap-3 lg:grid-cols-5">
      {quote && (
        <blockquote className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 lg:col-span-3">
          <span
            aria-hidden
            className="block font-display text-4xl font-extrabold leading-none text-accent"
          >
            “
          </span>
          <p className="mt-2 font-display text-lg font-bold italic leading-snug text-white">
            {quote.text[lang]}
          </p>
          {/* Il nome che rimanda al profilo vero è metà del valore di una
              testimonianza: chiunque può inventarsi un «Responsabile operativo»,
              nessuno si inventa un LinkedIn che si apre. Senza `authorUrl` resta
              testo semplice e il blocco funziona uguale. */}
          <footer className="mt-3 text-sm">
            {quote.authorUrl ? (
              <a
                href={quote.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-accent underline decoration-transparent underline-offset-4 transition hover:decoration-current"
              >
                {quote.author}
                <Icon name="linkedin" className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="text-accent">{quote.author}</span>
            )}
            {quote.role && <span className="text-white/50"> · {quote.role[lang]}</span>}
          </footer>
        </blockquote>
      )}

      <a
        href={contactHref}
        className={[
          'group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-accent sm:p-6',
          quote ? 'lg:col-span-2' : 'lg:col-span-5',
        ].join(' ')}
      >
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand-yellow text-brand-black"
          style={{ clipPath: HEX_CLIP }}
        >
          <Icon name="users" className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm text-white/70">{t.similar}</span>
          <span className="mt-0.5 flex items-center gap-2 font-display text-lg font-extrabold text-accent">
            {t.talk}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </span>
      </a>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MATTONI CONDIVISI                                                   */
/* ------------------------------------------------------------------ */

/* Titolo di blocco: esagono vuoto in accento + testo neutro. L'esagono è il
 * segno del marchio e qui ha un lavoro preciso — dice dove comincia un blocco
 * senza aggiungere una riga di testo. */
function BlockHead({ title, right }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-white sm:text-xl">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 text-accent"
          fill="none"
        >
          <path
            d="M12 1.75 21.5 7v10L12 22.25 2.5 17V7L12 1.75Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        {title}
      </h3>
      {right}
    </div>
  )
}

/* Esagono pieno piccolo, come pallino dei badge. */
function HexDot() {
  return (
    <span
      aria-hidden
      className="h-2 w-2 shrink-0 bg-accent"
      style={{ clipPath: HEX_CLIP }}
    />
  )
}

function ArrowRight({ className = 'h-4 w-4' }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* Trama esagonale in fondo al pannello di sinistra, come nel modello di Marco.
 * L'id del pattern porta lo slug: due <defs> con lo stesso id nella stessa
 * pagina si pestano i piedi, e se la sezione che possiede il primo viene tolta
 * da un filtro tutte le altre restano senza sfondo. */
function HexDeco({ id }) {
  const pid = `cs-hex-${id}`
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-[0.22]"
    >
      <defs>
        <pattern id={pid} width="28" height="48" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="var(--theme-accent)" strokeWidth="1">
            <path d="M14 -16 28 -8 28 8 14 16 0 8 0 -8Z" />
            <path d="M14 32 28 40 28 56 14 64 0 56 0 40Z" />
            <path d="M0 8 14 16 14 32 0 40 -14 32 -14 16Z" />
            <path d="M28 8 42 16 42 32 28 40 14 32 14 16Z" />
          </g>
        </pattern>
        <linearGradient id={`${pid}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id={`${pid}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${pid}-fade)`} />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${pid})`}
        mask={`url(#${pid}-mask)`}
      />
    </svg>
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
              <ArrowRight className="h-4 w-4" />
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
