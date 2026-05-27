/* Hallmark · macrostructure: Marquee/Poster Hero · tone: playful-bold · anchor hue: brand-yellow #FFC501
 * theme: Twobee brand (honeycomb dark · League Spartan display · Inter body) — preserved, not catalog
 * pre-emit critique: P4 H4 E4 S4 R4 V4
 * Note: phone mockup is intentional product content (videopalla demo), a deliberate exception to gate 57.
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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

// Numero WhatsApp Two Bee (formato wa.me, senza + e spazi)
const WA_NUMBER = '393668092605'
const WA_DISPLAY = '+39 366 809 2605'
const WA_TEXT =
  'Ciao Two Bee! 🐝 Vorrei candidarmi: tra poco vi mando il mio videopalla di presentazione e il CV.'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`

const EMAIL = 'info@twobee.it'
const EMAIL_LINK = `mailto:${EMAIL}?subject=${encodeURIComponent(
  'Candidatura — Lavora con noi'
)}`

export default function CareersPage() {
  const wrapper = useRef(null)
  const content = useRef(null)

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current,
      content: content.current,
      smooth: 1.4,
      smoothTouch: 0.1,
      effects: true,
    })

    ScrollTrigger.refresh()
    return () => smoother && smoother.kill()
  }, [])

  return (
    <div id="top" className="text-white">
      <HexBackground />
      <Navbar subpage />
      <div id="smooth-wrapper" ref={wrapper}>
        <div id="smooth-content" ref={content}>
          <main>
            <Hero />
            <VideopallaBand />
            <HowItWorks />
            <Cta />
          </main>
          <Footer />
        </div>
      </div>
      <CookieBanner />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* HERO — poster: testo a sinistra, iPhone a destra                    */
/* ------------------------------------------------------------------ */

function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const fader = gsap.utils.toArray('.cr-fade', root.current)
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
    <section
      ref={root}
      className="relative flex min-h-[92svh] items-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/75 via-black/35 to-transparent md:w-3/4" />

      <div className="container-x relative grid w-full items-center gap-12 pt-32 pb-16 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* colonna testo */}
        <div>
          <span className="cr-fade eyebrow text-outlined-sm">
            🐝 Lavora con noi
          </span>

          <h1 className="cr-fade text-outlined mt-5 font-display text-4xl font-extrabold leading-[0.92] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Lascia perdere
            <br />
            il CV noioso.{' '}
            <span className="text-brand-yellow">Candidati come nessuno.</span>
          </h1>

          <p className="cr-fade mt-7 max-w-md text-base text-white/75 sm:text-lg">
            Niente lettere motivazionali infinite. Registra un{' '}
            <span className="font-semibold text-white">videopalla</span>, allega
            il CV e premi invio. In 60 secondi capiamo chi sei davvero.
          </p>

          <div className="cr-fade mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <WaButton />
            <a href={EMAIL_LINK} className="btn-outline">
              Oppure scrivici via email
            </a>
          </div>

          <ul className="cr-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.2em] text-white/55 sm:text-sm">
            {['60 secondi bastano', 'Zero formalità', 'Rispondiamo a tutti'].map(
              (t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                  {t}
                </li>
              )
            )}
          </ul>
        </div>

        {/* colonna telefono */}
        <div className="cr-fade flex justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* BANDA GIGANTE — VIDEOPALLA full-bleed                               */
/* ------------------------------------------------------------------ */

function VideopallaBand() {
  const root = useRef(null)

  useGSAP(
    () => {
      const letters = gsap.utils.toArray('.vp-letter', root.current)
      gsap.set(letters, { yPercent: 120, opacity: 0 })

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 82%',
        once: true,
        onEnter: () =>
          gsap.to(letters, {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power4.out',
            stagger: 0.04,
          }),
      })
    },
    { scope: root }
  )

  const word = 'VIDEOPALLA'

  return (
    <section ref={root} className="relative overflow-hidden py-14 sm:py-20">
      <p className="container-x text-center text-sm font-bold uppercase tracking-[0.3em] text-brand-yellow sm:text-base">
        Il video tondo di WhatsApp. Sì, proprio quello.
      </p>

      <h2
        aria-label={word}
        className="text-outlined mt-3 flex justify-center whitespace-nowrap font-display font-extrabold leading-none tracking-tighter text-brand-yellow"
        style={{
          fontSize: 'clamp(3.25rem, 18.5vw, 18rem)',
          textShadow: '0 24px 60px rgba(0,0,0,0.55)',
        }}
      >
        {Array.from(word).map((c, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span className="vp-letter inline-block will-change-transform">
              {c}
            </span>
          </span>
        ))}
      </h2>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* COME FUNZIONA — thread di chat                                      */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    n: '1',
    title: 'Registra il videopalla',
    body: 'Apri la chat, tieni premuto il tasto del videomessaggio e raccontaci chi sei. 60 secondi, senza copione.',
  },
  {
    n: '2',
    title: 'Allega il tuo CV',
    body: 'PDF, portfolio, profilo LinkedIn: quello che ti rappresenta meglio. Niente moduli infiniti.',
  },
  {
    n: '3',
    title: 'Premi invia',
    body: `Mandaci tutto su WhatsApp al ${WA_DISPLAY}. Ti rispondiamo noi, in carne e ossa.`,
  },
]

function HowItWorks() {
  const root = useRef(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.cr-msg', root.current)
      gsap.set(items, { opacity: 0, y: 18, scale: 0.97 })
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 72%',
        once: true,
        onEnter: () =>
          gsap.to(items, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.22,
          }),
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="relative">
      <div className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-outlined-sm">Come funziona</span>
          <h2 className="text-outlined mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Tre mosse e sei dentro al processo.
          </h2>
        </div>

        {/* pannello chat (non è un device: è una lista stilizzata) */}
        <div className="mx-auto mt-10 max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-7">
          <div className="mb-5 flex justify-center">
            <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
              Oggi
            </span>
          </div>

          <div className="space-y-3.5">
            {STEPS.slice(0, 2).map((s) => (
              <div
                key={s.n}
                className="cr-msg flex max-w-[88%] gap-3 rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-yellow font-display text-sm font-extrabold text-brand-black">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold sm:text-lg">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}

            {/* step finale: bolla "inviata", brand giallo, allineata a destra */}
            <div className="cr-msg ml-auto flex max-w-[88%] flex-col items-end">
              <div className="flex gap-3 rounded-2xl rounded-tr-md bg-brand-yellow p-4 text-brand-black">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-black font-display text-sm font-extrabold text-brand-yellow">
                  {STEPS[2].n}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold sm:text-lg">
                    {STEPS[2].title}
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-brand-black/75">
                    {STEPS[2].body}
                  </p>
                </div>
              </div>
              <span className="mt-1.5 inline-flex items-center gap-1 pr-1 text-[11px] font-semibold text-white/45">
                Inviato
                <svg viewBox="0 0 18 12" className="h-3 w-4 text-[#53bdeb]" fill="none">
                  <path
                    d="M1 6.5 4.5 10 11 2.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.5 8 7.5 9 14 2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* PHONE MOCKUP + VIDEOPALLA                                           */
/* ------------------------------------------------------------------ */

function PhoneMockup() {
  const root = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      const bubbles = gsap.utils.toArray('.wa-bubble', root.current)
      const note = root.current.querySelector('.vp-note')
      const ticks = root.current.querySelector('.wa-ticks')
      const ring = root.current.querySelector('.vp-ring-progress')

      // stato iniziale
      gsap.set(bubbles, { opacity: 0, y: 12, scale: 0.96 })
      gsap.set(note, { opacity: 0, scale: 0.4, y: 24 })
      gsap.set(ticks, { color: '#8696a0' })

      if (reduce) {
        gsap.set([...bubbles, note], { opacity: 1, y: 0, scale: 1 })
        gsap.set(ticks, { color: '#53bdeb' })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
        defaults: { ease: 'power3.out' },
      })

      tl.to(bubbles, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.35,
      })
        .to(
          note,
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' },
          '+=0.15'
        )
        .to(ticks, { color: '#53bdeb', duration: 0.3 }, '+=0.4')

      // anello di riproduzione del videopalla, in loop continuo (firma del concept)
      const C = 2 * Math.PI * 47
      gsap.set(ring, { strokeDasharray: C, strokeDashoffset: C })
      gsap.to(ring, {
        strokeDashoffset: 0,
        duration: 5,
        ease: 'none',
        repeat: -1,
      })

      // leggero galleggiamento del telefono
      gsap.to('.phone-frame', {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className="relative">
      {/* alone giallo */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-yellow/15 blur-3xl"
      />

      <div className="phone-frame relative w-[280px] rounded-[3rem] border border-white/15 bg-[#05070a] p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:w-[310px]">
        <div className="relative overflow-hidden rounded-[2.3rem] bg-[#0b141a]">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* status bar */}
          <div className="flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold text-white/90">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <Signal />
              <Battery />
            </span>
          </div>

          {/* header whatsapp */}
          <div className="mt-2 flex items-center gap-3 bg-[#1f2c34] px-4 py-3">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#aebac1]" fill="none">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-base">
              🐝
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">Two Bee</div>
              <div className="text-[11px] text-[#00a884]">online</div>
            </div>
            <div className="ml-auto flex items-center gap-4 text-[#aebac1]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.5-.6a1 1 0 0 0-1 .2l-2.2 2.2a15 15 0 0 1-6.6-6.6l2.2-2.2a1 1 0 0 0 .2-1C8.7 6.4 8.5 5.2 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" />
              </svg>
            </div>
          </div>

          {/* chat */}
          <div
            className="flex min-h-[320px] flex-col gap-2.5 px-4 py-5"
            style={{
              backgroundColor: '#0b141a',
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          >
            <Bubble>Ehi! Pronto a entrare nel team? 🐝</Bubble>
            <Bubble>
              Mandaci un <b>videopalla</b> + il tuo CV 🎥
            </Bubble>

            {/* videopalla — nota video circolare */}
            <div className="vp-note mt-2 flex flex-col items-end self-end">
              <VideoBall />
              <div className="mt-1 flex items-center gap-1 pr-1 text-[10px] text-[#8696a0]">
                <span>0:47</span>
                <span>9:41</span>
                <svg viewBox="0 0 18 12" className="wa-ticks h-3 w-4" fill="none">
                  <path
                    d="M1 6.5 4.5 10 11 2.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.5 8 7.5 9 14 2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* input bar */}
          <div className="flex items-center gap-2 bg-[#0b141a] px-3 pb-4 pt-1">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-[#1f2c34] px-4 py-2.5 text-[13px] text-[#8696a0]">
              <span>Messaggio</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00a884]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Bubble({ children }) {
  return (
    <div className="wa-bubble max-w-[78%] self-start rounded-2xl rounded-tl-md bg-[#1f2c34] px-3.5 py-2 text-[13px] leading-snug text-white/90 shadow-sm">
      {children}
      <span className="ml-2 align-bottom text-[10px] text-[#8696a0]">9:41</span>
    </div>
  )
}

function VideoBall() {
  const [videoOk, setVideoOk] = useState(true)

  return (
    <div className="relative h-[150px] w-[150px]">
      {/* anello di progresso riproduzione */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2.5"
        />
        <circle
          className="vp-ring-progress"
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="#00a884"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* cerchio video */}
      <div className="absolute inset-[7px] overflow-hidden rounded-full">
        <VideoPlaceholder hidden={videoOk} />
        {videoOk && (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoOk(false)}
          >
            {/* Sostituisci con il videopalla reale: metti il file in public/videopalla.mp4 */}
            <source src="/videopalla.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  )
}

// Placeholder finché non viene caricato public/videopalla.mp4
function VideoPlaceholder({ hidden }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center ${
        hidden ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background:
          'radial-gradient(circle at 50% 35%, #3a3320 0%, #16181c 70%)',
      }}
    >
      {/* sagoma volto */}
      <svg viewBox="0 0 24 24" className="h-14 w-14 text-white/25" fill="currentColor">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z" />
      </svg>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
        il tuo videopalla
      </span>
      {/* pallino REC */}
      <span className="absolute left-3 top-3 flex items-center gap-1 text-[9px] font-bold text-red-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
        REC
      </span>
    </div>
  )
}

function Signal() {
  return (
    <svg viewBox="0 0 18 12" className="h-3 w-4" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5" width="3" height="7" rx="1" />
      <rect x="10" y="2" width="3" height="10" rx="1" opacity="0.5" />
    </svg>
  )
}

function Battery() {
  return (
    <svg viewBox="0 0 26 12" className="h-3 w-6" fill="none">
      <rect
        x="1"
        y="1"
        width="22"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <rect x="2.5" y="2.5" width="15" height="7" rx="1.2" fill="currentColor" />
      <rect x="24" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* CTA FINALE (giallo)                                                 */
/* ------------------------------------------------------------------ */

function Cta() {
  return (
    <section className="relative">
      <div className="relative overflow-hidden bg-brand-yellow text-brand-black">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 opacity-20 sm:h-96 sm:w-96"
          style={{
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'rgba(0,0,0,0.4)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 opacity-15 sm:h-[28rem] sm:w-[28rem]"
          style={{
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'rgba(0,0,0,0.4)',
          }}
        />

        <div className="container-x relative py-20 text-center md:py-28">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-black/70 sm:text-sm">
            Tocca a te
          </span>
          <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            Premi registra.
            <br />
            Facci sorridere.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-snug sm:text-lg md:text-xl">
            Il talento non si misura in righe di CV. Mandaci il tuo videopalla
            su WhatsApp: lo guardiamo davvero, uno per uno.
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-black px-10 py-5 text-base font-bold uppercase tracking-wider text-white shadow-[0_18px_60px_-12px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.03] sm:text-lg md:px-12 md:py-6"
            >
              <WhatsappGlyph />
              Inviaci il videopalla
            </a>
            <a
              href={EMAIL_LINK}
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-black/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-black transition hover:bg-brand-black hover:text-white sm:text-base"
            >
              {EMAIL}
            </a>
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-brand-black/60 sm:text-sm">
            WhatsApp {WA_DISPLAY} · Rispondiamo a tutti
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* SHARED                                                              */
/* ------------------------------------------------------------------ */

function WaButton() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-full bg-[#25d366] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#062a16] shadow-[0_14px_40px_-12px_rgba(37,211,102,0.7)] transition-transform hover:scale-[1.03] sm:text-base"
    >
      <WhatsappGlyph />
      Inviaci il videopalla
    </a>
  )
}

function WhatsappGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.05 8.05 0 0 1 2.37 5.74c0 4.48-3.65 8.12-8.13 8.12a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.81.82-3-.19-.31a8.06 8.06 0 0 1-1.24-4.31c0-4.48 3.65-8.12 8.15-8.12zm-2.86 4.4c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.62 0 1.55 1.13 3.04 1.29 3.25.16.21 2.21 3.38 5.44 4.61.76.29 1.35.46 1.81.59.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37-.31-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.31-.81 1.03-1 1.24-.18.21-.37.24-.68.08-.31-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.19-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.72-.97-2.35-.26-.62-.52-.54-.71-.55h-.61z" />
    </svg>
  )
}
