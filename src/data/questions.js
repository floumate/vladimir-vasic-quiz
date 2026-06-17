/*
 * Kviz pitanja Q1-Q7 (SF1 Framework, Sekcija 3)
 * Q1-Q6 boduju 0-3. Q7 je opciono free-text i NE boduje se.
 * Redosled odgovora je iz dokumenta (najslabiji → najjači).
 *
 * Dimenzije (Sekcija 4):
 *   cashFlow           = Q1 + Q5  (maks 6)
 *   financialAwareness = Q2 + Q6  (maks 6)
 *   systemMaturity     = Q3       (maks 3)
 *   bankability        = Q4       (maks 3)
 */

export const QUESTIONS = [
  {
    id: 'q1',
    number: 1,
    dimension: 'cashFlow',
    eyebrow: 'Cash flow kontrola',
    text: 'Da li ima meseci kada vam ponestaje novca za redovne obaveze - plate, dobavljače, poreze?',
    options: [
      { label: 'Skoro svaki mesec', value: 0 },
      { label: '4+ puta godišnje', value: 1 },
      { label: '1-3 puta godišnje', value: 2 },
      { label: 'Skoro nikad', value: 3 },
    ],
  },
  {
    id: 'q2',
    number: 2,
    dimension: 'financialAwareness',
    eyebrow: 'Finansijska svest',
    text: 'Kada vas neko pita „koliko vaša firma zaista zarađuje mesečno" - koji odgovor je najbliži istini?',
    options: [
      { label: 'Iskreno, nisam siguran', value: 0 },
      { label: 'Vidim kad mi računovođa pošalje izveštaj', value: 1 },
      { label: 'Znam okvirno, gledam stanje računa', value: 2 },
      { label: 'Znam tačan broj na desetak hiljada', value: 3 },
    ],
  },
  {
    id: 'q3',
    number: 3,
    dimension: 'systemMaturity',
    eyebrow: 'Sistemska zrelost',
    text: 'Da sutra odete na dve nedelje odmora bez telefona - šta bi se desilo sa firmom?',
    options: [
      { label: 'Stala bi cela firma', value: 0 },
      { label: 'Neke stvari bi stale, neke bi išle', value: 1 },
      { label: 'Funkcioniše uz par poziva i odobrenja', value: 2 },
      { label: 'Sve ide normalno bez mene', value: 3 },
    ],
  },
  {
    id: 'q4',
    number: 4,
    dimension: 'bankability',
    eyebrow: 'Bankabilnost',
    text: 'Ako biste sutra morali da podignete kredit od 50.000 € za firmu - koliko ste sigurni da bi vam banka odobrila?',
    options: [
      { label: 'Sigurno ne bi', value: 0 },
      { label: 'Iskreno, ne znam', value: 1 },
      { label: 'Verovatno bi', value: 2 },
      { label: 'Sigurno bi', value: 3 },
    ],
  },
  {
    id: 'q5',
    number: 5,
    dimension: 'cashFlow',
    eyebrow: 'Cash flow / DSO',
    text: 'Koliko u proseku čekate da vam kupci plate fakturu?',
    options: [
      { label: 'Više od 60 dana', value: 0 },
      { label: '30-60 dana', value: 1 },
      { label: '15-30 dana', value: 2 },
      { label: 'Plaćanje unapred ili do 15 dana', value: 3 },
    ],
  },
  {
    id: 'q6',
    number: 6,
    dimension: 'financialAwareness',
    eyebrow: 'Finansijska svest',
    text: 'Da li dobijate mesečni finansijski izveštaj koji zaista pročitate i razumete?',
    options: [
      { label: 'Ne pratim aktivno', value: 0 },
      { label: 'Samo godišnji bilans', value: 1 },
      { label: 'Ponekad, kad nešto zaškripi', value: 2 },
      { label: 'Svaki mesec, ozbiljno', value: 3 },
    ],
  },
]

/* Q7 - opciono, ne boduje se. Čuva se uz lead kao input za pripremu razgovora. */
export const Q7 = {
  id: 'q7',
  number: 7,
  eyebrow: 'Opciono',
  text: 'Koji je vaš najveći finansijski stres ili pitanje u firmi trenutno?',
  placeholder: 'Unesite odgovor...',
  minLength: 20,
  maxLength: 300,
  optional: true,
}

export const SCORING_QUESTIONS = QUESTIONS // Q1-Q6 (sve nose bodove)
export const MAX_RAW_SCORE = 18 // 6 pitanja × 3
