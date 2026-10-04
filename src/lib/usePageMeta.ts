import { useEffect } from 'react'
import { PAGES, type Ruta } from './seo'

/** Pone el título y la descripción de la página al navegar dentro del sitio. */
export function usePageMeta(ruta: Ruta) {
  useEffect(() => {
    const { title, description } = PAGES[ruta]
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [ruta])
}
