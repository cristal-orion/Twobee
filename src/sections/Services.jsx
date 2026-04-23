import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const services = [
  {
    n: '01',
    title: 'Performance Marketing',
    body: "Campagne paid su Meta e Google con un unico metro: il ritorno sull'investimento. Ogni euro allocato dove converte, ogni campagna ottimizzata in continuo.",
  },
  {
    n: '02',
    title: 'Funnel e conversione',
    body: 'Il percorso completo dal primo click alla firma. Landing, sequenze di nurturing, follow-up automatici — ogni passaggio testato per ridurre le perdite.',
  },
  {
    n: '03',
    title: 'Marketing Automation',
    body: 'Il sistema lavora anche quando il tuo team non lo fa. Lead scoring, routing ai commerciali, follow-up programmati. Meno energia sui contatti freddi, più sui lead caldi.',
  },
]

export default function Services() {
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
          <span className="eyebrow">I nostri servizi</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-outlined mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
          >
            Mentre le agenzie si concentrano sulle vanity metrics,{' '}
            <span className="text-brand-yellow">
              noi abbiamo cambiato le regole del gioco.
            </span>
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
            {services.map((s, i) => {
              const onLeft = i % 2 === 0
              return (
                <li key={s.title} className="relative">
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
                    <div className="text-outlined font-display text-5xl font-extrabold leading-none text-brand-yellow sm:text-6xl md:text-[5rem]">
                      {s.n}
                    </div>
                    <h3 className="text-outlined mt-4 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="text-outlined-sm mt-4 text-base leading-relaxed text-white/85 md:text-lg">
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
            Prenota un Audit Gratuito
          </a>
        </div>
      </div>
    </section>
  )
}
