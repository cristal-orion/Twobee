/* DATI DEI CASE STUDY (/casestudy)
 * ---------------------------------
 * Un oggetto = un progetto = un capitolo della pagina. Il layout sta in
 * CaseStudies.jsx e non va toccato per aggiungere un lavoro: si copia il
 * TEMPLATE qui sotto, si riempie e si mette nell'array.
 *
 * L'ORDINE DELL'ARRAY È L'ORDINE IN PAGINA. Va tenuto per forza, non per data:
 * il caso più convincente in cima, perché è l'unico che leggono tutti.
 *
 * ── IL CAPITOLO (rifatto il 2026-10-29 con tasteskill: impaginato da report) ─
 * Ogni caso ha una colonna di sinistra (fino al 42% della larghezza) con i
 * titoli dei blocchi e chi è il cliente, e il testo che parte dall'asse:
 *
 *   apertura        logo + `meta`  |  `headline` (h2) + `about`
 *   Il problema                    |  `diagnosis`
 *   Cosa è cambiato                |  `results`, tre colonne di testo
 *   ── la schermata, a tutta larghezza, con `proof.caption` sotto ──
 *   Prima e adesso                 |  tabella da `before` / `after`
 *   Come funziona                  |  elenco numerato da `steps`
 *   (citazione, se c'è)            |  `quote`
 *                                  |  «Hai un processo simile?» + pulsante
 *
 * In cima alla pagina c'è anche l'indice «Da dove si partiva», fatto con
 * `symptom`: chi legge riconosce il proprio caos prima del nome del cliente.
 *
 * `about` e `diagnosis` non si tolgono. Il 2026-08-07 una collega di Michele,
 * davanti alla versione senza, ha detto: «vedo la soluzione a un processo che
 * non ho capito quale sia». A noi «settore: impiantistica» basta perché il
 * cliente lo conosciamo, a un estraneo no.
 *
 * ── COME SI SCRIVE ──────────────────────────────────────────────────────────
 * Frasi corte, soggetto e verbo, il nome vero delle cose (CERCA.VERT, PDR,
 * patentino F-Gas). Niente trattini lunghi, niente «non X ma Y», niente terne
 * di aggettivi. Se la frase la potrebbe firmare un'altra agenzia, va riscritta.
 *
 * ── LUNGHEZZA. Non è un suggerimento, è la forma del blocco ──────────────────
 *   headline            massimo 42 caratteri: deve stare in due righe anche
 *                       sul telefono. Un'affermazione, non «da X a Y».
 *   symptom             massimo 45 caratteri. Com'era prima, detto come lo
 *                       direbbe il cliente.
 *   about               20-35 parole. Cosa fa l'azienda, come se non la
 *                       conoscessi.
 *   diagnosis           60-90 parole. Cosa succedeva e cosa costava. Niente
 *                       percentuali inventate: se la cifra non c'è, il costo
 *                       si dice a parole.
 *   results[].title     2-6 parole. results[].body una riga, max 9 parole.
 *   before/after        3 voci per lato, 2-6 parole. Vanno IN COPPIA: la voce
 *                       n di `after` risponde alla voce n di `before`, perché
 *                       in pagina stanno sulla stessa riga della tabella.
 *   steps[].title       1-3 parole. steps[].body una riga, max 9 parole.
 *
 * ── I NUMERI ────────────────────────────────────────────────────────────────
 *   1. in `results` un numero ci va solo se è verificabile sul sistema o
 *      confermato per iscritto dal cliente. Niente stime.
 *   2. valori inventati → `resultsDraft: true`, che in pagina accende la scritta
 *      «Numeri di esempio». Il flag si toglie insieme ai valori finti, mai da
 *      solo: la pagina gira come link nelle proposte, e un numero inventato
 *      sotto il logo di un cliente vero si legge come vero.
 *   3. un facsimile a codice con numeri di un cliente vero (Seven) dichiara in
 *      `proof.caption` che i numeri sono di esempio.
 *
 * ── ALTRE REGOLE ────────────────────────────────────────────────────────────
 * - `slug`: diventa l'ancora del capitolo (/casestudy#slug) e finisce nei link
 *   che mandiamo in giro → una volta pubblicato NON si cambia più.
 * - `logo`: file in public/. `logoMono: true` se il logo è bianco pieno (come i
 *   partner-*.webp): viene invertito sui capitoli chiari. `logoDark: true` è il
 *   caso opposto, inchiostro scuro invertito sui capitoli scuri.
 *   ⚠️ Il fondo di un caso dipende dalla sua POSIZIONE nell'array (pari =
 *   chiaro): spostare un caso ribalta il fondo di tutti quelli sotto.
 *   Ricontrolla i loghi quando cambi l'ordine.
 * - `meta`: le righe «Settore / Sistema» sotto il logo. Una voce che non
 *   sappiamo si omette, non si inventa.
 * - Testi bilingui: { it: '…', en: '…' }. Se l'inglese manca, mettere comunque
 *   la chiave `en` (anche uguale all'italiano) per non far crashare il render.
 * - `template: true` accende la scritta "esempio": va rimosso sui progetti veri.
 */

/* --------------------------------------------------------------------------
 * TEMPLATE — copia da qui.
 *
 * {
 *   slug: 'nome-cliente',                      // ancora: /casestudy#nome-cliente
 *   client: 'Nome Cliente',
 *   logo: '/partner-nomecliente.webp',         // in public/, oppure null
 *   logoMono: true,                            // logo monocromatico → invertibile
 *   url: 'https://sitodelcliente.it',          // oppure null
 *   urlLabel: { it: '…', en: '…' },            // default: «Sito del cliente».
 *                                              // Solo se il link porta a
 *                                              // qualcosa di provabile davvero.
 *   year: '2026',
 *   symptom: { it: 'Com’era prima', en: '…' },
 *   headline: { it: 'Cosa succede adesso', en: '…' },
 *   about: { it: 'Cosa fa l’azienda.', en: '…' },
 *   diagnosis: { it: 'Cosa succedeva, e cosa costava.', en: '…' },
 *   meta: [
 *     { label: { it: 'Settore', en: 'Industry' }, value: { it: '…', en: '…' } },
 *     { label: { it: 'Sistema', en: 'System' }, value: { it: '…', en: '…' } },
 *   ],
 *   results: [                                 // esattamente 3
 *     { title: { it: 'Titolo breve', en: '…' }, body: { it: 'Una riga.', en: '…' } },
 *   ],
 *   resultsNote: { it: 'Che numeri sono.', en: '…' },   // solo se ci sono cifre
 *   resultsDraft: true,                        // solo se i valori sono finti
 *   before: { it: ['Voce', 'Voce', 'Voce'], en: [...] },
 *   after: { it: ['Voce', 'Voce', 'Voce'], en: [...] },  // in coppia con before
 *   steps: [                                   // esattamente 4
 *     { title: { it: 'Tappa', en: 'Step' }, body: { it: 'Una riga.', en: '…' } },
 *   ],
 *   proof: {
 *     images: [                                // 1 sola → piena larghezza
 *       { src: '/casestudy-nome.webp', alt: { it: '…', en: '…' },
 *         width: 1320, height: 996 },          // 2 → affiancate da lg
 *     ],                                       // oppure component: 'tharvel'
 *     caption: { it: 'Cosa si vede.', en: '…' },
 *   },                                         // oppure omesso: niente schermata
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
    symptom: {
      it: 'Una settimana di Excel per ogni fornitore',
      en: 'A week of spreadsheets for every supplier',
    },
    headline: {
      it: 'L’invito a fatturare si chiude in minuti',
      en: 'Commission statements, done in minutes',
    },
    about: {
      it: 'Seven vende luce, gas e telefonia con una rete di agenzie in tutta Italia. Non fattura ai clienti finali: incassa le provvigioni dai brand e le divide fra le agenzie, contratto per contratto.',
      en: 'Seven sells power, gas and telecoms through a network of agencies across Italy. It does not bill end customers: it collects commissions from the brands and splits them among the agencies, contract by contract.',
    },
    diagnosis: {
      it: 'Ogni mese una ventina di brand manda il proprio invito a fatturare, l’elenco dei contratti pagati e stornati, ognuno in un formato diverso. Il back office lo incrociava con la produzione del mese usando CERCA.VERT e tabelle pivot, calcolava a mano gettoni e bonus e preparava un Excel per ogni sub-agenzia. Le righe che non tornavano si cercavano per nome del cliente. Per un solo fornitore poteva servire una settimana, e l’intero procedimento lo conosceva una persona sola.',
      en: 'Every month some twenty brands send their invitation to invoice, the list of contracts paid and reversed, each in a different format. The back office cross-checked it against the month’s sales with VLOOKUPs and pivot tables, worked out fees and bonuses by hand and built a spreadsheet for every sub-agency. Rows that did not match were hunted down by customer name. A single supplier could take a week, and only one person knew the whole procedure.',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Energia e telefonia, vendita indiretta', en: 'Energy and telecoms, indirect sales' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'Gestionale degli inviti a fatturare', en: 'Commission reconciliation software' },
      },
    ],
    results: [
      {
        title: { it: 'Pochi minuti per fornitore', en: 'Minutes per supplier' },
        body: { it: 'Prima ci voleva anche una settimana.', en: 'It used to take up to a week.' },
      },
      {
        title: { it: 'Venti formati diventano uno', en: 'Twenty formats become one' },
        body: { it: 'Colonne e diciture uniformate all’ingresso.', en: 'Columns and wording aligned on the way in.' },
      },
      {
        title: { it: 'Le righe orfane hanno un candidato', en: 'Orphan rows come with a match' },
        body: { it: 'Il match più probabile è già proposto.', en: 'The likeliest match is already suggested.' },
      },
    ],
    resultsNote: {
      it: 'Il confronto è sul lavoro mensile di un singolo fornitore, l’unità con cui ragiona il back office.',
      en: 'The comparison is on one supplier’s monthly cycle, the unit the back office works in.',
    },
    before: {
      it: ['Un file diverso per ogni brand', 'CERCA.VERT e tabelle pivot', 'Righe orfane cercate a mano'],
      en: ['A different file per brand', 'VLOOKUPs and pivot tables', 'Orphan rows hunted by hand'],
    },
    after: {
      it: ['Un solo formato in ingresso', 'Gettoni e quote calcolati da soli', 'Un match proposto per ogni orfana'],
      en: ['One format on the way in', 'Fees and shares worked out for you', 'A suggested match for every orphan'],
    },
    steps: [
      {
        title: { it: 'Invito', en: 'The file' },
        body: { it: 'Il file del brand entra così com’è.', en: 'The brand’s file goes in as it is.' },
      },
      {
        title: { it: 'Normalizza', en: 'Normalise' },
        body: { it: 'Colonne e diciture prendono un formato unico.', en: 'Columns and wording take one format.' },
      },
      {
        title: { it: 'Riconcilia', en: 'Reconcile' },
        body: { it: 'Ogni riga trova il suo contratto, o un candidato.', en: 'Each row finds its contract, or a candidate.' },
      },
      {
        title: { it: 'Estratti conto', en: 'Statements' },
        body: { it: 'Un file per sub-agenzia, quote già calcolate.', en: 'One file per sub-agency, shares worked out.' },
      },
    ],
    /* Facsimile a codice: il pannello vero contiene i contratti dei clienti
     * finali, i POD/PDR e le provvigioni delle sub-agenzie, roba che non esce.
     * La schermata è la riconciliazione, cioè il punto dove il sistema fa la
     * differenza. I numeri sono di esempio e la didascalia lo dice: parlano di
     * un cliente vero. Vedi il commento su SevenPanel in caseStudyProofs.jsx. */
    proof: {
      component: 'seven',
      caption: {
        it: 'La riconciliazione di un invito a fatturare. È ricostruita con numeri di esempio, perché quella vera contiene i contratti dei clienti di Seven.',
        en: 'Reconciling one invitation to invoice. It is rebuilt with sample figures, because the real one holds Seven’s customer contracts.',
      },
    },
    quote: null,
  },
  {
    slug: 'elettra-crm',
    client: 'Elettra Group',
    logo: '/partner-elettragroup.webp',
    logoMono: true,
    url: 'https://elettragroup.it',
    year: '2026',
    symptom: {
      it: 'La stessa azienda salvata cinque volte',
      en: 'The same company saved five times',
    },
    headline: {
      it: 'Nessuna commessa resta senza fattura',
      en: 'No job goes uninvoiced any more',
    },
    about: {
      it: 'Elettra Group realizza impianti elettrici e fotovoltaici su commessa. Ogni lavoro ha il suo preventivo, i suoi acquisti dai fornitori e il suo cantiere.',
      en: 'Elettra Group builds electrical and solar installations to order. Every job has its own quote, its own supplier purchases and its own site.',
    },
    diagnosis: {
      it: 'Offerte, ordini e anagrafiche stavano su fogli Excel separati. La stessa impresa poteva comparire cinque volte: come cliente, come fornitore e una volta per ogni indirizzo di consegna. Soprattutto, nessuno sapeva quali commesse avessero già generato acquisti senza essere mai state fatturate, cioè materiale pagato per lavori che non rientravano. Anche il prezzo pagato l’ultima volta per un materiale restava sepolto nelle righe degli ordini, proprio quando serviva per trattare col fornitore.',
      en: 'Quotes, orders and contacts sat in separate spreadsheets. The same business could appear five times: as a client, as a supplier and once for every delivery address. Worse, nobody knew which jobs had already triggered purchases without ever being invoiced: material paid for on work that never came back. The price last paid for a material stayed buried in old order lines, out of reach when it was time to negotiate with the supplier.',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Impiantistica su commessa', en: 'Contract installations' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'CRM e gestionale su misura', en: 'Custom CRM and business software' },
      },
      // TODO durata: nel brief non c'è, e non si inventa. Michele la sa.
    ],
    /* Numeri della migrazione, contati sul sistema (case-studies/elettra-crm.md).
     * Manca ancora una metrica di risultato lato cliente (ore recuperate,
     * offerte salvate) perché nessuno l'ha misurata: si misura dopo un anno
     * pieno di uso. Fino ad allora `resultsNote` dice che numeri sono questi. */
    results: [
      {
        title: { it: '1.044 aziende, una scheda ciascuna', en: '1,044 companies, one record each' },
        body: { it: 'Prima erano 3.243 schede, molte doppie.', en: 'There used to be 3,243, many duplicated.' },
      },
      {
        title: { it: '8,6 milioni di offerte migrati', en: '€8.6M of quotes migrated' },
        body: { it: '723 commesse, quadrate al centesimo.', en: '723 jobs, reconciled to the cent.' },
      },
      {
        title: { it: 'Cosa fatturare, in un elenco', en: 'What to invoice, in one list' },
        body: { it: 'Nessuno deve più cercarlo negli Excel.', en: 'Nobody digs through spreadsheets for it.' },
      },
    ],
    resultsNote: {
      it: 'Numeri della migrazione, contati sul sistema. Non sono stime di risparmio.',
      en: 'Migration figures, counted on the system. They are not estimated savings.',
    },
    before: {
      it: ['Dati sparsi su più Excel', 'Acquisti scollegati dalle commesse', 'L’ultimo prezzo pagato, introvabile'],
      en: ['Data spread over several spreadsheets', 'Purchases detached from jobs', 'The last price paid, nowhere to be found'],
    },
    after: {
      it: ['Un archivio solo', 'Ogni acquisto nella sua commessa', 'Lo storico prezzi di ogni materiale'],
      en: ['One single archive', 'Every purchase inside its job', 'A price history for every material'],
    },
    steps: [
      {
        title: { it: 'Richiesta', en: 'Request' },
        body: { it: 'Arrivano le esigenze e i primi documenti.', en: 'Requirements and first documents come in.' },
      },
      {
        title: { it: 'Preventivo', en: 'Quote' },
        body: { it: 'Si prepara in fretta e resta tracciato.', en: 'Drafted quickly and kept on record.' },
      },
      {
        title: { it: 'Commessa', en: 'Job' },
        body: { it: 'Il preventivo accettato diventa commessa.', en: 'An accepted quote becomes a job.' },
      },
      {
        title: { it: 'Acquisti e fattura', en: 'Purchases and invoice' },
        body: { it: 'Gli acquisti stanno lì, la fattura parte da lì.', en: 'Purchases live there, the invoice starts there.' },
      },
    ],
    /* Il cruscotto vero. Nomi cliente, PM e utente in sidebar erano già oscurati
     * nell'export; «Ciao, Fabio» resta in chiaro di proposito, perché Fabio Greco
     * firmerà la testimonianza col link al suo profilo: nasconderlo lì e
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
      caption: {
        it: 'Il cruscotto del CRM. I nomi dei clienti sono oscurati.',
        en: 'The CRM dashboard. Client names are blurred.',
      },
    },
    // TODO testimonianza: Fabio Greco, con `authorUrl` al suo LinkedIn. Il campo
    // è pronto: servono le sue parole e il ruolo, non li scriviamo noi.
    quote: null,
  },
  {
    slug: 'industrial-service-hr',
    client: 'Industrial Service & Facility',
    logo: '/partner-industrial-service.webp',
    logoMono: true,
    url: 'https://www.industrialservicefacility.it/',
    year: '2026',
    symptom: {
      it: 'CV letti uno a uno per poi scartarli',
      en: 'CVs read one by one, then rejected',
    },
    headline: {
      it: 'In ufficio arriva solo chi ha i requisiti',
      en: 'Only qualified technicians reach HR',
    },
    about: {
      it: 'Industrial Service & Facility installa e mantiene impianti fotovoltaici, eolici ed elettrici in tutta Italia, con squadre di tecnici in trasferta e su turni.',
      en: 'Industrial Service & Facility installs and maintains solar, wind and electrical systems across Italy, with crews of technicians who travel and work shifts.',
    },
    diagnosis: {
      it: 'Per quei cantieri servono requisiti precisi: patente, patentino F-Gas, turni di notte, trasferte. Le candidature però arrivavano come CV liberi, e per sapere se un requisito c’era bisognava leggerli tutti. L’ufficio del personale passava le giornate a richiamare persone che non avevano nemmeno il primo, mentre i tecnici adatti aspettavano una risposta che spesso non arrivava. E nessuno sapeva quale annuncio portasse candidati veri e quale solo clic.',
      en: 'Those sites need specific requirements: a driving licence, F-Gas certification, night shifts, travel. Applications came in as free-form CVs, though, and the only way to check a requirement was to read every one. HR spent its days calling back people who failed the very first one, while suitable technicians waited for a reply that often never came. And nobody knew which ad brought real candidates and which brought only clicks.',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Energie rinnovabili', en: 'Renewable energy' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'Pagina candidature con punteggio', en: 'Applications page with scoring' },
      },
    ],
    /* Numeri letti dalla barra in cima alla dashboard candidature il 2026-08-06:
     * 118 totali, 79 pronti ora, 1 diamante grezzo. Sono conteggi che crescono,
     * quindi `resultsNote` porta la data: senza, invecchiano in silenzio.
     *
     * Il «diamante grezzo» è una delle quattro fasce del punteggio (pronti ora,
     * diamante grezzo, potenziale medio, non ora): alto potenziale ma poca
     * esperienza di settore. È il numero più piccolo dei tre ed è il migliore
     * da raccontare: è la persona che una lettura del CV avrebbe buttato. */
    results: [
      {
        title: { it: '118 candidature valutate', en: '118 applications assessed' },
        body: { it: 'Stesse domande e stesso punteggio per tutti.', en: 'Same questions and same score for all.' },
      },
      {
        title: { it: '79 pronti da chiamare', en: '79 ready to call' },
        body: { it: 'In ordine di punteggio, senza aprire un CV.', en: 'Sorted by score, without opening a CV.' },
      },
      {
        title: { it: '1 diamante grezzo', en: '1 rough diamond' },
        body: { it: 'Tanto potenziale, poca esperienza: col CV era fuori.', en: 'Lots of potential, little experience: a CV ruled them out.' },
      },
    ],
    resultsNote: {
      it: 'Conteggi letti sulla dashboard il 6 agosto 2026.',
      en: 'Counts read off the dashboard on 6 August 2026.',
    },
    before: {
      it: ['CV liberi, tutti diversi', 'Chiamate a chi non aveva i requisiti', 'Candidati senza risposta'],
      en: ['Free-form CVs, all different', 'Calls to people missing the requirements', 'Candidates left without a reply'],
    },
    after: {
      it: ['Le stesse domande per tutti', 'Requisiti controllati prima della chiamata', 'Una risposta a ogni candidato'],
      en: ['The same questions for everyone', 'Requirements checked before any call', 'A reply for every candidate'],
    },
    steps: [
      {
        title: { it: 'Annuncio', en: 'Job ad' },
        body: { it: 'Il candidato arriva sulla pagina.', en: 'The candidate lands on the page.' },
      },
      {
        title: { it: 'Requisiti', en: 'Requirements' },
        body: { it: 'Per prime le domande che escludono.', en: 'Knockout questions come first.' },
      },
      {
        title: { it: 'Punteggio', en: 'Score' },
        body: { it: 'Le risposte diventano un punteggio.', en: 'Answers turn into a score.' },
      },
      {
        title: { it: 'Qualificati', en: 'Qualified' },
        body: { it: 'All’ufficio arriva chi supera la soglia.', en: 'HR sees whoever clears the threshold.' },
      },
    ],
    /* La dashboard vera. Anonimizzata prima di finire in public/: nomi ed email
     * erano già sfocati nell'export, le iniziali degli avatar no, e iniziale +
     * ruolo, su un bacino di 118 persone in un settore stretto, è un aggancio
     * per risalire al candidato. Sfocate anche quelle.
     * I tre numeri in barra sono gli stessi dei risultati qui sopra: se un giorno
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
      caption: {
        it: 'La dashboard delle candidature: ogni punto è una persona, i nomi sono oscurati.',
        en: 'The applications dashboard: each dot is a person, names are blurred.',
      },
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
    // l'unico caso in pagina che si può usare davvero.
    urlLabel: { it: 'Prova la prenotazione', en: 'Try the booking page' },
    year: '2026',
    symptom: {
      it: 'Le prenotazioni su un’agenda di carta',
      en: 'Bookings in a paper diary',
    },
    headline: {
      it: 'Il tavolo per due si conferma da solo',
      en: 'A table for two confirms itself',
    },
    about: {
      it: 'Josè è il ristorante della Tenuta Villa Guerra. Lavora tutte le sere e ospita banchetti ed eventi privati che occupano l’intera sala.',
      en: 'Josè is the restaurant at Tenuta Villa Guerra. It serves every evening and hosts banquets and private events that take the whole room.',
    },
    diagnosis: {
      it: 'Le prenotazioni arrivavano al telefono e finivano su un’agenda di carta. Chi prenotava dal sito riceveva un «vi ricontattiamo» e restava in attesa. Capitava di promettere lo stesso tavolo due volte, i giorni di chiusura e gli eventi privati si passavano a voce, e una tavolata da quindici seguiva la stessa strada di una coppia, anche se va valutata prima. In più chi prenotava per la decima volta risultava sempre un cliente nuovo, perché al telefono nessuno lascia l’email.',
      en: 'Bookings came in by phone and went into a paper diary. Anyone booking on the website got a “we’ll get back to you” and was left waiting. The same table could be promised twice, closing days and private events were passed on by word of mouth, and a party of fifteen went through the same path as a couple, even though it needs checking first. And a guest booking for the tenth time always looked new, because nobody leaves an email over the phone.',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Ristorazione ed eventi', en: 'Restaurant and events' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'Prenotazioni col marchio del ristorante', en: 'Bookings under the restaurant’s brand' },
      },
    ],
    /* Nessuna cifra: da Josè non abbiamo ancora una misura, e questi tre
     * risultati dicono cosa fa il sistema. Nessuno li scambia per statistiche,
     * quindi non serve `resultsNote`. */
    results: [
      {
        title: { it: 'Un calendario solo', en: 'One calendar' },
        body: { it: 'Sito, telefono e chiusure nello stesso posto.', en: 'Website, phone and closures in one place.' },
      },
      {
        title: { it: 'Conferma subito i tavoli piccoli', en: 'Small tables confirmed at once' },
        body: { it: 'Le tavolate grandi le decide il ristoratore.', en: 'The owner decides on large parties.' },
      },
      {
        title: { it: 'Chi torna viene riconosciuto', en: 'Returning guests are recognised' },
        body: { it: 'Basta il numero di telefono.', en: 'The phone number is enough.' },
      },
    ],
    before: {
      it: ['Agenda di carta', '«Vi ricontattiamo»', 'Tavolata da quindici trattata come una coppia'],
      en: ['A paper diary', '“We’ll get back to you”', 'A party of fifteen treated like a couple'],
    },
    after: {
      it: ['Un calendario per sito e telefono', 'Esito immediato sotto soglia', 'Le tavolate grandi passano dal ristoratore'],
      en: ['One calendar for website and phone', 'An instant answer below the threshold', 'Large parties go to the owner'],
    },
    steps: [
      {
        title: { it: 'Richiesta', en: 'Request' },
        body: { it: 'Data, ora e coperti dal sito.', en: 'Date, time and covers from the site.' },
      },
      {
        title: { it: 'Regole', en: 'Rules' },
        body: { it: 'Il sistema controlla giorno e numero di coperti.', en: 'The system checks the day and party size.' },
      },
      {
        title: { it: 'Esito', en: 'Outcome' },
        body: { it: 'Conferma subito o mette in attesa.', en: 'Confirmed at once, or held for the owner.' },
      },
      {
        title: { it: 'Calendario', en: 'Calendar' },
        body: { it: 'Sito e telefono finiscono nello stesso posto.', en: 'Website and phone end up in one place.' },
      },
    ],
    /* Il pannello del gestore. Nomi, telefono ed email degli ospiti erano già
     * oscurati nell'export; le note («allergia ai crostacei», «due bambini
     * piccoli») restano in chiaro perché senza il nome non sono attribuibili a
     * nessuno, e sono la ragione visibile per cui certe richieste devono
     * passare dal ristoratore invece di confermarsi da sole. */
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
      caption: {
        it: 'A sinistra le richieste che aspettano il ristoratore, a destra il calendario del mese con chiusure ed eventi privati.',
        en: 'Left, the requests waiting for the owner. Right, the month calendar with closures and private events.',
      },
    },
    quote: null,
  },
  {
    slug: 'tharvel-admin-siti',
    client: 'Tharvel',
    logo: '/tharvel-logo.webp',
    // Inchiostro scuro su trasparente, non bianco come i partner-*.webp: sui
    // capitoli chiari si legge da solo, su quelli scuri va invertito.
    logoMono: false,
    logoDark: true,
    url: null,
    year: '2026',
    symptom: {
      it: 'Ogni modifica al sito passava da noi',
      en: 'Every change to the site went through us',
    },
    headline: {
      it: 'Il cliente cambia il sito scrivendo in chat',
      en: 'Clients edit their site in a chat',
    },
    about: {
      it: 'Tharvel è un prodotto nostro. È il pannello con cui i clienti dei siti che costruiamo li modificano da soli.',
      en: 'Tharvel is our own product: the panel that lets the clients whose sites we build edit them themselves.',
    },
    diagnosis: {
      it: 'Un sito scritto a mano è veloce e non si rompe. Però quando il cliente vuole cambiare un prezzo o una foto deve scriverci, e due minuti di lavoro diventano una mail, un’attesa e una fattura. Di solito l’alternativa è WordPress con un page builder: il cliente lo gestisce da solo, ma si porta dietro plugin in conflitto, aggiornamenti che bloccano il sito e pagine lente. E molti clienti smettono di toccarlo per paura di romperlo, così il sito invecchia.',
      en: 'A hand-coded site is fast and does not break. But when the client wants to change a price or a photo they have to write to us, and two minutes of work become an email, a wait and an invoice. The usual alternative is WordPress with a page builder: the client runs it alone, but gets clashing plugins, updates that take the site down and slow pages. And many clients stop touching it for fear of breaking it, so the site goes stale.',
    },
    meta: [
      {
        label: { it: 'Settore', en: 'Industry' },
        value: { it: 'Gestione dei siti dei clienti', en: 'Client website management' },
      },
      {
        label: { it: 'Sistema', en: 'System' },
        value: { it: 'Pannello AI per più siti', en: 'AI panel for many sites' },
      },
    ],
    results: [
      {
        title: { it: 'Modifiche chieste a parole', en: 'Changes asked for in words' },
        body: { it: 'Senza WordPress e senza page builder.', en: 'No WordPress, no page builder.' },
      },
      {
        title: { it: 'Anteprima prima di pubblicare', en: 'Preview before publishing' },
        body: { it: 'Il sito online cambia quando lo decidi tu.', en: 'The live site changes when you say so.' },
      },
      {
        title: { it: 'Un pannello per tutti i siti', en: 'One panel for every site' },
        body: { it: 'Nel codice dei clienti non entra una riga.', en: 'Not a line goes into client code.' },
      },
    ],
    before: {
      it: ['Ogni modifica passa da noi', 'Paura di rompere qualcosa', 'Il sito resta fermo e invecchia'],
      en: ['Every change goes through us', 'Fear of breaking something', 'The site stands still and ages'],
    },
    after: {
      it: ['Il cliente modifica da solo', 'Ogni versione si può ripristinare', 'Il sito si aggiorna quando serve'],
      en: ['The client edits it alone', 'Every version can be restored', 'The site changes when it needs to'],
    },
    steps: [
      {
        title: { it: 'Chiedi', en: 'Ask' },
        body: { it: 'Scrivi in chat, o Alt+clic su un elemento.', en: 'Type in the chat, or Alt+click an element.' },
      },
      {
        title: { it: 'Anteprima', en: 'Preview' },
        body: { it: 'Il sito modificato compare accanto alla chat.', en: 'The edited site appears next to the chat.' },
      },
      {
        title: { it: 'Pubblica', en: 'Publish' },
        body: { it: 'Solo adesso cambia il sito online.', en: 'Only now does the live site change.' },
      },
      {
        title: { it: 'Torna indietro', en: 'Roll back' },
        body: { it: 'Ogni versione resta recuperabile.', en: 'Every version stays recoverable.' },
      },
    ],
    // L'interfaccia è il prodotto, quindi un facsimile a codice dice più di uno
    // screenshot (caseStudyProofs.jsx). Nessuna postilla «dati di esempio»: è
    // roba nostra e non parla di un cliente.
    proof: {
      component: 'tharvel',
      caption: {
        it: 'Il pannello: i siti a sinistra, l’anteprima al centro, la chat a destra.',
        en: 'The panel: sites on the left, preview in the middle, chat on the right.',
      },
    },
    quote: null,
  },
]
