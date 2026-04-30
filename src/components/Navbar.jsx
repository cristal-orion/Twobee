import { useEffect, useState } from 'react'

const nav = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Sistema', href: '#sistema' },
  { label: 'Piani', href: '#piani' },
  { label: 'Team', href: '#team' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <a href="#top" className="relative flex items-center" aria-label="two bee">
          <img
            src="/logo-white.png"
            alt="two bee"
            className="h-12 w-auto sm:h-14 lg:h-16"
            style={{ opacity: 'calc(1 - var(--theme-t))' }}
            draggable={false}
          />
          <img
            src="/logo-black.png"
            alt=""
            aria-hidden
            className="absolute left-0 top-1/2 h-12 w-auto -translate-y-1/2 sm:h-14 lg:h-16"
            style={{ opacity: 'var(--theme-t)' }}
            draggable={false}
          />
        </a>
        <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="pointer-events-auto text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <a
            href="#contatti"
            className="hidden items-center gap-2 rounded-full bg-brand-yellow px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-black transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Prenota un audit gratuito
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
            href="#contatti"
            className="inline-flex items-center rounded-full bg-brand-yellow px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-brand-black sm:hidden"
          >
            Audit
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 lg:hidden"
            aria-label="Menu"
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
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
