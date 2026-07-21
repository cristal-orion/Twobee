/* Hallmark · Flappy Twobee — esagono giallo che schiva i pain point dell'imprenditore.
 * Canvas + requestAnimationFrame, fisica frame-rate independent (dt in secondi).
 * Nessuno stato React nel game-loop: posizioni su ref, score scritto via textContent,
 * setState solo al passaggio idle→playing→over. Il restart avviene per remount (key).
 *
 * Contratto:
 *   pains   : [{ key, label }]  — ordine dei tubi (ciclico)
 *   labels  : { tag, score, best, idle }
 *   onStart : () => void        — al primo colpo d'ala
 *   onScore : (n) => void       — ad ogni pain point schivato
 *   onCrash : (painKey, score)  — allo schianto (tubo o terreno)
 *   reduce  : bool              — prefers-reduced-motion (disattiva il bob idle)
 */
import { useEffect, useRef, useState } from 'react'

const clamp = (v, a, b) => Math.min(Math.max(v, a), b)

function cfgFor(w, h) {
  return {
    G: h * 3.6, // gravità px/s²
    FLAP: -h * 1.12, // impulso colpo d'ala px/s
    MAXV: h * 1.7, // velocità di caduta max
    SPEED: clamp(w * 0.36, 150, 290), // scorrimento tubi px/s
    GAP: clamp(h * 0.34, 150, 260), // apertura verticale
    PW: clamp(w * 0.16, 66, 108), // larghezza tubo
    SPAWN: clamp(w * 0.62, 230, 400), // distanza tra tubi
    GROUND: clamp(h * 0.05, 18, 36), // altezza terreno
    R: clamp(h * 0.05, 16, 30) * 0.85, // raggio apina (−15%, guida disegno + hitbox)
    BIRDX: w * 0.3, // x fissa dell'esagono
  }
}

/* ---- primitive di disegno --------------------------------------- */
function rr(ctx, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2))
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function wrapLines(ctx, text, maxW) {
  const words = text.split(' ')
  const lines = []
  let cur = ''
  for (const wd of words) {
    const test = cur ? cur + ' ' + wd : wd
    if (ctx.measureText(test).width > maxW && cur) {
      lines.push(cur)
      cur = wd
    } else cur = test
  }
  if (cur) lines.push(cur)
  return lines
}

export default function FlappyGame({
  pains,
  labels,
  best = 0,
  onStart,
  onScore,
  onCrash,
  reduce = false,
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const cfgRef = useRef(cfgFor(400, 480))
  const stateRef = useRef(null)
  const phaseRef = useRef('idle')
  const rafRef = useRef(0)
  const scoreElRef = useRef(null)
  const [phase, setPhase] = useState('idle')

  // riferimenti a props volatili (l'engine gira in un effect a mount singolo)
  const cbRef = useRef({ onStart, onScore, onCrash })
  cbRef.current = { onStart, onScore, onCrash }
  const painsRef = useRef(pains)
  painsRef.current = pains

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    ctxRef.current = canvas.getContext('2d')

    const makeState = (w, h) => ({
      w,
      h,
      bird: { y: h * 0.42, vy: 0, rot: 0 },
      pipes: [],
      spawnCount: 0,
      score: 0,
      t: 0,
      anim: 0,
      last: 0,
    })

    function resize() {
      const rect = wrap.getBoundingClientRect()
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0)
      cfgRef.current = cfgFor(w, h)
      if (stateRef.current) {
        stateRef.current.w = w
        stateRef.current.h = h
      } else {
        stateRef.current = makeState(w, h)
      }
    }

    function makePipe(x) {
      const s = stateRef.current
      const p = {
        x,
        gc: 0.26 + Math.random() * 0.46, // centro apertura (frazione di h)
        pain: s.spawnCount % painsRef.current.length,
        scored: false,
      }
      s.spawnCount++
      return p
    }

    function nearestPainIdx() {
      const s = stateRef.current
      const C = cfgRef.current
      let idx = 0
      let bd = Infinity
      for (const p of s.pipes) {
        const d = Math.abs(p.x + C.PW / 2 - C.BIRDX)
        if (d < bd) {
          bd = d
          idx = p.pain
        }
      }
      return idx
    }

    function die(painIdx) {
      if (phaseRef.current === 'over') return
      phaseRef.current = 'over'
      setPhase('over')
      const key = painsRef.current[painIdx] ? painsRef.current[painIdx].key : undefined
      cbRef.current.onCrash && cbRef.current.onCrash(key, stateRef.current.score)
    }

    function update(dt) {
      const s = stateRef.current
      const C = cfgRef.current
      const b = s.bird

      if (phaseRef.current === 'idle') {
        s.t += dt
        b.y = s.h * 0.42 + (reduce ? 0 : Math.sin(s.t * 2.2) * s.h * 0.02)
        b.rot = reduce ? 0 : Math.sin(s.t * 2.2) * 0.12
        return
      }
      if (phaseRef.current !== 'playing') return

      b.vy = Math.min(b.vy + C.G * dt, C.MAXV)
      b.y += b.vy * dt
      b.rot = clamp((b.vy / C.MAXV) * 1.6, -0.5, 1.3)

      for (const p of s.pipes) p.x -= C.SPEED * dt

      const last = s.pipes[s.pipes.length - 1]
      if (s.pipes.length === 0) s.pipes.push(makePipe(s.w * 1.0))
      else if (last.x <= s.w - C.SPAWN) s.pipes.push(makePipe(last.x + C.SPAWN))

      while (s.pipes.length && s.pipes[0].x + C.PW < -12) s.pipes.shift()

      for (const p of s.pipes) {
        if (!p.scored && p.x + C.PW < C.BIRDX) {
          p.scored = true
          s.score++
          if (scoreElRef.current) scoreElRef.current.textContent = String(s.score)
          cbRef.current.onScore && cbRef.current.onScore(s.score)
        }
      }

      const r = C.R * 0.8
      if (b.y - r < 0) {
        b.y = r
        b.vy = 0
      }
      if (b.y + r > s.h - C.GROUND) {
        die(nearestPainIdx())
        return
      }
      for (const p of s.pipes) {
        if (C.BIRDX + r > p.x && C.BIRDX - r < p.x + C.PW) {
          const gapTop = p.gc * s.h - C.GAP / 2
          const gapBot = p.gc * s.h + C.GAP / 2
          if (b.y - r < gapTop || b.y + r > gapBot) {
            die(p.pain)
            return
          }
        }
      }
    }

    function drawLabel(ctx, p, C, H, gapTop, gapBot) {
      const label = painsRef.current[p.pain] ? painsRef.current[p.pain].label : ''
      if (!label) return
      const cx = p.x + C.PW / 2
      const topH = gapTop
      const botH = H - C.GROUND - gapBot
      const inTop = topH >= botH
      const fs = clamp(C.PW * 0.155, 10.5, 13.5)
      ctx.font = `700 ${fs}px "Inter", system-ui, sans-serif`
      const lines = wrapLines(ctx, label, C.PW + 26)
      const lh = fs * 1.16
      const padX = 9
      const padY = 6
      let maxW = 0
      for (const ln of lines) maxW = Math.max(maxW, ctx.measureText(ln).width)
      const bw = maxW + padX * 2
      const bh = lines.length * lh + padY * 2
      const region = inTop ? topH : botH
      const regionTop = inTop ? 0 : gapBot
      let by = regionTop + Math.max(4, (region - bh) / 2)
      if (inTop) by = Math.min(by, gapTop - bh - 4)
      else by = Math.min(by, H - C.GROUND - bh - 4)

      ctx.save()
      ctx.fillStyle = '#FFC501'
      ctx.shadowColor = 'rgba(0,0,0,0.35)'
      ctx.shadowBlur = 10
      ctx.shadowOffsetY = 4
      rr(ctx, cx - bw / 2, by, bw, bh, 9)
      ctx.fill()
      ctx.restore()

      ctx.fillStyle = '#0B0B0C'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      lines.forEach((ln, i) => ctx.fillText(ln, cx, by + padY + i * lh))
      ctx.textAlign = 'start'
      ctx.textBaseline = 'alphabetic'
    }

    function drawPipe(ctx, p, C, H) {
      const gapTop = p.gc * H - C.GAP / 2
      const gapBot = p.gc * H + C.GAP / 2
      const x = p.x
      const w = C.PW
      const grd = ctx.createLinearGradient(x, 0, x + w, 0)
      grd.addColorStop(0, '#1b1b1f')
      grd.addColorStop(1, '#0d0d10')
      ctx.fillStyle = grd
      ctx.strokeStyle = 'rgba(255,255,255,0.07)'
      ctx.lineWidth = 1

      rr(ctx, x, -24, w, gapTop + 24, 11)
      ctx.fill()
      ctx.stroke()
      const botH = H - C.GROUND - gapBot + 24
      rr(ctx, x, gapBot, w, botH, 11)
      ctx.fill()
      ctx.stroke()

      // cap gialli ai bordi dell'apertura
      ctx.fillStyle = '#FFC501'
      rr(ctx, x - 2, gapTop - 11, w + 4, 12, 6)
      ctx.fill()
      rr(ctx, x - 2, gapBot - 1, w + 4, 12, 6)
      ctx.fill()

      drawLabel(ctx, p, C, H, gapTop, gapBot)
    }

    // 🐝 apina Twobee — corpo giallo a strisce, ali che sbattono, guarda a destra
    function drawBee(ctx, C, b, anim) {
      const R = C.R
      const flap = Math.sin(anim * 26) * 0.55
      ctx.save()
      ctx.translate(C.BIRDX, b.y)
      ctx.rotate(b.rot)

      // ali (dietro il corpo)
      ctx.fillStyle = 'rgba(255,255,255,0.72)'
      ctx.strokeStyle = 'rgba(0,0,0,0.18)'
      ctx.lineWidth = 1
      ctx.save()
      ctx.translate(-R * 0.1, -R * 0.55)
      ctx.save()
      ctx.rotate(-0.55 + flap)
      ctx.beginPath()
      ctx.ellipse(0, -R * 0.35, R * 0.42, R * 0.72, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
      ctx.save()
      ctx.rotate(-0.05 + flap)
      ctx.beginPath()
      ctx.ellipse(R * 0.3, -R * 0.32, R * 0.4, R * 0.64, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
      ctx.restore()

      // corpo
      ctx.shadowColor = 'rgba(255,197,1,0.4)'
      ctx.shadowBlur = 16
      ctx.fillStyle = '#FFC501'
      ctx.beginPath()
      ctx.ellipse(0, 0, R * 1.12, R * 0.82, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(0,0,0,0.45)'
      ctx.stroke()

      // strisce nere (clip al corpo)
      ctx.save()
      ctx.beginPath()
      ctx.ellipse(0, 0, R * 1.12, R * 0.82, 0, 0, Math.PI * 2)
      ctx.clip()
      ctx.fillStyle = '#0B0B0C'
      ctx.fillRect(-R * 0.72, -R, R * 0.26, R * 2)
      ctx.fillRect(-R * 0.24, -R, R * 0.26, R * 2)
      ctx.fillRect(R * 0.24, -R, R * 0.26, R * 2)
      ctx.restore()

      // pungiglione (coda)
      ctx.fillStyle = '#0B0B0C'
      ctx.beginPath()
      ctx.moveTo(-R * 1.08, 0)
      ctx.lineTo(-R * 1.5, -R * 0.14)
      ctx.lineTo(-R * 1.5, R * 0.14)
      ctx.closePath()
      ctx.fill()

      // occhio (davanti)
      ctx.fillStyle = '#0B0B0C'
      ctx.beginPath()
      ctx.arc(R * 0.66, -R * 0.1, R * 0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.beginPath()
      ctx.arc(R * 0.7, -R * 0.15, R * 0.055, 0, Math.PI * 2)
      ctx.fill()

      // antenna
      ctx.strokeStyle = '#0B0B0C'
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.moveTo(R * 0.85, -R * 0.55)
      ctx.quadraticCurveTo(R * 1.2, -R * 0.95, R * 1.05, -R * 1.15)
      ctx.stroke()
      ctx.fillStyle = '#0B0B0C'
      ctx.beginPath()
      ctx.arc(R * 1.03, -R * 1.2, R * 0.09, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    function drawGround(ctx, C, W, H) {
      const gy = H - C.GROUND
      ctx.fillStyle = 'rgba(255,197,1,0.10)'
      ctx.fillRect(0, gy, W, C.GROUND)
      ctx.fillStyle = '#FFC501'
      ctx.fillRect(0, gy, W, 2)
    }

    function render() {
      const ctx = ctxRef.current
      const s = stateRef.current
      const C = cfgRef.current
      const W = s.w
      const H = s.h
      ctx.clearRect(0, 0, W, H)

      const bg = ctx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0, 'rgba(255,197,1,0.04)')
      bg.addColorStop(0.5, 'rgba(0,0,0,0)')
      bg.addColorStop(1, 'rgba(0,0,0,0.14)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      for (const p of s.pipes) drawPipe(ctx, p, C, H)
      drawGround(ctx, C, W, H)
      drawBee(ctx, C, s.bird, s.anim)
    }

    function tick(now) {
      const s = stateRef.current
      if (!s.last) s.last = now
      let dt = (now - s.last) / 1000
      s.last = now
      if (dt > 0.05) dt = 0.05
      s.anim += dt
      update(dt)
      render()
      if (phaseRef.current !== 'over') rafRef.current = requestAnimationFrame(tick)
    }

    function flap() {
      if (phaseRef.current === 'over') return
      if (phaseRef.current === 'idle') {
        phaseRef.current = 'playing'
        setPhase('playing')
        stateRef.current.last = 0
        stateRef.current.bird.vy = 0
        cbRef.current.onStart && cbRef.current.onStart()
      }
      stateRef.current.bird.vy = cfgRef.current.FLAP
    }

    const onDown = (e) => {
      e.preventDefault()
      flap()
    }
    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        const t = e.target
        const tag = (t.tagName || '').toLowerCase()
        if (tag === 'input' || tag === 'textarea' || t.isContentEditable) return
        if (phaseRef.current === 'over') return
        e.preventDefault()
        flap()
      }
    }
    const onVis = () => {
      if (stateRef.current) stateRef.current.last = 0
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    document.addEventListener('visibilitychange', onVis)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('visibilitychange', onVis)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={wrapRef}
      className="relative h-[clamp(400px,62vh,580px)] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand-yellow/10 blur-3xl"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ touchAction: 'none' }}
      />

      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
        <span className="rounded-full border border-white/10 bg-brand-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-yellow">
          {labels.tag}
        </span>
        <span className="rounded-full border border-white/10 bg-brand-black/50 px-3 py-1.5 text-[11px] font-semibold text-white/70">
          {labels.score}:{' '}
          <span ref={scoreElRef} className="font-display font-extrabold text-brand-yellow">
            0
          </span>
          <span className="mx-1.5 text-white/25">·</span>
          {labels.best}: <span className="font-display font-extrabold text-white/80">{best}</span>
        </span>
      </div>

      {/* istruzioni idle */}
      {phase === 'idle' && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-3 pb-[16%] text-center">
          <span className="animate-bounce text-3xl">👆</span>
          <p className="rounded-full bg-brand-black/60 px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur-sm">
            {labels.idle}
          </p>
        </div>
      )}
    </div>
  )
}
