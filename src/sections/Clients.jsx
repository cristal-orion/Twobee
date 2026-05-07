export default function Clients() {
  const logos = [
    'SARTORIA CONDOTTI',
    'ICURA',
    'AFFINITY',
    'ELETTRA',
    'INDUSTRIAL',
    'SEVEN',
    'JOSÉ',
  ]
  return (
    <section className="py-12">
      <div className="container-x">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          Hanno scelto TwoBee
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {logos.map((l) => (
            <span
              key={l}
              className="font-display text-lg font-bold uppercase tracking-[0.2em] text-white/40 transition hover:text-white/80"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
