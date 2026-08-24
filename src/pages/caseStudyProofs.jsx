/* «LA PROVA» — cosa si vede davvero, per i casi che hanno qualcosa da mostrare
 * -----------------------------------------------------------------------------
 * Sostituisce caseStudyBlueprints.jsx (2026-08-06). Prima ogni caso portava un
 * diagramma di flusso disegnato a codice; adesso quel lavoro lo fa il blocco
 * «Come funziona» — quattro tappe con icona, dentro il layout della sezione — e
 * qui resta solo la prova vera: una schermata del sistema.
 *
 * DUE MODI DI RIEMPIRLO, decisi caso per caso nei dati:
 *   1. `proof: { image: '/…webp', alt: {…} }` — uno screenshot o un'immagine
 *      generata. È la strada normale: si mette il file in public/ e si scrive il
 *      percorso, senza toccare questo file.
 *   2. `proof: { component: 'tharvel' }` — un facsimile disegnato a codice, per
 *      quando l'interfaccia È il prodotto. Registrato in PROOFS qui sotto.
 *
 * Un caso senza `proof` semplicemente non mostra il blocco: la sezione regge lo
 * stesso. Non mettere segnaposto «schermata in arrivo» — questa pagina gira come
 * link nelle proposte, e un buco dichiarato è peggio di un blocco in meno.
 *
 * SUGLI SCREENSHOT: mai dati veri di un cliente. Dati finti o oscurati, e
 * nessun indirizzo email vero (vedi il brief di Elettra in case-studies/).
 */

/* Adamo, il gestionale di Seven. I colori vengono dal prototipo vero
 * (~/Desktop/Adamo/app.py: indaco #667eea, verde #2ecc71, ambra #f39c12 su
 * fondo chiaro Streamlit), portati a tinte che reggono come testo. */
const ADAMO = {
  paper: '#f4f5fa',
  surface: '#ffffff',
  ink: '#1f2233',
  inkSoft: '#454a63',
  muted: '#757b96',
  line: 'rgba(31, 34, 51, 0.10)',
  deep: '#2b2f45',
  indigo: '#667eea',
  indigoInk: '#4a55c7',
  indigoTint: '#e6e9fb',
  greenInk: '#1e8f4e',
  greenTint: '#dcf5e6',
  amberInk: '#b06d10',
  amberTint: '#fdefd8',
}

const COPY = {
  it: {
    live: 'Live',
    altClick: '+ click per selezionare un elemento',
    publish: 'Pubblica',
    sites: 'Siti',
    addSite: 'Aggiungi sito…',
    // Nomi volutamente generici: il case study non dichiara chi usa Tharvel,
    // l'elenco vero è la nostra lista clienti.
    siteList: [
      { name: 'demo', kind: 'HTML' },
      { name: 'ristorante', kind: 'Astro' },
      { name: 'industriale', kind: 'Astro' },
      { name: 'vending', kind: 'Astro' },
      { name: 'studio', kind: 'Astro' },
      { name: 'twobee', kind: 'Vite' },
    ],
    previewPill: 'Demo online',
    previewTitle: 'Sito Demo',
    previewCta: 'Pulsante di esempio',
    chat: 'Chat',
    connected: 'Connessa',
    chatTitle: 'Cosa vuoi modificare?',
    tryNow: 'Prova subito',
    suggestions: [
      'Cambia il testo del titolo principale',
      'Migliora i colori del bottone CTA',
      'Aggiungi una sezione FAQ in fondo alla pagina',
    ],
    inputPlaceholder: 'Modifica il sito, fai una domanda…',

    seven: {
      nav: ['Riconciliazione', 'Contratti', 'Agenti', 'Sub-agenzie', 'Assistente'],
      scope: 'Back office',
      period: 'Gennaio 2026',
      title: 'Invito a fatturare',
      subtitle: 'Brand energia · competenza gennaio',
      kpi: [
        { value: '1.284', label: 'Righe nell’invito' },
        { value: '1.251', label: 'Agganciate', sub: '97%', good: true },
        { value: '33', label: 'Da risolvere', warn: true },
        { value: '184.320 €', label: 'Provvigioni del mese' },
      ],
      openTitle: 'Da risolvere',
      openHint: 'Adamo propone il match più probabile',
      cols: ['Riga dell’invito', 'Perché non aggancia', 'Proposta'],
      open: [
        { code: 'C-24-08817', why: 'Refuso nel codice contratto', fix: 'C-24-08871', score: '96%' },
        { code: 'PDR 0212447109', why: 'Una cifra in più nel PDR', fix: 'PDR 021244710', score: '92%' },
        { code: 'C-24-09140', why: 'Mai caricato a sistema', fix: 'Crea dal cliente', score: '88%' },
      ],
      splitTitle: 'Scorporo del mese',
      split: [
        { label: 'Gettone base', value: '142.900 €' },
        { label: 'Bonus RID', value: '18.640 €' },
        { label: 'Bolletta web', value: '12.180 €' },
        { label: 'Gare e promo', value: '10.600 €', held: true },
      ],
      heldLabel: 'resta all’agenzia',
      totalLabel: 'Alle sub-agenzie',
      totalValue: '173.720 €',
      footer: 'Un file per ogni sub-agenzia, generato da qui.',
    },
  },
  en: {
    live: 'Live',
    altClick: '+ click to pick an element',
    publish: 'Publish',
    sites: 'Sites',
    addSite: 'Add a site…',
    siteList: [
      { name: 'demo', kind: 'HTML' },
      { name: 'restaurant', kind: 'Astro' },
      { name: 'industrial', kind: 'Astro' },
      { name: 'vending', kind: 'Astro' },
      { name: 'practice', kind: 'Astro' },
      { name: 'twobee', kind: 'Vite' },
    ],
    previewPill: 'Live demo',
    previewTitle: 'Demo Site',
    previewCta: 'Example button',
    chat: 'Chat',
    connected: 'Connected',
    chatTitle: 'What do you want to change?',
    tryNow: 'Try now',
    suggestions: [
      'Change the main heading text',
      'Improve the CTA button colours',
      'Add an FAQ section at the bottom',
    ],
    inputPlaceholder: 'Edit the site, ask a question…',

    seven: {
      nav: ['Reconciliation', 'Contracts', 'Agents', 'Sub-agencies', 'Assistant'],
      scope: 'Back office',
      period: 'January 2026',
      title: 'Invitation to invoice',
      subtitle: 'Energy brand · January period',
      kpi: [
        { value: '1,284', label: 'Rows in the file' },
        { value: '1,251', label: 'Matched', sub: '97%', good: true },
        { value: '33', label: 'To resolve', warn: true },
        { value: '€184,320', label: 'Commissions this month' },
      ],
      openTitle: 'To resolve',
      openHint: 'Adamo proposes the likeliest match',
      cols: ['Row in the file', 'Why it doesn’t match', 'Proposal'],
      open: [
        { code: 'C-24-08817', why: 'Typo in the contract code', fix: 'C-24-08871', score: '96%' },
        { code: 'PDR 0212447109', why: 'One digit too many in the PDR', fix: 'PDR 021244710', score: '92%' },
        { code: 'C-24-09140', why: 'Never uploaded to the system', fix: 'Create from client', score: '88%' },
      ],
      splitTitle: 'This month’s split',
      split: [
        { label: 'Base fee', value: '€142,900' },
        { label: 'Direct-debit bonus', value: '€18,640' },
        { label: 'Paperless bonus', value: '€12,180' },
        { label: 'Contests and promos', value: '€10,600', held: true },
      ],
      heldLabel: 'stays with the agency',
      totalLabel: 'To the sub-agencies',
      totalValue: '€173,720',
      footer: 'One file per sub-agency, generated from here.',
    },
  },
}

/* Il pannello di Tharvel. È l'unico blocco della pagina con colori propri e non
 * ereditati dal tema: rappresenta un'applicazione, che ha il suo aspetto e resta
 * scura anche sulla sezione chiara, come una finestra appoggiata sopra. Per
 * questo qui le utility `white/NN` non servono e i colori sono scritti a mano. */
function TharvelPanel({ lang }) {
  const t = COPY[lang]
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#0B0B0C] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
      {/* barra superiore */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 px-3 py-2.5 sm:gap-3 sm:px-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {t.live}
        </span>
        <span className="text-[10px] font-semibold text-zinc-500">demo</span>
        <span className="hidden min-w-0 flex-1 rounded-lg bg-zinc-800/70 px-3 py-1.5 text-[10px] text-zinc-500 sm:block">
          /
        </span>
        <span className="hidden text-[10px] text-zinc-500 lg:inline">
          <kbd className="rounded border border-zinc-700 px-1 py-0.5 font-sans text-[9px] text-zinc-400">
            Alt
          </kbd>{' '}
          {t.altClick}
        </span>
        <span className="ml-auto rounded-lg bg-brand-yellow px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-black">
          {t.publish}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* colonna siti */}
        <div className="shrink-0 border-b border-zinc-800 px-3 py-4 lg:w-44 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2">
            <span className="font-display text-xs font-extrabold tracking-tight text-zinc-100">
              Tharvel
            </span>
            <span className="rounded bg-brand-yellow/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-yellow">
              admin
            </span>
          </div>
          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            {t.sites}
          </p>
          <ul className="mt-2 space-y-1">
            {t.siteList.map((s, i) => (
              <li
                key={s.name}
                className={[
                  'flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[10px]',
                  i === 0 ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400',
                ].join(' ')}
              >
                <span className="truncate">{s.name}</span>
                <span className="shrink-0 text-[8px] font-bold uppercase tracking-wider text-zinc-600">
                  {s.kind}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 px-2 text-[10px] text-zinc-500">+ {t.addSite}</p>
        </div>

        {/* anteprima del sito del cliente */}
        <div className="min-w-0 flex-1 bg-zinc-900/50 p-4 sm:p-6">
          <div className="rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-400 to-amber-400 p-4 sm:p-7">
            <div className="rounded-lg bg-white p-4 text-center sm:p-6">
              <span className="inline-block rounded-full bg-blue-100 px-2.5 py-1 text-[9px] font-bold text-blue-700">
                {t.previewPill}
              </span>
              <p className="mt-3 font-display text-lg font-extrabold text-blue-600 sm:text-2xl">
                {t.previewTitle}
              </p>
              <div className="mx-auto mt-3 space-y-1.5">
                <span className="mx-auto block h-1.5 w-4/5 rounded-full bg-slate-200" />
                <span className="mx-auto block h-1.5 w-3/5 rounded-full bg-slate-200" />
              </div>
              <div className="mt-4 h-16 rounded-md bg-slate-100 sm:h-24" />
              <span className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-[9px] font-bold text-white">
                {t.previewCta}
              </span>
            </div>
          </div>
        </div>

        {/* colonna chat */}
        <div className="shrink-0 border-t border-zinc-800 px-3 py-4 lg:w-52 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-300">
              {t.chat}
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {t.connected}
            </span>
          </div>
          <p className="mt-4 font-display text-[11px] font-extrabold text-zinc-100">
            {t.chatTitle}
          </p>
          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500">
            {t.tryNow}
          </p>
          <ul className="mt-2 space-y-1.5">
            {t.suggestions.map((s) => (
              <li
                key={s}
                className="rounded-lg border border-zinc-800 px-2.5 py-2 text-[10px] leading-snug text-zinc-400"
              >
                → {s}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg bg-zinc-800/70 px-2.5 py-2 text-[10px] text-zinc-500">
            {t.inputPlaceholder}
          </div>
        </div>
      </div>
    </div>
  )
}

/* Adamo, il gestionale degli inviti a fatturare di Seven. Facsimile a codice e
 * non uno screenshot: il pannello vero contiene i contratti dei clienti finali,
 * i codici POD/PDR e le provvigioni delle sub-agenzie — roba che non esce.
 *
 * La schermata scelta è la riconciliazione e non un cruscotto, perché è lì che
 * sta la differenza: 33 righe su 1.284 non agganciano, e invece di cercarle a
 * mano per nome del cliente si presentano da sole col match più probabile. Le
 * tre cause elencate sono le tre vere (refuso nel codice, PDR sbagliato,
 * contratto mai caricato), prese dalle note del back office in ~/Desktop/Adamo.
 *
 * I numeri sono di esempio ma tornano fra loro: 142.900 + 18.640 + 12.180 +
 * 10.600 = 184.320, e togliendo gare e promo che restano all'agenzia restano
 * 173.720 per le sub-agenzie. Se li tocchi, rifai la somma — un pannello che
 * non quadra lo nota subito chi fa questo lavoro tutti i giorni. */
function SevenPanel({ lang }) {
  const t = COPY[lang].seven

  return (
    <div
      className="overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(31,34,51,0.55)]"
      style={{ background: ADAMO.paper, border: `1px solid ${ADAMO.line}` }}
    >
      {/* barra superiore */}
      <div
        className="flex flex-wrap items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4"
        style={{ background: ADAMO.surface, borderBottom: `1px solid ${ADAMO.line}` }}
      >
        <span
          aria-hidden
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px]"
          style={{ background: ADAMO.indigo, color: '#fff' }}
        >
          ⚡
        </span>
        <span className="text-sm font-extrabold tracking-tight" style={{ color: ADAMO.ink }}>
          Adamo
        </span>
        <span
          className="hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline"
          style={{ background: ADAMO.indigoTint, color: ADAMO.indigoInk }}
        >
          {t.scope}
        </span>
        <span
          className="ml-auto rounded-full px-3 py-1.5 text-[10px] font-bold"
          style={{ background: ADAMO.deep, color: '#fff' }}
        >
          {t.period}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* navigazione */}
        <div className="shrink-0 px-3 py-3 lg:w-40 lg:py-5" style={{ background: ADAMO.deep }}>
          <ul className="flex gap-1 overflow-x-auto lg:block lg:space-y-1 lg:overflow-visible">
            {t.nav.map((n, i) => (
              <li
                key={n}
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold"
                style={
                  i === 0
                    ? { background: 'rgba(255,255,255,0.12)', color: '#fff' }
                    : { color: 'rgba(255,255,255,0.55)' }
                }
              >
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-1 p-3 sm:p-4">
          <p className="text-[11px] font-extrabold" style={{ color: ADAMO.ink }}>
            {t.title}
          </p>
          <p className="text-[10px]" style={{ color: ADAMO.muted }}>
            {t.subtitle}
          </p>

          {/* i quattro numeri */}
          <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {t.kpi.map((k) => (
              <div
                key={k.label}
                className="rounded-xl px-3 py-2.5"
                style={{ background: ADAMO.surface, border: `1px solid ${ADAMO.line}` }}
              >
                <p className="flex items-baseline gap-1.5">
                  <span
                    className="text-lg font-extrabold leading-none sm:text-xl"
                    style={{
                      color: k.good ? ADAMO.greenInk : k.warn ? ADAMO.amberInk : ADAMO.ink,
                    }}
                  >
                    {k.value}
                  </span>
                  {k.sub && (
                    <span className="text-[10px] font-bold" style={{ color: ADAMO.greenInk }}>
                      {k.sub}
                    </span>
                  )}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold leading-tight" style={{ color: ADAMO.muted }}>
                  {k.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 grid gap-2 lg:grid-cols-5">
            {/* righe orfane coi suggerimenti: è il pezzo che vale */}
            <div
              className="min-w-0 rounded-xl p-3 lg:col-span-3"
              style={{ background: ADAMO.surface, border: `1px solid ${ADAMO.line}` }}
            >
              <div className="flex flex-wrap items-baseline gap-x-2">
                <p className="text-[11px] font-extrabold" style={{ color: ADAMO.ink }}>
                  {t.openTitle}
                </p>
                <p className="text-[9px]" style={{ color: ADAMO.muted }}>
                  {t.openHint}
                </p>
              </div>
              <div className="-mx-1 mt-2.5 overflow-x-auto px-1">
                <table className="w-full min-w-[21rem] border-collapse text-left">
                  <thead>
                    <tr>
                      {t.cols.map((c) => (
                        <th
                          key={c}
                          className="pb-1.5 text-[8px] font-bold uppercase tracking-[0.12em]"
                          style={{ color: ADAMO.muted, borderBottom: `1px solid ${ADAMO.line}` }}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.open.map((r) => (
                      <tr key={r.code}>
                        <td
                          className="py-2 pr-2 text-[10px] font-semibold tabular-nums"
                          style={{ color: ADAMO.inkSoft, borderBottom: `1px solid ${ADAMO.line}` }}
                        >
                          {r.code}
                        </td>
                        <td
                          className="py-2 pr-2 text-[10px]"
                          style={{ color: ADAMO.muted, borderBottom: `1px solid ${ADAMO.line}` }}
                        >
                          {r.why}
                        </td>
                        <td className="py-2" style={{ borderBottom: `1px solid ${ADAMO.line}` }}>
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            <span
                              className="rounded px-1.5 py-0.5 text-[9px] font-bold tabular-nums"
                              style={{ background: ADAMO.indigoTint, color: ADAMO.indigoInk }}
                            >
                              {r.fix}
                            </span>
                            <span
                              className="text-[9px] font-bold tabular-nums"
                              style={{ color: ADAMO.greenInk }}
                            >
                              {r.score}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* scorporo */}
            <div
              className="min-w-0 rounded-xl p-3 lg:col-span-2"
              style={{ background: ADAMO.surface, border: `1px solid ${ADAMO.line}` }}
            >
              <p className="text-[11px] font-extrabold" style={{ color: ADAMO.ink }}>
                {t.splitTitle}
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {t.split.map((s) => (
                  <li key={s.label} className="flex items-baseline justify-between gap-2">
                    <span className="min-w-0 text-[10px]" style={{ color: ADAMO.inkSoft }}>
                      {s.label}
                      {s.held && (
                        <span className="ml-1.5 text-[8px] font-bold" style={{ color: ADAMO.amberInk }}>
                          {t.heldLabel}
                        </span>
                      )}
                    </span>
                    <span
                      className="shrink-0 text-[10px] font-semibold tabular-nums"
                      style={{ color: s.held ? ADAMO.amberInk : ADAMO.ink }}
                    >
                      {s.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className="mt-2.5 flex items-baseline justify-between gap-2 border-t pt-2.5"
                style={{ borderColor: ADAMO.line }}
              >
                <span className="text-[10px] font-bold" style={{ color: ADAMO.ink }}>
                  {t.totalLabel}
                </span>
                <span
                  className="text-[11px] font-extrabold tabular-nums"
                  style={{ color: ADAMO.greenInk }}
                >
                  {t.totalValue}
                </span>
              </div>
              <p className="mt-3 text-[9px] font-semibold" style={{ color: ADAMO.muted }}>
                {t.footer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Chiave usata in `proof.component` → componente. */
export const PROOFS = {
  tharvel: TharvelPanel,
  seven: SevenPanel,
}
