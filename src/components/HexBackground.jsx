import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const YELLOW = '255, 230, 0'

const HEX_W = 78
const HEX_H = HEX_W * 1.1547
const ROW_GAP = HEX_H * 0.75
const ROW_OFFSET = HEX_W / 2

const FLOW_COUNT = 4
const TRAIL_LEN = 10
const TICK_MS = 180
const SCROLL_IDLE_MS = 180

const LIGHT_SELECTOR = '[data-bg-light]'
const DARK_BASE = '#080808'
const LIGHT_BASE = '#ededed'

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

function intensityToYellow(intensity) {
  const a = Math.min(1, intensity + 0.15)
  return `rgba(${YELLOW}, ${a})`
}

export default function HexBackground() {
  const [grid, setGrid] = useState({ cols: 0, rows: 0, vw: 0, vh: 0 })
  const [clipRects, setClipRects] = useState([])
  const cellRefs = useRef(new Map())
  const flowsRef = useRef([])
  const activeRef = useRef({})
  const scrollingRef = useRef(false)

  useEffect(() => {
    const update = () => {
      const cols = Math.ceil(window.innerWidth / HEX_W) + 2
      const rows = Math.ceil(window.innerHeight / ROW_GAP) + 2
      setGrid({
        cols,
        rows,
        vw: window.innerWidth,
        vh: window.innerHeight,
      })
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
    activeRef.current = {}

    const tick = () => {
      if (scrollingRef.current) return
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
          if (!next[key] || next[key] < intensity) next[key] = intensity
        })
      })

      const prev = activeRef.current
      const keys = new Set([...Object.keys(prev), ...Object.keys(next)])
      keys.forEach((key) => {
        const p = prev[key] || 0
        const n = next[key] || 0
        if (p === n) return
        const entry = cellRefs.current.get(key)
        if (!entry) return
        if (entry.dark) {
          entry.dark.style.backgroundColor =
            n > 0 ? intensityToYellow(n) : DARK_BASE
        }
        if (entry.light) {
          entry.light.style.backgroundColor =
            n > 0 ? intensityToYellow(n) : LIGHT_BASE
        }
      })
      activeRef.current = next
    }

    const id = setInterval(tick, TICK_MS)
    return () => clearInterval(id)
  }, [grid.cols, grid.rows])

  useEffect(() => {
    let raf = 0
    let idleTimer = 0
    let last = ''

    const compute = () => {
      raf = 0
      const els = document.querySelectorAll(LIGHT_SELECTOR)
      const vh = window.innerHeight
      const rects = []
      els.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.bottom <= 0 || r.top >= vh) return
        const top = Math.max(0, r.top)
        const bottom = Math.min(vh, r.bottom)
        if (bottom - top <= 0) return
        rects.push({ y: top, h: bottom - top })
      })
      const sig = rects
        .map((r) => `${r.y.toFixed(0)}:${r.h.toFixed(0)}`)
        .join('|')
      if (sig !== last) {
        last = sig
        setClipRects(rects)
      }
    }

    const schedule = () => {
      scrollingRef.current = true
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        scrollingRef.current = false
      }, SCROLL_IDLE_MS)
      if (raf) return
      raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: schedule,
      onRefresh: compute,
    })
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      st.kill()
      if (raf) cancelAnimationFrame(raf)
      if (idleTimer) window.clearTimeout(idleTimer)
    }
  }, [])

  const cells = useMemo(() => {
    const out = []
    for (let r = 0; r < grid.rows; r++) {
      for (let c = 0; c < grid.cols; c++) {
        const x = c * HEX_W + (r % 2 === 1 ? ROW_OFFSET : 0)
        const y = r * ROW_GAP
        out.push({ key: `${r}-${c}`, x, y })
      }
    }
    return out
  }, [grid.cols, grid.rows])

  return (
    <div aria-hidden>
      <div
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#040404]"
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      >
        <HexLayer cells={cells} mode="dark" cellRefs={cellRefs} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>

      <svg
        aria-hidden
        width="0"
        height="0"
        style={{ position: 'fixed', width: 0, height: 0 }}
      >
        <defs>
          <clipPath id="hex-light-clip" clipPathUnits="userSpaceOnUse">
            {clipRects.map((r, i) => (
              <rect
                key={i}
                x={0}
                y={r.y}
                width={grid.vw || 0}
                height={r.h}
              />
            ))}
          </clipPath>
        </defs>
      </svg>

      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform',
          clipPath:
            clipRects.length === 0
              ? 'inset(100% 0 0 0)'
              : 'url(#hex-light-clip)',
        }}
      >
        <div className="absolute inset-0 bg-white" />
        <HexLayer cells={cells} mode="light" cellRefs={cellRefs} />
      </div>
    </div>
  )
}

function HexLayer({ cells, mode, cellRefs }) {
  return (
    <div className="absolute inset-0">
      {cells.map((cell) => (
        <HexCell
          key={cell.key}
          cellKey={cell.key}
          x={cell.x}
          y={cell.y}
          mode={mode}
          cellRefs={cellRefs}
        />
      ))}
    </div>
  )
}

const HexCell = memo(
  function HexCell({ cellKey, x, y, mode, cellRefs }) {
    const isLight = mode === 'light'
    const baseBg = isLight ? LIGHT_BASE : DARK_BASE
    const innerGradient = isLight
      ? 'linear-gradient(155deg, #ffffff 0%, #f4f4f4 28%, #e8e8e8 60%, #d6d6d6 100%)'
      : 'linear-gradient(155deg, #2a2a2a 0%, #161616 28%, #0c0c0c 60%, #060606 100%)'
    const innerShadow = isLight
      ? 'inset 0 1.5px 0 rgba(255, 255, 255, 0.95), inset 0 -8px 14px rgba(0, 0, 0, 0.07)'
      : 'inset 0 1.5px 0 rgba(255, 255, 255, 0.06), inset 0 -8px 14px rgba(0, 0, 0, 0.65)'

    const setRef = (el) => {
      if (!el) {
        const entry = cellRefs.current.get(cellKey)
        if (entry) {
          delete entry[mode]
          if (!entry.dark && !entry.light) cellRefs.current.delete(cellKey)
        }
        return
      }
      const entry = cellRefs.current.get(cellKey) || {}
      entry[mode] = el
      cellRefs.current.set(cellKey, entry)
    }

    return (
      <div
        ref={setRef}
        className="absolute"
        style={{
          left: x,
          top: y,
          width: HEX_W,
          height: HEX_H,
          clipPath: HEX_CLIP,
          backgroundColor: baseBg,
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
)
