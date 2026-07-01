import React from 'react'
import ReactDOM from 'react-dom/client'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import Star from './components/Star'
import './styles/global.css'

/*
 * Landing - redizajn po referenci klijenta (landing_kviz_vladimir.html).
 * Hero (2 kolone + vizuelna kartica) -> Bio (Vladimir, tamna kartica) ->
 * Šta dobijate -> FAQ -> CTA. CTA vodi na kviz ("./").
 */

const TRUST = ['Bez deljenja poverljivih brojeva', 'Rezultat odmah', 'Bez registracije']

const VALUE_CARDS = [
  {
    title: 'Score 0-100',
    body: 'Pregled stanja po 4 oblasti: tok novca, kreditna sposobnost, samostalnost firme i finansijska kontrola.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="var(--gold)" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Trenutno realno stanje',
    body: 'U zavisnosti od Vaših odgovora prepoznajemo najslabije tačke.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 18V8M10 18V5M16 18v-7M20 18H4"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Konkretni saveti',
    body: 'Pored rezultata dobijate jasne smernice za bolje finansijsko stanje u budućnosti.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v6m0 0 3-3m-3 3-3-3M5 13h14l-1.5 7.5a1 1 0 0 1-1 .5H7.5a1 1 0 0 1-1-.5L5 13Z"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

const FAQ = [
  {
    q: 'Moram li da unosim poverljive podatke firme?',
    a: 'Ne. Analiza ne traži nijedan finansijski podatak Vaše firme, samo odgovore na pitanja o tome kako firma funkcioniše.',
  },
  {
    q: 'Koliko traje analiza?',
    a: 'Manje od 2 minuta. Nekoliko kratkih pitanja posle kojih odmah dobijate vidljiv rezultat.',
  },
  {
    q: 'Šta tačno dobijam na kraju?',
    a: 'Score 0-100, pregled po 4 oblasti (tok novca, kreditna sposobnost, samostalnost firme, finansijska kontrola) i konkretne savete vezane za Vaš rezultat.',
  },
  {
    q: 'Da li analiza košta?',
    a: 'Ova analiza je potpuno besplatna, bez skrivenih troškova.',
  },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="18" height="18">
      <circle cx="10" cy="10" r="10" fill="var(--gold)" />
      <path
        d="M6 10.5 9 13l5-6"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Landing() {
  return (
    <div className="app landing-page">
      <SiteNav />
      <main className="landing-main">
        {/* Hero */}
        <section className="landing-hero-section">
          <div className="landing-container">
            <div className="hero-grid fade-in">
              <div>
                <span className="eyebrow">Finansijska analiza · 2 minuta</span>
                <p className="credline mt-16">
                  <b>22 godine u bankarstvu i finansijama</b>, radeći sa preko 200 firmi i
                  korporacija · osnivač BBS Capital Investment Group
                </p>
                <h1>Znate li gde Vaša firma gubi najviše novca?</h1>
                <p className="lead-text mt-16">
                  Za manje od 2 minuta dobićete jasnu sliku finansijskog zdravlja Vaše firme
                  i konkretne savete za buduće odluke.
                </p>
                <a href="./" className="btn btn--gold btn--lg mt-24">
                  Započni analizu →
                </a>
                <div className="trust-row">
                  {TRUST.map((t) => (
                    <div key={t} className="trust-row__item">
                      <CheckIcon />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-visual__star">
                  <Star size={180} color="rgba(194,163,107,0.14)" />
                </div>
                <div className="hero-visual__label">Vaš rezultat</div>
                <div className="hero-visual__num">0-100</div>
                <div className="hero-visual__sub">
                  Tok novca · Kreditna sposobnost · Samostalnost · Kontrola
                </div>
                <div className="hero-visual__bars">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio - tamna kartica (autoritet, "pattern interrupt") */}
        <section className="landing-section">
          <div className="landing-container">
            <div className="bio-card">
              <div className="bio-card__photo">
                Foto Vladimira
                <br />
                (stiže uskoro)
              </div>
              <div>
                <span className="eyebrow">Ko stoji iza analize</span>
                <h2 className="mt-16">Vladimir Vasić</h2>
                <p className="bio-card__p mt-16">
                  Diplomirani ekonomista sa 22-godišnjim iskustvom u finansijama i radu sa
                  preko 200 različitih firmi i korporacija.
                </p>
                <p className="bio-card__p mt-16">
                  Godinama sam bio na glavnim i vodećim pozicijama u nekima od najvećih
                  kompanija i banaka u regionu, od Societe Generale, BNP Paribas i Sberbanke,
                  preko Generali i Triglav osiguranja i Udruženja banaka Srbije, do Delta
                  Holdinga. Vodio sam timove od stotina ljudi, odlučivao ko ulazi u tim a ko
                  ne, gradio finansijske sisteme i bio na pozicijama na kojima se odlučuje o
                  sudbini firme, a ne samo o brojkama u izveštaju.
                </p>
                <p className="bio-card__p mt-16">
                  Danas to znanje stavljam na stranu vlasnika. Pomažem firmama da postave
                  jasne finansije i pravu strukturu, da vlasnik tačno zna gde ide novac,
                  koliko firma stvarno zarađuje i koji potezi je vode napred. Da odluke
                  donosi na osnovu brojeva, a ne po osećaju.
                </p>
                <p className="bio-card__p mt-16">
                  Cilj je da vlasnik prestane da radi 24/7 dok mu biznis stoji u mestu.
                  Postavljamo sisteme da bi firma rasla brže i sigurnije, izbegla krizu, a
                  ako je u njoj, da se iz iste izvuče.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Šta dobijate */}
        <section className="landing-section">
          <div className="landing-container">
            <div className="sec-head">
              <span className="eyebrow">Šta dobijate</span>
              <h2 className="mt-16">Jasnu finansijsku sliku Vaše firme</h2>
            </div>
            <div className="value-cards mt-32">
              {VALUE_CARDS.map((c) => (
                <div key={c.title} className="value-card">
                  <div className="value-card__icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="landing-section">
          <div className="landing-container">
            <div className="sec-head text-center faq-head">
              <h2>Najčešća pitanja</h2>
            </div>
            <div className="faq">
              {FAQ.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>
                    {item.q}
                    <span className="faq-plus">+</span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-32">
              <a href="./" className="btn btn--gold btn--lg">
                Započni analizu →
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>
)
