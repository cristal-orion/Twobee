# SofIA — centralino e agenda automatici

Scheda ricavata da `~/Desktop/Progetti/Sofia` (landing Astro), da prontosofia.it e
dagli appunti Gemini della call "Affinity Sofia x TwoBee" del 2026-05-26.

```
slug:        sofia-centralino-ai
cliente:     SofIA
settore:     Centralino e agenda automatici
anno:        2026
categorie:   ai, automazioni, web
sito:        https://prontosofia.it
```

## come è raccontato in pagina

Su indicazione di Michele (2026-08-05) il caso è scritto **come lavoro TwoBee, senza
nominare Affinity**: SofIA è presentata come il sistema che offriamo alle aziende per
gestire telefonate e calendari in automatico.

Da sapere, perché è verificabile da fuori: il footer di prontosofia.it e le sue policy
dicono "Un prodotto Affinity Lab" e riportano Affinity Srl, P.IVA 06221050658. Chi
apre il link dal case study legge quel footer. In `public/` del sito TwoBee c'è già
`partner-affinity.webp`, usato nel marquee dei partner in home. Se in futuro serve
allineare le due cose, la leva è il campo `client` e le prime righe di `challenge`.

Quello che risulta dai documenti come lavoro TwoBee sul progetto: riposizionamento da
"centralino" ad assistente aziendale, identità visiva senza cliché robotici e
accessibile a chi ha poca dimestichezza col digitale, struttura del sito a quattro
pilastri (Telefono · Chat · WhatsApp · Agenda), landing verticali per nicchia e A/B
test per capire quale settore risponde. L'assistente in sé non è stato costruito da
noi.

## il prodotto, per il case study

Quattro canali, un assistente: telefono, chat del sito, WhatsApp, agenda.

Settori dichiarati sulla landing: studi medici e dentistici, studi legali, centri
estetici, saloni e parrucchieri, centri benessere, palestre, ristoranti, hotel,
autosaloni e concessionarie, officine.

Integrazioni dichiarate: Google Calendar, WhatsApp Business, email, sito web.

Sulla landing c'è un widget di prova reale (Ultravox WebRTC, portato da affinitylab):
si scelgono settore e scenario, arriva la chiamata, 3 minuti gratis. È l'elemento più
convincente della pagina e nel case study è l'ultimo punto di `costruito`.

C'è anche un calcolatore del fatturato perso per le chiamate non risposte — **non**
citato nel case study: è una stima, e la regola è non pubblicare numeri che il cliente
non confermerebbe.

## metriche

Nessuna, come per tutti gli altri casi. Non esistono numeri di risultato lato cliente.

## pubblicabile

Sì, così com'è scritto — decisione di Michele. Nessun nome di azienda cliente in
pagina, quindi non serve il consenso di nessuno.

## TODO

- Blueprint da generare → `public/case-sofia-centralino-ai.webp`, prompt n. 4 in
  `_BLUEPRINT-PROMPTS.md`.
- Logo: in pagina non c'è (`logo: null`). Il wordmark SofIA ha "Sof" in inchiostro
  scuro e "IA" in corallo: sulla sezione scura la prima metà sparirebbe. Se lo
  vogliamo, serve una variante chiara — non basta `logoMono`, che inverte tutto.
- Una citazione di un'attività che lo usa: è la cosa che manca di più a questo caso.
