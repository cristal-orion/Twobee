import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'

const COPY = {
  it: {
    eyebrow: 'Cosa facciamo',
    headingPre: 'Non siamo solo marketing.',
    headingHighlight: 'Siamo il tuo partner digitale.',
    body: 'Acquisizione, infrastruttura digitale e intelligenza artificiale applicata. Tre pilastri, un unico interlocutore: noi.',
    cta: 'Consulta i nostri servizi',
    pillars: [
      {
        n: '01',
        label: 'Growth & Performance',
        tagline: 'Acquisizione misurabile, ogni euro tracciato.',
        items: [
          'Performance marketing su Meta, Google, TikTok',
          'Funnel di conversione e landing testate',
          'Marketing automation e lead scoring',
          'Reporting sul fatturato reale, non sui like',
        ],
      },
      {
        n: '02',
        label: 'Digital Partner',
        tagline: "L'infrastruttura digitale che regge la crescita.",
        items: [
          'Siti, e-commerce e landing su misura',
          'Integrazioni CRM, ERP e gestionali',
          'Tracciamenti server-side e data layer',
          'Manutenzione evolutiva continuativa',
        ],
      },
      {
        n: '03',
        label: 'AI nei processi',
        tagline: 'Intelligenza artificiale dove serve davvero.',
        items: [
          'Agenti custom su dati e workflow aziendali',
          'Automazioni operative su email, CRM, ticketing',
          'Generazione asset creativi su brand guideline',
          'Integrazioni con LLM in produzione, non in demo',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'What we do',
    headingPre: "We're not just marketing.",
    headingHighlight: "We're your digital partner.",
    body: 'Acquisition, digital infrastructure, and applied artificial intelligence. Three pillars, one single point of contact: us.',
    cta: 'See our services',
    pillars: [
      {
        n: '01',
        label: 'Growth & Performance',
        tagline: 'Measurable acquisition, every euro tracked.',
        items: [
          'Performance marketing on Meta, Google, TikTok',
          'Conversion funnels and tested landing pages',
          'Marketing automation and lead scoring',
          'Reporting on real revenue, not likes',
        ],
      },
      {
        n: '02',
        label: 'Digital Partner',
        tagline: 'The digital infrastructure that supports growth.',
        items: [
          'Custom websites, e-commerce, and landing pages',
          'CRM, ERP, and management software integrations',
          'Server-side tracking and data layer',
          'Ongoing evolutionary maintenance',
        ],
      },
      {
        n: '03',
        label: 'AI in the Process',
        tagline: 'Artificial intelligence where it actually matters.',
        items: [
          'Custom agents on company data and workflows',
          'Operational automation for email, CRM, ticketing',
          'Creative asset generation on brand guidelines',
          'LLM integrations in production, not in demos',
        ],
      },
    ],
  },
}

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

function PillarHex({ n }) {
  return (
    <div
      className="relative w-[88px] flex-shrink-0 sm:w-[104px]"
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
            'linear-gradient(160deg, rgba(255,255,255,0.22), rgba(255,197,1,0) 45%, rgba(0,0,0,0.14) 100%)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-brand-black">
        <span className="font-display text-2xl font-extrabold leading-none tracking-tight sm:text-3xl">
          {n}
        </span>
      </div>
    </div>
  )
}

export default function Capabilities() {
  const lang = useLang()
  const t = COPY[lang]
  return (
    <section className="section-y border-t border-white/5">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="eyebrow block"
          >
            {t.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className="mt-4 font-display text-3xl font-extrabold leading-tight text-brand-black sm:text-4xl md:text-5xl"
          >
            {t.headingPre}{' '}
            <span className="text-brand-yellow">{t.headingHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-black/80 md:text-lg"
          >
            {t.body}
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-3 md:gap-7">
          {t.pillars.map((p, i) => (
            <motion.article
              key={p.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex h-full flex-col rounded-2xl border border-black/10 bg-white/85 p-6 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-7"
            >
              <div className="flex items-start gap-5">
                <PillarHex n={p.n} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
                    {p.label}
                  </h3>
                  <p className="mt-2 text-[15px] font-medium leading-snug text-white/75">
                    {p.tagline}
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 border-t border-black/10 pt-6 text-[15px] leading-relaxed text-white/80">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-[7px] inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex justify-center md:mt-20">
          <a href="#contatti" className="btn-primary">
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
