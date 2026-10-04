/**
 * Título y descripción de cada página. Los usa el build (vite.config.ts) para generar
 * un HTML por ruta, así Google los lee sin ejecutar JavaScript, y `usePageMeta`
 * para actualizarlos al navegar dentro del sitio.
 */
export interface PageMeta {
  title: string
  description: string
}

export const PAGES = {
  '/': {
    title: 'Préstamos Militares',
    description:
      'Préstamos para personal en actividad y retirado de las Fuerzas Armadas y de Seguridad de todo el país. Simulá tu cuota y consultá por WhatsApp.',
  },
  '/sobre-mi': {
    title: 'Diego Ojeda · Representante de SMSV en Paraná, Entre Ríos',
    description:
      'Diego Ojeda es representante de la Sociedad Militar Seguro de Vida (SMSV) en Paraná, Entre Ríos. Préstamos para personal activo y retirado de las Fuerzas Armadas y de Seguridad.',
  },
  '/calculo': {
    title: 'Simulador de préstamos militares',
    description:
      'Calculá la cuota mensual y cuánto dinero recibís en mano. Para activos y retirados de las Fuerzas Armadas y de Seguridad.',
  },
  '/privacidad': {
    title: 'Política de privacidad · Préstamos Militares',
    description: 'Qué datos se usan en este sitio, para qué y cómo ejercer tus derechos sobre ellos.',
  },
} satisfies Record<string, PageMeta>

export type Ruta = keyof typeof PAGES
