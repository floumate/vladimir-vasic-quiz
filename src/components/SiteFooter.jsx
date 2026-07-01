import Star from './Star'

/*
 * Taman footer (petrol-deep) sa impressum blokom - deli se landing + kontakt.
 */
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Star size={18} />
          Vladimir Vasić · BBS Capital Investment Group
        </div>
        <div className="site-footer__links">
          <a href="pocetna.html">Početna</a> · <a href="kontakt.html">Kontakt</a> ·{' '}
          <a href="#privacy">Politika privatnosti</a>
        </div>
        <div className="site-footer__impressum">
          BBS Capital Investment Group d.o.o. Beograd-Novi Beograd · PIB 113895799 · Jurija
          Gagarina 227, 11070 Novi Beograd · office@vladimirvasic.com
        </div>
      </div>
    </footer>
  )
}
