import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import { isValidEmail, isValidName } from './lib/validation'
import './styles/global.css'

/*
 * Kontakt stranica - redizajn po referenci klijenta (kontakt.html).
 * Forma je za sada NEPOVEZANA (samo prikazuje potvrdu lokalno) - nije
 * uključena u Make/GHL integraciju kao kviz. Ako zatreba, lako se doda
 * sendToMake() poziv isti kao u kvizu (src/lib/integration.js).
 */
function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [touched, setTouched] = useState({ name: false, email: false, consent: false })
  const [sent, setSent] = useState(false)

  const nameOk = isValidName(name)
  const emailOk = isValidEmail(email.trim())
  const valid = nameOk && emailOk && consent

  const touch = (f) => setTouched((t) => ({ ...t, [f]: true }))

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, email: true, consent: true })
    if (!valid) return
    setSent(true)
  }

  return (
    <div className="app landing-page">
      <SiteNav />
      <main className="landing-main">
        <section className="landing-hero-section">
          <div className="landing-container">
            <div className="text-center">
              <span className="eyebrow">Kontakt</span>
              <h1 className="mt-16">Imate konkretno pitanje?</h1>
            </div>

            <div className="contact-grid mt-48">
              <form className="card" onSubmit={handleSubmit} noValidate>
                <p className="lead-text" style={{ marginBottom: 20, fontSize: '1rem' }}>
                  Ako Vaša situacija ima nešto specifično ili imate pitanje pre nego što
                  krenete, pišite nam direktno. Javljamo se na email koji ostavite.
                </p>

                <div className="field">
                  <label className="field__label">
                    Ime i prezime <span className="field__required">*</span>
                  </label>
                  <input
                    className="input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => touch('name')}
                    autoComplete="name"
                  />
                  {touched.name && !nameOk && (
                    <span className="field__error">Unesite i ime i prezime.</span>
                  )}
                </div>

                <div className="field">
                  <label className="field__label">
                    Email <span className="field__required">*</span>
                  </label>
                  <input
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => touch('email')}
                    autoComplete="email"
                  />
                  {touched.email && !emailOk && (
                    <span className="field__error">Email adresa nije validna.</span>
                  )}
                </div>

                <div className="field">
                  <label className="field__label">
                    Poruka <span className="field__hint">(opciono)</span>
                  </label>
                  <textarea
                    className="textarea"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Napišite šta Vas zanima ili šta je specifično za Vašu firmu."
                  />
                </div>

                <label className="consent">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    onBlur={() => touch('consent')}
                  />
                  <span>
                    Saglasan/saglasna sam sa obradom mojih podataka u skladu sa{' '}
                    <a href="#privacy">Politikom privatnosti</a>.
                  </span>
                </label>
                {touched.consent && !consent && (
                  <span className="field__error">Potrebna je saglasnost da bismo nastavili.</span>
                )}

                <button type="submit" className="btn btn--primary btn--block btn--lg mt-16">
                  Pošalji poruku →
                </button>
                {sent && (
                  <p className="mt-16 text-center" style={{ color: 'var(--gold-deep)', fontWeight: 700 }}>
                    Hvala. Javljamo se na Vaš email uskoro.
                  </p>
                )}
              </form>

              <div className="contact-info">
                <div>
                  <div className="ci-block__label">Email</div>
                  <div className="ci-block__val">office@vladimirvasic.com</div>
                </div>
                <div>
                  <div className="ci-block__label">Firma</div>
                  <div className="ci-block__val">BBS Capital Investment Group</div>
                  <div className="ci-block__val ci-block__val--muted">
                    Jurija Gagarina 227, Novi Beograd
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter page="kontakt" />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContactPage />
  </React.StrictMode>
)
