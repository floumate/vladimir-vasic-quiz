import { useEffect, useRef, useState } from 'react'

/*
 * Prelazni "loading" ekran posle Q7: krug 0->100% + "Pripremamo vaše rezultate".
 * Posle ~2.4s pozove onDone (-> email gate). Boja = brand petrol.
 */
const MESSAGES = [
  'Analiziramo vaše odgovore...',
  'Identifikujemo gde firma gubi...',
  'Pripremamo vaš rezultat...',
]

export default function LoadingScreen({ onDone }) {
  const [pct, setPct] = useState(0)
  const doneRef = useRef(false)

  const radius = 86
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference
  const msg = MESSAGES[Math.min(Math.floor(pct / 34), MESSAGES.length - 1)]

  useEffect(() => {
    let raf
    let timer
    const duration = 2400
    let start = null
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      onDone()
    }
    const step = (ts) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setPct(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else timer = setTimeout(finish, 450) // kratko zadrži na 100%
    }
    raf = requestAnimationFrame(step)
    // Sigurnosni fallback: pređi dalje i ako rAF ne tika (npr. tab u pozadini)
    // - lead nikad ne sme da zaglavi na loading ekranu.
    const fallback = setTimeout(finish, duration + 1400)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      clearTimeout(fallback)
    }
  }, [onDone])

  return (
    <div className="card fade-in text-center loading">
      <div className="loading__circle">
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
            stroke="var(--petrol)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <div className="loading__center">
          <span className="loading__num">{pct}%</span>
        </div>
      </div>
      <h2 className="mt-24">Pripremamo vaše rezultate</h2>
      <p className="loading__sub mt-8">{msg}</p>
    </div>
  )
}
