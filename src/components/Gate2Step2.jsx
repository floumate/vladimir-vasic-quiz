import { useState } from 'react'
import BackButton from './BackButton'

/*
 * Gate 2 - korak 2/2: Naziv firme, PIB/matični (sa framing copy-jem),
 * Godišnji prihod, Broj zaposlenih, Očekivanja, Pošalji.
 * Greška se prikazuje na blur i nestaje čim vrednost postane ispravna.
 * Back je u header-u (vodi na korak 1).
 */

const REVENUE_OPTIONS = [
  'do 250.000 €',
  '250.000 - 500.000 €',
  '500.000 - 1M €',
  '1M+ €',
  'Ne želim da kažem',
]

const EMPLOYEE_OPTIONS = ['Samo ja', '2-5 ljudi', '6-15 ljudi', '16+ ljudi']

const PIB_COPY =
  'Pre poziva želim da pripremim Vašu firmu profesionalno. Sa PIB-om ili matičnim brojem mogu da pogledam zvanične podatke Vaše firme - onako kako bih je pogledao da ste tražili kredit kod mene. Tako prvih 15 minuta poziva ne trošimo na osnovne stvari. Vaše podatke koristim samo u kontekstu razgovora, bez deljenja sa trećim stranama.'

export default function Gate2Step2({ values, onChange, onSubmit, onBack }) {
  const [touched, setTouched] = useState({
    company: false,
    taxId: false,
    revenue: false,
    employees: false,
  })

  const errors = {
    company: values.company.trim().length < 2,
    taxId: values.taxId.trim().length < 3,
    revenue: !values.revenue,
    employees: !values.employees,
  }
  const valid = !Object.values(errors).some(Boolean)
  const touch = (f) => setTouched((t) => ({ ...t, [f]: true }))
  const err = (k) => touched[k] && errors[k]

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ company: true, taxId: true, revenue: true, employees: true })
    if (!valid) return
    onSubmit()
  }

  return (
    <form className="card fade-in" onSubmit={handleSubmit} noValidate>
      <BackButton onBack={onBack} />
      <h2>Još par podataka o firmi</h2>

      <div className="mt-24">
        <div className="field">
          <label className="field__label">
            Naziv firme <span className="field__required">*</span>
          </label>
          <input
            className="input"
            value={values.company}
            onChange={(e) => onChange('company', e.target.value)}
            onBlur={() => touch('company')}
          />
          {err('company') && (
            <span className="field__error">Obavezno polje.</span>
          )}
        </div>

        {/* PIB - framing copy je presudan (Sekcija 7) */}
        <div className="pib-note">{PIB_COPY}</div>
        <div className="field">
          <label className="field__label">
            PIB ili matični broj <span className="field__required">*</span>
          </label>
          <input
            className="input"
            value={values.taxId}
            onChange={(e) => onChange('taxId', e.target.value)}
            onBlur={() => touch('taxId')}
            placeholder="PIB, matični ili drugi identifikacioni broj"
          />
          {err('taxId') && <span className="field__error">Obavezno polje.</span>}
        </div>

        <div className="field">
          <label className="field__label">
            Godišnji prihod (rang) <span className="field__required">*</span>
          </label>
          <select
            className="select"
            value={values.revenue}
            onChange={(e) => onChange('revenue', e.target.value)}
            onBlur={() => touch('revenue')}
          >
            <option value="">Izaberite…</option>
            {REVENUE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {err('revenue') && <span className="field__error">Izaberite rang.</span>}
        </div>

        <div className="field">
          <label className="field__label">
            Broj zaposlenih <span className="field__required">*</span>
          </label>
          <select
            className="select"
            value={values.employees}
            onChange={(e) => onChange('employees', e.target.value)}
            onBlur={() => touch('employees')}
          >
            <option value="">Izaberite…</option>
            {EMPLOYEE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {err('employees') && (
            <span className="field__error">Izaberite opciju.</span>
          )}
        </div>

        <div className="field">
          <label className="field__label">
            Očekivanja / specifičnosti biznisa
            <span className="field__hint"> (opciono)</span>
          </label>
          <textarea
            className="textarea"
            maxLength={500}
            value={values.expectations}
            onChange={(e) => onChange('expectations', e.target.value)}
            placeholder="Ima li nešto specifično što treba da znamo pre razgovora?"
          />
        </div>
      </div>

      <button type="submit" className="btn btn--gold btn--block btn--lg mt-16">
        Pošalji
      </button>
    </form>
  )
}
