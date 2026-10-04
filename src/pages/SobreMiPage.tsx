import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SkeletonImage } from '@/components/SkeletonImage'
import { AvisoSeguridad } from '@/components/AvisoSeguridad'
import { External, WhatsApp } from '@/components/Icons'
import { REDES, SITE, SMSV } from '@/config'
import { WA_INFO } from '@/lib/whatsapp'
import { usePageMeta } from '@/lib/usePageMeta'
import { stagger } from '@/lib/useReveal'

export function SobreMiPage() {
  usePageMeta('/sobre-mi')

  return (
    <>
      <Header />
      <main className="pagina">
        <section className="pagina__head">
          <div className="perfil perfil--grande enter" style={stagger(0, 120)}>
            {SITE.foto ? (
              <SkeletonImage className="perfil__foto" src={SITE.foto} alt={SITE.nombre} width={160} height={160} decoding="async" />
            ) : (
              <span className="perfil__foto perfil__foto--iniciales" aria-hidden="true">
                {SITE.nombre.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </span>
            )}
            <div className="stack">
              <h1 className="display pagina__title">{SITE.nombre}</h1>
              <p className="lead">
                Representante de la {SMSV.nombre} ({SMSV.sigla}) en {SITE.ciudad}, {SITE.provincia}.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--white split split--top">
          <div className="stack">
            <h2 className="display h2">Quién soy</h2>
            <p className="body-lg">
              Soy {SITE.nombre}, representante de la {SMSV.nombre} ({SMSV.sigla}).
            </p>
            <p className="body-lg">
              Hace {SITE.aniosExperiencia} años asesoro a personal en actividad y retirado de las Fuerzas Armadas y de
              Seguridad Nacionales. Mi formación como Experto Universitario en Mercado de Capitales (UTN) me permite
              analizar cada opción con criterio y ayudarte a elegir la que realmente te conviene.
            </p>
            <p className="body-lg muted">
              Atención presencial en {SITE.provincia} y zonas cercanas, y por WhatsApp desde cualquier lugar del país.
              Analizamos juntos tu situación y buscamos la mejor solución, con condiciones claras desde el primer
              momento.
            </p>
          </div>

          <div className="card-soft">
            <h3 className="display h3">Representante de {SMSV.sigla}</h3>
            <p className="body-lg">
              Figuro en el listado oficial de representantes de la {SMSV.nombre}, en la provincia de {SITE.provincia}:
            </p>
            <p className="ficha">
              <span>{SITE.ciudad.toUpperCase()}: Ojeda, Diego</span>
              <span>{SITE.telefono}</span>
            </p>
            <div>
              <a href={SMSV.representantes} className="btn btn--navy" target="_blank" rel="noopener noreferrer">
                Ver el listado en smsv.com.ar <External />
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section__head section__head--flush">
            <h2 className="display h2">Qué es la {SMSV.nombre}</h2>
            <p className="body-lg">
              La {SMSV.nombre} ({SMSV.sigla}) es una mutual creada en 1901 para mejorar la calidad de vida de los
              integrantes de las Fuerzas Armadas, de las Fuerzas de Seguridad y de sus familias. Ofrece servicios en todo
              el país, entre ellos ayudas económicas con la cuota descontada del recibo de haberes.
            </p>
            <p className="body-lg muted">
              Como representante, te asesoro y gestiono tu solicitud. La evaluación y el otorgamiento del préstamo los
              hace {SMSV.sigla}.
            </p>
            <p>
              <a href={SMSV.web} className="link-ext" target="_blank" rel="noopener noreferrer">
                Sitio oficial de {SMSV.sigla} <External />
              </a>
            </p>
          </div>
        </section>

        <section className="section section--white section--aviso">
          <AvisoSeguridad />
        </section>

        <section className="band">
          <div className="stack">
            <h2 className="display h2">Contacto</h2>
            <dl className="datos">
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={WA_INFO} target="_blank" rel="noopener noreferrer">{SITE.telefono}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
              </div>
              <div>
                <dt>Redes</dt>
                <dd>
                  <a href={REDES.instagram} target="_blank" rel="noopener noreferrer me">Instagram</a>
                  {' · '}
                  <a href={REDES.facebook} target="_blank" rel="noopener noreferrer me">Facebook</a>
                </dd>
              </div>
              <div>
                <dt>Zona</dt>
                <dd>
                  {SITE.ciudad}, {SITE.provincia}. Atención a todo el país.
                </dd>
              </div>
            </dl>
          </div>
          <div className="band__cta">
            <a href={WA_INFO} className="btn btn--navy btn--lg" target="_blank" rel="noopener noreferrer">
              <WhatsApp /> Escribir por WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
