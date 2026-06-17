/*
 * Kvadratno back dugme (samo strelica) unutar kartice, iznad naslova stepa.
 * Levo se poravnava sa sadržajem kartice; razmak gore/levo/dole je jednak (vidi .card-back).
 */
export default function BackButton({ onBack }) {
  if (!onBack) return null
  return (
    <button
      type="button"
      className="card-back"
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
  )
}
