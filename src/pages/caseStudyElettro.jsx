/* ELETTRO, l'agente AI nel CRM di Elettra Group (facsimile a codice)
 * -----------------------------------------------------------------
 * Prende il posto dello screenshot del cruscotto (2026-10-29): il caso Elettra
 * adesso racconta Elettro, l'agente che segue il lavoro dal contatto alla
 * commessa al cantiere. La schermata è la chat, e l'agente risponde con
 * interfaccia vera dentro il messaggio, non solo con testo: elenco dei
 * cantieri con avanzamento e stato, un avviso con le azioni, il riepilogo di
 * cosa fatturare. È l'idea della "generative UI" (openui.com): il modello
 * sceglie i componenti, l'app li disegna.
 *
 * TUTTI I DATI SONO DI ESEMPIO: cantieri, luoghi, squadre e importi sono
 * inventati, e la didascalia in caseStudiesData.js lo dichiara. I colori sono
 * quelli del CRM vero (blu notte in sidebar, blu acciaio sulle barre), così il
 * facsimile si riconosce accanto agli altri.
 */

const C = {
  navy: '#13233f',
  navySoft: '#1d3157',
  blue: '#1d5c8f',
  blueTint: '#e3edf6',
  paper: '#f4f6f9',
  surface: '#ffffff',
  ink: '#16202e',
  inkSoft: '#3c4757',
  muted: '#5d6878',
  line: 'rgba(22, 32, 46, 0.10)',
  green: '#17773f',
  greenTint: '#dcf3e5',
  amber: '#8f5709',
  amberTint: '#fcefd6',
  violet: '#4a4fb5',
  violetTint: '#e6e7fa',
}

const STATUS = {
  ok: { bg: C.greenTint, fg: C.green },
  wait: { bg: C.amberTint, fg: C.amber },
  test: { bg: C.blueTint, fg: C.blue },
  start: { bg: C.violetTint, fg: C.violet },
}

const COPY = {
  it: {
    brand: 'Elettra CRM',
    nav: ['Cruscotto', 'Anagrafiche', 'Commesse', 'Cantieri', 'Ordini', 'Elettro'],
    agent: 'Elettro',
    agentRole: 'Agente AI',
    online: 'Attivo',
    ask: 'A che punto sono i cantieri questa settimana?',
    answer: 'Hai 4 cantieri aperti: tre sono in linea, uno aspetta materiale.',
    tableTitle: 'Cantieri aperti',
    tableSub: 'Aggiornato oggi alle 8:40',
    cols: ['Cantiere', 'Avanzamento', 'Stato', 'Fine'],
    sites: [
      { name: 'Fotovoltaico 60 kW', where: 'Capannone, Nola · Squadra A', pct: 72, status: 'ok', label: 'In linea', end: '14 nov' },
      { name: 'Quadri elettrici', where: 'Scuola, Afragola · Squadra B', pct: 45, status: 'wait', label: 'Attesa materiale', end: '21 nov' },
      { name: 'Impianto civile', where: 'Villa, Pozzuoli · Squadra C', pct: 92, status: 'test', label: 'Collaudo', end: '31 ott' },
      { name: 'Revamping FV', where: 'Caseificio, Aversa · Squadra A', pct: 18, status: 'start', label: 'Avviato', end: '12 dic' },
    ],
    alertTitle: 'Quadri elettrici · Scuola, Afragola',
    alertBody: 'Il fornitore ha spostato la consegna dei quadri al 6 novembre: il cantiere slitta di 3 giorni.',
    alertActions: ['Avvisa il cliente', 'Apri la commessa'],
    billTitle: 'Da fatturare',
    billValue: '38.400 €',
    billSub: '2 commesse chiuse questa settimana',
    billAction: 'Prepara le fatture',
    suggestions: ['Nuovo preventivo', 'Materiali in ritardo', 'Squadre libere domani'],
    input: 'Chiedi a Elettro…',
  },
  en: {
    brand: 'Elettra CRM',
    nav: ['Dashboard', 'Contacts', 'Jobs', 'Sites', 'Orders', 'Elettro'],
    agent: 'Elettro',
    agentRole: 'AI agent',
    online: 'Active',
    ask: 'How are the sites doing this week?',
    answer: 'You have 4 open sites: three are on track, one is waiting for material.',
    tableTitle: 'Open sites',
    tableSub: 'Updated today at 8:40',
    cols: ['Site', 'Progress', 'Status', 'Ends'],
    sites: [
      { name: 'Solar 60 kW', where: 'Warehouse, Nola · Crew A', pct: 72, status: 'ok', label: 'On track', end: '14 Nov' },
      { name: 'Switchboards', where: 'School, Afragola · Crew B', pct: 45, status: 'wait', label: 'Awaiting material', end: '21 Nov' },
      { name: 'Home wiring', where: 'Villa, Pozzuoli · Crew C', pct: 92, status: 'test', label: 'Testing', end: '31 Oct' },
      { name: 'Solar revamp', where: 'Dairy, Aversa · Crew A', pct: 18, status: 'start', label: 'Started', end: '12 Dec' },
    ],
    alertTitle: 'Switchboards · School, Afragola',
    alertBody: 'The supplier moved the switchboard delivery to 6 November: the site slips by 3 days.',
    alertActions: ['Tell the client', 'Open the job'],
    billTitle: 'Ready to invoice',
    billValue: '€38,400',
    billSub: '2 jobs closed this week',
    billAction: 'Draft the invoices',
    suggestions: ['New quote', 'Late materials', 'Free crews tomorrow'],
    input: 'Ask Elettro…',
  },
}

function AgentMark({ size = 28 }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-lg"
      style={{ width: size, height: size, background: C.navy }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none">
        <path d="M13 2.5 5.5 13.5H11l-1 8 7.5-11H12l1-8Z" fill="#FFC501" />
      </svg>
    </span>
  )
}

export function ElettroPanel({ lang }) {
  const t = COPY[lang] || COPY.it

  return (
    <div
      data-ui
      aria-label={`${t.agent}, ${t.agentRole}`}
      className="overflow-hidden rounded-2xl"
      style={{ background: C.paper, border: `1px solid ${C.line}`, color: C.ink }}
    >
      <div className="flex">
        {/* navigazione del CRM, come nel gestionale vero */}
        <aside className="hidden w-44 shrink-0 flex-col px-3 py-4 md:flex" style={{ background: C.navy }}>
          <span className="px-2 text-[11px] font-bold tracking-wide" style={{ color: '#9fb3d1' }}>
            {t.brand}
          </span>
          <ul className="mt-4 space-y-1">
            {t.nav.map((n, i) => {
              const active = i === t.nav.length - 1
              return (
                <li
                  key={n}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px]"
                  style={active ? { background: C.navySoft, color: '#fff', fontWeight: 700 } : { color: '#c3cfe0' }}
                >
                  {active ? (
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
                      <path d="M13 2.5 5.5 13.5H11l-1 8 7.5-11H12l1-8Z" fill="#FFC501" />
                    </svg>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#5f7598' }} />
                  )}
                  {n}
                </li>
              )
            })}
          </ul>
        </aside>

        <div className="min-w-0 flex-1">
          {/* testata della chat */}
          <div
            className="flex items-center gap-2.5 px-4 py-3"
            style={{ background: C.surface, borderBottom: `1px solid ${C.line}` }}
          >
            <AgentMark />
            <div className="min-w-0">
              <p className="text-[13px] font-extrabold leading-tight">{t.agent}</p>
              <p className="text-[11px] leading-tight" style={{ color: C.muted }}>{t.agentRole}</p>
            </div>
            <span
              className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
              style={{ background: C.greenTint, color: C.green }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.green }} />
              {t.online}
            </span>
          </div>

          <div className="space-y-3 px-3 py-4 sm:px-5">
            {/* domanda */}
            <p
              className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2 text-[13px] leading-snug"
              style={{ background: C.navy, color: '#fff' }}
            >
              {t.ask}
            </p>

            {/* risposta: testo + interfaccia */}
            <div className="flex gap-2.5">
              <AgentMark size={26} />
              <div className="min-w-0 flex-1 space-y-2.5">
                <p className="text-[13px] leading-snug" style={{ color: C.inkSoft }}>{t.answer}</p>

                {/* elenco cantieri con avanzamento */}
                <div className="overflow-hidden rounded-xl" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
                  <div className="flex items-baseline justify-between gap-3 px-3.5 pb-2 pt-3">
                    <p className="text-[13px] font-extrabold">{t.tableTitle}</p>
                    <p className="text-[11px]" style={{ color: C.muted }}>{t.tableSub}</p>
                  </div>
                  <div
                    className="hidden grid-cols-[1.6fr_1.3fr_1fr_0.5fr] gap-3 px-3.5 py-1.5 text-[10px] font-bold sm:grid"
                    style={{ color: C.muted, background: C.paper }}
                  >
                    {t.cols.map((c) => <span key={c}>{c}</span>)}
                  </div>
                  <ul>
                    {t.sites.map((s) => (
                      <li
                        key={s.name}
                        className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 px-3.5 py-2.5 sm:grid-cols-[1.6fr_1.3fr_1fr_0.5fr]"
                        style={{ borderTop: `1px solid ${C.line}` }}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[12px] font-bold">{s.name}</span>
                          <span className="block truncate text-[11px]" style={{ color: C.muted }}>{s.where}</span>
                        </span>
                        <span className="order-last col-span-2 flex items-center gap-2 sm:order-none sm:col-span-1">
                          <span className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: C.blueTint }}>
                            <span className="block h-full rounded-full" style={{ width: `${s.pct}%`, background: C.blue }} />
                          </span>
                          <span className="w-8 text-right text-[11px] font-bold tabular-nums">{s.pct}%</span>
                        </span>
                        <span
                          className="w-fit whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold"
                          style={{ background: STATUS[s.status].bg, color: STATUS[s.status].fg }}
                        >
                          {s.label}
                        </span>
                        <span className="hidden text-[11px] tabular-nums sm:block" style={{ color: C.inkSoft }}>{s.end}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-2.5 lg:grid-cols-[1.4fr_1fr]">
                  {/* avviso con le azioni */}
                  <div className="rounded-xl p-3.5" style={{ background: C.amberTint }}>
                    <p className="text-[12px] font-extrabold" style={{ color: C.amber }}>{t.alertTitle}</p>
                    <p className="mt-1 text-[12px] leading-snug" style={{ color: C.ink }}>{t.alertBody}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {/* colore scritto a mano: text-white sui capitoli chiari diventa nero (index.css) */}
                      <span className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold" style={{ background: C.navy, color: '#fff' }}>
                        {t.alertActions[0]}
                      </span>
                      <span
                        className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold"
                        style={{ background: C.surface, color: C.ink, border: `1px solid ${C.line}` }}
                      >
                        {t.alertActions[1]}
                      </span>
                    </div>
                  </div>

                  {/* cosa fatturare */}
                  <div className="rounded-xl p-3.5" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
                    <p className="text-[11px] font-bold" style={{ color: C.muted }}>{t.billTitle}</p>
                    <p className="mt-0.5 text-[22px] font-extrabold leading-none tabular-nums">{t.billValue}</p>
                    <p className="mt-1 text-[11px]" style={{ color: C.muted }}>{t.billSub}</p>
                    <span
                      className="mt-2.5 inline-block rounded-lg px-2.5 py-1.5 text-[11px] font-bold"
                      style={{ background: C.blueTint, color: C.blue }}
                    >
                      {t.billAction}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* suggerimenti e campo di testo */}
          <div className="px-3 pb-3 sm:px-5 sm:pb-4">
            <div className="flex flex-wrap gap-1.5">
              {t.suggestions.map((s) => (
                <span
                  key={s}
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{ background: C.surface, color: C.inkSoft, border: `1px solid ${C.line}` }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div
              className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5"
              style={{ background: C.surface, border: `1px solid ${C.line}` }}
            >
              <span className="flex-1 text-[12px]" style={{ color: C.muted }}>{t.input}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: C.navy }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                  <path d="M5 12h13M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
