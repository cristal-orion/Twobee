# Seven — gestionale degli inviti a fatturare (Adamo)

```
slug:        seven-inviti-fatturare
cliente:     Seven
settore:     Energia e telco, vendita indiretta tramite rete di agenzie
anno:        2026            ← DA CONFERMARE
categorie:   gestionali, ai, automazioni
sito:        https://www.sevenholding.it/
```

## Da dove viene questo testo

Scritto il 2026-08-07 leggendo `~/Desktop/Adamo` — le note del back office, la
valutazione di fattibilità e la specifica tecnica — più il sito pubblico di Seven
e quello che Michele ha raccontato a voce.

Il processo raccontato in `diagnosis` **non è dedotto**: viene dalle registrazioni
dell'addetta al back office trascritte in `Linee guida generale.txt`. Ogni pezzo ha
la sua fonte: la ventina di brand, le diciture diverse fra un brand e l'altro
(«bolletta web» / «Full Digital»), il CERCA.VERT, le righe non incrociate, le tre
cause vere (refuso nel codice, PDR sbagliato, contratto mai caricato in Eva), lo
scorporo in gettone base + RID + bolletta web, gare e promo che restano
all'agenzia, l'Excel filtrato costruito a mano per ogni sub-agenzia, e la
dipendenza da una persona sola.

## ⚠️ Da verificare prima che il link giri

**Il materiale su questa macchina descrive un prototipo e un preventivo, non un
sistema consegnato.** In `~/Desktop/Adamo` ci sono un prototipo Streamlit
(`app.py`, marzo 2026), una specifica tecnica con le fasi ancora da fare
(«Fase 1 – MVP»), una valutazione di fattibilità che si chiude con «Partiamo», e
`Preventivo_Twobee_Seven_CRM_Adamo.pdf` del 30 aprile 2026. Niente di più recente.

Michele ha detto che il sistema è in uso e che oggi un invito si chiude in pochi
minuti. Se è così va bene, ma **da nessuna parte qui risulta**, e la pagina lo
afferma con nome e logo di Seven sopra. Prima di mandare il link a qualcuno:

- Adamo è in produzione da Seven, o è ancora il prototipo?
- «Una settimana per fornitore → pochi minuti»: chi l'ha misurato, e su cosa?
  Le note del back office dicono solo che ~10 righe non incrociate costano ~30
  minuti, per brand. Il resto è di Michele.
- Consenso di Seven a comparire come cliente con nome, logo e link.

## metriche

Solo il confronto prima/dopo, che è quello che Michele ha riferito. Non ci sono
conteggi letti su un sistema, come per Elettra e Industrial: `resultsNote` in
pagina dice che il confronto è sul ciclo mensile di un singolo fornitore, senza
attribuire la misura a nessuno. Quando si sa chi l'ha misurata, la nota lo dice.

## la prova

Facsimile a codice (`SevenPanel` in `src/pages/caseStudyProofs.jsx`), non uno
screenshot: il pannello vero contiene contratti di clienti finali, POD/PDR e
provvigioni delle sub-agenzie. La schermata scelta è la **riconciliazione**, che è
dove il sistema fa la differenza — 33 righe su 1.284 non agganciano e si
presentano da sole col match più probabile, invece di essere cercate a mano per
nome del cliente.

I colori vengono dal prototipo vero (`app.py`: indaco #667eea, verde, ambra). I
numeri sono di esempio ma **quadrano fra loro**: 142.900 + 18.640 + 12.180 +
10.600 = 184.320, meno gare e promo che restano all'agenzia = 173.720 alle
sub-agenzie. Se li tocchi, rifai la somma: chi fa questo lavoro tutti i giorni se
ne accorge.

## citazione

Nessuna. Sarebbe forte: il back office che dice cosa faceva prima.

## TODO

- Rispondere alle tre domande qui sopra.
- Anno di realizzazione.
- Citazione dell'addetta al back office o del titolare.
