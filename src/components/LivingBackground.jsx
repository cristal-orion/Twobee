import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Honeycomb from './Honeycomb.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function LivingBackground({ forceDark = false }) {
  const root = useRef(null)
  const hexWrap = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (forceDark) {
        gsap.set(document.documentElement, { '--theme-t': 0 })
      } else {
        gsap.fromTo(
          document.documentElement,
          { '--theme-t': 0 },
          {
            '--theme-t': 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: '#sistema',
              start: 'bottom bottom',
              end: '+=100%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        )
      }

      if (!reduce) {
        gsap.to(hexWrap.current, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: '#smooth-content',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })
      }
    },
    { scope: root, dependencies: [forceDark], revertOnUpdate: true }
  )

  const fadeTop = {
    background:
      'linear-gradient(to bottom, color-mix(in srgb, var(--theme-bg), transparent 40%), transparent)',
  }
  const fadeBottom = {
    background:
      'linear-gradient(to top, color-mix(in srgb, var(--theme-bg), transparent 30%), transparent)',
  }
  const glowStyle = {
    background:
      'radial-gradient(circle at 72% 22%, color-mix(in srgb, #FFC501 18%, transparent), transparent 55%), radial-gradient(circle at 25% 78%, color-mix(in srgb, #FFC501 14%, transparent), transparent 60%)',
  }

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--theme-bg)' }}
      />
      <div
        ref={hexWrap}
        className="absolute -inset-x-[8%] -inset-y-[10%]"
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
        className="absolute inset-0"
        style={{
          backgroundColor:
            'color-mix(in srgb, var(--theme-bg), transparent 55%)',
        }}
      />
      <div className="absolute inset-0" style={glowStyle} />
      <div className="absolute inset-x-0 top-0 h-24" style={fadeTop} />
      <div className="absolute inset-x-0 bottom-0 h-32" style={fadeBottom} />
    </div>
  )
}
