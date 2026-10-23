import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { useLang } from '../i18n/LanguageContext.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const COPY = {
  it: {
    eyebrow: 'IL NOSTRO SISTEMA',
    headingPre: 'Da strategia a risultati:',
    headingHighlight: 'metriche, tecnologia e contenuti che lavorano insieme.',
    cta: 'Prenota un Audit Gratuito',
    services: [
      {
        n: '01',
        title: 'Growth Economics',
        body: 'Analizziamo costi di acquisizione, ricavi e margini per capire dove investire e come crescere senza perdere di vista la redditività.',
      },
      {
        n: '02',
        title: 'Marketing & Branding',
        body: 'Dove necessario, curiamo il posizionamento del brand, la comunicazione e la presenza sui social quando possono fare la differenza.',
      },
      {
        n: '03',
        title: 'Performance Marketing',
        body: 'Gestiamo campagne su Meta, Google, TikTok, LinkedIn, Reddit, Pinterest, Spotify e Mediaset.\nMonitoriamo i numeri, ottimizziamo gli investimenti e lavoriamo per trasformare il budget pubblicitario in clienti e vendite.',
      },
      {
        n: '04',
        title: 'Growth System & AI',
        body: "Progettiamo sistemi di crescita integrando CRM, automazioni e intelligenza artificiale nei processi aziendali. Dalla gestione dei lead ai follow-up automatici, fino a strumenti AI personalizzati che semplificano il lavoro e migliorano l'efficienza.",
      },
    ],
  },
  en: {
    eyebrow: 'Our services',
    headingPre: 'While creative agencies focus on vanity metrics,',
    headingHighlight: 'we changed the rules of the game.',
    cta: 'Book a Free Audit',
    services: [
      {
        n: '01',
        title: 'Performance Marketing',
        body: 'Paid campaigns on Meta, Google, TikTok, LinkedIn, Reddit, Pinterest, Spotify, and Mediaset. Every euro allocated where it converts, every campaign continuously optimized.',
      },
      {
        n: '02',
        title: 'Management Control',
        body: "We study your margins and business costs together to guide you toward sustainable growth.",
      },
      {
        n: '03',
        title: 'Growth System',
        body: "The system keeps working even while you're on vacation. Lead scoring, sales notifications, scheduled follow-ups.",
      },
    ],
  },
}

export default function Services() {
  const lang = useLang()
  const t = COPY[lang]
  const root = useRef(null)
  const spineFill = useRef(null)

  useGSAP(
    () => {
      gsap.to(spineFill.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-timeline]',
          start: 'top 70%',
          end: 'bottom 75%',
          scrub: 0.5,
        },
      })

      const nodes = gsap.utils.toArray('[data-node]', root.current)
      nodes.forEach((n) => {
        gsap.fromTo(
          n,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: n,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      const stages = gsap.utils.toArray('[data-stage]', root.current)
      stages.forEach((b) => {
        gsap.from(b, {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: b,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="section-y border-t border-white/5">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{t.eyebrow}</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-4 font-display text-3xl font-extrabold leading-tight text-brand-black sm:text-4xl md:text-5xl"
          >
            {t.headingPre}{' '}
            <span className="text-brand-yellow">{t.headingHighlight}</span>
          </motion.h2>
        </div>

        <div
          data-timeline
          className="relative mx-auto mt-24 max-w-5xl md:mt-32"
        >
          <div className="absolute left-[15px] top-0 h-full w-[2px] md:left-1/2 md:-translate-x-1/2">
            <div className="absolute inset-0 bg-white/15" />
            <div
              ref={spineFill}
              className="absolute inset-0 origin-top bg-brand-yellow"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          <ul className="space-y-24 md:space-y-28">
            {t.services.map((s, i) => {
              const onLeft = i % 2 === 0
              return (
                <li key={s.n} className="relative">
                  <div className="absolute left-[15px] top-5 -translate-x-1/2 md:left-1/2">
                    <div className="relative h-7 w-7 rounded-full bg-brand-black ring-1 ring-brand-yellow/30">
                      <div
                        data-node
                        className="absolute inset-[5px] rounded-full bg-brand-yellow shadow-[0_0_22px_rgba(255,197,1,0.75)]"
                        style={{ opacity: 0, transform: 'scale(0.5)' }}
                      />
                    </div>
                  </div>

                  <div
                    data-stage
                    className={[
                      'pl-14 md:w-[45%]',
                      onLeft
                        ? 'md:ml-0 md:pl-0 md:pr-16 md:text-right'
                        : 'md:ml-auto md:pl-16 md:pr-0 md:text-left',
                    ].join(' ')}
                  >
                    <div className="font-display text-5xl font-extrabold leading-none text-brand-yellow sm:text-6xl md:text-[5rem]">
                      {s.n}
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight text-brand-black sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-brand-black/80 md:text-lg">
                      {s.body}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-20 flex justify-center md:mt-24">
          <a href="#contatti" className="btn-primary">
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
