import { useEffect, useState } from 'react'
import { HexFloat, supportsHtmlInCanvas } from '../components/canvasui/HexFloat.tsx'
import HexFloatControls from './HexFloatControls.jsx'

// Lab: preview di "Hex Float" (canvasui.dev) con il contenuto reale del sito
// per capire se vale ripensare la home su questa estetica. Raggiungibile via
// /hiddenwork (route diretta, vedi App.jsx) o ?lab=hexfloat — non linkato,
// non in sitemap.
//
// DEFAULT_PROPS sotto è il tuning scelto a mano nel pannello controlli, non
// i default del componente originale — modificabile dal pannello stesso.
//
// L'effetto "vero" (pagina che si deforma sui tile 3D) richiede l'API canvas
// sperimentale layoutsubtree/drawElementImage, non ancora standard. Dove non
// è supportata il componente fa fallback a una texture hex decorativa sopra
// il contenuto normale — il badge sotto dice quale dei due stai vedendo.
//
// Un solo <HexFloat> avvolge TUTTO il contenuto scrollabile (testo + foto):
// due istanze separate significherebbero due pavimenti hex indipendenti,
// ognuno con la sua sim fluida/hover — a schermo si "vedrebbero le giunture"
// e i controlli sembrerebbero agire in modo incoerente tra le due sezioni.

const DEFAULT_PROPS = {
  size: 68,
  gap: 0,
  bevel: 6,
  tilt: 30,
  perspective: 0.5,
  float: 0.06,
  speed: 0.6,
  shine: 0.5,
  lift: 0.27,
  radius: 1200,
  flow: 0,
  swirl: 0,
  trail: 0,
  iridescence: 0,
  bloom: 0,
  grain: 0.8,
  gapColor: [1, 0.7725, 0.0039], // #FFC501 — brand-yellow
}

export default function HexFloatLab() {
  const [supported, setSupported] = useState(null)
  const [hexProps, setHexProps] = useState(DEFAULT_PROPS)

  useEffect(() => {
    setSupported(supportsHtmlInCanvas())
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      {/* HexFloat's own canvases are position:absolute, so the wrapper never
          auto-sizes to its children — it needs an explicit height matching
          the three h-screen sections below, or everything collapses to 0. */}
      <HexFloat {...hexProps} style={{ height: '300vh' }}>
        <div className="flex h-screen flex-col items-center justify-center px-6 py-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">
            Lab · Hex Float
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            Gli altri ti vendono follower.
            <br />
            Noi guidiamo la tua{' '}
            <span className="text-brand-yellow">crescita.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/70">
            Società di consulenza strategica, in ambito Growth &amp; AI per
            PMI italiane. Un sistema di acquisizione clienti misurabile, con
            impatto diretto sui ricavi.
          </p>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-8 inline-flex items-center rounded-full bg-brand-yellow px-8 py-4 text-sm font-bold uppercase tracking-wide text-brand-black transition hover:scale-105"
          >
            Prenota un audit gratuito
          </a>
          <p className="mt-16 max-w-md text-xs text-white/40">
            Muovi il cursore sopra il contenuto: la finestra di lettura dovrebbe
            aprirsi nei tile intorno al puntatore. Il pulsante sopra resta
            cliccabile (preventDefault per non navigare via da questa lab).
          </p>
        </div>

        <div className="flex h-screen flex-col items-center justify-center gap-6 px-6 py-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">
            Test su foto team
          </p>
          <img
            src="/lab-hexfloat/team-test.jpg"
            alt="Team Twobee"
            className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
          />
        </div>

        {/* Sezione chiara come sul sito principale (es. #servizi/#piani in
            App.jsx): stesso pattern rounded-t + shadow verso l'alto + LIGHT_VARS,
            per verificare come si comporta l'effetto hex su sfondo bianco. */}
        <section
          data-bg-light
          className="relative z-10 flex h-screen flex-col items-center justify-center gap-6 rounded-t-[2.5rem] bg-white px-6 py-24 text-center shadow-[0_-30px_60px_-25px_rgba(0,0,0,0.55)] sm:rounded-t-[3rem]"
          style={{ '--theme-fg': '#0B0B0C', '--theme-bg': '#FFFFFF' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">
            Test su sezione chiara
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-tight text-brand-black sm:text-4xl">
            Come si comporta l'effetto hex sopra una sezione bianca?
          </h2>
          <p className="max-w-xl text-base text-brand-black/70">
            Stesso pattern delle sezioni chiare del sito principale: bordo
            arrotondato verso l'alto, ombra, sfondo bianco.
          </p>
        </section>
      </HexFloat>

      <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-6">
        <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] backdrop-blur-md">
          <span className="text-brand-yellow">Lab</span>
          <span className="text-white/70">
            {supported === null
              ? 'controllo supporto API…'
              : supported
                ? 'API sperimentale supportata → effetto 3D completo'
                : 'API non supportata → fallback: sheen hex decorativo'}
          </span>
        </div>
      </div>

      <HexFloatControls value={hexProps} onChange={setHexProps} defaults={DEFAULT_PROPS} />
    </div>
  )
}
