import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const steps = [
  {
    n: '01',
    phase: 'Diagnosi',
    title: 'Analisi delle dispersioni',
    body: 'Mappiamo dove perdi clienti e budget oggi. Tracciamo i colli di bottiglia del tuo ecosistema prima di toccare qualsiasi campagna.',
  },
  {
    n: '02',
    phase: 'Sistema',
    title: 'Architettura di vendita',
    body: 'Funnel, CRM e automazioni che rendono prevedibile la tua crescita — non un set di ads sparsi.',
  },
  {
    n: '03',
    phase: 'Execution',
    title: 'Gestione operativa',
    body: 'Gestiamo ads, email, content e tracciamenti avanzati. Tu vedi i risultati, non la macchina.',
  },
  {
    n: '04',
    phase: 'Reporting',
    title: "Ritorno sull'investimento",
    body: 'Report mensile sul fatturato reale generato. Niente follower, niente vanity metric.',
  },
]

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

function HexFace({ children, back = false }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: back ? 'rotateY(180deg)' : undefined,
      }}
    >
      <div
        className="absolute inset-0 bg-brand-yellow"
        style={{ clipPath: HEX_CLIP }}
      />
      <div
        className="absolute inset-[3px]"
        style={{
          clipPath: HEX_CLIP,
          background:
            'linear-gradient(160deg, rgba(255,255,255,0.22), rgba(255,197,1,0) 45%, rgba(0,0,0,0.14) 100%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-7 text-center text-brand-black">
        {children}
      </div>
    </div>
  )
}

function HexCard({ phase, title, body }) {
  return (
    <div
      className="relative h-full w-full"
      data-hex-flipper
      style={{ transformStyle: 'preserve-3d' }}
    >
      <HexFace>
        <span className="font-display text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-[2.6rem]">
          {phase}
        </span>
      </HexFace>
      <HexFace back>
        <span className="font-display text-sm font-extrabold uppercase tracking-[0.15em]">
          {title}
        </span>
        <p className="mt-3 text-[13px] font-medium leading-snug">
          {body}
        </p>
      </HexFace>
    </div>
  )
}

export default function System() {
  const root = useRef(null)
  const pin = useRef(null)
  const arena = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const hexes = gsap.utils.toArray('[data-hex]', arena.current)
        const flippers = gsap.utils.toArray(
          '[data-hex-flipper]',
          arena.current
        )

        const hexBase = 350
        const smallScale = 0.42
        const smallW = hexBase * smallScale
        const smallH = smallW * 1.1547
        const DX = smallW
        const DY = smallH * 0.75
        const clusterAnchor = { x: -(DX * 3) / 4, y: -DY / 2 }
        const clusterPositions = [
          { x: clusterAnchor.x, y: clusterAnchor.y },
          { x: clusterAnchor.x + DX / 2, y: clusterAnchor.y + DY },
          { x: clusterAnchor.x + DX, y: clusterAnchor.y },
          { x: clusterAnchor.x + (DX * 3) / 2, y: clusterAnchor.y + DY },
        ]

        gsap.set(hexes, {
          xPercent: -50,
          yPercent: -50,
          x: () => window.innerWidth * 0.55,
          y: 0,
          scale: 0.9,
          opacity: 0,
        })
        gsap.set(flippers, { rotationY: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${steps.length * 120}%`,
            pin: pin.current,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        steps.forEach((_, i) => {
          const base = i

          tl.to(
            hexes[i],
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: 'power3.out',
            },
            base
          )

          tl.to(
            flippers[i],
            {
              rotationY: 180,
              duration: 0.2,
              ease: 'power2.inOut',
            },
            base + 0.32
          )

          tl.to(
            flippers[i],
            {
              rotationY: 360,
              duration: 0.2,
              ease: 'power2.inOut',
            },
            base + 0.62
          )

          tl.to(
            hexes[i],
            {
              x: clusterPositions[i].x,
              y: clusterPositions[i].y,
              scale: smallScale,
              duration: 0.3,
              ease: 'power2.inOut',
            },
            base + 0.85
          )
        })

        return () => {
          tl.scrollTrigger && tl.scrollTrigger.kill()
          tl.kill()
        }
      })

      mm.add('(max-width: 767px)', () => {
        const hexes = gsap.utils.toArray('[data-hex]', arena.current)
        const flippers = gsap.utils.toArray(
          '[data-hex-flipper]',
          arena.current
        )
        gsap.set(hexes, { clearProps: 'all' })
        gsap.set(flippers, { clearProps: 'all' })
      })

      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section ref={root} className="relative">
      <div
        ref={pin}
        className="relative flex min-h-screen flex-col overflow-hidden py-20 md:py-24"
      >
        <div className="container-x">
          <div className="mx-auto max-w-4xl text-center">
            <span className="eyebrow">Il nostro metodo</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-outlined mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
            >
              Costruiamo il tuo sistema di acquisizione clienti con{' '}
              <span className="text-brand-yellow">KPI di fatturato reale</span>,
              non follower.
            </motion.h2>
          </div>
        </div>

        <div
          ref={arena}
          className="relative flex flex-1 items-center justify-center"
          style={{ perspective: 1600 }}
        >
          <div className="relative hidden h-[500px] w-full md:block">
            {steps.map((s) => (
              <div
                key={s.n}
                data-hex
                className="absolute left-1/2 top-1/2 will-change-transform"
                style={{
                  width: 350,
                  height: 350 * 1.1547,
                  transformStyle: 'preserve-3d',
                }}
              >
                <HexCard phase={s.phase} title={s.title} body={s.body} />
              </div>
            ))}
          </div>

          <div className="grid w-full grid-cols-1 gap-10 px-4 sm:grid-cols-2 md:hidden">
            {steps.map((s) => (
              <div
                key={s.n}
                className="flex flex-col items-center gap-5"
              >
                <div
                  data-hex
                  className="relative"
                  style={{ width: 300, height: 300 * 1.1547 }}
                >
                  <HexCard phase={s.phase} title={s.title} body={s.body} />
                </div>
                <div className="text-center">
                  <h3 className="text-outlined font-display text-lg font-extrabold">
                    {s.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="container-x">
            <div className="mx-auto mt-4 flex max-w-xs items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
              <span className="h-px flex-1 bg-white/20" />
              <span>Scorri</span>
              <span className="h-px flex-1 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
