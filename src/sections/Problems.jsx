import { motion } from 'framer-motion'

const items = [
  {
    label: 'Budget',
    text: 'Spendi, ma non sai cosa ti ha portato vendite.',
  },
  {
    label: 'Dati',
    text: 'Like e reach nei report. Nessuna causa, nessun effetto.',
  },
  {
    label: 'Dipendenza',
    text: 'Stacchi il budget, finisce il flusso di clienti.',
  },
]

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

function HexBadge({ label, text }) {
  return (
    <div
      className="relative w-full max-w-[320px]"
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
            'linear-gradient(160deg, rgba(255,255,255,0.22), rgba(255,197,1,0) 45%, rgba(0,0,0,0.12) 100%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-7 text-center text-brand-black sm:px-8">
        <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight sm:text-3xl md:text-[2.1rem]">
          {label}
        </span>
        <span className="mt-3 text-[13px] font-medium leading-snug sm:text-sm">
          {text}
        </span>
      </div>
    </div>
  )
}

function HexBadgeCompact({ label }) {
  return (
    <div
      className="relative w-full max-w-[200px]"
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
            'linear-gradient(160deg, rgba(255,255,255,0.22), rgba(255,197,1,0) 45%, rgba(0,0,0,0.12) 100%)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center px-5 text-center text-brand-black">
        <span className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight">
          {label}
        </span>
      </div>
    </div>
  )
}

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

        {/* Desktop: hex grande con testo dentro */}
        <div className="mt-20 hidden grid-cols-3 items-start justify-items-center gap-8 sm:mt-24 md:grid">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={[
                'mx-auto w-full max-w-[320px]',
                i === 1 ? 'translate-y-24' : '',
              ].join(' ')}
            >
              <HexBadge label={it.label} text={it.text} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: hex compatto con solo label, body fuori */}
        <div className="mt-20 grid grid-cols-1 items-start justify-items-center gap-14 sm:mt-24 md:hidden">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex w-full max-w-xs flex-col items-center gap-4"
            >
              <HexBadgeCompact label={it.label} />
              <p className="text-center text-base leading-snug text-white/85">
                {it.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-outlined mx-auto mt-24 max-w-2xl text-center font-display text-2xl font-bold leading-tight tracking-tight text-white md:mt-28 md:text-3xl"
        >
          Per questo abbiamo costruito{' '}
          <span className="text-brand-yellow">un sistema</span>, non un'agenzia.
        </motion.p>
      </div>
    </section>
  )
}
