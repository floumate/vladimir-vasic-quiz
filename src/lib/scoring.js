/*
 * Scoring engine - čista if-then logika na frontend-u (SF1 Framework, Sekcija 4).
 * Sve se računa lokalno; score se prikazuje tek posle email gate-a.
 */
import { MAX_RAW_SCORE } from '../data/questions'
import {
  ZONES,
  DIMENSIONS,
  PROBLEMS,
  MAX_PROBLEMS,
  PERSONALIZATION_RULES,
} from '../data/content'

/**
 * Glavni izračun.
 * @param {Object} answers - { q1..q6: number 0–3 }
 * @returns kompletan rezultat za score ekran + payload za čuvanje
 */
export function computeResult(answers) {
  const s = {
    q1: num(answers.q1),
    q2: num(answers.q2),
    q3: num(answers.q3),
    q4: num(answers.q4),
    q5: num(answers.q5),
    q6: num(answers.q6),
  }

  const rawScore = s.q1 + s.q2 + s.q3 + s.q4 + s.q5 + s.q6
  const score100 = Math.round((rawScore / MAX_RAW_SCORE) * 100)

  // Sirovi bodovi po dimenziji (za pragove problema/personalizacije)
  const dimRaw = {
    cashFlow: s.q1 + s.q5, // maks 6
    bankability: s.q4, // maks 3
    systemMaturity: s.q3, // maks 3
    financialAwareness: s.q2 + s.q6, // maks 6
  }

  // 4 trake: procenat od svog maksimuma
  const dimensions = DIMENSIONS.map((d) => ({
    ...d,
    raw: dimRaw[d.key],
    percent: Math.round((dimRaw[d.key] / d.max) * 100),
  }))

  const zone = getZone(score100)
  const problems = getProblems(dimRaw)
  const personalization = getPersonalization(s)

  return {
    raw: s,
    rawScore,
    score100,
    zone,
    dimRaw,
    dimensions,
    problems,
    personalization,
  }
}

function num(v) {
  return typeof v === 'number' && !Number.isNaN(v) ? v : 0
}

/* Zona na osnovu score_100 (Sekcija 4) */
export function getZone(score100) {
  return (
    ZONES.find((z) => score100 >= z.min && score100 <= z.max) ||
    ZONES[ZONES.length - 1]
  )
}

/* Problem-blokovi: svaka slaba dimenzija → jedan blok, max 4 (Sekcija 5.1) */
export function getProblems(dimRaw) {
  return PROBLEMS.filter((p) => p.test(dimRaw)).slice(0, MAX_PROBLEMS)
}

/* Personalizovana rečenica: prva pravilo koje matchuje po prioritetu (Sekcija 5.2) */
export function getPersonalization(rawAnswers) {
  const match = PERSONALIZATION_RULES.find((r) => r.test(rawAnswers))
  return match ? match.sentence : null
}
