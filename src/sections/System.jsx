import { motion } from 'framer-motion'

const steps = [
  {
    n: '01',
    phase: 'Diagnosi',
    title: 'ANALISI DELLE DISPERSIONI',
    body: 'Analizziamo dove perdi clienti e budget oggi, tracciando i colli di bottiglia del tuo ecosistema.',
  },
  {
    n: '02',
    phase: 'Sistema',
    title: 'ARCHITETTURA DI VENDITA',
    body: 'Costruiamo il funnel, il CRM e le automazioni necessarie per rendere prevedibile la tua crescita.',
  },
  {
    n: '03',
    phase: 'Execution',
    title: 'GESTIONE OPERATIVA TOTALE',
    body: 'Gestiamo ads, email marketing, content e tracciamenti avanzati senza farti perdere tempo.',
  },
  {
    n: '04',
    phase: 'Reporting',
    title: "RITORNO SULL'INVESTIMENTO",
    body: 'Ricevi un report mensile focalizzato sul fatturato reale generato, non sui follower guadagnati.',
  },
]

export default function System() {
  return (
    <section className="section-y">
      <div className="container-x">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
        >
          Costruiamo il tuo sistema di acquisizione clienti con{' '}
          <span className="text-brand-yellow">KPI di fatturato reale</span>,
          non follower.
        </motion.h2>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="font-display text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">
                {s.n} — {s.phase}
              </div>
              <h3 className="mt-4 font-display text-lg font-extrabold leading-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
