/* ICONE DEI CASE STUDY
 * --------------------
 * Un set unico per «Risultati chiave» e «Come funziona», disegnato a tratto e
 * non riempito: appoggiate su un fondo chiaro o scuro cambiano da sole, perché
 * il colore è sempre `currentColor`.
 *
 * Perché a codice e non una libreria: ne servono una trentina, pesano meno di
 * un'icona di lucide-react una volta nel bundle, e non c'è un pacchetto in più
 * da aggiornare per tre linee di SVG.
 *
 * REGOLE DEL TRATTO. Tutte su viewBox 24, `strokeWidth` 1.7, estremi tondi: a
 * 20px sono ancora leggibili e a 40 non diventano grasse. Se ne aggiungi una,
 * disegnala nella stessa griglia — un'icona con un tratto diverso si vede
 * subito in mezzo alle altre.
 *
 * Un nome non presente qui non rompe la pagina: <Icon> non disegna niente e il
 * blocco resta valido (vedi `paths[name]` più sotto).
 */

/* Ogni voce è un array di `d`: più tracciati per icona, nessun fill. */
const paths = {
  /* --- oggetti e documenti --- */
  doc: [
    'M14 2.75H7A1.75 1.75 0 0 0 5.25 4.5v15A1.75 1.75 0 0 0 7 21.25h10a1.75 1.75 0 0 0 1.75-1.75V7.5L14 2.75Z',
    'M14 2.75V7.5h4.75',
    'M8.5 12.5h7M8.5 16.5h4.5',
  ],
  calculator: [
    'M6.5 2.75h11A1.75 1.75 0 0 1 19.25 4.5v15a1.75 1.75 0 0 1-1.75 1.75h-11A1.75 1.75 0 0 1 4.75 19.5v-15A1.75 1.75 0 0 1 6.5 2.75Z',
    'M8.25 6.25h7.5v3.5h-7.5z',
    'M8.75 13.25h.01M12 13.25h.01M15.25 13.25h.01M8.75 17h.01M12 17h.01M15.25 17h.01',
  ],
  briefcase: [
    'M4.5 8.25h15a1.25 1.25 0 0 1 1.25 1.25v9.25a1.75 1.75 0 0 1-1.75 1.75h-14A1.75 1.75 0 0 1 3.25 18.75V9.5A1.25 1.25 0 0 1 4.5 8.25Z',
    'M9 8.25V6a1.75 1.75 0 0 1 1.75-1.75h2.5A1.75 1.75 0 0 1 15 6v2.25',
    'M3.25 13.25h17.5',
  ],
  cart: [
    'M2.75 3.75h2.1l2.4 11.1a1.5 1.5 0 0 0 1.47 1.18h8.35a1.5 1.5 0 0 0 1.47-1.2l1.46-7.33H6.1',
    'M9.5 20.25a1.13 1.13 0 1 0 0-2.25 1.13 1.13 0 0 0 0 2.25Z',
    'M17.75 20.25a1.13 1.13 0 1 0 0-2.25 1.13 1.13 0 0 0 0 2.25Z',
  ],
  box: [
    'M12 2.75 20.75 7.5v9L12 21.25 3.25 16.5v-9L12 2.75Z',
    'M3.25 7.5 12 12.25 20.75 7.5',
    'M12 12.25v9',
  ],
  truck: [
    'M2.75 6.75A1.25 1.25 0 0 1 4 5.5h8.75v11H4a1.25 1.25 0 0 1-1.25-1.25v-8.5Z',
    'M12.75 9.5h3.6a1.25 1.25 0 0 1 1 .49l2.65 3.45a1.25 1.25 0 0 1 .25.76v2.3h-7.5V9.5Z',
    'M7 19.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z',
    'M17.25 19.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z',
  ],
  inbox: [
    'M3.25 13.75h4.1l1.4 2.75h6.5l1.4-2.75h4.1',
    'M5.1 5.35 3.25 13.75v3.5A1.75 1.75 0 0 0 5 19h14a1.75 1.75 0 0 0 1.75-1.75v-3.5L18.9 5.35a1.75 1.75 0 0 0-1.65-1.1H6.75a1.75 1.75 0 0 0-1.65 1.1Z',
  ],
  database: [
    'M12 7.5c4.55 0 8.25-1.12 8.25-2.5S16.55 2.5 12 2.5 3.75 3.62 3.75 5 7.45 7.5 12 7.5Z',
    'M20.25 5v14c0 1.38-3.7 2.5-8.25 2.5S3.75 20.38 3.75 19V5',
    'M20.25 12c0 1.38-3.7 2.5-8.25 2.5S3.75 13.38 3.75 12',
  ],
  layers: ['m12 2.75 9.25 4.75L12 12.25 2.75 7.5 12 2.75Z', 'm2.75 12 9.25 4.75L21.25 12', 'm2.75 16.5 9.25 4.75 9.25-4.75'],

  /* --- tempo, misura, esito --- */
  clock: ['M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5Z', 'M12 6.75V12l3.5 2.1'],
  gauge: ['M3.5 17.25a8.5 8.5 0 1 1 17 0', 'm12.4 12.6 3.85-4.35', 'M12 14.1a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z'],
  chart: ['M3.25 20.75h17.5', 'M7 17V10.5M12 17V4.75M17 17v-4.25'],
  bolt: ['M13.25 2.75 4 14.25h6.6l-.85 7 9.25-11.5H12.4l.85-7Z'],
  checkCircle: ['M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5Z', 'm8.1 12.15 2.7 2.7 5.1-5.6'],
  xCircle: ['M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5Z', 'm9.25 9.25 5.5 5.5M14.75 9.25l-5.5 5.5'],
  info: ['M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5Z', 'M12 16.5v-4.75M12 8.1h.01'],
  shieldCheck: [
    'M12 2.75 4.75 5.6v5.65c0 4.4 3.08 8.5 7.25 9.55 4.17-1.05 7.25-5.15 7.25-9.55V5.6L12 2.75Z',
    'm9.1 11.9 2.15 2.15 3.9-4.3',
  ],
  filter: ['M3.25 4.75h17.5L13.9 13.2v6.9l-3.8-2.4v-4.5L3.25 4.75Z'],
  merge: ['M3.25 6.25h3.9l4.6 5.75M3.25 12h3.9M3.25 17.75h3.9l4.6-5.75', 'M11.75 12h8.5', 'm17.4 8.6 3.4 3.4-3.4 3.4'],
  undo: ['M3.75 8.75h10.75a5.5 5.5 0 1 1 0 11H8.5', 'm7.6 4.25-3.85 4.5 3.85 4.5'],
  upload: ['M12 16.25V3.25', 'm7.25 8 4.75-4.75L16.75 8', 'M3.75 15.75v3.5A1.5 1.5 0 0 0 5.25 20.75h13.5a1.5 1.5 0 0 0 1.5-1.5v-3.5'],
  cog: [
    'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
    'M12 2.5v2.75M12 18.75v2.75M21.5 12h-2.75M5.25 12H2.5',
    'm18.72 5.28-1.95 1.95M7.23 16.77l-1.95 1.95M18.72 18.72l-1.95-1.95M7.23 7.23 5.28 5.28',
  ],

  /* --- persone e canali --- */
  eye: ['M2.75 12S6.25 5.75 12 5.75 21.25 12 21.25 12 17.75 18.25 12 18.25 2.75 12 2.75 12Z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'],
  users: [
    'M16.25 20.75v-1.9a4 4 0 0 0-4-4h-4.5a4 4 0 0 0-4 4v1.9',
    'M10 10.75a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
    'M21.25 20.75v-1.9a4 4 0 0 0-3-3.87',
    'M16.5 3a4 4 0 0 1 0 7.75',
  ],
  userCheck: [
    'M14.75 20.75v-1.9a4 4 0 0 0-4-4h-4.5a4 4 0 0 0-4 4v1.9',
    'M8.5 10.75a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
    'm16.25 11.75 2 2 3.75-3.9',
  ],
  phone: [
    'M21.25 16.9v2.85a1.9 1.9 0 0 1-2.1 1.9 19 19 0 0 1-8.25-2.95 18.7 18.7 0 0 1-5.75-5.75A19 19 0 0 1 2.2 4.65a1.9 1.9 0 0 1 1.9-2.1h2.85a1.9 1.9 0 0 1 1.9 1.63c.12.92.35 1.82.68 2.68a1.9 1.9 0 0 1-.43 2L7.9 10.1a15.3 15.3 0 0 0 5.75 5.75l1.24-1.2a1.9 1.9 0 0 1 2-.43c.86.33 1.76.56 2.68.68a1.9 1.9 0 0 1 1.68 1.95Z',
  ],
  chat: ['M20.75 12.25a7.75 7.75 0 0 1-11.2 6.95L3.9 20.75l1.55-5.4A7.75 7.75 0 1 1 20.75 12.25Z'],
  megaphone: ['M3.25 10.5v3a1.75 1.75 0 0 0 1.75 1.75h1.9l6.35 4.5V4.25L6.9 8.75H5a1.75 1.75 0 0 0-1.75 1.75Z', 'M17.5 8.5a5 5 0 0 1 0 7'],
  calendar: ['M4.75 5.25h14.5a1.25 1.25 0 0 1 1.25 1.25v13a1.25 1.25 0 0 1-1.25 1.25H4.75A1.25 1.25 0 0 1 3.5 19.5v-13a1.25 1.25 0 0 1 1.25-1.25Z', 'M3.5 10h17', 'M8 2.75v4.5M16 2.75v4.5'],
  calendarCheck: [
    'M4.75 5.25h14.5a1.25 1.25 0 0 1 1.25 1.25v13a1.25 1.25 0 0 1-1.25 1.25H4.75A1.25 1.25 0 0 1 3.5 19.5v-13a1.25 1.25 0 0 1 1.25-1.25Z',
    'M3.5 10h17',
    'M8 2.75v4.5M16 2.75v4.5',
    'm9 15.25 2.1 2.1 4.15-4.35',
  ],
  sparkle: [
    'm10.5 2.75 1.9 4.85 4.85 1.9-4.85 1.9-1.9 4.85-1.9-4.85-4.85-1.9 4.85-1.9 1.9-4.85Z',
    'm18.25 15.5.75 1.9 1.9.75-1.9.75-.75 1.9-.75-1.9-1.9-.75 1.9-.75.75-1.9Z',
  ],
  /* Marchio, non un pittogramma nostro: sta nella stessa griglia delle altre ma
   * la «in» va disegnata a tratto perché il set è tutto stroke, non fill. */
  linkedin: [
    'M4.25 3.25h15.5a1 1 0 0 1 1 1v15.5a1 1 0 0 1-1 1H4.25a1 1 0 0 1-1-1V4.25a1 1 0 0 1 1-1Z',
    'M7.5 10.5v6.25M7.5 7.4v.01',
    'M11.75 16.75V10.5M11.75 13.4a2.9 2.9 0 0 1 5.8 0v3.35',
  ],
}

/* `name` sconosciuto → non disegna niente, invece di far cadere la sezione. */
export function Icon({ name, className = 'h-6 w-6' }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  )
}

export const ICON_NAMES = Object.keys(paths)
