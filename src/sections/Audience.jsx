import { motion } from 'framer-motion'

const audiences = [
  {
    label: 'Startup',
    headline: 'Idea validata, prima trazione.',
    body: 'Hai un prodotto sul mercato e vuoi un sistema di acquisizione che funzioni dal day 1, senza bruciare il runway in test casuali.',
    fits: [
      'Modello di business validato',
      'Investitori o cassa per scalare',
      'Bisogno di processi ripetibili',
    ],
  },
  {
    label: 'PMI',
    headline: 'Vendite consolidate, crescita instabile.',
    body: 'Fatturi bene, ma i nuovi clienti arrivano per passaparola. Vuoi rendere la crescita prevedibile e indipendente dalla rete personale.',
    fits: [
      'Fatturato già a sei o sette cifre',
      'Team commerciale operativo',
      'Voglia di staccarsi dal passaparola',
    ],
  },
  {
    label: 'E-commerce',
    headline: 'Catalogo attivo, marginalità da difendere.',
    body: 'Hai uno store che vende, ma il ROAS oscilla e la pubblicità mangia il margine. Servono canali profittevoli e un funnel che lavora 24/7.',
    fits: [
      'Catalogo già online e ordinato',
      'Almeno 30K€/mese di ricavi',
      'Margine da proteggere e crescere',
    ],
  },
]

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

function AudienceHex({ label }) {
  return (
    <div
      className="relative w-[120px] sm:w-[140px]"
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
      <div className="absolute inset-0 flex items-center justify-center px-3 text-center text-brand-black">
        <span className="font-display text-base font-extrabold uppercase leading-none tracking-tight sm:text-lg">
          {label}
        </span>
      </div>
    </div>
  )
}

export default function Audience() {
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
            A chi ci rivolgiamo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className="text-outlined mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
          >
            Lavoriamo con chi ha già un business{' '}
            <span className="text-brand-yellow">e vuole farlo crescere.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-outlined-sm mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
          >
            Non vendiamo a chiunque. Lavoriamo con realtà che hanno un prodotto,
            un mercato e la volontà di costruire un sistema di crescita serio.
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
          {audiences.map((a, i) => (
            <motion.article
              key={a.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <AudienceHex label={a.label} />
              <h3 className="text-outlined mt-6 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                {a.headline}
              </h3>
              <p className="text-outlined-sm mt-4 text-base leading-relaxed text-white/80">
                {a.body}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/75">
                {a.fits.map((f) => (
                  <li
                    key={f}
                    className="text-outlined-sm flex items-start gap-2"
                  >
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
