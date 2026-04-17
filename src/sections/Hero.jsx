import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(245,197,24,0.18),_transparent_60%)]" />
      <div className="container-x grid gap-12 pt-28 pb-20 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:pt-40 lg:pb-28">
        <div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-yellow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
            Sistemi di Crescita per le PMI del Sud Italia
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.02] sm:text-5xl md:text-6xl lg:text-[72px]"
          >
            Le agenzie ti vendono follower.
            <br />
            Noi ti vendiamo{' '}
            <span className="text-brand-yellow">FATTURATO.</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-base text-white/70 sm:text-lg"
          >
            Trasformiamo il marketing delle PMI italiane in un sistema di
            acquisizione clienti misurabile, con un impatto diretto sui tuoi
            ricavi.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
            className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <a href="#contatti" className="btn-primary">
              Prenota un Audit Gratuito
            </a>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-yellow" />
              Slot disponibili questa settimana: 4
            </div>
          </motion.div>

          <motion.ul
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap gap-6 text-sm text-white/60"
          >
            {['Gratis', '45 minuti', 'Nessun impegno'].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-brand-yellow"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
            <img
              src="/hero-main.png"
              alt="Dashboard TwoBee"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 max-w-[280px] rounded-2xl border border-brand-yellow/30 bg-brand-black/90 p-5 backdrop-blur sm:-bottom-8 sm:-left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-brand-black">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d="M3 17l6-6 4 4 8-8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="font-display text-2xl font-extrabold text-brand-yellow">
                  +47.000€
                </div>
                <div className="text-xs text-white/70">
                  fatturato incrementale in 90 giorni
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
