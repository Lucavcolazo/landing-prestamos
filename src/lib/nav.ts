export interface NavLink {
  to: string
  label: string
  /** id de la sección de la home que marca el link como activo (null si es otra página) */
  section: string | null
}

/** Secciones del sitio: las usan el navbar y el footer. */
export const NAV_LINKS: NavLink[] = [
  { to: '/', label: 'Inicio', section: 'inicio' },
  { to: '/#como-funciona', label: 'Cómo funciona', section: 'como-funciona' },
  { to: '/#sobre-mi', label: 'Sobre mí', section: 'sobre-mi' },
  { to: '/#preguntas', label: 'Preguntas', section: 'preguntas' },
  { to: '/calculo', label: 'Simulador', section: null },
]
