import type { MouseEvent, ReactNode } from 'react'
import { SITE } from '@/config'

const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}`
const MAILTO = `mailto:${SITE.email}`

/**
 * Link al mail de Diego. En computadora abre un mail nuevo en Gmail (pestaña nueva);
 * en celular usa `mailto:` para abrir la app de correo del teléfono.
 */
export function EmailLink({ children = SITE.email }: { children?: ReactNode }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      e.preventDefault()
      window.location.href = MAILTO
    }
  }

  return (
    <a href={GMAIL} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {children}
    </a>
  )
}
