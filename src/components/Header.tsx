import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NAV_LINKS } from '@/lib/nav'
import { WA_INFO } from '@/lib/whatsapp'
import { Chat, Close, Menu } from './Icons'
import { TransitionLink } from './TransitionLink'

const LINKS = NAV_LINKS

const SECCIONES = LINKS.map((l) => l.section).filter((s): s is string => !!s)

/** En la home, devuelve la sección del menú que está a la vista. */
function useSeccionActiva(activo: boolean) {
  const [seccion, setSeccion] = useState('inicio')
  useEffect(() => {
    if (!activo) return
    let frame = 0
    const update = () => {
      frame = 0
      const limite = window.innerHeight * 0.35
      let actual = 'inicio'
      for (const id of SECCIONES) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= limite) actual = id
      }
      setSeccion(actual)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [activo])
  return seccion
}

export function Header({ overHero = false }: { overHero?: boolean }) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const enHome = pathname === '/'
  const seccion = useSeccionActiva(enHome)

  useEffect(() => {
    if (!overHero) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [overHero])

  useEffect(() => setOpen(false), [pathname])

  const solid = !overHero || scrolled || open
  const esActual = (l: (typeof LINKS)[number]) => (l.section ? enHome && seccion === l.section : pathname === l.to)

  const cta =
    pathname === '/calculo' ? (
      <a href={WA_INFO} className="btn btn--white btn--sm" target="_blank" rel="noopener noreferrer">
        <Chat size={20} /> Consultar
      </a>
    ) : (
      <TransitionLink to="/calculo" className="btn btn--white btn--sm">Simular préstamo</TransitionLink>
    )

  return (
    <header className={`site-header${solid ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__bar">
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close size={24} /> : <Menu size={24} />}
          <span>{open ? 'Cerrar' : 'Menú'}</span>
        </button>

        <nav aria-label="Principal" className="nav">
          {LINKS.map((l) => (
            <TransitionLink
              key={l.to}
              to={l.to}
              className={`nav__link${esActual(l) ? ' is-current' : ''}`}
              aria-current={esActual(l) ? 'page' : undefined}
            >
              {l.label}
            </TransitionLink>
          ))}
        </nav>

        <div className="site-header__cta">{cta}</div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Menú" className="nav-mobile">
          {LINKS.map((l) => (
            <TransitionLink
              key={l.to}
              to={l.to}
              className={`nav-mobile__link${esActual(l) ? ' is-current' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </TransitionLink>
          ))}
        </nav>
      )}
    </header>
  )
}
