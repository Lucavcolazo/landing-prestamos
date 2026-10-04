import { SITE, SMSV } from '@/config'
import { WA_INFO } from '@/lib/whatsapp'
import { Shield } from './Icons'

/** Aviso contra estafas: qué datos nunca se piden y por dónde se hacen los trámites. */
export function AvisoSeguridad() {
  return (
    <aside className="aviso" aria-labelledby="aviso-titulo">
      <span className="aviso__icono">
        <Shield />
      </span>
      <div className="aviso__texto">
        <h2 id="aviso-titulo" className="display aviso__titulo">Tu seguridad primero</h2>
        <p>
          <strong>Nunca te voy a pedir contraseñas de Mi Argentina, IAF ni home banking</strong>, ni códigos que te
          lleguen por SMS. Los trámites se hacen por los canales oficiales de {SMSV.sigla}.
        </p>
        <p className="muted">
          Si alguien te pide esos datos en mi nombre, no los compartas y avisame por{' '}
          <a href={WA_INFO} target="_blank" rel="noopener noreferrer">WhatsApp al {SITE.telefono}</a>.
        </p>
      </div>
    </aside>
  )
}
