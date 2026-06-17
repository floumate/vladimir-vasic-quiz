import { useEffect, useState } from 'react'

/*
 * Jedan ekran pitanja (Q1-Q6). Klik na odgovor prikaže checked state, pa posle
 * kratkog delay-a pređe na sledeće (da se vidi izbor). Back je u header-u.
 */
export default function QuestionStep({ question, value, onSelect }) {
  const [pending, setPending] = useState(null)

  // Resetuj pending kad se promeni pitanje
  useEffect(() => {
    setPending(null)
  }, [question.id])

  function choose(optValue) {
    if (pending !== null) return // spreči dupli klik tokom delay-a
    setPending(optValue)
    setTimeout(() => onSelect(optValue), 280)
  }

  const shown = pending !== null ? pending : value

  return (
    <div className="card fade-in" key={question.id}>
      <h2>{question.text}</h2>

      <div className="options mt-24">
        {question.options.map((opt) => {
          const selected = shown === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              className={`option ${selected ? 'option--selected' : ''}`}
              onClick={() => choose(opt.value)}
            >
              <span className="option__radio" aria-hidden="true" />
              <span className="option__label">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
