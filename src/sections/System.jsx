import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'

const COPY = {
  it: {
    eyebrow: 'Il nostro metodo',
    headingPre: 'Costruiamo il tuo sistema di acquisizione clienti con',
    headingHighlight: 'KPI di fatturato reale',
    headingPost: ', non follower.',
    steps: [
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
        body: 'Capiamo insieme da dove provengono i tuoi ricavi: CAC, NCAC, MER, AMER, LTV per comprendere i driver del tuo business.',
      },
    ],
  },
  en: {
    eyebrow: 'Our method',
    headingPre: 'We build your customer-acquisition system on',
    headingHighlight: 'real revenue KPIs',
    headingPost: ', not followers.',
    steps: [
      {
        n: '01',
        phase: 'Diagnosis',
        title: 'Leak Analysis',
        body: "We map where you're losing customers and budget today. We trace the bottlenecks in your ecosystem before touching a single campaign.",
      },
      {
        n: '02',
        phase: 'System',
        title: 'Sales Architecture',
        body: 'Funnels, CRM, and automations that make your growth predictable — not a scattered set of ads.',
      },
      {
        n: '03',
        phase: 'Execution',
        title: 'Operational Management',
        body: 'We manage ads, email, content, and advanced tracking. You see the results, not the machine.',
      },
      {
        n: '04',
        phase: 'Reporting',
        title: 'Return on Investment',
        body: 'Together we figure out where your revenue comes from: CAC, NCAC, MER, AMER, LTV to understand the drivers of your business.',
      },
    ],
  },
}

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

function PhaseHex({ phase }) {
  return (
    <div
      className="relative w-full max-w-[200px]"
      style={{ aspectRatio: '1 / 1.1547' }}
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
      <div className="absolute inset-0 flex items-center justify-center px-5 text-center text-brand-black">
        <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight sm:text-3xl">
          {phase}
        </span>
      </div>
    </div>
  )
}

export default function System() {
  const lang = useLang()
  const t = COPY[lang]
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow">{t.eyebrow}</span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-outlined mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
          >
            {t.headingPre}{' '}
            <span className="text-brand-yellow">{t.headingHighlight}</span>
            {t.headingPost}
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 md:mt-20 md:grid-cols-4 md:gap-8">
          {t.steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.4,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center"
            >
              <PhaseHex phase={s.phase} />
              <h3 className="mt-6 font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-xs text-base leading-snug text-white/80">
                {s.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
