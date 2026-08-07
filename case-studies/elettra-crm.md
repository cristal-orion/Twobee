# Elettra Group — CRM su commessa

Bozza scritta leggendo il repo `Elettragroup/elettra-crm` e le 10 note di memoria
di quel progetto. Nessun contatto col cliente: i punti marcati TODO li sai solo tu.

```
slug:        elettra-crm
cliente:     Elettra Group
settore:     TODO confermare — dai dati sembra impiantistica / lavori su commessa
anno:        2026
categorie:   crm, ai, integrazioni
sito:        https://elettragroup.it
```

## headline

Preventivi, ordini ai fornitori e cantieri in un unico sistema che dice subito
quali lavori sono stati comprati e mai fatturati.

## sfida

Offerte, ordini e anagrafiche vivevano su fogli Excel separati, e la stessa
azienda compariva con tre codici diversi a seconda che fosse cliente, fornitore o
destinazione di consegna: la stessa partita IVA arrivava a ripetersi fino a cinque
volte. Il risultato era il "punto d'ombra" che pesa di più su chi lavora su
commessa: materiale acquistato per un lavoro che poi nessuno fattura. Nessuno
sapeva dire, in un colpo d'occhio, quali commesse avevano già generato acquisti e
non erano ancora state fatturate — né a quanto era stato pagato l'ultima volta un
materiale, perché lo storico prezzi era sepolto nelle righe degli ordini.

## costruito

- Anagrafica unica a doppia natura cliente/fornitore: i codici C/F/D della stessa
  azienda uniti in un solo record, invece di tre schede da tenere allineate a mano.
- Ciclo di vita della commessa come macchina a stati (lead → preventivo → inviata
  → follow-up → ordine confermato → esecuzione → consuntivo → fatturata), con
  numerazione automatica.
- Regola bloccante preventivo→consuntivo: appena una commessa ha un ordine a
  fornitore collegato passa a consuntivo e resta nell'alert "da fatturare" finché
  non viene fatturata. È il presidio contro il punto d'ombra.
- Storico prezzi dei materiali ricavato dalle righe d'ordine reali — minimo, medio,
  massimo e ultimo prezzo al netto dello sconto — così chi compra sa a quanto ha
  pagato l'ultima volta prima di trattare.
- Catalogo materiali che si compila da solo: carichi la scheda tecnica in PDF,
  l'AI estrae marca, categoria e dati tecnici, il PDF resta allegato.
- Archivio documenti per commessa, con accesso e download filtrati per ruolo.
- Statistiche direzionali: tasso di conversione sulle offerte decise, giorni di
  attesa di quelle ancora aperte, ordini acquisiti mese per mese, e la stessa
  lettura per singolo cliente.
- Sezione cantieri con avanzamento calcolato dalle milestone completate e squadre
  di operai assegnate.
- Assistente interno che risponde sui dati del CRM rispettando i permessi di chi
  chiede, e compila una scheda anagrafica partendo dalla visura.

## stack

Next.js, Prisma, SQLite, Docker, Coolify, Gemini, SheetJS

## metriche

Sono fatti della migrazione, verificabili sul sistema — non stime di risparmio.

- 1.044 — aziende consolidate da 3.243 record duplicati
- 723 — commesse storiche importate
- 8,6 M€ — di offerte storiche migrate
- al centesimo — quadratura fra i totali dell'Excel e quelli importati

## citazione

Nessuna. Se la vuoi, va chiesta a Elettra.

## pubblicabile

**Sì — Michele ha confermato il consenso di Elettra il 2026-08-05.** Il caso è in
pagina su `/casestudy#elettra-crm`, primo della lista. La pagina è online ma fuori
dall'indice (`noindex`, vedi `NOINDEX_PATHS` in `src/App.jsx`): si condivide via
link, non la si trova cercando.

Nota su come è finito in pagina (2026-08-06): la sezione è stata rifatta come scheda
a due colonne, vedi `_STRUTTURA.md`. Il diagramma di flusso non c'è più — è diventato
il blocco «Come funziona» a quattro tappe — e i numeri qui sotto stanno in «Risultati
chiave», tre schede in cima alla colonna di destra: 1.044 aziende, 8,6 M€ di offerte
(con dentro le 723 commesse e la quadratura), e la commessa da fatturare sempre
visibile. Sotto c'è la riga che dichiara cosa sono: fatti della migrazione contati sul
sistema, non stime di risparmio. Era l'etichetta che mancava il 2026-08-05, quando le
metriche erano state tolte perché nude si leggevano come risultati del cliente.

Manca «La prova»: serve uno screenshot della dashboard **con dati finti**, mai quelli
veri.

## TODO

- Metrica di risultato lato cliente (ore risparmiate, offerte recuperate): oggi non
  esiste da nessuna parte, va misurata dopo che il CRM è in uso reale. Quando c'è,
  è il pezzo che manca davvero a questo caso.
- Screenshot utilizzabili, se un giorno servono: con dati finti o oscurati, mai
  con quelli veri.
- Citazione: non c'è, va chiesta a Elettra.
