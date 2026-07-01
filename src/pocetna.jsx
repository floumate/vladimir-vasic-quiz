import React from 'react'
import ReactDOM from 'react-dom/client'
import BrandHeader from './components/BrandHeader'
import './styles/global.css'

/*
 * Landing (top-of-funnel) stranica - zaseban ulaz, ne dira postojeći kviz na
 * root-u. CTA vodi na kviz ("./"). Prva verzija za pregled.
 */

const SYMPTOMS = [
  'Ima meseci kada ponestane novca za plate ili dobavljače, iako firma naizgled dobro posluje.',
  'Kada vas neko pita koliko firma zaista zarađuje, odgovor znate tek kad računovođa pošalje izveštaj.',
  'Kad odete na odmor na dve nedelje, pola stvari u firmi staje bez vas.',
  'Niste sigurni da li bi vam banka sutra odobrila kredit.',
]

const STEPS = [
  {
    num: '01',
    title: 'Odgovorite',
    body: '7 kratkih pitanja o cash flow-u, bankabilnosti i sistemu firme. Dva minuta, bez registracije unapred.',
  },
  {
    num: '02',
    title: 'Dobijate score',
    body: 'Rezultat 0-100 i 4 trake koje pokazuju gde firma stoji - cash flow, bankabilnost, sistemska zrelost, finansijska svest.',
  },
  {
    num: '03',
    title: 'Vidite sledeći korak',
    body: 'Konkretni problemi na osnovu vaših odgovora - i, ako želite, besplatan razgovor o tome kako dalje.',
  },
]

function Landing() {
  return (
    <div className="app landing-page">
      <BrandHeader />
      <main className="app__main">
        <div className="landing-container">
          {/* Hero */}
          <section className="landing-hero landing-narrow text-center fade-in">
            <h1>
              Vaša firma radi.
              <br />
              Novac ipak nestaje.
            </h1>
            <p className="intro__lead mt-16">
              Besplatna finansijska dijagnoza za vlasnike firmi - 7 kratkih pitanja, 2
              minuta, i dobijate score 0-100 sa konkretnim tačkama na kojima gubite.
            </p>
            <a href="./" className="btn btn--gold btn--lg mt-24">
              Uradite besplatnu dijagnozu →
            </a>
            <p className="muted mt-16">Traje 2 minuta. Bez obaveza, bez cene.</p>
          </section>

          {/* Simptomi */}
          <section className="landing-section">
            <div className="card">
              <span className="eyebrow">Da li vam ovo zvuči poznato?</span>
              <h2 className="mt-16">Firma radi, a opet...</h2>
              <ul className="symptom-list mt-24">
                {SYMPTOMS.map((s) => (
                  <li key={s} className="symptom-item">
                    <span className="symptom-item__dot" aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-24" style={{ color: 'rgba(21,32,30,0.7)' }}>
                Ako se bar jedno od ovoga prepoznaje - dijagnoza vam pokazuje tačno gde je
                problem, i šta da radite dalje.
              </p>
            </div>
          </section>

          {/* Kako radi */}
          <section className="landing-section text-center">
            <span className="eyebrow">Kako radi</span>
            <h2 className="mt-16">Tri koraka do jasne slike</h2>
            <div className="steps-grid mt-24">
              {STEPS.map((s) => (
                <div key={s.num} className="step-card">
                  <span className="step-card__num">{s.num}</span>
                  <h3 className="mt-16">{s.title}</h3>
                  <p className="step-card__body mt-8">{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* O Vladimiru */}
          <section className="landing-section landing-narrow text-center">
            <span className="eyebrow">Ko stoji iza ovoga</span>
            <h2 className="mt-16">Vladimir Vasić - Finansijski Strateg</h2>
            <p className="intro__lead mt-16">
              Bankar po struci, savetnik po izboru. Radim sa vlasnicima firmi na tome da
              razumeju gde tačno stoje finansijski - pre nego što to umesto njih otkrije
              banka, dobavljač ili tržište. Bez magle, bez žargona, bez pritiska - samo
              brojevi i sledeći korak.
            </p>
            <p className="muted mt-16">BBS Capital Investment Group</p>
          </section>

          {/* Final CTA */}
          <section className="landing-section landing-narrow text-center">
            <h2>Dva minuta do jasne slike o firmi</h2>
            <p className="intro__lead mt-16">Bez cene, bez obaveza. Rezultat vidite odmah.</p>
            <a href="./" className="btn btn--gold btn--lg mt-24">
              Uradite besplatnu dijagnozu →
            </a>
          </section>
        </div>
      </main>
      <footer className="footer">
        <p>© BBS Capital Investment Group</p>
        <p className="mt-8">
          Vaše podatke koristimo samo u kontekstu pripreme. Bez deljenja sa trećim stranama.
        </p>
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>
)
