import { useEffect, useMemo, useRef, useState } from 'react'

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const YELLOW = '255, 230, 0'

const HEX_W = 78
const HEX_H = HEX_W * 1.1547
const ROW_GAP = HEX_H * 0.75
const ROW_OFFSET = HEX_W / 2

const FLOW_COUNT = 6
const TRAIL_LEN = 14
const TICK_MS = 220
const TRANSITION_MS = 380

function neighbors(col, row) {
  const odd = row % 2 !== 0
  if (odd) {
    return [
      [col - 1, row],
      [col + 1, row],
      [col, row - 1],
      [col + 1, row - 1],
      [col, row + 1],
      [col + 1, row + 1],
    ]
  }
  return [
    [col - 1, row],
    [col + 1, row],
    [col - 1, row - 1],
    [col, row - 1],
    [col - 1, row + 1],
    [col, row + 1],
  ]
}

function inBounds(col, row, cols, rows) {
  return col >= 0 && col < cols && row >= 0 && row < rows
}

function randomCell(cols, rows) {
  return [Math.floor(Math.random() * cols), Math.floor(Math.random() * rows)]
}

export default function HexBgLab() {
  const [grid, setGrid] = useState({ cols: 0, rows: 0 })
  const [activeMap, setActiveMap] = useState({})
  const [showOverlay, setShowOverlay] = useState(true)
  const flowsRef = useRef([])
  const whiteSectionRef = useRef(null)
  const lightLayerRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const cols = Math.ceil(window.innerWidth / HEX_W) + 2
      const rows = Math.ceil(window.innerHeight / ROW_GAP) + 2
      setGrid({ cols, rows })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (!grid.cols || !grid.rows) return

    flowsRef.current = Array.from({ length: FLOW_COUNT }, () => ({
      trail: [
        {
          col: randomCell(grid.cols, grid.rows)[0],
          row: randomCell(grid.cols, grid.rows)[1],
          age: 0,
        },
      ],
      lastDir: -1,
    }))

    const id = setInterval(() => {
      flowsRef.current.forEach((flow) => {
        flow.trail.forEach((n) => (n.age += 1))
        flow.trail = flow.trail.filter((n) => n.age < TRAIL_LEN)

        const head = flow.trail[0] || {
          col: Math.floor(grid.cols / 2),
          row: Math.floor(grid.rows / 2),
          age: 0,
        }
        const candidates = neighbors(head.col, head.row).filter(
          ([c, r]) => inBounds(c, r, grid.cols, grid.rows)
        )
        if (candidates.length === 0) {
          const [c, r] = randomCell(grid.cols, grid.rows)
          flow.trail.unshift({ col: c, row: r, age: 0 })
          return
        }
        const weighted = candidates.map((cand, i) => ({
          cand,
          w: i === flow.lastDir ? 2.5 : 1,
        }))
        const total = weighted.reduce((s, x) => s + x.w, 0)
        let pick = Math.random() * total
        let chosen = weighted[0]
        for (const w of weighted) {
          pick -= w.w
          if (pick <= 0) {
            chosen = w
            break
          }
        }
        flow.lastDir = candidates.indexOf(chosen.cand)
        const [nc, nr] = chosen.cand
        flow.trail.unshift({ col: nc, row: nr, age: 0 })
      })

      const next = {}
      flowsRef.current.forEach((flow) => {
        flow.trail.forEach((n) => {
          const intensity = Math.max(0, 1 - n.age / TRAIL_LEN)
          const key = `${n.row}-${n.col}`
          if (!next[key] || next[key] < intensity) {
            next[key] = intensity
          }
        })
      })
      setActiveMap(next)
    }, TICK_MS)

    return () => clearInterval(id)
  }, [grid.cols, grid.rows])

  useEffect(() => {
    const update = () => {
      const layer = lightLayerRef.current
      const section = whiteSectionRef.current
      if (!layer || !section) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom <= 0 || rect.top >= vh) {
        layer.style.clipPath = 'inset(100% 0 0 0)'
        return
      }
      const insetTop = Math.max(0, rect.top)
      const insetBottom = Math.max(0, vh - Math.min(vh, rect.bottom))
      layer.style.clipPath = `inset(${insetTop}px 0 ${insetBottom}px 0)`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const cells = useMemo(() => {
    const out = []
    for (let r = 0; r < grid.rows; r++) {
      for (let c = 0; c < grid.cols; c++) {
        const x = c * HEX_W + (r % 2 === 1 ? ROW_OFFSET : 0)
        const y = r * ROW_GAP
        const key = `${r}-${c}`
        out.push({ key, x, y, intensity: activeMap[key] || 0 })
      }
    }
    return out
  }, [grid.cols, grid.rows, activeMap])

  return (
    <div className="relative bg-[#040404] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <HexLayer cells={cells} mode="dark" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      <div
        ref={lightLayerRef}
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
        style={{ clipPath: 'inset(100% 0 0 0)' }}
      >
        <div className="absolute inset-0 bg-white" />
        <HexLayer cells={cells} mode="light" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow">
            Lab · Hex Background
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Scorri per vedere la sezione bianca
          </h1>
          <p className="mt-4 text-sm text-white/70">
            La trama esagonale resta continua: cambia solo la base da nera a
            bianca.
          </p>
          <div className="mt-8 inline-flex flex-col items-center gap-1 text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">
            <span>scroll</span>
            <span className="block h-8 w-px bg-white/30" />
          </div>
        </div>
      </section>

      <section
        ref={whiteSectionRef}
        className="relative z-10 text-black"
        style={{ minHeight: '150vh' }}
      >
        <div className="sticky top-0 flex h-screen items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-black">
              Sezione bianca
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-brand-black sm:text-4xl">
              Stessa trama, tema chiaro
            </h2>
            <p className="mt-4 text-sm text-brand-black/70">
              Gli esagoni continuano dietro al contenuto. Identità visiva
              mantenuta anche su sfondo bianco.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            E si torna al tema scuro
          </h2>
          <p className="mt-3 text-sm text-white/70">
            La trama riprende sotto al contenuto.
          </p>
        </div>
      </section>

      {showOverlay && (
        <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-6">
          <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] backdrop-blur-md">
            <span className="text-brand-yellow">Lab</span>
            <span className="text-white/70">
              scorri per vedere la sezione bianca
            </span>
            <button
              type="button"
              onClick={() => setShowOverlay(false)}
              className="text-white/40 hover:text-white"
              aria-label="Chiudi overlay"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function HexLayer({ cells, mode }) {
  return (
    <div className="absolute inset-0">
      {cells.map((cell) => (
        <HexCell
          key={cell.key}
          x={cell.x}
          y={cell.y}
          intensity={cell.intensity}
          mode={mode}
        />
      ))}
    </div>
  )
}

function HexCell({ x, y, intensity, mode }) {
  const seamAlpha = intensity > 0 ? Math.min(1, intensity + 0.15) : 0
  const isLight = mode === 'light'

  const baseBg = isLight ? '#ededed' : '#080808'
  const innerGradient = isLight
    ? 'linear-gradient(155deg, #ffffff 0%, #f4f4f4 28%, #e8e8e8 60%, #d6d6d6 100%)'
    : 'linear-gradient(155deg, #2a2a2a 0%, #161616 28%, #0c0c0c 60%, #060606 100%)'
  const innerShadow = isLight
    ? [
        'inset 0 1.5px 0 rgba(255, 255, 255, 0.95)',
        'inset 0 -8px 14px rgba(0, 0, 0, 0.07)',
      ].join(', ')
    : [
        'inset 0 1.5px 0 rgba(255, 255, 255, 0.06)',
        'inset 0 -8px 14px rgba(0, 0, 0, 0.65)',
      ].join(', ')

  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        width: HEX_W,
        height: HEX_H,
        clipPath: HEX_CLIP,
        backgroundColor:
          intensity > 0 ? `rgba(${YELLOW}, ${seamAlpha})` : baseBg,
        transition: `background-color ${TRANSITION_MS}ms linear`,
      }}
    >
      <div
        className="absolute inset-[2.5px]"
        style={{
          clipPath: HEX_CLIP,
          background: innerGradient,
          boxShadow: innerShadow,
        }}
      />
    </div>
  )
}
