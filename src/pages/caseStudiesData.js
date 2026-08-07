/* DATI DEI CASE STUDY (/casestudy)
 * ---------------------------------
 * Un oggetto = un progetto = una sezione della pagina. Il layout sta in
 * CaseStudies.jsx e non va toccato per aggiungere un lavoro: si copia il
 * TEMPLATE qui sotto, si riempie e si mette nell'array.
 *
 * L'ORDINE DELL'ARRAY È L'ORDINE IN PAGINA. Va tenuto per forza, non per data:
 * il caso più convincente in cima, perché è l'unico che leggono tutti.
 *
 * ── LA SCHEDA (rifatta il 2026-08-06 sul modello mandato da Marco) ───────────
 * Ogni caso è una scheda a due colonne. A sinistra chi è il cliente e cosa gli
 * abbiamo cambiato; a destra cinque blocchi, sempre in quest'ordine:
 *
 *   1. RISULTATI CHIAVE   `results` — 3 schede: icona, titolo, una riga.
 *   2. PRIMA → DOPO       `before` / `after` — 3 voci per lato, 2-4 parole.
 *   3. COME FUNZIONA      `steps` — 4 tappe numerate con icona.
 *   4. LA PROVA           `proof` — una schermata del sistema. Facoltativa.
 *   5. CITAZIONE          `quote` — se ce l'abbiamo. Accanto le sta la CTA.
 *
 * Prima c'erano un paragrafo «Il problema» e un elenco «Cosa abbiamo costruito»:
 * 350 parole a caso che non leggeva nessuno. Adesso quel contenuto è distribuito
 * fra Prima→Dopo (il problema) e Come funziona (il costruito), in un decimo dello
 * spazio. La versione lunga NON è persa: sta nei brief in case-studies/*.md, ed è
 * da lì che si pesca per una proposta commerciale.
 *
 * ── LUNGHEZZA. Non è un suggerimento, è la forma del blocco ──────────────────
 *   headline            10-14 parole. Da cosa a cosa.
 *   results[].title     2-5 parole. results[].body una riga, max 8 parole.
 *   before/after        2-4 parole a voce. Sono etichette, non frasi.
 *   steps[].title       1-2 parole. steps[].body una riga, max 7 parole.
 * Se una cosa non ci sta, non ci sta: va nel brief, non qui.
 *
 * ── I NUMERI ────────────────────────────────────────────────────────────────
 * Due regole che non si toccano, ereditate dal giro precedente:
 *   1. in `results` un numero ci va solo se è verificabile sul sistema o
 *      confermato per iscritto dal cliente. Niente stime.
 *   2. valori inventati → `resultsDraft: true`, che in pagina accende il badge
 *      «numeri di esempio» e le schede tratteggiate. Il flag si toglie insieme
 *      ai valori finti, mai da solo: la pagina gira come link nelle proposte, e
 *      un numero inventato sotto il logo di un cliente vero si legge come vero.
 * Una scheda `results` senza numeri va benissimo — dice cosa fa il sistema, e
 * nessuno la scambia per una statistica.
 *
 * ── ALTRE REGOLE ────────────────────────────────────────────────────────────
 * - `slug`: diventa l'ancora della sezione (/casestudy#slug) e finisce nei link
 *   che mandiamo in giro → una volta pubblicato NON si cambia più.
 * - `categories`: chiavi di CATEGORIES. Guidano i filtri in cima alla pagina:
 *   una categoria compare come chip solo se almeno un progetto la usa.
 * - `logo`: file in public/. `logoMono: true` se il logo è monocromatico (i
 *   partner-*.webp sono bianchi pieni): serve a invertirlo sulle sezioni chiare,
 *   dove altrimenti sparisce. Logo a colori → `logoMono: false`.
 * - `meta`: la riga «Settore · Durata · Sistema» del pannello di sinistra. È un
 *   array: una voce che non sappiamo si omette, non si inventa.
 * - `icon`: un nome da caseStudyIcons.jsx. Un nome sbagliato non disegna niente
 *   e non rompe la pagina, ma controlla ICON_NAMES prima di inventarne uno.
 * - Testi bilingui: { it: '…', en: '…' }. Se l'inglese manca, mettere comunque
 *   la chiave `en` (anche uguale all'italiano) per non far crashare il render.
 * - `template: true` accende il badge "esempio": va rimosso sui progetti veri.
 */

/* Categorie disponibili per i filtri. Aggiungerne una qui prima di usarla in
 * un progetto, altrimenti il chip non ha etichetta. */
export const CATEGORIES = {
  crm: { it: 'CRM', en: 'CRM' },
  automazioni: { it: 'Automazioni', en: 'Automation' },
  gestionali: { it: 'Gestionali', en: 'Business software' },
  ai: { it: 'AI', en: 'AI' },
  web: { it: 'Web & funnel', en: 'Web & funnel' },
  ads: { it: 'Ads', en: 'Ads' },
}

/* --------------------------------------------------------------------------
 * TEMPLATE — copia da qui.
 *
 * {
 *   slug: 'nome-cliente',                      // ancora: /casestudy#nome-cliente
 *   client: 'Nome Cliente',
 *   logo: '/partner-nomecliente.webp',         // in public/, oppure null
 *   logoMono: true,                            // logo monocromatico → invertibile
 *   url: 'https://sitodelcliente.it',          // oppure null
 *   year: '2026',
 *   categories: ['crm', 'automazioni'],
 *   kicker: { it: 'CRM / Gestionale', en: '…' },   // riga gialla in cima
 *   headline: { it: 'Da cosa a cosa.', en: 'From what to what.' },
 *   meta: [
 *     { label: { it: 'Settore', en: 'Industry' }, value: { it: '…', en: '…' } },
 *     { label: { it: 'Sistema', en: 'System' }, value: { it: '…', en: '…' } },
 *   ],
 *   results: [                                 // esattamente 3
 *     {
 *       icon: 'clock',
 *       title: { it: 'Titolo breve', en: 'Short title' },
 *       body: { it: 'Una riga.', en: 'One line.' },
 *     },
 *   ],
 *   resultsNote: { it: 'Che numeri sono.', en: '…' },   // solo se ci sono cifre
 *   resultsDraft: true,                        // solo se i valori sono finti
 *   before: { it: ['Voce', 'Voce', 'Voce'], en: [...] },
 *   after: { it: ['Voce', 'Voce', 'Voce'], en: [...] },
 *   steps: [                                   // esattamente 4
 *     {
 *       icon: 'doc',
 *       title: { it: 'Tappa', en: 'Step' },
 *       body: { it: 'Una riga.', en: 'One line.' },
 *     },
 *   ],
 *   proof: {
 *     images: [                                // 1 sola → piena larghezza
 *       { src: '/casestudy-nome.webp', alt: { it: '…', en: '…' },
 *         width: 1320, height: 996 },          // 2 → affiancate da lg
 *     ],
 *   },                                         // oppure { component: 'tharvel' }
 *                                              // oppure omesso: niente blocco
 *   quote: {
 *     text: { it: 'Parole del cliente.', en: 'Client’s words.' },
 *     author: 'Nome Cognome',
 *     authorUrl: 'https://www.linkedin.com/in/…',   // facoltativo
 *     role: { it: 'Titolare', en: 'Owner' },
 *   },                                         // oppure null
 * }
 * -------------------------------------------------------------------------- */

export const CASES = [
  {
    slug: 'elettra-crm',
    client: 'Elettra Group',
    logo: '/partner-elettragroup.webp',
    logoMono: true,
    url: 'https://elettragroup.it',
    year: '2026',
    categories: ['crm', 'gestionali', 'ai'],
    kicker: { it: 'CRM / Gestionale', en: 'CRM / Business software' },
    headline: {
      it: 'Da commesse frammentate a un unico controllo su ordini, acquisti e fatturazione',
      en: 'From scattered jobs to one grip on orders, purchases and invoicing',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Impiantistica su commessa', en: 'Contract installations' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'CRM + gestionale su misura', en: 'CRM + custom business software' },
      },
      // TODO durata: nel brief non c'è, e non si inventa. Michele la sa.
    ],
    /* Numeri della migrazione, contati sul sistema (case-studies/elettra-crm.md).
     * Manca ancora una metrica di risultato lato cliente — ore recuperate,
     * offerte salvate — perché nessuno l'ha misurata: si misura dopo un anno
     * pieno di uso. Fino ad allora `resultsNote` dice che numeri sono questi. */
    results: [
      {
        icon: 'merge',
        title: { it: '1.044 aziende in una scheda sola', en: '1,044 companies on one record' },
        body: { it: 'Erano 3.243 schede duplicate.', en: 'They were 3,243 duplicate cards.' },
      },
      {
        icon: 'database',
        title: { it: '8,6 M€ di offerte migrate', en: '€8.6M in quotes migrated' },
        body: {
          it: '723 commesse, quadratura al centesimo.',
          en: '723 jobs, reconciled to the cent.',
        },
      },
      {
        icon: 'eye',
        title: {
          it: 'Commesse da fatturare subito visibili',
          en: 'Jobs to invoice visible at once',
        },
        body: {
          it: 'Nessun lavoro comprato e dimenticato.',
          en: 'No job bought for and then forgotten.',
        },
      },
    ],
    resultsNote: {
      it: 'Numeri della migrazione, contati sul sistema: fatti, non stime di risparmio.',
      en: 'Migration figures, counted on the system: facts, not estimated savings.',
    },
    before: {
      it: ['Dati sparsi su più Excel', 'Acquisti scollegati dalle commesse', 'Fatturazione poco visibile'],
      en: ['Data scattered across spreadsheets', 'Purchases detached from jobs', 'Invoicing hard to see'],
    },
    after: {
      it: ['Un flusso unico', 'Controllo in tempo reale', 'Storico ordini centralizzato'],
      en: ['One single flow', 'Real-time control', 'Order history in one place'],
    },
    steps: [
      {
        icon: 'doc',
        title: { it: 'Richiesta', en: 'Request' },
        body: { it: 'Esigenze e documenti iniziali.', en: 'Requirements and first documents.' },
      },
      {
        icon: 'calculator',
        title: { it: 'Preventivo', en: 'Quote' },
        body: { it: 'Preventivazione rapida e tracciata.', en: 'Quoted fast and tracked.' },
      },
      {
        icon: 'briefcase',
        title: { it: 'Commessa', en: 'Job' },
        body: { it: 'Diventa commessa e si pianifica.', en: 'Becomes a job and gets planned.' },
      },
      {
        icon: 'cart',
        title: { it: 'Acquisti e fattura', en: 'Purchases and invoice' },
        body: { it: 'Acquisti controllati, fatture generate.', en: 'Purchases checked, invoices issued.' },
      },
    ],
    /* Il cruscotto vero. Nomi cliente, PM e utente in sidebar erano già oscurati
     * nell'export; «Ciao, Fabio» resta in chiaro di proposito, perché Fabio Greco
     * firma la testimonianza qui sotto col link al suo profilo — nasconderlo lì e
     * nominarlo qui sarebbe incoerente. */
    proof: {
      images: [
        {
          src: '/casestudy-elettra-dashboard.webp',
          alt: {
            it: 'Il cruscotto del CRM: 1043 clienti, 1044 fornitori, 8.623.037,50 € di valore offerto, e la pipeline delle 723 commesse divisa per stato.',
            en: 'The CRM dashboard: 1,043 clients, 1,044 suppliers, €8,623,037.50 in quoted value, and the pipeline of 723 jobs split by state.',
          },
          width: 1320,
          height: 996,
        },
      ],
    },
    // TODO testimonianza: Fabio Greco, con `authorUrl` al suo LinkedIn. Il campo
    // è pronto — servono le sue parole e il ruolo, non li scriviamo noi.
    quote: null,
  },
  {
    slug: 'industrial-service-hr',
    client: 'Industrial Service & Facility',
    logo: '/partner-industrial-service.webp',
    logoMono: true,
    url: 'https://www.industrialservicefacility.it/',
    year: '2026',
    categories: ['automazioni', 'gestionali', 'web'],
    kicker: { it: 'Automazioni / Web', en: 'Automation / Web' },
    headline: {
      it: 'Da CV generici a candidati già filtrati sui requisiti obbligatori',
      en: 'From generic CVs to candidates already screened on the mandatory requirements',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Energie rinnovabili', en: 'Renewable energy' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'Pagina candidature + punteggio', en: 'Applications page + scoring' },
      },
    ],
    /* Numeri letti dalla barra in cima alla dashboard candidature il 2026-08-06:
     * 118 totali, 79 pronti ora, 1 diamante grezzo. Sono conteggi che crescono,
     * quindi `resultsNote` porta la data: senza, invecchiano in silenzio.
     *
     * Il «diamante grezzo» è una delle quattro fasce del punteggio (pronti ora,
     * diamante grezzo, potenziale medio, non ora): alto potenziale ma poca
     * esperienza di settore. È il numero più piccolo dei tre ed è il migliore
     * da raccontare — è la persona che una lettura del CV avrebbe buttato. */
    results: [
      {
        icon: 'inbox',
        title: { it: '118 candidature valutate', en: '118 applications assessed' },
        body: {
          it: 'Tutte dallo stesso percorso, con lo stesso metro.',
          en: 'All through the same path, by the same yardstick.',
        },
      },
      {
        icon: 'userCheck',
        title: { it: '79 pronti da chiamare', en: '79 ready to call' },
        body: {
          it: 'Già ordinati per punteggio, senza leggere un CV.',
          en: 'Already sorted by score, without reading a CV.',
        },
      },
      {
        icon: 'sparkle',
        title: { it: '1 diamante grezzo trovato', en: '1 rough diamond found' },
        body: {
          it: 'Alto potenziale, poca esperienza: un CV lo scartava.',
          en: 'High potential, little experience: a CV would have binned it.',
        },
      },
    ],
    resultsNote: {
      it: 'Conteggi letti sulla dashboard del sistema il 6 agosto 2026.',
      en: 'Counts read off the system dashboard on 6 August 2026.',
    },
    before: {
      it: ['CV generici, tutti uguali', 'Colloqui con chi era già fuori', 'Candidati senza risposta'],
      en: ['Generic CVs, all alike', 'Interviews with people already out', 'Candidates left unanswered'],
    },
    after: {
      it: ['Requisiti verificati prima', 'Solo profili qualificati', 'Risposta a tutti'],
      en: ['Requirements checked first', 'Qualified profiles only', 'Everyone gets a reply'],
    },
    steps: [
      {
        icon: 'megaphone',
        title: { it: 'Annuncio', en: 'Job ad' },
        body: { it: 'Il candidato arriva sulla pagina.', en: 'The candidate lands on the page.' },
      },
      {
        icon: 'shieldCheck',
        title: { it: 'Requisiti', en: 'Requirements' },
        body: { it: 'Le domande eliminatorie per prime.', en: 'Knockout questions come first.' },
      },
      {
        icon: 'gauge',
        title: { it: 'Punteggio', en: 'Score' },
        body: { it: 'Le risposte diventano un punteggio.', en: 'Answers turn into a score.' },
      },
      {
        icon: 'userCheck',
        title: { it: 'Qualificati', en: 'Qualified' },
        body: { it: 'In ufficio solo chi supera la soglia.', en: 'Only those above the threshold.' },
      },
    ],
    /* La dashboard vera. Anonimizzata prima di finire in public/: nomi ed email
     * erano già sfocati nell'export, le iniziali degli avatar no — e iniziale +
     * ruolo, su un bacino di 118 persone in un settore stretto, è un aggancio
     * per risalire al candidato. Sfocate anche quelle.
     * I tre numeri in barra sono gli stessi delle schede qui sopra: se un giorno
     * aggiorni i conteggi, rifai anche lo screenshot o si contraddicono. */
    proof: {
      images: [
        {
          src: '/casestudy-industrial-dashboard.webp',
          alt: {
            it: 'La dashboard candidature: 118 totali, 79 pronti ora, 1 diamante grezzo. A sinistra la mappa fit di settore/potenziale, a destra l’elenco ordinato per punteggio.',
            en: 'The applications dashboard: 118 total, 79 ready now, 1 rough diamond. On the left the sector-fit vs potential map, on the right the list sorted by score.',
          },
          width: 1320,
          height: 996,
        },
      ],
    },
    quote: null,
  },
  {
    slug: 'jose-prenotazioni',
    client: 'Josè Restaurant',
    logo: null,
    logoMono: false,
    url: 'https://prenota.tenutavillaguerra.it',
    year: '2026',
    categories: ['automazioni', 'gestionali', 'web'],
    kicker: { it: 'Automazioni / Gestionale', en: 'Automation / Business software' },
    headline: {
      it: 'Dalle prenotazioni sull’agenda di carta a un calendario che si conferma da solo',
      en: 'From bookings in a paper diary to a calendar that confirms itself',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Ristorazione ed eventi', en: 'Restaurant and events' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'Prenotazioni white-label', en: 'White-label bookings' },
      },
    ],
    /* Nessuna cifra: da Josè non abbiamo ancora una misura, e queste tre schede
     * dicono cosa fa il sistema. Nessuno le scambia per statistiche, quindi non
     * serve `resultsNote`. */
    results: [
      {
        icon: 'calendarCheck',
        title: { it: 'Un calendario solo', en: 'One calendar only' },
        body: { it: 'Online, telefono e chiusure insieme.', en: 'Online, phone and closures together.' },
      },
      {
        icon: 'bolt',
        title: { it: 'Conferma immediata sotto soglia', en: 'Instant confirmation below threshold' },
        body: { it: 'Il tavolo piccolo non aspetta.', en: 'A small table waits for nobody.' },
      },
      {
        icon: 'userCheck',
        title: { it: 'Cliente riconosciuto dal telefono', en: 'Guest recognised by phone' },
        body: { it: 'Chi torna è già in anagrafica.', en: 'Returning guests are already on file.' },
      },
    ],
    before: {
      it: ['Agenda di carta', 'Stesso tavolo promesso due volte', '«Vi ricontattiamo»'],
      en: ['A paper diary', 'The same table promised twice', '“We’ll get back to you”'],
    },
    after: {
      it: ['Un calendario solo', 'Esito subito', 'Regole decise dal ristoratore'],
      en: ['One calendar only', 'An answer straight away', 'Rules set by the owner'],
    },
    steps: [
      {
        icon: 'calendar',
        title: { it: 'Richiesta', en: 'Request' },
        body: { it: 'Data, orario e coperti dal sito.', en: 'Date, time and covers from the site.' },
      },
      {
        icon: 'filter',
        title: { it: 'Regole', en: 'Rules' },
        body: { it: 'Giorno, coperti e tavolata a confronto.', en: 'Day, covers and party size checked.' },
      },
      {
        icon: 'checkCircle',
        title: { it: 'Esito', en: 'Outcome' },
        body: { it: 'Conferma automatica o attesa.', en: 'Auto-confirmed, or held for the owner.' },
      },
      {
        icon: 'calendarCheck',
        title: { it: 'Calendario', en: 'Calendar' },
        body: { it: 'Online e telefono nello stesso posto.', en: 'Online and phone in one place.' },
      },
    ],
    /* Il pannello del gestore. Nomi, telefono ed email degli ospiti erano già
     * oscurati nell'export; le note («allergia ai crostacei», «due bambini
     * piccoli») restano in chiaro perché senza il nome non sono attribuibili a
     * nessuno — e sono la ragione visibile per cui certe richieste devono
     * passare dal ristoratore invece di confermarsi da sole.
     *
     * È la schermata che regge il caso meglio del testo: si vedono insieme le
     * nove richieste in attesa e il calendario coi giorni chiusi, l'evento
     * privato e il riposo settimanale. */
    proof: {
      images: [
        {
          src: '/casestudy-jose-richieste.webp',
          alt: {
            it: 'Le nove richieste da confermare, ognuna con data, orario, coperti e la nota dell’ospite, e i pulsanti conferma o rifiuta.',
            en: 'The nine requests awaiting confirmation, each with date, time, covers and the guest’s note, and the confirm or decline buttons.',
          },
          width: 889,
          height: 600,
        },
        {
          src: '/casestudy-jose-calendario.webp',
          alt: {
            it: 'Il calendario del mese: coperti per giorno, riposo settimanale, chiusure ed eventi privati, e sotto il dettaglio del giorno scelto col limite di coperti.',
            en: 'The month calendar: covers per day, the weekly day off, closures and private events, and below the detail of the selected day with its cover limit.',
          },
          width: 889,
          height: 600,
        },
      ],
    },
    quote: null,
  },
  {
    slug: 'sofia-centralino-ai',
    client: 'SofIA',
    logo: null,
    logoMono: false,
    url: 'https://prontosofia.it',
    year: '2026',
    categories: ['ai', 'automazioni', 'web'],
    kicker: { it: 'AI / Automazioni', en: 'AI / Automation' },
    headline: {
      it: 'Dal telefono che squilla a vuoto all’appuntamento già in agenda',
      en: 'From a phone ringing out to the appointment already in the diary',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Centralino e agenda automatici', en: 'Automated phone and calendar' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'Voce AI + chat + WhatsApp', en: 'AI voice + chat + WhatsApp' },
      },
    ],
    results: [
      {
        icon: 'phone',
        title: { it: 'Risponde 24 ore su 24', en: 'It answers around the clock' },
        body: { it: 'Anche di sera e nei fine settimana.', en: 'Evenings and weekends included.' },
      },
      {
        icon: 'calendarCheck',
        title: { it: 'Appuntamento chiuso in chiamata', en: 'Appointment closed during the call' },
        body: { it: 'Senza mettere nessuno in attesa.', en: 'Without putting anyone on hold.' },
      },
      {
        icon: 'chart',
        title: { it: 'A fine giornata sai cosa chiedevano', en: 'By evening you know what they asked' },
        body: { it: 'Chiamate, appuntamenti, domande ricorrenti.', en: 'Calls, bookings, recurring questions.' },
      },
    ],
    before: {
      it: ['Telefono che squilla a vuoto', 'Appuntamenti su carta', 'Di sera non risponde nessuno'],
      en: ['A phone that rings out', 'Appointments on paper', 'Nobody answers in the evening'],
    },
    after: {
      it: ['Risposta a ogni chiamata', 'Agenda sincronizzata', 'Aperto 24 ore'],
      en: ['Every call answered', 'A synced diary', 'Open around the clock'],
    },
    steps: [
      {
        icon: 'phone',
        title: { it: 'Chiamata', en: 'Call' },
        body: { it: 'Telefono, chat del sito o WhatsApp.', en: 'Phone, site chat or WhatsApp.' },
      },
      {
        icon: 'sparkle',
        title: { it: 'Ascolto', en: 'Listening' },
        body: { it: 'Capisce cosa serve e a chi.', en: 'It works out what’s needed, and for whom.' },
      },
      {
        icon: 'clock',
        title: { it: 'Orari', en: 'Slots' },
        body: { it: 'Propone gli spazi liberi.', en: 'It offers the free slots.' },
      },
      {
        icon: 'calendarCheck',
        title: { it: 'Agenda', en: 'Diary' },
        body: { it: 'Appuntamento in Google Calendar.', en: 'Appointment in Google Calendar.' },
      },
    ],
    /* Facsimile a codice e non uno screenshot: il pannello di un cliente vero
     * conterrebbe le chiamate dei suoi pazienti. Disegnato coi token di SofIA
     * (Sofia/tokens.css). I dati sono di esempio e in pagina non si dichiara:
     * SofIA è un nostro prodotto, non il sistema di un cliente, quindi nessun
     * numero è attribuito a un terzo. Un mockup di prodotto con dati d'esempio è
     * quello che fa qualunque pagina SaaS, e la postilla suonava come una scusa.
     * La regola resta valida dove i numeri parlano di un cliente vero. */
    proof: { component: 'sofia' },
    quote: null,
  },
  {
    slug: 'tharvel-admin-siti',
    client: 'Tharvel',
    logo: '/tharvel-logo.webp',
    // Logo scuro su trasparente, non bianco come i partner-*.webp: su una
    // sezione chiara si legge da solo e NON va invertito. Attenzione se un
    // giorno l'ordine dell'array lo sposta su una sezione scura: lì sparirebbe,
    // e `logoMono` non aiuta perché inverte, non schiarisce.
    logoMono: false,
    url: null,
    year: '2026',
    categories: ['ai', 'web', 'gestionali'],
    kicker: { it: 'AI / Web', en: 'AI / Web' },
    headline: {
      it: 'Dal sito che solo noi possiamo toccare al cliente che lo modifica parlando in chat',
      en: 'From a site only we can touch to a client who edits it by chatting',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Gestione dei siti dei clienti', en: 'Client website management' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'Pannello AI multi-sito', en: 'Multi-site AI panel' },
      },
    ],
    results: [
      {
        icon: 'chat',
        title: { it: 'Modifiche a parole', en: 'Changes in plain words' },
        body: { it: 'Niente WordPress, niente page builder.', en: 'No WordPress, no page builder.' },
      },
      {
        icon: 'eye',
        title: { it: 'Anteprima prima di pubblicare', en: 'Preview before publishing' },
        body: { it: 'Il sito online non cambia finché non lo dici.', en: 'The live site holds until you say so.' },
      },
      {
        icon: 'layers',
        title: { it: 'Un servizio per tutti i siti', en: 'One service for every site' },
        body: { it: 'Nei repo dei clienti non entra una riga.', en: 'Not a line enters client repos.' },
      },
    ],
    before: {
      it: ['Ogni modifica passa da noi', 'Due minuti diventano una coda', 'Il sito si congela'],
      en: ['Every change goes through us', 'Two minutes become a queue', 'The site freezes'],
    },
    after: {
      it: ['Il cliente si gestisce da solo', 'Pubblica quando è convinto', 'Si torna indietro sempre'],
      en: ['The client manages it alone', 'They publish when happy', 'There is always a way back'],
    },
    steps: [
      {
        icon: 'chat',
        title: { it: 'Chiedi', en: 'Ask' },
        body: { it: 'A parole in chat, o Alt+click.', en: 'In plain words, or Alt+click.' },
      },
      {
        icon: 'eye',
        title: { it: 'Anteprima', en: 'Preview' },
        body: { it: 'Il sito modificato accanto alla chat.', en: 'The edited site next to the chat.' },
      },
      {
        icon: 'upload',
        title: { it: 'Pubblica', en: 'Publish' },
        body: { it: 'L’unico momento in cui il sito cambia.', en: 'The only moment the site changes.' },
      },
      {
        icon: 'undo',
        title: { it: 'Torna indietro', en: 'Roll back' },
        body: { it: 'Ogni versione resta recuperabile.', en: 'Every version stays recoverable.' },
      },
    ],
    // L'unico caso con la prova già pronta: l'interfaccia È il prodotto, quindi
    // un facsimile a codice dice più di uno screenshot (caseStudyProofs.jsx).
    proof: { component: 'tharvel' },
    quote: null,
  },
  {
    slug: 'mrhatter-gestionale',
    client: 'Mr. Hatter',
    logo: null,
    logoMono: false,
    url: 'https://www.mrhatter.it/',
    year: '2026',
    categories: ['gestionali'],
    kicker: { it: 'Gestionale', en: 'Business software' },
    headline: {
      it: 'Da quattro risposte diverse a un ordine che sta in un posto solo, fino alla consegna',
      en: 'From four different answers to an order that lives in one place, all the way to delivery',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Cappelli artigianali, vendita ai negozi', en: 'Handmade hats, wholesale' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'Gestionale ordini e produzione', en: 'Orders and production software' },
      },
    ],
    results: [
      {
        icon: 'box',
        title: { it: 'Ordini e magazzino collegati', en: 'Orders and stock connected' },
        body: { it: 'Cosa c’è, cosa è impegnato, cosa manca.', en: 'What’s there, committed, missing.' },
      },
      {
        icon: 'gauge',
        title: { it: 'Stato dell’ordine sempre aggiornato', en: 'Order status always current' },
        body: { it: 'Senza andare a controllare a mano.', en: 'Without checking by hand.' },
      },
      {
        icon: 'truck',
        title: { it: 'Consegne registrate con la data', en: 'Deliveries logged with the date' },
        body: { it: 'Chi ha ricevuto cosa, e quando.', en: 'Who received what, and when.' },
      },
    ],
    before: {
      it: ['Fogli sparsi', 'Lo stato in testa a chi l’ha preso', 'Controlli a mano'],
      en: ['Scattered sheets', 'Status in the head of whoever took it', 'Checks by hand'],
    },
    after: {
      it: ['Un sistema solo', 'Stato sempre leggibile', 'Risposta immediata al negozio'],
      en: ['One single system', 'Status always readable', 'An instant answer for the shop'],
    },
    steps: [
      {
        icon: 'doc',
        title: { it: 'Ordine', en: 'Order' },
        body: { it: 'Modelli e quantità dal negozio.', en: 'Models and quantities from the shop.' },
      },
      {
        icon: 'box',
        title: { it: 'Magazzino', en: 'Stock' },
        body: { it: 'Cosa c’è e cosa manca.', en: 'What is there and what is missing.' },
      },
      {
        icon: 'cog',
        title: { it: 'Produzione', en: 'Production' },
        body: { it: 'Seguita ordine per ordine.', en: 'Tracked order by order.' },
      },
      {
        icon: 'truck',
        title: { it: 'Consegna', en: 'Delivery' },
        body: { it: 'Evasione e data registrate.', en: 'Fulfilment and date recorded.' },
      },
    ],
    /* ⚠️ Facsimile disegnato senza aver visto il pannello vero: il progetto non
     * è su questa macchina (vedi case-studies/mrhatter-gestionale.md). La
     * struttura sta sui cinque ambiti che il gestionale gestisce davvero —
     * ordini, merce, produzione, evasione, consegne — l'aspetto è una nostra
     * scelta. Appena arriva uno screenshot si riallinea o si sostituisce. */
    proof: { component: 'mrhatter' },
    quote: null,
  },
]
