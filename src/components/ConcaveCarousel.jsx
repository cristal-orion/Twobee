/* CAROSELLO CONCAVO
 * -----------------
 * Un muro di pannelli che si curva intorno a chi guarda: il pannello al centro
 * è il più lontano, quelli ai lati girano verso di te e si avvicinano. Rifatto
 * a mano sul modello del Concave Carousel di React Bits Pro (che è a pagamento
 * e disegna su canvas): qui sono elementi DOM con trasformazioni 3D, così le
 * immagini restano immagini, accessibili e indicizzabili.
 *
 * DA DOVE VIENE LA PROFONDITÀ (rifatto il 2026-10-29 dopo «dà meno l'effetto
 * di profondità di quello di React Bits»):
 *   - il muro si guarda un po' dal basso (`tilt`): così i bordi dei pannelli
 *     disegnano un arco, ed è l'arco che fa leggere il tamburo;
 *   - la sequenza si ripete finché il muro arriva ai bordi dello schermo: con
 *     cinque lavori soli finiva a metà curva e sembrava una fila piatta;
 *   - riflesso sul pavimento e pannelli che si spengono andando ai lati.
 *
 * COME SI MUOVE
 *   - da solo, piano (`autoplay`). Mentre gira da solo cambia solo la
 *     didascalia: il caso aperto sotto resta quello scelto, così chi sta
 *     leggendo non si vede cambiare il testo. Quando lo tocchi si ferma, e
 *     riparte da solo dopo `idle` secondi di quiete. Col mouse sopra rallenta
 *     ma non si ferma (la prima versione si fermava, e il muro sembrava
 *     spento); fuori dallo schermo o con la scheda nascosta non consuma niente.
 *   - trascinando: il punto che tieni resta sotto il dito, e un colpo secco
 *     prosegue con l'inerzia prima di agganciarsi al pannello più vicino;
 *   - con la rotella in orizzontale (trackpad, Shift+rotella): un pannello a
 *     scatto. La rotella verticale resta alla pagina, di proposito;
 *   - con le frecce sotto, o ← → quando il carosello ha il focus;
 *   - cliccando un pannello laterale lo porti al centro, cliccando quello al
 *     centro (o Invio) lo "apri": `onSelect`.
 * Gira in tondo: dopo l'ultimo viene il primo.
 *
 * CONTROLLATO DA FUORI: `index` è il pannello scelto. Quando cambia da fuori
 * il muro ci gira sopra per la strada più corta; quando l'utente lo ferma su un
 * pannello chiama `onIndexChange`.
 *
 * Le posizioni si calcolano a ogni fotogramma e si scrivono direttamente sugli
 * stili, senza passare da React: con lo stato si renderizzerebbe tutto sessanta
 * volte al secondo.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const mod = (v, n) => ((v % n) + n) % n
// Quanti pannelli servono perché la curva arrivi ai bordi dello schermo.
const MIN_SLOTS = 11
// Oltre quest'angolo un pannello sta "dietro le spalle": si spegne prima.
const MAX_ANGLE = 1.3

export default function ConcaveCarousel({
  items,
  index = 0,
  onIndexChange,
  onSelect,
  // 0 = striscia piatta, 1 = tamburo stretto
  curvature = 0.62,
  // distanza di chi guarda, in raggi del tamburo: più è bassa, più prospettiva
  distance = 1.25,
  // gradi: negativo guarda il muro dal basso
  tilt = -9,
  // quanto si spengono i pannelli ai lati
  dim = 0.7,
  reflection = 0.16,
  // quanto prosegue un colpo secco
  inertia = 0.35,
  aspect = 1.25,
  autoplay = true,
  // pannelli al secondo
  speed = 0.16,
  // secondi di quiete dopo un tocco prima che riparta da solo
  idle = 4,
  labels = { prev: 'Precedente', next: 'Successivo', carousel: 'Carosello' },
  renderCaption,
}) {
  const n = items.length
  const copies = Math.max(1, Math.ceil(MIN_SLOTS / n))
  const N = n * copies // pannelli disegnati: la sequenza ripetuta
  const stage = useRef(null)
  const panels = useRef([])
  const pos = useRef(index) // posizione continua: 2.4 = fra il terzo e il quarto
  const geo = useRef({ w: 400, R: 1000, step: 0.36 })
  const tween = useRef(null)
  const drag = useRef(null)
  const [live, setLive] = useState(mod(index, n)) // pannello al centro adesso
  const reduce = useRef(false)
  // deriva: `until` è l'istante prima del quale resta ferma (dopo un tocco),
  // `hover` la rallenta, `visible` la spegne quando il muro è fuori schermo
  const drift = useRef({ on: autoplay, until: 0, hover: false, visible: true })

  /* --- disegno ------------------------------------------------------- */

  const render = useCallback(() => {
    const { R, step } = geo.current
    const p = pos.current
    for (let s = 0; s < N; s++) {
      const el = panels.current[s]
      if (!el) continue
      // scarto dal centro, avvolto sulla sequenza ripetuta
      const o = mod(s - p + N / 2, N) - N / 2
      const a = Math.abs(o)
      const theta = o * step
      const x = R * Math.sin(theta)
      const z = R * (1 - Math.cos(theta))
      const fade = clamp((MAX_ANGLE - Math.abs(theta)) / 0.25, 0, 1)
      el.style.transform = `translate3d(${x}px,0,${z}px) rotateY(${-theta}rad)`
      el.style.opacity = String(fade)
      el.style.visibility = fade === 0 ? 'hidden' : 'visible'
      el.style.zIndex = String(100 - Math.round(a * 10))
      el.style.pointerEvents = fade < 0.5 ? 'none' : 'auto'
      const card = el.firstChild
      const shade = card.querySelector('[data-shade]')
      if (shade) shade.style.opacity = String(dim * clamp(a / 2.2, 0, 1))
      const img = card.querySelector('img')
      if (img) img.style.filter = `grayscale(${clamp(a, 0, 1)})`
    }
    const centred = mod(Math.round(p), n)
    setLive((prev) => (prev === centred ? prev : centred))
  }, [N, n, dim])

  const measure = useCallback(() => {
    const el = stage.current
    if (!el) return
    const W = el.clientWidth
    const w = clamp(W * 0.24, 200, 400)
    const h = w / aspect
    const gap = w * 0.07
    // passo angolare fra due pannelli: è la curvatura vera e propria
    const step = 0.12 + 0.4 * curvature
    const R = (w + gap) / step
    geo.current = { w, R, step }
    el.style.perspective = `${R * distance}px`
    // spazio per l'arco del muro inclinato e per il riflesso sotto
    el.style.height = `${h * (1.42 + reflection * 2)}px`
    for (const p of panels.current) {
      if (!p) continue
      p.style.width = `${w}px`
      p.style.height = `${h}px`
      p.style.marginLeft = `${-w / 2}px`
      p.style.marginTop = `${-h / 2}px`
    }
    render()
  }, [curvature, distance, aspect, reflection, render])

  /* --- movimento ----------------------------------------------------- */

  // Un tocco ferma la deriva per `idle` secondi; ogni tocco successivo
  // sposta in avanti la ripartenza.
  const stopDrift = useCallback(() => {
    drift.current.until = performance.now() + idle * 1000
  }, [idle])

  const goTo = useCallback(
    (to, { notify = true } = {}) => {
      tween.current?.kill()
      const from = pos.current
      const done = () => {
        pos.current = Math.round(pos.current)
        render()
        if (notify) onIndexChange?.(mod(pos.current, n))
      }
      if (reduce.current) {
        pos.current = to
        done()
        return
      }
      const proxy = { v: from }
      tween.current = gsap.to(proxy, {
        v: to,
        duration: clamp(0.5 + Math.abs(to - from) * 0.14, 0.5, 1.2),
        ease: 'power3.out',
        onUpdate: () => {
          pos.current = proxy.v
          render()
        },
        onComplete: done,
      })
    },
    [n, render, onIndexChange]
  )

  // stessa destinazione, ma per la strada più corta intorno al tamburo
  const goToIndex = useCallback(
    (i, opts) => {
      const from = pos.current
      goTo(Math.round(from + (mod(i - from + n / 2, n) - n / 2)), opts)
    },
    [n, goTo]
  )

  const stepBy = useCallback(
    (d) => {
      stopDrift()
      goTo(Math.round(pos.current) + d)
    },
    [goTo, stopDrift]
  )

  // `index` cambiato da fuori (mosaico, link con #, «caso successivo»):
  // è una scelta dell'utente, quindi ferma anche la deriva.
  useEffect(() => {
    if (mod(Math.round(pos.current), n) !== mod(index, n)) {
      stopDrift()
      goToIndex(index, { notify: false })
    }
  }, [index, n, goToIndex, stopDrift])

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce.current) drift.current.on = false
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage.current)
    const io = new IntersectionObserver(([e]) => {
      drift.current.visible = e.isIntersecting
    })
    io.observe(stage.current)
    return () => {
      ro.disconnect()
      io.disconnect()
      tween.current?.kill()
    }
  }, [measure])

  // La deriva: un passo per fotogramma, in proporzione al tempo trascorso.
  // Col mouse sopra frena dolcemente invece di fermarsi di colpo.
  useEffect(() => {
    let v = 0
    const tick = (_, deltaMs) => {
      const d = drift.current
      if (!d.on) return
      // un tween in corso (frecce, clic, aggancio) ha la precedenza
      if (tween.current?.isActive()) return
      const running =
        d.visible && !document.hidden && !drag.current && performance.now() > d.until
      const target = running ? speed * (d.hover ? 0.3 : 1) : 0
      v += (target - v) * Math.min(1, deltaMs / 400)
      if (Math.abs(v) < 1e-4) return
      pos.current += (v * deltaMs) / 1000
      render()
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [speed, render])

  /* --- input --------------------------------------------------------- */

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    tween.current?.kill()
    drag.current = {
      id: e.pointerId,
      x0: e.clientX,
      p0: pos.current,
      moved: false,
      samples: [{ x: e.clientX, t: performance.now() }],
      target: e.target.closest('[data-slot]'),
    }
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.x0
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true
      stopDrift()
      stage.current.setPointerCapture(e.pointerId)
    }
    if (!d.moved) return
    pos.current = d.p0 - dx / (geo.current.w * 1.07)
    d.samples.push({ x: e.clientX, t: performance.now() })
    if (d.samples.length > 6) d.samples.shift()
    render()
  }

  const onPointerUp = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    drag.current = null
    if (!d.moved) {
      // un clic: al centro si apre, di lato si porta al centro
      if (!d.target) return
      stopDrift()
      const s = Number(d.target.dataset.slot)
      const o = mod(s - pos.current + N / 2, N) - N / 2
      if (Math.abs(o) < 0.5) onSelect?.(mod(s, n))
      else goTo(Math.round(pos.current + o))
      return
    }
    const s = d.samples
    const first = s[0]
    const last = s[s.length - 1]
    const dt = Math.max(16, last.t - first.t) / 1000
    const v = -((last.x - first.x) / geo.current.w) / dt // pannelli al secondo
    goTo(Math.round(pos.current + v * inertia))
  }

  // Rotella: solo quella orizzontale, un pannello per scatto.
  useEffect(() => {
    const el = stage.current
    let acc = 0
    let lock = 0
    const onWheel = (e) => {
      const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX
      if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY)) return
      e.preventDefault()
      const now = performance.now()
      if (now < lock) return
      acc += dx
      if (Math.abs(acc) > 30) {
        stepBy(acc > 0 ? 1 : -1)
        acc = 0
        lock = now + 320
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [stepBy])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      stepBy(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      stepBy(-1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      stopDrift()
      onSelect?.(mod(Math.round(pos.current), n))
    }
  }

  const slots = Array.from({ length: N }, (_, s) => ({ s, it: items[s % n], i: s % n }))

  return (
    <div>
      <div
        ref={stage}
        role="group"
        aria-roledescription="carousel"
        aria-label={labels.carousel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        // fermo solo col focus da tastiera: un clic dà focus anche lui, e
        // non deve lasciare il muro immobile finché non clicchi altrove
        onFocus={(e) => {
          if (e.target.matches(':focus-visible')) drift.current.until = Infinity
        }}
        onBlur={() => {
          if (drift.current.until === Infinity) stopDrift()
        }}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') drift.current.hover = true
        }}
        onPointerLeave={() => (drift.current.hover = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative cursor-grab select-none overflow-hidden outline-none [touch-action:pan-y] active:cursor-grabbing focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-brand-yellow"
      >
        {/* Il mondo inclinato: i pannelli ci vivono dentro in 3D, e tutto il
            muro si guarda un po' dal basso. */}
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: `translateY(-${reflection * 60}%) rotateX(${tilt}deg)` }}
        >
          {slots.map(({ s, it, i }) => {
            const copy = s >= n
            return (
              <div
                key={s}
                data-slot={s}
                ref={(el) => (panels.current[s] = el)}
                aria-hidden={copy || i !== live}
                className="absolute left-1/2 top-1/2 will-change-transform"
              >
                <div className="flex h-full w-full flex-col overflow-hidden bg-[#161618]">
                  <div className="relative min-h-0 flex-1 overflow-hidden">
                    <img
                      src={it.src}
                      alt={copy ? '' : it.alt}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover object-left-top"
                    />
                    <span data-shade aria-hidden className="absolute inset-0 bg-[#0B0B0C]" style={{ opacity: 0 }} />
                  </div>
                  <span
                    className={[
                      'flex shrink-0 items-center justify-between gap-3 px-3 py-2 text-[0.9375rem] font-semibold transition-colors duration-300',
                      i === live ? 'bg-brand-yellow text-brand-black' : 'bg-[#161618] text-[#FBFAF9]',
                    ].join(' ')}
                  >
                    <span className="truncate">{it.title}</span>
                    {it.meta && <span className="shrink-0 opacity-80">{it.meta}</span>}
                  </span>
                </div>
                {/* Riflesso sul pavimento: la stessa immagine capovolta, che
                    svanisce scendendo. È una maschera di trasparenza, non un
                    colore sfumato. */}
                {reflection > 0 && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-full mt-2 h-[45%] overflow-hidden"
                    style={{
                      opacity: reflection,
                      WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent)', // taste-skill-ignore: maschera alfa
                      maskImage: 'linear-gradient(to bottom, #000, transparent)', // taste-skill-ignore: maschera alfa
                    }}
                  >
                    <img
                      src={it.src}
                      alt=""
                      draggable={false}
                      // alta quanto il pannello e capovolta sul suo centro: in
                      // cima al riflesso c'è il fondo dell'immagine, come in uno specchio
                      className="h-[222%] w-full -scale-y-100 object-cover object-left-top"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-2 flex flex-col items-center gap-6 sm:mt-4">
        {renderCaption?.(items[live], live)}
        <div className="flex items-center gap-4">
          <ArrowButton label={labels.prev} onClick={() => stepBy(-1)} flip />
          <span className="min-w-[3.5rem] text-center text-[0.9375rem] tabular-nums text-white/70" aria-live="polite">
            {live + 1} / {n}
          </span>
          <ArrowButton label={labels.next} onClick={() => stepBy(1)} />
        </div>
      </div>
    </div>
  )
}

function ArrowButton({ label, onClick, flip }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.07] text-white transition-[transform,background-color] duration-200 hover:bg-brand-yellow hover:text-brand-black active:scale-95 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
    >
      <svg aria-hidden viewBox="0 0 24 24" className={`h-5 w-5 ${flip ? 'rotate-180' : ''}`} fill="none">
        <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
