import { motion } from 'framer-motion'

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const founders = [
  {
    id: 'marco',
    name: 'Marco Lucci',
    role: 'Founder & Strategist',
    tag: "Ti convince a scalare l'Everest in infradito, e alla fine lo ringrazi pure per l'esperienza. Costruisce strategie blindate e relazioni così solide che i clienti finiscono per invitarci al pranzo della domenica. Il suo superpotere? La persuasione.",
    photo: '/team-marco.jpeg',
    initials: 'M',
    linkedin: '#',
  },
  {
    id: 'toto',
    name: 'Toto Piacente',
    role: 'Co-Founder & Growth',
    tag: 'Psicopatico dei dati, analizza i numeri anche quando fa la spesa. Guida il team operativo parlando un “consulentese” tutto suo: se ti guarda e ti propone un “pre-audit strategico”, tu sorridi, annuisci e preparati a fatturare.',
    photo: '/team-toto.jpeg',
    initials: 'T',
    linkedin: '#',
  },
]

const teamMembers = [
  {
    id: 'sabrina',
    name: 'Sabrina Nastro',
    role: 'Marketing Specialist',
    tag: "L'abbiamo strappata a Londra per riportare questo diamante in patria. Quando si infervora le parte l'accento british: in società non la capisce nessuno, ma tutti annuiamo intensamente perché le sue campagne convertono da paura.",
    photo: '/team-sabrina.jpeg',
    initials: 'S',
    linkedin: '#',
  },
  {
    id: 'michele',
    name: 'Michele Cristallo',
    role: 'AI Specialist',
    tag: 'Avete mai visto un tecnico puro che sforna idee creative esplosive? Noi sì, ed è un caso clinico interessante. Metà genio, metà sregolatezza assoluta: addestra le nostre intelligenze artificiali con intuizioni folli che si trasformano sempre in oro.',
    photo: '/team-michele.jpeg',
    initials: 'M',
    linkedin: '#',
  },
  {
    id: 'gabriele',
    name: 'Gabriele Saraiello',
    role: 'Automation Specialist',
    tag: 'Il Grande Fratello del marketing. Traccia il customer journey in modo così maniacale che nei suoi report mensili riesci a leggere pure quanti passi ha fatto il tuo cliente oggi. Imposta automazioni spietate: nessun click sfugge al suo controllo.',
    photo: '/team-gabriele.jpeg',
    initials: 'G',
    linkedin: '#',
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

function LinkedInBadge({ href }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Profilo LinkedIn"
      className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-yellow/40 bg-white/[0.04] text-brand-yellow transition hover:bg-brand-yellow hover:text-brand-black"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.5 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.28c0-1.5-.03-3.43-2.09-3.43-2.09 0-2.41 1.63-2.41 3.32V22H7.72V8z" />
      </svg>
    </a>
  )
}

function MemberCard({
  photo,
  initials,
  name,
  role,
  tag,
  linkedin,
  size = 'md',
  delay = 0,
}) {
  const widthCls =
    size === 'lg' ? 'w-44 sm:w-52 lg:w-56' : 'w-32 sm:w-40 lg:w-44'
  const nameCls =
    size === 'lg'
      ? 'font-display text-2xl font-extrabold sm:text-3xl'
      : 'font-display text-xl font-extrabold sm:text-2xl'
  const tagMaxW = size === 'lg' ? 'max-w-[320px]' : 'max-w-[280px]'
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
        <p
          className={`mx-auto mt-3 ${tagMaxW} text-[13px] leading-snug text-white/70`}
        >
          {tag}
        </p>
      )}
      <LinkedInBadge href={linkedin} />
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
            Le menti dietro il tuo{' '}
            <span className="text-brand-yellow">vantaggio competitivo</span>
          </motion.h2>
          <p className="text-outlined-sm mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Parliamo la lingua della tua impresa, ma viviamo nel futuro. Siamo
            un team ossessionato dall'innovazione e dai dati: testiamo in
            trincea ogni nuova AI, trend di marketing e tool digitale prima
            ancora che diventino mainstream. Uniamo questa fame di aggiornamento
            al rigore strategico, per costruirti un ecosistema di crescita che
            asfalta la concorrenza e resta un asset inossidabile per la tua
            azienda.
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center gap-20 md:gap-24">
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 sm:gap-x-24">
            {founders.map((m, i) => (
              <MemberCard key={m.id} {...m} size="lg" delay={i * 0.1} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-12 sm:gap-x-16">
            {teamMembers.map((m, i) => (
              <MemberCard key={m.id} {...m} size="md" delay={0.2 + i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
