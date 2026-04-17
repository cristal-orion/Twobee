export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/60 py-12">
      <div className="container-x flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <div className="font-display text-2xl font-extrabold">
            Two<span className="text-brand-yellow">Bee</span>
          </div>
          <p className="mt-1 text-xs text-white/50">TwoBee s.r.l.</p>
        </div>
        <div className="text-xs text-white/50">
          © 2026 TwoBee s.r.l. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
