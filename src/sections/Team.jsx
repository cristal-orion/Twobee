import { motion } from 'framer-motion'

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const team = [
  {
    key: 'marco',
    name: 'Marco',
    role: 'Founder & Strategist',
    tag: 'KPI Hunter. Non si ferma finché i conti non tornano.',
    photo: '/team-marco.jpeg',
    initials: 'M',
    position: { left: '16.67%', top: '0%', labelSide: 'top' },
  },
  {
    key: 'toto',
    name: 'Toto',
    role: 'Growth & Operations',
    tag: 'Profit Maker. Trasforma i click in clienti alto-spendenti.',
    photo: '/team-toto.jpeg',
    initials: 'T',
    position: { left: '50%', top: '0%', labelSide: 'top' },
  },
  {
    key: 'sabrina',
    name: 'Sabrina',
    role: 'Marketing',
    tag: '',
    photo: '/team-sabrina.jpeg',
    initials: 'S',
    position: { left: '0%', top: '42.86%', labelSide: 'bottom' },
  },
  {
    key: 'michele',
    name: 'Michele',
    role: 'IT Specialist',
    tag: '',
    photo: '/team-michele.jpeg',
    initials: 'M',
    position: { left: '33.33%', top: '42.86%', labelSide: 'bottom' },
  },
  {
    key: 'gabriele',
    name: 'Gabriele',
    role: 'Meta & Google Ads',
    tag: '',
    photo: '/team-gabriele.jpeg',
    initials: 'G',
    position: { left: '66.67%', top: '42.86%', labelSide: 'bottom' },
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

function MemberLabel({ name, role, tag, side }) {
  const isTop = side === 'top'
  return (
    <div
      className={[
        'absolute left-1/2 w-max max-w-[240px] -translate-x-1/2 text-center',
        isTop ? 'bottom-full mb-5' : 'top-full mt-5',
      ].join(' ')}
    >
      <div className="text-outlined font-display text-xl font-extrabold sm:text-2xl">
        {name}
      </div>
      <div className="text-outlined-sm mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-yellow sm:text-xs">
        {role}
      </div>
      {tag && (
        <p className="text-outlined-sm mx-auto mt-2 max-w-[220px] text-xs leading-snug text-white/75">
          {tag}
        </p>
      )}
    </div>
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

        {/* Desktop: 5-hex honeycomb cluster */}
        <div className="relative mx-auto mt-40 mb-24 hidden aspect-[660/445] w-full max-w-[720px] md:block">
          {team.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute"
              style={{
                left: m.position.left,
                top: m.position.top,
                width: '33.33%',
              }}
            >
              <div
                className="relative"
                style={{ aspectRatio: '1 / 1.1547' }}
              >
                <HexPortrait
                  photo={m.photo}
                  initials={m.initials}
                  alt={m.name}
                />
                <MemberLabel
                  name={m.name}
                  role={m.role}
                  tag={m.tag}
                  side={m.position.labelSide}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: stacked list with hex thumbnails */}
        <div className="mt-14 grid gap-8 md:hidden">
          {team.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              className="flex items-center gap-5"
            >
              <div
                className="relative w-28 shrink-0"
                style={{ aspectRatio: '1 / 1.1547' }}
              >
                <HexPortrait
                  photo={m.photo}
                  initials={m.initials}
                  alt={m.name}
                />
              </div>
              <div className="flex-1">
                <div className="text-outlined font-display text-xl font-extrabold">
                  {m.name}
                </div>
                <div className="text-outlined-sm mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-yellow">
                  {m.role}
                </div>
                {m.tag && (
                  <p className="text-outlined-sm mt-2 text-sm leading-snug text-white/75">
                    {m.tag}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
