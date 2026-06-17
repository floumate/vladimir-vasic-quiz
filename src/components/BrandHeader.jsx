import Star from './Star'

/*
 * Header: zlatna zvezda + ime „Vladimir Vasić" (centrirano).
 * Kada postoji onBack, kvadratno dugme samo sa strelicom stoji uz levu ivicu
 * kartice (header__inner deli istu container širinu kao kartica ispod).
 */
export default function BrandHeader({ onBack }) {
  return (
    <header className="header">
      <div className="header__inner">
        {onBack && (
          <button
            type="button"
            className="back-btn"
            onClick={onBack}
            aria-label="Nazad"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        <div className="brand__logo">
          <Star size={22} />
          <span className="brand__name">Vladimir Vasić</span>
        </div>
      </div>
    </header>
  )
}
