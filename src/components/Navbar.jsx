import { useEffect, useState } from 'react'

const nav = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Sistema', href: '#sistema' },
  { label: 'Piani', href: '#piani' },
  { label: 'Risultati', href: '#risultati' },
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
        'fixed inset-x-0 top-0 z-50 transition',
        scrolled
          ? 'border-b border-white/5 bg-brand-dark/80 backdrop-blur-lg'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="font-display text-2xl font-extrabold tracking-tight">
          Two<span className="text-brand-yellow">Bee</span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a href="#contatti" className="btn-primary">
            Prenota Audit
          </a>
        </div>
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
      {open && (
        <div className="border-t border-white/5 bg-brand-dark/95 backdrop-blur lg:hidden">
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
            <a
              href="#contatti"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Prenota Audit
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
