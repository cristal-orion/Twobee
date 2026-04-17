import { motion } from 'framer-motion'

export default function CaseStudy() {
  return (
    <section className="section-y border-t border-white/5 bg-black/40">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
          >
            Risultati. <span className="text-brand-yellow">Senza filtri.</span>
          </motion.h2>
          <p className="mt-4 text-base text-white/65 sm:text-lg">
            Settori diversi, obiettivi differenti, lo stesso comune
            denominatore: un ritorno sull'investimento tracciato in euro, non
            in vanity metrics.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-12 grid gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div>
            <h3 className="font-display text-3xl font-extrabold">
              LogixStream Solutions
            </h3>
            <p className="mt-1 text-sm uppercase tracking-widest text-brand-yellow">
              Software ERP per la Logistica
            </p>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-white/75">
              <div>
                <div className="font-bold text-white">Problema</div>
                <p className="mt-1 text-white/65">
                  L'azienda generava molti contatti da LinkedIn, ma la maggior
                  parte erano figure junior senza potere decisionale o aziende
                  troppo piccole per il loro software.
                </p>
              </div>
              <div>
                <div className="font-bold text-white">Soluzione</div>
                <p className="mt-1 text-white/65">
                  Abbiamo implementato una strategia di Account Based Marketing
                  (ABM) su LinkedIn, filtrando i lead attraverso un White Paper
                  tecnico che richiedeva la qualifica aziendale obbligatoria
                  nel form.
                </p>
              </div>
              <div>
                <div className="font-bold text-white">Risultato</div>
                <p className="mt-1 text-white/65">
                  Tasso di conversione in SQL <span className="text-brand-yellow font-bold">+40%</span>. Il costo per ogni opportunità reale
                  creata per i commerciali è sceso del <span className="text-brand-yellow font-bold">25%</span>, eliminando i
                  contatti non in target.
                </p>
              </div>
            </div>
            <a href="#contatti" className="btn-primary mt-8">
              Prenota un Audit Gratuito
            </a>
          </div>

          <div className="relative">
            <img
              src="/hero-dashboard.png"
              alt="LogixStream Dashboard"
              className="w-full rounded-2xl border border-white/10 object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
