# Mr. Hatter — gestionale per produzione e vendita B2B

```
slug:        mrhatter-gestionale
cliente:     Mr. Hatter
settore:     Cappelli artigianali, vendita ai negozi
anno:        2026            ← DA CONFERMARE
categorie:   gestionali
sito:        https://www.mrhatter.it/
blueprint:   nessuno, per scelta di Michele
```

## ⚠️ Da dove viene questo testo

**Il progetto non è su questa macchina.** La scheda è scritta il 2026-08-06 da quello
che Michele ha raccontato a voce, più il sito pubblico. Quello che lui ha detto è:
gestionale per un'industria di cappelli artigianali che vende B2B ai negozi, per
gestire **ordini, merce, produzione, evasione, consegne**.

Le sei righe di `costruito` in pagina stanno esattamente su quelle cinque aree e non
un passo oltre. **Il testo del problema è invece una ricostruzione**: nessuno ha
raccontato come lavoravano prima, è dedotto da come funziona un laboratorio che
produce a mano e vende ai rivenditori. Va letto da Michele prima di considerarlo
verificato — se il cliente lo legge, deve riconoscersi.

Dal sito: azienda napoletana di via Marvasi 18, circa 130 anni e quattro generazioni,
cappelli fatti a mano, "HandMade in Italy", guidata da Salvatore Marciano e Vincenzo
Marcellino. Il sito parla di sé come interlocutore per partner commerciali
strutturati, il che conferma il B2B.

## Cosa manca per rendere questo caso forte come gli altri

Gli altri casi hanno 7-9 punti specifici perché sono scritti leggendo il codice. Qui
i punti sono generici, e servono i dettagli che rendono il sistema riconoscibile:

- **La produzione**: si segue per fasi (taglio, forma, finitura…) o solo "in
  lavorazione / fatto"? Ci sono lavorazioni esterne?
- **Le varianti**: taglie, colori, tessuti — come sono gestite su un ordine? È la cosa
  che di solito fa esplodere i gestionali della moda.
- **Il magazzino**: solo prodotti finiti o anche materie prime e semilavorati?
- **I documenti**: DDT, fatture, listini per negozio, sconti per rivenditore?
- **Chi lo usa e da dove**: solo l'ufficio o anche il laboratorio? Su telefono?
- **Cosa ha sostituito**: Excel, carta, un gestionale vecchio?
- Anno di realizzazione, e consenso di Mr. Hatter a essere citata.

## metriche

Nessuna, come per tutti gli altri casi.

## pubblicabile

Da confermare con Michele: il caso è in pagina, ma il testo del problema è una sua
ricostruzione da rileggere, e il consenso del cliente a essere nominato non risulta
chiesto.

## TODO

- Rileggere `challenge` e correggerlo con quello che è successo davvero.
- Riempire i punti dell'elenco qui sopra, poi riscrivere `build` con i dettagli veri.
- Consenso di Mr. Hatter a comparire come cliente.
- Logo: non c'è in `public/`. Il caso cade su sezione scura, quindi serve un logo che
  si legga sul nero (o `logoMono: true` se è monocromatico scuro).
- Una citazione del titolare: sarebbe la prima del sito.
