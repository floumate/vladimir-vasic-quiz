import { useState } from 'react'
import { EMAIL_GATE } from '../data/content'
import { isValidEmail, isValidName } from '../lib/validation'
import BackButton from './BackButton'

/*
 * Email gate (Sekcija 2, korak 3): ime + email. Back je u header-u.
 * Validacija: ime = reč + razmak + reč; email = stroga validacija.
 * Greška se prikazuje čim korisnik napusti polje (blur), a nestaje čim
 * unese ispravnu vrednost.
 */
export default function EmailGate({ initial, onSubmit, onBack }) {
  const [name, setName] = useState(initial?.name || '')
  const [email, setEmail] = useState(initial?.email || '')
  const [touched, setTouched] = useState({ name: false, email: false })

  const nameOk = isValidName(name)
  const emailOk = isValidEmail(email.trim())
  const valid = nameOk && emailOk

  const touch = (f) => setTouched((t) => ({ ...t, [f]: true }))

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, email: true })
    if (!valid) return
    onSubmit({ name: name.trim().replace(/\s+/g, ' '), email: email.trim() })
  }

  return (
    <form className="card fade-in" onSubmit={handleSubmit} noValidate>
      <BackButton onBack={onBack} />
      <h2>{EMAIL_GATE.title}</h2>
      <p className="mt-8" style={{ color: 'rgba(21,32,30,0.7)' }}>
        {EMAIL_GATE.subtitle}
      </p>

      <div className="mt-24">
        <div className="field">
          <label className="field__label" htmlFor="name">
            Ime i prezime <span className="field__required">*</span>
          </label>
          <input
            id="name"
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => touch('name')}
            placeholder="Ime i prezime"
            autoComplete="name"
          />
          {touched.name && !nameOk && (
            <span className="field__error">Unesite i ime i prezime.</span>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="email">
            Email <span className="field__required">*</span>
          </label>
          <input
            id="email"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => touch('email')}
            placeholder="vas@email.com"
            autoComplete="email"
          />
          {touched.email && !emailOk && (
            <span className="field__error">Email adresa nije validna.</span>
          )}
        </div>
      </div>

      <button type="submit" className="btn btn--gold btn--block btn--lg mt-16">
        {EMAIL_GATE.cta} →
      </button>

      <p className="field__hint mt-16">
        Vaše podatke koristimo samo u kontekstu pripreme. Bez deljenja sa trećim
        stranama.
      </p>
    </form>
  )
}
