import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Honeycomb from './Honeycomb.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ZONES = {
  hero: {
    base: '#0B0B0C',
    gx: '78%',
    gy: '18%',
    gc: 'rgba(255,197,1,0.18)',
    gs: '55%',
    hexStroke: 'rgba(255,197,1,0.32)',
    hexAccent: '#FFC501',
    hexOpacity: 1,
    glowOpacity: 1,
  },
  clients: {
    base: '#0D0D0E',
    gx: '30%',
    gy: '45%',
    gc: 'rgba(255,197,1,0.10)',
    gs: '50%',
    hexStroke: 'rgba(255,197,1,0.30)',
    hexAccent: '#FFC501',
    hexOpacity: 0.85,
    glowOpacity: 0.9,
  },
  services: {
    base: '#141210',
    gx: '68%',
    gy: '55%',
    gc: 'rgba(255,197,1,0.16)',
    gs: '65%',
    hexStroke: 'rgba(255,197,1,0.36)',
    hexAccent: '#FFC501',
    hexOpacity: 1,
    glowOpacity: 1,
  },
  light: {
    base: '#F2ECDA',
    gx: '50%',
    gy: '50%',
    gc: 'rgba(255,197,1,0.35)',
    gs: '85%',
    hexStroke: 'rgba(0,0,0,0.55)',
    hexAccent: '#0B0B0C',
    hexOpacity: 1,
    glowOpacity: 1,
  },
  results: {
    base: '#141210',
    gx: '25%',
    gy: '70%',
    gc: 'rgba(255,197,1,0.14)',
    gs: '60%',
    hexStroke: 'rgba(255,197,1,0.32)',
    hexAccent: '#FFC501',
    hexOpacity: 0.9,
    glowOpacity: 0.95,
  },
  finale: {
    base: '#100F0D',
    gx: '50%',
    gy: '82%',
    gc: 'rgba(255,197,1,0.26)',
    gs: '80%',
    hexStroke: 'rgba(255,197,1,0.40)',
    hexAccent: '#FFC501',
    hexOpacity: 1.05,
    glowOpacity: 1,
  },
}

export default function LivingBackground() {
  const root = useRef(null)
  const base = useRef(null)
  const glow = useRef(null)
  const hexWrap = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const applyInstant = (z) => {
        const zone = ZONES[z]
        gsap.set(base.current, { backgroundColor: zone.base })
        gsap.set(glow.current, {
          '--gx': zone.gx,
          '--gy': zone.gy,
          '--gc': zone.gc,
          '--gs': zone.gs,
          opacity: zone.glowOpacity,
        })
        gsap.set(hexWrap.current, {
          '--hex-stroke': zone.hexStroke,
          '--hex-accent': zone.hexAccent,
          opacity: zone.hexOpacity,
        })
      }

      applyInstant('hero')

      const scrubTo = (el, zone) => {
        const z = ZONES[zone]

        gsap.to(base.current, {
          backgroundColor: z.base,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 1,
          },
          overwrite: 'auto',
        })

        gsap.to(glow.current, {
          '--gx': z.gx,
          '--gy': z.gy,
          '--gc': z.gc,
          '--gs': z.gs,
          opacity: z.glowOpacity,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 1,
          },
          overwrite: 'auto',
        })

        gsap.to(hexWrap.current, {
          '--hex-stroke': z.hexStroke,
          '--hex-accent': z.hexAccent,
          opacity: z.hexOpacity,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 1,
          },
          overwrite: 'auto',
        })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          end: 'top 15%',
          onToggle: (self) => {
            if (zone === 'light') {
              document.documentElement.classList.toggle(
                'theme-light',
                self.isActive
              )
            }
          },
        })
      }

      const sections = gsap.utils.toArray('[data-bg-zone]')
      sections.forEach((el) => {
        const zone = el.getAttribute('data-bg-zone')
        if (zone !== 'hero') scrubTo(el, zone)
      })

      if (!reduce) {
        gsap.to(hexWrap.current, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })
      }
    },
    { scope: root }
  )

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        ref={base}
        className="absolute inset-0"
        style={{ backgroundColor: '#0B0B0C' }}
      />
      <div
        ref={hexWrap}
        className="absolute -inset-x-[8%] -inset-y-[10%]"
        style={{
          '--hex-stroke': 'rgba(255,197,1,0.32)',
          '--hex-accent': '#FFC501',
        }}
      >
        <Honeycomb
          className="h-full w-full"
          anchor="right"
          cols={20}
          rows={13}
          size={44}
          accentDensity={0.06}
        />
      </div>
      <div
        ref={glow}
        className="absolute inset-0"
        style={{
          '--gx': '78%',
          '--gy': '18%',
          '--gc': 'rgba(255,197,1,0.18)',
          '--gs': '55%',
          background:
            'radial-gradient(circle at var(--gx) var(--gy), var(--gc), transparent var(--gs))',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  )
}
