import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { localePath, useLang } from '../i18n/LanguageContext.jsx'
import { sendLeadEmail, pushLeadFormEvent } from '../lib/leadEmail.js'

const COPY = {
  it: {
    eyebrowTop: 'Ultimo step',
    heading1: 'Ogni giorno senza un sistema',
    heading2: 'è un giorno di budget sprecato.',
    subhead:
      'Prenota la tua Growth Call: in 45 minuti capisci dove stai perdendo clienti e quanto può rendere un sistema fatto bene.',
    ctaMain: 'PRENOTA LA TUA CALL',
    tags: ['Gratis', '45 minuti', 'Costruiamo insieme'],
    testPre: 'Non sei ancora pronto per una call?',
    testLink: 'Fai il test in 90 secondi',
    close: 'Chiudi',
    modalEyebrow: 'Prenota la tua call',
    modalHeadingPre: 'Lasciaci i tuoi ',
    modalHeadingHighlight: 'contatti',
    modalSubhead:
      "Ti richiamiamo entro 24 ore per fissare insieme l'orario della call.",
    fields: {
      nome: { label: 'Nome e cognome*', placeholder: 'Scrivi il tuo nome e cognome...' },
      azienda: { label: 'Azienda*', placeholder: 'Scrivi il nome della tua azienda...' },
      email: { label: 'Email*', placeholder: 'Scrivi la tua email...' },
      telefono: { label: 'Telefono*', placeholder: 'Scrivi il numero di telefono...' },
      messaggio: {
        label: 'Messaggio',
        placeholder: 'Raccontaci brevemente di cosa hai bisogno (facoltativo)...',
      },
    },
    privacyPre: 'Ho letto la',
    privacyLink: 'Privacy Policy',
    privacyPost:
      ' e autorizzo Two Bee S.r.l. a trattare i miei dati per essere ricontattato/a in merito alla mia richiesta.*',
    submitSending: 'Invio in corso…',
    submitSent: 'Richiesta inviata ✓',
    submitError: 'Errore, riprova',
    submitIdle: 'Conferma prenotazione',
    errorMsg: 'Qualcosa è andato storto. Riprova o scrivici a',
    footerTags: 'Gratis · 45 min · Costruiamo insieme',
    thankYouHeadingPre: 'Richiesta ',
    thankYouHeadingHighlight: 'inviata',
    thankYouBody:
      "Grazie! Abbiamo ricevuto i tuoi contatti. Ti richiameremo entro 24 ore per fissare insieme l'orario della call.",
    thankYouTag1: 'Entro 24 ore',
    thankYouTag2: 'Nessun impegno',
    thankYouCta: 'Torna al sito',
  },
  en: {
    eyebrowTop: 'Last step',
    heading1: 'Every day without a system',
    heading2: 'is a day of wasted budget.',
    subhead:
      "Book your Growth Call: in 45 minutes you'll see where you're losing customers and what a well-built system can be worth.",
    ctaMain: 'BOOK YOUR CALL',
    tags: ['Free', '45 minutes', "Let's build it together"],
    testPre: 'Not ready for a call yet?',
    testLink: 'Take the 90-second test',
    close: 'Close',
    modalEyebrow: 'Book your call',
    modalHeadingPre: 'Leave us your ',
    modalHeadingHighlight: 'details',
    modalSubhead:
      "We'll call you back within 24 hours to set up the call time together.",
    fields: {
      nome: { label: 'Full name*', placeholder: 'Enter your full name...' },
      azienda: { label: 'Company*', placeholder: 'Enter your company name...' },
      email: { label: 'Email*', placeholder: 'Enter your email...' },
      telefono: { label: 'Phone*', placeholder: 'Enter your phone number...' },
      messaggio: {
        label: 'Message',
        placeholder: 'Briefly tell us what you need (optional)...',
      },
    },
    privacyPre: "I've read the",
    privacyLink: 'Privacy Policy',
    privacyPost:
      ' and I authorize Two Bee S.r.l. to process my data to be contacted about my request.*',
    submitSending: 'Sending…',
    submitSent: 'Request sent ✓',
    submitError: 'Error, try again',
    submitIdle: 'Confirm booking',
    errorMsg: 'Something went wrong. Try again or email us at',
    footerTags: "Free · 45 min · Let's build it together",
    thankYouHeadingPre: 'Request ',
    thankYouHeadingHighlight: 'sent',
    thankYouBody:
      "Thank you! We've received your details. We'll call you back within 24 hours to set up the call time together.",
    thankYouTag1: 'Within 24 hours',
    thankYouTag2: 'No commitment',
    thankYouCta: 'Back to the site',
  },
}

export default function Contact() {
  const lang = useLang()
  const t = COPY[lang]
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
      await sendLeadEmail(form)
      pushLeadFormEvent({
        form,
        formId: 'audit_request',
        formLocation: 'landing_main',
        sorgente: 'Landing TwoBee - Form Audit Gratuito',
      })
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
              {t.eyebrowTop}
            </span>
            <h2 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
              {t.heading1}
              <br />
              {t.heading2}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-snug sm:text-lg md:text-xl">
              {t.subhead}
            </p>

            <button
              type="button"
              className="group relative mt-12 inline-flex items-center gap-3 rounded-full bg-brand-black px-10 py-5 text-base font-bold uppercase tracking-wider text-white shadow-[0_18px_60px_-12px_rgba(0,0,0,0.6)] sm:text-lg md:px-14 md:py-6 md:text-xl"
              onClick={() => {
                window._klOnsite = window._klOnsite || []
                window._klOnsite.push(['openForm', 'XNsUQ9'])
              }}
            >
              {t.ctaMain}
            </button>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-black/75 sm:text-sm">
              {t.tags.map((tag) => (
                <li key={tag} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-black" />
                  {tag}
                </li>
              ))}
            </ul>

            {/* Uscita laterale per chi arriva in fondo e non prenota: la
                scorecard chiede molto meno di una call e resta un lead. */}
            <p className="mt-8 text-sm font-medium text-brand-black/70">
              {t.testPre}{' '}
              <a
                href={localePath('/test-crescita', lang)}
                onClick={() => {
                  window.dataLayer = window.dataLayer || []
                  window.dataLayer.push({
                    event: 'test_promo_click',
                    location: 'contact',
                    cta: 'text',
                  })
                }}
                className="font-bold underline decoration-brand-black/30 underline-offset-4 transition hover:decoration-brand-black"
              >
                {t.testLink} →
              </a>
            </p>
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
                aria-label={t.close}
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
                <ThankYou onClose={closeModal} lang={lang} />
              ) : (
                <>
              <div className="text-center">
                <span className="eyebrow">{t.modalEyebrow}</span>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                  {t.modalHeadingPre}
                  <span className="text-brand-yellow">{t.modalHeadingHighlight}</span>
                </h3>
                <p className="mt-2 text-sm text-white/65 sm:text-base">
                  {t.modalSubhead}
                </p>
              </div>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                <Field
                  label={t.fields.nome.label}
                  name="nome"
                  value={form.nome}
                  onChange={onChange}
                  placeholder={t.fields.nome.placeholder}
                  required
                />
                <Field
                  label={t.fields.azienda.label}
                  name="azienda"
                  value={form.azienda}
                  onChange={onChange}
                  placeholder={t.fields.azienda.placeholder}
                  required
                />
                <Field
                  label={t.fields.email.label}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder={t.fields.email.placeholder}
                  required
                />
                <Field
                  label={t.fields.telefono.label}
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={onChange}
                  placeholder={t.fields.telefono.placeholder}
                  required
                />
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/70">
                    {t.fields.messaggio.label}
                  </span>
                  <textarea
                    name="messaggio"
                    value={form.messaggio}
                    onChange={onChange}
                    rows={4}
                    placeholder={t.fields.messaggio.placeholder}
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
                    {t.privacyPre}{' '}
                    <a
                      href="/privacy-policy.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-brand-yellow"
                    >
                      {t.privacyLink}
                    </a>
                    {t.privacyPost}
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'sending'
                    ? t.submitSending
                    : status === 'sent'
                    ? t.submitSent
                    : status === 'error'
                    ? t.submitError
                    : t.submitIdle}
                </button>
                {status === 'error' && (
                  <p className="text-center text-xs text-red-400">
                    {t.errorMsg}{' '}
                    <a href="mailto:info@twobee.it" className="underline">
                      info@twobee.it
                    </a>
                    .
                  </p>
                )}
              </form>

              <p className="mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-white/40">
                {t.footerTags}
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

function ThankYou({ onClose, lang }) {
  const t = COPY[lang]
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
        {t.thankYouHeadingPre}
        <span className="text-brand-yellow">{t.thankYouHeadingHighlight}</span>
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/70 sm:text-base">
        {t.thankYouBody}
      </p>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
        <li className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
          {t.thankYouTag1}
        </li>
        <li className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
          {t.thankYouTag2}
        </li>
      </ul>

      <button
        type="button"
        onClick={onClose}
        className="btn-primary mt-8 w-full"
      >
        {t.thankYouCta}
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
