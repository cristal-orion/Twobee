import { useEffect, useState } from 'react'
import { localePath, useLang } from '../i18n/LanguageContext.jsx'

const COPY = {
  it: {
    nav: [
      { label: 'Servizi', href: '#servizi' },
      { label: 'Sistema', href: '#sistema' },
      { label: 'Piani', href: '#piani' },
      { label: 'Team', href: '#team' },
      { label: 'Case study', href: '/casestudy', pill: true },
      { label: 'Lavora con noi', href: '/lavora-con-noi' },
    ],
    cta: 'Prenota un audit gratuito',
    ctaShort: 'Audit',
    menuLabel: 'Menu',
  },
  en: {
    nav: [
      { label: 'Services', href: '#servizi' },
      { label: 'System', href: '#sistema' },
      { label: 'Plans', href: '#piani' },
      { label: 'Team', href: '#team' },
      { label: 'Case studies', href: '/casestudy', pill: true },
      { label: 'Careers', href: '/lavora-con-noi' },
    ],
    cta: 'Book a free audit',
    ctaShort: 'Audit',
    menuLabel: 'Menu',
  },
}

export default function Navbar({ subpage = false, landing = false }) {
  const lang = useLang()
  const t = COPY[lang]
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // In una sottopagina le ancore (#servizi…) devono prima tornare alla home.
  const resolve = (href) =>
    href.startsWith('#')
      ? subpage
        ? `${localePath('/', lang)}${href}`
        : href
      : localePath(href, lang)
  const homeHref = subpage || landing ? localePath('/', lang) : '#top'
  const ctaHref = resolve('#contatti')

  // Path corrente senza prefisso /en: è la destinazione dello switch di lingua,
  // quindi va letto dall'URL e non dedotto dal tipo di pagina (con `subpage`
  // fisso, ogni sottopagina rimandava a /lavora-con-noi cambiando lingua).
  const bare =
    typeof window === 'undefined'
      ? '/'
      : (window.location.pathname.replace(/\/+$/, '') || '/').replace(
          /^\/en(?=\/|$)/,
          ''
        ) || '/'
  const hash = typeof window !== 'undefined' ? window.location.hash : ''

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Variante landing (es. /test-crescita): navbar pura, senza menu.
  // Solo il logo TwoBee a destra, che riporta al sito completo.
  if (landing) {
    return (
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          scrolled ? 'border-b border-white/5 backdrop-blur-xl' : 'bg-transparent',
        ].join(' ')}
        style={
          scrolled
            ? {
                backgroundColor:
                  'color-mix(in srgb, var(--theme-bg) 70%, transparent)',
              }
            : undefined
        }
      >
        <div className="container-x relative flex h-20 items-center sm:h-24">
          <a
            href={homeHref}
            className="relative ml-auto flex items-center transition-transform hover:scale-[1.03]"
            aria-label="two bee — vai al sito completo"
            title="Vai al sito completo"
          >
            <img
              src="/logo-white.webp"
              alt="two bee"
              className="h-12 w-auto sm:h-14 lg:h-16"
              style={{ opacity: 'calc(1 - var(--theme-t))' }}
              draggable={false}
            />
            <img
              src="/logo-black.webp"
              alt=""
              aria-hidden
              className="absolute left-0 top-1/2 h-12 w-auto -translate-y-1/2 sm:h-14 lg:h-16"
              style={{ opacity: 'var(--theme-t)' }}
              draggable={false}
            />
          </a>
        </div>
      </header>
    )
  }

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-white/5 backdrop-blur-xl'
          : 'bg-transparent',
      ].join(' ')}
      style={
        scrolled
          ? {
              backgroundColor:
                'color-mix(in srgb, var(--theme-bg) 70%, transparent)',
            }
          : undefined
      }
    >
      <div className="container-x relative flex h-20 items-center sm:h-24">
        <a href={homeHref} className="relative flex items-center" aria-label="two bee">
          <img
            src="/logo-white.webp"
            alt="two bee"
            className="h-12 w-auto sm:h-14 lg:h-16"
            style={{ opacity: 'calc(1 - var(--theme-t))' }}
            draggable={false}
          />
          <img
            src="/logo-black.webp"
            alt=""
            aria-hidden
            className="absolute left-0 top-1/2 h-12 w-auto -translate-y-1/2 sm:h-14 lg:h-16"
            style={{ opacity: 'var(--theme-t)' }}
            draggable={false}
          />
        </a>
        <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex xl:gap-10">
          {t.nav.map((n) => (
            <a
              key={n.href}
              href={resolve(n.href)}
              className={
                n.pill
                  ? 'pointer-events-auto whitespace-nowrap rounded-full border border-white/30 px-4 py-1.5 text-sm font-medium text-white/85 transition-colors hover:border-white/70 hover:text-white'
                  : 'pointer-events-auto text-sm font-medium text-white/60 transition-colors hover:text-white'
              }
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-0.5 rounded-full border border-white/15 p-0.5 text-[11px] font-bold uppercase tracking-wider sm:flex">
            {['it', 'en'].map((l) => (
              <a
                key={l}
                href={localePath(bare, l) + hash}
                aria-current={lang === l ? 'true' : undefined}
                className={
                  lang === l
                    ? 'rounded-full bg-brand-yellow px-2.5 py-1 text-brand-black'
                    : 'px-2.5 py-1 text-white/50 transition-colors hover:text-white'
                }
              >
                {l.toUpperCase()}
              </a>
            ))}
          </div>
          <a
            href={ctaHref}
            className="hidden items-center gap-2 rounded-full bg-brand-yellow px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-black transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            {t.cta}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={ctaHref}
            className="inline-flex items-center rounded-full bg-brand-yellow px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-brand-black sm:hidden"
          >
            {t.ctaShort}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 lg:hidden"
            aria-label={t.menuLabel}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 7h16M4 12h16M4 17h16'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div
          className="border-t border-white/5 backdrop-blur lg:hidden"
          style={{
            backgroundColor:
              'color-mix(in srgb, var(--theme-bg) 95%, transparent)',
          }}
        >
          <div className="container-x flex flex-col gap-1 py-4">
            {t.nav.map((n) => (
              <a
                key={n.href}
                href={resolve(n.href)}
                onClick={() => setOpen(false)}
                className={
                  n.pill
                    ? 'my-1 ml-3 self-start rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white/90'
                    : 'rounded-lg px-3 py-3 text-sm font-medium text-white/80 hover:bg-white/5'
                }
              >
                {n.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-white/5 px-3 pt-4">
              {['it', 'en'].map((l) => (
                <a
                  key={l}
                  href={localePath(bare, l) + hash}
                  aria-current={lang === l ? 'true' : undefined}
                  className={
                    lang === l
                      ? 'rounded-full bg-brand-yellow px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-black'
                      : 'rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/50 hover:text-white'
                  }
                >
                  {l.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
