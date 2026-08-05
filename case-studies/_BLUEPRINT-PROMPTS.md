# Blueprint da generare — prompt pronti da incollare

Ogni case study di `/casestudy` porta un **blueprint**: un diagramma che mostra il
sistema a colpo d'occhio, al posto delle metriche di risultato che dai clienti non
abbiamo. Finché il file non è in `public/`, in pagina compare un segnaposto
tratteggiato che mostra il brief — quindi il buco si vede, ma non rompe niente.

**Questo file è l'unico posto dove stanno i prompt.** Non sono nel codice per una
ragione precisa: tutto ciò che entra in `caseStudiesData.js` finisce nel bundle
JavaScript servito ai visitatori, e da quando `/casestudy` è linkata nel footer ci
arriva chiunque — un cliente non deve poter leggere le istruzioni con cui abbiamo
generato i diagrammi. Nella data resta solo `media.src` (il file atteso) e `media.alt`
(descrizione leggibile, usata per l'accessibilità).

In sviluppo, se un file manca, in pagina compare un segnaposto tratteggiato con
l'`alt` e il nome del file: serve a ricordare cosa resta da fare. In produzione quel
segnaposto non c'è — online il caso si regge sul testo e il buco non si vede.

## Come devono venire

- **Formato orizzontale largo**, 16:9 o 2:1. Tutti e tre i flussi sono scritti per
  svilupparsi da sinistra a destra: in pagina l'immagine occupa tutta la larghezza
  della colonna, quindi un diagramma verticale diventa altissimo.
- **Fondo nero `#0B0B0C` per tutti e tre.** Due delle tre sezioni hanno il fondo
  bianco (Elettra e Josè), quindi lì il blueprint si legge come un pannello scuro
  incorniciato — è voluto. Non generarne uno su fondo bianco per far pari con la
  sezione: l'ordine dei casi nell'array decide quali sezioni sono chiare, e appena
  riordini i casi le immagini non tornerebbero più.
- **Controlla ogni etichetta prima di salvare.** I generatori storpiano il testo, e
  qui il testo è tutto il contenuto: un nodo scritto "FATURATA" manda all'aria il
  diagramma. Se il generatore non tiene le etichette italiane pulite dopo due o tre
  tentativi, meglio cambiare strada e farli a mano in SVG.
- Risoluzione: almeno 1600 px di lato lungo (l'immagine è servita a piena larghezza
  e va bene anche su schermi retina).

## Come si mettono in pagina

Salva il PNG dove vuoi, poi convertilo col nome esatto che la pagina si aspetta:

```bash
node -e "require('sharp')('IN.png').webp({quality:88}).toFile('public/case-elettra-crm.webp')"
```

I tre nomi attesi, da rispettare alla lettera:

| Caso | File |
|---|---|
| Elettra Group | `public/case-elettra-crm.webp` ✅ |
| Industrial Service & Facility | `public/case-industrial-service-hr.webp` ✅ |
| Josè Restaurant | `public/case-jose-prenotazioni.webp` ✅ |
| SofIA | `public/case-sofia-centralino-ai.webp` — **da fare** |
| Tharvel | `public/case-tharvel-admin-siti.webp` — **da fare** |

Le immagini generate escono con molto fondo nero vuoto (Elettra era al 52%, Industrial
al 40%): a piena larghezza diventano fasce altissime mezze vuote. Si ritagliano così,
dopo aver messo l'originale al sicuro altrove:

```bash
node -e "
const sharp=require('sharp');
sharp('ORIGINALE.webp').trim({threshold:12})
  .extend({top:48,bottom:48,left:48,right:48,background:{r:0,g:0,b:0}})
  .webp({quality:90}).toFile('public/case-NOME.webp');
"
```

Appena il file esiste il segnaposto sparisce da sé: il rilevamento è sull'`onError`
dell'`<img>`, non serve toccare il codice.

---

## 1 · Elettra Group → `public/case-elettra-crm.webp`

> Diagramma di flusso orizzontale del ciclo di una commessa, cinque nodi in fila:
> "Preventivo" → "Offerta inviata" → "Ordine confermato" → "Cantiere" →
> "Fatturata". Dal basso un nodo separato "Ordine al fornitore" si innesta con una
> freccia sul nodo "Cantiere" e accende un badge esagonale giallo pieno con scritta
> nera "DA FATTURARE", collegato con linea tratteggiata al nodo "Fatturata" — il
> badge si spegne solo lì. A destra, staccati, due riquadri piccoli: "Una scheda per
> azienda: cliente e fornitore" e "Storico prezzi materiali". Stile: diagramma di
> flusso piatto e minimale, fondo nero #0B0B0C, accenti giallo #FFC501, testo
> bianco, font geometrico bold tipo League Spartan, riquadri smussati ed esagoni,
> frecce sottili. Niente 3D, ombre, gradienti o icone di stock. Etichette in
> italiano, poche parole per nodo.

## 2 · Industrial Service & Facility → `public/case-industrial-service-hr.webp`

> Diagramma di flusso orizzontale del percorso di una candidatura, da sinistra a
> destra: "Annuncio" → "Pagina candidature" → "Scelta del profilo" (tre rami
> paralleli ravvicinati etichettati Manutentore / Frigorista / Coordinatore, che si
> ricongiungono subito) → bivio esagonale "Requisiti obbligatori" → "Domande con
> punteggio" → bivio esagonale "Soglia di qualifica" → riquadro finale giallo pieno
> con testo nero "Avviso all'ufficio del personale — candidati ordinati per
> punteggio". I due scarti scendono verso il basso, in grigio spento e con freccia
> tratteggiata: dal primo bivio "Fuori, con risposta cortese", dal secondo "Archivio
> + risposta d'attesa". Il percorso principale resta su un'unica linea orizzontale
> in giallo. Stile: diagramma di flusso piatto e minimale, fondo nero #0B0B0C,
> accenti giallo #FFC501, testo bianco, font geometrico bold tipo League Spartan,
> riquadri smussati ed esagoni, frecce sottili. Niente 3D, ombre, gradienti o icone
> di stock. Etichette in italiano, poche parole per nodo.

## 3 · Josè Restaurant → `public/case-jose-prenotazioni.webp`

> Diagramma di flusso con due ingressi in alto: "Prenotazione dal sito" e
> "Prenotazione al telefono", che convergono su un blocco esagonale centrale "Regole
> del ristoratore" con tre condizioni elencate dentro: "giorno libero", "coperti
> sotto la soglia", "tavolata oltre 10". Dal blocco escono due frecce: a destra
> "Confermata subito" (riquadro giallo pieno, testo nero, segno di spunta) e a
> sinistra "In attesa del ristoratore" (riquadro con solo bordo giallo). Entrambe
> finiscono in un nodo in basso "Calendario del locale", accanto al quale ci sono due
> riquadri piccoli: "Giorni chiusi ed eventi privati" e "Cliente riconosciuto dal
> telefono". Dal nodo "Confermata subito" parte anche una freccia verso un'icona
> busta etichettata "Email all'ospite". Stile: diagramma di flusso piatto e
> minimale, fondo nero #0B0B0C, accenti giallo #FFC501, testo bianco, font
> geometrico bold tipo League Spartan, riquadri smussati ed esagoni, frecce sottili.
> Niente 3D, ombre, gradienti o icone di stock. Etichette in italiano, poche parole
> per nodo.

## 4 · SofIA → `public/case-sofia-centralino-ai.webp`

> Diagramma di flusso orizzontale del percorso di una chiamata, da sinistra a destra.
> A sinistra tre ingressi impilati che convergono su un unico nodo: "Telefono che
> squilla", "Chat del sito", "WhatsApp". Il nodo centrale è un esagono giallo pieno
> con testo nero "SofIA risponde", e sotto, in piccolo, "24 ore, più lingue". Da lì
> il flusso continua: "Capisce cosa serve" → "Propone gli orari liberi" → riquadro
> giallo pieno con testo nero "Appuntamento in agenda". Da quest'ultimo escono due
> frecce sottili verso destra: una a un riquadro "Promemoria su WhatsApp" e una a un
> riquadro "Sincronizzato con Google Calendar". In basso, staccato e collegato al
> nodo centrale con linea tratteggiata, un riquadro largo "Pannello di fine giornata:
> chiamate ricevute, appuntamenti presi, cosa chiedevano". Stile: diagramma di flusso
> piatto e minimale, fondo nero #0B0B0C, accenti giallo #FFC501, testo bianco, font
> geometrico bold tipo League Spartan, riquadri smussati ed esagoni, frecce sottili.
> Niente 3D, ombre, gradienti o icone di stock. Etichette in italiano, poche parole
> per nodo.

## 5 · Tharvel → `public/case-tharvel-admin-siti.webp`

> Diagramma di flusso orizzontale di una modifica al sito, da sinistra a destra:
> riquadro "Il cliente scrive in chat" con sotto, più piccolo, il testo fra
> virgolette «cambia il prezzo del menù» → esagono giallo pieno con testo nero
> "Tharvel" → riquadro "Ramo di lavoro" con accanto, collegato da una freccia corta,
> un riquadro "Anteprima dal vivo". Da "Anteprima dal vivo" partono due frecce: una
> torna indietro verso la chat, curva e tratteggiata, etichettata "non va bene"; una
> continua a destra verso un esagono giallo pieno con testo nero "PUBBLICA", che
> porta al riquadro finale "Sito online aggiornato". Sotto il nodo "Tharvel", tre
> riquadrini staccati collegati con linea tratteggiata: "Alt+click sull'elemento",
> "Immagini ridimensionate da sé", "Un solo servizio per tutti i siti". Il ramo di
> lavoro e il sito online devono leggersi come due binari distinti. Stile: diagramma
> di flusso piatto e minimale, fondo nero #0B0B0C, accenti giallo #FFC501, testo
> bianco, font geometrico bold tipo League Spartan, riquadri smussati ed esagoni,
> frecce sottili. Niente 3D, ombre, gradienti o icone di stock. Etichette in
> italiano, poche parole per nodo.
