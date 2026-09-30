import { useEffect, useRef, useState } from 'react'
import { CENTROS, MAPA_ALTO, MAPA_ANCHO, PROVINCIAS } from '@/data/mapaArgentina'
import { prefersReducedMotion } from '@/lib/useReveal'

const ORIGEN_ID = '30' // Entre Ríos

/** Destinos de las flechas (código INDEC) y hacia qué lado se curva cada una. */
const DESTINOS: { id: string; curva: 1 | -1 }[] = [
  { id: '38', curva: -1 }, // Jujuy
  { id: '54', curva: 1 }, // Misiones
  { id: '50', curva: -1 }, // Mendoza
  { id: '06', curva: -1 }, // Buenos Aires
  { id: '26', curva: 1 }, // Chubut
  { id: '94', curva: 1 }, // Tierra del Fuego
]

const DURACION = 3.6 // segundos de cada ciclo de flecha
const DESFASE = 0.55 // segundos entre flechas

function ruta(o: [number, number], t: [number, number], curva: number) {
  const [ox, oy] = o
  const [tx, ty] = t
  const dx = tx - ox
  const dy = ty - oy
  const largo = Math.hypot(dx, dy)
  const cx = (ox + tx) / 2 + (-dy / largo) * largo * 0.22 * curva
  const cy = (oy + ty) / 2 + (dx / largo) * largo * 0.22 * curva
  // Ángulo de llegada, para orientar la punta cuando no hay animación
  const angulo = (Math.atan2(ty - cy, tx - cx) * 180) / Math.PI
  return { d: `M ${ox} ${oy} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${tx} ${ty}`, angulo }
}

/**
 * Mapa de Argentina con Entre Ríos resaltada y flechas que salen hacia el resto del país.
 * Las animaciones son SVG nativas (SMIL); se pausan fuera de pantalla y no se usan con
 * "reducir movimiento" (en ese caso las flechas quedan dibujadas, quietas).
 */
export function MapaCobertura() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [animar] = useState(() => !prefersReducedMotion())
  const origen = CENTROS[ORIGEN_ID]

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !animar || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(([e]) => (e.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()))
    obs.observe(svg)
    return () => obs.disconnect()
  }, [animar])

  return (
    <svg
      ref={svgRef}
      className="mapa"
      viewBox={`0 0 ${MAPA_ANCHO} ${MAPA_ALTO}`}
      role="img"
      aria-labelledby="mapa-titulo"
    >
      <title id="mapa-titulo">Mapa de Argentina con Entre Ríos resaltada y flechas hacia el resto del país</title>

      <g className="mapa__provincias">
        {PROVINCIAS.map((p) => (
          <path key={p.id} d={p.d} fillRule="evenodd" className={p.id === ORIGEN_ID ? 'is-origen' : undefined} />
        ))}
      </g>

      {DESTINOS.map((dest, i) => {
        const t = CENTROS[dest.id]
        const { d, angulo } = ruta(origen, t, dest.curva)
        const begin = `${(i * DESFASE).toFixed(2)}s`
        const dur = `${DURACION}s`
        return (
          <g key={dest.id}>
            <path d={d} pathLength={1} className="mapa__ruta" strokeDasharray="1" strokeDashoffset={animar ? 1 : 0}>
              {animar && (
                <>
                  <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.5;1" dur={dur} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.78;1" dur={dur} begin={begin} repeatCount="indefinite" />
                </>
              )}
            </path>

            <path
              d="M -7 -5 L 4 0 L -7 5 Z"
              className="mapa__punta"
              opacity={animar ? 0 : 1}
              transform={animar ? undefined : `translate(${t[0]} ${t[1]}) rotate(${angulo.toFixed(1)})`}
            >
              {animar && (
                <>
                  <animateMotion path={d} rotate="auto" keyPoints="0;1;1" keyTimes="0;0.5;1" calcMode="linear" dur={dur} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.78;1" dur={dur} begin={begin} repeatCount="indefinite" />
                </>
              )}
            </path>

            {animar && (
              <circle cx={t[0]} cy={t[1]} r={3} className="mapa__destino" opacity={0}>
                <animate attributeName="r" values="3;3;16;16" keyTimes="0;0.5;0.85;1" dur={dur} begin={begin} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0;0.9;0;0" keyTimes="0;0.49;0.5;0.85;1" dur={dur} begin={begin} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        )
      })}

      {animar && (
        <circle cx={origen[0]} cy={origen[1]} r={7} className="mapa__pulso">
          <animate attributeName="r" values="7;26" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
      )}
      <circle cx={origen[0]} cy={origen[1]} r={6} className="mapa__origen" />
    </svg>
  )
}
