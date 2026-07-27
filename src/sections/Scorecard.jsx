/* Vetrina di /test-crescita sulla home.
 *
 * Gemella di Game.jsx (che fa lo stesso per /flappybee), ma piazzata PRIMA dei
 * piani anziché dopo: il test è un qualificatore, serve ad arrivare ai prezzi
 * sapendo già di cosa si ha bisogno. Tenerla lontana dalla sezione gioco è
 * voluto — due sezioni-esca di fila si annullano a vicenda.
 *
 * Il quiz vero NON è embeddato: il suo stato (8 domande, gate, invio EmailJS)
 * vive nella landing e in mezzo alla home sarebbe un secondo funnel che compete
 * con il form contatti. Qui c'è un mock della stessa UI, tutto DOM e SVG, che
 * fa da anteprima cliccabile.
 *
 * Il punteggio 62 nella chip risultato è etichettato "esempio" apposta: la
 * landing si regge sul non aver inventato nessun numero, e un punteggio finto
 * senza etichetta contraddirebbe proprio quella promessa.
 */
import { useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useInView } from 'framer-motion'
import { localePath, useLang } from '../i18n/LanguageContext.jsx'

const TOTAL_STEPS = 8
const DEMO_SCORE = 62
const STEP_MS = 3400

// anello del punteggio: raggio e circonferenza servono a stroke-dasharray
const RING_R = 30
const RING_C = 2 * Math.PI * RING_R

const COPY = {
  it: {
    eyebrow: '📋 Test di crescita · 8 domande',
    headingPre: 'Prima di guardare i piani: ',
    headingHl: 'quanto è prevedibile la tua crescita?',
    body: 'Otto domande, novanta secondi. Non chiediamo fatturato, margini né spesa pubblicitaria: rispondi sì, in parte o no e ti diciamo dove perde colpi il tuo sistema di acquisizione — con le tre mosse da fare per prime.',
    bullets: ['90 secondi', 'Nessun numero da sapere', 'Risultato immediato'],
    cta: 'Fai il test',
    ctaNote: 'Alla fine ricevi la tua scorecard: punteggio, falle principali e prossime mosse.',
    ariaLabel: 'Fai il test di crescita',
    tag: 'Scorecard',
    of: 'di',
    answers: ['Sì', 'In parte', 'No'],
    sample: 'esempio',
    scoreLabel: 'Prevedibilità',
    zone: 'Crescita fragile',
    steps: [
      { n: 1, area: 'Tracciamento', q: 'Sai da dove è arrivato il tuo ultimo cliente?', pick: 2 },
      { n: 3, area: 'Canali', q: 'Se domani il passaparola si fermasse, hai un altro canale che porta richieste?', pick: 1 },
      { n: 4, area: 'Follow-up', q: 'Chi ti chiede un preventivo e non compra subito viene ricontattato?', pick: 1 },
    ],
  },
  en: {
    eyebrow: '📋 Growth test · 8 questions',
    headingPre: 'Before you look at the plans: ',
    headingHl: 'how predictable is your growth?',
    body: 'Eight questions, ninety seconds. We don’t ask for revenue, margins or ad spend: answer yes, partly or no and we’ll tell you where your acquisition system leaks — and the three moves to make first.',
    bullets: ['90 seconds', 'No figures needed', 'Instant result'],
    cta: 'Take the test',
    ctaNote: 'At the end you get your scorecard: score, main gaps and next moves.',
    ariaLabel: 'Take the growth test',
    tag: 'Scorecard',
    of: 'of',
    answers: ['Yes', 'Partly', 'No'],
    sample: 'sample',
    scoreLabel: 'Predictability',
    zone: 'Fragile growth',
    steps: [
      { n: 1, area: 'Tracking', q: 'Do you know where your last customer came from?', pick: 2 },
      { n: 3, area: 'Channels', q: 'If word of mouth stopped tomorrow, is there another channel bringing you enquiries?', pick: 1 },
      { n: 4, area: 'Follow-up', q: 'Do people who ask for a quote and don’t buy get contacted again?', pick: 1 },
    ],
  },
}

function track(event, params) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Anello + numero. Il numero è scritto direttamente nel DOM invece che via
// state: contare fino a 62 con setState farebbe ~60 render per un'etichetta.
function ScoreRing({ t, running }) {
  const num = useRef(null)

  useEffect(() => {
    const el = num.current
    if (!el) return
    if (!running || prefersReducedMotion()) {
      el.textContent = String(DEMO_SCORE)
      return
    }
    const controls = animate(0, DEMO_SCORE, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => {
        el.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [running])

  const offset = running ? RING_C * (1 - DEMO_SCORE / 100) : RING_C

  return (
    <div className="relative h-[76px] w-[76px] shrink-0">
      <svg viewBox="0 0 76 76" className="h-full w-full -rotate-90">
        <circle cx="38" cy="38" r={RING_R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
        <circle
          cx="38"
          cy="38"
          r={RING_R}
          fill="none"
          stroke="#FFC501"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={RING_C}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-extrabold text-white">
        <span ref={num}>0</span>
      </span>
    </div>
  )
}

// Mock della schermata "una domanda alla volta" della landing.
function QuizPreview({ t, running }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!running || prefersReducedMotion()) return
    const id = setInterval(() => setI((v) => (v + 1) % t.steps.length), STEP_MS)
    return () => clearInterval(id)
  }, [running, t.steps.length])

  const step = t.steps[i]

  // pb più generoso del resto: sotto la riga delle risposte ci si infila la
  // chip del risultato, che altrimenti coprirebbe il terzo pulsante.
  return (
    <div aria-hidden className="flex h-full flex-col gap-6 px-6 pb-11 pt-6 sm:px-8 sm:pb-12 sm:pt-8">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-brand-yellow/25 bg-brand-yellow/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow">
            {t.tag}
          </span>
          <span className="text-[11px] font-semibold text-white/50">
            <span className="font-display text-sm font-extrabold text-white">{step.n}</span> {t.of} {TOTAL_STEPS}
          </span>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-brand-yellow"
            style={{
              width: `${(step.n / TOTAL_STEPS) * 100}%`,
              transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </div>
      </div>

      {/* Domanda e risposte cambiano insieme, dentro la stessa transizione: se
          le risposte stessero fuori si illuminerebbe la scelta della domanda
          successiva mentre a schermo c'è ancora quella precedente. I blocchi
          sono in absolute così il crossfade non fa collassare la card. */}
      <div className="relative flex-1">
        <AnimatePresence initial={false}>
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col justify-between gap-6"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                {step.area}
              </span>
              <p className="mt-2 font-display text-lg font-extrabold leading-snug text-white sm:text-xl">
                {step.q}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {t.answers.map((a, ai) => (
                <span
                  key={a}
                  className={[
                    'rounded-xl border px-2 py-3 text-center text-xs font-bold sm:text-sm',
                    ai === step.pick
                      ? 'border-brand-yellow bg-brand-yellow text-brand-black'
                      : 'border-white/10 bg-white/[0.04] text-white/60',
                  ].join(' ')}
                >
                  {a}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Scorecard() {
  const lang = useLang()
  const t = COPY[lang]
  const card = useRef(null)
  // Come per l'anteprima del gioco: il loop parte solo quando la card è a
  // schermo, non per tutta la visita.
  const inView = useInView(card, { margin: '80px' })
  const href = localePath('/test-crescita', lang)

  return (
    <section id="test" className="section-y bg-brand-black">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
          >
            {t.headingPre}
            <span className="text-brand-yellow">{t.headingHl}</span>
          </motion.h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{t.body}</p>
          <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.2em] text-white/55 sm:text-sm">
            {t.bullets.map((b) => (
              <li key={b} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                {b}
              </li>
            ))}
          </ul>
          <a
            href={href}
            onClick={() => track('test_promo_click', { location: 'home', cta: 'button' })}
            className="btn-primary mt-9"
          >
            {t.cta}
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
          <p className="mt-4 max-w-sm text-xs text-white/45">{t.ctaNote}</p>
        </div>

        <div ref={card} className="relative">
          <a
            href={href}
            onClick={() => track('test_promo_click', { location: 'home', cta: 'preview' })}
            aria-label={t.ariaLabel}
            className="group relative block h-[clamp(320px,42vh,392px)] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] transition-colors hover:border-brand-yellow/30"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand-yellow/10 blur-3xl"
            />
            <QuizPreview t={t} running={inView} />
          </a>

          {/* Chip risultato: mostra dove si arriva rispondendo. In flusso con
              un margine negativo invece che in absolute — così si incastra nel
              padding basso della card senza mai finire sopra le risposte. */}
          <div
            aria-hidden
            className="relative z-10 -mt-8 ml-auto mr-3 flex w-fit items-center gap-4 rounded-2xl border border-white/10 bg-brand-dark/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:mr-6"
          >
            <ScoreRing t={t} running={inView} />
            <div className="pr-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
                {t.sample}
              </span>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                {t.scoreLabel}
              </p>
              <p className="font-display text-sm font-extrabold text-brand-yellow">{t.zone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
