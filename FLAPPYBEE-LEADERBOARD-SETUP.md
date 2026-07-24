# Classifica Flappy Twobee — setup Google Apps Script

La classifica di `/flappybee` usa un Google Sheet come "database" gratuito, letto/scritto
tramite un Google Apps Script deployato come Web App. Nessun costo, nessun nuovo servizio
da pagare — solo un account Google.

## 1. Crea il foglio

1. Crea un nuovo Google Sheet (es. "Flappybee Leaderboard").
2. Estensioni → Apps Script.
3. Cancella il contenuto di `Code.gs` e incolla questo:

```javascript
const SHEET_NAME = 'Leaderboard'
const MAX_SCORE = 999
const MAX_NICKNAME_LEN = 24
const TOP_N = 10

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(['Timestamp', 'Nickname', 'Score', 'Source', 'PainKey'])
  }
  return sheet
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

function doGet(e) {
  const rows = getSheet_().getDataRange().getValues().slice(1) // salta l'header
  const entries = rows
    .map((r) => ({ nickname: String(r[1] || ''), score: Number(r[2]) || 0 }))
    .filter((row) => row.nickname && row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_N)
  return jsonOutput_({ ok: true, entries })
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)
    const nickname = String(body.nickname || '').trim().slice(0, MAX_NICKNAME_LEN)
    const score = Math.max(0, Math.min(MAX_SCORE, Math.round(Number(body.score) || 0)))
    const source = String(body.source || '').slice(0, 20)
    const painKey = String(body.painKey || '').slice(0, 40)
    if (!nickname || score <= 0) {
      return jsonOutput_({ ok: false, error: 'invalid_payload' })
    }
    getSheet_().appendRow([new Date(), nickname, score, source, painKey])
    return jsonOutput_({ ok: true })
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err) })
  }
}
```

4. Salva (icona 💾 o Ctrl+S).

## 2. Deploy come Web App

1. In alto a destra: **Deploy → Nuovo deployment**.
2. Icona ⚙️ accanto a "Seleziona tipo" → **Web app**.
3. Configura:
   - **Esegui come**: Me (il tuo account)
   - **Chi ha accesso**: Chiunque (anche senza login Google) — necessario perché il
     sito è pubblico e chiama questo URL dal browser dei visitatori.
4. **Deploy** → autorizza i permessi richiesti (è il tuo script, su un tuo foglio).
5. Copia l'**URL web app** che termina in `/exec`.

## 3. Collega il sito

Apri `src/lib/leaderboard.js` e incolla l'URL copiato in:

```javascript
const LEADERBOARD_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXXXX/exec'
```

Finché questa costante resta vuota (`''`), il sito funziona comunque: la sezione
classifica mostra "in arrivo" e il widget per iscriversi resta nascosto — nessun
errore in console.

## Note

- **Anti-spam leggero, non vera sicurezza**: chiunque conosca l'URL può inviare
  richieste POST dirette (bypassando gioco/form). Lo script limita punteggio
  (max 999) e lunghezza nickname, ma non c'è validazione crittografica — coerente
  con lo scopo (hype interno/demo), non adatto a una classifica con premio in palio.
- **Se serve un redeploy** dopo aver modificato `Code.gs` (es. per alzare `MAX_SCORE`):
  Deploy → Gestisci deployment → ✏️ sulla versione attiva → Versione: Nuova → Deploy.
  L'URL resta lo stesso, non serve toccare `leaderboard.js`.
- I punteggi si accumulano per sempre nel foglio; per "resettare" la classifica basta
  cancellare le righe sotto l'header nel foglio `Leaderboard`.
