import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Le agenzie ti vendono follower.
          <br />
          <span className="text-brand-yellow">Noi ti vendiamo FATTURATO.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mt-6 text-base text-white/70 sm:text-lg md:text-xl"
        >
          Costruiamo il tuo sistema di acquisizione clienti basato su KPI di
          fatturato reale, non follower.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="mt-10"
        >
          <a
            href="#contatti"
            className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-8 py-4 text-base font-semibold text-brand-black transition hover:scale-105"
          >
            Prenota la tua Growth Call
          </a>
        </motion.div>
      </div>
    </section>
  )
}
