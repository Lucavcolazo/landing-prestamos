import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { App } from './App'
import './styles.css'

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* Métricas de Vercel: solo envían datos en el sitio desplegado */}
    <Analytics />
    <SpeedInsights />
  </StrictMode>
)

// Las páginas pre-generadas en el build ya traen el HTML: React lo retoma en vez de redibujarlo
const root = document.getElementById('root')!
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
