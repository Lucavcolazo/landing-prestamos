import { useMemo, useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TransitionLink } from '@/components/TransitionLink'
import { ArrowLeft, WhatsApp } from '@/components/Icons'
import { CALC } from '@/config'
import { simular } from '@/lib/finance'
import { formatMontoInput, money, parseMonto } from '@/lib/format'
import { waLink } from '@/lib/whatsapp'
import { stagger } from '@/lib/useReveal'
import { usePageMeta } from '@/lib/usePageMeta'

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

export function CalculoPage() {
  usePageMeta('/calculo')
  const [montoTxt, setMontoTxt] = useState('')
  const [plazo, setPlazo] = useState(48)
  const [anio, setAnio] = useState('')
  const [fuerza, setFuerza] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [nombre, setNombre] = useState('')

  const hoy = useMemo(() => new Date(), [])
  const montoIngresado = parseMonto(montoTxt)
  const monto = Math.min(montoIngresado, CALC.montoMax)
  const montoOk = monto >= CALC.montoMin
  const anioNum = parseInt(anio, 10)
  const fechaOk = anio.length === 4 && anioNum >= 1900 && anioNum <= hoy.getFullYear()

  const sim = useMemo(
    () =>
      simular({
        monto,
        plazo,
        anioNac: fechaOk ? anioNum : 0,
        tnaPct: CALC.tnaPct,
        diaCorte: CALC.diaCorte,
        diasHabilesPago: CALC.diasHabilesPago,
        hoy,
      }),
    [monto, plazo, fechaOk, anioNum, hoy],
  )

  const listo = montoOk && fechaOk

  let aviso = ''
  if (montoIngresado > CALC.montoMax) aviso = `El monto máximo es ${money(CALC.montoMax)}. Calculamos con ese valor.`
  else if (montoIngresado > 0 && !montoOk) aviso = `El monto mínimo es ${money(CALC.montoMin)}.`
  else if (fechaOk && sim.edadActuarial < 18) aviso = 'Revisá la fecha de nacimiento.'
  else if (fechaOk && sim.edadActuarial > 70)
    aviso = 'Por tu edad, las condiciones pueden ser distintas. Consultanos y lo vemos con vos.'

  const primeraTxt = `Con el haber de ${MESES[sim.primerCargo.getMonth()]} ${sim.primerCargo.getFullYear()}`

  const mensaje = [
    'Hola Diego, hice una simulación en la web:',
    nombre.trim() && `- Nombre: ${nombre.trim()}`,
    fuerza.trim() && `- Fuerza: ${fuerza.trim()}`,
    ciudad.trim() && `- Ciudad: ${ciudad.trim()}`,
    fechaOk && `- Año de nacimiento: ${anio}`,
    `- Monto: ${montoOk ? money(monto) : '-'}`,
    `- Plazo: ${plazo} cuotas`,
    `- Primera cuota: ${listo ? money(sim.cuotaTotal) : '-'}`,
    `- En mano: ${listo ? money(sim.enMano) : '-'}`,
    'Quiero más información.',
  ]
    .filter(Boolean)
    .join('\n')

  const dash = '—'

  return (
    <>
      <Header />
      <main className="calc">
        <div className="calc__head">
          <TransitionLink to="/" className="back-link enter"><ArrowLeft /> Volver al inicio</TransitionLink>
          <h1 className="display calc__title enter" style={stagger(1, 90)}>Simulá tu préstamo</h1>
          <p className="lead enter" style={stagger(2, 90)}>
            Con tres datos te mostramos cuánto pagarías por mes y cuánto dinero te quedaría en mano. Después podés
            enviarnos la simulación por WhatsApp.
          </p>
        </div>

        <div className="calc__grid">
          <form className="calc__form enter" style={stagger(3, 90)} onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="field-group">
              <label className="lbl" htmlFor="monto">1. Monto que necesitás</label>
              <div className="money">
                <span aria-hidden="true">$</span>
                <input
                  id="monto"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="0"
                  value={montoTxt}
                  onChange={(e) => setMontoTxt(formatMontoInput(e.target.value))}
                />
              </div>
            </div>

            <fieldset className="field-group">
              <legend className="lbl">2. Cantidad de cuotas</legend>
              <div className="plazos">
                {CALC.plazos.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`seg${p === plazo ? ' is-on' : ''}`}
                    aria-pressed={p === plazo}
                    onClick={() => setPlazo(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="field-group">
              <label className="lbl" htmlFor="anio">3. Año de nacimiento</label>
              <input
                id="anio"
                className="field field--anio"
                inputMode="numeric"
                autoComplete="bday-year"
                placeholder="AAAA"
                value={anio}
                onChange={(e) => setAnio(e.target.value.replace(/\D/g, '').slice(0, 4))}
              />
            </div>

            <div className="field-group field-group--sep">
              <label className="lbl" htmlFor="fuerza">Fuerza a la que pertenecés</label>
              <input
                id="fuerza"
                className="field"
                autoComplete="off"
                placeholder="Ej.: Ejército, Gendarmería, Policía Federal"
                value={fuerza}
                maxLength={60}
                onChange={(e) => setFuerza(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label className="lbl" htmlFor="ciudad">Ciudad</label>
              <input
                id="ciudad"
                className="field"
                autoComplete="address-level2"
                placeholder="Ej.: Paraná"
                value={ciudad}
                maxLength={60}
                onChange={(e) => setCiudad(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label className="lbl" htmlFor="nombre">
                Tu nombre <span className="opt"></span>
              </label>
              <input
                id="nombre"
                className="field"
                autoComplete="name"
                placeholder="Ej.: Juan Pérez"
                value={nombre}
                maxLength={60}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </form>

          <aside className="result enter" style={stagger(4, 90)} aria-label="Resultado de la simulación">
            <div className="result__main" aria-live="polite" aria-atomic="true">
              <span className="result__label">Te queda en mano</span>
              <span key={listo ? Math.round(sim.enMano) : 0} className="display result__big num-pop">{listo ? money(sim.enMano) : dash}</span>
              {!listo && (
                <span className="result__sub">
                  {montoOk ? 'Completá tu año de nacimiento para ver el resultado' : 'Ingresá el monto para ver el resultado'}
                </span>
              )}
            </div>

            {aviso && <p className="result__aviso num-pop">{aviso}</p>}

            <div className="rows">
              <div className="row"><span>Monto solicitado</span><strong>{montoOk ? money(monto) : dash}</strong></div>
              <div className="row">
                <span>
                  Primera cuota
                  <small>{primeraTxt}</small>
                </span>
                <strong key={listo ? Math.round(sim.cuotaTotal) : 0} className="num-pop">{listo ? money(sim.cuotaTotal) : dash}</strong>
              </div>
              <div className="row"><span>Tasa (TNA)</span><strong>{CALC.tnaPct}%</strong></div>
              <div className="row row--cft">
                <span>CFT aprox.</span>
                <strong>{CALC.cftPct.toLocaleString('es-AR')}%</strong>
              </div>
            </div>

            <div className="result__send">
              <a href={waLink(mensaje)} className="btn btn--white btn--lg btn--block" target="_blank" rel="noopener noreferrer">
                <WhatsApp size={24} /> Solicitar
              </a>
              <span className="result__note">
                Se abre WhatsApp con el resumen listo. No se envía nada hasta que vos lo confirmes.
              </span>
            </div>

            <p className="result__legal">
              Esto es una simulación. Los valores son de referencia y pueden variar al momento de realizar la
              solicitud.
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
