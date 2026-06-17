/*
 * Sadržaj score ekrana - zone, problem-blokovi, personalizovana rečenica.
 * (SF1 Framework, Sekcije 4 i 5)
 *
 * NAPOMENA ZA COPY: Finalni copy tekstovi (problemi, čitanja zone, CTA)
 * stižu odvojeno od Đorđa. Ovde su placeholderi iz primera u dokumentu -
 * lako se menjaju na jednom mestu.
 */

/* --- Dimenzije: metapodaci za 4 trake --- */
export const DIMENSIONS = [
  { key: 'cashFlow', label: 'Cash flow kontrola', max: 6 },
  { key: 'bankability', label: 'Bankabilnost', max: 3 },
  { key: 'systemMaturity', label: 'Sistemska zrelost', max: 3 },
  { key: 'financialAwareness', label: 'Finansijska svest', max: 6 },
]

/* --- Zone (na osnovu score_100) --- */
export const ZONES = [
  {
    id: 'green',
    min: 80,
    max: 100,
    name: 'Zdrava osnova',
    color: 'var(--zone-green)',
    reading:
      'Firma stoji solidno. Brojevi rade za vas, ne protiv vas. Pitanje više nije „kako preživeti" - nego da li je sledeća etapa rasta.',
  },
  {
    id: 'yellow',
    min: 60,
    max: 79,
    name: 'Sivo polje',
    color: 'var(--zone-yellow)',
    reading:
      'Firma funkcioniše, ali na osećaj. Tu se gubi novac koji se ne primećuje dok ne nastane problem. Ima prostora da se ovo zategne i pretvori u kontrolu.',
  },
  {
    id: 'orange',
    min: 40,
    max: 59,
    name: 'Visok rizik',
    color: 'var(--zone-orange)',
    reading:
      'Više stvari ne radi kako treba - ali većina se može popraviti pre nego što postanu kriza. Sada je pravi trenutak da se uđe u njih, dok su još rešive.',
  },
  {
    id: 'red',
    min: 0,
    max: 39,
    name: 'Kritična zona',
    color: 'var(--zone-red)',
    reading:
      'Svaki nepredviđeni trošak trenutno može da obori firmu. Hitno je - ali rešivo. Najvažnije je da krenete od pravog mesta, a ne da gasite svaki požar posebno.',
  },
]

/*
 * --- Problem-blokovi (Sekcija 5.1) ---
 * Svaka slaba dimenzija generiše jedan problem-blok. Maksimum 4.
 * `test(d)` dobija objekat sirovih dimenzija {cashFlow, bankability, systemMaturity, financialAwareness}.
 * Pragovi „slabo" su iz tabele u dokumentu (mogu se fino podešavati).
 */
export const PROBLEMS = [
  {
    id: 'cashFlow',
    test: (d) => d.cashFlow <= 2, // Q1 + Q5 <= 2
    title: 'Tajming novca - novac ulazi sporo, izlazi brzo',
    body: 'Problem najčešće nije koliko zarađujete, nego kada novac stigne. Dok čekate da kupci plate, obaveze ne čekaju - i tu nastaje rupa.',
  },
  {
    id: 'bankability',
    test: (d) => d.bankability <= 1, // Q4 <= 1
    title: 'Banka vas trenutno ne vidi kao klijenta za kredit',
    body: 'Onako kako firma sada izgleda na papiru, banka teško odobrava. To je sistemski problem koji se može popraviti - kada se zna šta banka zapravo gleda.',
  },
  {
    id: 'systemMaturity',
    test: (d) => d.systemMaturity <= 1, // Q3 <= 1
    title: 'Firma zavisi od vas - ne može bez vašeg prisustva',
    body: 'Ako sve staje kada vas nema, niste vlasnik firme - vi ste njen najvažniji zaposleni. To ograničava i rast i vrednost firme.',
  },
  {
    id: 'financialAwareness',
    test: (d) => d.financialAwareness <= 2, // Q2 + Q6 <= 2
    title: 'Brojevi vam stižu sa zakašnjenjem - odluke naslepo',
    body: 'Kada izveštaj stigne kasno (ili nikako), odluke donosite po osećaju. Mali problemi se primete tek kada već postanu skupi.',
  },
]
export const MAX_PROBLEMS = 4

/*
 * --- Personalizovana rečenica (Sekcija 5.2) ---
 * Jedna kurzivna rečenica na osnovu najslabije dimenzije.
 * Uslovi se evaluiraju po prioritetu ODOZGO - vraća se PRVA koja matchuje.
 * Ako nijedna ne matchuje, prikazuje se samo zone-tekst (vidi scoring.js).
 *
 * VAŽNO (rekonstrukcija): tabela 5.2 u PDF-u se delom izgubila pri konverziji.
 * Mapiranje uslov→rečenica ispod je rekonstruisano po smislu i čeka potvrdu.
 * `s` su sirovi bodovi po pitanju: { q1..q6 } (0–3 svaki).
 */
export const PERSONALIZATION_RULES = [
  {
    id: 'cash_and_bank',
    test: (s) => s.q1 <= 1 && s.q4 <= 1,
    sentence:
      'Imate dva problema koja se gledaju kao jedan: nemate dovoljno keša i nemate kome da se obratite kada zatreba. To se rešava redom, ne odjednom.',
  },
  {
    id: 'cash_timing',
    test: (s) => s.q1 <= 1 && s.q5 <= 1,
    sentence:
      'Vaš glavni problem nije prihod - to je tajming novca. Novac ulazi sporo, a izlazi brzo.',
  },
  {
    id: 'awareness',
    test: (s) => s.q2 <= 1 && s.q6 <= 1,
    sentence:
      'Ne vodite firmu - firma vodi vas. Brojevi vam stižu sa zakašnjenjem, pa odluke donosite naslepo.',
  },
  {
    id: 'maturity',
    test: (s) => s.q3 <= 1,
    sentence:
      'Vi ste firma. To se može promeniti - ali samo svesno, korak po korak.',
  },
  {
    id: 'bankability',
    test: (s) => s.q4 <= 1,
    sentence:
      'Banka vas trenutno ne vidi kao klijenta kome bi dala kredit. To je sistemski problem, ne lični.',
  },
  {
    id: 'healthy',
    test: (s) => [s.q1, s.q2, s.q3, s.q4, s.q5, s.q6].every((v) => v >= 2),
    sentence:
      'Vaša firma je u zdravoj osnovi. Razgovor ima smisla samo ako pomišljate na sledeću etapu.',
  },
]

/* --- Email gate copy (Sekcija 2, korak 3) --- */
export const EMAIL_GATE = {
  eyebrow: 'Još jedan korak',
  title: 'Vaš rezultat je spreman',
  subtitle:
    'Ostavite ime i email da biste videli svoj score i konkretne tačke na kojima firma gubi.',
  cta: 'Prikaži moj rezultat',
}

/* --- CTA iznad Gate 2 (Sekcija 6) --- */
export const SCORE_CTA = {
  copy: 'Vidite gde tačno firma gubi i šta da uradite. Ostavite osnovne podatke - pripremiću vašu firmu profesionalno i javljam se sa konkretnim sledećim korakom. Bez obaveza, bez cene.',
  button: 'Zatraži besplatnu pomoć',
}

/* --- VSL (Sekcija 5, blok F) - placeholder --- */
export const VSL = {
  enabled: true,
  caption: 'Vladimir objašnjava vaš rezultat (90 sek)',
}
