import { useMemo, useState } from 'react'
import QuizIntro from './components/QuizIntro'
import ProgressBar from './components/ProgressBar'
import QuestionStep from './components/QuestionStep'
import Q7Step from './components/Q7Step'
import EmailGate from './components/EmailGate'
import LoadingScreen from './components/LoadingScreen'
import ScoreScreen from './components/ScoreScreen'
import Gate2Step1 from './components/Gate2Step1'
import Gate2Step2 from './components/Gate2Step2'
import { QUESTIONS } from './data/questions'
import { computeResult } from './lib/scoring'
import { formatPhoneForSubmit } from './lib/validation'
import { sendToMake, buildMakePayload } from './lib/integration'

/*
 * Tok (Sekcija 2, bez landing-a):
 *   intro -> Q1..Q6 -> Q7 -> email gate -> score ekran -> Gate2 (1/2 -> 2/2) -> hvala stranica
 *
 * Sva scoring logika je lokalna. Na finalni submit payload se sačuva u
 * sessionStorage i radi se redirect na posebnu hvala stranicu (meta pixel ready).
 * Ništa se ne šalje na server.
 */

const STEP = {
  INTRO: 'intro',
  QUESTIONS: 'questions',
  Q7: 'q7',
  LOADING: 'loading',
  EMAIL: 'email',
  SCORE: 'score',
  GATE2: 'gate2',
}

const EMPTY_GATE2 = {
  name: '',
  email: '',
  phone: '',
  company: '',
  taxId: '',
  revenue: '',
  employees: '',
  expectations: '',
}

export default function App() {
  const [step, setStep] = useState(STEP.INTRO)
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { q1..q6: number }
  const [q7, setQ7] = useState('')
  const [lead, setLead] = useState(null) // { name, email }
  const [gate2Step, setGate2Step] = useState(1)
  const [gate2, setGate2] = useState(EMPTY_GATE2)
  const [phoneCountry, setPhoneCountry] = useState(null)

  const total = QUESTIONS.length
  const quizTotal = total + 1 // Q1-Q6 + Q7 -> progres ide do 7/7

  const result = useMemo(() => {
    const allAnswered = QUESTIONS.every((q) => typeof answers[q.id] === 'number')
    return allAnswered ? computeResult(answers) : null
  }, [answers])

  function selectAnswer(value) {
    const q = QUESTIONS[qIndex]
    setAnswers((a) => ({ ...a, [q.id]: value }))
    if (qIndex < total - 1) setQIndex(qIndex + 1)
    else setStep(STEP.Q7)
  }

  function handleQ7(text) {
    setQ7(text)
    setStep(STEP.LOADING)
  }

  function handleEmail(data) {
    setLead(data)
    // Pre-fill Gate2 sa podacima iz email gate-a
    setGate2((g) => ({ ...g, name: data.name, email: data.email }))
    logPayload('email_gate', buildPayload({ leadData: data }))
    // Optin tačka: lead u GHL i ako ne ide dalje (fire-and-forget)
    sendToMake(
      buildMakePayload('optin', {
        answers,
        q7,
        result,
        name: data.name,
        email: data.email,
      })
    )
    setStep(STEP.SCORE)
  }

  function setGate2Field(field, value) {
    setGate2((g) => ({ ...g, [field]: value }))
  }

  function handleGate2Submit() {
    const payload = buildPayload()
    logPayload('gate2_submit', payload)
    // Application tačka: kompletira lead u GHL (fire-and-forget, pre redirecta)
    sendToMake(
      buildMakePayload('application', {
        answers,
        q7,
        result,
        name: gate2.name,
        email: gate2.email,
        phoneE164: formatPhoneForSubmit(gate2.phone, phoneCountry),
        gate2,
      })
    )
    // Sačuvaj payload (za kasnije) i redirect na posebnu hvala stranicu
    try {
      sessionStorage.setItem('sf1_lead_payload', JSON.stringify(payload))
    } catch (e) {
      /* noop */
    }
    // Prod: čist URL /hvala (GH Pages servira .html); dev: Vite traži .html
    const hvalaPath = import.meta.env.DEV ? 'hvala.html' : 'hvala'
    window.location.href = new URL(hvalaPath, window.location.href).href
  }

  function buildPayload({ leadData = lead } = {}) {
    const phoneE164 = formatPhoneForSubmit(gate2.phone, phoneCountry)
    return {
      timestamp: new Date().toISOString(),
      answers, // { q1..q6: 0-3 }
      q7,
      score: result
        ? {
            score100: result.score100,
            rawScore: result.rawScore,
            zone: result.zone.id,
            zoneName: result.zone.name,
            dimensions: result.dimRaw,
            dimensionPercents: Object.fromEntries(
              result.dimensions.map((d) => [d.key, d.percent])
            ),
            problemsShown: result.problems.map((p) => p.id),
            personalization: result.personalization,
          }
        : null,
      lead: leadData,
      gate2: {
        name: gate2.name,
        email: gate2.email,
        phone: phoneE164,
        phone_raw: gate2.phone,
        phone_country: phoneCountry ? phoneCountry.d : '',
        phone_country_code: phoneCountry ? phoneCountry.c : '',
        company: gate2.company,
        taxId: gate2.taxId,
        revenue: gate2.revenue,
        employees: gate2.employees,
        expectations: gate2.expectations,
      },
    }
  }

  // --- Header back: handler po koraku (ili null ako nema) ---
  function backHandler() {
    switch (step) {
      case STEP.QUESTIONS:
        return qIndex > 0
          ? () => setQIndex(qIndex - 1)
          : () => setStep(STEP.INTRO)
      case STEP.Q7:
        return () => {
          setQIndex(total - 1)
          setStep(STEP.QUESTIONS)
        }
      case STEP.EMAIL:
        return () => setStep(STEP.Q7)
      case STEP.GATE2:
        return gate2Step === 1
          ? () => setStep(STEP.SCORE)
          : () => setGate2Step(1)
      default:
        return null
    }
  }

  const onBack = backHandler()

  return (
    <div className="app">
      <main className="app__main">
        <div className="container">
          {step === STEP.INTRO && (
            <QuizIntro total={quizTotal} onStart={() => setStep(STEP.QUESTIONS)} />
          )}

          {step === STEP.QUESTIONS && (
            <>
              <ProgressBar current={qIndex + 1} total={quizTotal} />
              <QuestionStep
                question={QUESTIONS[qIndex]}
                value={answers[QUESTIONS[qIndex].id]}
                onSelect={selectAnswer}
                onBack={onBack}
              />
            </>
          )}

          {step === STEP.Q7 && (
            <>
              <ProgressBar current={quizTotal} total={quizTotal} />
              <Q7Step value={q7} onSubmit={handleQ7} onBack={onBack} />
            </>
          )}

          {step === STEP.LOADING && (
            <LoadingScreen onDone={() => setStep(STEP.EMAIL)} />
          )}

          {step === STEP.EMAIL && (
            <EmailGate initial={lead} onSubmit={handleEmail} onBack={onBack} />
          )}

          {step === STEP.SCORE && result && (
            <ScoreScreen
              result={result}
              onRequestHelp={() => {
                setGate2Step(1)
                setStep(STEP.GATE2)
              }}
            />
          )}

          {step === STEP.GATE2 && gate2Step === 1 && (
            <Gate2Step1
              values={gate2}
              country={phoneCountry}
              onCountryChange={setPhoneCountry}
              onChange={setGate2Field}
              onNext={() => setGate2Step(2)}
              onBack={onBack}
            />
          )}

          {step === STEP.GATE2 && gate2Step === 2 && (
            <Gate2Step2
              values={gate2}
              onChange={setGate2Field}
              onSubmit={handleGate2Submit}
              onBack={onBack}
            />
          )}
        </div>
      </main>
    </div>
  )
}

/* --- Pomoćne: logovanje payload-a (privremeno umesto slanja) --- */
function logPayload(event, payload) {
  // eslint-disable-next-line no-console
  console.log(`[SF1 Kviz] ${event}:`, payload)
}
