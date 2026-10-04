import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { PAGES } from './src/lib/seo.ts'

/**
 * URL pública del sitio para las etiquetas de compartir (WhatsApp/Facebook piden URLs absolutas).
 * En Vercel se toma sola del dominio de producción; se puede forzar con SITE_URL.
 */
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
const SITE_URL = (process.env.SITE_URL || (vercel ? `https://${vercel}` : '')).replace(/\/$/, '')

function siteUrl(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', SITE_URL),
  }
}

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Genera un HTML por página (sobre-mi.html, calculo.html, …) con su título, descripción y
 * URL canónica. Vercel los sirve sin la extensión gracias a `cleanUrls`.
 */
function pageHtml(): Plugin {
  return {
    name: 'page-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (index?.type !== 'asset') return
      const base = String(index.source)

      for (const [ruta, { title, description }] of Object.entries(PAGES)) {
        const t = escapeAttr(title)
        const d = escapeAttr(description)
        const url = `${SITE_URL}${ruta}`
        const html = base
          .replace(/<title>.*?<\/title>/, `<title>${t}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)

        if (ruta === '/') index.source = html
        else this.emitFile({ type: 'asset', fileName: `${ruta.slice(1)}.html`, source: html })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), siteUrl(), pageHtml()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
})
