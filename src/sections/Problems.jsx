import { motion } from 'framer-motion'

const items = [
  {
    title: 'Budget bruciato senza ROI',
    text: 'Spendi, ma non sai cosa ti ha portato vendite.',
  },
  {
    title: 'Solo vanity metrics',
    text: 'Like e reach nei report. Nessuna causa, nessun effetto.',
  },
  {
    title: 'Crescita dipendente dal paid',
    text: 'Stacchi il budget, finisce il flusso di clienti.',
  },
]

export default function Problems() {
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
          Diagnosi
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className="text-outlined mx-auto mt-4 max-w-3xl text-center font-display text-3xl font-extrabold leading-[1.05] sm:text-4xl md:text-5xl"
        >
          Hai già investito in marketing,{' '}
          <span className="text-brand-yellow">ma non vedi risultati?</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 md:grid-cols-3 md:gap-6">
          {items.map((it, i) => (
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
          Per questo abbiamo costruito{' '}
          <span className="text-brand-yellow">un sistema</span>, non un'agenzia.
        </motion.p>
      </div>
    </section>
  )
}
