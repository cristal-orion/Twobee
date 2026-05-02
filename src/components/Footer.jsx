export default function Footer() {
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
          <p className="mt-1 text-xs text-white/50">
            Sistemi di crescita per le PMI del Sud Italia
          </p>
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
          <a href="/privacy-policy.html" className="hover:text-brand-yellow">
            Privacy Policy
          </a>
          <a href="/cookie-policy.html" className="hover:text-brand-yellow">
            Cookie Policy
          </a>
          <p className="mt-2 text-white/40">
            © {new Date().getFullYear()} Two Bee S.r.l.
          </p>
        </div>
      </div>
    </footer>
  )
}
