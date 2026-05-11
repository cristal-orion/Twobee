import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_jjfdxbn'
const EMAILJS_TEMPLATE_ID = 'template_q23yfgx'
const EMAILJS_PUBLIC_KEY = 'gHeKJYysSLwOsJUcT'

const STORAGE_KEY = 'tb_insights_popup_v1'
const SHOW_AFTER_MS = 25000

function alreadySeen() {
  try {
    return Boolean(localStorage.getItem(STORAGE_KEY))
  } catch {
    return false
  }
}

function markSeen(status) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ status, timestamp: Date.now() })
    )
  } catch {}
}

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    azienda: '',
    email: '',
    privacy: false,
  })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (alreadySeen()) return
    const timer = setTimeout(() => setOpen(true), SHOW_AFTER_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') dismiss()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const dismiss = () => {
    if (status !== 'sent') markSeen('dismissed')
    setOpen(false)
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
          reply_to: form.email,
          sorgente: 'Popup insights - Landing TwoBee',
          data_iscrizione: new Date().toISOString(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'form_submit',
          form_id: 'insights_optin',
          form_location: 'popup_first_visit',
          user_data: {
            email: form.email,
            first_name: form.nome.split(/\s+/)[0] || '',
            organization: form.azienda.trim() || null,
          },
          properties: {
            Sorgente: 'Popup insights - Landing TwoBee',
            Azienda: form.azienda.trim() || null,
            'Data iscrizione': new Date().toISOString(),
          },
        })
      }
      markSeen('submitted')
      setStatus('sent')
    } catch (err) {
      console.error('EmailJS insights error', err)
      setStatus('error')
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[105] overflow-y-auto bg-black/75 backdrop-blur-sm"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-labelledby="insights-popup-title"
        >
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-brand-dark p-6 shadow-2xl sm:p-9"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 opacity-20"
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: '#FFC501',
                }}
              />

              <button
                type="button"
                onClick={dismiss}
                aria-label="Chiudi"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
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
                <ThankYou onClose={() => setOpen(false)} />
              ) : (
                <div className="relative">
                  <span className="eyebrow">Insight diretti, zero spam</span>
                  <h3
                    id="insights-popup-title"
                    className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl"
                  >
                    Consigli su <span className="text-brand-yellow">metriche, AI e growth</span>,
                    una volta al mese.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                    Niente newsletter generica. Solo cose che usiamo davvero
                    con i nostri clienti: framework, numeri, esperimenti che
                    funzionano.
                  </p>

                  <form onSubmit={onSubmit} className="mt-6 grid gap-3.5">
                    <Field
                      label="Nome e cognome*"
                      name="nome"
                      value={form.nome}
                      onChange={onChange}
                      placeholder="Come ti chiami?"
                      required
                    />
                    <Field
                      label="Azienda*"
                      name="azienda"
                      value={form.azienda}
                      onChange={onChange}
                      placeholder="Nome della tua azienda"
                      required
                    />
                    <Field
                      label="Email*"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="La tua email di lavoro"
                      required
                    />

                    <label className="mt-1 flex items-start gap-3 text-left text-xs leading-relaxed text-white/60">
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
                        e autorizzo Two Bee S.r.l. a inviarmi insight via email. Posso disiscrivermi in qualsiasi momento.*
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'sending'
                        ? 'Invio in corso…'
                        : status === 'error'
                        ? 'Errore, riprova'
                        : 'Voglio gli insight'}
                    </button>
                    {status === 'error' && (
                      <p className="text-center text-xs text-red-400">
                        Qualcosa è andato storto. Riprova o scrivici a{' '}
                        <a
                          href="mailto:info@twobee.it"
                          className="underline"
                        >
                          info@twobee.it
                        </a>
                        .
                      </p>
                    )}
                  </form>

                  <button
                    type="button"
                    onClick={dismiss}
                    className="mt-4 block w-full text-center text-[11px] uppercase tracking-[0.2em] text-white/35 transition hover:text-white/60"
                  >
                    No grazie, continuo a esplorare
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

function ThankYou({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="py-3 text-center"
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
        Sei <span className="text-brand-yellow">dentro</span>.
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/70 sm:text-base">
        Ti arriverà a breve il primo insight via email. Senza spam, senza
        rumore: solo cose che usiamo davvero.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="btn-primary mt-7 w-full"
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
