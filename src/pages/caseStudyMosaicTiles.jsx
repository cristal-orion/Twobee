/* TASSELLI DEL MOSAICO (/casestudy, primo schermo)
 * ------------------------------------------------
 * Frammenti di interfaccia disegnati a codice che riempiono le caselle del
 * mosaico fra una schermata vera e l'altra. Sono dimostrativi, non schermate
 * di un cliente: per questo stanno solo nella testata, sono aria-hidden e i
 * numeri sono quelli d'esempio già usati nei facsimili (caseStudyProofs.jsx).
 *
 * Ognuno viene dal mondo di un caso: il registro delle automazioni (tutti),
 * l'Excel di prima con CERCA.VERT e #N/D (Seven), la riconciliazione al 97%
 * (Seven), la chat che modifica il sito (Tharvel), la prenotazione confermata
 * da sola (Josè).
 *
 * Colori solo del marchio, giallo, nero e bianco sporco, così si saldano alle
 * schermate in bicromia. Le caselle tagliano quello che non ci sta, come fanno
 * con gli screenshot: niente qui deve per forza vedersi tutto.
 * `data-ui` dice al controllo di tasteskill che sono interfacce, con i loro
 * bordi e i loro testi piccoli.
 */

const COPY = {
  it: {
    feedTitle: 'Automazioni · oggi',
    feed: [
      ['09:12', 'Invito a fatturare caricato', '1.284 righe'],
      ['09:13', 'Riconciliazione chiusa', '97% agganciate'],
      ['11:40', 'Nuova candidatura', 'Punteggio 92/100'],
      ['13:05', 'Prenotazione confermata', 'Sab 20:30 · 2 coperti'],
      ['15:22', 'Offerta accettata', 'Commessa creata'],
      ['17:48', 'Sito modificato in chat', 'Pubblicato'],
      ['18:30', 'Estratti conto inviati', '14 sub-agenzie'],
    ],
    sheet: {
      formula: '=CERCA.VERT(B2;Produzione!A:F;6;FALSO)',
      head: ['Cliente', 'Gettone', 'Esito'],
      rows: [
        ['Rossi', '42,00', '42,00'],
        ['Bianchi', '38,50', '#N/D'],
        ['Esposito', '42,00', '42,00'],
        ['Ferraro', '55,00', '#N/D'],
        ['Russo', '38,50', '38,50'],
      ],
    },
    kpi: { label: 'Righe agganciate', sub: '1.251 su 1.284' },
    chat: {
      ask: 'Cambia il prezzo della degustazione: 65 €',
      reply: 'Fatto. L’anteprima è pronta, pubblico?',
      publish: 'Pubblica',
      undo: 'Annulla',
    },
    booking: {
      title: 'Prenota un tavolo',
      fields: ['Sab 14', '20:30', '2 posti'],
      done: 'Confermata subito',
    },
  },
  en: {
    feedTitle: 'Automations · today',
    feed: [
      ['09:12', 'Invoice file uploaded', '1,284 rows'],
      ['09:13', 'Reconciliation closed', '97% matched'],
      ['11:40', 'New application', 'Score 92/100'],
      ['13:05', 'Booking confirmed', 'Sat 8:30pm · 2 covers'],
      ['15:22', 'Quote accepted', 'Job created'],
      ['17:48', 'Site edited in chat', 'Published'],
      ['18:30', 'Statements sent', '14 sub-agencies'],
    ],
    sheet: {
      formula: '=VLOOKUP(B2,Sales!A:F,6,FALSE)',
      head: ['Customer', 'Fee', 'Match'],
      rows: [
        ['Rossi', '42.00', '42.00'],
        ['Bianchi', '38.50', '#N/A'],
        ['Esposito', '42.00', '42.00'],
        ['Ferraro', '55.00', '#N/A'],
        ['Russo', '38.50', '38.50'],
      ],
    },
    kpi: { label: 'Rows matched', sub: '1,251 of 1,284' },
    chat: {
      ask: 'Change the tasting menu price to €65',
      reply: 'Done. The preview is ready, shall I publish?',
      publish: 'Publish',
      undo: 'Undo',
    },
    booking: {
      title: 'Book a table',
      fields: ['Sat 14', '8:30pm', '2 seats'],
      done: 'Confirmed at once',
    },
  },
}

const INK = '#0B0B0C'
const PAPER = '#FBFAF9'
const YELLOW = '#FFC501'

/* Registro delle automazioni: la casella alta. Le voci entrano una alla volta
 * (classe cs-feed-item, animata in Hero), come se arrivassero adesso. */
export function FeedTile({ lang }) {
  const t = COPY[lang]
  return (
    <div data-ui aria-hidden className="absolute inset-0 overflow-hidden bg-[#161618] p-3 sm:p-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: YELLOW }} />
        <span className="text-[10px] font-bold sm:text-[11px]" style={{ color: YELLOW }}>
          {t.feedTitle}
        </span>
      </div>
      <ul className="mt-3 space-y-1.5 sm:space-y-2">
        {t.feed.map(([time, title, sub]) => (
          <li key={time} className="cs-feed-item flex gap-2.5 rounded-md bg-[#232327] px-2.5 py-2">
            <span className="hidden shrink-0 text-[10px] tabular-nums text-zinc-500 sm:inline">{time}</span>
            <span className="min-w-0">
              <span className="line-clamp-2 text-[11px] font-semibold leading-tight sm:line-clamp-1 sm:text-[12px]" style={{ color: PAPER }}>
                {title}
              </span>
              <span className="hidden truncate text-[10px] leading-tight text-zinc-400 sm:block sm:text-[11px]">{sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* L'Excel di prima: la formula che tutti conoscono e i #N/D da cercare a mano. */
export function SheetTile({ lang }) {
  const t = COPY[lang].sheet
  return (
    <div data-ui aria-hidden className="absolute inset-0 overflow-hidden bg-white" style={{ color: INK }}>
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-2 py-1.5">
        <span className="text-[10px] font-bold italic text-zinc-500">fx</span>
        {/* taste-skill-ignore: è una formula, cioè codice letterale */}
        <code className="truncate font-mono text-[10px] text-zinc-700">{t.formula}</code>
      </div>
      <table className="w-full table-fixed border-collapse text-[10px] tabular-nums sm:text-[11px]">
        <thead>
          <tr className="bg-zinc-100 text-zinc-600">
            <th className="w-5 border border-zinc-200 font-normal" />
            {t.head.map((h) => (
              <th key={h} className="truncate border border-zinc-200 px-1.5 py-1 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r, i) => (
            <tr key={r[0]}>
              <td className="border border-zinc-200 bg-zinc-100 text-center text-zinc-400">{i + 2}</td>
              {r.map((c, j) => {
                const missing = c.startsWith('#')
                return (
                  <td
                    key={j}
                    className={`truncate border border-zinc-200 px-1.5 py-1 ${missing ? 'font-bold' : ''}`}
                    style={missing ? { background: YELLOW } : undefined}
                  >
                    {c}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* La riconciliazione di Seven in un numero. La barra cresce all'ingresso
 * (classe cs-kpi-bar, animata in Hero). */
export function KpiTile({ lang }) {
  const t = COPY[lang].kpi
  return (
    <div data-ui aria-hidden className="absolute inset-0 flex flex-col justify-end overflow-hidden bg-[#161618] p-4 sm:p-5">
      <span className="text-[11px] font-semibold text-zinc-400">{t.label}</span>
      <span
        className="mt-1 font-display text-[clamp(2.5rem,4vw,4rem)] font-extrabold leading-none tracking-[-0.04em]"
        style={{ color: YELLOW }}
      >
        97%
      </span>
      <span className="mt-3 block h-1.5 w-full overflow-hidden rounded-full bg-[#2a2a2e]">
        <span className="cs-kpi-bar block h-full w-[97%] origin-left rounded-full" style={{ background: YELLOW }} />
      </span>
      <span className="mt-2 text-[11px] tabular-nums text-zinc-400">{t.sub}</span>
    </div>
  )
}

/* Tharvel: il cliente chiede, il pannello risponde con l'anteprima. */
export function ChatTile({ lang }) {
  const t = COPY[lang].chat
  return (
    <div data-ui aria-hidden className="absolute inset-0 flex flex-col justify-center gap-2 overflow-hidden p-3 sm:p-4" style={{ background: PAPER }}>
      <p
        className="ml-auto max-w-[85%] rounded-2xl rounded-br-md px-3 py-2 text-[11px] leading-snug sm:text-[12px]"
        style={{ background: INK, color: PAPER }}
      >
        {t.ask}
      </p>
      <p
        className="max-w-[85%] rounded-2xl rounded-bl-md bg-zinc-200 px-3 py-2 text-[11px] leading-snug sm:text-[12px]"
        style={{ color: INK }}
      >
        {t.reply}
      </p>
      <div className="flex gap-1.5">
        <span className="rounded-full px-3 py-1 text-[10px] font-bold sm:text-[11px]" style={{ background: YELLOW, color: INK }}>
          {t.publish}
        </span>
        <span className="rounded-full border border-zinc-300 px-3 py-1 text-[10px] font-semibold text-zinc-600 sm:text-[11px]">
          {t.undo}
        </span>
      </div>
    </div>
  )
}

/* Josè: il tavolo per due che si conferma da solo. */
export function BookingTile({ lang }) {
  const t = COPY[lang].booking
  return (
    <div data-ui aria-hidden className="absolute inset-0 flex items-center justify-center overflow-hidden p-3 sm:p-4" style={{ background: YELLOW }}>
      <div className="w-full max-w-[240px] rounded-xl bg-white p-3" style={{ color: INK }}>
        <p className="font-display text-[13px] font-extrabold">{t.title}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {t.fields.map((f) => (
            <span key={f} className="whitespace-nowrap rounded-md border border-zinc-200 px-2 py-1 text-[11px] font-semibold">
              {f}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-bold" style={{ background: INK, color: PAPER }}>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none">
            <path d="m5 12.5 4.5 4.5L19 7.5" stroke={YELLOW} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.done}
        </div>
      </div>
    </div>
  )
}
