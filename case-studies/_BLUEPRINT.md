# I blueprint dei case study

Ogni caso di `/casestudy` porta un **blueprint**: il diagramma che mostra la forma
del sistema a colpo d'occhio, al posto delle metriche di risultato che dai clienti
non abbiamo.

**Sono disegnati a codice**, in `src/pages/caseStudyBlueprints.jsx`, e associati allo
slug del caso in fondo a quel file. Prima erano immagini generate con AI: le abbiamo
buttate il 2026-08-06 perché erano semplici diagrammi di flusso, e a codice vengono
meglio — si adattano al fondo chiaro o scuro della sezione, restano nitidi a ogni
zoom, si leggono da telefono e si correggono con una modifica invece di essere
rigenerati, ritagliati e riconvertiti.

## Aggiungere il blueprint di un caso nuovo

1. Scrivi un componente in `caseStudyBlueprints.jsx` usando i mattoni già lì —
   `Flow`, `Node`, `Hex`, `Side`, `Branch`, `Notes` — e mettilo nella mappa
   `BLUEPRINTS` con lo slug del caso.
2. In `caseStudiesData.js`, aggiungi `blueprint.caption`: **non** descrive il
   disegno, dice la cosa che il disegno non riesce a mostrare (la regola, la
   condizione, il perché).

Un caso senza voce in `BLUEPRINTS` semplicemente non mostra nessun diagramma: la
sezione resta valida e si regge sul testo. Non serve un segnaposto.

## Le due regole che è facile sbagliare

**Le opacità fuori lista spariscono sul bianco.** Le sezioni si alternano chiare e
scure, e l'inversione funziona solo per le utility ridefinite in `index.css`:
`text-white/40 /50 /60 /65 /70 /75 /80`, `border-white/5 /10`,
`bg-white/5 /[0.03] /[0.04] /[0.05] /[0.06] /[0.07]`. Un `text-white/45` resta bianco
fisso e sul fondo chiaro è invisibile.

**Quello che non è sul percorso non va messo in mezzo al percorso.** Uno scarto, un
ingresso laterale o un avviso messi in colonna fra due tappe si prendono la freccia
del passo successivo, e si leggono come se il flusso passasse di lì — «scartato →
prosegue», «ordine al fornitore → fatturata», cioè il contrario di quello che
succede. Per questo esiste `<Side>`: accosta l'elemento a un lato e lascia dritta la
linea principale.
