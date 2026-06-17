import Star from './Star'

/*
 * Header: zlatna zvezda + ime „Vladimir Vasić" (centrirano).
 * Kada postoji onBack, levo od logoa stoji kvadratno dugme samo sa strelicom.
 */
export default function BrandHeader({ onBack }) {
  return (
    <header className="brand">
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
    </header>
  )
}
