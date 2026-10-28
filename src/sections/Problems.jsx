import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'

const COPY = {
  it: {
    eyebrow: 'SUCCEDE SPESSO',
    headingPre: 'Hai già investito in marketing,',
    headingHighlight: 'ma non vedi risultati.',
    items: [
      {
        title: 'Hai bruciato budget!',
        text: 'Hai speso soldi senza nessun impatto sulle tue vendite.',
      },
      {
        title: 'Solo vanity metrics',
        text: 'Con like e follower non ci paghi di certo i tuoi dipendenti.',
      },
      {
        title: 'Senza ads crolla tutto',
        text: 'Stacchi le inserzioni e i clienti non arrivano più.',
      },
    ],
    closingPre: 'Per questo noi ti offriamo',
    closingHighlight: 'un sistema',
    closingPost: ', non una serie di servizi separati.',
  },
  en: {
    eyebrow: 'It happens a lot',
    headingPre: "You've already invested in marketing,",
    headingHighlight: "but you're not seeing results.",
    items: [
      {
        title: 'You burned through budget!',
        text: "You spent money with no impact on your sales.",
      },
      {
        title: 'Just vanity metrics',
        text: "You certainly can't pay your employees with likes and followers.",
      },
      {
        title: 'Without ads, everything collapses',
        text: 'Switch the ads off and customers stop coming.',
      },
    ],
    closingPre: "That's why we offer you",
    closingHighlight: 'a system',
    closingPost: ', not a set of separate services.',
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
