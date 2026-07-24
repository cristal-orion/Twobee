/* Classifica pubblica di Flappy Twobee (/flappybee). Backend: Google Apps Script
 * Web App che legge/scrive su un Google Sheet — vedi FLAPPYBEE-LEADERBOARD-SETUP.md
 * per il codice da deployare e per incollare l'URL qui sotto. Finché l'URL resta
 * vuoto il modulo lavora in no-op silenzioso, così la pagina non si rompe prima
 * del deploy. */
const LEADERBOARD_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYXUkB2t3iTbPKG3lq3ucn35usDRAekAB6GkWloADtgsFzkkWIhF_MaCIss2xcrDn4/exec'

export function isLeaderboardConfigured() {
  return Boolean(LEADERBOARD_SCRIPT_URL)
}

export async function fetchLeaderboard() {
  if (!LEADERBOARD_SCRIPT_URL) return []
  const res = await fetch(LEADERBOARD_SCRIPT_URL)
  if (!res.ok) throw new Error('leaderboard fetch failed')
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || 'leaderboard fetch failed')
  return data.entries
}

export async function submitScore({ nickname, score, source, painKey }) {
  if (!LEADERBOARD_SCRIPT_URL) return { ok: false, error: 'not_configured' }
  const res = await fetch(LEADERBOARD_SCRIPT_URL, {
    method: 'POST',
    // text/plain evita il preflight CORS: Apps Script non implementa doOptions,
    // quindi un Content-Type "application/json" farebbe fallire la richiesta.
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ nickname, score, source, painKey }),
  })
  if (!res.ok) throw new Error('leaderboard submit failed')
  return res.json()
}
