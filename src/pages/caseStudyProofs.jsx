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

/* Token di SofIA, copiati da /home/michele/Desktop/Progetti/Sofia/tokens.css
 * (design.md, "Vivid Narrative"). Stanno qui e non in tailwind.config perché
 * servono a UN blocco: sono i colori di un altro prodotto, non del nostro sito,
 * e finirebbero per essere usati per sbaglio altrove.
 *
 * Il carattere no: SofIA usa Syne e Plus Jakarta Sans, e caricarli su ogni
 * pagina del nostro sito per un facsimile largo mezzo schermo non vale il peso.
 * Sono dichiarati per primi nello stack, così se uno li ha installati li vede,
 * altrimenti scende a system-ui — che è geometrico abbastanza da non stonare. */
const SOFIA = {
  coral: '#ff5f49',
  coralInk: '#cf3a25',
  coralTint: '#ffe4dc',
  green: '#4a5d50',
  greenInk: '#3a4a40',
  greenDeep: '#28332c',
  greenTint: '#dde6df',
  cream: '#f9f5e3',
  surface: '#fffefa',
  ink: '#241f1d',
  inkSoft: '#4c4441',
  muted: '#88726f',
  taupeTint: '#ece3e1',
  taupeInk: '#6b5754',
  line: 'rgba(36, 31, 29, 0.10)',
  waGreen: '#1faa59',
  head: '"Syne", "Plus Jakarta Sans", system-ui, sans-serif',
  body: '"Plus Jakarta Sans", system-ui, sans-serif',
}

/* Mr. Hatter non ha token da nessuna parte: il progetto non è su questa macchina
 * e il loro sito non espone un design system (vedi case-studies/mrhatter-gestionale.md).
 * ⚠️ QUESTA PALETTE È INVENTATA — carta calda, inchiostro caldo, cognac da feltro,
 * per un laboratorio napoletano di 130 anni. La STRUTTURA invece no: ordini,
 * magazzino, produzione, evasione e consegne sono i cinque ambiti che Michele ha
 * raccontato del gestionale vero. Se un giorno arriva uno screenshot, i colori si
 * riallineano da qui e il resto resta.
 *
 * Anche il carattere è una scelta nostra: serif di sistema, che suggerisce
 * l'artigiano storico e non chiede di caricare niente. */
const HATTER = {
  paper: '#f5f1ea',
  surface: '#fffdf8',
  ink: '#1c1917',
  inkSoft: '#44403c',
  muted: '#78716c',
  line: 'rgba(28, 25, 23, 0.10)',
  deep: '#2a2422',
  cognac: '#8a5a2b',
  cognacInk: '#6b4420',
  cognacTint: '#f0e4d6',
  green: '#4d6b52',
  greenTint: '#dfe8e0',
  neutralTint: '#eae5dd',
  head: 'Georgia, "Times New Roman", serif',
}

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

    sofia: {
      nav: ['Panoramica', 'Chiamate', 'Agenda', 'Numeri', 'Impostazioni'],
      sector: 'Studio dentistico',
      range: 'Oggi',
      kpi: [
        { value: '47', label: 'Chiamate ricevute' },
        { value: '31', label: 'Appuntamenti fissati', good: true },
        { value: '6', label: 'Da richiamare', warn: true },
        { value: '18', label: 'Fuori orario' },
      ],
      recentTitle: 'Chiamate recenti',
      cols: ['Ora', 'Canale', 'Richiesta', 'Esito'],
      rows: [
        { time: '21:40', ch: 'Telefono', ask: 'Prenotare un’igiene', out: 'Appuntamento', tone: 'ok' },
        { time: '20:12', ch: 'WhatsApp', ask: 'Orari di sabato', out: 'Risposta', tone: 'flat' },
        { time: '19:55', ch: 'Telefono', ask: 'Spostare l’appuntamento', out: 'Appuntamento', tone: 'ok' },
        { time: '19:31', ch: 'Chat', ask: 'Costo di uno sbiancamento', out: 'Risposta', tone: 'flat' },
        { time: '18:47', ch: 'Telefono', ask: 'Urgenza, dente scheggiato', out: 'Da richiamare', tone: 'warn' },
      ],
      askedTitle: 'Più chieste oggi',
      asked: [
        { q: 'Orari e giorni di apertura', n: 12 },
        { q: 'Prezzi e preventivi', n: 9 },
        { q: 'Spostare un appuntamento', n: 7 },
      ],
      footer: 'Sincronizzata con Google Calendar',
    },

    hatter: {
      nav: ['Ordini', 'Magazzino', 'Produzione', 'Evasione', 'Consegne', 'Negozi'],
      range: 'Stagione in corso',
      kpi: [
        { value: '24', label: 'Ordini aperti' },
        { value: '380', label: 'Pezzi da produrre' },
        { value: '6', label: 'Pronti da spedire', good: true },
        { value: '12', label: 'Consegnati nel mese' },
      ],
      ordersTitle: 'Ordini dei negozi',
      cols: ['Ordine', 'Negozio', 'Pezzi', 'Stato', 'Consegna'],
      // Città al posto del nome del negozio: l'elenco dei rivenditori di
      // Mr. Hatter è roba loro, e un nome inventato rischia di esistere davvero.
      rows: [
        { id: 'ORD-0142', shop: 'Milano', qty: '60', state: 'In produzione', tone: 'work', due: '18 set' },
        { id: 'ORD-0139', shop: 'Roma', qty: '45', state: 'Pronto', tone: 'ok', due: '12 set' },
        { id: 'ORD-0137', shop: 'Firenze', qty: '24', state: 'In produzione', tone: 'work', due: '25 set' },
        { id: 'ORD-0134', shop: 'Napoli', qty: '90', state: 'Spedito', tone: 'flat', due: '04 set' },
        { id: 'ORD-0131', shop: 'Torino', qty: '36', state: 'Pronto', tone: 'ok', due: '10 set' },
      ],
      stockTitle: 'Magazzino',
      stockCols: ['disp.', 'imp.'],
      stock: [
        { model: 'Feltro a tesa larga', free: 120, held: 60 },
        { model: 'Panama intrecciato', free: 74, held: 45 },
        { model: 'Coppola classica', free: 30, held: 30 },
      ],
      shortLabel: 'da produrre',
      footer: 'La consegna si registra all’evasione, con la data.',
    },

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

    sofia: {
      nav: ['Overview', 'Calls', 'Diary', 'Numbers', 'Settings'],
      sector: 'Dental practice',
      range: 'Today',
      kpi: [
        { value: '47', label: 'Calls answered' },
        { value: '31', label: 'Appointments booked', good: true },
        { value: '6', label: 'To call back', warn: true },
        { value: '18', label: 'Outside hours' },
      ],
      recentTitle: 'Recent calls',
      cols: ['Time', 'Channel', 'Request', 'Outcome'],
      rows: [
        { time: '21:40', ch: 'Phone', ask: 'Book a hygiene session', out: 'Booked', tone: 'ok' },
        { time: '20:12', ch: 'WhatsApp', ask: 'Saturday opening hours', out: 'Answered', tone: 'flat' },
        { time: '19:55', ch: 'Phone', ask: 'Move an appointment', out: 'Booked', tone: 'ok' },
        { time: '19:31', ch: 'Chat', ask: 'Cost of a whitening', out: 'Answered', tone: 'flat' },
        { time: '18:47', ch: 'Phone', ask: 'Urgent, chipped tooth', out: 'To call back', tone: 'warn' },
      ],
      askedTitle: 'Most asked today',
      asked: [
        { q: 'Opening days and hours', n: 12 },
        { q: 'Prices and quotes', n: 9 },
        { q: 'Moving an appointment', n: 7 },
      ],
      footer: 'Synced with Google Calendar',
    },

    hatter: {
      nav: ['Orders', 'Stock', 'Production', 'Fulfilment', 'Deliveries', 'Shops'],
      range: 'Current season',
      kpi: [
        { value: '24', label: 'Open orders' },
        { value: '380', label: 'Pieces to make' },
        { value: '6', label: 'Ready to ship', good: true },
        { value: '12', label: 'Delivered this month' },
      ],
      ordersTitle: 'Shop orders',
      cols: ['Order', 'Shop', 'Pieces', 'Status', 'Due'],
      rows: [
        { id: 'ORD-0142', shop: 'Milan', qty: '60', state: 'In production', tone: 'work', due: '18 Sep' },
        { id: 'ORD-0139', shop: 'Rome', qty: '45', state: 'Ready', tone: 'ok', due: '12 Sep' },
        { id: 'ORD-0137', shop: 'Florence', qty: '24', state: 'In production', tone: 'work', due: '25 Sep' },
        { id: 'ORD-0134', shop: 'Naples', qty: '90', state: 'Shipped', tone: 'flat', due: '04 Sep' },
        { id: 'ORD-0131', shop: 'Turin', qty: '36', state: 'Ready', tone: 'ok', due: '10 Sep' },
      ],
      stockTitle: 'Stock',
      stockCols: ['free', 'held'],
      stock: [
        { model: 'Wide-brim felt', free: 120, held: 60 },
        { model: 'Woven panama', free: 74, held: 45 },
        { model: 'Classic flat cap', free: 30, held: 30 },
      ],
      shortLabel: 'to make',
      footer: 'The delivery is recorded at fulfilment, with its date.',
    },

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

/* Il pannello di SofIA. Come Tharvel è un facsimile a codice e non uno
 * screenshot, per un motivo diverso: SofIA è un nostro prodotto e il pannello di
 * un cliente vero conterrebbe le chiamate dei suoi pazienti. Qui i dati sono
 * inventati — `proof.caption` in caseStudiesData.js lo dichiara in pagina.
 *
 * Cosa devono dimostrare i numeri scelti, uno per uno:
 *   47 chiamate / 18 fuori orario  → «risponde 24 ore su 24»
 *   31 appuntamenti fissati        → «appuntamento chiuso in chiamata»
 *   «Più chieste oggi»             → «a fine giornata sai cosa chiedevano»
 * Sono le tre schede dei risultati di quel caso. Se cambiano quelle, cambia
 * anche questo, altrimenti la prova non prova più niente.
 *
 * Gli orari delle chiamate sono di sera di proposito: 21:40 e 19:31 dicono da
 * soli la cosa che una riga di testo deve spiegare. */
function SofiaPanel({ lang }) {
  const t = COPY[lang].sofia

  const chip = {
    ok: { background: SOFIA.greenTint, color: SOFIA.greenInk },
    warn: { background: SOFIA.coralTint, color: SOFIA.coralInk },
    flat: { background: SOFIA.taupeTint, color: SOFIA.taupeInk },
  }
  const dot = { Telefono: SOFIA.coral, Phone: SOFIA.coral, WhatsApp: SOFIA.waGreen, Chat: SOFIA.green }

  return (
    <div
      className="overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(36,31,29,0.5)]"
      style={{ background: SOFIA.cream, border: `1px solid ${SOFIA.line}`, fontFamily: SOFIA.body }}
    >
      {/* barra superiore */}
      <div
        className="flex flex-wrap items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4"
        style={{ background: SOFIA.surface, borderBottom: `1px solid ${SOFIA.line}` }}
      >
        {/* marchio: tessera coral con il punto bianco, «Sof» inchiostro + «IA» coral */}
        <span
          aria-hidden
          className="flex h-6 w-6 shrink-0 items-center justify-center"
          style={{ background: SOFIA.coral, borderRadius: 9 }}
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <span
          className="text-sm font-extrabold tracking-[-0.02em]"
          style={{ fontFamily: SOFIA.head, color: SOFIA.ink }}
        >
          Sof<span style={{ color: SOFIA.coral }}>IA</span>
        </span>
        <span
          className="hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline"
          style={{ background: SOFIA.taupeTint, color: SOFIA.taupeInk }}
        >
          {t.sector}
        </span>
        <span
          className="ml-auto rounded-full px-3 py-1.5 text-[10px] font-bold"
          style={{ background: SOFIA.coral, color: '#fff' }}
        >
          {t.range}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* navigazione: colonna scura da lg, striscia in alto sotto */}
        <div
          className="shrink-0 px-3 py-3 lg:w-40 lg:py-5"
          style={{ background: SOFIA.greenDeep }}
        >
          <ul className="flex gap-1 overflow-x-auto lg:block lg:space-y-1 lg:overflow-visible">
            {t.nav.map((n, i) => (
              <li
                key={n}
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold"
                style={
                  i === 0
                    ? { background: 'rgba(255,255,255,0.10)', color: '#fff' }
                    : { color: 'rgba(255,255,255,0.55)' }
                }
              >
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-1 p-3 sm:p-4">
          {/* i quattro numeri */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {t.kpi.map((k) => (
              <div
                key={k.label}
                className="rounded-xl px-3 py-2.5"
                style={{ background: SOFIA.surface, border: `1px solid ${SOFIA.line}` }}
              >
                <p
                  className="text-xl font-extrabold leading-none sm:text-2xl"
                  style={{
                    fontFamily: SOFIA.head,
                    color: k.good ? SOFIA.green : k.warn ? SOFIA.coralInk : SOFIA.ink,
                  }}
                >
                  {k.value}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold leading-tight" style={{ color: SOFIA.muted }}>
                  {k.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 grid gap-2 lg:grid-cols-5">
            {/* chiamate recenti */}
            <div
              className="min-w-0 rounded-xl p-3 lg:col-span-3"
              style={{ background: SOFIA.surface, border: `1px solid ${SOFIA.line}` }}
            >
              <p className="text-[11px] font-extrabold" style={{ fontFamily: SOFIA.head, color: SOFIA.ink }}>
                {t.recentTitle}
              </p>
              {/* quattro colonne su uno schermo da 360px non ci stanno: scorre
                  la tabella, non la pagina */}
              <div className="-mx-1 mt-2.5 overflow-x-auto px-1">
              <table className="w-full min-w-[19rem] border-collapse text-left">
                <thead>
                  <tr>
                    {t.cols.map((c) => (
                      <th
                        key={c}
                        className="pb-1.5 text-[8px] font-bold uppercase tracking-[0.12em]"
                        style={{ color: SOFIA.muted, borderBottom: `1px solid ${SOFIA.line}` }}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r) => (
                    <tr key={r.time}>
                      <td
                        className="py-2 pr-2 text-[10px] font-semibold tabular-nums"
                        style={{ color: SOFIA.inkSoft, borderBottom: `1px solid ${SOFIA.line}` }}
                      >
                        {r.time}
                      </td>
                      <td
                        className="py-2 pr-2 text-[10px]"
                        style={{ color: SOFIA.inkSoft, borderBottom: `1px solid ${SOFIA.line}` }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: dot[r.ch] || SOFIA.muted }}
                          />
                          {r.ch}
                        </span>
                      </td>
                      <td
                        className="py-2 pr-2 text-[10px]"
                        style={{ color: SOFIA.ink, borderBottom: `1px solid ${SOFIA.line}` }}
                      >
                        {r.ask}
                      </td>
                      <td className="py-2 text-[10px]" style={{ borderBottom: `1px solid ${SOFIA.line}` }}>
                        <span
                          className="inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-bold"
                          style={chip[r.tone]}
                        >
                          {r.out}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* domande ricorrenti */}
            <div
              className="min-w-0 rounded-xl p-3 lg:col-span-2"
              style={{ background: SOFIA.surface, border: `1px solid ${SOFIA.line}` }}
            >
              <p className="text-[11px] font-extrabold" style={{ fontFamily: SOFIA.head, color: SOFIA.ink }}>
                {t.askedTitle}
              </p>
              <ul className="mt-2.5 space-y-2">
                {t.asked.map((a) => (
                  <li key={a.q} className="flex items-center gap-2">
                    <span className="min-w-0 flex-1 truncate text-[10px]" style={{ color: SOFIA.inkSoft }}>
                      {a.q}
                    </span>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold tabular-nums"
                      style={{ background: SOFIA.coralTint, color: SOFIA.coralInk }}
                    >
                      {a.n}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="mt-4 border-t pt-2.5 text-[9px] font-semibold"
                style={{ borderColor: SOFIA.line, color: SOFIA.muted }}
              >
                {t.footer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Il gestionale di Mr. Hatter. A differenza di SofIA e Tharvel questo pannello
 * non l'abbiamo mai visto: il progetto non è su questa macchina. La struttura
 * viene dai cinque ambiti che il gestionale gestisce davvero — ordini, merce,
 * produzione, evasione, consegne — l'aspetto è nostro (vedi HATTER più sopra).
 *
 * Quello che i quattro numeri devono dimostrare, in fila con le schede del caso:
 *   24 ordini aperti + tabella per negozio → «ordini e magazzino collegati»
 *   380 da produrre / 6 pronti            → «stato dell'ordine sempre aggiornato»
 *   12 consegnati nel mese                → «consegne registrate con la data»
 *
 * «Coppola classica» con 30 disponibili e 30 impegnati è messa lì apposta: è il
 * caso in cui il magazzino è a zero e la riga si accende. Un pannello dove va
 * tutto bene non fa vedere a cosa serve. */
function HatterPanel({ lang }) {
  const t = COPY[lang].hatter

  const chip = {
    ok: { background: HATTER.greenTint, color: HATTER.green },
    work: { background: HATTER.cognacTint, color: HATTER.cognacInk },
    flat: { background: HATTER.neutralTint, color: HATTER.muted },
  }

  return (
    <div
      className="overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(28,25,23,0.5)]"
      style={{ background: HATTER.paper, border: `1px solid ${HATTER.line}` }}
    >
      {/* barra superiore */}
      <div
        className="flex flex-wrap items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4"
        style={{ background: HATTER.surface, borderBottom: `1px solid ${HATTER.line}` }}
      >
        <span
          aria-hidden
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[9px] font-bold tracking-tight"
          style={{ background: HATTER.deep, color: HATTER.paper, fontFamily: HATTER.head }}
        >
          MH
        </span>
        <span
          className="text-sm font-bold tracking-tight"
          style={{ fontFamily: HATTER.head, color: HATTER.ink }}
        >
          Mr. Hatter
        </span>
        <span
          className="hidden rounded-full px-2.5 py-1 text-[10px] font-semibold sm:inline"
          style={{ background: HATTER.neutralTint, color: HATTER.muted }}
        >
          {t.range}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* navigazione: colonna scura da lg, striscia in alto sotto */}
        <div className="shrink-0 px-3 py-3 lg:w-40 lg:py-5" style={{ background: HATTER.deep }}>
          <ul className="flex gap-1 overflow-x-auto lg:block lg:space-y-1 lg:overflow-visible">
            {t.nav.map((n, i) => (
              <li
                key={n}
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold"
                style={
                  i === 0
                    ? { background: 'rgba(255,255,255,0.10)', color: HATTER.paper }
                    : { color: 'rgba(245,241,234,0.55)' }
                }
              >
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-1 p-3 sm:p-4">
          {/* i quattro numeri */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {t.kpi.map((k) => (
              <div
                key={k.label}
                className="rounded-xl px-3 py-2.5"
                style={{ background: HATTER.surface, border: `1px solid ${HATTER.line}` }}
              >
                <p
                  className="text-xl font-bold leading-none sm:text-2xl"
                  style={{ fontFamily: HATTER.head, color: k.good ? HATTER.green : HATTER.ink }}
                >
                  {k.value}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold leading-tight" style={{ color: HATTER.muted }}>
                  {k.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 grid gap-2 lg:grid-cols-5">
            {/* ordini dei negozi */}
            <div
              className="min-w-0 rounded-xl p-3 lg:col-span-3"
              style={{ background: HATTER.surface, border: `1px solid ${HATTER.line}` }}
            >
              <p className="text-[11px] font-bold" style={{ fontFamily: HATTER.head, color: HATTER.ink }}>
                {t.ordersTitle}
              </p>
              {/* cinque colonne su uno schermo da 360px non ci stanno: scorre la
                  tabella, non la pagina */}
              <div className="-mx-1 mt-2.5 overflow-x-auto px-1">
                <table className="w-full min-w-[21rem] border-collapse text-left">
                  <thead>
                    <tr>
                      {t.cols.map((c) => (
                        <th
                          key={c}
                          className="pb-1.5 text-[8px] font-bold uppercase tracking-[0.12em]"
                          style={{ color: HATTER.muted, borderBottom: `1px solid ${HATTER.line}` }}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((r) => (
                      <tr key={r.id}>
                        <td
                          className="py-2 pr-2 text-[10px] font-semibold tabular-nums"
                          style={{ color: HATTER.inkSoft, borderBottom: `1px solid ${HATTER.line}` }}
                        >
                          {r.id}
                        </td>
                        <td
                          className="py-2 pr-2 text-[10px]"
                          style={{ color: HATTER.ink, borderBottom: `1px solid ${HATTER.line}` }}
                        >
                          {r.shop}
                        </td>
                        <td
                          className="py-2 pr-2 text-[10px] tabular-nums"
                          style={{ color: HATTER.inkSoft, borderBottom: `1px solid ${HATTER.line}` }}
                        >
                          {r.qty}
                        </td>
                        <td className="py-2 pr-2" style={{ borderBottom: `1px solid ${HATTER.line}` }}>
                          <span
                            className="inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-bold"
                            style={chip[r.tone]}
                          >
                            {r.state}
                          </span>
                        </td>
                        <td
                          className="py-2 text-[10px] tabular-nums"
                          style={{ color: HATTER.muted, borderBottom: `1px solid ${HATTER.line}` }}
                        >
                          {r.due}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* magazzino */}
            <div
              className="min-w-0 rounded-xl p-3 lg:col-span-2"
              style={{ background: HATTER.surface, border: `1px solid ${HATTER.line}` }}
            >
              <p className="text-[11px] font-bold" style={{ fontFamily: HATTER.head, color: HATTER.ink }}>
                {t.stockTitle}
              </p>
              <ul className="mt-2.5 space-y-2.5">
                {t.stock.map((s) => {
                  const short = s.held >= s.free
                  return (
                    <li key={s.model}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="min-w-0 truncate text-[10px]" style={{ color: HATTER.ink }}>
                          {s.model}
                        </span>
                        <span
                          className="shrink-0 text-[9px] font-semibold tabular-nums"
                          style={{ color: short ? HATTER.cognacInk : HATTER.muted }}
                        >
                          {s.free} {t.stockCols[0]} · {s.held} {t.stockCols[1]}
                        </span>
                      </div>
                      {/* quanto del disponibile è già impegnato da un ordine */}
                      <div
                        className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full"
                        style={{ background: HATTER.neutralTint }}
                      >
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: `${Math.min(100, Math.round((s.held / s.free) * 100))}%`,
                            background: short ? HATTER.cognac : HATTER.green,
                          }}
                        />
                      </div>
                      {short && (
                        <p className="mt-1 text-[9px] font-bold" style={{ color: HATTER.cognacInk }}>
                          {t.shortLabel}
                        </p>
                      )}
                    </li>
                  )
                })}
              </ul>
              <p
                className="mt-4 border-t pt-2.5 text-[9px] font-semibold"
                style={{ borderColor: HATTER.line, color: HATTER.muted }}
              >
                {t.footer}
              </p>
            </div>
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
  sofia: SofiaPanel,
  mrhatter: HatterPanel,
  seven: SevenPanel,
}
