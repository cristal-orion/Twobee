import { motion } from 'framer-motion'

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const guarantees = [
  {
    title: 'Trasparenza contrattuale',
    body: 'Contratto minimo di 6 mesi, condizioni chiare e leggibili.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2zM9 8h6M9 12h6M9 16h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Puntualità analitica',
    body: 'Report mensile garantito entro i primi 5 giorni.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Etica finanziaria',
    body: 'Nessun costo nascosto. Il prezzo che vedi è il prezzo che paghi.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Clausola di uscita',
    body: 'Exit dopo 90 giorni se non sei soddisfatto. Senza penali.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M10 17l5-5-5-5M15 12H4M9 3h8a2 2 0 012 2v14a2 2 0 01-2 2H9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

const plans = [
  {
    name: 'WORKER BEE',
    tag: 'Per chi inizia. Un canale, un sistema, risultati misurabili.',
    highlighted: false,
    features: [
      '1 canale Ads (Meta o Google)',
      'CRM Base',
      'Pipeline di vendita',
      'Email Automation di benvenuto',
      'Report mensile + Call strategica',
    ],
  },
  {
    name: 'HIVE',
    tag: 'Per crescere. Sistema completo, multi-canale, CRM avanzato.',
    highlighted: true,
    badge: 'Più scelto',
    features: [
      'Tutto ciò che è incluso in Worker Bee',
      '2 canali Ads (Meta + Google)',
      'CRM Pipeline personalizzata',
      'Email Automation avanzata',
      'Funnel strutturato multi-step',
      'A/B test + CRO',
      'KPI Dashboard mensile',
    ],
  },
  {
    name: 'ROYAL QUEEN',
    tag: 'Per aziende che richiedono un partner decisionale, non solo operativo.',
    highlighted: false,
    features: [
      'Tutto ciò che è incluso in Hive',
      'Direzione strategica continuativa',
      'Analisi ROI per linea di prodotto',
      'Lead scoring + automazioni AI',
      'Advisory direzionale mensile',
    ],
  },
]

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-none">
    <path
      d="M5 12l5 5L20 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Pricing() {
  return (
    <section className="section-y border-t border-white/5">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
          >
            Piani <span className="text-brand-yellow">trasparenti</span>
          </motion.h2>
          <p className="mt-4 text-base text-white/65 sm:text-lg">
            Tre livelli di intervento progettati per adattarsi alla fase
            attuale della tua azienda e portarla al livello successivo.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className={[
                'relative flex flex-col rounded-2xl p-7',
                p.highlighted
                  ? 'border-2 border-brand-yellow bg-brand-yellow/[0.06] shadow-[0_0_60px_-20px_rgba(245,197,24,0.5)]'
                  : 'border border-white/10 bg-white/[0.03]',
              ].join(' ')}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-yellow px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-black">
                  {p.badge}
                </span>
              )}
              <h3 className="font-display text-2xl font-extrabold tracking-wide">
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-white/65">{p.tag}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-white/80"
                  >
                    <span
                      className={
                        p.highlighted
                          ? 'text-brand-yellow'
                          : 'text-brand-yellow/70'
                      }
                    >
                      <Check />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contatti"
                className={p.highlighted ? 'btn-primary mt-8' : 'btn-outline mt-8'}
              >
                Prenota un Audit Gratuito
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Incluse in ogni piano</span>
            <h3 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
              La nostra{' '}
              <span className="text-brand-yellow">promessa contrattuale</span>
            </h3>
            <p className="mt-3 text-sm text-white/65 sm:text-base">
              Quattro impegni che valgono per qualunque piano scegli, scritti
              nero su bianco nel contratto.
            </p>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: 'easeOut',
                }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="relative w-16"
                  style={{ aspectRatio: '1 / 1.1547' }}
                >
                  <div
                    className="absolute inset-0 bg-brand-yellow"
                    style={{ clipPath: HEX_CLIP }}
                  />
                  <div
                    className="absolute inset-[2px]"
                    style={{
                      clipPath: HEX_CLIP,
                      background:
                        'linear-gradient(160deg, rgba(255,255,255,0.22), rgba(255,197,1,0) 45%, rgba(0,0,0,0.12) 100%)',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-brand-black">
                    {g.icon}
                  </div>
                </div>
                <h4 className="mt-4 font-display text-base font-extrabold">
                  {g.title}
                </h4>
                <p className="mt-2 max-w-[260px] text-sm text-white/65">
                  {g.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
