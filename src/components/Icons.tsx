type IconProps = { size?: number }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  viewBox: '0 0 24 24',
}

export function ArrowRight({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} strokeWidth={2.2} className="i-arrow" {...base}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

export function ArrowLeft({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} strokeWidth={2.2} {...base}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  )
}

export function Chat({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} strokeWidth={2} {...base}>
      <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />
    </svg>
  )
}

export function Chevron({ size = 26, className }: IconProps & { className?: string }) {
  return (
    <svg width={size} height={size} strokeWidth={2.2} className={className} {...base}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function Menu({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} strokeWidth={2.2} {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function Close({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} strokeWidth={2.2} {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
