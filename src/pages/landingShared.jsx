/* Hallmark · macrostructure: Workbench · tone: playful-bold · anchor hue: brand-yellow #FFC501
 * theme: Twobee brand (honeycomb dark · League Spartan display · Inter body) — preserved, not catalog
 *
 * MODULO CONDIVISO DELLE LANDING GEMELLE (A/B test)
 * -------------------------------------------------
 * /flappybee (gioco) e /calcolatore (calcolatore ROI) condividono SOLO le due
 * sezioni che DEVONO essere identiche per l'A/B test: **Team** (TeamHive) e
 * **Calendario/Cal** (BookCall). Tutto il resto del "sotto" (Cosa ricevi, È per
 * te?, CTA finale) resta page-local con copy coerente al proprio meccanismo:
 * la /flappybee tiene il copy a tema-gioco, la /calcolatore quello a tema-report.
 *
 * Qui vivono anche le utility comuni (tracking, costanti Cal, SocialProof) per
 * non duplicarle. Confine di responsabilità: qui si EMETTONO gli eventi sul
 * dataLayer; la mappatura GTM → GA4 / Meta e la destinazione dei lead → Gabriele.
 */
import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

/* ------------------------------------------------------------------ */
/* dataLayer — la landing emette, Gabriele mappa in GTM                 */
/* ------------------------------------------------------------------ */
export function track(event, params) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

/* Eventi A/B comuni (campo `variant`: 'flappy' | 'calcolatore').
 * Confrontano le due landing a parità di funnel:
 *   - landing_view      → vista pagina (mount)
 *   - landing_book_view → l'utente RAGGIUNGE il calendario (sezione in viewport)
 *   - landing_book_cta  → click su una CTA esplicita di prenotazione
 * La prenotazione vera avviene nell'iframe Cal (cross-origin, non osservabile):
 * `landing_book_view` è il proxy di conversione più confrontabile lato client. */

/* ------------------------------------------------------------------ */
/* Cal.eu (istanza UE, GDPR) — prenotazione call embeddata.             */
/* CAL_LINK vuoto ('') = mostra un placeholder finché non c'è il link.   */
/* ------------------------------------------------------------------ */
export const CAL_LINK = 'two-bee-info-5vs3gb/30min'
export const CAL_ORIGIN = 'https://cal.eu'
// embed.js servito dall'app della stessa istanza (app.cal.eu → resta in UE)
export const CAL_EMBED_JS = CAL_ORIGIN.replace('https://', 'https://app.') + '/embed/embed.js'

/* Copy delle SOLE sezioni condivise (Cal + Team): identico tra le due landing. */
const SHARED_COPY = {
  it: {
    book: {
      eyebrow: 'Prenota ora',
      heading: 'Scegli tu quando ne parliamo.',
      body: '30 minuti, gratis e senza impegno: guardiamo insieme i tuoi numeri e ti diciamo, dati alla mano, se e come possiamo farti crescere.',
      bullets: ['30 minuti', 'Gratis e senza impegno', 'Con chi lavora davvero al tuo progetto'],
      placeholder: 'Qui va il calendario Cal per prenotare la call.',
    },
    team: {
      eyebrow: 'Il team',
      headingPre: 'Dietro Two Bee non c’è un freelance. C’è ',
      headingHl: 'una squadra.',
      body: 'Molti “esperti di marketing” sono una persona sola dietro un PC. Noi siamo un team di specialisti — strategia, ads, dati, contenuti, automazioni, AI — ognuno con il suo mestiere. Ecco le facce.',
    },
  },
  en: {
    book: {
      eyebrow: 'Book now',
      heading: 'You pick when we talk.',
      body: '30 minutes, free and no strings: we look at your numbers together and tell you, data in hand, if and how we can help you grow.',
      bullets: ['30 minutes', 'Free, no commitment', 'With the people actually on your project'],
      placeholder: 'The Cal booking calendar goes here.',
    },
    team: {
      eyebrow: 'The team',
      headingPre: 'Behind Two Bee there’s no freelancer. There’s ',
      headingHl: 'a team.',
      body: 'Many “marketing experts” are one person behind a laptop. We’re a team of specialists — strategy, ads, data, content, automation, AI — each with their craft. Here are the faces.',
    },
  },
}

/* helper: scrolla al calendario on-page (#prenota) */
export function scrollToBooking() {
  const el = document.getElementById('prenota')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ------------------------------------------------------------------ */
/* SOCIAL PROOF — striscia loghi partner (rendering identico, la label   */
/* la passa ogni pagina dal proprio hero).                               */
/* ------------------------------------------------------------------ */
export const PARTNER_LOGOS = [
  '/partner-sartoriacondotti.webp',
  '/partner-icuraimpresa.webp',
  '/partner-affinity.webp',
  '/partner-elettragroup.webp',
  '/partner-seven.webp',
]
export function SocialProof({ label, className = '' }) {
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
/* CONDIVISA e identica tra le due landing. Emette landing_book_view     */
/* (con variant) quando la sezione entra in viewport.                    */
/* ------------------------------------------------------------------ */
export function BookCall({ variant }) {
  const lang = useLang()
  const t = SHARED_COPY[lang].book
  const started = useRef(false)
  const seen = useRef(false)
  const sectionRef = useRef(null)

  // loader Cal.eu (una sola volta)
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

  // conversione confrontabile: "ha raggiunto il calendario"
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !seen.current) {
          seen.current = true
          track('landing_book_view', { variant })
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [variant])

  return (
    <section
      ref={sectionRef}
      id="prenota"
      data-bg-light
      className="relative z-10 scroll-mt-24 rounded-t-[2.5rem] bg-white shadow-[0_-30px_60px_-25px_rgba(0,0,0,0.55)] sm:rounded-t-[3rem]"
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
/* TEAM — favo di bolle stile menu Apple Watch (foto B/N + nomi).       */
/* CONDIVISA e identica tra le due landing.                              */
/* Riusa le webp B/N già ottimizzate del sito (/team-<id>-bw.webp).     */
/* Facce sempre visibili (trust-critical su landing ads): niente reveal  */
/* JS, solo float idle CSS + magnify all'hover.                          */
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

// `big` = riga fondatori (foto e nome più grandi).
function HiveBubble({ m, i, big = false }) {
  const cellW = big ? 'w-[clamp(124px,31vw,178px)]' : 'w-[clamp(104px,25vw,146px)]'
  const circW = big ? 'w-[clamp(112px,28vw,152px)]' : 'w-[clamp(92px,23vw,128px)]'
  const nameCls = big ? 'text-[15px] sm:text-lg' : 'text-[13px] sm:text-base'
  return (
    <div className={`flex ${cellW} flex-col items-center text-center`}>
      <div className="hive-float" style={{ animation: 'hiveFloat 4.5s ease-in-out infinite', animationDelay: `${(i % 4) * 0.4}s` }}>
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

export function TeamHive() {
  const lang = useLang()
  const t = SHARED_COPY[lang].team
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
