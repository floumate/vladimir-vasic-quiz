import Star from './Star'

/*
 * Sticky nav (blur pozadina) za landing + kontakt - logo + CTA na kviz.
 * Razlikuje se od BrandHeader (koji je za sam kviz - centriran, bez CTA).
 */
export default function SiteNav() {
  return (
    <nav className="landing-nav">
      <div className="landing-nav__inner">
        <a href="pocetna.html" className="landing-nav__brand">
          <Star size={22} />
          Vladimir Vasić
        </a>
        <div className="landing-nav__actions">
          <a href="kontakt.html" className="landing-nav__link">
            Kontakt
          </a>
          <a href="./" className="btn btn--gold btn--sm">
            Započni analizu
          </a>
        </div>
      </div>
    </nav>
  )
}
