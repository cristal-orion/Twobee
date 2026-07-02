import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const GUARANTEE_ICONS = [
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path
      d="M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2zM9 8h6M9 12h6M9 16h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 7v5l3 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>,
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
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path
      d="M10 17l5-5-5-5M15 12H4M9 3h8a2 2 0 012 2v14a2 2 0 01-2 2H9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
]

const COPY = {
  it: {
    headingPre: 'Piani ',
    headingHighlight: 'trasparenti',
    headingPost: '',
    subhead:
      'Tre livelli di intervento progettati per adattarsi alla fase attuale della tua azienda e portarla al livello successivo.',
    planCta: 'Scopri di più',
    promiseEyebrow: 'Incluse in ogni piano',
    promisePre: 'La nostra ',
    promiseHighlight: 'promessa contrattuale',
    promiseBody:
      'Quattro impegni che valgono per qualunque piano scegli, scritti nero su bianco nel contratto.',
    guarantees: [
      {
        title: 'Trasparenza contrattuale',
        body: 'Contratto minimo di 6 mesi, condizioni chiare e leggibili.',
      },
      {
        title: 'Puntualità analitica',
        body: 'Report mensile garantito entro i primi 5 giorni.',
      },
      {
        title: 'Etica finanziaria',
        body: 'Nessun costo nascosto. Il prezzo che vedi è il prezzo che paghi.',
      },
      {
        title: 'Clausola di uscita',
        body: 'Exit dopo 90 giorni se non sei soddisfatto. Senza penali.',
      },
    ],
    plans: [
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
    ],
  },
  en: {
    headingPre: '',
    headingHighlight: 'Transparent',
    headingPost: ' Plans',
    subhead:
      "Three levels of engagement designed to fit your company's current stage and take it to the next level.",
    planCta: 'Learn more',
    promiseEyebrow: 'Included in every plan',
    promisePre: 'Our ',
    promiseHighlight: 'contractual promise',
    promiseBody:
      'Four commitments that apply no matter which plan you choose, written in black and white into the contract.',
    guarantees: [
      {
        title: 'Contract Transparency',
        body: '6-month minimum contract, clear and readable terms.',
      },
      {
        title: 'Analytical Punctuality',
        body: 'Monthly report guaranteed within the first 5 days.',
      },
      {
        title: 'Financial Ethics',
        body: "No hidden costs. The price you see is the price you pay.",
      },
      {
        title: 'Exit Clause',
        body: "Exit after 90 days if you're not satisfied. No penalties.",
      },
    ],
    plans: [
      {
        name: 'WORKER BEE',
        tag: 'For those starting out. One channel, one system, measurable results.',
        highlighted: false,
        features: [
          '1 Ads channel (Meta or Google)',
          'Basic CRM',
          'Sales pipeline',
          'Welcome email automation',
          'Monthly report + strategy call',
        ],
      },
      {
        name: 'HIVE',
        tag: 'To grow. Full system, multi-channel, advanced CRM.',
        highlighted: true,
        badge: 'Most popular',
        features: [
          'Everything included in Worker Bee',
          '2 Ads channels (Meta + Google)',
          'Custom CRM pipeline',
          'Advanced email automation',
          'Structured multi-step funnel',
          'A/B testing + CRO',
          'Monthly KPI dashboard',
        ],
      },
      {
        name: 'ROYAL QUEEN',
        tag: "For companies that need a decision-making partner, not just an operational one.",
        highlighted: false,
        features: [
          'Everything included in Hive',
          'Ongoing strategic direction',
          'ROI analysis by product line',
          'Lead scoring + AI automations',
          'Monthly executive advisory',
        ],
      },
    ],
  },
}

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
  const lang = useLang()
  const t = COPY[lang]
  return (
    <section className="section-y border-t border-white/5">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            {t.headingPre}
            <span className="text-brand-yellow">{t.headingHighlight}</span>
            {t.headingPost}
          </motion.h2>
          <p className="mt-4 text-base text-white/65 sm:text-lg">
            {t.subhead}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {t.plans.map((p, i) => {
            const hl = p.highlighted
            const bg = hl
              ? 'bg-brand-black'
              : 'bg-white border-2 border-brand-yellow/60'
            const fg = hl ? '#FFFFFF' : '#0B0B0C'
            const subFgColor = hl
              ? 'rgba(255,255,255,0.78)'
              : 'rgba(11,11,12,0.7)'
            const dividerColor = hl
              ? 'rgba(255,255,255,0.18)'
              : 'rgba(11,11,12,0.12)'
            const checkColor = hl ? 'text-brand-yellow' : 'text-brand-black'
            const decoColor = hl ? 'rgba(255,197,1,0.9)' : 'rgba(255,197,1,0.6)'
            const decoOpacity = hl ? 'opacity-[0.10]' : 'opacity-[0.12]'
            const ctaCls = hl
              ? 'bg-brand-yellow text-brand-black'
              : 'bg-brand-black text-[#fff]'
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className={[
                  'relative flex h-full flex-col',
                  hl ? 'lg:-translate-y-5 lg:scale-[1.04]' : '',
                ].join(' ')}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-yellow px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-black shadow-md">
                    {p.badge}
                  </span>
                )}
                <div
                  style={{ color: fg }}
                  className={[
                    'relative flex h-full flex-col overflow-hidden rounded-2xl p-7',
                    bg,
                    hl
                      ? 'ring-2 ring-brand-yellow shadow-[0_40px_90px_-20px_rgba(0,0,0,0.55)] lg:p-8'
                      : 'shadow-[0_18px_50px_-20px_rgba(0,0,0,0.3)]',
                  ].join(' ')}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-14 -top-12 h-44 w-44 ${decoOpacity}`}
                    style={{ clipPath: HEX_CLIP, background: decoColor }}
                  />
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -bottom-20 -left-14 h-52 w-52 ${decoOpacity}`}
                    style={{ clipPath: HEX_CLIP, background: decoColor }}
                  />

                  <h3
                    className="relative font-display text-2xl font-extrabold tracking-wide"
                    style={{ color: fg }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="relative mt-2 text-sm font-medium"
                    style={{ color: subFgColor }}
                  >
                    {p.tag}
                  </p>
                  <ul
                    className="relative mt-6 flex-1 space-y-3 border-t pt-6"
                    style={{ borderColor: dividerColor }}
                  >
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-[15px] leading-snug"
                        style={{ color: fg }}
                      >
                        <span className={checkColor}>
                          <Check />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contatti"
                    className={`relative mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition hover:brightness-110 sm:px-8 sm:py-4 sm:text-base ${ctaCls}`}
                  >
                    {t.planCta}
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-20 border-t border-white/10 pt-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t.promiseEyebrow}</span>
            <h3 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
              {t.promisePre}
              <span className="text-brand-yellow">{t.promiseHighlight}</span>
            </h3>
            <p className="mt-3 text-sm text-white/65 sm:text-base">
              {t.promiseBody}
            </p>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.guarantees.map((g, i) => (
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
                    {GUARANTEE_ICONS[i]}
                  </div>
                </div>
                <h4 className="mt-5 font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
                  {g.title}
                </h4>
                <p className="mt-3 max-w-[280px] text-base leading-snug text-white/70">
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
