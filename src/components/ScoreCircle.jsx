import { useEffect, useState } from 'react'

/*
 * Blok A - veliki krug sa brojem (npr. 47/100).
 * Count-up animacija od 0 + prsten koji se popunjava. Boja = boja zone.
 */
export default function ScoreCircle({ score, zone }) {
  const [display, setDisplay] = useState(0)
  const radius = 86
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (display / 100) * circumference

  useEffect(() => {
    let raf
    const duration = 1100
    let start = null
    const step = (ts) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setDisplay(Math.round(eased * score))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [score])

  return (
    <div className="score-circle">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="var(--line)"
          strokeWidth="14"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={zone.color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      <div className="score-circle__center">
        <span className="score-circle__num" style={{ color: zone.color }}>
          {display}
        </span>
        <span className="score-circle__max">/ 100</span>
      </div>
    </div>
  )
}
