import { useEffect, useMemo, useRef, useState } from 'react'
import {
  buildCountries,
  findCountry,
  flagClass,
  examplePlaceholder,
  detectFromDialCode,
  detectCountryByIP,
} from '../lib/countries'

/*
 * Telefon polje sa country picker-om (zastava + pozivni broj), IP auto-detekcijom
 * države i validacijom po državi (libphonenumber). Logika portovana iz Teodora
 * Dunja prijava resursa, prilagođen React-u i Vladimir brendu.
 *
 * Props:
 *   value, onChange(value)           - nacionalni broj koji korisnik kuca
 *   country, onCountryChange(country) - izabrana država { c, n, d }
 *   error                            - poruka greške (string) ili prazno
 *   label                            - label teksta
 */
export default function PhoneField({
  value,
  onChange,
  country,
  onCountryChange,
  error,
  onBlur,
}) {
  const countries = useMemo(() => buildCountries(), [])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const rowRef = useRef(null)
  const searchRef = useRef(null)
  const inputRef = useRef(null)

  // Inicijalna država: RS dok IP detekcija ne stigne
  useEffect(() => {
    if (!country) onCountryChange(findCountry(countries, 'RS'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // IP geolokacija (jednom) - postavlja državu ako je nađe u listi
  useEffect(() => {
    detectCountryByIP((code) => {
      if (!code) return
      const c = findCountry(countries, code)
      if (c) onCountryChange(c)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Zatvori dropdown na klik van
  useEffect(() => {
    function onDocClick(e) {
      if (rowRef.current && !rowRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  useEffect(() => {
    if (open && searchRef.current) {
      const t = setTimeout(() => searchRef.current.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open])

  const filtered = useMemo(() => {
    const f = search.trim().toLowerCase()
    if (!f) return countries
    return countries.filter(
      (c) => c.n.toLowerCase().indexOf(f) !== -1 || c.d.indexOf(f) !== -1
    )
  }, [search, countries])

  function handleInput(e) {
    // Dozvoljene: cifre, +, razmaci, crtice, zagrade
    const cleaned = e.target.value.replace(/[^\d\s\-()+]/g, '')
    onChange(cleaned)
    const detected = detectFromDialCode(cleaned, countries)
    if (detected && (!country || country.c !== detected.c)) onCountryChange(detected)
  }

  function selectCountry(c) {
    onCountryChange(c)
    setOpen(false)
    if (inputRef.current) inputRef.current.focus()
  }

  const placeholder = examplePlaceholder(country)

  return (
    <div className="field" data-field="phone">
      <label className="field__label">
        Telefon / WhatsApp <span className="field__required">*</span>
      </label>
      <div
        className={`phone-row ${error ? 'phone-row--error' : ''}`}
        ref={rowRef}
      >
        <button
          type="button"
          className="country-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Izaberi zemlju"
          onClick={(e) => {
            e.stopPropagation()
            setOpen((o) => !o)
          }}
        >
          <span className="country-flag">
            {country && <span className={flagClass(country.c)} />}
          </span>
          <span className="country-dial">{country ? country.d : ''}</span>
          <svg
            className="country-chevron"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <input
          ref={inputRef}
          type="tel"
          className="phone-input"
          autoComplete="tel-national"
          inputMode="tel"
          placeholder={placeholder}
          value={value}
          onChange={handleInput}
          onBlur={onBlur}
        />

        {open && (
          <div className="dropdown" role="listbox">
            <div className="dropdown-search">
              <input
                ref={searchRef}
                type="text"
                placeholder="Pretraži zemlje..."
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setOpen(false)
                }}
              />
            </div>
            <div className="dropdown-list">
              {filtered.length === 0 ? (
                <div className="dropdown-empty">Nema rezultata</div>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.c}
                    type="button"
                    className={`country-item ${
                      country && c.c === country.c ? 'selected' : ''
                    }`}
                    role="option"
                    onClick={() => selectCountry(c)}
                  >
                    <span className="country-item-flag">
                      <span className={flagClass(c.c)} />
                    </span>
                    <span className="country-item-name">{c.n}</span>
                    <span className="country-item-dial">{c.d}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {error && <span className="field__error">{error}</span>}
    </div>
  )
}
