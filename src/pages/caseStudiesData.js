/* DATI DEI CASE STUDY (/casestudy)
 * ---------------------------------
 * Un oggetto = un progetto = una sezione della pagina. Il layout sta in
 * CaseStudies.jsx e non va toccato per aggiungere un lavoro: si copia il
 * TEMPLATE qui sotto, si riempie e si mette nell'array.
 *
 * L'ORDINE DELL'ARRAY È L'ORDINE IN PAGINA. Va tenuto per forza, non per data:
 * il caso più convincente in cima, perché è l'unico che leggono tutti.
 *
 * Cosa NON c'è, per scelta (2026-08-05): niente metriche e niente stack
 * tecnologico. I numeri di risultato non li abbiamo dai clienti e non si
 * inventano; lo stack non vende — al lettore interessa il problema e come
 * l'abbiamo risolto. Ogni caso porta invece un **blueprint**: un diagramma
 * generato che mostra il sistema a colpo d'occhio.
 *
 * Regole di compilazione:
 * - `slug`: diventa l'ancora della sezione (/casestudy#slug) e finisce nei link
 *   che mandiamo in giro → una volta pubblicato NON si cambia più.
 * - `categories`: chiavi di CATEGORIES. Guidano i filtri in cima alla pagina:
 *   una categoria compare come chip solo se almeno un progetto la usa.
 * - `logo`: file in public/. `logoMono: true` se il logo è monocromatico (i
 *   partner-*.webp sono bianchi pieni): serve a invertirlo sulle sezioni chiare,
 *   dove altrimenti sparisce. Logo a colori → `logoMono: false`.
 * - `media`: il blueprint. `src` è il file atteso in public/ (anche se non
 *   esiste ancora), `alt` il testo per l'accessibilità, `brief` la descrizione
 *   del diagramma da dare all'AI che lo genera. Finché il file manca, in pagina
 *   compare un segnaposto che mostra il `brief` — così non si perde.
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
 *   sector: { it: 'Settore', en: 'Industry' },
 *   categories: ['crm', 'automazioni'],
 *   headline: { it: 'Una riga: cosa è cambiato.', en: 'One line: what changed.' },
 *   challenge: { it: 'Il problema di partenza.', en: 'The starting problem.' },
 *   build: {
 *     it: ['Cosa abbiamo costruito, un punto per pezzo del sistema.'],
 *     en: ['What we built, one bullet per piece of the system.'],
 *   },
 *   quote: {
 *     text: { it: 'Parole del cliente.', en: 'Client’s words.' },
 *     author: 'Nome Cognome',
 *     role: { it: 'Titolare', en: 'Owner' },
 *   },                                         // oppure null
 *   media: {
 *     src: '/case-nome-cliente.webp',
 *     alt: { it: 'Diagramma: …', en: 'Diagram: …' },
 *     brief: { it: 'Cosa deve mostrare il diagramma.', en: '…' },
 *   },
 * }
 * -------------------------------------------------------------------------- */

/* Stile comune dei blueprint, da ripetere in coda a ogni brief per l'AI:
 * fondo nero #0B0B0C, accenti giallo #FFC501, testo bianco, font geometrico
 * bold (League Spartan), riquadri con angoli smussati o esagoni, tratti sottili,
 * frecce semplici. Diagramma piatto, nessun 3D, nessuna ombra, nessuna icona
 * generica di stock. Etichette in italiano, poche parole per nodo. */
const BLUEPRINT_STYLE =
  'Stile: diagramma di flusso piatto e minimale, fondo nero #0B0B0C, accenti giallo #FFC501, testo bianco, font geometrico bold tipo League Spartan, riquadri smussati ed esagoni, frecce sottili. Niente 3D, ombre, gradienti o icone di stock. Etichette in italiano, poche parole per nodo.'

export const CASES = [
  {
    slug: 'elettra-crm',
    client: 'Elettra Group',
    logo: '/partner-elettragroup.webp',
    logoMono: true,
    url: 'https://elettragroup.it',
    year: '2026',
    sector: { it: 'Impiantistica su commessa', en: 'Contract installations' },
    categories: ['crm', 'gestionali', 'ai'],
    headline: {
      it: 'Preventivi, ordini ai fornitori e cantieri in un unico sistema, che dice subito quali lavori sono stati comprati e mai fatturati.',
      en: 'Quotes, supplier orders and job sites in one system that immediately shows which jobs were bought for and never invoiced.',
    },
    challenge: {
      it: 'Offerte, ordini e anagrafiche vivevano su fogli Excel separati, e la stessa azienda compariva con tre codici diversi a seconda che fosse cliente, fornitore o luogo di consegna: la stessa partita IVA arrivava a ripetersi cinque volte. Da qui nasceva il buco che pesa di più su chi lavora su commessa: materiale acquistato per un lavoro che poi nessuno fattura. Nessuno sapeva dire, in un colpo d’occhio, quali commesse avessero già generato acquisti e non fossero ancora state fatturate. E il prezzo pagato l’ultima volta per un materiale era sepolto nelle righe degli ordini, irrecuperabile prima di trattare col fornitore.',
      en: 'Quotes, orders and contacts lived in separate Excel files, and the same company appeared under three different codes depending on whether it was a client, a supplier or a delivery site: the same VAT number could repeat five times. That created the gap that hurts contract businesses most: material bought for a job nobody ever invoices. No one could tell at a glance which jobs had already generated purchases and had not been invoiced yet. And the price last paid for a material was buried in order lines, out of reach right when it was time to negotiate.',
    },
    build: {
      it: [
        'Una sola scheda per azienda, valida sia come cliente sia come fornitore: i tre codici della stessa impresa uniti in un record, invece di tre anagrafiche da tenere allineate a mano.',
        'Il ciclo di vita della commessa come un percorso a stati — dalla richiesta al preventivo, all’ordine, al cantiere, al consuntivo, alla fattura — con numerazione automatica.',
        'Il presidio contro il buco: appena una commessa ha un ordine a fornitore collegato, passa a consuntivo e resta nell’elenco “da fatturare” finché non viene fatturata.',
        'Lo storico prezzi dei materiali ricavato dagli ordini reali — minimo, medio, massimo e ultimo prezzo al netto dello sconto — così chi compra sa a quanto ha pagato prima di trattare.',
        'Il catalogo materiali che si compila da sé: si carica la scheda tecnica in PDF, l’AI estrae marca, categoria e dati tecnici, il PDF resta allegato.',
        'I documenti di ogni commessa in un unico archivio, con accesso e download filtrati per ruolo.',
        'Le statistiche che servono a chi decide: quante offerte si trasformano in ordini, da quanti giorni sono in attesa quelle aperte, quanto è entrato mese per mese, e la stessa lettura per singolo cliente.',
        'I cantieri con l’avanzamento calcolato dalle tappe completate e le squadre assegnate.',
        'Un assistente interno che risponde sui dati del CRM rispettando i permessi di chi chiede, e compila una scheda cliente partendo dalla visura.',
      ],
      en: [
        'One record per company, valid as both client and supplier: the three codes of the same business merged into one, instead of three contact cards to keep in sync by hand.',
        'The job lifecycle as a path of states — request, quote, order, site work, final accounting, invoice — with automatic numbering.',
        'The safeguard against the gap: as soon as a job has a linked supplier order, it moves to final accounting and stays on the “to invoice” list until it is invoiced.',
        'Material price history derived from real orders — lowest, average, highest and latest price net of discount — so whoever buys knows what they paid before negotiating.',
        'A material catalogue that fills itself in: upload the technical datasheet as a PDF, AI extracts brand, category and specs, the PDF stays attached.',
        'Every job’s documents in one archive, with access and downloads filtered by role.',
        'The figures decision-makers need: how many quotes turn into orders, how long open ones have been waiting, what came in month by month, and the same view per client.',
        'Job sites with progress calculated from completed milestones and assigned crews.',
        'An internal assistant that answers questions on the CRM data respecting each user’s permissions, and fills in a client record from the company registry extract.',
      ],
    },
    quote: null,
    media: {
      src: '/case-elettra-crm.webp',
      alt: {
        it: 'Diagramma del ciclo di vita di una commessa in Elettra CRM: dal preventivo alla fattura, con l’avviso “da fatturare” che si accende quando arriva un ordine a fornitore.',
        en: 'Diagram of a job’s lifecycle in Elettra CRM: from quote to invoice, with the “to invoice” alert triggered by an incoming supplier order.',
      },
      brief: {
        it: `Diagramma di flusso orizzontale del ciclo di una commessa, cinque nodi in fila: "Preventivo" → "Offerta inviata" → "Ordine confermato" → "Cantiere" → "Fatturata". Dal basso un nodo separato "Ordine al fornitore" si innesta con una freccia sul nodo "Cantiere" e accende un badge esagonale giallo pieno con scritta nera "DA FATTURARE", collegato con linea tratteggiata al nodo "Fatturata" — il badge si spegne solo lì. A destra, staccati, due riquadri piccoli: "Una scheda per azienda: cliente e fornitore" e "Storico prezzi materiali". ${BLUEPRINT_STYLE}`,
        en: `Horizontal flow of a job’s lifecycle, five nodes in a row: quote → sent offer → confirmed order → job site → invoiced. A separate node "supplier order" joins the job-site node and lights a solid yellow hexagonal badge reading "TO INVOICE", dashed-linked to the invoiced node where it switches off. Two small side boxes: one record per company, material price history. ${BLUEPRINT_STYLE}`,
      },
    },
  },
  {
    slug: 'industrial-service-hr',
    client: 'Industrial Service & Facility',
    logo: '/partner-industrial-service.webp',
    logoMono: true,
    url: 'https://www.industrialservicefacility.it/',
    year: '2026',
    sector: { it: 'Energie rinnovabili', en: 'Renewable energy' },
    categories: ['automazioni', 'gestionali', 'web'],
    headline: {
      it: 'Le candidature si filtrano da sole: in ufficio arrivano solo i profili che hanno davvero i requisiti obbligatori.',
      en: 'Applications filter themselves: only the profiles that genuinely meet the mandatory requirements reach the office.',
    },
    challenge: {
      it: 'Un’azienda che monta fotovoltaico, eolico e impianti elettrici assume tecnici con requisiti non negoziabili: patente B, patentino F-Gas, disponibilità ai turni di notte o alle trasferte. Le candidature però arrivavano come CV generici, tutti uguali da leggere, e il tempo dell’ufficio del personale finiva in colloqui con persone che al primo requisito erano già fuori. Nessun modo di sapere quali annunci portassero candidati veri, né di rispondere a tutti in tempi decenti.',
      en: 'A company installing solar, wind and electrical systems hires technicians with non-negotiable requirements: driving licence, F-Gas certification, availability for night shifts or travel. Applications arrived as generic CVs, all alike to read, and HR time went into interviews with people who failed on the very first requirement. No way to tell which ads brought real candidates, or to reply to everyone in reasonable time.',
    },
    build: {
      it: [
        'Una pagina dedicata alle candidature, sul dominio dell’azienda e coerente col sito, dove il candidato non compila un modulo ma risponde a una domanda per schermata.',
        'Le domande eliminatorie prima di tutto: se manca un requisito obbligatorio il percorso si chiude subito con un messaggio cortese, senza far perdere tempo a nessuno dei due.',
        'Un percorso diverso per ogni profilo cercato — manutentore, tecnico frigorista, coordinatore — con i requisiti che contano per quel ruolo.',
        'Un punteggio automatico costruito sulle risposte: sopra la soglia il candidato è qualificato, sotto finisce in archivio con una risposta d’attesa invece del silenzio.',
        'L’ufficio del personale avvisato solo sui profili qualificati, che arrivano già ordinati per punteggio e pronti da richiamare.',
        'Una dashboard per aprire, chiudere e modificare le posizioni senza passare da noi.',
        'Il collegamento con le campagne pubblicitarie: ogni candidatura completata è un evento tracciato, così si sa quale annuncio porta tecnici e quale solo clic.',
      ],
      en: [
        'A dedicated applications page on the company’s own domain, consistent with the main site, where candidates answer one question per screen instead of filling in a form.',
        'Knockout questions first: if a mandatory requirement is missing, the path closes right away with a courteous message, wasting neither side’s time.',
        'A different path per role — maintenance technician, refrigeration technician, coordinator — with the requirements that matter for that job.',
        'An automatic score built from the answers: above the threshold the candidate is qualified, below it they land in an archive with a holding reply instead of silence.',
        'HR notified only about qualified profiles, already sorted by score and ready to call back.',
        'A dashboard to open, close and edit positions without going through us.',
        'A link back to the ad campaigns: every completed application is a tracked event, so it is clear which ad brings technicians and which only brings clicks.',
      ],
    },
    quote: null,
    media: {
      src: '/case-industrial-service-hr.webp',
      alt: {
        it: 'Diagramma del percorso di una candidatura: dall’annuncio alle domande eliminatorie, al punteggio, fino all’avviso all’ufficio del personale.',
        en: 'Diagram of an application’s path: from the ad through knockout questions and scoring to the HR alert.',
      },
      brief: {
        it: `Diagramma di flusso orizzontale del percorso di una candidatura, da sinistra a destra: "Annuncio" → "Pagina candidature" → "Scelta del profilo" (tre rami paralleli ravvicinati etichettati Manutentore / Frigorista / Coordinatore, che si ricongiungono subito) → bivio esagonale "Requisiti obbligatori" → "Domande con punteggio" → bivio esagonale "Soglia di qualifica" → riquadro finale giallo pieno con testo nero "Avviso all'ufficio del personale — candidati ordinati per punteggio". I due scarti scendono verso il basso, in grigio spento e con freccia tratteggiata: dal primo bivio "Fuori, con risposta cortese", dal secondo "Archivio + risposta d'attesa". Il percorso principale resta su un'unica linea orizzontale in giallo. ${BLUEPRINT_STYLE}`,
        en: `Left-to-right horizontal flow of an application: ad → applications page → role choice (three tight parallel branches that rejoin at once) → hexagonal fork on mandatory requirements → scored questions → hexagonal fork on the qualification threshold → final solid-yellow box with black text: HR alert, candidates sorted by score. The two rejections drop downward in grey with dashed arrows: courteous rejection from the first fork, archive plus holding reply from the second. The main path stays on a single horizontal yellow line. ${BLUEPRINT_STYLE}`,
      },
    },
  },
  {
    slug: 'jose-prenotazioni',
    client: 'Josè Restaurant',
    logo: null,
    logoMono: false,
    url: 'https://prenota.tenutavillaguerra.it',
    year: '2026',
    sector: { it: 'Ristorazione ed eventi', en: 'Restaurant and events' },
    categories: ['automazioni', 'gestionali', 'web'],
    headline: {
      it: 'Le prenotazioni facili si confermano da sole, quelle che vanno pensate restano in mano al ristoratore.',
      en: 'The easy bookings confirm themselves; the ones that need thinking about stay in the owner’s hands.',
    },
    challenge: {
      it: 'Le prenotazioni arrivavano al telefono e finivano su un’agenda di carta. Chi prenotava dal sito riceveva un “vi ricontattiamo”, e nel frattempo lo stesso tavolo poteva essere promesso due volte. Una tavolata da quindici persone e una coppia venivano trattate allo stesso modo, anche se la prima va valutata e la seconda no. I giorni di chiusura e gli eventi privati vivevano a voce, e il cliente che prenotava per la decima volta era un nome nuovo ogni volta, perché al telefono l’email non la lascia nessuno.',
      en: 'Bookings came in by phone and ended up in a paper diary. Whoever booked from the website got a “we’ll get back to you”, and meanwhile the same table could be promised twice. A party of fifteen and a couple were handled the same way, even though the first needs judgement and the second doesn’t. Closing days and private events lived by word of mouth, and the customer booking for the tenth time was a new name every time, because nobody leaves an email over the phone.',
    },
    build: {
      it: [
        'Una pagina di prenotazione col marchio del ristorante, dove l’ospite scelga data, orario e numero di persone e sappia subito com’è andata.',
        'Le regole di conferma decise dal ristoratore: sala vuota si conferma da sé, oltre un certo numero di coperti la richiesta resta da approvare, e le tavolate grandi passano sempre da lui.',
        'Un calendario del gestore con i giorni di chiusura e gli eventi privati in evidenza e il riposo settimanale sempre visibile: chi prenota online quei giorni non li vede nemmeno.',
        'Le prenotazioni prese al telefono inserite nello stesso calendario, così il quadro della serata è uno solo.',
        'Il cliente riconosciuto dal numero di telefono, non dall’email: chi torna è già in anagrafica, con le sue prenotazioni passate.',
        'L’email di conferma all’ospite in automatico, dal dominio del ristorante.',
        'Un motore white-label: il marchio, gli orari e le regole stanno in un file di configurazione, quindi lo stesso sistema si accende per un altro locale in poche ore.',
      ],
      en: [
        'A booking page in the restaurant’s own brand, where guests pick date, time and party size and immediately know where they stand.',
        'Confirmation rules set by the owner: an empty room confirms itself, past a certain number of covers the request waits for approval, and large parties always go through them.',
        'A manager’s calendar with closing days and private events highlighted and the weekly day off always visible: online guests never even see those dates.',
        'Phone bookings entered into the same calendar, so the evening has a single source of truth.',
        'Guests recognised by phone number rather than email: returning customers are already on file, with their past bookings.',
        'Automatic confirmation emails to the guest, sent from the restaurant’s domain.',
        'A white-label engine: brand, opening hours and rules live in a configuration file, so the same system can be switched on for another venue in hours.',
      ],
    },
    quote: null,
    media: {
      src: '/case-jose-prenotazioni.webp',
      alt: {
        it: 'Diagramma delle regole di conferma di una prenotazione: dalla richiesta online o telefonica alla conferma automatica o all’approvazione del ristoratore.',
        en: 'Diagram of the booking confirmation rules: from an online or phone request to automatic confirmation or owner approval.',
      },
      brief: {
        it: `Diagramma di flusso con due ingressi in alto: "Prenotazione dal sito" e "Prenotazione al telefono", che convergono su un blocco esagonale centrale "Regole del ristoratore" con tre condizioni elencate dentro: "giorno libero", "coperti sotto la soglia", "tavolata oltre 10". Dal blocco escono due frecce: a destra "Confermata subito" (riquadro giallo pieno, testo nero, segno di spunta) e a sinistra "In attesa del ristoratore" (riquadro con solo bordo giallo). Entrambe finiscono in un nodo in basso "Calendario del locale", accanto al quale ci sono due riquadri piccoli: "Giorni chiusi ed eventi privati" e "Cliente riconosciuto dal telefono". Dal nodo "Confermata subito" parte anche una freccia verso un'icona busta etichettata "Email all'ospite". ${BLUEPRINT_STYLE}`,
        en: `Flow with two entry points at the top — website booking and phone booking — converging on a central hexagonal block "owner’s rules" listing three conditions: free day, covers below threshold, party over ten. Two arrows leave it: "confirmed instantly" (solid yellow box with a check) and "waiting for the owner" (outlined box). Both end in a "venue calendar" node, beside two small boxes: closed days and private events, guest recognised by phone. An envelope labelled "email to the guest" branches off the instant-confirmation node. ${BLUEPRINT_STYLE}`,
      },
    },
  },
]
