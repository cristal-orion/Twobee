/* Hallmark · macrostructure: Workbench · tone: playful-bold · anchor hue: brand-yellow #FFC501
 * theme: Twobee brand (honeycomb dark · League Spartan display · Inter body) — preserved, not catalog
 * pre-emit critique: P4 H4 E4 S4 R4 V4
 *
 * 📋 SCORECARD DI CRESCITA (/calcolatore) — variante "diagnosi" della coppia A/B.
 *
 * PROTOTIPO (2026-07-27) che sostituisce il calcolatore ROI a slider. Perché:
 * il calcolatore chiedeva AOV, marginalità, CAC, LTV — cioè proprio i numeri che
 * l'imprenditore target non conosce (e chi li conosce non ha bisogno di noi). Qui
 * NON si chiede nessuna cifra: 8 domande sì / in parte / no sulla prevedibilità
 * della crescita → punteggio /100, zona, le 3 falle principali e (dopo il gate)
 * le 3 azioni prioritizzate. Una domanda per schermata, tutto a tap.
 *
 * Vantaggio anche di sostanza: l'output è un'AUTOVALUTAZIONE, non una stima di
 * fatturato → nessuna promessa di risultato da difendere, coerente col
 * posizionamento "KPI reali, non fuffa".
 *
 * ⚠️ Da definire con Marco/Toto prima del live: il testo delle 8 domande è una
 * prima passata, e manca un benchmark reale ("il punteggio medio di chi fa il
 * test è X") — volutamente NON inventato, vedi BENCHMARK sotto.
 *
 * La gemella è /flappybee (src/pages/Flappybee.jsx). Solo le sezioni Team
 * (TeamHive) e Calendario (BookCall) sono condivise e IDENTICHE tra le due (da
 * ./landingShared.jsx): il resto del "sotto" qui resta a tema-diagnosi.
 *
 * Il gate invia il lead per davvero via EmailJS (stesso account/template del form
 * contatti principale, vedi src/lib/leadEmail.js) ed emette gli eventi calc_* +
 * form_submit sul dataLayer. La mappatura GTM → GA4/Meta/Klaviyo la collega Gabriele.
 *
 * NB: niente ScrollSmoother qui (a differenza di App.jsx). L'auto-scroll dell'embed Cal
 * ridimensiona l'iframe e va in conflitto con lo scroll "smussato" via transform → salti
 * a caso su altre sezioni. Scroll nativo = prenotazione fluida.
 */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HexBackground from '../components/HexBackground.jsx'
import CookieBanner from '../components/CookieBanner.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { sendLeadEmail, pushLeadFormEvent } from '../lib/leadEmail.js'
import { track, scrollToBooking, SocialProof, BookCall, TeamHive } from './landingShared.jsx'

gsap.registerPlugin(useGSAP)

const VARIANT = 'calcolatore'
const MECHANIC = 'scorecard' // distingue il prototipo dal vecchio calcolatore nei report

/* ------------------------------------------------------------------ */
/* MOTORE — 8 domande, 3 risposte. Nessun dato aziendale richiesto.     */
/* Ordine = ordine di somministrazione: si parte dalle più facili.       */
/* ------------------------------------------------------------------ */
const QUESTIONS = [
  'origine',
  'canali',
  'previsione',
  'followup',
  'misura',
  'cac',
  'valore',
  'autonomia',
]

const ANSWER_SCORE = { yes: 2, partial: 1, no: 0 }
// gravità della falla: chi risponde "no" ha un problema più urgente di chi è "in parte"
const GAP_WEIGHT = { yes: 0, partial: 1, no: 2 }
const MAX_SCORE = QUESTIONS.length * 2

// Confronto di settore: NON inventato. Quando avrete abbastanza test compilati
// (o un dato di fonte citabile), mettete qui la media e si accende da sola la
// riga di benchmark nel risultato.
const BENCHMARK = null // es. { avg: 48, source: 'media di 214 test compilati' }

function computeScorecard(answers, lang) {
  const raw = QUESTIONS.reduce((s, k) => s + ANSWER_SCORE[answers[k]], 0)
  const score = Math.round((raw / MAX_SCORE) * 100)
  const gaps = QUESTIONS.map((key) => ({ key, weight: GAP_WEIGHT[answers[key]] }))
    .filter((g) => g.weight > 0)
    .sort((a, b) => b.weight - a.weight) // stabile: a pari gravità resta l'ordine delle domande
    .slice(0, 3)
  // i due numeri "economici": non saperli è la norma, e diventa il gancio all'audit
  const missesEconomics = answers.cac !== 'yes' || answers.valore !== 'yes'
  const zone = score < 41 ? 'crit' : score < 71 ? 'fragile' : 'solid'
  return { score, raw, gaps, zone, missesEconomics, lang }
}

/* ------------------------------------------------------------------ */
/* COPY it/en — SOLO i pezzi specifici della scorecard. Il copy          */
/* condiviso (Team, Cal) vive in ./landingShared.jsx.                   */
/* ------------------------------------------------------------------ */
const COPY = {
  it: {
    hero: {
      eyebrow: '🐝 Scorecard di crescita · 8 domande',
      h1a: 'Quanto è ',
      h1hl: 'prevedibile la tua crescita?',
      sub: 'Otto domande, novanta secondi. Nessun numero da sapere: rispondi sì, in parte o no e ti diciamo dove perde colpi il tuo sistema di acquisizione.',
      trust: ['90 secondi', 'Nessun numero da sapere', 'Risultato immediato'],
      social: 'Già al fianco di PMI e brand del Sud Italia',
      talkInstead: 'Preferisci saltare il test e parlarci direttamente? →',
    },
    quiz: {
      tag: 'Scorecard',
      progress: 'di',
      answers: { yes: 'Sì', partial: 'In parte', no: 'No' },
      back: '← Indietro',
      note: 'Non chiediamo fatturato, margini o dati aziendali. Solo otto tap.',
      openingTitle: 'Otto domande sul tuo sistema di acquisizione',
      openingBody: 'Rispondi di istinto: la prima risposta è quasi sempre quella vera. Se una domanda ti sembra difficile, la risposta è “no” — ed è già un’informazione utile.',
      start: 'Inizia il test',
    },
    questions: {
      origine: {
        area: 'Tracciamento',
        q: 'Sai da dove è arrivato il tuo ultimo cliente?',
        gap: 'Non sai da dove arrivano i clienti',
        why: 'Senza l’origine non puoi replicare quello che funziona né tagliare quello che non funziona: ogni euro speso resta una scommessa.',
        fix: 'Tracciamento base su form, chiamate e messaggi, più una domanda in fase di contatto: in due settimane sai da dove arriva ogni richiesta.',
      },
      canali: {
        area: 'Canali',
        q: 'Se domani il passaparola si fermasse, hai un altro canale che ti porta richieste?',
        gap: 'Un solo canale che porta clienti',
        why: 'Un business con un solo rubinetto non è in crescita: è in equilibrio precario. Quando quel canale rallenta, rallenta tutto insieme.',
        fix: 'Apriamo un secondo canale misurabile accanto al passaparola, con un budget piccolo e un obiettivo di costo per richiesta definito prima di partire.',
      },
      previsione: {
        area: 'Prevedibilità',
        q: 'Sai dire quante richieste di nuovi clienti arriveranno il mese prossimo?',
        gap: 'Il mese prossimo è un’incognita',
        why: 'Senza una previsione non puoi programmare acquisti, magazzino né assunzioni: l’azienda vive di mesi buoni e mesi da recuperare.',
        fix: 'Costruiamo uno storico su pochi indicatori stabili: dopo 60-90 giorni il mese successivo diventa una previsione, non una speranza.',
      },
      followup: {
        area: 'Follow-up',
        q: 'Chi ti chiede un preventivo e non compra subito viene ricontattato in modo sistematico?',
        gap: 'Le richieste tiepide si perdono',
        why: 'La maggior parte di chi chiede non compra subito. Senza un follow-up organizzato stai regalando clienti già interessati alla concorrenza.',
        fix: 'CRM leggero più una sequenza di ricontatto automatica (email, messaggi, promemoria al commerciale): recuperi vendite già pagate in pubblicità.',
      },
      misura: {
        area: 'Misurazione',
        q: 'Riesci a dire quali soldi spesi in marketing hanno prodotto fatturato e quali no?',
        gap: 'Spesa marketing non collegata ai ricavi',
        why: 'Se non separi la spesa che produce da quella che brucia, il budget si taglia a sensazione — e spesso si taglia la parte che funzionava.',
        fix: 'Colleghiamo spesa, richieste e vendite in un unico report mensile: si vede a occhio dove reinvestire e dove smettere.',
      },
      cac: {
        area: 'Numeri chiave',
        q: 'Sai quanto ti costa, in media, portare a casa un cliente nuovo?',
        gap: 'Costo di acquisizione sconosciuto',
        why: 'Senza questo numero non sai se stai comprando clienti in perdita, e non puoi decidere quanto è sensato investire per crescere.',
        fix: 'Lo calcoliamo insieme in audit con i dati che hai già: da lì definiamo quanto puoi permetterti di spendere per cliente.',
      },
      valore: {
        area: 'Numeri chiave',
        q: 'Sai quanto ti lascia in cassa un cliente nell’arco di un anno?',
        gap: 'Valore del cliente sconosciuto',
        why: 'È il numero che dice quanto puoi investire per acquisire. Senza, ogni budget pubblicitario è deciso a occhio.',
        fix: 'Ricostruiamo il valore medio del cliente a 12 mesi dai tuoi incassi reali: diventa il tetto sostenibile di ogni campagna.',
      },
      autonomia: {
        area: 'Sistema',
        q: 'Se per due settimane non tocchi il marketing, continua ad arrivare qualcosa?',
        gap: 'Il marketing dipende da te',
        why: 'Se si ferma quando ti fermi tu, non è un sistema: è un lavoro in più — il tuo, con il tempo che è la risorsa che ti costa di più.',
        fix: 'Automazioni e presidio esterno sulle attività ripetitive: tu resti sulle decisioni, il flusso di richieste va avanti comunque.',
      },
    },
    result: {
      eyebrow: 'La tua scorecard',
      scoreLabel: 'Prevedibilità della crescita',
      zones: {
        crit: {
          label: 'zona: crescita affidata al caso',
          verdict: 'Oggi la crescita non è un sistema: dipende dal passaparola e dalla fortuna. La buona notizia è che in questa fase i primi interventi sono anche i più rapidi da vedere.',
        },
        fragile: {
          label: 'zona: crescita fragile',
          verdict: 'Le basi ci sono, ma i pezzi non parlano tra loro: i risultati arrivano e poi svaniscono, senza che sia chiaro il perché. Qui si lavora sui collegamenti, non da zero.',
        },
        solid: {
          label: 'zona: crescita sotto controllo',
          verdict: 'Hai già un sistema che gira. Il lavoro qui non è costruire ma ottimizzare: costo per cliente, marginalità, valore nel tempo.',
        },
      },
      gapsEyebrow: 'Le tue falle principali',
      gapsNone: 'Nessuna falla evidente: sei nel gruppo di testa. In call si ragiona di ottimizzazione, non di ricostruzione.',
      lockedHint: 'Sbloccale tutte con i tuoi contatti',
      economicsNote:
        'Non conosci il costo di acquisizione o il valore di un cliente? È la norma, non una colpa: sono esattamente i primi due numeri che mettiamo a terra in audit.',
      benchmarkLabel: 'Punteggio medio di chi fa questo test',
      stepsTitle: 'Le tue prossime 3 mosse',
      restart: 'Rifai il test',
      honestNote: 'Autovalutazione, non una stima di fatturato: nessun numero è stato inventato.',
    },
    gate: {
      eyebrow: '🔒 Ultimo step',
      title: 'Sblocca la diagnosi completa',
      sub: 'Ti mandiamo la scorecard con tutte le falle e le mosse consigliate, e ti richiamiamo per una call strategica gratuita.',
      fields: {
        nome: { label: 'Nome e cognome*', placeholder: 'Come ti chiami?' },
        azienda: { label: 'Azienda*', placeholder: 'Nome della tua attività' },
        email: { label: 'Email*', placeholder: 'La tua email' },
        telefono: { label: 'Telefono*', placeholder: 'Il tuo numero' },
      },
      privacyPre: 'Ho letto la',
      privacyLink: 'Privacy Policy',
      privacyPost: ' e autorizzo Two Bee S.r.l. a ricontattarmi.*',
      submit: 'Sblocca la diagnosi',
      submitSending: 'Invio in corso…',
      submitError: 'Errore, riprova',
      errorMsg: 'Qualcosa è andato storto. Riprova o scrivici a',
    },
    faq: {
      eyebrow: 'FAQ',
      headingPre: 'Domande ',
      headingHl: 'frequenti',
      body: 'I dubbi più comuni sulla scorecard e su come lavoriamo.',
      faqs: [
        {
          q: 'Devo conoscere i miei numeri per farla?',
          a: 'No, ed è il punto: non chiediamo fatturato, margini o costi. Rispondi sì, in parte o no. Se scopri che a metà delle domande rispondi “no”, il test ha già fatto il suo lavoro.',
        },
        {
          q: 'Il punteggio è una stima di quanto potrei fatturare?',
          a: 'No. È un’autovalutazione di quanto la tua crescita è governabile oggi. Non promettiamo percentuali di fatturato in una pagina web: quelle si guardano con i tuoi dati veri, in call.',
        },
        {
          q: 'Cosa succede dopo che sblocco la diagnosi?',
          a: 'Vedi tutte le falle emerse e le tre mosse consigliate, e ti ricontattiamo per una call gratuita di 30 minuti. Nessun impegno, nessuna carta di credito.',
        },
        {
          q: 'Devo essere già un cliente?',
          a: 'No. La scorecard è aperta a tutti ed è il modo più veloce per capire se possiamo esserti utili — o se non ne hai bisogno.',
        },
      ],
    },
    call: {
      heading: 'Prenota la tua call strategica gratuita',
      sub: '30 minuti con il team Two Bee per trasformare queste falle in un piano. Nessun impegno.',
      button: 'Prenota la call →',
    },
    receive: {
      eyebrow: 'Cosa ricevi',
      heading: 'Non un punteggio. Una diagnosi.',
      items: [
        { title: 'Le falle del tuo sistema', body: 'Quali pezzi mancano tra “un cliente ti trova” e “un cliente compra”, in ordine di urgenza.' },
        { title: 'Le prossime 3 mosse', body: 'Azioni concrete e prioritizzate, tarate su ciò che è emerso dalle tue risposte.' },
        { title: 'Call strategica con il team', body: '30 minuti con chi costruisce sistemi di crescita, non chi vende fuffa.' },
      ],
      whoEyebrow: 'Chi siamo',
      whoTitle: 'Two Bee, sistemi di crescita per le PMI.',
      whoBody:
        'Trasformiamo il marketing in un sistema di acquisizione clienti misurabile, con impatto diretto sui ricavi. Data-driven, KPI di fatturato, zero vanity metrics.',
    },
    fit: {
      eyebrow: 'È per te?',
      heading: 'Onestà prima del preventivo.',
      forTitle: 'Fa per te se',
      forItems: [
        'Hai un business attivo e vuoi scalare i ricavi, non i follower',
        'Sei pronto a investire in ads con metodo, non a caso',
        'Vuoi un partner decisionale, non un esecutore di campagne',
      ],
      notForTitle: 'Non fa per te se',
      notForItems: [
        'Cerchi risultati magici senza budget né dati',
        'Vuoi solo “più like” senza guardare al fatturato',
        'Non hai tempo per una call di 30 minuti',
      ],
    },
    finalCta: {
      eyebrow: 'Tocca a te',
      heading: 'Otto domande. Poi sai dove stai perdendo clienti.',
      body: 'Novanta secondi adesso, nessun dato da cercare. Poi decidi tu se vale una call.',
      button: 'Vai alla scorecard ↑',
    },
  },
  en: {
    hero: {
      eyebrow: '🐝 Growth scorecard · 8 questions',
      h1a: 'How ',
      h1hl: 'predictable is your growth?',
      sub: 'Eight questions, ninety seconds. No numbers required: answer yes, partly or no and we’ll tell you where your acquisition system leaks.',
      trust: ['90 seconds', 'No numbers required', 'Instant result'],
      social: 'Already backing SMEs and brands across Southern Italy',
      talkInstead: 'Rather skip the test and talk to us directly? →',
    },
    quiz: {
      tag: 'Scorecard',
      progress: 'of',
      answers: { yes: 'Yes', partial: 'Partly', no: 'No' },
      back: '← Back',
      note: 'We don’t ask for revenue, margins or company data. Just eight taps.',
      openingTitle: 'Eight questions about your acquisition system',
      openingBody: 'Answer on instinct: the first answer is almost always the true one. If a question feels hard, the answer is “no” — and that’s already useful information.',
      start: 'Start the test',
    },
    questions: {
      origine: {
        area: 'Tracking',
        q: 'Do you know where your last customer came from?',
        gap: 'You don’t know where customers come from',
        why: 'Without the source you can’t repeat what works or cut what doesn’t: every euro spent stays a bet.',
        fix: 'Basic tracking on forms, calls and messages, plus one question at first contact: within two weeks you know where every enquiry comes from.',
      },
      canali: {
        area: 'Channels',
        q: 'If word of mouth stopped tomorrow, do you have another channel bringing enquiries?',
        gap: 'Only one channel brings customers',
        why: 'A business with a single tap isn’t growing, it’s balancing. When that channel slows down, everything slows down with it.',
        fix: 'We open a second measurable channel alongside word of mouth, with a small budget and a target cost per enquiry set before we start.',
      },
      previsione: {
        area: 'Predictability',
        q: 'Can you say how many new customer enquiries will arrive next month?',
        gap: 'Next month is a guess',
        why: 'With no forecast you can’t plan stock, purchases or hires: the company lives on good months and catch-up months.',
        fix: 'We build history on a few stable indicators: after 60-90 days next month becomes a forecast, not a hope.',
      },
      followup: {
        area: 'Follow-up',
        q: 'Does someone systematically follow up people who ask for a quote and don’t buy right away?',
        gap: 'Warm enquiries slip away',
        why: 'Most people who ask don’t buy immediately. With no organised follow-up you’re handing already-interested customers to competitors.',
        fix: 'A light CRM plus an automated follow-up sequence (email, messages, sales reminders): you recover sales you already paid for in advertising.',
      },
      misura: {
        area: 'Measurement',
        q: 'Can you tell which marketing spend produced revenue and which didn’t?',
        gap: 'Marketing spend isn’t tied to revenue',
        why: 'If you can’t separate spend that produces from spend that burns, budget gets cut on gut feeling — often cutting the part that worked.',
        fix: 'We connect spend, enquiries and sales in one monthly report: it becomes obvious where to reinvest and where to stop.',
      },
      cac: {
        area: 'Key numbers',
        q: 'Do you know what it costs you, on average, to win a new customer?',
        gap: 'Acquisition cost unknown',
        why: 'Without this number you don’t know whether you’re buying customers at a loss, and you can’t decide how much it makes sense to invest to grow.',
        fix: 'We work it out together in the audit from data you already have: from there we set what you can afford to spend per customer.',
      },
      valore: {
        area: 'Key numbers',
        q: 'Do you know how much a customer leaves in your pocket over a year?',
        gap: 'Customer value unknown',
        why: 'It’s the number that says how much you can invest to acquire. Without it, every ad budget is set by eye.',
        fix: 'We rebuild the average 12-month customer value from your real revenue: it becomes the sustainable ceiling for every campaign.',
      },
      autonomia: {
        area: 'System',
        q: 'If you don’t touch marketing for two weeks, does anything still come in?',
        gap: 'Marketing depends on you',
        why: 'If it stops when you stop, it isn’t a system: it’s one more job — yours, paid in the resource that costs you most.',
        fix: 'Automation and outside ownership of the repetitive work: you stay on decisions, the flow of enquiries keeps going.',
      },
    },
    result: {
      eyebrow: 'Your scorecard',
      scoreLabel: 'Growth predictability',
      zones: {
        crit: {
          label: 'zone: growth left to chance',
          verdict: 'Right now growth isn’t a system: it depends on word of mouth and luck. The good news is that at this stage the first fixes are also the fastest to show.',
        },
        fragile: {
          label: 'zone: fragile growth',
          verdict: 'The basics are there, but the pieces don’t talk to each other: results arrive and then fade, without it being clear why. Here we work on the joins, not from scratch.',
        },
        solid: {
          label: 'zone: growth under control',
          verdict: 'You already have a system running. The work here isn’t building but optimising: cost per customer, margin, value over time.',
        },
      },
      gapsEyebrow: 'Your main leaks',
      gapsNone: 'No obvious leaks: you’re in the leading group. On a call we’d talk optimisation, not rebuilding.',
      lockedHint: 'Unlock them all with your details',
      economicsNote:
        'Don’t know your acquisition cost or customer value? That’s the norm, not a failing: they’re exactly the first two numbers we nail down in the audit.',
      benchmarkLabel: 'Average score of people taking this test',
      stepsTitle: 'Your next 3 moves',
      restart: 'Retake the test',
      honestNote: 'A self-assessment, not a revenue estimate: no number here was invented.',
    },
    gate: {
      eyebrow: '🔒 Last step',
      title: 'Unlock the full diagnosis',
      sub: 'We’ll send the scorecard with every leak and the recommended moves, and call you for a free strategy session.',
      fields: {
        nome: { label: 'Full name*', placeholder: 'What’s your name?' },
        azienda: { label: 'Company*', placeholder: 'Your business name' },
        email: { label: 'Email*', placeholder: 'Your email' },
        telefono: { label: 'Phone*', placeholder: 'Your number' },
      },
      privacyPre: 'I’ve read the',
      privacyLink: 'Privacy Policy',
      privacyPost: ' and authorize Two Bee S.r.l. to contact me.*',
      submit: 'Unlock the diagnosis',
      submitSending: 'Sending…',
      submitError: 'Error, try again',
      errorMsg: 'Something went wrong. Try again or email us at',
    },
    faq: {
      eyebrow: 'FAQ',
      headingPre: 'Frequently asked ',
      headingHl: 'questions',
      body: 'The most common doubts about the scorecard and how we work.',
      faqs: [
        {
          q: 'Do I need to know my numbers to take it?',
          a: 'No, and that’s the point: we don’t ask for revenue, margins or costs. You answer yes, partly or no. If you find yourself answering “no” to half of them, the test has already done its job.',
        },
        {
          q: 'Is the score an estimate of what I could earn?',
          a: 'No. It’s a self-assessment of how governable your growth is today. We don’t promise revenue percentages on a web page: those get looked at with your real data, on a call.',
        },
        {
          q: 'What happens after I unlock the diagnosis?',
          a: 'You see every leak that came up and the three recommended moves, and we reach out to book a free 30-minute call. No commitment, no credit card.',
        },
        {
          q: 'Do I need to be a client already?',
          a: 'No. The scorecard is open to everyone and it’s the fastest way to see whether we can help — or whether you don’t need us.',
        },
      ],
    },
    call: {
      heading: 'Book your free strategy call',
      sub: '30 minutes with the Two Bee team to turn these leaks into a plan. No commitment.',
      button: 'Book the call →',
    },
    receive: {
      eyebrow: 'What you get',
      heading: 'Not a score. A diagnosis.',
      items: [
        { title: 'Your system’s leaks', body: 'Which pieces are missing between “a customer finds you” and “a customer buys”, in order of urgency.' },
        { title: 'Your next 3 moves', body: 'Concrete, prioritized actions based on what your answers revealed.' },
        { title: 'Strategy call with the team', body: '30 minutes with people who build growth systems, not sell fluff.' },
      ],
      whoEyebrow: 'Who we are',
      whoTitle: 'Two Bee, growth systems for SMEs.',
      whoBody:
        'We turn marketing into a measurable customer-acquisition system with direct revenue impact. Data-driven, revenue KPIs, zero vanity metrics.',
    },
    fit: {
      eyebrow: 'Is it for you?',
      heading: 'Honesty before the quote.',
      forTitle: 'It’s for you if',
      forItems: [
        'You run an active business and want to scale revenue, not followers',
        'You’re ready to invest in ads with method, not by chance',
        'You want a decision-making partner, not a campaign executor',
      ],
      notForTitle: 'Not for you if',
      notForItems: [
        'You want magic results with no budget and no data',
        'You just want “more likes” without looking at revenue',
        'You don’t have time for a 30-minute call',
      ],
    },
    finalCta: {
      eyebrow: 'Your turn',
      heading: 'Eight questions. Then you know where you’re losing customers.',
      body: 'Ninety seconds now, nothing to look up. Then you decide if it’s worth a call.',
      button: 'Back to the scorecard ↑',
    },
  },
}

/* ================================================================== */
/* PAGE                                                                 */
/* ================================================================== */
export default function CalcolatorePage() {
  useEffect(() => {
    track('landing_view', { variant: VARIANT, mechanic: MECHANIC })
    track('calc_view', { page: 'calcolatore', mechanic: MECHANIC })
  }, [])

  return (
    <div id="top" className="text-white">
      <HexBackground />
      <Navbar landing />
      <main>
        <Experience />
        <BookCall variant={VARIANT} />
        <WhatYouGet />
        <TeamHive />
        <Fit />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* EXPERIENCE — hero + scorecard + risultato (stato condiviso)          */
/* ------------------------------------------------------------------ */
function Experience() {
  const lang = useLang()
  const t = COPY[lang]
  const root = useRef(null)

  // step: -1 = schermata di apertura, 0..7 = domande, 8 = fatto
  const [step, setStep] = useState(-1)
  const [answers, setAnswers] = useState({})
  const [report, setReport] = useState(null)
  const [unlocked, setUnlocked] = useState(false)

  useGSAP(
    () => {
      const fader = gsap.utils.toArray('.cx-fade', root.current)
      gsap.set(fader, { y: 24, opacity: 0 })
      gsap.to(fader, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.15 })
    },
    { scope: root }
  )

  const onStart = () => {
    setStep(0)
    track('calc_start', { mechanic: MECHANIC })
  }

  const onAnswer = (value) => {
    const key = QUESTIONS[step]
    const next = { ...answers, [key]: value }
    setAnswers(next)
    track('calc_step_completato', { mechanic: MECHANIC, step: step + 1, domanda: key, risposta: value })
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1)
      return
    }
    // ultima risposta → calcolo e scroll al risultato
    const r = computeScorecard(next, lang)
    setReport(r)
    setStep(QUESTIONS.length)
    track('calc_risultato_visualizzato', { mechanic: MECHANIC, score: r.score, zona: r.zone })
    setTimeout(() => {
      const el = document.getElementById('risultato')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 140)
  }

  const onBack = () => setStep((s) => Math.max(0, s - 1))

  const onRestart = () => {
    setAnswers({})
    setReport(null)
    setUnlocked(false)
    setStep(0)
    track('calc_restart', { mechanic: MECHANIC })
    const el = document.getElementById('top')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const onUnlock = (form) => {
    setUnlocked(form)
    track('calc_lead_inviato', { mechanic: MECHANIC, score: report.score, zona: report.zone })
  }

  return (
    <section ref={root} className="relative overflow-hidden">
      {/* scrim per profondità in cima */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

      <div className="container-x relative grid items-center gap-12 pt-32 pb-16 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* colonna testo */}
        <div>
          <span className="cx-fade eyebrow text-outlined-sm">{t.hero.eyebrow}</span>
          <h1 className="cx-fade text-outlined mt-5 font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            {t.hero.h1a}
            <span className="text-brand-yellow">{t.hero.h1hl}</span>
          </h1>
          <p className="cx-fade mt-6 max-w-md text-base text-white/75 sm:text-lg">{t.hero.sub}</p>
          <ul className="cx-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.2em] text-white/55 sm:text-sm">
            {t.hero.trust.map((tag) => (
              <li key={tag} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                {tag}
              </li>
            ))}
          </ul>
          <SocialProof label={t.hero.social} className="cx-fade mt-10" />
        </div>

        {/* colonna scorecard */}
        <div className="cx-fade">
          <ScorecardCard t={t} step={step} answers={answers} onStart={onStart} onAnswer={onAnswer} onBack={onBack} />
          <p className="mt-4 text-center text-xs text-white/40">
            <a
              href="#prenota"
              onClick={() => track('landing_book_cta', { variant: VARIANT, source: 'hero_skip' })}
              className="underline transition hover:text-brand-yellow"
            >
              {t.hero.talkInstead}
            </a>
          </p>
        </div>
      </div>

      {/* RISULTATO */}
      <AnimatePresence>
        {report && (
          <motion.div
            id="risultato"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="scroll-mt-24"
          >
            <ResultReport t={t} lang={lang} report={report} unlocked={unlocked} onUnlock={onUnlock} onRestart={onRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Esagono + check: chiusura del quiz on-brand (l'emoji 📋 stonava col resto).
function DoneMark() {
  return (
    <svg
      viewBox="0 0 64 72"
      className="h-16 w-auto drop-shadow-[0_0_22px_rgba(255,197,1,0.35)] sm:h-20"
      fill="none"
      aria-hidden
    >
      <path
        d="M32 2.5 61.5 19.25V52.75L32 69.5 2.5 52.75V19.25Z"
        fill="rgba(255,197,1,0.12)"
        stroke="#FFC501"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M21 36.5 28.5 44 44 28"
        stroke="#FFC501"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* SCORECARD CARD — una domanda per schermata, tre tap possibili        */
/* ------------------------------------------------------------------ */
function ScorecardCard({ t, step, answers, onStart, onAnswer, onBack }) {
  const q = t.quiz
  const total = QUESTIONS.length
  const done = step >= total
  const idx = Math.min(Math.max(step, 0), total - 1)
  const key = QUESTIONS[idx]
  const question = t.questions[key]
  const progress = done ? 100 : step < 0 ? 0 : (step / total) * 100

  return (
    <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-8">
      {/* alone giallo dietro la card */}
      <div aria-hidden className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand-yellow/10 blur-3xl" />

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-yellow">{q.tag}</p>
        {step >= 0 && !done && (
          <span className="rounded-full border border-white/10 bg-brand-black/50 px-3 py-1.5 text-[11px] font-semibold text-white/60">
            <span className="font-display font-extrabold text-brand-yellow">{step + 1}</span> {q.progress} {total}
          </span>
        )}
      </div>

      {/* barra di avanzamento */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-brand-yellow transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="min-h-[19rem] sm:min-h-[21rem]">
        <AnimatePresence mode="wait">
          {step < 0 ? (
            <motion.div
              key="opening"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex min-h-[19rem] flex-col justify-center sm:min-h-[21rem]"
            >
              <h2 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">{q.openingTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{q.openingBody}</p>
              <button type="button" onClick={onStart} className="btn-primary mt-7 w-full">
                {q.start}
              </button>
            </motion.div>
          ) : done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex min-h-[19rem] flex-col items-center justify-center text-center sm:min-h-[21rem]"
            >
              <DoneMark />
              <p className="mt-5 text-sm font-semibold text-white/70">{t.result.eyebrow} ↓</p>
            </motion.div>
          ) : (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex min-h-[19rem] flex-col sm:min-h-[21rem]"
              aria-live="polite"
            >
              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">{question.area}</p>
              <h2 className="mt-3 font-display text-xl font-extrabold leading-tight sm:text-2xl">{question.q}</h2>

              <div className="mt-auto space-y-2.5 pt-7">
                {['yes', 'partial', 'no'].map((value) => {
                  const active = answers[key] === value
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => onAnswer(value)}
                      className={[
                        'flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-bold uppercase tracking-wider transition',
                        active
                          ? 'border-brand-yellow bg-brand-yellow text-brand-black'
                          : 'border-white/10 bg-white/[0.03] text-white/75 hover:border-brand-yellow/60 hover:bg-brand-yellow/[0.06] hover:text-white',
                      ].join(' ')}
                    >
                      {q.answers[value]}
                      <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-50" fill="none">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button type="button" onClick={onBack} className="text-xs font-semibold text-white/45 transition hover:text-white">
                    {q.back}
                  </button>
                ) : (
                  <span />
                )}
                <p className="text-right text-[11px] leading-snug text-white/30">{q.note}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* RISULTATO — punteggio + zona + falle (le prime gated) + gate         */
/* ------------------------------------------------------------------ */
function ResultReport({ t, lang, report, unlocked, onUnlock, onRestart }) {
  const r = t.result
  const zone = r.zones[report.zone]
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  // la prima falla è in chiaro (dà valore subito), le altre restano dietro al gate
  const freeGaps = unlocked ? report.gaps : report.gaps.slice(0, 1)
  const lockedGaps = unlocked ? [] : report.gaps.slice(1)

  return (
    <div className="container-x pb-20 pt-4 sm:pb-28">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-brand-dark/70 p-6 shadow-2xl backdrop-blur-md sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="eyebrow">{r.eyebrow}</span>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/50 transition hover:border-white/40 hover:text-white"
          >
            {r.restart}
          </button>
        </div>
        {unlocked && (
          <p className="mt-2 text-xs text-white/45">
            {unlocked.azienda || '—'} · {today}
          </p>
        )}

        {/* punteggio + verdetto */}
        <div className="mt-5 grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/45">{r.scoreLabel}</p>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-5xl font-extrabold leading-none">{report.score}</span>
              <span className="mb-1 text-sm text-white/40">/100</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-brand-yellow transition-all" style={{ width: `${report.score}%` }} />
            </div>
            <p className="mt-2 text-xs font-semibold text-brand-yellow">{zone.label}</p>
            {BENCHMARK && (
              <p className="mt-3 border-t border-white/10 pt-3 text-[11px] text-white/40">
                {r.benchmarkLabel}: <span className="font-display font-extrabold text-white/70">{BENCHMARK.avg}</span>
                <span className="block text-white/25">{BENCHMARK.source}</span>
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-brand-yellow/20 bg-brand-yellow/[0.06] p-5">
            <p className="text-base leading-relaxed text-white/80">{zone.verdict}</p>
          </div>
        </div>

        {/* falle */}
        <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellow">{r.gapsEyebrow}</p>
        {report.gaps.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/70">{r.gapsNone}</p>
        ) : (
          <div className="mt-3 space-y-3">
            {freeGaps.map((g, i) => (
              <GapRow key={g.key} n={i + 1} copy={t.questions[g.key]} severe={g.weight === 2} />
            ))}
            {lockedGaps.length > 0 && (
              <div className="relative">
                <div className="pointer-events-none select-none space-y-3 blur-[7px]" aria-hidden>
                  {lockedGaps.map((g, i) => (
                    <GapRow key={g.key} n={freeGaps.length + i + 1} copy={t.questions[g.key]} severe={g.weight === 2} />
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark/90" />
                <p className="absolute inset-x-0 bottom-3 text-center text-[11px] font-bold uppercase tracking-widest text-white/50">
                  {r.lockedHint}
                </p>
              </div>
            )}
          </div>
        )}

        {report.missesEconomics && (
          <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/60">
            {r.economicsNote}
          </p>
        )}

        {/* gate oppure mosse + CTA call */}
        {unlocked ? <UnlockedExtra t={t} report={report} /> : <GateForm t={t} report={report} onUnlock={onUnlock} />}

        <p className="mt-5 text-center text-[10px] uppercase tracking-[0.18em] text-white/30">{r.honestNote}</p>
      </div>
    </div>
  )
}

function GapRow({ n, copy, severe }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span
          className={[
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold',
            severe ? 'bg-brand-yellow text-brand-black' : 'border border-brand-yellow/40 text-brand-yellow',
          ].join(' ')}
        >
          {n}
        </span>
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-base font-extrabold sm:text-lg">{copy.gap}</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">{copy.area}</span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-white/65">{copy.why}</p>
        </div>
      </div>
    </div>
  )
}

function GateForm({ t, report, onUnlock }) {
  const g = t.gate
  const [form, setForm] = useState({ nome: '', azienda: '', email: '', telefono: '', privacy: false })
  const [status, setStatus] = useState('idle')
  const onChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  useEffect(() => {
    track('calc_lead_gate_visualizzato', { mechanic: MECHANIC, score: report.score })
  }, [report.score])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // le falle in chiaro nella mail: chi risponde al lead sa già da dove partire in call
    const gapList = report.gaps.map((gp) => t.questions[gp.key].gap).join('; ') || '—'
    try {
      await sendLeadEmail({
        ...form,
        messaggio: `Scorecard di crescita · punteggio: ${report.score}/100 · zona: ${report.zone} · falle: ${gapList}`,
      })
      pushLeadFormEvent({
        form,
        formId: 'scorecard_gate',
        formLocation: 'landing_calcolatore',
        sorgente: 'Landing Calcolatore - Scorecard di crescita',
        extraProps: { Punteggio: report.score, Zona: report.zone, Falle: gapList },
      })
      onUnlock(form)
    } catch (err) {
      console.error('EmailJS error', err)
      setStatus('error')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-brand-yellow/25 bg-brand-black/50 p-5 sm:p-7">
      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellow">{g.eyebrow}</span>
      <h3 className="mt-2 font-display text-xl font-extrabold leading-tight sm:text-2xl">{g.title}</h3>
      <p className="mt-1.5 text-sm text-white/60">{g.sub}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <GateField label={g.fields.nome.label} name="nome" value={form.nome} onChange={onChange} placeholder={g.fields.nome.placeholder} required />
        <GateField label={g.fields.azienda.label} name="azienda" value={form.azienda} onChange={onChange} placeholder={g.fields.azienda.placeholder} required />
        <GateField label={g.fields.email.label} name="email" type="email" value={form.email} onChange={onChange} placeholder={g.fields.email.placeholder} required />
        <GateField label={g.fields.telefono.label} name="telefono" type="tel" value={form.telefono} onChange={onChange} placeholder={g.fields.telefono.placeholder} required />
      </div>

      <label className="mt-4 flex items-start gap-3 text-left text-xs leading-relaxed text-white/60">
        <input type="checkbox" name="privacy" checked={form.privacy} onChange={onChange} required className="mt-0.5 h-4 w-4 shrink-0 accent-brand-yellow" />
        <span>
          {g.privacyPre}{' '}
          <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-yellow">
            {g.privacyLink}
          </a>
          {g.privacyPost}
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'sending' ? g.submitSending : status === 'error' ? g.submitError : g.submit}
      </button>
      {status === 'error' && (
        <p className="mt-3 text-center text-xs text-red-400">
          {g.errorMsg} <a href="mailto:info@twobee.it" className="underline">info@twobee.it</a>.
        </p>
      )}
    </form>
  )
}

function GateField({ label, name, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/60">{label}</span>
      <input
        name={name}
        {...rest}
        className="w-full rounded-full border border-white/10 bg-brand-black/60 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30"
      />
    </label>
  )
}

// Sbloccato: le mosse consigliate (una per falla) + CTA alla call. Il CTA funnela
// al calendario on-page (#prenota), NON alla home #contatti (parità con /flappybee).
function UnlockedExtra({ t, report }) {
  const call = t.call
  const onBook = () => {
    track('landing_book_cta', { variant: VARIANT, source: 'result' })
    scrollToBooking()
  }
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }} className="mt-7">
      {report.gaps.length > 0 && (
        <>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-yellow">{t.result.stepsTitle}</p>
          <ol className="mt-3 space-y-2.5">
            {report.gaps.map((g, i) => (
              <li key={g.key} className="flex items-start gap-3 text-sm text-white/75">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow font-display text-xs font-extrabold text-brand-black">
                  {i + 1}
                </span>
                {t.questions[g.key].fix}
              </li>
            ))}
          </ol>
        </>
      )}

      <div className="mt-7 rounded-2xl bg-brand-yellow p-5 text-center text-brand-black sm:p-7">
        <h3 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">{call.heading}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-brand-black/75">{call.sub}</p>
        <button
          type="button"
          onClick={onBook}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.03]"
        >
          {call.button}
        </button>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* COSA RICEVI + CHI SIAMO — page-local, copy a tema-diagnosi.          */
/* ------------------------------------------------------------------ */
function WhatYouGet() {
  const lang = useLang()
  const t = COPY[lang].receive
  return (
    <section className="section-y bg-brand-black">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">{t.heading}</h2>
          <div className="mt-8 space-y-4">
            {t.items.map((it) => (
              <div key={it.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-black">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base font-extrabold sm:text-lg">{it.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{it.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-[0.08]"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', background: '#FFC501' }}
          />
          <span className="eyebrow">{t.whoEyebrow}</span>
          <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{t.whoTitle}</h3>
          <p className="mt-4 text-base leading-relaxed text-white/70">{t.whoBody}</p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CHECKLIST IDONEITÀ — page-local.                                    */
/* ------------------------------------------------------------------ */
function Fit() {
  const lang = useLang()
  const t = COPY[lang].fit
  return (
    <section
      data-bg-light
      className="relative z-10 rounded-t-[2.5rem] bg-white shadow-[0_-30px_60px_-25px_rgba(0,0,0,0.55)] sm:rounded-t-[3rem]"
      style={{ '--theme-fg': '#0B0B0C', '--theme-bg': '#FFFFFF' }}
    >
      <div className="container-x section-y">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-brand-black sm:text-4xl md:text-5xl">{t.heading}</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-brand-yellow bg-brand-yellow/[0.08] p-7">
            <h3 className="font-display text-lg font-extrabold text-brand-black">{t.forTitle}</h3>
            <ul className="mt-4 space-y-3">
              {t.forItems.map((it) => (
                <li key={it} className="flex items-start gap-3 text-sm text-brand-black/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-black text-brand-yellow">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-brand-black/10 bg-brand-black/[0.02] p-7">
            <h3 className="font-display text-lg font-extrabold text-brand-black/70">{t.notForTitle}</h3>
            <ul className="mt-4 space-y-3">
              {t.notForItems.map((it) => (
                <li key={it} className="flex items-start gap-3 text-sm text-brand-black/55">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-black/25 text-brand-black/40">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CTA FINALE — page-local, torna alla scorecard in cima.               */
/* ------------------------------------------------------------------ */
function FinalCta() {
  const lang = useLang()
  const t = COPY[lang].finalCta
  const scrollTop = () => {
    const el = document.getElementById('top')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section className="relative overflow-hidden bg-brand-yellow text-brand-black">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-12 h-72 w-72 opacity-15 sm:h-96 sm:w-96"
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', background: 'rgba(0,0,0,0.4)' }}
      />
      <div className="container-x relative py-20 text-center md:py-28">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-black/70 sm:text-sm">{t.eyebrow}</span>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
          {t.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base font-medium sm:text-lg">{t.body}</p>
        <button
          type="button"
          onClick={scrollTop}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-brand-black px-10 py-5 text-base font-bold uppercase tracking-wider text-white shadow-[0_18px_60px_-12px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.03] sm:text-lg"
        >
          {t.button}
        </button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */
function FaqSection() {
  const lang = useLang()
  const t = COPY[lang].faq
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <section className="section-y bg-brand-black">
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t.headingPre}
            <span className="text-brand-yellow">{t.headingHl}</span>
          </h2>
          <p className="mt-4 text-base text-white/65">{t.body}</p>
        </div>
        <div className="space-y-3">
          {t.faqs.map((f, i) => (
            <FaqItem key={f.q} faq={f} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqItem({ faq, open, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/[0.05]">
        <span className="font-display text-base font-extrabold sm:text-lg">{faq.q}</span>
        <span
          className={[
            'flex h-8 w-8 flex-none items-center justify-center rounded-full border border-brand-yellow/40 transition',
            open ? 'rotate-180 bg-brand-yellow text-brand-black' : 'text-brand-yellow',
          ].join(' ')}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm leading-relaxed text-white/70">{faq.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
