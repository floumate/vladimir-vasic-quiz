/*
 * Države + pozivni brojevi + IP geolokacija.
 * Portovano iz Teodora Dunja prijava resursa. Koristi window.libphonenumber (CDN)
 * i Intl.DisplayNames za srpska imena; ima fallback listu ako CDN ne učita.
 */

const FALLBACK = [
  { c: 'RS', n: 'Srbija', d: '+381' },
  { c: 'BA', n: 'Bosna i Hercegovina', d: '+387' },
  { c: 'ME', n: 'Crna Gora', d: '+382' },
  { c: 'HR', n: 'Hrvatska', d: '+385' },
  { c: 'SI', n: 'Slovenija', d: '+386' },
  { c: 'MK', n: 'Severna Makedonija', d: '+389' },
  { c: 'AL', n: 'Albanija', d: '+355' },
  { c: 'BG', n: 'Bugarska', d: '+359' },
  { c: 'RO', n: 'Rumunija', d: '+40' },
  { c: 'HU', n: 'Mađarska', d: '+36' },
  { c: 'AT', n: 'Austrija', d: '+43' },
  { c: 'DE', n: 'Nemačka', d: '+49' },
  { c: 'CH', n: 'Švajcarska', d: '+41' },
  { c: 'IT', n: 'Italija', d: '+39' },
  { c: 'FR', n: 'Francuska', d: '+33' },
  { c: 'NL', n: 'Holandija', d: '+31' },
  { c: 'BE', n: 'Belgija', d: '+32' },
  { c: 'SE', n: 'Švedska', d: '+46' },
  { c: 'NO', n: 'Norveška', d: '+47' },
  { c: 'DK', n: 'Danska', d: '+45' },
  { c: 'GB', n: 'Velika Britanija', d: '+44' },
  { c: 'IE', n: 'Irska', d: '+353' },
  { c: 'ES', n: 'Španija', d: '+34' },
  { c: 'PT', n: 'Portugal', d: '+351' },
  { c: 'GR', n: 'Grčka', d: '+30' },
  { c: 'US', n: 'SAD', d: '+1' },
  { c: 'CA', n: 'Kanada', d: '+1' },
  { c: 'AU', n: 'Australija', d: '+61' },
]

/* Sve države iz libphonenumber + srpska imena; prioritet Balkan na vrhu. */
export function buildCountries() {
  const lpn = window.libphonenumber
  if (!lpn || !lpn.getCountries) return FALLBACK
  let names = null
  try {
    names = new Intl.DisplayNames(['sr-Latn', 'sr', 'en'], { type: 'region' })
  } catch (e) {
    /* noop */
  }
  const PRIORITY = ['RS', 'BA', 'ME', 'HR', 'SI', 'MK', 'BG']
  const all = []
  lpn.getCountries().forEach((code) => {
    let dial
    try {
      dial = '+' + lpn.getCountryCallingCode(code)
    } catch (e) {
      return
    }
    let nm = code
    if (names) {
      try {
        nm = names.of(code) || code
      } catch (e2) {
        /* noop */
      }
    }
    if (code === 'MK') nm = 'Makedonija'
    all.push({ c: code, n: nm, d: dial })
  })
  if (!all.length) return FALLBACK
  const inPriority = {}
  PRIORITY.forEach((p) => {
    inPriority[p] = true
  })
  const top = []
  PRIORITY.forEach((p) => {
    const found = all.find((x) => x.c === p)
    if (found) top.push(found)
  })
  const rest = all
    .filter((x) => !inPriority[x.c])
    .sort((a, b) => a.n.localeCompare(b.n, 'sr'))
  return top.concat(rest)
}

export function findCountry(countries, code) {
  if (!code) return null
  return countries.find((c) => c.c === code) || null
}

/* CSS klasa za flag-icons (CDN) */
export function flagClass(code) {
  if (!code || code.length !== 2) return ''
  return 'fi fi-' + code.toLowerCase()
}

/* Primer broja za placeholder (national format) */
export function examplePlaceholder(country) {
  const lpn = window.libphonenumber
  if (!country || !lpn) return '60 123 4567'
  try {
    const ex = lpn.getExampleNumber(country.c, lpn.examples)
    if (ex) return ex.formatNational()
  } catch (e) {
    /* noop */
  }
  return '60 123 4567'
}

/* Auto-detekcija države iz unetog +XXX prefiksa */
export function detectFromDialCode(value, countries) {
  const v = (value || '').trim()
  if (!v.startsWith('+')) return null
  const lpn = window.libphonenumber
  if (lpn) {
    try {
      const parsed = lpn.parsePhoneNumberFromString(v)
      if (parsed && parsed.country) {
        const c = findCountry(countries, parsed.country)
        if (c) return c
      }
    } catch (e) {
      /* noop */
    }
  }
  const sorted = countries.slice().sort((a, b) => b.d.length - a.d.length)
  for (const c of sorted) {
    if (v.startsWith(c.d)) return c
  }
  return null
}

/* IP geolokacija - 3 providera sa fallback-om (3s timeout svaki) */
export function detectCountryByIP(callback) {
  const providers = [
    { url: 'https://api.country.is/', field: 'country' },
    { url: 'https://ipwho.is/', field: 'country_code' },
    { url: 'https://ipapi.co/json/', field: 'country_code' },
  ]
  function tryProvider(idx) {
    if (idx >= providers.length) {
      callback(null)
      return
    }
    const p = providers[idx]
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 3000)
    fetch(p.url, { signal: ctrl.signal })
      .then((r) => {
        clearTimeout(timer)
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((d) => {
        const code = d && d[p.field]
        if (code) callback(code)
        else throw new Error()
      })
      .catch(() => tryProvider(idx + 1))
  }
  tryProvider(0)
}
