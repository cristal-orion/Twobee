import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'

const COPY = {
  it: {
    eyebrow: 'Diagnosi',
    headingPre: 'Hai già investito in marketing,',
    headingHighlight: 'ma non vedi risultati?',
    items: [
      {
        title: 'Budget bruciato senza KPI',
        text: 'Spendi senza nessun impatto sulle tue vendite.',
      },
      {
        title: 'Solo vanity metrics',
        text: 'Like e follower non pagano i tuoi dipendenti.',
      },
      {
        title: 'Senza ads crolla tutto',
        text: 'Stacchi il budget e i tuoi clienti non arrivano più.',
      },
    ],
    closingPre: 'Per questo abbiamo costruito',
    closingHighlight: 'un sistema',
    closingPost: ", non un'agenzia.",
  },
  en: {
    eyebrow: 'Diagnosis',
    headingPre: "Already invested in marketing,",
    headingHighlight: "but not seeing results?",
    items: [
      {
        title: 'Budget burned with no KPIs',
        text: "You're spending with zero impact on your sales.",
      },
      {
        title: 'Just vanity metrics',
        text: "Likes and followers don't pay your employees.",
      },
      {
        title: 'Cut the ads, everything collapses',
        text: 'Cut the budget and your customers stop showing up.',
      },
    ],
    closingPre: "That's why we built",
    closingHighlight: 'a system',
    closingPost: ', not an agency.',
  },
}

export default function Problems() {
  const lang = useLang()
  const t = COPY[lang]
  return (
    <section className="section-y">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="eyebrow block text-center"
        >
          {t.eyebrow}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className="text-outlined mx-auto mt-4 max-w-3xl text-center font-display text-3xl font-extrabold leading-[1.05] sm:text-4xl md:text-5xl"
        >
          {t.headingPre}{' '}
          <span className="text-brand-yellow">{t.headingHighlight}</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-3 md:gap-6">
          {t.items.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: 'easeOut',
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-8"
            >
              <span
                aria-hidden
                className="block h-1 w-10 rounded-full bg-brand-yellow"
              />
              <h3 className="mt-5 font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
                {it.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                {it.text}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-outlined mx-auto mt-20 max-w-2xl text-center font-display text-2xl font-bold leading-tight tracking-tight text-white md:mt-24 md:text-3xl"
        >
          {t.closingPre}{' '}
          <span className="text-brand-yellow">{t.closingHighlight}</span>
          {t.closingPost}
        </motion.p>
      </div>
    </section>
  )
}
