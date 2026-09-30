/**
 * Monograma "DO" de Diego Ojeda. La parte principal usa `currentColor` (blanco en el navbar)
 * y el bloque del trazo de la D va siempre en celeste.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 80" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 0H26A26 26 0 0 1 52 26V54A26 26 0 0 1 26 80H0ZM15 14V66H24A13 13 0 0 0 37 53V27A13 13 0 0 0 24 14Z"
      />
      <rect x="0" y="20" width="15" height="20" fill="#74acdf" />
      <path fill="currentColor" fillRule="evenodd" d="M80 0A20 20 0 0 1 100 20V60A20 20 0 0 1 60 60V20A20 20 0 0 1 80 0ZM80 14A5 5 0 0 0 75 19V61A5 5 0 0 0 85 61V19A5 5 0 0 0 80 14Z" />
    </svg>
  )
}
