/* Vetrina di /flappybee sulla home.
 *
 * La landing del gioco esisteva solo via URL diretto (traffico paid): questa
 * sezione le dà un ingresso organico dalla home e un link interno crawlabile.
 * Il gioco vero NON è embeddato qui: FlappyGame mette un listener su window per
 * Spazio/↑ e in mezzo alla home ruberebbe lo scroll da tastiera. Quello che si
 * vede è un mock dello stesso frame (tubi + apina + HUD), tutto CSS/SVG, che fa
 * da anteprima cliccabile: costa zero JS e non carica il canvas del gioco.
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { localePath, useLang } from '../i18n/LanguageContext.jsx'

const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const COPY = {
  it: {
    eyebrow: '🐝 Flappy Twobee · il gioco',
    headingPre: 'Cinque ostacoli frenano la tua crescita. ',
    headingHl: 'Provi a schivarli?',
    body: 'Un dito, un’apina e i cinque pain point che bloccano quasi ogni PMI italiana: passaparola, budget, fai-da-te, sfiducia verso le agenzie, zero differenziazione. Quando ne colpisci uno ti mostriamo come lo risolviamo davvero.',
    bullets: ['30 secondi', 'Niente da compilare', 'C’è la classifica'],
    cta: 'Gioca ora',
    ctaNote: 'Si gioca anche dal telefono, con un dito. Il tuo record può entrare in classifica.',
    playLabel: 'Gioca ora',
    ariaLabel: 'Gioca a Flappy Twobee',
    hudTag: 'Flappy Twobee',
    hudScore: 'Schivati',
    pipes: ['Passaparola', 'Budget', 'Fai-da-te', 'Sfiducia'],
  },
  en: {
    eyebrow: '🐝 Flappy Twobee · the game',
    headingPre: 'Five obstacles are holding your growth back. ',
    headingHl: 'Think you can dodge them?',
    body: 'One finger, one bee and the five pain points that block almost every Italian SME: word of mouth, budget, DIY, distrust of agencies, zero differentiation. Hit one and we show you how we actually fix it.',
    bullets: ['30 seconds', 'Nothing to fill in', 'There’s a leaderboard'],
    cta: 'Play now',
    ctaNote: 'Works on your phone too, with one finger. Your best score can join the leaderboard.',
    playLabel: 'Play now',
    ariaLabel: 'Play Flappy Twobee',
    hudTag: 'Flappy Twobee',
    hudScore: 'Dodged',
    pipes: ['Word of mouth', 'Budget', 'DIY', 'Distrust'],
  },
}

// x = posizione orizzontale in % della cornice, gap = centro dell'apertura in %
// dell'altezza. Stessi valori nelle due metà del track, così il loop è continuo.
const PIPES = [
  { x: 4, gap: 44 },
  { x: 30, gap: 62 },
  { x: 56, gap: 34 },
  { x: 80, gap: 55 },
]

const GAP_H = 30 // apertura verticale, in % dell'altezza
const GROUND_H = 6 // terreno, in % dell'altezza

function track(event, params) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

function Pipe({ x, gap, label }) {
  const topH = Math.max(0, gap - GAP_H / 2)
  const botH = Math.max(0, 100 - GROUND_H - (gap + GAP_H / 2))
  // l'etichetta va nel tratto più lungo, come fa drawLabel() nel gioco
  // l'etichetta sta sotto la riga dell'HUD, così non ci finisce mai sopra
  const labelPos = topH >= botH ? { top: '17%' } : { bottom: `${GROUND_H + 6}%` }
  return (
    <div className="absolute inset-y-0" style={{ left: `${x}%`, width: '13%' }}>
      <div
        className="absolute inset-x-0 top-0 rounded-b-xl border border-white/10 bg-gradient-to-r from-[#26262e] to-[#131318]"
        style={{ height: `${topH}%` }}
      >
        <div className="absolute inset-x-[-8%] bottom-0 h-2.5 rounded-md bg-brand-yellow" />
      </div>
      <div
        className="absolute inset-x-0 rounded-t-xl border border-white/10 bg-gradient-to-r from-[#26262e] to-[#131318]"
        style={{ height: `${botH}%`, bottom: `${GROUND_H}%` }}
      >
        <div className="absolute inset-x-[-8%] top-0 h-2.5 rounded-md bg-brand-yellow" />
      </div>
      <span
        className="absolute left-1/2 w-[150%] -translate-x-1/2 rounded-lg bg-brand-yellow px-1.5 py-1 text-center text-[10px] font-bold leading-tight text-brand-black shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
        style={labelPos}
      >
        {label}
      </span>
    </div>
  )
}

// 🐝 la stessa apina del canvas, ridisegnata in SVG per l'anteprima statica
function Bee() {
  return (
    <svg viewBox="0 0 72 52" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <clipPath id="tb-bee-body">
          <ellipse cx="34" cy="30" rx="19" ry="14" />
        </clipPath>
      </defs>
      <g fill="rgba(255,255,255,0.72)" stroke="rgba(0,0,0,0.18)">
        <ellipse cx="27" cy="10" rx="7" ry="12" transform="rotate(-22 27 10)" />
        <ellipse cx="39" cy="11" rx="6.5" ry="11" transform="rotate(-4 39 11)" />
      </g>
      <path d="M15 30 L4 27 L4 33 Z" fill="#0B0B0C" />
      <ellipse cx="34" cy="30" rx="19" ry="14" fill="#FFC501" stroke="rgba(0,0,0,0.45)" strokeWidth="2" />
      <g clipPath="url(#tb-bee-body)" fill="#0B0B0C">
        <rect x="22" y="14" width="4.5" height="32" />
        <rect x="31" y="14" width="4.5" height="32" />
        <rect x="40" y="14" width="4.5" height="32" />
      </g>
      <circle cx="45" cy="28" r="2.6" fill="#0B0B0C" />
      <circle cx="45.8" cy="27" r="1" fill="rgba(255,255,255,0.9)" />
      <path d="M48 20 Q54 13 51 10" stroke="#0B0B0C" strokeWidth="1.8" fill="none" />
      <circle cx="50.6" cy="9.4" r="1.7" fill="#0B0B0C" />
    </svg>
  )
}

// Anteprima del frame di gioco: due metà identiche che scorrono in loop.
function GamePreview({ t, running }) {
  const half = (
    <div className="relative h-full w-1/2 shrink-0">
      {PIPES.map((p, i) => (
        <Pipe key={p.x} x={p.x} gap={p.gap} label={t.pipes[i % t.pipes.length]} />
      ))}
    </div>
  )
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* sfondo del canvas: alone giallo in alto, ombra in basso */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-yellow/[0.05] via-transparent to-black/25" />

      <div className={`absolute inset-0 flex w-[200%] ${running ? 'game-preview-track' : ''}`}>
        {half}
        {half}
      </div>

      {/* terreno */}
      <div
        className="absolute inset-x-0 bottom-0 border-t-2 border-brand-yellow bg-brand-yellow/10"
        style={{ height: `${GROUND_H}%` }}
      />

      {/* apina: x fissa come nel gioco, quota guidata da bee-fly (vedi index.css) */}
      <div
        className={`absolute left-[26%] top-[56%] h-12 w-16 drop-shadow-[0_0_18px_rgba(255,197,1,0.35)] sm:h-14 sm:w-20 ${
          running ? 'game-preview-bee' : ''
        }`}
      >
        <Bee />
      </div>

      {/* HUD, gemello di quello del gioco */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
        <span className="rounded-full border border-white/10 bg-brand-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-yellow">
          {t.hudTag}
        </span>
        <span className="rounded-full border border-white/10 bg-brand-black/50 px-3 py-1.5 text-[11px] font-semibold text-white/70">
          {t.hudScore}: <span className="font-display font-extrabold text-brand-yellow">07</span>
        </span>
      </div>
    </div>
  )
}

export default function Game() {
  const lang = useLang()
  const t = COPY[lang]
  const card = useRef(null)
  // L'anteprima anima solo quando è a schermo: è una sezione a metà pagina,
  // non ha senso far girare il loop dei tubi per tutta la visita.
  const inView = useInView(card, { margin: '80px' })
  const href = localePath('/flappybee', lang)

  return (
    <section id="gioco" className="section-y bg-brand-black">
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
            onClick={() => track('game_promo_click', { location: 'home', cta: 'button' })}
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

        <a
          ref={card}
          href={href}
          onClick={() => track('game_promo_click', { location: 'home', cta: 'preview' })}
          aria-label={t.ariaLabel}
          className="group relative block h-[clamp(300px,44vh,420px)] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand-yellow/10 blur-3xl"
          />
          <GamePreview t={t} running={inView} />

          {/* velo + tasto play: l'intera card è il link */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-black/25 transition-colors duration-300 group-hover:bg-brand-black/10">
            <span className="relative flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
              <span aria-hidden className="absolute inset-0 bg-brand-yellow" style={{ clipPath: HEX_CLIP }} />
              <svg viewBox="0 0 24 24" className="relative h-6 w-6 translate-x-[2px] sm:h-7 sm:w-7" fill="#0B0B0C">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            <span className="mt-5 rounded-full bg-brand-black/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:text-xs">
              {t.playLabel}
            </span>
          </div>
        </a>
      </div>
    </section>
  )
}
