import { motion } from 'framer-motion'

const items = [
  {
    title: 'BUDGET BRUCIATO',
    body: 'Hai speso migliaia di euro in campagne pubblicitarie che portavano like e interazioni, ma zero vendite reali tracciate. Un buco nero per le tue casse.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M12 2v20M7 5h7a3 3 0 010 6h-4a3 3 0 000 6h7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'DATI INUTILI',
    body: 'Ti arrivano report pieni di follower, reach e impressioni che non capisci. Nessuno ti dice mai quante vendite reali ha generato una specifica campagna.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M4 19h16M7 16l3-6 4 3 4-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'DIPENDENZA INFINITA',
    body: "Paghi ogni mese la tua agenzia ma non stai costruendo un vero asset. Se smetti di pagare per le ads, il flusso di potenziali clienti si ferma all'istante.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3M16 4v4h4M8 20v-4H4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default function Problems() {
  return (
    <section className="section-y">
      <div className="container-x">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
        >
          Hai già investito in marketing,
          <br className="hidden sm:block" />{' '}
          <span className="text-brand-yellow">ma non vedi risultati?</span>
        </motion.h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-brand-yellow/50 hover:bg-white/[0.06]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-yellow/10 text-brand-yellow transition group-hover:bg-brand-yellow group-hover:text-brand-black">
                {it.icon}
              </div>
              <h3 className="font-display text-xl font-extrabold tracking-wide">
                {it.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {it.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
