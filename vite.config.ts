import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

/**
 * URL pública del sitio para las etiquetas de compartir (WhatsApp/Facebook piden URLs absolutas).
 * En Vercel se toma sola del dominio de producción; se puede forzar con SITE_URL.
 */
function siteUrl(): Plugin {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const url = (process.env.SITE_URL || (vercel ? `https://${vercel}` : '')).replace(/\/$/, '')
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', url),
  }
}

export default defineConfig({
  plugins: [react(), siteUrl()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
})
