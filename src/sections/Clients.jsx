import { useLang } from '../i18n/LanguageContext.jsx'

const EYEBROW = {
  it: 'Hanno scelto TwoBee',
  en: 'Trusted by',
}

export default function Clients() {
  const lang = useLang()
  const partners = [
    { name: 'Sartoria Condotti', logo: '/partner-sartoriacondotti.webp', url: 'https://www.sartoriacondotti.it/' },
    { name: 'iCura Impresa', logo: '/partner-icuraimpresa.webp', url: 'https://www.icuraimpresa.it/' },
    { name: 'Affinity', logo: '/partner-affinity.webp', url: 'https://www.affinitylab.it/' },
    { name: 'Elettra Group', logo: '/partner-elettragroup.webp', url: 'https://elettragroup.it/' },
    { name: 'Industrial Service e Facility', logo: '/partner-industrial-service.webp', url: 'https://www.industrialservicefacility.it/' },
    { name: 'Seven', logo: '/partner-seven.webp', url: 'https://www.sevenholding.it/' },
    { name: 'Plus Vending', logo: '/partner-plusvending.webp', url: 'https://plusvending.it/' },
  ]
  const loop = [...partners, ...partners]
  return (
    <section className="py-12">
      <div className="container-x">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          {EYEBROW[lang]}
        </p>
      </div>
      <div className="marquee" style={{ '--marquee-duration': '40s' }}>
        <div className="marquee-track">
          {loop.map((p, i) => (
            <a
              key={`${p.name}-${i}`}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.name}
              aria-hidden={i >= partners.length ? 'true' : undefined}
              tabIndex={i >= partners.length ? -1 : undefined}
              className="group mx-6 inline-flex shrink-0 items-center justify-center sm:mx-8 lg:mx-10"
            >
              <img
                src={p.logo}
                alt={i >= partners.length ? '' : p.name}
                loading="lazy"
                className="h-16 w-auto max-w-[160px] object-contain opacity-70 transition group-hover:opacity-100 sm:h-20 sm:max-w-[180px] lg:h-24 lg:max-w-[200px]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
