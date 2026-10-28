import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'

const COPY = {
  it: {
    eyebrow: 'Con chi vogliamo lavorare',
    headingPre: 'La crescita comincia da',
    headingHighlight: 'una visione condivisa.',
    body: 'Affianchiamo solo imprenditori che credono nel proprio progetto e riconoscono il valore di un partner strategico nel percorso di crescita. Persone aperte al confronto, pronte a rivedere le proprie convinzioni e a prendere decisioni nuove per raggiungere risultati concreti.',
    audiences: [
      {
        keyword: 'Startup',
        headline: 'Dalle prime opportunità alla crescita.',
        body: 'Ti aiutiamo a trovare nuovi clienti, validare i canali di acquisizione e investire il budget dove conta davvero.',
      },
      {
        keyword: 'PMI',
        headline: 'Il tuo business ha ancora spazio per crescere.',
        body: 'Lavoriamo su acquisizione clienti, processi e performance per rendere la crescita più misurabile e sostenibile.',
      },
      {
        keyword: 'E-commerce',
        headline: 'Più vendite, senza perdere di vista i margini.',
        body: 'Ottimizziamo campagne, conversioni e investimenti per far crescere le vendite, tenendo sotto controllo i costi di acquisizione.',
      },
    ],
  },
  en: {
    eyebrow: 'Who we want to work with',
    headingPre: 'Growth starts with',
    headingHighlight: 'a shared vision.',
    body: 'We only work alongside entrepreneurs who believe in their project and see the value of a strategic partner on the road to growth. People open to dialogue, ready to rethink their beliefs and make new decisions to achieve concrete results.',
    audiences: [
      {
        keyword: 'Startups',
        headline: 'From the first opportunities to growth.',
        body: 'We help you find new customers, validate your acquisition channels and invest your budget where it really counts.',
      },
      {
        keyword: 'SMEs',
        headline: 'Your business still has room to grow.',
        body: 'We work on customer acquisition, processes and performance to make growth more measurable and sustainable.',
      },
      {
        keyword: 'E-commerce',
        headline: 'More sales, without losing sight of margins.',
        body: 'We optimize campaigns, conversions and investments to grow sales while keeping acquisition costs under control.',
      },
    ],
  },
}

export default function Audience() {
  const lang = useLang()
  const t = COPY[lang]
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
            {t.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            {t.headingPre}{' '}
            <span className="text-brand-yellow">{t.headingHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            {t.body}
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
          {t.audiences.map((a, i) => (
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
