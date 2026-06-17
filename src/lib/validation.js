/*
 * Validacije - portovano iz Teodora Dunja prijava resursa (1:1 logika).
 * Email: stroga validacija. Ime: reč + razmak + reč. Telefon: libphonenumber-js po državi.
 */

/* Stroga email validacija */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  if (/\s/.test(email)) return false
  if ((email.match(/@/g) || []).length !== 1) return false
  const parts = email.split('@')
  const local = parts[0]
  const domain = parts[1]
  if (!local || local.startsWith('.') || local.endsWith('.') || local.indexOf('..') !== -1)
    return false
  if (!domain || domain.startsWith('.') || domain.endsWith('.') || domain.indexOf('..') !== -1)
    return false
  const dp = domain.split('.')
  if (dp.length < 2 || dp.some((p) => p.length === 0)) return false
  if (dp[dp.length - 1].length < 2) return false
  if (email.length > 254) return false
  return true
}

/* Ime i prezime: bar 2 reči, svaka min 2 znaka (latinica + dijakritici + apostrof/crtica) */
export function isValidName(name) {
  const t = (name || '').trim().replace(/\s+/g, ' ')
  if (t.length < 3) return false
  if (!/\s/.test(t)) return false
  const re = /^[A-Za-zŠĐČĆŽšđčćžÀ-ÿ'\-]{2,}(\s+[A-Za-zŠĐČĆŽšđčćžÀ-ÿ'\-]{2,})+$/
  return re.test(t)
}

/*
 * Telefon: mora biti VALIDAN MOBILNI broj za izabranu državu.
 * Tražimo tip MOBILE (ili FIXED_LINE_OR_MOBILE) jer je polje Telefon/WhatsApp -
 * tako npr. „1231231" za Srbiju (fiksni/nevalidan obrazac) pada, a 6x mobilni prolazi.
 * Fallback (ako CDN ne učita): bar 8 cifara.
 */
export function isValidPhone(input, selectedCountry) {
  const v = (input || '').trim()
  if (!v) return false
  const lpn = window.libphonenumber
  if (!lpn) return v.replace(/\D/g, '').length >= 8
  try {
    const full = v.startsWith('+') ? v : (selectedCountry?.d || '') + ' ' + v
    const parsed = lpn.parsePhoneNumberFromString(full)
    if (!parsed || !parsed.isValid()) return false
    const type = parsed.getType ? parsed.getType() : undefined
    // Ako metapodaci daju tip, dozvoli samo mobilne; ako tip nije poznat, padni nazad na isValid
    if (type === undefined) return true
    return type === 'MOBILE' || type === 'FIXED_LINE_OR_MOBILE'
  } catch (e) {
    return false
  }
}

/* Format za payload: E.164 (npr. +381601234567) */
export function formatPhoneForSubmit(input, selectedCountry) {
  const v = (input || '').trim()
  if (!v) return ''
  const lpn = window.libphonenumber
  if (!lpn) return v
  try {
    const full = v.startsWith('+') ? v : (selectedCountry?.d || '') + ' ' + v
    const parsed = lpn.parsePhoneNumberFromString(full)
    if (parsed && parsed.isValid()) return parsed.format('E.164')
  } catch (e) {
    /* noop */
  }
  return v
}
