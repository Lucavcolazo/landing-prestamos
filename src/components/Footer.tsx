import { DATA_FISCAL, REDES, SITE, SMSV } from '@/config'
import { NAV_LINKS } from '@/lib/nav'
import { WA_INFO } from '@/lib/whatsapp'
import { WhatsApp } from './Icons'
import { TransitionLink } from './TransitionLink'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__cta">
          <p className="display site-footer__title">¿Te quedó alguna duda?</p>
          <p className="site-footer__text">Escribime por WhatsApp y lo vemos juntos, sin compromiso.</p>
          <a href={WA_INFO} className="btn btn--white" target="_blank" rel="noopener noreferrer">
            <WhatsApp /> Escribir por WhatsApp
          </a>
        </div>

        <nav aria-label="Secciones del sitio">
          <ul className="site-footer__links">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <TransitionLink to={l.to}>{l.label}</TransitionLink>
              </li>
            ))}
            <li>
              <TransitionLink to="/privacidad">Privacidad</TransitionLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="site-footer__datos">
        <address className="site-footer__contacto">
          <strong>{SITE.nombre}</strong>
          <span>
            Representante de la {SMSV.nombre} ({SMSV.sigla}) en {SITE.ciudad}, {SITE.provincia}
          </span>
          <span>
            WhatsApp <a href={WA_INFO} target="_blank" rel="noopener noreferrer">{SITE.telefono}</a>
            {' · '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </span>
          <span>
            <a href={REDES.instagram} target="_blank" rel="noopener noreferrer me">Instagram</a>
            {' · '}
            <a href={REDES.facebook} target="_blank" rel="noopener noreferrer me">Facebook</a>
          </span>
          <span>
            {SITE.nombreFiscal} · <span className="nowrap">CUIT {SITE.cuit}</span> · {SITE.condicionFiscal}
          </span>
        </address>

        <a className="site-footer__fiscal" href={DATA_FISCAL.href} target="_blank" rel="noopener noreferrer">
          <img src={DATA_FISCAL.img} alt="Data Fiscal de ARCA" width={66} height={90} loading="lazy" />
        </a>
      </div>

      <p className="site-footer__legal">
        {SITE.nombre} es representante de la {SMSV.nombre}; podés verificarlo en el{' '}
        <a href={SMSV.representantes} target="_blank" rel="noopener noreferrer">
          listado oficial de representantes de {SMSV.sigla}
        </a>
        . Los préstamos están sujetos a evaluación crediticia y a las condiciones de la entidad. Los valores del
        simulador son de referencia. Nunca te voy a pedir contraseñas ni claves de ningún tipo.
      </p>
    </footer>
  )
}
