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

  const accentSet = useMemo(() => {
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
      const outlineNodes = gsap.utils.toArray(
        '[data-hex="outline"]',
        svgRef.current
      )
      const accentNodes = gsap.utils.toArray(
        '[data-hex="accent"]',
        svgRef.current
      )

      gsap.set([...outlineNodes, ...accentNodes], {
        scale: 0,
        opacity: 0,
        transformOrigin: '50% 50%',
      })

      const tl = gsap.timeline()

      tl.to(outlineNodes, {
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

      tl.to(
        accentNodes,
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(2)',
          stagger: { each: 0.06, from: 'random' },
        },
        '-=0.6'
      )

      tl.to(
        outlineNodes,
        {
          opacity: 'random(0.25, 0.65)',
          duration: 2.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.04, from: 'random' },
        },
        '+=0.2'
      )

      tl.to(
        accentNodes,
        {
          opacity: 'random(0.55, 1)',
          duration: 1.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.15, from: 'random' },
        },
        '<'
      )
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
      {hexes.map((h, i) => {
        const isAccent = accentSet.has(i)
        return (
          <polygon
            key={i}
            data-hex={isAccent ? 'accent' : 'outline'}
            points={h.pts}
            fill={isAccent ? 'var(--hex-accent, #FFC501)' : 'none'}
            stroke={
              isAccent ? 'none' : 'var(--hex-stroke, rgba(255,197,1,0.28))'
            }
            strokeWidth={isAccent ? 0 : 1.4}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
          />
        )
      })}
    </svg>
  )
}
