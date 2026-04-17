import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ nome: '', email: '', telefono: '' })
  const [status, setStatus] = useState('idle')

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 600)
  }

  return (
    <section id="contatti" className="relative overflow-hidden section-y">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_rgba(245,197,24,0.25),_transparent_60%)]"
      />
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Ogni giorno senza un sistema è un giorno di{' '}
            <span className="text-brand-yellow">budget sprecato.</span>
          </h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Smetti di tentare la fortuna con le Ads. Prenota la tua Growth Call
            e prendi il controllo dei tuoi numeri.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mx-auto mt-12 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10"
        >
          <div className="grid gap-5">
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
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-2 text-xs font-semibold text-brand-yellow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-yellow" />
            Slot disponibili questa settimana: 4
          </div>

          <button type="submit" className="btn-primary mt-6 w-full">
            {status === 'sending'
              ? 'Invio in corso…'
              : status === 'sent'
              ? 'Richiesta inviata ✓'
              : 'Prenota un Audit Gratuito'}
          </button>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-white/60">
            {['Gratis', '45 minuti', 'Nessun impegno'].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <span className="text-brand-yellow">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </motion.form>
      </div>
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
