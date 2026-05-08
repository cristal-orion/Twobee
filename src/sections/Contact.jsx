import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_jjfdxbn'
const EMAILJS_TEMPLATE_ID = 'template_peotzqb'
const EMAILJS_PUBLIC_KEY = 'gHeKJYysSLwOsJUcT'

function normalizePhone(raw) {
  const cleaned = String(raw || '').replace(/[\s\-().]/g, '')
  if (!cleaned) return null
  if (cleaned.startsWith('+')) return cleaned
  if (cleaned.startsWith('00')) return '+' + cleaned.slice(2)
  return '+39' + cleaned
}

function splitName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/)
  if (parts.length === 0) return { first: '', last: '' }
  if (parts.length === 1) return { first: parts[0], last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

function pushFormSubmitEvent(form) {
  if (typeof window === 'undefined') return
  const { first, last } = splitName(form.nome)
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'form_submit',
    form_id: 'audit_request',
    form_location: 'landing_main',
    user_data: {
      email: form.email,
      first_name: first,
      last_name: last,
      phone_number: normalizePhone(form.telefono),
      organization: form.azienda.trim() || null,
    },
    properties: {
      Sorgente: 'Landing TwoBee - Form Audit Gratuito',
      Azienda: form.azienda.trim() || null,
      Messaggio: form.messaggio.trim() || null,
      'Data richiesta': new Date().toISOString(),
    },
  })
}

export default function Contact() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    azienda: '',
    email: '',
    telefono: '',
    messaggio: '',
    privacy: false,
  })
  const [status, setStatus] = useState('idle')

  const onChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const closeModal = () => {
    setOpen(false)
    setTimeout(() => {
      setForm({
        nome: '',
        azienda: '',
        email: '',
        telefono: '',
        messaggio: '',
        privacy: false,
      })
      setStatus('idle')
    }, 300)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nome: form.nome,
          azienda: form.azienda,
          email: form.email,
          telefono: form.telefono,
          messaggio: form.messaggio.trim() || '(nessun messaggio)',
          reply_to: form.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      pushFormSubmitEvent(form)
      setStatus('sent')
    } catch (err) {
      console.error('EmailJS error', err)
      setStatus('error')
    }
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
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
              {['Gratis', '45 minuti', 'Costruiamo insieme'].map((t) => (
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
                onClick={closeModal}
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
                onClick={closeModal}
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

              {status === 'sent' ? (
                <ThankYou onClose={closeModal} />
              ) : (
                <>
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
                  label="Azienda*"
                  name="azienda"
                  value={form.azienda}
                  onChange={onChange}
                  placeholder="Scrivi il nome della tua azienda..."
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
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/70">
                    Messaggio
                  </span>
                  <textarea
                    name="messaggio"
                    value={form.messaggio}
                    onChange={onChange}
                    rows={4}
                    placeholder="Raccontaci brevemente di cosa hai bisogno (facoltativo)..."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-brand-black/60 px-5 py-3.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30"
                  />
                </label>

                <label className="mt-1 flex items-start gap-3 text-left text-xs leading-relaxed text-white/65">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={form.privacy}
                    onChange={onChange}
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-brand-yellow"
                  />
                  <span>
                    Ho letto la{' '}
                    <a
                      href="/privacy-policy.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-brand-yellow"
                    >
                      Privacy Policy
                    </a>{' '}
                    e autorizzo Two Bee S.r.l. a trattare i miei dati per essere ricontattato/a in merito alla mia richiesta.*
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'sending'
                    ? 'Invio in corso…'
                    : status === 'sent'
                    ? 'Richiesta inviata ✓'
                    : status === 'error'
                    ? 'Errore, riprova'
                    : 'Conferma prenotazione'}
                </button>
                {status === 'error' && (
                  <p className="text-center text-xs text-red-400">
                    Qualcosa è andato storto. Riprova o scrivici a{' '}
                    <a href="mailto:info@twobee.it" className="underline">
                      info@twobee.it
                    </a>
                    .
                  </p>
                )}
              </form>

              <p className="mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-white/40">
                Gratis · 45 min · Costruiamo insieme
              </p>
                </>
              )}
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

function ThankYou({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="py-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.1,
          duration: 0.5,
          type: 'spring',
          stiffness: 260,
          damping: 18,
        }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow text-brand-black shadow-[0_0_60px_-10px_rgba(255,197,1,0.6)]"
      >
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <h3 className="mt-7 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
        Richiesta <span className="text-brand-yellow">inviata</span>
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/70 sm:text-base">
        Grazie! Abbiamo ricevuto i tuoi contatti. Ti richiameremo entro
        24 ore per fissare insieme l'orario della call.
      </p>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
        <li className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
          Entro 24 ore
        </li>
        <li className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
          Nessun impegno
        </li>
      </ul>

      <button
        type="button"
        onClick={onClose}
        className="btn-primary mt-8 w-full"
      >
        Torna al sito
      </button>
    </motion.div>
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
