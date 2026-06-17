import { useState } from 'react'
import { Q7 } from '../data/questions'
import BackButton from './BackButton'

/*
 * Q7 - opciono free-text (ne boduje se). Bez eyebrow-a.
 * Dugme se menja: prazno -> "Preskoči"; kuca <20 -> "Nastavi" (disabled);
 * >=20 karaktera -> "Nastavi" (enabled).
 */
export default function Q7Step({ value, onSubmit, onBack }) {
  const [text, setText] = useState(value || '')
  const len = text.trim().length
  const isEmpty = len === 0
  const reachedMin = len >= Q7.minLength

  return (
    <div className="card fade-in">
      <BackButton onBack={onBack} />
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
        {!isEmpty && !reachedMin && (
          <span className="field__hint">
            Još malo - minimum {Q7.minLength} karaktera.
          </span>
        )}
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
