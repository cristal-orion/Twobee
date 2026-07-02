import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'

const COPY = {
  it: {
    eyebrow: 'FAQ',
    headingPre: 'Domande ',
    headingHighlight: 'frequenti',
    body: "Tutto ciò che c'è da sapere per capire come lavoriamo e come ti aiutiamo a scalare il tuo business.",
    cta: 'Prenota un Audit Gratuito',
    faqs: [
      {
        q: 'Come faccio a tenere traccia dei risultati?',
        a: 'Ricevi un report mensile con i KPI di fatturato reale generato, non vanity metrics. In più hai una dashboard sempre accessibile con lo stato delle campagne in tempo reale.',
      },
      {
        q: 'Quanto ci vuole per vedere i primi risultati?',
        a: "I primi risultati misurabili arrivano dopo aver raccolto i dati giusti: vedrai un impatto sul tuo business entro 30-60 giorni. A 90 giorni il sistema è a regime e i KPI di fatturato diventano stabili e prevedibili.",
      },
      {
        q: 'Cosa succede se non funziona?',
        a: 'Dopo 90 giorni puoi uscire dal contratto senza penali. Crediamo nel valore del nostro lavoro: se non produciamo risultati misurabili, non meritiamo di trattenerti.',
      },
      {
        q: 'Quanto devo investire in Ads?',
        a: "L'investimento minimo consigliato varia in base al settore e agli obiettivi: lo valuteremo insieme con un calcolo statistico. In audit definiamo insieme la cifra corretta, si parte in genere dal 2% del fatturato.",
      },
      {
        q: 'Cosa vi differenzia dalle agenzie?',
        a: 'Lavoriamo con un approccio data-driven su KPI di fatturato, non di follower. Nessun costo nascosto, clausola di uscita a 90 giorni, report garantiti e un partner decisionale invece di un esecutore di campagne.',
      },
    ],
  },
  en: {
    eyebrow: 'FAQ',
    headingPre: 'Frequently Asked ',
    headingHighlight: 'Questions',
    body: 'Everything you need to know to understand how we work and how we help you scale your business.',
    cta: 'Book a Free Audit',
    faqs: [
      {
        q: 'How do I track results?',
        a: "You get a monthly report with real revenue KPIs, not vanity metrics. Plus, you always have access to a dashboard showing your campaigns' status in real time.",
      },
      {
        q: 'How long before I see the first results?',
        a: "The first measurable results come after we've gathered the right data: you'll see an impact on your business within 30-60 days. By 90 days the system is fully up to speed and revenue KPIs become stable and predictable.",
      },
      {
        q: "What happens if it doesn't work?",
        a: "After 90 days you can exit the contract with no penalties. We believe in the value of our work: if we don't produce measurable results, we don't deserve to keep you.",
      },
      {
        q: 'How much should I invest in Ads?',
        a: "The recommended minimum investment varies by industry and goals: we'll work it out together with a statistical calculation. During the audit we define the right figure together — it typically starts at around 2% of revenue.",
      },
      {
        q: 'What sets you apart from agencies?',
        a: 'We work with a data-driven approach based on revenue KPIs, not follower counts. No hidden costs, a 90-day exit clause, guaranteed reporting, and a decision-making partner instead of a campaign executor.',
      },
    ],
  },
}

function Item({ faq, open, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/[0.05]"
      >
        <span className="font-display text-base font-extrabold sm:text-lg">
          {faq.q}
        </span>
        <span
          className={[
            'flex h-8 w-8 flex-none items-center justify-center rounded-full border border-brand-yellow/40 transition',
            open ? 'rotate-180 bg-brand-yellow text-brand-black' : 'text-brand-yellow',
          ].join(' ')}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm leading-relaxed text-white/70">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const lang = useLang()
  const t = COPY[lang]
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <section className="section-y bg-brand-black">
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t.headingPre}
            <span className="text-brand-yellow">{t.headingHighlight}</span>
          </h2>
          <p className="mt-4 text-base text-white/65">{t.body}</p>
          <a href="#contatti" className="btn-primary mt-8">
            {t.cta}
          </a>
        </div>
        <div className="space-y-3">
          {t.faqs.map((f, i) => (
            <Item
              key={f.q}
              faq={f}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
