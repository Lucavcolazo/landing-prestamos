/**
 * Mete el contenido de cada página en su HTML del build, para que buscadores y asistentes
 * de IA lean el texto sin ejecutar JavaScript. En el navegador, React lo retoma (hydrate).
 *
 * /calculo no se pre-genera: se carga aparte y sus resultados dependen de la fecha del día.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const PAGINAS = {
  '/': 'index.html',
  '/sobre-mi': 'sobre-mi.html',
  '/privacidad': 'privacidad.html',
}

const ssrDir = path.resolve('dist-ssr')
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

for (const [ruta, archivo] of Object.entries(PAGINAS)) {
  const file = path.resolve('dist', archivo)
  const html = fs.readFileSync(file, 'utf8')
  const vacio = '<div id="root"></div>'
  if (!html.includes(vacio)) throw new Error(`${archivo}: no se encontró ${vacio}`)
  fs.writeFileSync(file, html.replace(vacio, `<div id="root">${render(ruta)}</div>`))
  console.log(`prerender: ${ruta} -> dist/${archivo}`)
}

fs.rmSync(ssrDir, { recursive: true, force: true })
