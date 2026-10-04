import { REDES, SITE } from '@/config'
import { WA_INFO } from '@/lib/whatsapp'
import { EmailLink } from './EmailLink'
import { Facebook, Instagram, Mail, WhatsApp } from './Icons'

/** Medios de contacto con el ícono de cada app: WhatsApp, mail, Facebook e Instagram. */
export function Canales({ className = '' }: { className?: string }) {
  return (
    <ul className={`canales${className ? ` ${className}` : ''}`}>
      <li>
        <a href={WA_INFO} target="_blank" rel="noopener noreferrer">
          <WhatsApp size={20} /> {SITE.telefono}
        </a>
      </li>
      <li>
        <EmailLink>
          <Mail size={20} /> {SITE.email}
        </EmailLink>
      </li>
      <li>
        <a href={REDES.facebook} target="_blank" rel="noopener noreferrer me">
          <Facebook size={20} /> {REDES.facebookNombre}
        </a>
      </li>
      <li>
        <a href={REDES.instagram} target="_blank" rel="noopener noreferrer me">
          <Instagram size={20} /> {REDES.instagramUsuario}
        </a>
      </li>
    </ul>
  )
}
