import { useState } from 'react'
import { Q7 } from '../data/questions'

/*
 * Q7 - opciono free-text (ne boduje se). Bez eyebrow-a.
 * Dugme se menja: prazno -> "Preskoči"; kuca <20 -> "Nastavi" (disabled);
 * >=20 karaktera -> "Nastavi" (enabled).
 */
export default function Q7Step({ value, onSubmit }) {
  const [text, setText] = useState(value || '')
  const len = text.trim().length
  const isEmpty = len === 0
  const reachedMin = len >= Q7.minLength

  return (
    <div className="card fade-in">
      <h2>{Q7.text}</h2>

      <div className="field mt-24">
        <textarea
          className="textarea"
          value={text}
          maxLength={Q7.maxLength}
          placeholder={Q7.placeholder}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
        <div className="field__meta">
          <span className="field__hint">
            {isEmpty
              ? 'Opciono. Pomaže Vladimiru da pripremi konkretniji odgovor.'
              : reachedMin
                ? 'Pomaže Vladimiru da pripremi konkretniji odgovor.'
                : `Još malo - minimum ${Q7.minLength} karaktera.`}
          </span>
          <span className="muted">
            {text.length}/{Q7.maxLength}
          </span>
        </div>
      </div>

      <div className="mt-24">
        {isEmpty ? (
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={() => onSubmit('')}
          >
            Preskoči
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary btn--block"
            disabled={!reachedMin}
            onClick={() => onSubmit(text.trim())}
          >
            Nastavi
          </button>
        )}
      </div>
    </div>
  )
}
