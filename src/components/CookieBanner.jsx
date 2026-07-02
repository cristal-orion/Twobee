import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

const COPY = {
  it: {
    cardTitle: 'Cookie e privacy',
    cardBody:
      'Usiamo cookie tecnici (sempre attivi) e, con il tuo consenso, cookie di statistica e marketing per capire cosa funziona meglio.',
    details: 'Dettagli',
    acceptAll: 'Accetta tutti',
    rejectAll: 'Rifiuta tutti',
    manage: 'Gestisci',
    modalTitle: 'Le tue preferenze cookie',
    modalBody:
      'Scegli quali categorie autorizzare. Puoi cambiare idea in ogni momento dal footer.',
    close: 'Chiudi',
    necessary: {
      title: 'Necessari',
      description:
        'Cookie tecnici e di sicurezza essenziali al funzionamento del sito. Sempre attivi.',
    },
    statistics: {
      title: 'Statistiche',
      description:
        'Ci aiutano a capire come viene usato il sito (Google Analytics, in forma aggregata).',
    },
    marketing: {
      title: 'Marketing',
      description:
        "Permettono di mostrarti annunci pertinenti e misurare l'efficacia delle campagne.",
    },
    savePrefs: 'Salva preferenze',
    footerPre: 'Vedi la',
    footerAnd: 'e la',
    privacy: 'Privacy Policy',
    cookie: 'Cookie Policy',
  },
  en: {
    cardTitle: 'Cookies & privacy',
    cardBody:
      'We use technical cookies (always on) and, with your consent, statistics and marketing cookies to understand what works best.',
    details: 'Details',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    manage: 'Manage',
    modalTitle: 'Your cookie preferences',
    modalBody:
      'Choose which categories to allow. You can change your mind anytime from the footer.',
    close: 'Close',
    necessary: {
      title: 'Necessary',
      description:
        'Technical and security cookies essential for the site to work. Always on.',
    },
    statistics: {
      title: 'Statistics',
      description:
        'Help us understand how the site is used (Google Analytics, in aggregate form).',
    },
    marketing: {
      title: 'Marketing',
      description: 'Let us show you relevant ads and measure campaign effectiveness.',
    },
    savePrefs: 'Save preferences',
    footerPre: 'See the',
    footerAnd: 'and the',
    privacy: 'Privacy Policy',
    cookie: 'Cookie Policy',
  },
}

const STORAGE_KEY = 'tb_consent_v1'
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

const DEFAULT_CHOICES = { statistics: false, marketing: false }
const ALL_GRANTED = { statistics: true, marketing: true }

function pushConsentUpdate(choices) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: choices.statistics ? 'granted' : 'denied',
    ad_storage: choices.marketing ? 'granted' : 'denied',
    ad_user_data: choices.marketing ? 'granted' : 'denied',
    ad_personalization: choices.marketing ? 'granted' : 'denied',
  })
}

function persist(choices) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ choices, timestamp: Date.now() })
    )
  } catch (e) {}
}

function readSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.choices) return null
    if (!parsed.timestamp || Date.now() - parsed.timestamp > MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed.choices
  } catch (e) {
    return null
  }
}

export default function CookieBanner() {
  const lang = useLang()
  const t = COPY[lang]
  const [view, setView] = useState('closed')
  const [choices, setChoices] = useState(DEFAULT_CHOICES)

  useEffect(() => {
    const saved = readSaved()
    if (saved) {
      setChoices(saved)
      setView('closed')
    } else {
      setView('card')
    }

    const handleReopen = () => {
      setChoices(readSaved() || DEFAULT_CHOICES)
      setView('modal')
    }
    window.addEventListener('tb:reopen-consent', handleReopen)
    return () => window.removeEventListener('tb:reopen-consent', handleReopen)
  }, [])

  if (view === 'closed') return null

  const acceptAll = () => {
    persist(ALL_GRANTED)
    pushConsentUpdate(ALL_GRANTED)
    setChoices(ALL_GRANTED)
    setView('closed')
  }

  const rejectAll = () => {
    persist(DEFAULT_CHOICES)
    pushConsentUpdate(DEFAULT_CHOICES)
    setChoices(DEFAULT_CHOICES)
    setView('closed')
  }

  const savePrefs = () => {
    persist(choices)
    pushConsentUpdate(choices)
    setView('closed')
  }

  const closeFromModal = () => {
    setView(readSaved() ? 'closed' : 'card')
  }

  if (view === 'card') {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-[100] sm:left-auto sm:max-w-sm">
        <div className="rounded-2xl border border-brand-yellow/40 bg-brand-black/95 p-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <div className="font-display text-base font-extrabold text-white">
            {t.cardTitle}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {t.cardBody}{' '}
            <a href="/cookie-policy.html" className="underline hover:text-brand-yellow">
              {t.details}
            </a>
            .
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={acceptAll}
              className="flex-1 rounded-full bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-black transition hover:brightness-95"
            >
              {t.acceptAll}
            </button>
            <button
              onClick={rejectAll}
              className="flex-1 rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:border-white/50"
            >
              {t.rejectAll}
            </button>
            <button
              onClick={() => setView('modal')}
              className="flex-1 rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:border-white/50"
            >
              {t.manage}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeFromModal()
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-brand-yellow/40 bg-brand-black p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-display text-xl font-extrabold text-white">
              {t.modalTitle}
            </div>
            <p className="mt-1 text-sm text-white/60">{t.modalBody}</p>
          </div>
          <button
            onClick={closeFromModal}
            aria-label={t.close}
            className="text-2xl leading-none text-white/50 transition hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <ConsentRow
            title={t.necessary.title}
            description={t.necessary.description}
            checked
            disabled
          />
          <ConsentRow
            title={t.statistics.title}
            description={t.statistics.description}
            checked={choices.statistics}
            onChange={(v) => setChoices((c) => ({ ...c, statistics: v }))}
          />
          <ConsentRow
            title={t.marketing.title}
            description={t.marketing.description}
            checked={choices.marketing}
            onChange={(v) => setChoices((c) => ({ ...c, marketing: v }))}
          />
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={acceptAll}
            className="flex-1 rounded-full bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-black transition hover:brightness-95"
          >
            {t.acceptAll}
          </button>
          <button
            onClick={rejectAll}
            className="flex-1 rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:border-white/50"
          >
            {t.rejectAll}
          </button>
          <button
            onClick={savePrefs}
            className="flex-1 rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:border-white/50"
          >
            {t.savePrefs}
          </button>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-white/40">
          {t.footerPre}{' '}
          <a href="/privacy-policy.html" className="underline hover:text-brand-yellow">
            {t.privacy}
          </a>{' '}
          {t.footerAnd}{' '}
          <a href="/cookie-policy.html" className="underline hover:text-brand-yellow">
            {t.cookie}
          </a>
          .
        </p>
      </div>
    </div>
  )
}

function ConsentRow({ title, description, checked, disabled, onChange }) {
  return (
    <label
      className={`flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition ${
        disabled ? 'opacity-70' : 'cursor-pointer hover:border-white/25'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-brand-yellow"
      />
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-xs leading-relaxed text-white/60">{description}</div>
      </div>
    </label>
  )
}
