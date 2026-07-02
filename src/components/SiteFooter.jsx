import Star from './Star'

/*
 * Taman footer (petrol-deep) sa impressum blokom - deli se landing + kontakt.
 * Linkovi su kontekstualni po referenci klijenta: svaka strana linkuje na
 * DRUGU stranu (bez self-linka), plus Politika privatnosti + Impressum (anchor
 * na impressum blok ispod, u istom footeru).
 */
export default function SiteFooter({ page = 'landing' }) {
  const otherPage =
    page === 'landing' ? (
      <a href="kontakt.html">Kontakt</a>
    ) : (
      <a href="pocetna.html">Početna</a>
    )

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Star size={18} />
          Vladimir Vasić · BBS Capital Investment Group
        </div>
        <div className="site-footer__links">
          {otherPage} · <a href="#privacy">Politika privatnosti</a> ·{' '}
          <a href="#impressum">Impressum</a>
        </div>
        <div className="site-footer__impressum" id="impressum">
          BBS Capital Investment Group d.o.o. Beograd-Novi Beograd · PIB 113895799 · Jurija
          Gagarina 227, 11070 Novi Beograd · office@vladimirvasic.com
        </div>
      </div>
    </footer>
  )
}
