import type { MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { Link, useLocation, useNavigate, type LinkProps } from 'react-router-dom'
import { prefersReducedMotion } from '@/lib/useReveal'

/**
 * Link que, al cambiar de página, usa la View Transitions API para animar el paso
 * (por ejemplo, de la home al simulador). Si el navegador no la soporta, navega normal.
 */
export function TransitionLink({ to, onClick, ...rest }: LinkProps & { to: string }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const destino = to.split('#')[0] || '/'

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (destino === pathname || !document.startViewTransition || prefersReducedMotion()) return
    e.preventDefault()
    document.startViewTransition(() => {
      flushSync(() => navigate(to))
    })
  }

  return <Link to={to} onClick={handleClick} {...rest} />
}
