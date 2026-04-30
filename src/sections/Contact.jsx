import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contact() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', telefono: '' })
  const [status, setStatus] = useState('idle')

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 600)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const prevOverflow = document.body.style.overflow
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <section id="contatti" className="relative">
      <div className="relative overflow-hidden bg-brand-yellow text-brand-black">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 opacity-20 sm:h-96 sm:w-96"
          style={{
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'rgba(0,0,0,0.4)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 opacity-15 sm:h-[28rem] sm:w-[28rem]"
          style={{
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'rgba(0,0,0,0.4)',
          }}
        />

        <div className="container-x relative py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-5xl text-center"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-black/70 sm:text-sm">
              Ultimo step
            </span>
            <h2 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
              Ogni giorno senza un sistema
              <br />
              è un giorno di budget sprecato.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-snug sm:text-lg md:text-xl">
              Prenota la tua Growth Call: in 45 minuti capisci dove stai
              perdendo clienti e quanto può rendere un sistema fatto bene.
            </p>

            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="group relative mt-12 inline-flex items-center gap-3 rounded-full bg-brand-black px-10 py-5 text-base font-bold uppercase tracking-wider text-white shadow-[0_18px_60px_-12px_rgba(0,0,0,0.6)] sm:text-lg md:px-14 md:py-6 md:text-xl"
            >
              <span>Prenota la tua call</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-brand-black transition-transform group-hover:translate-x-1 md:h-10 md:w-10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 md:h-5 md:w-5"
                  fill="none"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.button>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-black/75 sm:text-sm">
              {[
                'Gratis',
                '45 minuti',
                'Nessun impegno',
                'Solo 4 slot questa settimana',
              ].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-black" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-sm"
                onClick={() => setOpen(false)}
                role="dialog"
                aria-modal="true"
              >
            <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.96 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-brand-dark p-6 shadow-2xl sm:p-10"
              >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Chiudi"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="text-center">
                <span className="eyebrow">Prenota la tua call</span>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                  Lasciaci i tuoi <span className="text-brand-yellow">contatti</span>
                </h3>
                <p className="mt-2 text-sm text-white/65 sm:text-base">
                  Ti richiamiamo entro 24 ore per fissare insieme l'orario
                  della call.
                </p>
              </div>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                <Field
                  label="Nome e cognome*"
                  name="nome"
                  value={form.nome}
                  onChange={onChange}
                  placeholder="Scrivi il tuo nome e cognome..."
                  required
                />
                <Field
                  label="Email*"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Scrivi la tua email..."
                  required
                />
                <Field
                  label="Telefono*"
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={onChange}
                  placeholder="Scrivi il numero di telefono..."
                  required
                />
                <button type="submit" className="btn-primary mt-2 w-full">
                  {status === 'sending'
                    ? 'Invio in corso…'
                    : status === 'sent'
                    ? 'Richiesta inviata ✓'
                    : 'Conferma prenotazione'}
                </button>
              </form>

              <p className="mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-white/40">
                Gratis · 45 min · Nessun impegno
              </p>
              </motion.div>
            </div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}

function Field({ label, name, ...rest }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/70">
        {label}
      </span>
      <input
        name={name}
        {...rest}
        className="w-full rounded-full border border-white/10 bg-brand-black/60 px-5 py-3.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30"
      />
    </label>
  )
}
