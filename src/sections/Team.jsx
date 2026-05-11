import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const founders = [
  {
    id: 'marco',
    name: 'Marco Lucci',
    role: 'Founder & Strategist',
    tag: "Ti convince a scalare l'Everest in infradito, e alla fine lo ringrazi pure per l'esperienza. Costruisce strategie blindate e relazioni così solide che i clienti finiscono per invitarci al pranzo della domenica. Il suo superpotere? La persuasione.",
    photoBw: '/team-marco-bw.jpg',
    photoColor: '/team-marco-color.jpg',
    initials: 'M',
    linkedin: 'https://www.linkedin.com/in/marcodlucci/',
  },
  {
    id: 'toto',
    name: 'Toto Piacente',
    role: 'Co-Founder & Growth',
    tag: 'Psicopatico dei dati, analizza i numeri anche quando fa la spesa. Guida il team operativo parlando un “consulentese” tutto suo: se ti guarda e ti propone un “pre-audit strategico”, tu sorridi, annuisci e preparati a fatturare.',
    photoBw: '/team-toto-bw.jpg',
    photoColor: '/team-toto-color.jpg',
    initials: 'T',
    linkedin: 'https://www.linkedin.com/in/salvatore-piacente-537b4518b/',
  },
]

const teamMembers = [
  {
    id: 'sabrina',
    name: 'Sabrina Nastro',
    role: 'Growth Marketing Strategist',
    tag: "L'abbiamo strappata a Londra per riportare questo diamante in patria. Quando si infervora le parte l'accento british: in ufficio non la capisce nessuno, ma tutti annuiamo intensamente perché le sue campagne convertono da paura.",
    photoBw: '/team-sabrina-bw.jpg',
    photoColor: '/team-sabrina-color.jpg',
    initials: 'S',
    linkedin: 'https://www.linkedin.com/in/sabrina-nastro-a963a1153/',
  },
  {
    id: 'michele',
    name: 'Michele Cristallo',
    role: 'AI Specialist',
    tag: 'Avete mai visto un tecnico puro che sforna idee creative esplosive? Noi sì, ed è un caso clinico interessante. Metà genio, metà sregolatezza assoluta: addestra le nostre intelligenze artificiali con intuizioni folli che si trasformano sempre in oro.',
    photoBw: '/team-michele-bw.jpg',
    photoColor: '/team-michele-color.jpg',
    initials: 'M',
    linkedin: 'https://www.linkedin.com/in/michele-cristallo-120b63176/',
  },
  {
    id: 'gabriele',
    name: 'Gabriele Saraiello',
    role: 'Automation Specialist',
    tag: 'Il Grande Fratello del marketing. Traccia il customer journey in modo così maniacale che nei suoi report mensili riesci a leggere pure quanti passi ha fatto il tuo cliente oggi. Imposta automazioni spietate: nessun click sfugge al suo controllo.',
    photoBw: '/team-gabriele-bw.jpg',
    photoColor: '/team-gabriele-color.jpg',
    initials: 'G',
    linkedin: 'https://www.linkedin.com/in/gabriele-saraiello/',
  },
  {
    id: 'claudia',
    name: 'Claudia Amodei',
    role: 'AI Executive',
    tag: 'Quando supera i limiti nessuno le può parlare più, ma ha sempre la risposta pronta.',
    photoBw: '/team-claudia-bw.jpg',
    photoColor: '/team-claudia-color.jpg',
    initials: 'C',
    linkedin: null,
  },
]

function HexFace({ photo, initials, alt, back = false }) {
  return (
    <div
      className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
      style={back ? { transform: 'rotateY(180deg)' } : undefined}
    >
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
            loading="lazy"
            decoding="async"
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

function HexFlip({ photoBw, photoColor, initials, alt }) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef(null)
  const teaserShownRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(hover: none)').matches
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (!isTouch || reducedMotion) return
    const node = ref.current
    if (!node) return

    let showT, hideT
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || teaserShownRef.current) return
        teaserShownRef.current = true
        showT = setTimeout(() => setFlipped(true), 350)
        hideT = setTimeout(() => setFlipped(false), 350 + 1500)
        obs.disconnect()
      },
      { threshold: 0.6 }
    )
    obs.observe(node)
    return () => {
      obs.disconnect()
      if (showT) clearTimeout(showT)
      if (hideT) clearTimeout(hideT)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="group absolute inset-0 cursor-pointer select-none [perspective:1000px]"
      data-flipped={flipped}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      tabIndex={-1}
      aria-label={`${alt} — tocca per alternare bianco e nero e colore`}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d] motion-reduce:transition-none [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] group-data-[flipped=true]:[transform:rotateY(180deg)]"
      >
        <HexFace photo={photoBw} initials={initials} alt={`${alt} (bianco e nero)`} />
        <HexFace photo={photoColor} initials={initials} alt={`${alt} (a colori)`} back />
      </div>
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
  photoBw,
  photoColor,
  initials,
  name,
  role,
  tag,
  linkedin,
  size = 'md',
  delay = 0,
}) {
  const widthCls =
    size === 'lg' ? 'w-44 sm:w-52 lg:w-56' : 'w-44 sm:w-40 lg:w-44'
  const nameCls =
    size === 'lg'
      ? 'font-display text-2xl font-extrabold sm:text-3xl'
      : 'font-display text-2xl font-extrabold sm:text-xl lg:text-2xl'
  const tagMaxW =
    size === 'lg' ? 'max-w-[320px]' : 'max-w-[320px] sm:max-w-[280px]'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className={`relative ${widthCls}`} style={{ aspectRatio: '1 / 1.1547' }}>
        <HexFlip
          photoBw={photoBw}
          photoColor={photoColor}
          initials={initials}
          alt={name}
        />
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
          <div className="grid w-full grid-cols-1 justify-items-center gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
            {teamMembers.map((m, i) => (
              <MemberCard key={m.id} {...m} size="md" delay={0.2 + i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
