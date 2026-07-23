import { useState } from 'react'

// Slider fields for every numeric HexFloat prop. min/max come from the
// ranges documented as comments in HexFloat.tsx (e.g. tilt -30..30).
const FIELDS = [
  { key: 'size', label: 'Size', min: 20, max: 260, step: 2 },
  { key: 'gap', label: 'Gap', min: 0, max: 24, step: 1 },
  { key: 'bevel', label: 'Bevel', min: 0, max: 20, step: 0.5 },
  { key: 'tilt', label: 'Tilt', min: -30, max: 30, step: 1 },
  { key: 'perspective', label: 'Perspective', min: 0, max: 1, step: 0.01 },
  { key: 'float', label: 'Float', min: 0, max: 1, step: 0.01 },
  { key: 'speed', label: 'Speed', min: 0, max: 3, step: 0.1 },
  { key: 'shine', label: 'Shine', min: 0, max: 2, step: 0.05 },
  { key: 'lift', label: 'Lift', min: 0, max: 1, step: 0.01 },
  { key: 'radius', label: 'Radius', min: 200, max: 2400, step: 20 },
  { key: 'flow', label: 'Flow', min: 0, max: 3, step: 0.05 },
  { key: 'swirl', label: 'Swirl', min: 0, max: 15, step: 0.5 },
  { key: 'trail', label: 'Trail', min: 0, max: 1, step: 0.01 },
  { key: 'iridescence', label: 'Iridescence', min: 0, max: 2, step: 0.05 },
  { key: 'bloom', label: 'Bloom', min: 0, max: 1, step: 0.02 },
  { key: 'grain', label: 'Grain', min: 0, max: 1, step: 0.02 },
]

function rgbToHex([r, g, b]) {
  const c = (n) => Math.round(Math.min(1, Math.max(0, n)) * 255).toString(16).padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

function hexToRgb(hex) {
  const v = hex.replace('#', '')
  const n = (i) => Math.round((parseInt(v.slice(i, i + 2), 16) / 255) * 10000) / 10000
  return [n(0), n(2), n(4)]
}

function formatValue(v) {
  return Number.isInteger(v) ? String(v) : String(Math.round(v * 1000) / 1000)
}

function formatPropsJSX(props) {
  const lines = FIELDS.map(({ key }) => `  ${key}={${formatValue(props[key])}}`)
  const gapColorLine =
    props.gapColor === 'auto'
      ? `  gapColor="auto"`
      : `  gapColor={[${props.gapColor.map((n) => Math.round(n * 10000) / 10000).join(', ')}]}`
  return `<HexFloat\n${lines.join('\n')}\n${gapColorLine}\n>`
}

export default function HexFloatControls({ value, onChange, defaults }) {
  const [open, setOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  const set = (key, v) => onChange({ ...value, [key]: v })
  const isAuto = value.gapColor === 'auto'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(formatPropsJSX(value))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="pointer-events-auto fixed bottom-6 right-6 z-50 rounded-full border border-white/15 bg-black/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md hover:text-white"
      >
        Controls
      </button>
    )
  }

  return (
    <div className="pointer-events-auto fixed bottom-6 right-6 z-50 max-h-[80vh] w-[300px] overflow-y-auto rounded-2xl border border-white/15 bg-black/80 p-4 text-white backdrop-blur-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow">
          Hex Float controls
        </p>
        <div className="flex items-center gap-3 text-white/50">
          <button type="button" onClick={() => onChange(defaults)} aria-label="Reset" title="Reset" className="hover:text-white">
            ↺
          </button>
          <button type="button" onClick={() => setOpen(false)} aria-label="Chiudi controlli" className="hover:text-white">
            ×
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {FIELDS.map((f) => (
          <label key={f.key} className="block text-[11px]">
            <div className="mb-1 flex items-center justify-between text-white/70">
              <span>{f.label}</span>
              <span className="font-mono text-white/50">{formatValue(value[f.key])}</span>
            </div>
            <input
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={value[f.key]}
              onChange={(e) => set(f.key, Number(e.target.value))}
              className="w-full accent-brand-yellow"
            />
          </label>
        ))}

        <div className="block text-[11px]">
          <div className="mb-1 flex items-center justify-between text-white/70">
            <span>Gap color</span>
            <label className="flex items-center gap-1 text-white/50">
              <input
                type="checkbox"
                checked={isAuto}
                onChange={(e) => set('gapColor', e.target.checked ? 'auto' : [1, 0.7725, 0.0039])}
              />
              auto
            </label>
          </div>
          <input
            type="color"
            disabled={isAuto}
            value={isAuto ? '#000000' : rgbToHex(value.gapColor)}
            onChange={(e) => set('gapColor', hexToRgb(e.target.value))}
            className="h-8 w-full rounded disabled:opacity-30"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={copy}
        className="mt-4 w-full rounded-full bg-brand-yellow px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-black transition hover:scale-[1.02]"
      >
        {copied ? 'Copiato ✓' : 'Copia settings'}
      </button>
    </div>
  )
}
