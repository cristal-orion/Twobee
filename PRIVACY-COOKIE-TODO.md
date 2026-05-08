# Privacy Policy + Cookie Banner — TODO

Workstream bloccato finché non arrivano le info qui sotto. Quando le abbiamo, si scrive privacy policy + si implementa il banner seguendo le regole di `cookie-banner-regole.txt` (lezioni Plus Vending — aprile 2026).

---

## 🔴 Blocker — info da raccogliere

### Dati legali TwoBee (per privacy policy)
- [x] Ragione sociale: **Two Bee S.r.l.** (forma legale registrata: TWO BEE S.R.L.)
- [x] Sede legale: **Via Guglielmo Marconi 15, 80125 Napoli (NA)** — quartiere Fuorigrotta
- [x] P.IVA: **11030281213**
- [x] Codice Fiscale: **11030281213** (coincide con P.IVA, confermato 2026-05-02)
- [x] Numero REA: **NA-1149609** (Camera di Commercio di Napoli)
- [x] Email titolare del trattamento: `info@twobee.it` (default scelto, niente `privacy@` dedicata per ora)
- [x] DPO: **non nominato** (Two Bee S.r.l. è sotto soglia GDPR, nomina non obbligatoria — privacy policy lo dichiara esplicitamente)
- [ ] PEC aziendale → da fornire (non disponibile ora; rimandata)

### Decisioni stack di tracking (per cookie banner)
- [x] **Storage finale**: VPS privato in Unione Europea (zero trasferimenti extra-UE → semplifica privacy policy, no SCC necessarie per il dato grezzo)
- [x] **Klaviyo**: ATTIVO (per monitoring + email marketing) → servono `company_id` e `list_id`. Vedi `cookie-banner-regole.txt` PARTE B. NB: Klaviyo ha sede USA → la privacy policy DEVE menzionare il trasferimento extra-UE con base giuridica SCC anche se il VPS è in UE
- [x] **Google stack**: ATTIVO (GTM + GA4) → segue le regole di `cookie-banner-regole.txt` PARTE A. Container ID GTM ricevuto: **`GTM-MV7672T3`** (2026-05-04). Manca Measurement ID GA4 `G-XXXXXXXXXX`
- [x] **EmailJS**: confermato — resta per la notifica interna (mail al titolare a ogni submit)
- [ ] **Google Ads**: lo attiviamo? (sì/no — se sì serve conversion ID)
- [ ] **Meta Pixel**: lo attiviamo? (sì/no — se sì serve pixel ID)
- [ ] **LinkedIn Insight Tag**: lo attiviamo? (sì/no)
- [ ] **IDs ancora da fornire** (aggiornato 2026-05-04):
  - [x] GTM container ID → `GTM-MV7672T3` ricevuto
  - [ ] Secondo snippet GTM (`<noscript>` con iframe per `<body>`) → da chiedere a chi ha mandato il primo
  - [ ] GA4 Measurement ID `G-XXXXXXXXXX`
  - [ ] Google Ads Conversion ID `AW-XXXXXXXXX` (se Google Ads attivo — vedi sopra)
  - [ ] Klaviyo `company_id`
  - [ ] Klaviyo `list_id`

### Decisioni operative
- [ ] Stile banner: stesso pattern Plus Vending (vanilla JS inline nel `<head>` + componente custom React) o componente React integrato col design TwoBee?
  → **Raccomandazione**: pattern misto Plus Vending. Lo snippet consent default DEVE essere `<script is:inline>` nel `<head>` PRIMA di GTM (regola obbligata, vedi `cookie-banner-regole.txt` § 1). Il banner UI può essere React component nel design TwoBee.
- [ ] "Gestisci cookie" link permanente nel footer → da aggiungere quando implementiamo il banner (oggi nel footer ci sono solo Privacy + Cookie Policy)
- [ ] Lingua: solo IT o anche EN? (oggi sito solo IT — ipotesi default: solo IT)

---

## 📋 Quando si parte — checklist di implementazione

### Privacy policy
- [ ] Pagina/route `/privacy-policy` (oggi sito è single-route, valutare se SPA navigation o pagina statica HTML separata)
- [ ] Sezioni standard: Titolare, dati raccolti, finalità, base giuridica, periodo di conservazione, diritti dell'interessato (artt. 15-22 GDPR), trasferimenti extra-UE
- [ ] Lista responsabili del trattamento esterni (EmailJS, e gli altri tool che decidiamo di attivare)
- [ ] Se Klaviyo attivo → menzionare sede USA + base giuridica SCC (Standard Contractual Clauses)
- [ ] Link "Privacy Policy" nel footer
- [ ] Link checkbox privacy required nel form Contact

### Cookie banner — implementazione
Ordine obbligato (dalle regole Plus Vending, evita il bug del consent denied su utenti nuovi):
- [ ] Snippet `<script is:inline>` consent default in `<head>` PRIMA dello snippet GTM
- [ ] Funzione `gtag` SCRITTA nella forma canonica `function gtag(){dataLayer.push(arguments);}` (NO rest spread, NO array push — è il bug numero 1 da non ripetere)
- [ ] Default EU: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`, `personalization_storage` = denied; `functionality_storage`, `security_storage` = granted
- [ ] Lettura `localStorage` (`pv_consent_v1` o equivalente con prefisso TwoBee, es. `tb_consent_v1`) al momento del default per utenti di ritorno
- [ ] Snippet GTM in `<head>` DOPO il consent default
- [ ] Componente banner: pulsanti "Accetta tutti" / "Rifiuta tutti" / "Gestisci preferenze" allo stesso livello visivo (no dark patterns — requisito GDPR)
- [ ] Categorie: necessari (sempre on, non disabilitabili), statistiche, marketing
- [ ] Click "Accetta" / "Rifiuta" / "Salva preferenze" → `gtag('consent', 'update', { ... })` con i 4 campi che contano (analytics_storage, ad_storage, ad_user_data, ad_personalization)
- [ ] Persistenza scelta in localStorage con timestamp + versione
- [ ] Link "Gestisci cookie" nel footer che riapre il banner
- [ ] Configurare in GTM "Additional Consent Checks" su ogni tag (vedi `cookie-banner-regole.txt` § 5)

### Klaviyo (se attivato)
Riferimento completo in `cookie-banner-regole.txt` PARTE B. Punti chiave:
- [ ] Endpoint `https://a.klaviyo.com/client/subscriptions/?company_id=XXXXX`
- [ ] Header `revision: 2024-10-15` (o più recente stabile al momento dell'integrazione)
- [ ] Estrarre dati dal form PRIMA di `form.reset()`
- [ ] Fetch fire-and-forget (NO await) con `.catch(console.error)` — la mail EmailJS è già partita, lead non si perde
- [ ] Telefono normalizzato in E.164 (`+39...`)
- [ ] Campi nativi (first_name, last_name, phone_number, email) separati dalle `properties` custom
- [ ] Property "Sorgente" descrittiva e univoca per il form (es. `"Landing TwoBee - Form Audit Gratuito"`)
- [ ] Property "Data richiesta" con `new Date().toISOString()`

---

## ✅ Verifiche post-deploy (obbligatorie)

### Cookie banner
Test in **incognito + hotspot 4G** (no adblocker, no DNS-blocker — bloccherebbero google-analytics e darebbero falsi negativi):
- [ ] `localStorage.removeItem('tb_consent_v1')` + F5 → banner visibile, default denied nel dataLayer
- [ ] Click "Accetta tutti" → `dataLayer.filter(e => e[0]==='consent')` deve avere 2 entries `Arguments(3)` (NON `Array(3)`!) con `gtm.uniqueEventId`
- [ ] Network → filtro "collect" → URL deve avere `tid=G-XXXXXXX` corretto + `gcs=G111` (non più G100) + status 204
- [ ] Click "Rifiuta tutti" → consent update con tutti denied, niente fetch a google-analytics

### Klaviyo (se attivo)
- [ ] Submit form con email test → profilo compare nella lista corretta entro 10-30s
- [ ] Verifica campi: email, first_name, last_name, phone_number (E.164 o null), properties custom
- [ ] Network → filtro "klaviyo" → status 202 (Klaviyo risponde sempre 202, non 200)

### GA4 (dopo 24-48h)
- [ ] GA4 → Admin → Impostazioni consenso → warning "tasso di consenso 0%" sparito
- [ ] GA4 → Realtime → utenti che accettano appaiono in tempo reale
- [ ] GA4 → DebugView → eventi con `debug_mode=true` arrivano (preview GTM)
