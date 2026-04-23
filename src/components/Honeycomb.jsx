import { useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function Honeycomb({
  cols = 18,
  rows = 11,
  size = 42,
  gap = 3,
  accentDensity = 0.07,
  className = '',
  anchor = 'right',
}) {
  const svgRef = useRef(null)

  const { viewBox, hexes } = useMemo(() => {
    const r = size
    const w = Math.sqrt(3) * r
    const hStep = w
    const vStep = 1.5 * r
    const innerR = r - gap
    const totalW = cols * hStep + hStep / 2
    const totalH = (rows - 1) * vStep + 2 * r

    const out = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = col * hStep + (row % 2 ? hStep / 2 : 0) + w / 2
        const cy = r + row * vStep
        const pts = []
        for (let k = 0; k < 6; k++) {
          const a = (Math.PI / 180) * (60 * k - 30)
          pts.push(
            `${(cx + innerR * Math.cos(a)).toFixed(2)},${(
              cy + innerR * Math.sin(a)
            ).toFixed(2)}`
          )
        }
        out.push({ row, col, cx, cy, pts: pts.join(' ') })
      }
    }
    return { viewBox: `0 0 ${totalW} ${totalH}`, hexes: out }
  }, [cols, rows, size, gap])

  const initialAccents = useMemo(() => {
    const total = hexes.length
    const target = Math.max(1, Math.round(total * accentDensity))
    const picks = new Set()
    let seed = 1337
    const next = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    while (picks.size < target) {
      const r = next()
      const c = next()
      const bias = anchor === 'right' ? c : anchor === 'left' ? 1 - c : 0.5
      const idx =
        Math.floor(r * rows) * cols +
        Math.floor(Math.min(0.999, c * 0.55 + bias * 0.45) * cols)
      picks.add(Math.min(total - 1, Math.max(0, idx)))
    }
    return picks
  }, [hexes.length, accentDensity, rows, cols, anchor])

  useGSAP(
    () => {
      const polys = gsap.utils.toArray('polygon', svgRef.current)
      const total = polys.length
      if (total === 0) return

      const accentState = new Set(initialAccents)

      gsap.set(polys, {
        scale: 0,
        opacity: 0,
        transformOrigin: '50% 50%',
        fillOpacity: 0,
        strokeOpacity: 1,
      })

      const tl = gsap.timeline()

      tl.to(polys, {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: {
          grid: [rows, cols],
          from: anchor === 'right' ? 'end' : 'start',
          each: 0.012,
        },
      })

      const accentPolys = [...accentState].map((i) => polys[i]).filter(Boolean)
      tl.to(
        accentPolys,
        {
          fillOpacity: 1,
          strokeOpacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: { each: 0.05, from: 'random' },
        },
        '-=0.55'
      )

      tl.to(
        polys,
        {
          opacity: 'random(0.55, 1)',
          duration: 2.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.04, from: 'random' },
        },
        '+=0.2'
      )

      const migrate = () => {
        const accents = [...accentState]
        if (accents.length === 0) return scheduleNext()

        const retireIdx = accents[gsap.utils.random(0, accents.length - 1, 1)]
        const candidates = []
        for (let k = 0; k < total; k++) {
          if (!accentState.has(k)) candidates.push(k)
        }
        if (candidates.length === 0) return scheduleNext()
        const newIdx = candidates[gsap.utils.random(0, candidates.length - 1, 1)]

        accentState.delete(retireIdx)
        accentState.add(newIdx)

        const retirePoly = polys[retireIdx]
        const newPoly = polys[newIdx]

        gsap.to(retirePoly, {
          fillOpacity: 0,
          strokeOpacity: 1,
          duration: 1.1,
          ease: 'power2.inOut',
        })

        gsap.fromTo(
          newPoly,
          { fillOpacity: 0, strokeOpacity: 1 },
          {
            fillOpacity: 1,
            strokeOpacity: 0,
            duration: 1.1,
            ease: 'power2.inOut',
          }
        )
        gsap.fromTo(
          newPoly,
          { scale: 0.82 },
          {
            scale: 1,
            duration: 1.4,
            ease: 'elastic.out(1, 0.55)',
          }
        )

        scheduleNext()
      }

      let migrationCall
      const scheduleNext = () => {
        const delay = gsap.utils.random(1.6, 3.2)
        migrationCall = gsap.delayedCall(delay, migrate)
      }

      const starter = gsap.delayedCall(3.2, scheduleNext)

      return () => {
        starter.kill()
        migrationCall && migrationCall.kill()
      }
    },
    { scope: svgRef, dependencies: [rows, cols, anchor] }
  )

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      {hexes.map((h, i) => (
        <polygon
          key={i}
          points={h.pts}
          fill="var(--hex-accent, #FFC501)"
          stroke="var(--hex-stroke, rgba(255,197,1,0.28))"
          strokeWidth={1.4}
          style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
        />
      ))}
    </svg>
  )
}
