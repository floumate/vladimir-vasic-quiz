import { useState } from 'react'
import PhoneField from './PhoneField'
import { isValidEmail, isValidName, isValidPhone } from '../lib/validation'

/*
 * Gate 2 - korak 1/2: Ime i prezime, Email, Telefon / WhatsApp.
 * Validacija: ime (reč+razmak+reč), email (strogo), telefon (po državi).
 * Back je u header-u (vodi na score ekran).
 */
export default function Gate2Step1({ values, country, onCountryChange, onChange, onNext }) {
  const [touched, setTouched] = useState(false)

  const nameOk = isValidName(values.name)
  const emailOk = isValidEmail(values.email.trim())
  const phoneOk = isValidPhone(values.phone, country)
  const valid = nameOk && emailOk && phoneOk

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    onNext()
  }

  return (
    <form className="card fade-in" onSubmit={handleSubmit} noValidate>
      <span className="eyebrow">Besplatna pomoć · korak 1/2</span>
      <h2 className="mt-8">Ostavite osnovne podatke</h2>
      <p className="mt-8" style={{ color: 'rgba(21,32,30,0.7)' }}>
        Pripremiću vašu firmu profesionalno i javljam se sa konkretnim sledećim
        korakom. Bez obaveza, bez cene.
      </p>

      <div className="mt-24">
        <div className="field">
          <label className="field__label">
            Ime i prezime <span className="field__required">*</span>
          </label>
          <input
            className="input"
            value={values.name}
            onChange={(e) => onChange('name', e.target.value)}
            autoComplete="name"
            placeholder="Ime i prezime"
          />
          {touched && !nameOk && (
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
            value={values.email}
            onChange={(e) => onChange('email', e.target.value)}
            autoComplete="email"
            placeholder="vas@email.com"
          />
          {touched && !emailOk && (
            <span className="field__error">Email adresa nije validna.</span>
          )}
        </div>

        <PhoneField
          value={values.phone}
          onChange={(v) => onChange('phone', v)}
          country={country}
          onCountryChange={onCountryChange}
          error={
            touched && !phoneOk
              ? 'Broj telefona nije validan za izabranu zemlju.'
              : ''
          }
        />
      </div>

      <button type="submit" className="btn btn--gold btn--block btn--lg mt-16">
        Nastavi →
      </button>
    </form>
  )
}
