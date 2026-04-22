import { motion } from 'framer-motion'

const items = [
  {
    title: 'Trasparenza Contrattuale',
    body: 'Contratto minimo di 6 mesi trasparente',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2zM9 8h6M9 12h6M9 16h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Puntualità Analitica',
    body: 'Report mensile garantito entro i 5 giorni',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Etica finanziaria',
    body: 'Nessun costo nascosto',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Clausola di uscita',
    body: 'Exit dopo 90 giorni se non sei soddisfatto',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M10 17l5-5-5-5M15 12H4M9 3h8a2 2 0 012 2v14a2 2 0 01-2 2H9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default function Guarantees() {
  return (
    <section className="border-y border-white/5 py-14">
      <div className="container-x">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand-yellow/10 text-brand-yellow">
                {it.icon}
              </div>
              <div>
                <h3 className="font-display text-lg font-extrabold">
                  {it.title}
                </h3>
                <p className="mt-1 text-sm text-white/60">{it.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
