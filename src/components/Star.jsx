/* Zlatna četvorokraka zvezda - primarni simbol brenda (Brand Book 01) */
export default function Star({ size = 22, color = 'var(--gold)' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M50 0 C53 30 70 47 100 50 C70 53 53 70 50 100 C47 70 30 53 0 50 C30 47 47 30 50 0 Z"
        fill={color}
      />
    </svg>
  )
}
