# Tharvel — admin panel per i siti dei clienti

Scheda ricavata dal repo `~/Desktop/Progetti/Tharvel`: `README.md`,
`progetto-tharvel.md` e la cronologia dei commit.

```
slug:        tharvel-admin-siti
cliente:     Tharvel
settore:     Gestione dei siti dei clienti
anno:        2026
categorie:   ai, web, gestionali
sito:        nessuno (prodotto interno, non c'è una pagina pubblica)
```

## che cos'è

Admin panel universale e self-hosted per siti **già esistenti**. Rende modificabile via
chat AI un sito HTML, Astro, Next o Vue senza ricostruirlo e senza WordPress. Il cuore
è Pi Agent (SDK TypeScript) con tool nostri per upload immagini, generazione immagini
AI e file manager.

Il flusso è git-native: l'agente lavora su un ramo `preview`, fa un commit per turno
riuscito, e il push su `main` avviene solo quando il cliente premе "Pubblica" → webhook
Coolify → rebuild. È questo il punto che rende il pannello non pericoloso, ed è il
cuore del blueprint.

Architettura: un solo container sulla nostra VPS serve tutti i siti, routing per
tenant via Host header o `?site=<slug>`, tabella `sites` su SQLite. Nei repo dei
clienti non entra codice Tharvel.

## stato reale (verificato il 2026-08-05)

Il README di maggio elencava TODO bloccanti per il primo deploy; da allora il progetto
è andato avanti — ultimo commit **2026-07-15** — e il bloccante principale è risolto
(`SERVER_BASE` ora è env-driven con fallback su `window.location.origin`). I commit
recenti sono lavoro di rifinitura su cose reali: onboarding con https e alias www,
anteprima delle sottopagine Astro, allegati di chat separati dagli asset, inserimento
manuale del modello con test di connessione.

**Quello che NON possiamo dire**, e che in pagina non c'è: che sia in uso presso
clienti paganti, che sia in beta pubblica, o quanti siti gestisce. Restano aperti i
punti della beta privata (sandbox dell'agente, identity/JWT, backup automatici via
restic, un restore drill mai eseguito). Il case study è scritto al presente sul
funzionamento del sistema, non sull'adozione.

## metriche

Nessuna. Non ci sono numeri pubblicabili: quelli che esistono sono di sviluppo, non di
risultato per un cliente.

## pubblicabile

Sì come descrizione di un sistema nostro che funziona. Attenzione a due domande
prevedibili in call: «lo posso vedere?» (non c'è una demo pubblica né un URL) e «chi lo
usa?» (nessuno di cui possiamo parlare). Se una delle due diventa scomoda, questo caso
si toglie dall'array in un secondo.

## TODO

- Blueprint da generare → `public/case-tharvel-admin-siti.webp`, prompt n. 5 in
  `_BLUEPRINT-PROMPTS.md`.
- Decidere se serve una demo mostrabile, o uno screenshot del pannello con un sito
  finto, prima di portare questo caso in una call commerciale.
- Logo: ci sono `Tharvel/logo1:1.png` e `logoesteso.png`, non ancora portati in
  `public/`. In pagina il caso cade su sezione chiara, quindi serve un logo che si
  legga sul bianco.
