/* Hallmark · macrostructure: Workbench · tone: playful-bold · anchor hue: brand-yellow #FFC501
 * theme: Twobee brand (honeycomb dark · League Spartan display · Inter body) — preserved, not catalog
 * pre-emit critique: P4 H4 E4 S4 R4 V4
 *
 * 🐝 FLAPPY TWOBEE — al posto del calcolatore ROI (che faceva scappare chi non conosce i propri
 * numeri) c'è un mini-gioco: un esagono giallo che schiva i pain point dell'imprenditore medio.
 * Quando ci sbatti, un takeover a schermo intero dice "Hai perso su …" → gate contatti →
 * come lo risolviamo. Endless: prima o poi cadi, e il crash È il gancio.
 *
 * ⚠️ MOCKUP LEAD: il gate emette solo eventi game_* sul dataLayer, NON invia nulla.
 * La destinazione reale del lead (CRM/WhatsApp/Klaviyo) e la mappatura GTM le collega Gabriele.
 */
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HexBackground from '../components/HexBackground.jsx'
import CookieBanner from '../components/CookieBanner.jsx'
import FlappyGame from '../components/FlappyGame.jsx'
import { localePath, useLang } from '../i18n/LanguageContext.jsx'

gsap.registerPlugin(useGSAP)

/* ------------------------------------------------------------------ */
/* dataLayer — la landing emette, Gabriele mappa in GTM                 */
/* ------------------------------------------------------------------ */
function track(event, params) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

/* ------------------------------------------------------------------ */
/* Cal.eu (istanza UE, GDPR) — prenotazione call embeddata.             */
/* CAL_LINK vuoto ('') = mostra un placeholder finché non c'è il link.   */
/* ------------------------------------------------------------------ */
const CAL_LINK = 'two-bee-info-5vs3gb/30min'
const CAL_ORIGIN = 'https://cal.eu'
// embed.js servito dall'app della stessa istanza (app.cal.eu → resta in UE)
const CAL_EMBED_JS = CAL_ORIGIN.replace('https://', 'https://app.') + '/embed/embed.js'

/* ------------------------------------------------------------------ */
/* COPY it/en                                                           */
/* ------------------------------------------------------------------ */
const COPY = {
  it: {
    hero: {
      eyebrow: '🐝 Il gioco della crescita · 30 secondi',
      h1a: 'Quanti ostacoli riesci a ',
      h1hl: 'schivare da solo?',
      sub: 'Fai volare l’apina ed evita i pain point che frenano ogni imprenditore. Quando ne colpisci uno… ti mostriamo come lo risolviamo.',
      trust: ['30 secondi', 'Nessun dato da inserire', 'Zero impegno'],
      social: 'Già al fianco di PMI e brand del Sud Italia',
      cardTag: 'Flappy Twobee',
      scoreLabel: 'Schivati',
      bestLabel: 'Record',
      instrIdle: 'Tocca o premi Spazio per volare',
      talkInstead: 'Preferisci saltare il gioco e parlarci direttamente? →',
    },
    // pain point = i tubi. Ordine ciclico nel gioco.
    pains: [
      {
        key: 'passaparola',
        label: 'Dipendenza dal passaparola',
        loseLine: 'Il passaparola è comodo… finché arriva. Poi cala il silenzio.',
        solTitle: 'Dal passaparola a un flusso di clienti prevedibile',
        solBody:
          'Costruiamo un sistema di acquisizione che ti porta clienti ogni mese, non “quando capita”. Campagne misurabili che si affiancano al passaparola, invece di dipenderne.',
      },
      {
        key: 'budget',
        label: 'Budget ridotti e fretta',
        loseLine: 'Poco budget e serve tutto per ieri: la ricetta perfetta per bruciare soldi.',
        solTitle: 'Budget piccolo, metodo grande',
        solBody:
          'Partiamo dai quick win a basso costo, misuriamo ogni euro e reinvestiamo solo ciò che porta ricavi. Veloci, ma senza sprechi.',
      },
      {
        key: 'faidate',
        label: 'Fai-da-te (mancanza di competenze)',
        loseLine: 'Fare tutto da soli non è gratis: lo paghi in tempo e occasioni perse.',
        solTitle: 'Un reparto marketing, senza doverlo assumere',
        solBody:
          'Ti diamo un team che fa oggi ciò che tu impareresti in mesi. Tu torni a fare l’imprenditore, al marketing pensiamo noi.',
      },
      {
        key: 'sfiducia',
        label: 'Sfiducia verso le agenzie',
        loseLine: 'Ti hanno promesso la luna e consegnato qualche like. Normale essere diffidenti.',
        solTitle: 'KPI di fatturato, non vanity metrics',
        solBody:
          'Lavoriamo su numeri che contano — ricavi, margine, clienti — con report chiari e obiettivi condivisi. Se non porta risultati, non lo facciamo.',
      },
      {
        key: 'differenziazione',
        label: 'Mancanza di differenziazione',
        loseLine: 'Se sembri uguale a tutti gli altri, ti resta una sola leva: il prezzo.',
        solTitle: 'Diventa la scelta ovvia del tuo mercato',
        solBody:
          'Costruiamo un posizionamento che ti distingue davvero, così smetti di competere sullo sconto e inizi a competere sul valore.',
      },
    ],
    lose: {
      eyebrow: '💥 Game over',
      pre: 'Hai perso su',
      scored: 'Pain point schivati',
      discover: 'Scopri come risolverlo',
      restart: 'Rigioca',
      solutionEyebrow: 'La nostra risposta',
    },
    gate: {
      eyebrow: '🔒 Ultimo step',
      title: 'Sblocca come lo risolviamo',
      subPre: 'Ti mandiamo la soluzione per «',
      subPost: '» e ti richiamiamo per una call strategica gratuita.',
      fields: {
        nome: { label: 'Nome e cognome*', placeholder: 'Come ti chiami?' },
        azienda: { label: 'Azienda*', placeholder: 'Nome della tua attività' },
        email: { label: 'Email*', placeholder: 'La tua email' },
        telefono: { label: 'Telefono*', placeholder: 'Il tuo numero' },
      },
      privacyPre: 'Ho letto la',
      privacyLink: 'Privacy Policy',
      privacyPost: ' e autorizzo Two Bee S.r.l. a ricontattarmi.*',
      submit: 'Sblocca la soluzione',
      demoBadge: 'Mockup: in demo il form sblocca solo la soluzione, non invia nulla',
    },
    call: {
      heading: 'Prenota la tua call strategica gratuita',
      sub: '30 minuti con il team Two Bee per trasformare questo ostacolo in un piano. Nessun impegno.',
      button: 'Prenota la call →',
    },
    book: {
      eyebrow: 'Prenota ora',
      heading: 'Scegli tu quando ne parliamo.',
      body: '30 minuti, gratis e senza impegno: guardiamo insieme i tuoi numeri e ti diciamo, dati alla mano, se e come possiamo farti crescere.',
      bullets: ['30 minuti', 'Gratis e senza impegno', 'Con chi lavora davvero al tuo progetto'],
      placeholder: 'Qui va il calendario Cal per prenotare la call.',
    },
    receive: {
      eyebrow: 'Cosa ricevi',
      heading: 'Non un game over. Un piano.',
      items: [
        { title: 'La soluzione al tuo ostacolo', body: 'Come affrontiamo, in concreto, il pain point su cui sei caduto — tarato sul tuo business.' },
        { title: 'Le prossime mosse', body: 'Azioni prioritizzate per colmare per primo il gap più costoso.' },
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
    faq: {
      eyebrow: 'FAQ',
      headingPre: 'Domande ',
      headingHl: 'frequenti',
      body: 'I dubbi più comuni sul gioco e su come lavoriamo.',
      faqs: [
        {
          q: 'Devo essere bravo a giocare?',
          a: 'No, basta un tap. E onestamente il gioco è fatto apposta per farti sbattere prima o poi: i pain point sono più forti di così.',
        },
        {
          q: 'Cosa c’entra un gioco con la mia azienda?',
          a: 'I tubi non sono a caso: sono i cinque ostacoli che frenano quasi ogni imprenditore italiano. Se ci sbatti, probabilmente ne vivi almeno uno davvero.',
        },
        {
          q: 'Cosa succede se lascio i contatti?',
          a: 'Ti mostriamo come risolviamo il pain point su cui sei caduto e ti ricontattiamo per una call gratuita di 30 minuti. Nessun impegno, nessuna carta di credito.',
        },
        {
          q: 'Devo essere già un cliente?',
          a: 'No. Il gioco è aperto a tutti. È anzi il modo più veloce (e divertente) per capire se possiamo esserti utili.',
        },
      ],
    },
    finalCta: {
      eyebrow: 'Tocca a te',
      heading: 'Quanti pain point riesci a schivare?',
      body: 'Un tap adesso e scopri quale ostacolo ti frena davvero. Poi lo risolviamo insieme.',
      button: 'Vai al gioco ↑',
    },
    team: {
      eyebrow: 'Il team',
      headingPre: 'Dietro Two Bee non c’è un freelance. C’è ',
      headingHl: 'una squadra.',
      body: 'Molti “esperti di marketing” sono una persona sola dietro un PC. Noi siamo un team di specialisti — strategia, ads, dati, contenuti, automazioni, AI — ognuno con il suo mestiere. Ecco le facce.',
    },
  },
  en: {
    hero: {
      eyebrow: '🐝 The growth game · 30 seconds',
      h1a: 'How many obstacles can you ',
      h1hl: 'dodge on your own?',
      sub: 'Fly the bee and dodge the pain points that hold back every entrepreneur. When you hit one… we show you how we fix it.',
      trust: ['30 seconds', 'No data to enter', 'Zero commitment'],
      social: 'Already backing SMEs and brands across Southern Italy',
      cardTag: 'Flappy Twobee',
      scoreLabel: 'Dodged',
      bestLabel: 'Best',
      instrIdle: 'Tap or press Space to fly',
      talkInstead: 'Rather skip the game and talk to us directly? →',
    },
    pains: [
      {
        key: 'passaparola',
        label: 'Word-of-mouth dependency',
        loseLine: 'Word of mouth is great… until it stops. Then comes the silence.',
        solTitle: 'From word of mouth to a predictable client flow',
        solBody:
          'We build an acquisition system that brings clients every month, not “whenever it happens”. Measurable campaigns that complement word of mouth instead of relying on it.',
      },
      {
        key: 'budget',
        label: 'Tight budgets & rush',
        loseLine: 'Small budget and “needed yesterday”: the perfect recipe for burning money.',
        solTitle: 'Small budget, big method',
        solBody:
          'We start with low-cost quick wins, measure every euro and only reinvest what drives revenue. Fast, but without waste.',
      },
      {
        key: 'faidate',
        label: 'DIY (lack of skills)',
        loseLine: 'Doing it all yourself isn’t free: you pay in time and missed chances.',
        solTitle: 'A marketing department, without hiring one',
        solBody:
          'We give you a team that does today what you’d spend months learning. You get back to running the business, we handle the marketing.',
      },
      {
        key: 'sfiducia',
        label: 'Distrust of agencies',
        loseLine: 'They promised the moon and delivered a few likes. Fair enough to be wary.',
        solTitle: 'Revenue KPIs, not vanity metrics',
        solBody:
          'We work on numbers that matter — revenue, margin, clients — with clear reports and shared goals. If it doesn’t deliver, we don’t do it.',
      },
      {
        key: 'differenziazione',
        label: 'No differentiation',
        loseLine: 'If you look like everyone else, you’re left with one lever: price.',
        solTitle: 'Become the obvious choice in your market',
        solBody:
          'We build positioning that truly sets you apart, so you stop competing on discounts and start competing on value.',
      },
    ],
    lose: {
      eyebrow: '💥 Game over',
      pre: 'You lost on',
      scored: 'Pain points dodged',
      discover: 'See how we fix it',
      restart: 'Play again',
      solutionEyebrow: 'Our answer',
    },
    gate: {
      eyebrow: '🔒 Last step',
      title: 'Unlock how we fix it',
      subPre: 'We’ll send the fix for “',
      subPost: '” and call you for a free strategy session.',
      fields: {
        nome: { label: 'Full name*', placeholder: 'What’s your name?' },
        azienda: { label: 'Company*', placeholder: 'Your business name' },
        email: { label: 'Email*', placeholder: 'Your email' },
        telefono: { label: 'Phone*', placeholder: 'Your number' },
      },
      privacyPre: 'I’ve read the',
      privacyLink: 'Privacy Policy',
      privacyPost: ' and authorize Two Bee S.r.l. to contact me.*',
      submit: 'Unlock the fix',
      demoBadge: 'Mockup: in demo the form only unlocks the fix, it sends nothing',
    },
    call: {
      heading: 'Book your free strategy call',
      sub: '30 minutes with the Two Bee team to turn this obstacle into a plan. No commitment.',
      button: 'Book the call →',
    },
    book: {
      eyebrow: 'Book now',
      heading: 'You pick when we talk.',
      body: '30 minutes, free and no strings: we look at your numbers together and tell you, data in hand, if and how we can help you grow.',
      bullets: ['30 minutes', 'Free, no commitment', 'With the people actually on your project'],
      placeholder: 'The Cal booking calendar goes here.',
    },
    receive: {
      eyebrow: 'What you get',
      heading: 'Not a game over. A plan.',
      items: [
        { title: 'The fix for your obstacle', body: 'How we tackle, concretely, the pain point you crashed on — tuned to your business.' },
        { title: 'Your next moves', body: 'Prioritized actions to close the costliest gap first.' },
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
    faq: {
      eyebrow: 'FAQ',
      headingPre: 'Frequently asked ',
      headingHl: 'questions',
      body: 'The most common doubts about the game and how we work.',
      faqs: [
        {
          q: 'Do I need to be good at the game?',
          a: 'No, just one tap. And honestly the game is built to make you crash sooner or later: the pain points are stronger than that.',
        },
        {
          q: 'What does a game have to do with my business?',
          a: 'The pipes aren’t random: they’re the five obstacles that hold back almost every Italian entrepreneur. If you crash, you probably live at least one for real.',
        },
        {
          q: 'What happens if I leave my details?',
          a: 'We show you how we solve the pain point you crashed on and reach out to book a free 30-minute call. No commitment, no credit card.',
        },
        {
          q: 'Do I need to be a client already?',
          a: 'No. The game is open to everyone. It’s actually the fastest (and most fun) way to see if we can help.',
        },
      ],
    },
    finalCta: {
      eyebrow: 'Your turn',
      heading: 'How many pain points can you dodge?',
      body: 'One tap now and find out which obstacle really holds you back. Then we solve it together.',
      button: 'Back to the game ↑',
    },
    team: {
      eyebrow: 'The team',
      headingPre: 'Behind Two Bee there’s no freelancer. There’s ',
      headingHl: 'a team.',
      body: 'Many “marketing experts” are one person behind a laptop. We’re a team of specialists — strategy, ads, data, content, automation, AI — each with their craft. Here are the faces.',
    },
  },
}

/* ================================================================== */
/* PAGE                                                                 */
/* ================================================================== */
export default function CalcolatorePage() {
  // Niente ScrollSmoother qui: l'auto-scroll dell'embed Cal (che ridimensiona
  // l'iframe scegliendo giorno/orario) va in conflitto con lo scroll "smussato"
  // via transform → salti a caso. Scroll nativo = prenotazione fluida.
  useEffect(() => {
    track('game_view', { page: 'calcolatore' })
  }, [])

  return (
    <div id="top" className="text-white">
      <HexBackground />
      <Navbar landing />
      <main>
        <Experience />
        <BookCall />
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
/* EXPERIENCE — hero + gioco + takeover di sconfitta                    */
/* ------------------------------------------------------------------ */
function Experience() {
  const lang = useLang()
  const t = COPY[lang]
  const reduce = useReducedMotion()
  const root = useRef(null)

  const [gameKey, setGameKey] = useState(0)
  const [over, setOver] = useState(false)
  const [painKey, setPainKey] = useState(t.pains[0].key)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [stage, setStage] = useState('lose') // lose | form | solution

  useGSAP(
    () => {
      const fader = gsap.utils.toArray('.cx-fade', root.current)
      gsap.set(fader, { y: 24, opacity: 0 })
      gsap.to(fader, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.15 })
    },
    { scope: root }
  )

  // blocco lo scroll di fondo mentre il takeover è aperto
  useEffect(() => {
    if (!over) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [over])

  const handleStart = () => track('game_start', { page: 'calcolatore' })
  const handleCrash = (key, sc) => {
    const k = key || t.pains[0].key
    const s = sc || 0
    setPainKey(k)
    setScore(s)
    setBest((b) => Math.max(b, s))
    setStage('lose')
    setOver(true)
    track('game_over', { pain: k, score: s })
  }
  const handleDiscover = () => {
    setStage('form')
    track('game_lead_gate_visualizzato', { pain: painKey, score })
  }
  const handleSubmit = () => {
    setStage('solution')
    track('game_lead_inviato', { pain: painKey, score }) // NB: nessun invio reale → Gabriele
  }
  const handleCall = () => track('game_cta_call', { pain: painKey })
  const handleRestart = () => {
    setOver(false)
    setStage('lose')
    setGameKey((k) => k + 1)
    track('game_restart', {})
  }

  const gamePains = t.pains.map((p) => ({ key: p.key, label: p.label }))

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

        {/* colonna gioco */}
        <div className="cx-fade">
          <FlappyGame
            key={gameKey}
            pains={gamePains}
            best={best}
            reduce={!!reduce}
            labels={{
              tag: t.hero.cardTag,
              score: t.hero.scoreLabel,
              best: t.hero.bestLabel,
              idle: t.hero.instrIdle,
            }}
            onStart={handleStart}
            onCrash={handleCrash}
          />
          <p className="mt-4 text-center text-xs text-white/40">
            <a href={`${localePath('/', lang)}#contatti`} className="underline transition hover:text-brand-yellow">
              {t.hero.talkInstead}
            </a>
          </p>
        </div>
      </div>

      {over &&
        typeof document !== 'undefined' &&
        createPortal(
          <LoseTakeover
            t={t}
            lang={lang}
            painKey={painKey}
            score={score}
            stage={stage}
            onDiscover={handleDiscover}
            onSubmit={handleSubmit}
            onCall={handleCall}
            onRestart={handleRestart}
          />,
          document.body
        )}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* TAKEOVER DI SCONFITTA — fullscreen: lose → form → solution           */
/* ------------------------------------------------------------------ */
function LoseTakeover({ t, lang, painKey, score, stage, onDiscover, onSubmit, onCall, onRestart }) {
  const pain = t.pains.find((p) => p.key === painKey) || t.pains[0]

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-brand-black/95 px-5 py-12 text-white backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* decoro: esagono gigante sfocato + vignetta */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: '#FFC501',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.65))]" />
      </div>

      <button
        onClick={onRestart}
        aria-label="Chiudi"
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 transition hover:border-white/40 hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="relative w-full max-w-xl">
        <AnimatePresence mode="wait">
          {stage === 'lose' && (
            <motion.div
              key="lose"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="text-center"
            >
              <span className="text-5xl sm:text-6xl">💥</span>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">{t.lose.eyebrow}</p>
              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-white/50">{t.lose.pre}</p>
              <h2 className="text-outlined mt-2 font-display text-4xl font-extrabold uppercase leading-[0.95] text-brand-yellow sm:text-5xl md:text-6xl">
                {pain.label}
              </h2>
              <p className="mx-auto mt-5 max-w-md text-base text-white/70 sm:text-lg">{pain.loseLine}</p>
              <p className="mt-6 text-xs uppercase tracking-widest text-white/40">
                {t.lose.scored}: <span className="font-display font-extrabold text-brand-yellow">{score}</span>
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button onClick={onDiscover} className="btn-primary w-full sm:w-auto">
                  {t.lose.discover} →
                </button>
                <button
                  onClick={onRestart}
                  className="w-full rounded-full border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white/80 transition hover:border-white/50 hover:text-white sm:w-auto"
                >
                  {t.lose.restart}
                </button>
              </div>
            </motion.div>
          )}

          {stage === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <GateForm t={t} pain={pain} onSubmit={onSubmit} />
            </motion.div>
          )}

          {stage === 'solution' && (
            <motion.div
              key="solution"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <SolutionStage t={t} lang={lang} pain={pain} onCall={onCall} onRestart={onRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function GateForm({ t, pain, onSubmit }) {
  const g = t.gate
  const [form, setForm] = useState({ nome: '', azienda: '', email: '', telefono: '', privacy: false })
  const onChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
      }}
      className="rounded-2xl border border-brand-yellow/25 bg-brand-black/70 p-5 shadow-2xl sm:p-7"
    >
      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellow">{g.eyebrow}</span>
      <h3 className="mt-2 font-display text-xl font-extrabold leading-tight sm:text-2xl">{g.title}</h3>
      <p className="mt-1.5 text-sm text-white/60">
        {g.subPre}
        <span className="text-white/80">{pain.label}</span>
        {g.subPost}
      </p>

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

function SolutionStage({ t, lang, pain, onCall, onRestart }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-brand-dark/80 p-6 shadow-2xl sm:p-8">
      <span className="rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-yellow">
        {pain.label}
      </span>
      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellow">{t.lose.solutionEyebrow}</p>
      <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{pain.solTitle}</h3>
      <p className="mt-3 text-base leading-relaxed text-white/70">{pain.solBody}</p>

      <div className="mt-7 rounded-2xl bg-brand-yellow p-5 text-center text-brand-black sm:p-7">
        <h4 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">{t.call.heading}</h4>
        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-brand-black/75">{t.call.sub}</p>
        <a
          href={`${localePath('/', lang)}#contatti`}
          onClick={onCall}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
        >
          {t.call.button}
        </a>
      </div>

      <button
        onClick={onRestart}
        className="mt-5 w-full rounded-full border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white/80 transition hover:border-white/50 hover:text-white"
      >
        {t.lose.restart}
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* SOCIAL PROOF — striscia loghi partner                                */
/* ------------------------------------------------------------------ */
const PARTNER_LOGOS = [
  '/partner-sartoriacondotti.webp',
  '/partner-icuraimpresa.webp',
  '/partner-affinity.webp',
  '/partner-elettragroup.webp',
  '/partner-seven.webp',
]
function SocialProof({ label, className = '' }) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">{label}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-4">
        {PARTNER_LOGOS.map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-8 w-auto max-w-[120px] object-contain opacity-50 grayscale transition hover:opacity-80 sm:h-9"
          />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* PRENOTA LA CALL — calendario Cal.com embeddato (tema chiaro + brand). */
/* ------------------------------------------------------------------ */
function BookCall() {
  const lang = useLang()
  const t = COPY[lang].book
  const started = useRef(false)

  useEffect(() => {
    if (!CAL_LINK || started.current || typeof window === 'undefined') return
    started.current = true
    /* loader ufficiale Cal.com (condensato) */
    ;(function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar)
      }
      let d = C.document
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal
          let ar = arguments
          if (!cal.loaded) {
            cal.ns = {}
            cal.q = cal.q || []
            d.head.appendChild(d.createElement('script')).src = A
            cal.loaded = true
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments)
            }
            const namespace = ar[1]
            api.q = api.q || []
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api
              p(cal.ns[namespace], ar)
              p(cal, ['initNamespace', namespace])
            } else p(cal, ar)
            return
          }
          p(cal, ar)
        }
    })(window, CAL_EMBED_JS, 'init')

    window.Cal('init', { origin: CAL_ORIGIN })
    window.Cal('inline', {
      elementOrSelector: '#cal-inline',
      calLink: CAL_LINK,
      config: { theme: 'light', layout: 'month_view' },
    })
    window.Cal('ui', {
      theme: 'light',
      cssVarsPerTheme: { light: { 'cal-brand': '#FFC501' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
  }, [])

  return (
    <section
      data-bg-light
      className="relative z-10 rounded-t-[2.5rem] bg-white shadow-[0_-30px_60px_-25px_rgba(0,0,0,0.55)] sm:rounded-t-[3rem]"
      style={{ '--theme-fg': '#0B0B0C', '--theme-bg': '#FFFFFF' }}
    >
      <div className="container-x section-y">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-brand-black sm:text-4xl md:text-5xl">
            {t.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-black/65">{t.body}</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {t.bullets.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-2 rounded-full border border-brand-black/10 bg-brand-black/[0.03] px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-black/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-brand-black/10 bg-white shadow-xl">
          {CAL_LINK ? (
            <div id="cal-inline" style={{ minHeight: 640, width: '100%' }} />
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 p-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow text-brand-black">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                  <path d="M8 14h3M13 14h3" />
                </svg>
              </span>
              <p className="font-display text-lg font-extrabold text-brand-black">{t.placeholder}</p>
              <p className="text-xs uppercase tracking-widest text-brand-black/40">Cal.com · CAL_LINK</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* COSA RICEVI + CHI SIAMO                                              */
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
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: '#FFC501',
            }}
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
/* TEAM — favo di bolle stile menu Apple Watch (foto B/N + nomi).       */
/* Riusa le webp B/N già ottimizzate del sito (/team-<id>-bw.webp).     */
/* ------------------------------------------------------------------ */
const TEAM = [
  { id: 'marco', name: 'Marco Lucci', role: 'Founder & Strategist' },
  { id: 'toto', name: 'Toto Piacente', role: 'Co-Founder & Growth' },
  { id: 'sabrina', name: 'Sabrina Nastro', role: 'Growth Marketing Strategist' },
  { id: 'michele', name: 'Michele Cristallo', role: 'AI Specialist' },
  { id: 'gabriele', name: 'Gabriele Saraiello', role: 'Automation Specialist' },
  { id: 'annalisa', name: 'Annalisa Smiraglia', role: 'Social Media Manager & Content Creator' },
  { id: 'agostino', name: 'Agostino Abate', role: 'Media Buyer' },
  { id: 'claudia', name: 'Claudia Amodei', role: 'AI Executive' },
].map((m) => ({ ...m, photo: `/team-${m.id}-bw.webp` }))

// riga 2-3-3: i fondatori (Marco+Toto) in cima e più grandi, poi il resto a favo
const TEAM_ROWS = [
  [0, 1],
  [2, 3, 4],
  [5, 6, 7],
]

// Facce sempre visibili (trust-critical su landing ads): niente reveal JS,
// solo float idle CSS + magnify all'hover. Se le animazioni non partono, resta tutto visibile.
// `big` = riga fondatori (foto e nome più grandi).
function HiveBubble({ m, i, big = false }) {
  const cellW = big ? 'w-[clamp(124px,31vw,178px)]' : 'w-[clamp(104px,25vw,146px)]'
  const circW = big ? 'w-[clamp(112px,28vw,152px)]' : 'w-[clamp(92px,23vw,128px)]'
  const nameCls = big ? 'text-[15px] sm:text-lg' : 'text-[13px] sm:text-base'
  return (
    <div className={`flex ${cellW} flex-col items-center text-center`}>
      <div
        className="hive-float"
        style={{ animation: 'hiveFloat 4.5s ease-in-out infinite', animationDelay: `${(i % 4) * 0.4}s` }}
      >
        <div className={`group relative aspect-square ${circW}`}>
          <div className="absolute inset-0 overflow-hidden rounded-full shadow-lg ring-2 ring-white/10 transition duration-300 group-hover:ring-brand-yellow group-hover:shadow-[0_0_0_7px_rgba(255,197,1,0.14)]">
            <img
              src={m.photo}
              alt={m.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
      <div className={`text-outlined mt-3 font-display font-extrabold leading-tight ${nameCls}`}>{m.name}</div>
      <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-yellow sm:text-[11px]">{m.role}</div>
    </div>
  )
}

function TeamHive() {
  const lang = useLang()
  const t = COPY[lang].team
  return (
    <section className="section-y border-t border-white/5 bg-brand-black">
      <style>{`
        @keyframes hiveFloat { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @media (prefers-reduced-motion: reduce) { .hive-float { animation: none !important } }
      `}</style>
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="text-outlined mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t.headingPre}
            <span className="text-brand-yellow">{t.headingHl}</span>
          </h2>
          <p className="text-outlined-sm mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">{t.body}</p>
        </div>

        <div className="mt-14 flex flex-col items-center gap-y-10 sm:gap-y-12">
          {TEAM_ROWS.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-x-4 sm:gap-x-9 lg:gap-x-14">
              {row.map((idx) => (
                <HiveBubble key={TEAM[idx].id} m={TEAM[idx]} i={idx} big={ri === 0} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CHECKLIST IDONEITÀ                                                   */
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

/* ------------------------------------------------------------------ */
/* CTA FINALE                                                           */
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
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: 'rgba(0,0,0,0.4)',
        }}
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
