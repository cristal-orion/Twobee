/* CASE STUDY (/casestudy)
 * -----------------------
 * Vetrina dei lavori, soprattutto CRM e automazioni. Un progetto = un capitolo,
 * con ancora propria (/casestudy#slug) così un singolo caso è linkabile nelle
 * proposte commerciali senza dover creare una pagina per cliente.
 *
 * I DATI STANNO IN ./caseStudiesData.js, non qui: questa pagina è solo layout.
 * Aggiungere un progetto NON richiede di toccare questo file.
 *
 * ── L'IMPAGINATO (rifatto il 2026-10-29 con tasteskill v2) ───────────────────
 * La pagina è impaginata come un report stampato a due colori, giallo e nero.
 * Tutto si allinea a un asse al 42% della larghezza (colonna 6 di 12):
 *
 *   0 ─────────── 42% ──────────────────────────── 100%
 *   │ titoli di    │ titoli di capitolo (h1, h2) e    │
 *   │ blocco, logo │ testo corrente partono da qui    │
 *   │ e note       │                                  │
 *
 * Il primo schermo è un mosaico senza fughe di schermate in bicromia e
 * frammenti di interfaccia, con il titolo sull'asse.
 *
 * ── UN CASO ALLA VOLTA (2026-10-29) ──────────────────────────────────────────
 * Sotto il primo schermo c'è un carosello concavo (components/ConcaveCarousel)
 * con l'anteprima di ogni lavoro e il nome in piccolo. Il pannello al centro è
 * il caso aperto: il suo capitolo compare sotto, e per passare a un altro si
 * gira il carosello. I capitoli sono tutti nel DOM (gli altri con `hidden`):
 * così i link /casestudy#slug delle proposte trovano sempre la loro ancora e il
 * testo resta leggibile ai motori. L'hash segue il caso aperto, quindi l'URL
 * nella barra è sempre quello da mandare a un cliente.
 *
 * Al posto delle schede con icona ci sono testo e una tabella vera: niente
 * bordi da 1px, niente ombre, niente etichette maiuscole spaziate. Le superfici
 * si separano col tono di fondo (bianco, nero, giallo).
 *
 * ── COLORI: le due regole che fanno funzionare la pagina su bianco e su nero ─
 * I capitoli si alternano chiari e scuri. Sui fondi chiari il tema si ribalta
 * via LIGHT_VARS:
 *
 * 1. Le utility .text-white/NN, .border-white/NN e .bg-white/[0.0N] sono
 *    ridefinite su --theme-fg in index.css, quindi si invertono da sole.
 *    ⚠️ Solo i valori presenti in index.css sono sicuri (text-white/40…80,
 *    border-white/5,10, bg-white/[0.03…0.07]): un valore fuori lista resta
 *    bianco fisso e sul bianco diventa invisibile. E il colore ereditato non
 *    basta: ogni elemento di testo porta la sua classe di colore.
 *
 * 2. Il giallo come COLORE DEL TESTO non si usa mai diretto: #FFC501 su bianco
 *    sta a 1,6:1. Si usa .text-accent, che legge --theme-accent: giallo pieno
 *    sui capitoli scuri, oro scuro su quelli chiari. Il giallo pieno come
 *    SFONDO (bg-brand-yellow + text-brand-black) invece va bene ovunque.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import CookieBanner from '../components/CookieBanner.jsx'
import ConcaveCarousel from '../components/ConcaveCarousel.jsx'
import { localePath, useLang } from '../i18n/LanguageContext.jsx'
import { CASES } from './caseStudiesData.js'
import { PROOFS } from './caseStudyProofs.jsx'
import { BookingTile, ChatTile, ElettroTile, FeedTile, KpiTile, SheetTile } from './caseStudyMosaicTiles.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

/* Oro scuro invece del giallo: 4,8:1 sul bianco, cioè leggibile, e resta
 * riconoscibile come colore del marchio. Vedi la regola 2 in testa al file. */
const LIGHT_VARS = {
  '--theme-fg': '#0B0B0C',
  '--theme-bg': '#FFFFFF',
  '--theme-accent': '#8F6D00',
}
const EMAIL = 'info@twobee.it'

/* L'asse. ROW è la griglia di ogni riga della pagina; SIDE è la zona prima
 * dell'asse, MAIN quella dopo. Un blocco che non usa questi tre si vede subito
 * come un rientro a caso. */
const ROW = 'grid gap-y-5 lg:grid-cols-12 lg:gap-x-8'
const SIDE = 'lg:col-span-5'
const MAIN = 'lg:col-span-7 lg:col-start-6'

/* Le cinque misure della pagina. Non aggiungerne una sesta: un testo nuovo
 * prende una di queste. */
const T = {
  display: 'font-display text-[clamp(2.75rem,7vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em]',
  heading: 'font-display text-[clamp(1.75rem,3.4vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] [text-wrap:balance]',
  lead: 'text-[1.1875rem] leading-[1.38] sm:text-[1.375rem] sm:leading-[1.35]',
  body: 'text-[1.0625rem] leading-[1.6] [text-wrap:pretty]',
  small: 'text-[0.9375rem] leading-[1.5]',
}

const COPY = {
  it: {
    hero: {
      titleLines: ['Cosa abbiamo', 'costruito'],
      standfirst:
        'Sistemi e agenti AI che le aziende clienti usano ogni giorno, più uno che abbiamo fatto per noi. Per ognuno: il problema, i numeri, come funziona.',
      mosaicLabel: (client) => `Vai al caso ${client}`,
    },
    works: {
      title: 'Scegli un caso',
      open: 'Apri il caso',
      carousel: 'Case study',
      prev: 'Caso precedente',
      next: 'Caso successivo',
      preview: (client) => `Anteprima del caso ${client}`,
    },
    labels: {
      nextCase: 'Caso successivo',
      problem: 'Il problema',
      results: 'Cosa è cambiato',
      draft: 'Numeri di esempio, da sostituire.',
      beforeAfter: 'Prima e adesso',
      before: 'Prima',
      after: 'Adesso',
      how: 'Come funziona',
      quote: 'Cosa dice il cliente',
      year: 'Anno',
      // Quasi tutti questi sistemi stanno dietro un login: il link porta al
      // sito pubblico del cliente, che serve a dire chi è.
      live: 'Sito del cliente',
      newTab: '(si apre in una nuova scheda)',
      zoom: 'Apri la schermata a piena risoluzione',
      similar: 'Hai un processo simile?',
      template: 'Esempio: struttura da riempire.',
    },
    empty: {
      heading: 'I primi case study stanno arrivando',
      body: 'Stiamo mettendo in fila i lavori con i numeri confermati dai clienti. Se vuoi vedere un sistema dal vivo, chiedicelo in call.',
    },
    cta: {
      heading: 'Portaci il tuo Excel',
      body: 'In 30 minuti di call guardiamo come gestisci oggi contatti e pratiche, e ti diciamo cosa automatizzeremmo per primo. È gratis e non ti impegna a niente.',
      primary: 'Prenota un audit gratuito',
      mail: 'oppure scrivi a',
      footer: 'Rispondiamo entro 24 ore.',
      team: ['Marco Lucci', 'Toto Piacente', 'Gabriele Saraiello', 'Michele Cristallo'],
    },
  },
  en: {
    hero: {
      titleLines: ['What we’ve', 'built'],
      standfirst:
        'Systems and AI agents our clients use every day, plus one we built for ourselves. For each: the problem, the numbers, how it works.',
      mosaicLabel: (client) => `Go to the ${client} case`,
    },
    works: {
      title: 'Pick a case',
      open: 'Open the case',
      carousel: 'Case studies',
      prev: 'Previous case',
      next: 'Next case',
      preview: (client) => `Preview of the ${client} case`,
    },
    labels: {
      nextCase: 'Next case',
      problem: 'The problem',
      results: 'What changed',
      draft: 'Sample figures, to be replaced.',
      beforeAfter: 'Before and now',
      before: 'Before',
      after: 'Now',
      how: 'How it works',
      quote: 'What the client says',
      year: 'Year',
      live: 'Client website',
      newTab: '(opens in a new tab)',
      zoom: 'Open the screen at full resolution',
      similar: 'Got a similar process?',
      template: 'Example: layout to fill in.',
    },
    empty: {
      heading: 'The first case studies are on their way',
      body: 'We’re lining up the projects whose numbers the clients have confirmed. To see a live system, ask us on a call.',
    },
    cta: {
      heading: 'Bring us your spreadsheet',
      body: 'In a 30-minute call we look at how you handle leads and paperwork today, and tell you what we’d automate first. It’s free and commits you to nothing.',
      primary: 'Book a free audit',
      mail: 'or write to',
      footer: 'We reply within 24 hours.',
      team: ['Marco Lucci', 'Toto Piacente', 'Gabriele Saraiello', 'Michele Cristallo'],
    },
  },
}

const CASE_BY_SLUG = Object.fromEntries(CASES.map((c) => [c.slug, c]))
const SLUG_INDEX = Object.fromEntries(CASES.map((c, i) => [c.slug, i]))
const hashSlug = () => decodeURIComponent(window.location.hash.slice(1))

/* Salto a un'ancora senza il salto nativo: con ScrollSmoother attivo il
 * browser scorrerebbe il wrapper sbagliato. Si aggiorna l'hash e si lascia
 * fare all'handler di hashchange, che sa già usare lo smoother. */
function jumpTo(e, slug) {
  e.preventDefault()
  window.history.pushState(null, '', `#${slug}`)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

export default function CaseStudiesPage() {
  const wrapper = useRef(null)
  const content = useRef(null)
  const smoother = useRef(null)
  // Il caso aperto, e dove portare chi legge dopo averlo aperto: 'case' (il
  // capitolo), 'works' (il carosello) o null (resta dov'è). `t` rende diversa
  // ogni richiesta, anche quando si riapre lo stesso caso.
  const [nav, setNav] = useState(() => ({ i: SLUG_INDEX[hashSlug()] ?? 0, where: null, t: 0 }))
  const active = nav.i
  const openCase = useCallback((i, where = null) => setNav({ i, where, t: performance.now() }), [])

  const scrollToId = useCallback((id, smooth) => {
    const target = id && document.getElementById(id)
    if (!target) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (smoother.current) smoother.current.scrollTo(target, smooth, 'top 80px')
    else target.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto' })
  }, [])

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Come nelle altre pagine: smoothing solo su dispositivi a puntatore, sul
    // touch l'inerzia nativa è migliore e ScrollSmoother le va contro.
    if (!reduce && ScrollTrigger.isTouch !== 1) {
      smoother.current = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.1,
        effects: false,
      })
    }

    ScrollTrigger.refresh()

    // Deep link a un singolo caso (/casestudy#slug): il caso è già aperto dallo
    // stato iniziale, resta da scendere fin lì. Il salto nativo del browser
    // avviene prima che ScrollSmoother esista e viene annullato dal suo init.
    const goToAnchor = (smooth) => {
      const id = hashSlug()
      if (!id) return
      if (id in SLUG_INDEX) openCase(SLUG_INDEX[id], 'case')
      else scrollToId(id, smooth)
    }
    if (hashSlug()) scrollToId(hashSlug(), false)

    // Secondo tentativo a caricamento finito: i font del display arrivano dopo e
    // cambiano l'altezza dei titoli. Rifare il conto una volta costa niente.
    const onLoad = () => {
      ScrollTrigger.refresh()
      if (hashSlug()) scrollToId(hashSlug(), false)
    }
    if (window.location.hash) {
      window.addEventListener('load', onLoad, { once: true })
    }

    // Cambiare solo l'hash mentre la pagina è già aperta (mosaico, link
    // /casestudy#altro-caso) non rimonta niente: lo gestiamo noi.
    const onHashChange = () => goToAnchor(true)
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('load', onLoad)
      window.removeEventListener('hashchange', onHashChange)
      smoother.current?.kill()
      smoother.current = null
    }
  }, [])

  // Cambio di caso: l'hash segue (senza scatenare hashchange), il capitolo
  // nuovo entra a righe, e se richiesto si scende fin lì.
  useEffect(() => {
    const slug = CASES[nav.i]?.slug
    if (!slug) return
    // t = 0 è lo stato iniziale: chi arriva su /casestudy senza # non se lo
    // ritrova scritto nella barra prima di aver toccato qualcosa.
    if (nav.t && hashSlug() !== slug) {
      window.history.replaceState(null, '', `#${slug}`)
    }

    const section = document.getElementById(slug)
    if (section && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        section.querySelectorAll('.cs-reveal'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.04, overwrite: true }
      )
    }
    // L'altezza della pagina è cambiata: i trigger più in basso vanno ricalcolati.
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (nav.where === 'case') scrollToId(slug, true)
      else if (nav.where === 'works') scrollToId('lavori', true)
    })
  }, [nav, scrollToId])

  return (
    <div id="top" className="bg-brand-black text-white">
      <Navbar subpage />
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content" ref={content}>
          <main>
            <Hero />
            {CASES.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <Works
                  active={active}
                  onChange={(i) => openCase(i)}
                  onOpen={(i) => openCase(i, 'case')}
                />
                {CASES.map((item, i) => (
                  <CaseSection
                    key={item.slug}
                    item={item}
                    open={i === active}
                    next={CASES[(i + 1) % CASES.length]}
                    onNext={() => openCase((i + 1) % CASES.length, 'works')}
                  />
                ))}
              </>
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
/* PRIMO SCHERMO: mosaico e titolo sull'asse                          */
/* ------------------------------------------------------------------ */

function Hero() {
  const lang = useLang()
  const t = COPY[lang].hero
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      // La mossa firma della pagina: ogni riga del titolo sale da dietro la
      // propria linea di base. Il resto entra dopo, senza fare spettacolo.
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.cs-mosaic-img', { scale: 1.18, duration: 2.4, ease: 'power2.out', stagger: 0.08 }, 0)
        .from('.cs-mosaic-tile', { opacity: 0, duration: 0.6, stagger: 0.05 }, 0)
        // Il registro delle automazioni si riempie voce per voce, la barra del
        // 97% cresce: le due cose vive del mosaico.
        .from('.cs-feed-item', { y: 14, opacity: 0, duration: 0.5, stagger: 0.18, ease: 'power3.out' }, 0.5)
        .from('.cs-kpi-bar', { scaleX: 0, duration: 1.4, ease: 'power3.inOut' }, 0.6)
        .from('.cs-line', { yPercent: 110, duration: 0.9, stagger: 0.11 }, 0.25)
        .from('.cs-hero-fade', { y: 24, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' }, 0.7)
    },
    { scope: root }
  )

  return (
    <section ref={root} className="relative bg-brand-black pb-20 pt-20 sm:pb-28 sm:pt-24 lg:pb-32">
      <Mosaic label={t.mosaicLabel} />

      <div className="container-x">
        <div className={`${ROW} pt-12 sm:pt-16 lg:items-end lg:pt-20`}>
          <h1 className={`${T.display} ${MAIN} text-white lg:row-start-1`}>
            {t.titleLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="cs-line block">{line}</span>
              </span>
            ))}
          </h1>
          <p className={`cs-hero-fade ${T.lead} max-w-[30ch] text-white/80 lg:col-span-4 lg:row-start-1 lg:pb-3`}>
            {t.standfirst}
          </p>
        </div>
      </div>
    </section>
  )
}

/* Il mosaico: tre schermate vere stampate in bicromia giallo e nero (scala
 * di grigi moltiplicata sul giallo, come le foto del team) e, fra una e
 * l'altra, frammenti di interfaccia disegnati a codice (caseStudyMosaicTiles.jsx),
 * accostati senza fughe. Ogni schermata porta al suo caso e al passaggio del
 * mouse torna ai suoi colori. Sul telefono restano due schermate e due
 * tasselli (registro e 97%: la chat su 130px non si legge). */
const MOSAIC = [
  { slug: 'elettra-crm', tile: ElettroTile, cell: 'col-span-2 col-start-1 row-start-1' },
  { tile: FeedTile, cell: 'col-start-3 row-start-1 lg:row-span-2' },
  { slug: 'industrial-service-hr', src: '/casestudy-industrial-dashboard.webp', pos: '12% 62%', cell: 'hidden lg:block lg:col-start-4 lg:row-start-1' },
  { tile: SheetTile, cell: 'hidden lg:block lg:col-start-5 lg:row-start-1' },
  { tile: KpiTile, cell: 'col-start-1 row-start-2 lg:col-start-6 lg:row-start-1' },
  { slug: 'jose-prenotazioni', src: '/casestudy-jose-richieste.webp', pos: '30% 30%', cell: 'hidden lg:block lg:col-start-1 lg:row-start-2' },
  { tile: ChatTile, cell: 'hidden lg:block lg:col-start-2 lg:row-start-2' },
  { slug: 'jose-prenotazioni', src: '/casestudy-jose-calendario.webp', pos: '20% 20%', cell: 'col-span-2 col-start-2 row-start-2 lg:col-start-4' },
  { tile: BookingTile, cell: 'hidden lg:block lg:col-start-6 lg:row-start-2' },
]

function Mosaic({ label }) {
  const lang = useLang()
  return (
    <div className="grid h-[34svh] min-h-[220px] grid-cols-3 grid-rows-2 lg:h-[44svh] lg:min-h-[340px] lg:grid-cols-6">
      {MOSAIC.map((m, i) =>
        m.tile && m.slug ? (
          <a
            key={i}
            href={`#${m.slug}`}
            onClick={(e) => jumpTo(e, m.slug)}
            aria-label={label(CASE_BY_SLUG[m.slug].client)}
            className={`cs-mosaic-tile relative overflow-hidden focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-brand-yellow ${m.cell}`}
          >
            <m.tile lang={lang} />
          </a>
        ) : m.tile ? (
          <div key={i} className={`cs-mosaic-tile relative overflow-hidden ${m.cell}`}>
            <m.tile lang={lang} />
          </div>
        ) : (
          <a
            key={i}
            href={`#${m.slug}`}
            onClick={(e) => jumpTo(e, m.slug)}
            aria-label={label(CASE_BY_SLUG[m.slug].client)}
            className={`group relative overflow-hidden bg-brand-yellow focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-brand-yellow ${m.cell}`}
          >
            <img
              src={m.src}
              alt=""
              className="cs-mosaic-img absolute inset-0 h-full w-full object-cover mix-blend-multiply contrast-125 grayscale transition-[filter] duration-500 group-hover:mix-blend-normal group-hover:contrast-100 group-hover:grayscale-0"
              style={{ objectPosition: m.pos }}
            />
          </a>
        )
      )}
    </div>
  )
}

/* I LAVORI: il carosello concavo. Ogni pannello è l'anteprima di un caso
 * (`card` nei dati, generata dalla sua schermata) col nome in piccolo; sotto,
 * la didascalia del pannello al centro con il problema di partenza. Finché
 * nessuno lo tocca gira da solo e cambia solo la didascalia; girato a mano
 * cambia il caso aperto sotto, e cliccare quello al centro ci porta. */
function Works({ active, onChange, onOpen }) {
  const lang = useLang()
  const t = COPY[lang].works
  const items = CASES.map((c) => ({
    key: c.slug,
    src: c.card?.[lang] || c.card?.it,
    alt: t.preview(c.client),
    title: c.client,
    meta: c.year,
  }))

  return (
    <section id="lavori" className="scroll-mt-20 bg-brand-black pb-20 sm:pb-28">
      <div className="container-x">
        <h2 className={`${T.heading} text-center text-white`}>{t.title}</h2>
      </div>
      <div className="mt-10 sm:mt-14">
        <ConcaveCarousel
          items={items}
          index={active}
          onIndexChange={onChange}
          onSelect={onOpen}
          labels={{ prev: t.prev, next: t.next, carousel: t.carousel }}
          renderCaption={(_, i) => (
            <div className="container-x flex flex-col items-center text-center">
              <p className={`${T.small} text-white/70`}>{CASES[i].client}</p>
              <p className={`mt-1 ${T.lead} max-w-[32ch] font-display font-extrabold text-white [text-wrap:balance]`}>
                {CASES[i].symptom[lang]}
              </p>
              <button
                type="button"
                onClick={() => onOpen(i)}
                className={`mt-3 ${T.small} font-semibold text-white underline decoration-2 underline-offset-[6px] transition-colors hover:text-accent focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow`}
              >
                {t.open}
              </button>
            </div>
          )}
        />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* UN CASE STUDY = UN CAPITOLO                                         */
/* ------------------------------------------------------------------ */

function CaseSection({ item, open, next, onNext }) {
  const lang = useLang()
  const t = COPY[lang].labels
  // Un caso alla volta, sempre su bianco: con un capitolo solo l'alternanza
  // chiaro/scuro non ha più senso, e il bianco stacca dal carosello nero.
  const light = true

  return (
    <section
      id={item.slug}
      hidden={!open}
      // scroll-mt: con la navbar fissa un'ancora senza margine finisce sotto il logo
      className="relative scroll-mt-20 bg-white"
      style={LIGHT_VARS}
      data-bg-light
    >
      <div className="container-x py-24 sm:py-28 lg:py-36">
        <div className={`cs-row ${ROW} lg:items-start`}>
          <div className={`cs-reveal ${SIDE}`}>
            <Logo item={item} light={light} />
            <Meta item={item} className="mt-8 hidden lg:block" />
          </div>
          <div className={MAIN}>
            <h2 className={`cs-reveal ${T.heading} max-w-[22ch] text-white`}>
              <span className="sr-only">{item.client}: </span>
              {item.headline[lang]}
            </h2>
            {item.template && <p className={`cs-reveal mt-4 ${T.small} text-accent`}>{t.template}</p>}
            {item.about?.[lang] && (
              <p className={`cs-reveal mt-6 ${T.lead} max-w-[44ch] text-white/80`}>{item.about[lang]}</p>
            )}
            {/* Sul telefono l'asse sparisce: settore e sistema vengono dopo il
                titolo, non fra il logo e il titolo. */}
            <Meta item={item} className="cs-reveal mt-8 lg:hidden" />
          </div>
        </div>

        {item.diagnosis?.[lang] && (
          <Block title={t.problem}>
            <p className={`${T.body} max-w-[62ch] text-white`}>{item.diagnosis[lang]}</p>
          </Block>
        )}

        <Results item={item} />
        <Proof item={item} />
        <BeforeAfter item={item} />
        <HowItWorks item={item} />
        <Quote item={item} />
        <CaseCta />
        {next && next.slug !== item.slug && (
          <div className={`${ROW} mt-14 sm:mt-20`}>
            <button
              type="button"
              onClick={onNext}
              className={`cs-reveal ${MAIN} group flex w-fit flex-col items-start text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow`}
            >
              <span className={`${T.small} text-white/60`}>{t.nextCase}</span>
              <span className={`${T.lead} font-display font-extrabold text-white underline decoration-2 underline-offset-[6px] transition-colors group-hover:text-accent`}>
                {next.client}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

/* Una riga dell'impaginato: titolo nella zona prima dell'asse, contenuto dopo.
 * Sul telefono l'asse sparisce e il titolo sta sopra il suo testo. */
function Block({ title, children }) {
  return (
    <div className={`cs-row ${ROW} mt-14 sm:mt-20`}>
      <h3 className={`cs-reveal ${SIDE} ${T.lead} font-display font-extrabold text-white`}>{title}</h3>
      <div className={`cs-reveal ${MAIN}`}>{children}</div>
    </div>
  )
}

/* Chi è il cliente. Il logo È il nome quando c'è: i nostri sono tutti loghi
 * testuali, e ripeterlo in caratteri sarebbe la stessa parola due volte. */
function Logo({ item, light }) {
  if (!item.logo) {
    return <p className={`${T.lead} font-display font-extrabold text-white`}>{item.client}</p>
  }
  return (
    <img
      src={item.logo}
      alt={item.client}
      loading="lazy"
      // I loghi partner in public/ sono bianchi pieni (servono al marquee su
      // fondo nero della home): su un capitolo chiaro sparirebbero.
      // `logoMono` li dichiara monocromatici e quindi invertibili; `logoDark`
      // è il caso opposto, inchiostro scuro che sparisce sul nero.
      style={
        (light && item.logoMono) || (!light && item.logoDark)
          ? { filter: 'invert(1)' }
          : undefined
      }
      className="h-12 w-auto max-w-[220px] object-contain object-left sm:h-14"
    />
  )
}

/* Settore, sistema, anno e link. Su desktop sta sotto il logo, prima
 * dell'asse; sul telefono dopo il titolo (vedi CaseSection). */
function Meta({ item, className = '' }) {
  const lang = useLang()
  const t = COPY[lang].labels

  return (
    <div className={className}>
      <dl className={`grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1 ${T.small}`}>
        {item.meta?.map((m, i) => (
          <div key={i}>
            <dt className="text-white/60">{m.label[lang]}</dt>
            <dd className="text-white">{m.value[lang]}</dd>
          </div>
        ))}
        {item.year && (
          <div>
            <dt className="text-white/60">{t.year}</dt>
            <dd className="text-white">{item.year}</dd>
          </div>
        )}
      </dl>

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 inline-block ${T.small} font-semibold text-white underline decoration-2 underline-offset-[6px] transition-colors hover:text-accent`}
        >
          {/* «Sito del cliente» è il caso normale. Josè ha una pagina da provare
              davvero, e lì l'etichetta lo dice. */}
          {item.urlLabel?.[lang] || t.live}
          <span className="sr-only"> {t.newTab}</span>
        </a>
      )}
    </div>
  )
}

/* Cosa è cambiato: tre risultati in colonna di testo, senza schede.
 *
 * `resultsNote` non è una postilla decorativa: finché i numeri sono fatti
 * tecnici e non risultati misurati dal cliente, è la riga che impedisce di
 * leggere «1.044» come una promessa di guadagno. `resultsDraft` accende la
 * scritta «numeri di esempio»: la pagina gira come link nelle proposte, e un
 * numero inventato senza etichetta si legge come vero. */
function Results({ item }) {
  const lang = useLang()
  const t = COPY[lang].labels
  if (!item.results?.length) return null

  return (
    <Block title={t.results}>
      {item.resultsDraft && <p className={`mb-6 ${T.small} text-accent`}>{t.draft}</p>}
      <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
        {item.results.map((r, i) => (
          <div key={i}>
            <p className={`${T.lead} font-display font-extrabold text-white`}>{r.title[lang]}</p>
            {r.body?.[lang] && <p className={`mt-2 ${T.small} text-white/70`}>{r.body[lang]}</p>}
          </div>
        ))}
      </div>
      {item.resultsNote?.[lang] && (
        <p className={`mt-8 ${T.small} max-w-[62ch] text-white/60`}>{item.resultsNote[lang]}</p>
      )}
    </Block>
  )
}

/* La schermata: a tutta larghezza, su un fondo di un tono diverso dal
 * capitolo. Uno screenshot del sistema o un facsimile a codice quando
 * l'interfaccia è il prodotto (caseStudyProofs.jsx). Un caso senza `proof` non
 * mostra il blocco: niente cornici «schermata in arrivo». */
function Proof({ item }) {
  const lang = useLang()
  const t = COPY[lang].labels
  if (!item.proof) return null

  const Component = item.proof.component ? PROOFS[item.proof.component] : null
  const shots = item.proof.images || []
  if (!Component && shots.length === 0) return null

  return (
    <figure className="cs-row mt-14 sm:mt-20">
      <div className="cs-reveal -mx-5 overflow-hidden bg-white/[0.06] px-3 py-6 sm:mx-0 sm:p-8 lg:p-14">
        <div className="cs-plate-inner">
          {Component ? (
            <Component lang={lang} />
          ) : (
            // Due schermate affiancate invece di una lunga: un pannello alto e
            // stretto, allargato a tutta colonna, viene o minuscolo o tagliato.
            <div className={shots.length > 1 ? 'grid gap-3 lg:grid-cols-2 lg:gap-6' : 'mx-auto max-w-[1100px]'}>
              {shots.map((s) => (
                // Il link apre il file a piena risoluzione: chi vuole i
                // dettagli ci clicca, e costa un tag invece di una lightbox.
                <a
                  key={s.src}
                  href={s.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t.zoom}
                  className="block cursor-zoom-in focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
                >
                  <img
                    src={s.src}
                    alt={s.alt?.[lang] || ''}
                    // width/height dichiarate: senza, l'immagine non tiene il
                    // posto e il deep link a un'ancora più in basso sbaglia.
                    width={s.width}
                    height={s.height}
                    loading="lazy"
                    className="block w-full transition-transform duration-500 hover:scale-[1.01]"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      {item.proof.caption?.[lang] && (
        <figcaption className={`cs-reveal ${ROW} mt-5`}>
          <span className={`${MAIN} ${T.small} max-w-[62ch] text-white/70`}>{item.proof.caption[lang]}</span>
        </figcaption>
      )}
    </figure>
  )
}

/* Prima e adesso: una tabella vera, perché le voci vanno in coppia. Le righe
 * di separazione qui sono legittime: è l'unico posto della pagina che ne ha. */
function BeforeAfter({ item }) {
  const lang = useLang()
  const t = COPY[lang].labels
  const before = item.before?.[lang]
  const after = item.after?.[lang]
  if (!before?.length || !after?.length) return null

  return (
    <Block title={t.beforeAfter}>
      <table className={`w-full table-fixed text-left ${T.body}`}>
        <thead>
          <tr>
            <th scope="col" className="pb-3 pr-6 font-display font-extrabold text-white/60">{t.before}</th>
            <th scope="col" className="pb-3 font-display font-extrabold text-accent">{t.after}</th>
          </tr>
        </thead>
        <tbody>
          {before.map((b, i) => (
            <tr key={i} className="border-t border-white/10 align-top" /* taste-skill-ignore: riga di tabella vera */>
              <td className="py-4 pr-6 text-white/70">{b}</td>
              <td className="py-4 text-white">{after[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Block>
  )
}

/* Come funziona: quattro tappe in un elenco numerato vero. I numeri sono i
 * marcatori dell'<ol>, non etichette disegnate. */
function HowItWorks({ item }) {
  const lang = useLang()
  const t = COPY[lang].labels
  if (!item.steps?.length) return null

  return (
    <Block title={t.how}>
      <ol className={`list-decimal space-y-4 pl-7 ${T.body} marker:font-display marker:font-extrabold marker:text-accent`}>
        {item.steps.map((s, i) => (
          <li key={i} className="pl-2">
            <span className="font-display font-extrabold text-white">{s.title[lang]}.</span>{' '}
            {s.body?.[lang] && <span className="text-white/70">{s.body[lang]}</span>}
          </li>
        ))}
      </ol>
    </Block>
  )
}

/* La testimonianza, quando c'è. Il nome che rimanda al profilo vero è metà del
 * suo valore: chiunque può inventarsi un «Responsabile operativo», nessuno si
 * inventa un LinkedIn che si apre. */
function Quote({ item }) {
  const lang = useLang()
  const t = COPY[lang].labels
  const quote = item.quote
  if (!quote) return null

  return (
    <Block title={t.quote}>
      <blockquote>
        <p className={`${T.lead} max-w-[44ch] font-display font-extrabold text-white`}>“{quote.text[lang]}”</p>
        <footer className={`mt-4 ${T.small} text-white/70`}>
          {quote.authorUrl ? (
            <a
              href={quote.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-2 underline-offset-[6px] hover:text-accent"
            >
              {quote.author}
              <span className="sr-only"> {t.newTab}</span>
            </a>
          ) : (
            <span className="font-semibold text-white">{quote.author}</span>
          )}
          {quote.role && <span>, {quote.role[lang]}</span>}
        </footer>
      </blockquote>
    </Block>
  )
}

function CaseCta() {
  const lang = useLang()
  const t = COPY[lang].labels
  const primary = COPY[lang].cta.primary
  return (
    <div className={`cs-row ${ROW} mt-14 sm:mt-20`}>
      <div className={`cs-reveal ${MAIN} flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8`}>
        <p className={`${T.lead} font-display font-extrabold text-white`}>{t.similar}</p>
        <PrimaryButton>{primary}</PrimaryButton>
      </div>
    </div>
  )
}

/* L'unico pulsante della pagina, sempre con lo stesso nome della navbar. */
function PrimaryButton({ children, dark }) {
  const lang = useLang()
  return (
    <a
      href={`${localePath('/', lang)}#contatti`}
      className={[
        'group inline-flex min-h-[52px] items-center gap-3 rounded-full px-7 font-display text-[1.0625rem] font-extrabold transition-[transform,background-color] duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4',
        dark
          ? 'bg-brand-black text-[#FBFAF9] hover:bg-[#26262a] focus-visible:outline-brand-black'
          : 'bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark focus-visible:outline-brand-yellow',
      ].join(' ')}
    >
      {children}
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none">
        <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* NESSUN CASO PUBBLICATO                                              */
/* ------------------------------------------------------------------ */

function EmptyState() {
  const lang = useLang()
  const t = COPY[lang].empty
  return (
    <section className="bg-brand-black">
      <div className={`container-x ${ROW} py-24 sm:py-32`}>
        <div className={MAIN}>
          <h2 className={`${T.heading} text-white`}>{t.heading}</h2>
          <p className={`mt-6 ${T.body} max-w-[62ch] text-white/80`}>{t.body}</p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CHIUSURA: tre facce, poi il campo giallo                            */
/* ------------------------------------------------------------------ */

/* Le foto del team in bianco e nero su giallo pieno, così si saldano al campo
 * giallo sotto senza bordo: le persone con cui fai la call stanno dentro la
 * chiusura. Quella di Michele in Team.jsx ha lo sfondo bianco: questa è la
 * stessa foto (FotoTeam/Michelebennuova.png) appoggiata sul giallo. */
const TEAM_PHOTOS = [
  '/team-marco-bw.webp',
  '/team-toto-bw.webp',
  '/team-gabriele-bw.webp',
  '/team-michele-bw-yellow.webp',
]

function FinalCta() {
  const lang = useLang()
  const t = COPY[lang].cta
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.utils.toArray('.cs-face', root.current).forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: 0 },
          {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })
      gsap.from('.cs-cta-reveal', {
        y: 28,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.cs-cta-band', start: 'top 85%', once: true },
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="bg-brand-yellow">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {TEAM_PHOTOS.map((src, i) => (
          <div key={src} className="aspect-square overflow-hidden sm:aspect-auto sm:h-[36svh] sm:min-h-[260px]">
            <img
              src={src}
              alt={t.team[i]}
              width={600}
              height={600}
              loading="lazy"
              className="cs-face h-[108%] w-full object-cover object-[50%_20%]"
            />
          </div>
        ))}
      </div>

      <div className="cs-cta-band container-x py-20 sm:py-28 lg:py-36">
        <div className={ROW}>
          <div className={MAIN}>
            <h2 className={`cs-cta-reveal ${T.heading} text-brand-black`}>{t.heading}</h2>
            <p className={`cs-cta-reveal mt-6 ${T.lead} max-w-[40ch] text-brand-black`}>{t.body}</p>
            <div className="cs-cta-reveal mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <PrimaryButton dark>{t.primary}</PrimaryButton>
              <p className={`${T.small} text-brand-black`}>
                {t.mail}{' '}
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-semibold underline decoration-2 underline-offset-[6px] transition-[text-decoration-thickness] hover:decoration-4"
                >
                  {EMAIL}
                </a>
              </p>
            </div>
            <p className={`cs-cta-reveal mt-6 ${T.small} text-brand-black`}>{t.footer}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
