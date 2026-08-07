# La scheda di un case study

Sostituisce `_BLUEPRINT.md` (2026-08-06). Prima ogni caso era un paragrafo «Il
problema», un elenco «Cosa abbiamo costruito» e un diagramma di flusso disegnato a
codice: 350 parole che non leggeva nessuno. Adesso ogni caso è una **scheda a due
colonne**, sul modello mandato da Marco.

```
┌───────────────┬──────────────────────────────────────────┐
│ CHI È         │ 1. Risultati chiave   3 schede con icona │
│ headline      │ 2. Prima → Dopo       3 voci per lato    │
│ settore/sist. │ 3. Come funziona      4 tappe numerate   │
│ CTA gialla    │ 4. La prova           una schermata      │
│ link al sito  │ 5. Citazione + CTA                       │
└───────────────┴──────────────────────────────────────────┘
```

I contenuti stanno in `src/pages/caseStudiesData.js` (c'è un TEMPLATE da copiare in
testa al file). Il layout sta in `src/pages/CaseStudies.jsx` e **non va toccato** per
aggiungere un progetto.

## Le lunghezze non sono un suggerimento

Sono la forma del blocco: sforarle non allunga il testo, rompe la griglia.

| campo | tetto |
|---|---|
| `headline` | 10-14 parole. Da cosa a cosa. |
| `results[].title` | 2-5 parole |
| `results[].body` | una riga, max 8 parole |
| `before` / `after` | 2-4 parole a voce. Sono etichette, non frasi. |
| `steps[].title` | 1-2 parole |
| `steps[].body` | una riga, max 7 parole |

Il testo lungo di ogni caso resta nei brief qui accanto (`elettra-crm.md`,
`tharvel-admin-siti.md`, …): è da lì che si pesca per una proposta commerciale, non
dalla pagina.

## I numeri

1. In `results` un numero ci va **solo se è verificabile sul sistema o confermato
   per iscritto dal cliente**. Niente stime di risparmio.
2. Valori inventati → `resultsDraft: true`. In pagina compaiono il badge «numeri di
   esempio» e le schede tratteggiate, e nessuna scheda si accende. Il flag si toglie
   **insieme** ai valori finti, mai da solo: questa pagina gira come link nelle
   proposte, e un numero inventato sotto il logo di un cliente vero si legge come
   vero — sia dal prospect sia dal cliente stesso.
3. Se ci sono cifre, `resultsNote` dice che tipo di numeri sono (fatti della
   migrazione? risultati misurati?). Una scheda senza cifre non ha bisogno di nota:
   dice cosa fa il sistema e nessuno la scambia per una statistica.

Stato al 2026-08-06: Elettra ha numeri veri (migrazione), Industrial ha segnaposto
marcati, gli altri quattro hanno schede qualitative.

## «La prova»

Due modi, decisi caso per caso:

- `proof: { images: [{ src, alt, width, height }, …] }` — screenshot o immagini
  generate, i file in `public/`. Una sola occupa tutta la colonna, **due vanno
  affiancate da `lg`**: se il pannello è alto e stretto, spezzalo in due schermate
  invece di allargarne una sola — a tutta colonna verrebbe o minuscola o tagliata
  male (è il caso di Josè: richieste da confermare + calendario). **Dichiara sempre
  width e height**: senza, l'immagine non tiene il posto e il deep link a un'ancora
  più in basso finisce fuori bersaglio.
- `proof: { component: 'tharvel' }` — un facsimile disegnato a codice, per quando
  l'interfaccia È il prodotto. Registrato in `src/pages/caseStudyProofs.jsx`.

Un caso senza `proof` non mostra il blocco. **Non mettere segnaposto** tipo
«schermata in arrivo»: un buco dichiarato è peggio di un blocco in meno.

C'è anche `proof.caption`, ma di norma **non si usa**. Sotto il pannello di un
prodotto nostro una postilla «dati di esempio» suona come una scusa, e nessuna
pagina SaaS la mette: un mockup di prodotto con dati illustrativi è la norma, e
nessun numero è attribuito a un terzo. La didascalia serve solo nel caso opposto —
numeri che parlano di un cliente vero e non sono i suoi.

Sugli screenshot: mai dati veri di un cliente, mai indirizzi email veri. Dati finti o
oscurati.

## Le due regole di colore che è facile sbagliare

**Le opacità fuori lista spariscono sul bianco.** Le sezioni si alternano chiare e
scure, e l'inversione funziona solo per le utility ridefinite in `index.css`:
`text-white/40 /50 /60 /65 /70 /75 /80`, `border-white/5 /10`,
`bg-white/[0.03…0.07]`. Un valore fuori lista resta bianco fisso e sul bianco non si
vede.

**Il giallo non si usa mai come colore del testo.** `#FFC501` su bianco sta a 1,6:1 e
sparisce a qualunque dimensione, numeri grandi compresi. Si usa `.text-accent`,
`.bg-accent`, `.border-accent`, che leggono `--theme-accent`: giallo pieno sulle
sezioni scure, oro scuro (`#8F6D00`, 4,8:1) su quelle chiare. Il giallo pieno come
**sfondo** con testo nero sopra invece va bene ovunque, ed è il modo per dire «qui si
clicca».

## Le icone

Stanno in `src/pages/caseStudyIcons.jsx`, si citano per nome (`icon: 'clock'`). Un
nome sbagliato non disegna niente e non rompe la pagina — controlla `ICON_NAMES`
prima di inventarne uno. Se ne aggiungi una, disegnala nella stessa griglia delle
altre: viewBox 24, `strokeWidth` 1.7, estremi tondi.
