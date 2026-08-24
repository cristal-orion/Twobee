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
 * abbiamo cambiato (compreso `about`, due righe su cosa fa l'azienda); a destra
 * sei blocchi, sempre in quest'ordine:
 *
 *   0. IL PROBLEMA        `diagnosis` — il racconto per esteso. Viene per primo.
 *   1. RISULTATI CHIAVE   `results` — 3 schede: icona, titolo, una riga.
 *   2. PRIMA → DOPO       `before` / `after` — 3 voci per lato, 2-4 parole.
 *   3. COME FUNZIONA      `steps` — 4 tappe numerate con icona.
 *   4. LA PROVA           `proof` — una schermata del sistema. Facoltativa.
 *   5. CITAZIONE          `quote` — se ce l'abbiamo. Accanto le sta la CTA.
 *
 * `about` e `diagnosis` sono rientrati il 2026-08-07, dopo che una collega di
 * Michele ha letto la pagina e ha detto: «vedo la soluzione a un processo che
 * non ho capito quale sia». Il 06-08 li avevamo tolti insieme al paragrafo «Il
 * problema» per accorciare, ma Prima→Dopo arriva dopo i risultati ed è fatto di
 * etichette da tre parole: riassume, non spiega. E «Settore: impiantistica» a
 * noi basta perché il cliente lo conosciamo — a un estraneo non dice niente.
 * Non rimetterli via: senza, la pagina mostra la cura di una malattia che non
 * ha nominato.
 *
 * L'elenco «Cosa abbiamo costruito» invece resta fuori: quel contenuto sta in
 * Come funziona. La versione lunga di tutto è nei brief in case-studies/*.md, ed
 * è da lì che si pesca per una proposta commerciale.
 *
 * ── LUNGHEZZA. Non è un suggerimento, è la forma del blocco ──────────────────
 *   headline            10-14 parole. Da cosa a cosa.
 *   about               25-35 parole. Cosa fa l'azienda, come se non la
 *                       conoscessi: cosa vende, a chi, con che ritmo.
 *   diagnosis           70-100 parole. Cosa succedeva e cosa costava. La frase
 *                       che conta è quella sul costo — «materiale pagato per
 *                       lavori che non rientravano» — non l'elenco dei sintomi.
 *                       Niente percentuali inventate: se non abbiamo la cifra,
 *                       il costo si dice a parole.
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
 * - `logo`: file in public/. `logoMono: true` se il logo è bianco pieno (come i
 *   partner-*.webp): viene invertito sulle sezioni chiare, dove altrimenti
 *   sparisce. `logoDark: true` è il caso opposto — inchiostro scuro su
 *   trasparente, invertito sulle sezioni scure. Logo a colori → nessuno dei due.
 *   ⚠️ Il fondo di un caso dipende dalla sua POSIZIONE nell'array (pari = chiaro):
 *   spostare un caso, o aggiungerne uno in cima, ribalta il fondo di tutti quelli
 *   sotto. Ricontrolla i loghi quando cambi l'ordine.
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
 *   urlLabel: { it: '…', en: '…' },            // default: «Sito cliente».
 *                                              // Da mettere solo se il link porta
 *                                              // a qualcosa di provabile davvero
 *                                              // — quasi tutti questi sistemi
 *                                              // stanno dietro un login.
 *   year: '2026',
 *   categories: ['crm', 'automazioni'],
 *   kicker: { it: 'CRM / Gestionale', en: '…' },   // riga gialla in cima
 *   headline: { it: 'Da cosa a cosa.', en: 'From what to what.' },
 *   about: { it: 'Cosa fa l’azienda, in due righe.', en: '…' },
 *   diagnosis: { it: 'Cosa succedeva, e cosa costava.', en: '…' },
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
    slug: 'seven-inviti-fatturare',
    client: 'Seven',
    logo: '/partner-seven.webp',
    logoMono: true,
    url: 'https://www.sevenholding.it/',
    year: '2026',
    categories: ['gestionali', 'ai', 'automazioni'],
    kicker: { it: 'Gestionale / AI', en: 'Business software / AI' },
    headline: {
      it: 'Da una settimana di Excel per fornitore a un invito a fatturare chiuso in pochi minuti',
      en: 'From a week of spreadsheets per supplier to an invitation to invoice closed in minutes',
    },
    about: {
      it: 'Seven vende energia, gas e telefonia attraverso una rete di agenzie e agenti su tutta Italia. Non fattura ai clienti finali: incassa le provvigioni dai brand e le gira alla rete, contratto per contratto.',
      en: 'Seven sells energy, gas and telecoms through a network of agencies and agents across Italy. It does not invoice end customers: it collects commissions from the brands and passes them down the network, contract by contract.',
    },
    diagnosis: {
      it: 'Ogni mese una ventina di brand manda il proprio invito a fatturare — l’elenco dei contratti pagati e stornati — ognuno col suo formato e le sue diciture. Il back office li incrociava con la produzione del mese a colpi di CERCA.VERT e tabelle pivot, scorporava a mano gettone base, bonus RID e bolletta web, separava quello che resta all’agenzia da quello che va alle sub-agenzie e costruiva un Excel filtrato per ognuna. Le righe che non si agganciavano — un refuso in un codice, un PDR sbagliato, un contratto mai caricato — si cercavano una per una per nome del cliente. Un fornitore poteva prendere una settimana, e il processo intero viveva nella testa di una persona sola.',
      en: 'Every month some twenty brands send their invitation to invoice — the list of contracts paid and reversed — each in its own format and with its own wording. The back office cross-checked them against the month’s production with VLOOKUPs and pivot tables, split out the base fee, the direct-debit and the paperless bonuses by hand, separated what stays with the agency from what goes to the sub-agencies, and built a filtered spreadsheet for each one. The rows that would not match — a typo in a code, a wrong meter number, a contract never uploaded — were hunted down one by one by customer name. A single supplier could take a week, and the whole process lived in one person’s head.',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Energia e telco, vendita indiretta', en: 'Energy and telecom, indirect sales' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'Gestionale degli inviti a fatturare', en: 'Invitation-to-invoice software' },
      },
    ],
    results: [
      {
        icon: 'clock',
        title: { it: 'Da una settimana a pochi minuti', en: 'From a week to a few minutes' },
        body: { it: 'Per ogni fornitore, ogni mese.', en: 'Per supplier, every month.' },
      },
      {
        icon: 'layers',
        title: { it: 'Una ventina di brand, un formato solo', en: 'Some twenty brands, one format' },
        body: { it: 'Diciture normalizzate all’ingresso.', en: 'Wording normalised on the way in.' },
      },
      {
        icon: 'sparkle',
        title: { it: 'Le righe orfane si propongono da sole', en: 'Orphan rows propose themselves' },
        body: { it: 'Match a cascata, coi candidati più probabili.', en: 'Cascading match, with the likeliest candidates.' },
      },
    ],
    resultsNote: {
      it: 'Il confronto prima/dopo è sul ciclo mensile di un singolo fornitore, che è l’unità di lavoro del back office.',
      en: 'The before/after comparison is on the monthly cycle of a single supplier, which is the back office’s unit of work.',
    },
    before: {
      it: ['Un file diverso per ogni brand', 'CERCA.VERT e tabelle pivot', 'Righe orfane cercate a mano'],
      en: ['A different file per brand', 'VLOOKUPs and pivot tables', 'Orphan rows hunted by hand'],
    },
    after: {
      it: ['Un formato solo all’ingresso', 'Scorporo e quote in automatico', 'Un file per sub-agenzia con un clic'],
      en: ['One format on the way in', 'Split and shares calculated automatically', 'One file per sub-agency in a click'],
    },
    steps: [
      {
        icon: 'inbox',
        title: { it: 'Invito', en: 'The file' },
        body: { it: 'Il file del brand entra così com’è.', en: 'The brand’s file goes in as it is.' },
      },
      {
        icon: 'layers',
        title: { it: 'Normalizza', en: 'Normalise' },
        body: { it: 'Colonne e diciture a uno standard unico.', en: 'Columns and wording to one standard.' },
      },
      {
        icon: 'merge',
        title: { it: 'Riconcilia', en: 'Reconcile' },
        body: { it: 'Match a cascata, orfane con proposta.', en: 'Cascading match, orphans with a proposal.' },
      },
      {
        icon: 'doc',
        title: { it: 'Estratti conto', en: 'Statements' },
        body: { it: 'Quote calcolate, un file per sub-agenzia.', en: 'Shares calculated, one file per sub-agency.' },
      },
    ],
    /* Facsimile a codice: il pannello vero contiene i contratti dei clienti
     * finali, i POD/PDR e le provvigioni delle sub-agenzie — roba che non esce.
     * La schermata è la riconciliazione, cioè il punto dove il sistema fa la
     * differenza. Vedi il commento su SevenPanel in caseStudyProofs.jsx. */
    proof: { component: 'seven' },
    quote: null,
  },
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
    about: {
      it: 'Elettra Group monta impianti elettrici e fotovoltaici su commessa: ogni lavoro è un progetto a sé, con il suo preventivo, i suoi acquisti dai fornitori e il suo cantiere.',
      en: 'Elettra Group installs electrical and solar systems to order: every job is a project of its own, with its own quote, its own supplier purchases and its own site.',
    },
    diagnosis: {
      it: 'Offerte, ordini e anagrafiche vivevano su fogli Excel separati, e la stessa impresa poteva comparire cinque volte: una come cliente, una come fornitore, una per ogni indirizzo di consegna. Ma il costo vero non era il disordine. Era che nessuno sapeva quali commesse avessero già generato acquisti dai fornitori senza essere mai state fatturate: materiale pagato per lavori che non rientravano, e nessun modo di contarli. Allo stesso modo, il prezzo pagato l’ultima volta per un materiale era sepolto nelle righe degli ordini, irrecuperabile proprio quando serviva — al momento di trattare col fornitore.',
      en: 'Quotes, orders and contacts lived in separate spreadsheets, and the same business could appear five times over: once as a client, once as a supplier, once per delivery address. But the real cost was not the mess. It was that nobody knew which jobs had already generated supplier purchases without ever being invoiced: material paid for on work that never came back, and no way to count it. In the same way, the price last paid for a material was buried in order lines, out of reach exactly when it mattered — at the moment of negotiating with the supplier.',
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
    about: {
      it: 'Industrial Service & Facility monta e mantiene impianti fotovoltaici, eolici ed elettrici in tutta Italia, con squadre di tecnici che lavorano in trasferta e su turni.',
      en: 'Industrial Service & Facility installs and maintains solar, wind and electrical systems across Italy, with crews of technicians working away from home and on shifts.',
    },
    diagnosis: {
      it: 'Per quei cantieri servono tecnici con requisiti che non si negoziano: patente, patentino F-Gas, disponibilità ai turni di notte e alle trasferte. Ma le candidature arrivavano come CV liberi — tutti diversi da leggere e tutti uguali da valutare — e il requisito o c’era o non c’era, solo che per scoprirlo bisognava leggerli. Così l’ufficio del personale passava le giornate a richiamare persone che al primo requisito erano già fuori, mentre chi era davvero adatto aspettava una risposta che spesso non arrivava. E non c’era modo di sapere quale annuncio stesse portando tecnici veri e quale solo clic.',
      en: 'Those sites need technicians with non-negotiable requirements: a driving licence, F-Gas certification, availability for night shifts and travel. But applications arrived as free-form CVs — each different to read and all alike to judge — and the requirement was either there or not, except you had to read them to find out. So HR spent its days calling back people who failed on the very first requirement, while whoever actually fit waited for a reply that often never came. And there was no way to tell which ad was bringing real technicians and which only clicks.',
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
    // Non è il sito del cliente ma la pagina che abbiamo costruito noi, ed è
    // l'unico caso in pagina che si può usare davvero: sarebbe uno spreco
    // chiamarla «sito cliente».
    urlLabel: { it: 'Prova la prenotazione', en: 'Try the booking page' },
    year: '2026',
    categories: ['automazioni', 'gestionali', 'web'],
    kicker: { it: 'Automazioni / Gestionale', en: 'Automation / Business software' },
    headline: {
      it: 'Dalle prenotazioni sull’agenda di carta a un calendario che si conferma da solo',
      en: 'From bookings in a paper diary to a calendar that confirms itself',
    },
    about: {
      it: 'Josè Restaurant è il ristorante della Tenuta Villa Guerra: coperti tutte le sere, più i banchetti e gli eventi privati che occupano l’intera sala e vanno concordati uno per uno.',
      en: 'Josè Restaurant is the restaurant at Tenuta Villa Guerra: covers every evening, plus the banquets and private events that take the whole room and have to be agreed one by one.',
    },
    diagnosis: {
      it: 'Le prenotazioni arrivavano al telefono e finivano su un’agenda di carta, mentre chi prenotava dal sito riceveva un «vi ricontattiamo» e restava in sospeso. Nel frattempo lo stesso tavolo poteva essere promesso due volte, i giorni di chiusura e gli eventi privati vivevano a voce, e una tavolata da quindici veniva trattata come una coppia — ma la prima va valutata e la seconda no. In più il cliente alla decima prenotazione era un nome nuovo ogni volta, perché al telefono l’email non la lascia nessuno.',
      en: 'Bookings came in by phone and ended up in a paper diary, while whoever booked online got a “we’ll get back to you” and was left hanging. Meanwhile the same table could be promised twice, closing days and private events lived by word of mouth, and a party of fifteen was handled like a couple — but the first needs judgement and the second doesn’t. On top of that, the customer booking for the tenth time was a new name every time, because nobody leaves an email over the phone.',
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
    slug: 'tharvel-admin-siti',
    client: 'Tharvel',
    logo: '/tharvel-logo.webp',
    // Inchiostro scuro su trasparente, non bianco come i partner-*.webp: sulle
    // sezioni chiare si legge da solo, su quelle scure va invertito. È l'esatto
    // contrario di `logoMono`, e serve da quando Seven è entrato in cima e ha
    // spostato ogni caso sul fondo opposto.
    logoMono: false,
    logoDark: true,
    url: null,
    year: '2026',
    categories: ['ai', 'web', 'gestionali'],
    kicker: { it: 'AI / Web', en: 'AI / Web' },
    headline: {
      it: 'Dal sito che solo noi possiamo toccare al cliente che lo modifica parlando in chat',
      en: 'From a site only we can touch to a client who edits it by chatting',
    },
    about: {
      it: 'Tharvel è un prodotto nostro, nato da un problema nostro: è il pannello con cui i clienti dei siti che costruiamo possono modificarli da soli.',
      en: 'Tharvel is a product of ours, born out of a problem of ours: the panel that lets the clients whose sites we build edit them on their own.',
    },
    diagnosis: {
      it: 'Un sito fatto a mano è veloce e non si rompe, ma il giorno in cui il cliente vuole cambiare un prezzo o sostituire una foto deve scrivere a noi: due minuti di lavoro diventano una mail, una coda e una fattura per nulla. La risposta abituale del mercato è costruirlo in WordPress con un page builder, così se lo gestisce da solo — e allora arrivano i plugin che litigano, gli aggiornamenti che mandano giù il sito e un sito lento da mantenere per sempre. Nel frattempo il cliente, per paura di rompere qualcosa, smette di toccarlo: il sito si congela e invecchia.',
      en: 'A hand-built site is fast and does not break, but the day the client wants to change a price or swap a photo they have to write to us: two minutes of work turn into an email, a queue and an invoice for nothing. The market’s usual answer is to build it in WordPress with a page builder so they can manage it themselves — and then come the plugins that clash, the updates that take the site down and a slow site to maintain forever. Meanwhile the client, afraid of breaking something, stops touching it: the site freezes and ages.',
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
    about: {
      it: 'Mr. Hatter è un laboratorio napoletano che fa cappelli a mano da quattro generazioni e li vende ai negozi, non al pubblico: ogni rivenditore ordina i suoi modelli, nelle sue quantità, per la sua data.',
      en: 'Mr. Hatter is a Neapolitan workshop that has made hats by hand for four generations and sells to shops, not to the public: every retailer orders its own models, in its own quantities, for its own date.',
    },
    /* ⚠️ Come `before`/`after`, anche questo è una ricostruzione: nessuno ci ha
     * raccontato com'era prima, è dedotto da come lavora un laboratorio che
     * produce a mano e vende ai rivenditori. Da far leggere a Michele — se il
     * cliente lo legge, deve riconoscersi. Vedi case-studies/mrhatter-gestionale.md */
    diagnosis: {
      it: 'Produzione lenta e manuale da una parte, ordini dei rivenditori che arrivano quando arrivano dall’altra: due ritmi che non vanno d’accordo. Senza un sistema unico lo stato di un ordine vive nella testa di chi l’ha preso e su fogli sparsi — cosa è in lavorazione, cosa è pronto, cosa è già partito sono tre domande con tre risposte diverse a seconda di chi chiedi. E quando un negozio telefona per sapere quando arriva la merce, qualcuno deve alzarsi e andare a controllare a mano.',
      en: 'Slow, manual production on one side; retailer orders that arrive when they arrive on the other: two rhythms that do not agree. Without a single system, an order’s status lives in the head of whoever took it and on scattered sheets — what is being made, what is ready, what has already shipped are three questions with three different answers depending on who you ask. And when a shop calls to ask when the goods arrive, somebody has to get up and go and check by hand.',
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
