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
      ask: 'Il cliente scrive in chat',
      askSub: '«cambia il prezzo del menù»',
      engine: 'Tharvel',
      branch: 'Ramo di lavoro',
      preview: 'Anteprima dal vivo',
      rejected: 'Non va bene: si continua a chiedere',
      publish: 'Pubblica',
      live: 'Sito online aggiornato',
      notes: ['Alt+click sull’elemento', 'Immagini ridimensionate da sé', 'Un solo servizio per tutti i siti'],
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
      ask: 'The client writes in a chat',
      askSub: '“change the menu price”',
      engine: 'Tharvel',
      branch: 'Working branch',
      preview: 'Live preview',
      rejected: 'Not right: keep asking',
      publish: 'Publish',
      live: 'Live site updated',
      notes: ['Alt+click the element', 'Images resized on their own', 'One service for every site'],
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

function TharvelBlueprint({ lang }) {
  const t = COPY[lang].tharvel
  return (
    <>
      <Board>
        <Flow>
          <div className="flex flex-col items-center">
            <Node>{t.ask}</Node>
            <span className="mt-2 w-[13.5rem] text-center text-[10px] italic leading-snug text-white/50 xl:w-[10.5rem]">
              {t.askSub}
            </span>
          </div>
          <Hex solid>{t.engine}</Hex>
          <Node>{t.branch}</Node>
          <div className="flex flex-col items-center">
            <Node>{t.preview}</Node>
            <Side>{t.rejected}</Side>
          </div>
          <Hex>{t.publish}</Hex>
          <Node solid>{t.live}</Node>
        </Flow>
      </Board>
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
