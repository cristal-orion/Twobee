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
 * l'abbiamo risolto. Ogni caso porta invece un **blueprint**: un diagramma che
 * mostra il sistema a colpo d'occhio, disegnato a codice in
 * ./caseStudyBlueprints.jsx e associato lì allo slug del caso.
 *
 * Regole di compilazione:
 * - `slug`: diventa l'ancora della sezione (/casestudy#slug) e finisce nei link
 *   che mandiamo in giro → una volta pubblicato NON si cambia più.
 * - `categories`: chiavi di CATEGORIES. Guidano i filtri in cima alla pagina:
 *   una categoria compare come chip solo se almeno un progetto la usa.
 * - `logo`: file in public/. `logoMono: true` se il logo è monocromatico (i
 *   partner-*.webp sono bianchi pieni): serve a invertirlo sulle sezioni chiare,
 *   dove altrimenti sparisce. Logo a colori → `logoMono: false`.
 * - `blueprint.caption`: la riga sotto il diagramma. NON descrive il disegno —
 *   quello si vede — ma dice la cosa che il disegno non riesce a mostrare: la
 *   regola, la condizione, il perché. Il diagramma vero e proprio è un componente
 *   in ./caseStudyBlueprints.jsx, associato allo slug: un caso senza voce lì non
 *   mostra nessun blueprint e si regge sul testo, senza rompersi.
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
 *   blueprint: {
 *     caption: { it: 'La regola che il disegno non mostra.', en: '…' },
 *   },                                         // + un componente in caseStudyBlueprints.jsx
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
    blueprint: {
      caption: {
        it: 'Appena una commessa ha un ordine a fornitore collegato resta segnata «da fatturare»: l’avviso si spegne soltanto quando la fattura parte.',
        en: 'As soon as a job has a supplier order attached it stays flagged “to invoice”: the alert switches off only when the invoice goes out.',
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
    blueprint: {
      caption: {
        it: 'Chi non ha un requisito obbligatorio esce subito, e con una risposta. In ufficio arrivano solo i profili sopra la soglia, già ordinati per punteggio.',
        en: 'Whoever lacks a mandatory requirement is out at once, and with a reply. Only the profiles above the threshold reach the office, already sorted by score.',
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
    blueprint: {
      caption: {
        it: 'Sala libera e tavolo piccolo si confermano da soli; oltre la soglia la richiesta aspetta il ristoratore. In tutti e due i casi finisce nello stesso calendario.',
        en: 'A free room and a small table confirm themselves; past the threshold the request waits for the owner. Either way it lands in the same calendar.',
      },
    },
  },
  {
    slug: 'sofia-centralino-ai',
    client: 'SofIA',
    logo: null,
    logoMono: false,
    url: 'https://prontosofia.it',
    year: '2026',
    sector: { it: 'Centralino e agenda automatici', en: 'Automated phone and calendar' },
    categories: ['ai', 'automazioni', 'web'],
    headline: {
      it: 'Il telefono non squilla più a vuoto: risponde, capisce cosa serve e mette l’appuntamento in agenda — anche di notte, anche mentre sei con un cliente.',
      en: 'The phone never rings out: it answers, works out what’s needed and puts the appointment in the diary — at night too, and while you’re with a customer.',
    },
    challenge: {
      it: 'Ci sono attività che vivono di telefonate: studi dentistici, centri estetici, palestre, ristoranti, concessionarie. Il telefono suona mentre sei con un cliente, nessuno risponde, e chi chiamava passa al nome successivo dell’elenco — una chiamata persa non lascia traccia da nessuna parte, non è un numero in un report, è solo un incasso che non è arrivato. Chi riesce a rispondere scrive l’appuntamento su un’agenda di carta, e a fine giornata nessuno sa quante chiamate sono arrivate né cosa chiedevano. Una persona in segreteria copre gli orari d’ufficio: non le sere, non i fine settimana, che sono le ore in cui la gente chiama.',
      en: 'Some businesses live on the phone: dental practices, beauty salons, gyms, restaurants, car dealers. It rings while you’re with a customer, nobody picks up, and the caller moves on to the next name on their list — a missed call leaves no trace anywhere, it isn’t a figure in a report, it’s simply money that never arrived. Whoever does answer writes the appointment in a paper diary, and by the end of the day nobody knows how many calls came in or what they were about. A receptionist covers office hours: not the evenings and weekends when people actually call.',
    },
    build: {
      it: [
        'Risponde al telefono con voce naturale, a qualsiasi ora e in più lingue: chiede cosa serve, propone gli orari liberi e chiude l’appuntamento senza mettere in attesa.',
        'Lo stesso assistente sulla chat del sito e su WhatsApp, addestrato sui dati dell’attività: chi scrive la sera trova risposta e prenota lì, senza aspettare l’apertura.',
        'Un’agenda sola: gli appuntamenti presi al telefono, in chat e a mano finiscono nello stesso calendario, sincronizzato con Google Calendar.',
        'I promemoria automatici su WhatsApp prima dell’appuntamento, per i posti che restano vuoti solo perché qualcuno se n’è dimenticato.',
        'Una configurazione per settore: servizi, durate, prezzi, orari e regole cambiano da uno studio dentistico a un concessionario a un ristorante.',
        'Un pannello che a fine giornata dice quante chiamate sono arrivate, quante sono diventate appuntamenti e cosa chiedevano — cioè quali domande tornano abbastanza spesso da meritare una risposta pronta.',
        'Si collega a quello che l’attività già usa: Google Calendar, WhatsApp Business, la posta, il sito.',
        'Una prova vera al telefono prima di decidere: si scelgono settore e scenario, arriva la chiamata e si sente com’è.',
      ],
      en: [
        'It answers the phone in a natural voice, at any hour and in several languages: it asks what’s needed, offers the free slots and books the appointment without putting anyone on hold.',
        'The same assistant on the website chat and on WhatsApp, trained on the business’s own data: someone writing in the evening gets an answer and books there, without waiting for opening time.',
        'One diary only: appointments taken by phone, in chat and by hand all land in the same calendar, synced with Google Calendar.',
        'Automatic WhatsApp reminders before the appointment, for the slots that stay empty only because somebody forgot.',
        'A per-sector configuration: services, durations, prices, hours and rules change from a dental practice to a car dealer to a restaurant.',
        'A panel that tells you at the end of the day how many calls came in, how many became appointments and what they were about — which questions come up often enough to deserve a ready answer.',
        'It plugs into what the business already uses: Google Calendar, WhatsApp Business, email, the website.',
        'A real phone trial before deciding: pick a sector and a scenario, take the call and hear it for yourself.',
      ],
    },
    quote: null,
    blueprint: {
      caption: {
        it: 'Telefono, chat e WhatsApp arrivano allo stesso assistente e finiscono nella stessa agenda: chi chiama alle nove di sera trova risposta come alle nove di mattina.',
        en: 'Phone, chat and WhatsApp reach the same assistant and end up in the same diary: whoever calls at nine in the evening is answered just as at nine in the morning.',
      },
    },
  },
  {
    slug: 'tharvel-admin-siti',
    client: 'Tharvel',
    logo: '/tharvel-logo.webp',
    // Logo scuro su trasparente, non bianco come i partner-*.webp: su questa
    // sezione chiara si legge da solo e NON va invertito. Attenzione se un
    // giorno l'ordine dell'array sposta il caso su una sezione scura: lì
    // sparirebbe, e `logoMono` non aiuta perché inverte, non schiarisce.
    logoMono: false,
    url: null,
    year: '2026',
    sector: { it: 'Gestione dei siti dei clienti', en: 'Client website management' },
    categories: ['ai', 'web', 'gestionali'],
    headline: {
      it: 'Il cliente cambia testi e foto del suo sito parlando in chat, vede subito il risultato e pubblica quando è convinto — senza WordPress e senza passare da noi.',
      en: 'The client changes their site’s text and photos by chatting, sees the result at once and publishes when they’re happy — no WordPress, and without going through us.',
    },
    challenge: {
      it: 'Un sito fatto a mano è veloce e non si rompe, ma il giorno in cui il cliente vuole cambiare un prezzo o sostituire una foto deve chiederlo a noi: un lavoro da due minuti diventa una mail, una coda e una fattura per nulla. La risposta abituale del mercato è costruirlo in WordPress con un page builder, così se lo gestisce da solo — e allora arrivano i plugin che litigano, gli aggiornamenti che mandano giù il sito e un sito lento da mantenere per sempre. Nel frattempo il cliente, per paura di rompere qualcosa, non lo tocca: il sito si congela e invecchia.',
      en: 'A hand-built site is fast and doesn’t break, but the day the client wants to change a price or swap a photo they have to ask us: a two-minute job turns into an email, a queue and an invoice for nothing. The market’s usual answer is to build it in WordPress with a page builder so they can manage it themselves — and then come the plugins that clash, the updates that take the site down and a slow site to maintain forever. Meanwhile the client, afraid of breaking something, never touches it: the site freezes and ages.',
    },
    build: {
      it: [
        'Un pannello che si apre sul dominio del cliente e non richiede di ricostruire niente: funziona sul sito che c’è già, sia HTML statico sia Astro, Next o Vue.',
        'Le modifiche si chiedono a parole, in chat: «cambia il prezzo del menù di degustazione», «metti questa foto in home».',
        'Alt+click sull’elemento da cambiare, per quando descriverlo a parole è più lento che indicarlo.',
        'L’anteprima dal vivo accanto alla chat: il sito modificato si vede prima che sia online.',
        'Pubblicazione solo su comando: le modifiche restano su un ramo di lavoro e “Pubblica” è l’unico momento in cui il sito vero cambia — quindi non si rompe per sbaglio, e si torna indietro sempre.',
        'Le immagini si caricano e vengono ridimensionate da sé; se la foto non c’è, la genera l’AI.',
        'Un solo servizio sulla nostra VPS serve tutti i siti: nei repo dei clienti non entra una riga di Tharvel.',
        'Un sito nuovo entra con un comando: clona, riconosce da sé il framework, builda e lo registra.',
      ],
      en: [
        'A panel that opens on the client’s own domain and requires rebuilding nothing: it works on the site that already exists, whether static HTML or Astro, Next or Vue.',
        'Changes are asked for in plain words, in a chat: “change the tasting menu price”, “put this photo on the home page”.',
        'Alt+click on the element to change, for when pointing at it beats describing it.',
        'A live preview next to the chat: the edited site is visible before it goes online.',
        'Publishing only on command: changes sit on a working branch and “Publish” is the only moment the real site changes — so it can’t break by accident, and there’s always a way back.',
        'Images are uploaded and resized on their own; when the photo doesn’t exist, AI generates it.',
        'One service on our VPS serves every site: not a line of Tharvel enters the clients’ repositories.',
        'A new site joins with a single command: it clones, detects the framework itself, builds and registers it.',
      ],
    },
    quote: null,
    blueprint: {
      caption: {
        it: 'Finché il cliente non preme «Pubblica» le modifiche restano sul ramo di lavoro: il sito online non cambia, e non si può rompere per sbaglio.',
        en: 'Until the client hits “Publish” the changes stay on the working branch: the live site does not change, and cannot break by accident.',
      },
    },
  },
]
