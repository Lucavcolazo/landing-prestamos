import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE, SMSV } from '@/config'
import { usePageMeta } from '@/lib/usePageMeta'

const ACTUALIZADA = '4 de octubre de 2026'

export function PrivacidadPage() {
  usePageMeta('/privacidad')

  return (
    <>
      <Header />
      <main className="pagina">
        <section className="pagina__head">
          <h1 className="display pagina__title">Política de privacidad</h1>
          <p className="muted">Última actualización: {ACTUALIZADA}</p>
        </section>

        <article className="section section--white legal">
          <h2 className="display h3">Responsable</h2>
          <p>
            {SITE.nombreFiscal}, CUIT {SITE.cuit}, de {SITE.ciudad}, {SITE.provincia}. Contacto:{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2 className="display h3">Qué datos usa este sitio</h2>
          <p>
            Este sitio no tiene formularios ni cuentas de usuario, y no guarda los datos que cargás en el simulador: el
            cálculo se hace en tu navegador. Si tocás el botón de WhatsApp, se abre un mensaje con tu simulación que vos
            decidís enviar o no.
          </p>
          <p>
            Para saber cuántas personas visitan el sitio y qué tan rápido carga, usamos las métricas de Vercel (el
            servicio que aloja la web). Son datos anónimos y agregados, y no usan cookies.
          </p>

          <h2 className="display h3">Para qué se usan los datos que me enviás</h2>
          <p>
            Los datos que me mandás por WhatsApp o por email (nombre, fuerza, recibo de haberes, DNI) se usan solo para
            responder tu consulta y, si decidís avanzar, para gestionar tu solicitud ante la {SMSV.nombre} ({SMSV.sigla}).
            No se venden ni se comparten con nadie más.
          </p>

          <h2 className="display h3">Tus derechos</h2>
          <p>
            Podés pedir en cualquier momento acceder a tus datos, corregirlos o que se eliminen, escribiendo a{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
          <p className="muted">
            El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma
            gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme
            lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326. La Agencia de Acceso a la Información Pública,
            en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y
            reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes
            en materia de protección de datos personales.
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
