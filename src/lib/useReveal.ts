import { useEffect } from 'react'

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
  }
  return observer
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Anima la entrada de los elementos con `data-reveal` cuando aparecen en pantalla.
 * Corre después de cada render para tomar también los que se montan más tarde.
 */
export function useReveal() {
  useEffect(() => {
    const pendientes = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
    if (!pendientes.length) return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      pendientes.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const obs = getObserver()
    pendientes.forEach((el) => obs.observe(el))
  })
}

/** Demora escalonada para listas: `style={stagger(i)}`. */
export function stagger(i: number, stepMs = 80): React.CSSProperties {
  return { '--d': `${i * stepMs}ms` } as React.CSSProperties
}
