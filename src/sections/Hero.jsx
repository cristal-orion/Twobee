import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLang } from '../i18n/LanguageContext.jsx'

gsap.registerPlugin(useGSAP)

const COPY = {
  it: {
    line1: 'Gli altri ti vendono',
    line2: 'follower.',
    line3a: 'Noi guidiamo la tua ',
    line3b: 'crescita.',
    body: 'Società di consulenza strategica, in ambito Growth & AI per PMI italiane. Un sistema di acquisizione clienti misurabile, con impatto diretto sui ricavi.',
    cta: 'Prenota un audit gratuito',
  },
  en: {
    line1: 'Others sell you',
    line2: 'followers.',
    line3a: 'We drive your ',
    line3b: 'growth.',
    body: 'A strategic consulting firm in Growth & AI for Italian SMEs. A measurable customer-acquisition system, with a direct impact on revenue.',
    cta: 'Book a free audit',
  },
}

export default function Hero() {
  const lang = useLang()
  const t = COPY[lang]
  const root = useRef(null)

  useGSAP(
    () => {
      const chars = gsap.utils.toArray('.hero-char', root.current)
      const fader = gsap.utils.toArray('.hero-fade', root.current)

      // will-change only for the duration of the entrance, then cleared so the
      // ~50 letters don't keep ~50 permanent GPU layers alive during scroll.
      gsap.set(chars, { yPercent: 110, opacity: 0, willChange: 'transform' })
      gsap.set(fader, { y: 24, opacity: 0 })

      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.018,
        onComplete: () => gsap.set(chars, { clearProps: 'willChange' }),
      })

      tl.to(
        fader,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        },
        '-=0.5'
      )
    },
    { scope: root }
  )

  const splitChars = (text) => {
    const segments = text.split(/(\s+)/)
    return segments.map((seg, si) => {
      if (seg === '') return null
      if (/^\s+$/.test(seg)) {
        return <span key={si}>{seg}</span>
      }
      return (
        <span
          key={si}
          className="inline-block whitespace-nowrap align-top"
        >
          {Array.from(seg).map((c, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-top"
            >
              <span className="hero-char inline-block">
                {c}
              </span>
            </span>
          ))}
        </span>
      )
    })
  }

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/70 via-black/35 to-transparent md:w-3/4" />

      <div className="container-x relative w-full pt-32 pb-20 sm:pt-36">
        <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
          <span className="block">{splitChars(t.line1)}</span>
          <span className="block">{splitChars(t.line2)}</span>
          <span className="mt-2 block">
            {splitChars(t.line3a)}
            <span className="text-brand-yellow">{splitChars(t.line3b)}</span>
          </span>
        </h1>

        <p className="hero-fade mt-8 max-w-xl text-base text-white/70 sm:text-lg">
          {t.body}
        </p>

        <div className="hero-fade mt-10">
          <a
            href="#contatti"
            className="group relative inline-flex items-center gap-3 rounded-full bg-brand-yellow px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-black transition-transform hover:scale-[1.02] sm:text-base"
          >
            {t.cta}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
