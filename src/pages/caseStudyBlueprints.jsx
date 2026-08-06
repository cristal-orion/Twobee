/* BLUEPRINT DEI CASE STUDY — diagrammi a codice
 * ---------------------------------------------
 * Un blueprint per caso, associato allo slug in fondo al file. Sostituiscono le
 * immagini generate: essendo DOM si adattano al tema della sezione (le sezioni si
 * alternano chiare e scure), restano nitidi a ogni zoom, si leggono da telefono e
 * si correggono con una Edit invece di rigenerare e ritagliare un file.
 *
 * ORIENTAMENTO. Un flusso orizzontale a sei nodi, scalato su un telefono, ha il
 * testo a due pixel. Quindi tutti i diagrammi stanno in colonna fino a 1279px e
 * passano in riga da `xl`. Ci pensa <Flow>: le frecce ruotano da sole.
 *
 * COLORI. Niente colori fissi: i mattoni usano `text-white/NN`, `border-white/NN`
 * e `bg-white/[0.0N]`, che index.css ridefinisce su --theme-fg e che quindi si
 * invertono da soli sulle sezioni chiare. ⚠️ Solo i valori presenti in index.css
 * sono sicuri (text-white/40…80, border-white/5,10, bg-white/[0.03…0.07]): un
 * valore fuori lista resta bianco fisso e sul bianco sparisce. Il giallo pieno con
 * testo nero (<Hex solid> e <Node solid>) invece funziona su entrambi i fondi ed è
 * il modo per dire "qui succede la cosa importante".
 *
 * LEGGIBILITÀ. Il testo di un nodo sta in due righe scarse. Se una tappa non entra
 * in quattro parole, la frase intera va nell'elenco "Cosa abbiamo costruito", non
 * qui: il diagramma serve a far vedere la forma del sistema in tre secondi.
 */
const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

/* ------------------------------------------------------------------ */
/* MATTONI                                                             */
/* ------------------------------------------------------------------ */

/* Contenitore: imposta il ritmo verticale e, da xl, quello orizzontale. */
function Board({ children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col items-center gap-3 xl:flex-row xl:items-start xl:justify-center xl:gap-0">
        {children}
      </div>
    </div>
  )
}

/* Sequenza con le frecce già in mezzo: i figli si scrivono di seguito, senza
 * intercalare i connettori a mano. `children` può contenere dei falsy (rami
 * condizionali) e vengono scartati, altrimenti comparirebbero frecce nel vuoto. */
function Flow({ children }) {
  const steps = [].concat(children).filter(Boolean)
  return (
    <>
      {steps.map((step, i) => (
        <FlowStep key={i} last={i === steps.length - 1}>
          {step}
        </FlowStep>
      ))}
    </>
  )
}

function FlowStep({ children, last }) {
  return (
    <>
      <div className="flex shrink-0 flex-col items-center xl:justify-center">
        {children}
      </div>
      {!last && <Arrow />}
    </>
  )
}

/* Freccia del percorso principale. In colonna punta in basso, da xl a destra:
 * è lo stesso segno ruotato, così non esistono due varianti da tenere allineate. */
function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 rotate-90 self-center text-brand-yellow xl:mx-2 xl:mt-11 xl:h-6 xl:w-6 xl:rotate-0 xl:self-start"
      fill="none"
    >
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* Tappa del percorso. `solid` = giallo pieno, per l'esito che conta. */
function Node({ children, solid, className = '' }) {
  return (
    <div
      className={[
        'flex min-h-[3.5rem] w-[13.5rem] items-center justify-center rounded-2xl px-3 py-2.5 text-center font-display text-[11px] font-extrabold uppercase leading-tight tracking-[0.08em] sm:text-xs xl:h-28 xl:w-[10.5rem]',
        solid
          ? 'bg-brand-yellow text-brand-black'
          : 'border border-brand-yellow/50 bg-white/[0.04] text-white/80',
        className,
      ].join(' ')}
    >
      <span>{children}</span>
    </div>
  )
}

/* Snodo: dove il sistema decide. L'esagono è il segno del marchio e qui ha un
 * lavoro preciso — distingue a colpo d'occhio una decisione da una tappa. */
function Hex({ children, solid, sub }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={[
          'flex h-[7.5rem] w-[13.5rem] items-center justify-center px-6 text-center font-display text-[11px] font-extrabold uppercase leading-tight tracking-[0.08em] sm:text-xs xl:h-28 xl:w-[11.5rem]',
          solid ? 'text-brand-black' : 'text-white/80',
        ].join(' ')}
        style={
          solid
            ? { clipPath: HEX_CLIP, background: '#FFC501' }
            : {
                clipPath: HEX_CLIP,
                background: 'color-mix(in srgb, #FFC501 22%, transparent)',
                border: 0,
              }
        }
      >
        <span>{children}</span>
      </div>
      {sub && (
        <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
          {sub}
        </span>
      )}
    </div>
  )
}

/* Elemento appeso a una tappa ma FUORI dall'asse del percorso: uno scarto che si
 * spegne, qualcosa che entra da fuori, un avviso che si accende.
 *
 * Il "fuori dall'asse" non è un vezzo. In colonna, un elemento messo in mezzo si
 * prende la freccia gialla del passo successivo e si legge come se il flusso
 * passasse di lì: "scartato → prosegue", "ordine al fornitore → fatturata". Cioè
 * il contrario di quello che succede. Quindi si accosta a un lato, legato alla
 * sua tappa da un trattino, e la linea principale resta dritta.
 *
 * `align`: gli ingressi a sinistra, gli esiti a destra. `tone`: `muted` per il
 * vicolo cieco, `plain` per un ingresso, `alert` per lo stato che si accende.
 * Da xl, dove il flusso è già orizzontale, pende sotto la tappa e basta. */
function Side({ children, sub, tone = 'muted', align = 'end' }) {
  const box = {
    muted: 'border border-dashed border-white/10 text-white/50',
    plain: 'border border-white/10 bg-white/[0.04] text-white/70',
    alert: 'bg-brand-yellow text-brand-black',
  }[tone]

  return (
    <div
      className={[
        'mt-2 flex items-center gap-2 xl:mt-3 xl:flex-col xl:gap-0 xl:self-center',
        align === 'start' ? 'self-start' : 'self-end',
      ].join(' ')}
    >
      <span
        aria-hidden
        className="block h-px w-6 shrink-0 border-t border-dashed border-white/10 xl:h-6 xl:w-px xl:border-l xl:border-t-0"
      />
      <div className="flex flex-col items-center xl:mt-3">
        <div
          className={[
            'w-[11rem] rounded-2xl px-3 py-2.5 text-center font-display text-[10px] font-bold uppercase leading-tight tracking-[0.08em] xl:w-[10.5rem]',
            box,
          ].join(' ')}
        >
          {children}
        </div>
        {sub && (
          <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
            {sub}
          </span>
        )}
      </div>
    </div>
  )
}

/* Diramazione parallela che si richiude subito (i tre profili di Industrial, i due
 * ingressi di Josè): resta in colonna a ogni larghezza, sono voci di un elenco. */
function Branch({ items }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((label) => (
        <div
          key={label}
          className="w-[13.5rem] rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-center font-display text-[10px] font-bold uppercase tracking-[0.08em] text-white/70 xl:w-[10.5rem]"
        >
          {label}
        </div>
      ))}
    </div>
  )
}

/* Note a margine: quello che il sistema fa in più, fuori dal percorso principale.
 * Sotto la lavagna, separate da una riga, così non competono con il flusso. */
function Notes({ items }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2 border-t border-white/10 pt-6">
      {items.map((label) => (
        <span
          key={label}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/60"
        >
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 bg-brand-yellow"
            style={{ clipPath: HEX_CLIP }}
          />
          {label}
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* I CINQUE DIAGRAMMI                                                  */
/* ------------------------------------------------------------------ */

const COPY = {
  it: {
    elettra: {
      chain: ['Preventivo', 'Offerta inviata', 'Ordine confermato', 'Cantiere', 'Fatturata'],
      feed: 'Ordine al fornitore',
      badge: 'Da fatturare',
      badgeSub: 'finché non è fatturata',
      notes: ['Una scheda per azienda: cliente e fornitore', 'Storico prezzi dei materiali'],
    },
    industrial: {
      start: 'Annuncio',
      page: 'Pagina candidature',
      roles: ['Manutentore', 'Frigorista', 'Coordinatore'],
      fork1: 'Requisiti obbligatori',
      rejected1: 'Fuori, con risposta cortese',
      scored: 'Domande con punteggio',
      fork2: 'Soglia di qualifica',
      rejected2: 'Archivio + risposta d’attesa',
      end: 'Avviso all’ufficio del personale',
      notes: ['Candidati ordinati per punteggio', 'Ogni candidatura è un evento tracciato'],
    },
    jose: {
      inputs: ['Prenotazione dal sito', 'Prenotazione al telefono'],
      rules: 'Regole del ristoratore',
      rulesSub: 'giorno · coperti · tavolata',
      confirmed: 'Confermata subito',
      waiting: 'In attesa del ristoratore',
      calendar: 'Calendario del locale',
      notes: ['Email di conferma all’ospite', 'Giorni chiusi ed eventi privati', 'Cliente riconosciuto dal telefono'],
    },
    sofia: {
      inputs: ['Telefono che squilla', 'Chat del sito', 'WhatsApp'],
      hub: 'SofIA risponde',
      hubSub: '24 ore · più lingue',
      understands: 'Capisce cosa serve',
      slots: 'Propone gli orari liberi',
      end: 'Appuntamento in agenda',
      notes: ['Promemoria su WhatsApp', 'Sincronizzata con Google Calendar', 'A fine giornata: chiamate, appuntamenti, richieste'],
    },
    tharvel: {
      notes: ['Alt+click sull’elemento', 'Immagini ridimensionate da sé', 'Un solo servizio per tutti i siti'],
      // Nomi dei siti volutamente generici: il case study non dichiara chi usa
      // Tharvel, e l'elenco vero è la nostra lista clienti.
      ui: {
        live: 'Live',
        altClick: '+ click per selezionare un elemento',
        publish: 'Pubblica',
        sites: 'Siti',
        addSite: 'Aggiungi sito…',
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
      },
    },
  },
  en: {
    elettra: {
      chain: ['Quote', 'Offer sent', 'Order confirmed', 'Job site', 'Invoiced'],
      feed: 'Supplier order',
      badge: 'To invoice',
      badgeSub: 'until it is invoiced',
      notes: ['One record per company: client and supplier', 'Material price history'],
    },
    industrial: {
      start: 'Job ad',
      page: 'Applications page',
      roles: ['Maintenance tech', 'Refrigeration tech', 'Coordinator'],
      fork1: 'Mandatory requirements',
      rejected1: 'Out, with a courteous reply',
      scored: 'Scored questions',
      fork2: 'Qualification threshold',
      rejected2: 'Archive + holding reply',
      end: 'HR alerted',
      notes: ['Candidates sorted by score', 'Every application is a tracked event'],
    },
    jose: {
      inputs: ['Booking from the website', 'Booking by phone'],
      rules: 'Owner’s rules',
      rulesSub: 'day · covers · party size',
      confirmed: 'Confirmed instantly',
      waiting: 'Waiting for the owner',
      calendar: 'Venue calendar',
      notes: ['Confirmation email to the guest', 'Closing days and private events', 'Guest recognised by phone'],
    },
    sofia: {
      inputs: ['The phone rings', 'Website chat', 'WhatsApp'],
      hub: 'SofIA answers',
      hubSub: '24 hours · several languages',
      understands: 'Works out what’s needed',
      slots: 'Offers the free slots',
      end: 'Appointment booked',
      notes: ['WhatsApp reminder', 'Synced with Google Calendar', 'End of day: calls, bookings, requests'],
    },
    tharvel: {
      notes: ['Alt+click the element', 'Images resized on their own', 'One service for every site'],
      ui: {
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
      },
    },
  },
}

function ElettraBlueprint({ lang }) {
  const t = COPY[lang].elettra
  return (
    <>
      <Board>
        <Flow>
          <Node>{t.chain[0]}</Node>
          <Node>{t.chain[1]}</Node>
          <Node>{t.chain[2]}</Node>
          <div className="flex flex-col items-center">
            <Node>{t.chain[3]}</Node>
            <Side tone="plain" align="start">
              {t.feed}
            </Side>
            <Side tone="alert" sub={t.badgeSub}>
              {t.badge}
            </Side>
          </div>
          <Node solid>{t.chain[4]}</Node>
        </Flow>
      </Board>
      <Notes items={t.notes} />
    </>
  )
}

function IndustrialBlueprint({ lang }) {
  const t = COPY[lang].industrial
  return (
    <>
      <Board>
        <Flow>
          <Node>{t.start}</Node>
          <Node>{t.page}</Node>
          <Branch items={t.roles} />
          <div className="flex flex-col items-center">
            <Hex>{t.fork1}</Hex>
            <Side>{t.rejected1}</Side>
          </div>
          <Node>{t.scored}</Node>
          <div className="flex flex-col items-center">
            <Hex>{t.fork2}</Hex>
            <Side>{t.rejected2}</Side>
          </div>
          <Node solid>{t.end}</Node>
        </Flow>
      </Board>
      <Notes items={t.notes} />
    </>
  )
}

function JoseBlueprint({ lang }) {
  const t = COPY[lang].jose
  return (
    <>
      <Board>
        <Flow>
          <Branch items={t.inputs} />
          <Hex sub={t.rulesSub}>{t.rules}</Hex>
          <div className="flex flex-col items-center gap-2">
            <Node solid>{t.confirmed}</Node>
            <Node>{t.waiting}</Node>
          </div>
          <Node>{t.calendar}</Node>
        </Flow>
      </Board>
      <Notes items={t.notes} />
    </>
  )
}

function SofiaBlueprint({ lang }) {
  const t = COPY[lang].sofia
  return (
    <>
      <Board>
        <Flow>
          <Branch items={t.inputs} />
          <Hex solid sub={t.hubSub}>
            {t.hub}
          </Hex>
          <Node>{t.understands}</Node>
          <Node>{t.slots}</Node>
          <Node solid>{t.end}</Node>
        </Flow>
      </Board>
      <Notes items={t.notes} />
    </>
  )
}

/* Tharvel fa eccezione: al posto del diagramma di flusso c'è un facsimile del
 * pannello vero, perché di un prodotto l'interfaccia dice più di uno schema — si
 * vede subito che è un pannello a tre colonne, con i siti a sinistra, il sito vero
 * al centro e la chat a destra.
 *
 * È l'unico blueprint con colori propri e non ereditati dal tema: rappresenta
 * un'applicazione, che ha il suo aspetto e resta scura anche sulla sezione chiara,
 * come una finestra appoggiata sopra. Per questo qui le utility `white/NN` non
 * servono e i colori sono scritti a mano.
 *
 * I contenuti sono illustrativi di proposito: nessun nome di cliente vero
 * nell'elenco dei siti (il case study non dichiara chi lo usa) e nessun indirizzo
 * email, che nello screenshot originale era quello personale di Michele. */
function TharvelBlueprint({ lang }) {
  const t = COPY[lang].tharvel
  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#0B0B0C] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
        {/* barra superiore */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 px-3 py-2.5 sm:gap-3 sm:px-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t.ui.live}
          </span>
          <span className="text-[10px] font-semibold text-zinc-500">demo</span>
          <span className="hidden min-w-0 flex-1 rounded-lg bg-zinc-800/70 px-3 py-1.5 text-[10px] text-zinc-500 sm:block">
            /
          </span>
          <span className="hidden text-[10px] text-zinc-500 lg:inline">
            <kbd className="rounded border border-zinc-700 px-1 py-0.5 font-sans text-[9px] text-zinc-400">
              Alt
            </kbd>{' '}
            {t.ui.altClick}
          </span>
          <span className="ml-auto rounded-lg bg-brand-yellow px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-black">
            {t.ui.publish}
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
              {t.ui.sites}
            </p>
            <ul className="mt-2 space-y-1">
              {t.ui.siteList.map((s, i) => (
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
            <p className="mt-3 px-2 text-[10px] text-zinc-500">+ {t.ui.addSite}</p>
          </div>

          {/* anteprima del sito del cliente */}
          <div className="min-w-0 flex-1 bg-zinc-900/50 p-4 sm:p-6">
            <div className="rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-400 to-amber-400 p-4 sm:p-7">
              <div className="rounded-lg bg-white p-4 text-center sm:p-6">
                <span className="inline-block rounded-full bg-blue-100 px-2.5 py-1 text-[9px] font-bold text-blue-700">
                  {t.ui.previewPill}
                </span>
                <p className="mt-3 font-display text-lg font-extrabold text-blue-600 sm:text-2xl">
                  {t.ui.previewTitle}
                </p>
                <div className="mx-auto mt-3 space-y-1.5">
                  <span className="mx-auto block h-1.5 w-4/5 rounded-full bg-slate-200" />
                  <span className="mx-auto block h-1.5 w-3/5 rounded-full bg-slate-200" />
                </div>
                <div className="mt-4 h-16 rounded-md bg-slate-100 sm:h-24" />
                <span className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-[9px] font-bold text-white">
                  {t.ui.previewCta}
                </span>
              </div>
            </div>
          </div>

          {/* colonna chat */}
          <div className="shrink-0 border-t border-zinc-800 px-3 py-4 lg:w-52 lg:border-l lg:border-t-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-300">
                {t.ui.chat}
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.ui.connected}
              </span>
            </div>
            <p className="mt-4 font-display text-[11px] font-extrabold text-zinc-100">
              {t.ui.chatTitle}
            </p>
            <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500">
              {t.ui.tryNow}
            </p>
            <ul className="mt-2 space-y-1.5">
              {t.ui.suggestions.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-zinc-800 px-2.5 py-2 text-[10px] leading-snug text-zinc-400"
                >
                  → {s}
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg bg-zinc-800/70 px-2.5 py-2 text-[10px] text-zinc-500">
              {t.ui.inputPlaceholder}
            </div>
          </div>
        </div>
      </div>
      <Notes items={t.notes} />
    </>
  )
}

/* Slug del caso → diagramma. Un caso senza voce qui semplicemente non mostra
 * nessun blueprint: la sezione resta valida, si regge sul testo. */
export const BLUEPRINTS = {
  'elettra-crm': ElettraBlueprint,
  'industrial-service-hr': IndustrialBlueprint,
  'jose-prenotazioni': JoseBlueprint,
  'sofia-centralino-ai': SofiaBlueprint,
  'tharvel-admin-siti': TharvelBlueprint,
}
