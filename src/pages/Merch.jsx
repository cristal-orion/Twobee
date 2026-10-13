/* Hallmark · macrostructure: Manifesto · genre: playful-bold · theme: existing TwoBee brand
 * nav: shared Navbar with N7 solid-slab treatment on Merch only · footer: Ft5 statement + shared Footer
 * enrichment: Tier A hangtag + Tier B original SVG apparel/bee illustrations, not catalogue products
 * motion: orchestrated entrance · four-second ribbon intro · press feedback
 * audience: marketing and creatives · use: preview approved merch, no checkout yet
 * pre-emit critique: P4 H5 E4 S5 R4 V5
 */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import CookieBanner from '../components/CookieBanner.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { MERCH_CATEGORIES, MERCH_PRODUCTS } from './merchData.js'
import './merch.css'

gsap.registerPlugin(useGSAP)

const COPY = {
  it: {
    body: 'Magliette, cappellini e accessori per chi prende sul serio il lavoro. Un po’ meno se stesso.',
    explore: 'Sbircia il merch',
    sticker: ['NON È', 'UN ALTRO', 'BRIEF.'],
    tagNote: 'Da indossare.',
    tagNoteSecond: 'Non da approvare.',
    ribbon: ['MENO CALL', 'PIÙ COTONE', 'BRIEF OFF', 'MERCH ON'],
    catalogTitle: 'Il merch.\nNon il solito gadget.',
    catalogBody: 'Scritte da vita d’agenzia, immagini poco serie, cose da portarsi in giro. Ecco le prime anteprime della selezione.',
    preview: 'Anteprima',
    purchaseNote: 'Acquisti non ancora attivi.',
    previewCount: (count) => `${count} ${count === 1 ? 'prodotto' : 'prodotti'} in anteprima.`,
    categoryLabel: 'Categorie del merch',
    categories: { all: 'Tutto', tees: 'Magliette', caps: 'Cappellini', accessories: 'Accessori' },
    emptyTitle: 'Il primo drop è\nin lavorazione.',
    empty: {
      all: 'Le idee ci sono. Stiamo scegliendo quali mettere su magliette, cappellini e accessori. Qui troverai i prodotti, appena pronti.',
      tees: 'Le magliette sono in preparazione. Stiamo scegliendo le frasi e le grafiche: le troverai qui, appena pronte.',
      caps: 'Le idee in testa non mancano. I cappellini sono in preparazione: qui arriveranno modelli e grafiche.',
      accessories: 'Piccoli oggetti, grandi inside joke. Stiamo preparando gli accessori: li troverai qui, appena pronti.',
    },
    status: 'Nessun prodotto disponibile, per ora.',
    idea: 'Hai una frase da merch?',
    ideaLink: 'Raccontacela',
    emailSubject: 'Un’idea per il merch TwoBee',
    closing: ['SERIOUS WORK.', 'UNSERIOUS MERCH.'],
    closingNote: 'Le call finiscono. Le battute restano.',
    skip: 'Vai al catalogo merch',
  },
  en: {
    body: 'T-shirts, caps and accessories for people who take their work seriously. Themselves? Not so much.',
    explore: 'Peek at the merch',
    sticker: ['NOT', 'ANOTHER', 'BRIEF.'],
    tagNote: 'Made to wear.',
    tagNoteSecond: 'Not to approve.',
    ribbon: ['FEWER CALLS', 'MORE COTTON', 'BRIEF OFF', 'MERCH ON'],
    catalogTitle: 'The merch.\nNot another corporate freebie.',
    catalogBody: 'Agency-life jokes, unserious graphics, things to take outside. Here are the first previews of the collection.',
    preview: 'Preview',
    purchaseNote: 'Purchases are not available yet.',
    previewCount: (count) => `${count} product ${count === 1 ? 'preview' : 'previews'}.`,
    categoryLabel: 'Merch categories',
    categories: { all: 'All', tees: 'T-shirts', caps: 'Caps', accessories: 'Accessories' },
    emptyTitle: 'The first drop is\nin the works.',
    empty: {
      all: 'The ideas are here. We’re choosing which ones belong on tees, caps and accessories. You’ll find the products here when they’re ready.',
      tees: 'The tees are in the works. We’re choosing the words and graphics: you’ll find them here when they’re ready.',
      caps: 'Plenty of ideas on our minds. The caps are in the works: designs and graphics will appear here.',
      accessories: 'Small objects, big inside jokes. We’re putting the accessories together: you’ll find them here when they’re ready.',
    },
    status: 'No products available just yet.',
    idea: 'Got a line that belongs on a tee?',
    ideaLink: 'Tell us',
    emailSubject: 'An idea for TwoBee merch',
    closing: ['SERIOUS WORK.', 'UNSERIOUS MERCH.'],
    closingNote: 'The calls end. The jokes live on.',
    skip: 'Skip to the merch catalogue',
  },
}

function Arrow({ down = false }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={down ? 'merch-arrow merch-arrow--down' : 'merch-arrow'}><path d="M4 12h15M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

// Original editorial drawings: these are category symbols, not product mockups.
function CategoryArt({ category, className = '' }) {
  return (
    <svg className={`merch-category-art ${className}`} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      {category === 'tees' ? <>
        <path className="merch-art-paper" d="m62 37-43 34 24 34 22-13-7 72q42 14 84 0l-7-72 22 13 24-34-43-34q-38 23-76 0Z" />
        <path d="M77 43q23 30 46 0M63 92l3-33m71 33-3-33M75 151q25 7 50 0" />
        <circle className="merch-art-yellow" cx="100" cy="106" r="22" />
        <path d="M90 110q10 12 20 0m-18-12v3m16-3v3" />
      </> : category === 'caps' ? <>
        <path className="merch-art-yellow" d="M39 116q-4-74 61-74t61 74q-60 16-122 0Z" />
        <path className="merch-art-paper" d="M39 116q-24 26 47 39 58 9 93-18l-18-21q-60 16-122 0Z" />
        <path d="M100 44q-18 27-12 77m13-79q31 19 34 78M74 140q48 14 83-2" />
        <path d="m109 77 4 10 11 2-8 8 1 11-10-5-10 5 2-11-8-8 11-2Z" />
      </> : <>
        <path className="merch-art-paper" d="m42 70-8 96q68 15 132 0l-8-96Z" />
        <path d="M75 75V53q0-31 25-31t25 31v22m-39-1V55q0-19 14-19t14 19v19M48 150q51 11 103 0" />
        <circle className="merch-art-yellow" cx="100" cy="115" r="25" />
        <path d="m88 110 7 4-7 4m24-8-7 4 7 4m-23 10q11 11 22 0" />
      </>}
    </svg>
  )
}

function BeeFace() {
  return (
    <svg viewBox="0 0 220 180" className="merch-bee-face" fill="none" aria-hidden="true">
      <path className="merch-art-paper" d="M62 85C3 56 24 1 66 23c25 14 31 37 36 60m55 2c59-29 38-84-4-62-25 14-31 37-36 60" />
      <ellipse className="merch-art-yellow" cx="110" cy="108" rx="75" ry="63" />
      <path d="M50 72c-8-26-20-30-28-30m148 30c8-26 20-30 28-30" />
      <path className="merch-art-ink" d="M57 92h45v13c0 26-40 27-44 1Zm61 0h45l-1 14c-4 26-44 25-44-1Z" />
      <path d="M102 98q8-7 16 0M51 92h119M83 138q27 22 54-2" />
      <path className="merch-glasses-shine" d="m70 99 9 0m51 0h9" />
    </svg>
  )
}

function MerchArtwork({ t }) {
  return (
    <div className="merch-artwork" aria-hidden="true">
      <div className="merch-art-orbit" />
      <div className="merch-art-piece merch-art-tee"><CategoryArt category="tees" /></div>
      <div className="merch-art-piece merch-art-cap"><CategoryArt category="caps" /></div>
      <div className="merch-tag-wrap merch-art-piece">
        <div className="merch-tag-string" />
        <div className="merch-tag">
          <span className="merch-tag-logo">two<span>bee</span></span>
          <BeeFace />
          <span className="merch-tag-headline">BEE<br />YOURSELF.</span>
          <div className="merch-tag-caption"><span>{t.tagNote}</span><span>{t.tagNoteSecond}</span></div>
          <div className="merch-barcode"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </div>
      </div>
      <div className="merch-sticker merch-art-piece">{t.sticker.map((line) => <span key={line}>{line}</span>)}</div>
      <svg className="merch-art-scribble" viewBox="0 0 125 85" fill="none"><path d="M7 32C51 2 83 6 72 28S9 66 23 72s51-5 69-25m-5-14 14 5-3 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  )
}

export default function MerchPage() {
  const lang = useLang()
  const t = COPY[lang]
  const root = useRef(null)
  const ribbon = useRef(null)
  const [category, setCategory] = useState('all')
  const [motionAllowed, setMotionAllowed] = useState(false)
  const [ribbonVisible, setRibbonVisible] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotionAllowed(!query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setRibbonVisible(entry.isIntersecting))
    if (ribbon.current) observer.observe(ribbon.current)
    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({ defaults: { duration: 0.7, ease: 'power4.out' } })
      timeline
        .from('.merch-title-line > span', { yPercent: 105, rotation: 3, stagger: 0.1 }, 0)
        .from('.merch-hero-intro, .merch-hero-bottom', { opacity: 0, y: 16, stagger: 0.08, duration: 0.45 }, 0.3)
        .from('.merch-art-piece', { opacity: 0, y: 45, scale: 0.86, stagger: 0.07 }, 0.2)
        .from('.merch-art-orbit, .merch-art-scribble', { opacity: 0, duration: 0.4 }, 0.6)
    }, root)
    return () => media.revert()
  }, { scope: root })

  const explore = (event) => {
    const catalog = document.getElementById('merch-catalogo')
    if (!catalog) return
    event.preventDefault()
    catalog.scrollIntoView({ behavior: motionAllowed ? 'smooth' : 'instant', block: 'start' })
    window.history.replaceState(null, '', '#merch-catalogo')
    catalog.focus({ preventScroll: true })
  }

  // Deep links are restored after the lazy-loaded route has mounted.
  useEffect(() => {
    if (window.location.hash === '#merch-catalogo') {
      document.getElementById('merch-catalogo')?.scrollIntoView({ block: 'start' })
    }
  }, [])

  const mailto = `mailto:info@twobee.it?subject=${encodeURIComponent(t.emailSubject)}`
  const products = MERCH_PRODUCTS.filter((product) => category === 'all' || product.category === category)

  return (
    <div className="merch-page" ref={root} id="top">
      <a className="merch-skip" href="#merch-catalogo" onClick={explore}>{t.skip}</a>
      <Navbar subpage />
      <main>
        <section className="merch-hero" aria-labelledby="merch-title">
          <div className="merch-shell">
            <div className="merch-hero-intro"><span className="merch-wordmark">MERCH<span className="merch-wordmark-star" aria-hidden="true">✳</span></span></div>
            <div className="merch-hero-stage">
              <h1 className="merch-title" id="merch-title"><span className="merch-title-line"><span>BRIEF OFF.</span></span><span className="merch-title-line merch-title-line--outline"><span>MERCH ON.</span></span></h1>
              <MerchArtwork t={t} />
            </div>
            <div className="merch-hero-bottom">
              <div className="merch-hero-copy"><p>{t.body}</p><a className="merch-primary" href="#merch-catalogo" onClick={explore}>{t.explore}<Arrow down /></a></div>
            </div>
          </div>
        </section>

        <div className="merch-ribbon" ref={ribbon}>
          <div className="merch-ribbon-window" aria-hidden="true">
            <div className={`merch-ribbon-track${!motionAllowed || !ribbonVisible ? ' is-paused' : ''}`}>
              {[0, 1].map((copy) => <div className="merch-ribbon-group" key={copy}>{t.ribbon.map((word) => <span key={word}>{word}<span className="merch-ribbon-star">✳</span></span>)}</div>)}
            </div>
          </div>
        </div>

        <section className="merch-catalog" id="merch-catalogo" tabIndex={-1} aria-labelledby="merch-catalog-title">
          <div className="merch-shell">
            <header className="merch-catalog-heading"><h2 id="merch-catalog-title">{t.catalogTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2><p>{t.catalogBody}</p></header>
            <div className="merch-filters" role="group" aria-label={t.categoryLabel}>
              {MERCH_CATEGORIES.map((id) => <button type="button" key={id} className={`merch-filter${category === id ? ' is-selected' : ''}`} aria-pressed={category === id} aria-controls="merch-catalog-content" onClick={() => setCategory(id)}>{category === id && <span aria-hidden="true">↗</span>}{t.categories[id]}</button>)}
            </div>
            <div id="merch-catalog-content" className="merch-product-list">
              <p className="sr-only" role="status">{products.length ? t.previewCount(products.length) : t.status}</p>
              {products.length ? products.map((product) => (
                <article className="merch-product" key={product.id} aria-labelledby={`merch-product-${product.id}`}>
                  <div className="merch-product-photo">
                    <img src={product.image} alt={product.alt[lang]} width="1024" height="1024" loading="lazy" decoding="async" />
                  </div>
                  <div className="merch-product-copy">
                    <span className="merch-product-category">{t.categories[product.category]}</span>
                    <h3 id={`merch-product-${product.id}`}>{product.name}</h3>
                    <p className="merch-product-description">{product.description[lang]}</p>
                    {product.aside && <p className="merch-product-aside">{product.aside[lang]}</p>}
                    <div className="merch-product-availability"><span className="merch-product-preview">{t.preview}</span><span>{t.purchaseNote}</span></div>
                  </div>
                </article>
              )) : <div className="merch-empty">
              <div className="merch-empty-art" aria-hidden="true"><span className="merch-empty-ghost">SOON.</span><CategoryArt category={category === 'all' ? 'tees' : category} /><span className="merch-empty-label">WORK IN PROGRESS</span></div>
              <div className="merch-empty-copy"><span className="merch-status"><span aria-hidden="true" />{t.status}</span><h3>{t.emptyTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h3><p aria-live="polite" aria-atomic="true">{t.empty[category]}</p><div className="merch-idea"><span>{t.idea}</span><a href={mailto}>{t.ideaLink}<Arrow /></a></div></div>
              </div>}
            </div>
          </div>
        </section>

        <section className="merch-closing" aria-label="TwoBee Merch">
          <div className="merch-shell"><p className="merch-closing-title">{t.closing.map((line, index) => <span key={line} className={index === 1 ? 'merch-closing-accent' : ''}>{line}</span>)}</p><p className="merch-closing-note">{t.closingNote}<span aria-hidden="true">↗</span></p></div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
