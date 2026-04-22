import { motion } from 'framer-motion'

const services = [
  {
    title: 'Performance Marketing',
    body: "Gestiamo campagne paid su Meta e Google con un unico metro di misura: il ritorno sull'investimento. Ogni budget è allocato dove converte di più, ogni campagna ottimizzata in continuo.",
  },
  {
    title: 'Funnel e conversione',
    body: 'Progettiamo il percorso completo dal primo click alla firma del contratto. Landing page, sequenze di nurturing, follow-up automatici. Ogni passaggio è testato per ridurre le perdite lungo il funnel.',
  },
  {
    title: 'Marketing Automation',
    body: 'Il sistema lavora anche quando il tuo team non lo fa. Automazioni di nurturing, lead scoring, assegnazione ai commerciali, follow-up programmati. Meno tempo perso su contatti freddi, più energia sui lead che contano.',
  },
]

export default function Services() {
  return (
    <section className="section-y border-t border-white/5">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">I nostri servizi</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
          >
            Mentre le agenzie si concentrano sulle vanity metrics,
            <br className="hidden sm:block" />{' '}
            <span className="text-brand-yellow">
              noi abbiamo cambiato le regole del gioco.
            </span>
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-7 transition hover:border-brand-yellow/40"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-yellow/10 blur-3xl transition group-hover:bg-brand-yellow/20" />
              <div className="relative">
                <div className="mb-4 font-display text-4xl font-extrabold text-brand-yellow/80">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-2xl font-extrabold">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  {s.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#contatti" className="btn-primary">
            Prenota un Audit Gratuito
          </a>
        </div>
      </div>
    </section>
  )
}
