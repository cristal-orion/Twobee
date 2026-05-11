# TwoBee — SEO & GEO TODO

Documento di lavoro. Diviso in:
- **Fatto** (cose tecniche già implementate)
- **Da fare — invisibile** (markup, infrastruttura, asset)
- **Da fare — visibile** (richiede modifiche al copy / nuove sezioni → da concordare)
- **Verifiche post-deploy**

---

## Assunzioni
- **Dominio di produzione**: `https://twobee.it` (dedotto da `info@twobee.it`). Da confermare.
- **Lingua del sito**: `it-IT`.
- **Stack**: Vite SPA in React, single-route. Nessun SSR / prerender attivo.
- **Tracking attivo oggi**: solo EmailJS. GTM/GA4/Ads non ancora integrati.

---

## ✅ Fatto (in questa sessione)

- [x] Meta `og:*` (title, description, image, url, locale, type, site_name)
- [x] Meta `twitter:*` (card, title, description, image)
- [x] `<link rel="canonical">`
- [x] JSON-LD `Organization`
- [x] JSON-LD `WebSite` (con `SearchAction` predisposto, anche se al momento non c'è search)
- [x] JSON-LD `FAQPage` (mirror delle 5 FAQ in `Faq.jsx`)
- [x] `public/robots.txt`
- [x] `public/sitemap.xml`
- [x] `public/llms.txt` (proposta llms.txt per discoverability LLM)

## ✅ Fatto — sessione 2026-05-11 (GEO per LLM crawler)

Problema rilevato: Claude.ai / Perplexity / ChatGPT search fanno fetch dell'HTML senza eseguire JS → vedevano solo lo scheletro SPA (`<div id="root"></div>`) e nessun copy. Solo meta + JSON-LD del `<head>` erano leggibili.

Scelta: arricchire l'HTML statico **senza** introdurre prerender/plugin di build (per non rischiare il deploy Coolify). Due interventi su `index.html`:

- [x] **JSON-LD espanso** (da 3 a 6 nodi `@graph`):
  - `ProfessionalService` con `description` lunga, `slogan`, `knowsAbout` (17 voci), `hasOfferCatalog` con i 3 piani descritti, `employee` con i 5 membri del team + LinkedIn, `areaServed` esteso (Italia + Sud Italia + Campania)
  - 3 nuovi `Service` separati (Performance Marketing, Controllo di gestione, Growth System)
  - `FAQPage` portata da 5 a 11 domande (aggiunte: area servita, audit gratuito, canali Ads, e-commerce, startup vs PMI, contratto minimo)
- [x] **Blocco `<noscript>` nel `<body>`** (~500 parole) con copy in prosa di tutte le sezioni principali (Hero, Problems, System, Services, Audience, Pricing + promessa contrattuale, Team, Contatti). Invisibile agli utenti, leggibile dai bot senza JS.

Risultato: `dist/index.html` passa da 8.9 KB → 24 KB (6.7 KB gzipped). Zero modifiche al codice React.

> ⚠️ **Nota di manutenzione**: il copy del `<noscript>` in `index.html` e i `description` nel JSON-LD sono **duplicati** rispetto ai componenti React (`Hero.jsx`, `Pricing.jsx`, `Faq.jsx`, `Services.jsx`, `System.jsx`, `Team.jsx`, `Audience.jsx`, `Problems.jsx`). Quando si cambia copy in queste sezioni, **ricordarsi di aggiornare anche `index.html`** altrimenti drifteranno e i bot leggeranno copy vecchio.

---

## 🔧 Da fare — invisibile (NON serve concordare copy)

### 1. OG image dedicata (PRIORITÀ ALTA)
Oggi il meta `og:image` punta a `/hero-main.png` (754×567) come fallback — funziona ma non è ottimale.
- [ ] Creare `public/og-image.png` o `og-image.jpg` a **1200×630** con logo TwoBee + claim breve
- [ ] Aggiornare i meta `og:image` e `twitter:image` in `index.html`
- [ ] Test con [opengraph.xyz](https://www.opengraph.xyz) e [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 2. Verifiche dominio
- [ ] Confermare il dominio definitivo (`twobee.it`? `twobee.com`?). Se diverso, aggiornare:
  - `index.html` (canonical, og:url, JSON-LD `url`)
  - `public/sitemap.xml`
  - `public/robots.txt` (riga `Sitemap:`)
  - `public/llms.txt`

### 3. Dati legali per JSON-LD `Organization`
- [x] Passato da `Organization` a `ProfessionalService` (più adatto a un'agenzia con sede fisica)
- [x] `address` (PostalAddress: Via Guglielmo Marconi 15, 80125 Napoli, NA, IT)
- [x] `vatID`: IT11030281213
- [x] `legalName`: "Two Bee S.r.l."
- [ ] `telephone` se c'è un numero pubblico (oggi non esposto sul sito)
- [ ] `sameAs` con URL profili social (LinkedIn, Instagram, Facebook, X, ecc.) — recuperare gli URL ufficiali
- [ ] `foundingDate` (anno fondazione) — recuperare dal certificato camerale
- [ ] Valutare se restringere `areaServed` a "Campania" o "Sud Italia" (oggi è "Italia" generico) — impatta GEO se vogliamo posizionarci come player locale

### 4. JSON-LD `Service` per Pricing
Sezione `Pricing.jsx` ha 3 piani (WORKER BEE, HIVE, ROYAL QUEEN). Possiamo aggiungere uno `OfferCatalog` con 3 `Offer`/`Service` per dare struttura a Google + LLM.
- [ ] Decidere: ha senso esporre i piani a Google (al momento non c'è prezzo numerico → impatto basso)
- [ ] Se sì, aggiungere `OfferCatalog` con i 3 piani in `index.html`

### 5. Analytics + GTM (predisposizione)
Quando arriva il momento, recuperare il pattern di Plus Vending (vedi `cookie-banner-regole.txt`):
- [ ] Container GTM creato per twobee.it
- [ ] Property GA4 creata
- [ ] Snippet inline consent default in `<head>` PRIMA di GTM
- [ ] Snippet GTM in `<head>`
- [ ] Cookie banner React integrato (vedi sezione separata sotto)

### 6. Performance / Core Web Vitals (impatto SEO)
- [ ] `preload` font Inter + League Spartan (oggi sono solo `preconnect`)
- [ ] Verificare LCP del hero in mobile 4G (target < 2.5s)
- [ ] Lazy-load delle immagini sotto il fold con `loading="lazy"` (Team, Pricing, Hero secondario)
- [ ] Verificare CLS: il `ScrollSmoother` di GSAP può introdurre layout shift se non inizializzato bene
- [ ] Considerare prerender (es. `vite-plugin-prerender-spa` o Astro/Next se la SEO diventa critica). Oggi il primo paint del bot Google è vuoto → Google esegue JS ma è uno svantaggio competitivo.

### 7. SPA + indicizzazione
- [ ] Test "Google Search Console — URL Inspection" sulla home: verificare che il rendered HTML contenga il copy (non solo lo scheletro)
- [ ] Se il rendered HTML è vuoto, considerare `react-snap` / prerender in build → genera HTML statico per i bot

### 8. Accessibilità (impatta SEO indirettamente)
- [ ] Verificare contrast ratio testo bianco/giallo su sezioni chiare (Pricing) e scure (hero)
- [ ] Aggiungere `aria-label` sui CTA "→" in Hero, Contact, Pricing (oggi gli icon-button non hanno label leggibile)
- [ ] Verificare focus-visible su navigazione tastiera

### 9. Hreflang (solo se in futuro avremo /en)
- [ ] Aggiungere `<link rel="alternate" hreflang="it" href="...">` per evitare duplicate content

---

## ✏️ Da fare — visibile (richiede modifiche al copy, NON facciamo ora)

> Tutto qui sotto cambia testo che si vede sul sito. Va concordato con i capi prima di mettere mano.

### A. Sezione "Chi siamo" più dichiarativa (per GEO)
Oggi non c'è una sezione "About" con frasi che un LLM possa estrarre come fact. Servono claim citabili tipo:
- *"TwoBee è un'agenzia di performance marketing fondata nel [anno] a [città]."*
- *"Lavoriamo con PMI italiane nei settori X, Y, Z."*
- *"Abbiamo seguito oltre N clienti e gestito M€ di spend pubblicitario."*

I LLM (ChatGPT, Perplexity, Gemini) citano contenuto **fattuale e dichiarativo**, non claim retorici tipo "le agenzie ti vendono follower". Lo slogan resta come hook, ma serve anche una pagina/sezione che parli "in terza persona" del brand.

### B. Numeri concreti (per GEO + trust)
- [ ] Sostituire claim astratti ("risultati misurabili") con numeri ("+34% leads in 90 giorni", "234 clienti seguiti dal 2020")
- [ ] Aggiungere case study con metriche reali (anche solo 1-2 esempi)
- [ ] Pubblicare testimonianze nominative con foto + ruolo + azienda (oggi i loghi clienti ci sono ma serve più)

### C. Title e meta description (per CTR Google)
Title attuale: `TwoBee — Sistemi di crescita per le PMI del Sud Italia`
- [ ] Valutare: `TwoBee | Performance Marketing per PMI del Sud Italia` (più keyword commerciale)
- [ ] Description attuale è 152 caratteri → ok lunghezza, ma valutare se inserire "audit gratuito" come hook
- [ ] Da concordare con i capi prima di toccare

### D. Glossario / definizioni (per GEO)
I LLM amano contenuto auto-definitorio:
- [ ] Aggiungere micro-definizioni in linea per termini come "Growth Call", "Sistema TwoBee", "Audit gratuito"
- [ ] Considerare una pagina/sezione "Come lavoriamo" con definizioni step-by-step

### E. FAQ — espansione
Oggi ci sono 5 FAQ. Per GEO meglio averne 8-12, fatte in linguaggio naturale che corrisponde a query tipo "quanto costa un'agenzia di performance marketing":
- [ ] *"Quanto costa il vostro servizio?"* (anche solo "da X €/mese")
- [ ] *"Lavorate con e-commerce?"*
- [ ] *"Lavorate solo nel Sud Italia?"* (chiarisce areaServed)
- [ ] *"Cos'è un audit gratuito e cosa include?"*

### F. Heading hierarchy
- [ ] Verificare che ci sia un solo `<h1>` per pagina (Hero) e che le sezioni successive usino `<h2>` consistenti — già rispettato a colpo d'occhio, ma da auditare con [HTML5 outliner](https://gsnedders.html5.org/outliner/)

### G. Internal linking
- [ ] Considerare un blog/risorse: 4-6 articoli pillar che ranking su query informazionali ("come scegliere un'agenzia di performance marketing", "quanto investire in Meta Ads") → traino sulla home

---

## 🔍 Verifiche post-deploy

Da fare ogni volta che si tocca markup SEO/GEO. Sequenza obbligata:

### Subito (giorno 0)
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) → URL del sito → verificare che `Organization`, `WebSite`, `FAQPage` siano riconosciuti senza errori
- [ ] [Schema.org Validator](https://validator.schema.org/) → lo stesso URL → 0 errori
- [ ] [opengraph.xyz](https://www.opengraph.xyz) → preview OG corretta (titolo, descrizione, immagine)
- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) → preview corretta + nessun warning
- [ ] Test in WhatsApp Web (incolla URL → preview corretta)
- [ ] [PageSpeed Insights](https://pagespeed.web.dev) → mobile + desktop, target Performance ≥ 80, SEO = 100
- [ ] `curl https://twobee.it/robots.txt` → contenuto corretto
- [ ] `curl https://twobee.it/sitemap.xml` → contenuto corretto
- [ ] `curl https://twobee.it/llms.txt` → contenuto corretto

### Entro 24-48h
- [ ] Google Search Console: dominio verificato + sitemap.xml inviata
- [ ] GSC → "URL Inspection" sulla home → "Live Test" → verificare HTML renderizzato non vuoto
- [ ] Bing Webmaster Tools: stesso setup
- [ ] Cercare `site:twobee.it` su Google → la home deve apparire con titolo+descrizione corretti

### Entro 30 giorni
- [ ] GSC → Performance: prime impressioni su query brand ("twobee", "two bee")
- [ ] GSC → Coverage: 1 pagina indicizzata (la home), 0 errori
- [ ] Test GEO manuale: chiedere a ChatGPT / Perplexity / Gemini *"chi è TwoBee?"*, *"agenzia performance marketing PMI Sud Italia"* → vedere se il sito viene citato e con quale framing

---

## Note sparse

- **Sitemap dinamica**: oggi è statica con la sola home. Quando aggiungiamo blog/case study, valutare un plugin Vite che la rigenera in build (es. `vite-plugin-sitemap`).
- **`llms.txt`**: standard ancora emergente (proposta di Jeremy Howard). Pochi LLM lo leggono oggi, ma è low-cost e non rompe nulla. Aggiornarlo quando aggiungiamo sezioni/pagine.
- **GEO ≠ SEO**: GEO funziona meglio quando il contenuto è "estraibile" (frasi dichiarative auto-contenute). Il copy emozionale resta importante per la conversione ma non viene citato dai LLM.
- **Privacy + cookie banner**: tracciati in conversazione separata. Bloccati finché non arrivano i dati legali (ragione sociale completa, sede, P.IVA, email privacy, DPO se nominato) e la decisione su quali tool attivare (GTM/GA4/Klaviyo).
