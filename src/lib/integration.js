/*
 * Slanje lead podataka na Make webhook (Make -> GHL integracija).
 * Dve tačke: 'optin' (email gate) i 'application' (Gate2 submit).
 *
 * Fire-and-forget: slanje NIKAD ne blokira UI ni redirect (framework Sekcija 1 -
 * instant score se ne sme zaglaviti). Greške se gutaju.
 *
 * Webhook URL je direktno u kodu (svejedno je vidljiv u browseru kad kviz šalje).
 */
import { QUESTIONS } from '../data/questions'

const WEBHOOK_URL = 'https://hook.eu1.make.com/sgrekanqqr658ny1scmc5o7y4j9kocsy'

/* Vrednost odgovora (0-3) -> tekst labele, da tim u GHL-u čita reč, ne broj. */
function answerLabel(qId, value) {
  const q = QUESTIONS.find((x) => x.id === qId)
  if (!q) return ''
  const opt = q.options.find((o) => o.value === value)
  return opt ? opt.label : ''
}

/* Procenat jedne dimenzije iz rezultata (cashFlow / bankability / ...). */
function dimPercent(result, key) {
  const d = result.dimensions.find((x) => x.key === key)
  return d ? d.percent : ''
}

/*
 * Ravan payload za Make -> GHL. Isti OBLIK na obe tačke (stabilna struktura za Make);
 * application-only polja su prazna na optin-u.
 *   event       - 'optin' | 'application'
 *   answers      - { q1..q6: number }
 *   q7, result   - iz scoring-a
 *   name/email   - lead (optin) ili gate2 (application)
 *   phoneE164    - samo na application
 *   gate2        - Gate2 polja (samo na application)
 */
export function buildMakePayload(
  event,
  { answers, q7, result, name, email, phoneE164 = '', gate2 = null }
) {
  // Puno ime -> ime (prva reč) + prezime (ostatak), za GHL First/Last Name
  const fullName = (name || '').trim().replace(/\s+/g, ' ')
  const sp = fullName.indexOf(' ')
  const firstName = sp === -1 ? fullName : fullName.slice(0, sp)
  const lastName = sp === -1 ? '' : fullName.slice(sp + 1)

  return {
    event,
    timestamp: new Date().toISOString(),

    // Kontakt (standardna GHL polja)
    name: fullName,
    first_name: firstName,
    last_name: lastName,
    email: email || '',
    phone: phoneE164 || '',

    // Odgovori na kviz (tekst odabrane opcije).
    // Key-evi = GHL custom field key-evi -> u Make-u mapiraš isto ime na isto ime.
    ponestaje_novca_za_obaveze: answerLabel('q1', answers.q1),
    zna_tano_koliko_firma_zarauje: answerLabel('q2', answers.q2),
    firma_radi_bez_vlasnika_2_nedelje: answerLabel('q3', answers.q3),
    banka_bi_odobrila_kredit_50000: answerLabel('q4', answers.q4),
    koliko_eka_naplatu_od_kupaca: answerLabel('q5', answers.q5),
    prima_i_razume_meseni_izvetaj: answerLabel('q6', answers.q6),
    najvei_finansijski_stres: q7 || '',

    // Izračunato (score ekran)
    score: result ? result.score100 : '',
    zone: result ? result.zone.id : '', // green/yellow/orange/red -> tag quiz_zona_{zone}
    zone_name: result ? result.zone.name : '',
    dim_cashflow: result ? dimPercent(result, 'cashFlow') : '',
    dim_bankability: result ? dimPercent(result, 'bankability') : '',
    dim_systemmaturity: result ? dimPercent(result, 'systemMaturity') : '',
    dim_financialawareness: result ? dimPercent(result, 'financialAwareness') : '',
    problems: result ? result.problems.map((p) => p.title).join(', ') : '',
    personalization: result && result.personalization ? result.personalization : '',

    // Application-only (prazno na optin-u)
    company: gate2 ? gate2.company : '',
    role: gate2 ? gate2.role : '',
    pib: gate2 ? gate2.taxId : '',
    revenue: gate2 ? gate2.revenue : '',
    employees: gate2 ? gate2.employees : '',
    expectations: gate2 ? gate2.expectations : '',
  }
}

/* Fire-and-forget POST na Make webhook. Ne baca - greška se proguta da UI ne pukne. */
export function sendToMake(payload) {
  try {
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true, // da prođe i kad odmah ide redirect (application -> hvala.html)
    }).catch(() => {})
  } catch (e) {
    /* noop */
  }
}
