import { useEffect, useRef } from 'react'

interface Paso {
  titulo: string
  texto: string
}

/** Debe coincidir con la media query de `.howto` en styles.css (sección fijada). */
export const PIN_QUERY = '(min-width: 1101px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'
/** Parte final del recorrido fijado en la que los pasos quedan completos antes de soltar. */
const PAUSA_FINAL = 0.18

/**
 * Pasos unidos por una línea que se completa con el scroll.
 * - Con la sección fijada (escritorio): el avance es cuánto se recorrió del contenedor `[data-pin]`.
 * - Sin fijar (celular/tablet): la punta de la línea sigue una altura fija de la pantalla.
 * Cada tramo entre dos pasos se llena por separado (`--seg` de 0 a 1).
 */
export function Timeline({ pasos }: { pasos: Paso[] }) {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const items = Array.from(list.children) as HTMLElement[]
    const tramos = items.length - 1
    const pin = list.closest<HTMLElement>('[data-pin]')
    const pinMq = window.matchMedia(PIN_QUERY)
    let frame = 0

    const progresoFijado = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect()
      const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0
      const sticky = el.firstElementChild as HTMLElement
      const recorrido = rect.height - sticky.offsetHeight
      if (recorrido <= 0) return 1
      const p = (headerH - rect.top) / recorrido
      return p / (1 - PAUSA_FINAL)
    }

    const progresoLibre = () => {
      const vh = window.innerHeight
      const rect = list.getBoundingClientRect()
      return (vh * 0.65 - rect.top) / rect.height
    }

    const update = () => {
      frame = 0
      const raw = pin && pinMq.matches ? progresoFijado(pin) : progresoLibre()
      const p = Math.min(1, Math.max(0, raw))
      const avance = p * tramos
      items.forEach((li, i) => {
        li.style.setProperty('--seg', String(Math.min(1, Math.max(0, avance - i))))
        li.classList.toggle('is-active', p > 0 && avance >= i - 0.001)
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    pinMq.addEventListener('change', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      pinMq.removeEventListener('change', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <ol className="timeline" ref={listRef}>
      {pasos.map((p, i) => (
        <li key={p.titulo} className="timeline__step">
          <span className="display timeline__node" aria-hidden="true">{i + 1}</span>
          <div className="timeline__body">
            <h3 className="timeline__title">
              <span className="sr-only">Paso {i + 1}: </span>
              {p.titulo}
            </h3>
            <p className="timeline__text">{p.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
