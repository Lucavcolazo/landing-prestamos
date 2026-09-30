import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FlagBackground } from '@/components/FlagBackground'
import { SkeletonImage } from '@/components/SkeletonImage'
import { TransitionLink } from '@/components/TransitionLink'
import { ArrowRight, Chat, Chevron } from '@/components/Icons'
import { FUERZAS, SITE } from '@/config'
import { WA_INFO } from '@/lib/whatsapp'
import { stagger, useReveal } from '@/lib/useReveal'

const PASOS = [
  { titulo: 'Simulá tu préstamo', texto: 'Elegí el monto y las cuotas en el simulador y mirá cuánto pagarías por mes.' },
  { titulo: 'Envianos la consulta', texto: 'Con un botón mandás tu simulación por WhatsApp. Te respondemos personalmente.' },
  { titulo: 'Presentá tu recibo', texto: 'Con tu último recibo de haberes vemos cuánto tenés disponible para la cuota.' },
  { titulo: 'Evaluación y acreditación', texto: 'La entidad evalúa la solicitud y, una vez aprobada, coordinamos los pasos finales.' },
]

const PREGUNTAS = [
  {
    q: '¿Cómo se paga la cuota?',
    a: 'Se descuenta todos los meses de tu recibo de haberes. No tenés que hacer pagos por tu cuenta.',
  },
  {
    q: '¿Cuánto dinero me queda en mano?',
    a: 'Al monto que pedís se le descuentan el interés de los días hasta tu primera cuota y el seguro de vida inicial. El simulador te muestra un aproximado de lo que recibís.',
  },
  {
    q: '¿Puedo pedirlo si estoy retirado?',
    a: 'Sí. Trabajamos con personal en actividad y retirado de todas las fuerzas.',
  },
  {
    q: '¿Cuánto puedo pedir?',
    a: 'Depende de cuánto tengas disponible en tu recibo de haberes para la cuota. Con tu recibo te decimos el monto exacto. El máximo es de $30.000.000.',
  },
  {
    q: '¿El resultado del simulador es definitivo?',
    a: 'No, es una estimación de referencia. Antes de firmar te informamos por escrito la cuota, la TNA, la TEA y el CFT.',
  },
]

export function HomePage() {
  const [abierta, setAbierta] = useState(0)
  useReveal()

  return (
    <>
      <Header overHero />
      <main>
        <section id="inicio" className="hero">
          <FlagBackground />
          <div className="hero__overlay" />
          <div className="hero__content">
            <h1 className="display hero__title enter" style={stagger(0, 120)}>
              Préstamos para personal de las Fuerzas Armadas y de Seguridad
            </h1>
            <p className="hero__lead enter" style={stagger(1, 120)}>
              Para activos y retirados de todo el país. La cuota se descuenta directamente de tu recibo de haberes.
            </p>
            <div className="hero__actions enter" style={stagger(2, 120)}>
              <TransitionLink to="/calculo" className="btn btn--white">
                Simular mi préstamo <ArrowRight />
              </TransitionLink>
              <a href={WA_INFO} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
                <Chat /> Consultar por WhatsApp
              </a>
            </div>
          </div>
          <dl className="hero__facts enter" style={stagger(3, 120)}>
            <div>
              <dt className="display">Hasta 72 cuotas</dt>
              <dd>Fijas y en pesos</dd>
            </div>
            <div>
              <dt className="display">Hasta $30.000.000</dt>
              <dd>Según tu disponible de haberes</dd>
            </div>
            <div>
              <dt className="display">Activos y retirados</dt>
              <dd>Atención en todo el país</dd>
            </div>
          </dl>
        </section>

        <section id="requisitos" className="section section--white split">
          <div className="stack">
            <h2 className="display h2">¿Quién puede pedirlo?</h2>
            <p className="lead">Personal en actividad y retirado de:</p>
            <ul className="fuerzas">
              {FUERZAS.map((f, i) => (
                <li key={f.nombre} data-reveal style={stagger(i, 60)}>
                  <SkeletonImage src={f.escudo} alt={`Escudo de ${f.nombre}`} width={72} height={72} loading="lazy" />
                  <span>{f.nombre}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-soft">
            <h3 className="display h3">Qué necesitás</h3>
            <ul className="req-list">
              <li><span className="display">1</span>Tu último recibo de haberes</li>
              <li><span className="display">2</span>DNI</li>
            </ul>
            <p className="muted">
              La cuota no puede superar lo que tenés disponible en tu recibo de haberes (hasta el 30% según la
              normativa vigente). Si no sabés cuánto es, lo calculamos con vos.
            </p>
          </div>
        </section>

        <section id="como-funciona" className="section">
          <div className="section__head">
            <h2 className="display h2">Cómo funciona</h2>
            <p className="lead">
              Cuatro pasos. Te acompañamos en cada uno.
            </p>
          </div>
          <ol className="steps">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="step" data-reveal style={stagger(i, 110)}>
                <span className="display step__num">{i + 1}</span>
                <h3 className="step__title">{p.titulo}</h3>
                <p className="step__text">{p.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="simulador" className="band">
          <div className="stack">
            <h2 className="display h2">¿Cuánto pagarías por mes?</h2>
            <p className="lead lead--light">
              Probá distintos montos y plazos en el simulador. Es gratis y no te compromete a nada.
            </p>
          </div>
          <div className="band__cta">
            <TransitionLink to="/calculo" className="btn btn--white btn--lg">
              Abrir el simulador <ArrowRight />
            </TransitionLink>
          </div>
        </section>

        <section id="preguntas" className="section faq-layout">
          <div className="stack">
            <h2 className="display h2">Preguntas frecuentes</h2>
            <p className="muted-lg">
              ¿Te queda alguna duda? <Link to="/#sobre-mi">Escribinos</Link> y te la respondemos.
            </p>
          </div>
          <div className="faq">
            {PREGUNTAS.map((item, i) => {
              const open = abierta === i
              return (
                <div key={item.q} className="faq__item" data-reveal style={stagger(i, 70)}>
                  <h3 className="faq__h">
                    <button
                      type="button"
                      className="faq__q"
                      aria-expanded={open}
                      aria-controls={`faq-${i}`}
                      onClick={() => setAbierta(open ? -1 : i)}
                    >
                      {item.q}
                      <Chevron className={`chev${open ? ' is-open' : ''}`} />
                    </button>
                  </h3>
                  <div id={`faq-${i}`} className={`faq__a${open ? ' is-open' : ''}`} inert={!open}>
                    <div className="faq__a-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section id="sobre-mi" className="section section--white about">
          <div className="about__photo">
            {/* Reemplazar por <SkeletonImage src="/diego.jpg" alt="Diego [Apellido]" /> */}
            <span>Foto de Diego</span>
          </div>
          <div className="stack about__text">
            <h2 className="display h2">Sobre mí</h2>
            <p className="body-lg">
              Soy {SITE.nombre}, asesor de préstamos para personal de las Fuerzas Armadas y de Seguridad. Hace{' '}
              {SITE.aniosExperiencia} años acompaño a activos y retirados de todo el país.
            </p>
            <p className="body-lg muted">
              Te atiendo personalmente: te explico las condiciones con claridad, reviso tu recibo con vos y te
              acompaño hasta que el préstamo está acreditado.
            </p>
            <div className="about__cta">
              <a href={WA_INFO} className="btn btn--navy" target="_blank" rel="noopener noreferrer">
                <Chat /> Hablar con Diego
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
