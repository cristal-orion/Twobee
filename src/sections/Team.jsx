import { motion } from 'framer-motion'

const team = [
  {
    name: 'Marco',
    role: 'Founder & Strategist',
    tag: 'KPI Hunter. Non si ferma finché i conti non tornano.',
    email: 'marco.lucci@twobee.it',
    phone: '+39 123 456 7890',
    photo: '/team-marco.png',
    linkedin: '#',
  },
  {
    name: 'Toto',
    role: 'Growth & Operations',
    tag: 'Profit Maker. Trasforma i click in clienti alto-spendenti.',
    email: 'toto@twobee.it',
    phone: '+39 123 456 7890',
    photo: '/team-toto.png',
    linkedin: '#',
  },
]

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8h4.52v14H.24V8zm7.47 0h4.33v1.92h.06c.6-1.14 2.07-2.35 4.26-2.35 4.56 0 5.4 3 5.4 6.9V22h-4.52v-6.13c0-1.46-.03-3.34-2.03-3.34-2.03 0-2.34 1.58-2.34 3.23V22H7.71V8z" />
  </svg>
)

export default function Team() {
  return (
    <section className="section-y">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
          >
            Le persone dietro la{' '}
            <span className="text-brand-yellow">tua crescita</span>
          </motion.h2>
          <p className="mt-4 text-base text-white/65 sm:text-lg">
            Siamo professionisti che parlano la lingua dell'impresa. Uniamo
            visione strategica e rigore tecnico per costruire un ecosistema di
            crescita che resti un asset della tua azienda.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {team.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-brand-yellow/40"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white/5">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-3xl font-extrabold">
                    {m.name}
                  </h3>
                  <a
                    href={m.linkedin}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow text-brand-black transition hover:brightness-95"
                    aria-label={`LinkedIn ${m.name}`}
                  >
                    <LinkedinIcon />
                  </a>
                </div>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-brand-yellow">
                  {m.role}
                </p>
                <p className="mt-4 text-white/75">{m.tag}</p>
                <div className="mt-6 space-y-2 text-sm text-white/60">
                  <a
                    href={`mailto:${m.email}`}
                    className="block transition hover:text-white"
                  >
                    {m.email}
                  </a>
                  <a
                    href={`tel:${m.phone.replace(/\s/g, '')}`}
                    className="block transition hover:text-white"
                  >
                    {m.phone}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
