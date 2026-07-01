import ScoreCircle from './ScoreCircle'
import DimensionBars from './DimensionBars'
import ProblemList from './ProblemList'
import { SCORE_CTA, VSL } from '../data/content'

/*
 * Score ekran (Sekcija 5). Redosled blokova odozgo nadole:
 *  A Score krug → B 4 trake → C čitanje zone → D problemi →
 *  E personalizovana rečenica → F VSL (opciono) → G CTA „Zatraži besplatnu pomoć"
 */
export default function ScoreScreen({ result, onRequestHelp }) {
  const { score100, zone, dimensions, problems, personalization } = result

  return (
    <div className="card fade-in score-screen">
      {/* A - Score krug + naziv zone */}
      <div className="score-screen__top">
        <h2 className="score-screen__title">Vaš rezultat</h2>
        <ScoreCircle score={score100} zone={zone} />
        <h2 className="score-screen__zone" style={{ color: zone.color }}>
          {zone.name}
        </h2>
      </div>

      {/* B - 4 trake po dimenziji */}
      <div className="score-screen__section">
        <DimensionBars dimensions={dimensions} />
      </div>

      {/* C - čitanje zone */}
      <p className="score-screen__reading">{zone.reading}</p>

      {/* D - ključni problemi */}
      <ProblemList problems={problems} />

      {/* E - personalizovana rečenica */}
      {personalization && (
        <p className="score-screen__personal">{personalization}</p>
      )}

      {/* F - VSL placeholder */}
      {VSL.enabled && (
        <div className="vsl" role="img" aria-label={VSL.caption}>
          <div className="vsl__play" aria-hidden="true">
            ▶
          </div>
          <span className="vsl__caption">{VSL.caption}</span>
          <span className="vsl__note">Video placeholder - muted + captions</span>
        </div>
      )}

      {/* G - CTA → Gate 2 */}
      <div className="score-screen__cta">
        <h3 className="score-screen__cta-title">{SCORE_CTA.title}</h3>
        <p className="score-screen__cta-copy">{SCORE_CTA.copy}</p>
        <button
          type="button"
          className="btn btn--gold btn--block btn--lg"
          onClick={onRequestHelp}
        >
          {SCORE_CTA.button} →
        </button>
      </div>
    </div>
  )
}
