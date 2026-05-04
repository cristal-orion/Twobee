import { motion } from 'framer-motion'

const audiences = [
  {
    keyword: 'Startup',
    headline: 'Idea validata, prima trazione.',
    body: 'Acquisizione misurabile dal day 1, senza bruciare runway o capitale.',
  },
  {
    keyword: 'PMI',
    headline: 'Vendite consolidate, crescita instabile.',
    body: 'Crescita prevedibile, indipendente dal passaparola e dalla rete personale.',
  },
  {
    keyword: 'E-commerce',
    headline: 'Catalogo attivo, marginalità da difendere.',
    body: 'Canali profittevoli e funnel sempre attivo per proteggere il margine.',
  },
]

export default function Audience() {
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="eyebrow block"
          >
            A chi ci rivolgiamo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            Lavoriamo con chi ha già un business{' '}
            <span className="text-brand-yellow">e vuole farlo crescere.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            Non vendiamo a chiunque. Lavoriamo con realtà che hanno un prodotto,
            un mercato e la volontà di costruire un sistema di crescita serio.
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
          {audiences.map((a, i) => (
            <motion.article
              key={a.keyword}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <h3 className="font-display text-4xl font-extrabold leading-none tracking-tight text-brand-yellow sm:text-5xl md:text-[3.5rem]">
                {a.keyword}
              </h3>
              <h4 className="mt-5 font-display text-lg font-extrabold leading-snug text-white sm:text-xl">
                {a.headline}
              </h4>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-white/70">
                {a.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
