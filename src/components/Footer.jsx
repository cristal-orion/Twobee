import { localePath, useLang } from '../i18n/LanguageContext.jsx'

const COPY = {
  it: {
    tagline: 'Sistema di crescita per le PMI',
    linkedinLabel: 'LinkedIn TwoBee',
    instagramLabel: 'Instagram TwoBee',
    careers: 'Lavora con noi',
    game: '🐝 Flappy Twobee',
    privacy: 'Privacy Policy',
    cookie: 'Cookie Policy',
    manageCookies: 'Gestisci cookie',
  },
  en: {
    tagline: 'Growth system for SMEs',
    linkedinLabel: 'LinkedIn TwoBee',
    instagramLabel: 'Instagram TwoBee',
    careers: 'Careers',
    game: '🐝 Flappy Twobee',
    privacy: 'Privacy Policy',
    cookie: 'Cookie Policy',
    manageCookies: 'Manage cookies',
  },
}

function SocialBadge({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-yellow/40 bg-white/[0.04] text-brand-yellow transition hover:bg-brand-yellow hover:text-brand-black"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const lang = useLang()
  const t = COPY[lang]
  return (
    <footer
      className="border-t border-white/5 py-10"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--theme-bg) 60%, transparent)',
      }}
    >
      <div className="container-x flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <div className="font-display text-2xl font-extrabold">
            Two<span className="text-brand-yellow">Bee</span>
          </div>
          <p className="mt-1 text-xs text-white/50">{t.tagline}</p>
          <div className="mt-4 flex items-center justify-center gap-3 sm:justify-start">
            <SocialBadge
              href="https://www.linkedin.com/company/two-bee-growth-performance/"
              label={t.linkedinLabel}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.5 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.28c0-1.5-.03-3.43-2.09-3.43-2.09 0-2.41 1.63-2.41 3.32V22H7.72V8z" />
              </svg>
            </SocialBadge>
            <SocialBadge
              href="https://www.instagram.com/twobee.growth/"
              label={t.instagramLabel}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-.99.05-1.53.21-1.89.35-.47.18-.81.4-1.16.75-.36.36-.57.69-.75 1.16-.14.36-.3.9-.35 1.89C3.05 9.5 3 9.85 3 13s.01 3.5.07 4.74c.05.99.21 1.53.35 1.89.18.47.4.81.75 1.16.36.36.69.57 1.16.75.36.14.9.3 1.89.35 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.99-.05 1.53-.21 1.89-.35.47-.18.81-.4 1.16-.75.36-.36.57-.69.75-1.16.14-.36.3-.9.35-1.89.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-.99-.21-1.53-.35-1.89a3.13 3.13 0 0 0-.75-1.16 3.13 3.13 0 0 0-1.16-.75c-.36-.14-.9-.3-1.89-.35C15.5 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.13-2.04a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
              </svg>
            </SocialBadge>
          </div>
        </div>

        <div className="text-xs leading-relaxed text-white/55">
          <p className="font-medium text-white/70">Two Bee S.r.l.</p>
          <p>Via Guglielmo Marconi 15, 80125 Napoli (NA)</p>
          <p>P.IVA 11030281213</p>
          <p className="mt-2">
            <a
              href="mailto:info@twobee.it"
              className="hover:text-brand-yellow"
            >
              info@twobee.it
            </a>
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 text-xs text-white/55 sm:items-end">
          <a href={localePath('/lavora-con-noi', lang)} className="hover:text-brand-yellow">
            {t.careers}
          </a>
          <a href={localePath('/flappybee', lang)} className="hover:text-brand-yellow">
            {t.game}
          </a>
          <a href="/privacy-policy.html" className="hover:text-brand-yellow">
            {t.privacy}
          </a>
          <a href="/cookie-policy.html" className="hover:text-brand-yellow">
            {t.cookie}
          </a>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event('tb:reopen-consent'))
            }
            className="text-left hover:text-brand-yellow sm:text-right"
          >
            {t.manageCookies}
          </button>
          <p className="mt-2 text-white/40">
            © {new Date().getFullYear()} Two Bee S.r.l.
          </p>
        </div>
      </div>
    </footer>
  )
}
