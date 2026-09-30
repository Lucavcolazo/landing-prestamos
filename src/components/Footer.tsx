import { SITE } from '@/config'
import { NAV_LINKS } from '@/lib/nav'
import { WA_INFO } from '@/lib/whatsapp'
import { Chat } from './Icons'
import { TransitionLink } from './TransitionLink'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__cta">
          <p className="display site-footer__title">¿Te quedó alguna duda?</p>
          <p className="site-footer__text">Escribime por WhatsApp y lo vemos juntos, sin compromiso.</p>
          <a href={WA_INFO} className="btn btn--white" target="_blank" rel="noopener noreferrer">
            <Chat /> Escribir por WhatsApp
          </a>
        </div>

        <nav aria-label="Secciones del sitio">
          <ul className="site-footer__links">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <TransitionLink to={l.to}>{l.label}</TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="site-footer__legal">
        {SITE.nombre} actúa como promotor y asesor. Los préstamos están sujetos a evaluación crediticia y a las
        condiciones de la entidad otorgante. Los valores del simulador son de referencia.
      </p>
    </footer>
  )
}
