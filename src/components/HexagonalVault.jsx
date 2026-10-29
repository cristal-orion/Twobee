/* HEXAGONAL VAULT
 * ---------------
 * Una griglia di esagoni disegnata a linee, accesa da una luce morbida che
 * segue il puntatore. Rifatta a mano sul modello dell'Hexagonal Vault di React
 * Bits Pro (a pagamento, codice non disponibile), con i colori di TwoBee:
 * linee gialle quasi spente sul nero, che si scaldano dall'oro al giallo pieno
 * fino al bianco dove la luce è più forte.
 *
 * COSA FA
 *   - la luce insegue il puntatore con un po' d'inerzia, brilla di più mentre
 *     si muove e lascia una scia sugli spigoli che si raffredda piano;
 *   - senza puntatore (o sul telefono, quando il dito non tocca) vaga da sola
 *     lungo un percorso morbido, e quando il puntatore torna ci scivola sopra;
 *   - una banda di luce lenta attraversa la griglia a riposo (`shimmer`);
 *   - ogni clic manda un'onda di scintille lungo gli spigoli, e i clic veloci
 *     si sommano.
 *
 * PERCHÉ CANVAS 2D e non WebGL: sono poche centinaia di segmenti, e raggruppati
 * per intensità sono una dozzina di chiamate di disegno a fotogramma. Niente
 * dipendenze, e su un telefono vecchio regge lo stesso. Fuori dallo schermo o
 * con la scheda nascosta non disegna niente. Con «riduci movimento» resta un
 * fotogramma fermo.
 *
 * Il contenuto (`children`) sta sopra la griglia; i movimenti del puntatore si
 * leggono su tutto il contenitore, testo compreso.
 */
import { useEffect, useRef } from 'react'

const SQRT3 = Math.sqrt(3)
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))

export default function HexagonalVault({
  // [spigoli che si raffreddano, luce calda, cuore quasi bianco]
  colors = ['#8F6D00', '#FFC501', '#FFF4C7'],
  backgroundColor = '#0B0B0C',
  // distanza fra i centri di due celle, in px
  cellSize = 92,
  lineWidth = 1,
  litWidth = 2,
  // luminosità della griglia a riposo, 0–1
  lattice = 0.13,
  // raggio della luce, in celle
  radius = 1.6,
  // secondi che la scia impiega a spegnersi
  trailLength = 1.1,
  // quanto in fretta la luce raggiunge il puntatore
  follow = 0.5,
  shimmer = 1,
  speed = 1,
  autoplay = true,
  interactive = true,
  clickPulses = true,
  className = '',
  children,
}) {
  const host = useRef(null)
  const canvas = useRef(null)

  useEffect(() => {
    const el = host.current
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const [cool, hot, core] = colors.map(hexRgb)

    let W = 0
    let H = 0
    let edges = []
    let raf = 0
    let visible = true
    let last = performance.now()
    let t = 0
    const light = { x: 0, y: 0, vx: 0, vy: 0, energy: 0 }
    const pointer = { x: 0, y: 0, at: -1e9 }
    const pulses = []

    /* --- la griglia: spigoli unici di esagoni a punta in su ------------ */
    const build = () => {
      const r = el.getBoundingClientRect()
      W = r.width
      H = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // sul telefono celle più piccole: a 92px ne starebbero quattro in larghezza
      const cell = W < 640 ? cellSize * 0.72 : cellSize
      const s = cell / SQRT3 // raggio della cella
      const dx = cell
      const dy = s * 1.5
      const seen = new Set()
      edges = []
      for (let row = -1; row * dy < H + dy; row++) {
        for (let col = -1; col * dx < W + dx; col++) {
          const cx = col * dx + (row % 2 ? dx / 2 : 0)
          const cy = row * dy
          const v = []
          for (let k = 0; k < 6; k++) {
            const a = (Math.PI / 180) * (60 * k - 90)
            v.push([cx + s * Math.cos(a), cy + s * Math.sin(a)])
          }
          for (let k = 0; k < 6; k++) {
            const [x1, y1] = v[k]
            const [x2, y2] = v[(k + 1) % 6]
            const mx = (x1 + x2) / 2
            const my = (y1 + y2) / 2
            const key = `${Math.round(mx)}:${Math.round(my)}`
            if (seen.has(key)) continue
            seen.add(key)
            edges.push({ x1, y1, x2, y2, mx, my, heat: 0 })
          }
        }
      }
      if (!light.x) {
        light.x = W * 0.72
        light.y = H * 0.38
      }
    }

    /* --- un fotogramma --------------------------------------------------- */
    const BUCKETS = 10
    const draw = () => {
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, W, H)

      // griglia a riposo, con la banda di luce che la attraversa in diagonale
      const band = shimmer > 0 ? (((t * 0.045 * speed) % 1.6) - 0.3) * (W + H) : -1e9
      const baseBuckets = Array.from({ length: BUCKETS }, () => [])
      for (const e of edges) {
        const d = (e.mx + e.my * 0.6 - band) / 260
        const glint = shimmer * 0.9 * Math.exp(-d * d)
        const b = clamp(Math.floor(glint * BUCKETS), 0, BUCKETS - 1)
        baseBuckets[b].push(e)
      }
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'
      baseBuckets.forEach((list, b) => {
        if (!list.length) return
        const a = lattice * (1 + (b / BUCKETS) * 2.2)
        ctx.strokeStyle = `rgba(${hot[0]},${hot[1]},${hot[2]},${a})`
        ctx.beginPath()
        for (const e of list) {
          ctx.moveTo(e.x1, e.y1)
          ctx.lineTo(e.x2, e.y2)
        }
        ctx.stroke()
      })

      // alone della luce
      ctx.globalCompositeOperation = 'lighter'
      const haloR = cellSize * (2.4 + light.energy)
      const halo = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, haloR)
      halo.addColorStop(0, `rgba(${hot[0]},${hot[1]},${hot[2]},${0.09 + light.energy * 0.06})`)
      halo.addColorStop(1, `rgba(${hot[0]},${hot[1]},${hot[2]},0)`)
      ctx.fillStyle = halo
      ctx.fillRect(light.x - haloR, light.y - haloR, haloR * 2, haloR * 2)

      // spigoli accesi: prima un bagliore largo, poi il filo caldo
      const litBuckets = Array.from({ length: BUCKETS }, () => [])
      for (const e of edges) {
        if (e.heat < 0.03) continue
        litBuckets[clamp(Math.floor(e.heat * BUCKETS), 0, BUCKETS - 1)].push(e)
      }
      litBuckets.forEach((list, b) => {
        if (!list.length) return
        const h = (b + 0.5) / BUCKETS
        const c = h < 0.6 ? mix(cool, hot, h / 0.6) : mix(hot, core, (h - 0.6) / 0.4)
        const path = new Path2D()
        for (const e of list) {
          path.moveTo(e.x1, e.y1)
          path.lineTo(e.x2, e.y2)
        }
        ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${h * 0.22})`
        ctx.lineWidth = litWidth * 4.5
        ctx.stroke(path)
        ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.35 + h * 0.65})`
        ctx.lineWidth = lineWidth + (litWidth - lineWidth) * h
        ctx.stroke(path)
      })
    }

    /* --- fisica: luce, scia, onde ------------------------------------------ */
    const step = (dt) => {
      t += dt
      const now = performance.now()
      const chasing = interactive && now - pointer.at < 2500
      let tx
      let ty
      if (chasing) {
        tx = pointer.x
        ty = pointer.y
      } else if (autoplay) {
        // percorso morbido: due sinusoidi lente per asse, mai uguali
        const k = t * 0.16 * speed
        tx = W * (0.55 + 0.32 * Math.sin(k * 0.9) + 0.1 * Math.sin(k * 2.3 + 1.1))
        ty = H * (0.42 + 0.26 * Math.sin(k * 1.27 + 0.6) + 0.08 * Math.cos(k * 2.9))
      } else {
        tx = light.x
        ty = light.y
      }
      // molla smorzata: arriva senza scatti e senza rimbalzare troppo
      const k = 40 * (0.3 + follow)
      const damp = 2 * Math.sqrt(k) * 0.9
      light.vx += ((tx - light.x) * k - light.vx * damp) * dt
      light.vy += ((ty - light.y) * k - light.vy * damp) * dt
      light.x += light.vx * dt
      light.y += light.vy * dt
      const v = Math.hypot(light.vx, light.vy)
      light.energy += (clamp(v / 900, 0, 1) - light.energy) * Math.min(1, dt * 4)

      const R = cellSize * radius * (1 + light.energy * 0.35)
      const decay = Math.exp(-dt / Math.max(0.05, trailLength * 0.45))
      for (const e of edges) {
        e.heat *= decay
        const d = Math.hypot(e.mx - light.x, e.my - light.y)
        if (d < R) {
          const h = (1 - d / R) ** 1.6 * (0.55 + light.energy * 0.45)
          if (h > e.heat) e.heat = h
        }
      }

      // onde dei clic: un anello che corre lungo gli spigoli e si spegne
      const maxR = Math.hypot(W, H)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        const r = (t - p.t0) * 700 * speed
        if (r > maxR) {
          pulses.splice(i, 1)
          continue
        }
        const fade = 1 - r / maxR
        const w = cellSize * 0.6
        for (const e of edges) {
          const off = Math.abs(Math.hypot(e.mx - p.x, e.my - p.y) - r)
          if (off < w) {
            const h = (1 - off / w) * fade * 0.95
            if (h > e.heat) e.heat = h
          }
        }
      }
    }

    const loop = (now) => {
      raf = 0
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      step(dt)
      draw()
      if (visible && !document.hidden) raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (reduce || raf) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    /* --- input ----------------------------------------------------------- */
    const local = (e) => {
      const r = el.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top]
    }
    const onMove = (e) => {
      if (!interactive) return
      ;[pointer.x, pointer.y] = local(e)
      pointer.at = performance.now()
    }
    const onDown = (e) => {
      onMove(e)
      if (!clickPulses || reduce) return
      const [x, y] = local(e)
      pulses.push({ x, y, t0: t })
      if (pulses.length > 6) pulses.shift()
    }
    const onVisibility = () => {
      if (!document.hidden && visible) start()
    }

    build()
    if (reduce) {
      // un fotogramma fermo: la luce accesa in un punto, niente movimento
      for (let i = 0; i < 40; i++) step(1 / 60)
      draw()
    } else {
      start()
    }

    const ro = new ResizeObserver(() => {
      build()
      if (reduce) {
        for (let i = 0; i < 40; i++) step(1 / 60)
      }
      draw()
    })
    ro.observe(el)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(el)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onDown)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onDown)
      document.removeEventListener('visibilitychange', onVisibility)
    }
    // i colori arrivano come array: la stringa evita di ripartire a ogni render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors.join(), backgroundColor, cellSize, lineWidth, litWidth, lattice, radius, trailLength, follow, shimmer, speed, autoplay, interactive, clickPulses])

  return (
    <div ref={host} className={`relative overflow-hidden ${className}`} style={{ backgroundColor }}>
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative">{children}</div>
    </div>
  )
}
