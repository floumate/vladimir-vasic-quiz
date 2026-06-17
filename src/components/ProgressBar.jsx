/* Tanka traka napretka kroz kviz */
export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="progress">
      <div className="progress__meta">
        <span className="eyebrow">
          Pitanje {current} / {total}
        </span>
        <span className="muted">{pct}%</span>
      </div>
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
