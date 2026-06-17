import Star from './Star'

/* Kratak uvodni ekran kviza (nije landing - samo cover pre prvog pitanja). */
export default function QuizIntro({ onStart, total }) {
  return (
    <div className="card fade-in text-center intro">
      <div className="intro__star">
        <Star size={40} />
      </div>
      <span className="eyebrow">Finansijska dijagnoza</span>
      <h1 className="mt-8">Gde vaša firma zaista gubi novac?</h1>
      <p className="intro__lead mt-16">
        {total} kratkih pitanja. Za dva minuta dobijate score 0–100, sliku
        finansijskog zdravlja firme i konkretne tačke na kojima gubite - onako
        kako bi ih video banker, ne knjigovođa.
      </p>
      <button
        type="button"
        className="btn btn--primary btn--lg mt-32"
        onClick={onStart}
      >
        Započni dijagnozu →
      </button>
      <p className="muted mt-16">Bez veštačke hitnosti. Bez obaveza.</p>
    </div>
  )
}
