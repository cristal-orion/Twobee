import { motion } from 'framer-motion'

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const founders = [
  {
    key: 'marco',
    name: 'Marco',
    role: 'Founder & Strategist',
    tag: 'KPI Hunter. Non si ferma finché i conti non tornano.',
    photo: '/team-marco.jpeg',
    initials: 'M',
  },
  {
    key: 'toto',
    name: 'Toto',
    role: 'Growth & Operations',
    tag: 'Profit Maker. Trasforma i click in clienti alto-spendenti.',
    photo: '/team-toto.jpeg',
    initials: 'T',
  },
]

const teamMembers = [
  {
    key: 'sabrina',
    name: 'Sabrina',
    role: 'Marketing',
    tag: '',
    photo: '/team-sabrina.jpeg',
    initials: 'S',
  },
  {
    key: 'michele',
    name: 'Michele',
    role: 'IT Specialist',
    tag: '',
    photo: '/team-michele.jpeg',
    initials: 'M',
  },
  {
    key: 'gabriele',
    name: 'Gabriele',
    role: 'Meta & Google Ads',
    tag: '',
    photo: '/team-gabriele.jpeg',
    initials: 'G',
  },
]

function HexPortrait({ photo, initials, alt }) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-brand-yellow"
        style={{ clipPath: HEX_CLIP }}
      />
      <div
        className="absolute inset-[4px] overflow-hidden"
        style={{ clipPath: HEX_CLIP }}
      >
        {photo ? (
          <img
            src={photo}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-yellow">
            <span className="font-display text-6xl font-extrabold text-brand-black sm:text-7xl">
              {initials}
            </span>
          </div>
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-[4px]"
        style={{
          clipPath: HEX_CLIP,
          background:
            'linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 45%, rgba(0,0,0,0.18) 100%)',
        }}
      />
    </div>
  )
}

function MemberCard({ photo, initials, name, role, tag, size = 'md', delay = 0 }) {
  const widthCls =
    size === 'lg' ? 'w-44 sm:w-52 lg:w-56' : 'w-32 sm:w-40 lg:w-44'
  const nameCls =
    size === 'lg'
      ? 'font-display text-2xl font-extrabold sm:text-3xl'
      : 'font-display text-xl font-extrabold sm:text-2xl'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className={`relative ${widthCls}`} style={{ aspectRatio: '1 / 1.1547' }}>
        <HexPortrait photo={photo} initials={initials} alt={name} />
      </div>
      <div className={`mt-5 text-outlined ${nameCls}`}>{name}</div>
      <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-yellow sm:text-xs">
        {role}
      </div>
      {tag && (
        <p className="mx-auto mt-2 max-w-[240px] text-[13px] leading-snug text-white/70">
          {tag}
        </p>
      )}
    </motion.div>
  )
}

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
            className="text-outlined font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
          >
            Le persone dietro la{' '}
            <span className="text-brand-yellow">tua crescita</span>
          </motion.h2>
          <p className="text-outlined-sm mt-4 text-base text-white/65 sm:text-lg">
            Siamo professionisti che parlano la lingua dell'impresa. Uniamo
            visione strategica e rigore tecnico per costruire un ecosistema di
            crescita che resti un asset della tua azienda.
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center gap-20 md:gap-24">
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 sm:gap-x-24">
            {founders.map((m, i) => (
              <MemberCard key={m.key} {...m} size="lg" delay={i * 0.1} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-12 sm:gap-x-16">
            {teamMembers.map((m, i) => (
              <MemberCard key={m.key} {...m} size="md" delay={0.2 + i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
