import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CalculoSkeleton } from './pages/CalculoSkeleton'

const CalculoPage = lazy(() => import('./pages/CalculoPage').then((m) => ({ default: m.CalculoPage })))

function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const prevPath = useRef(pathname)

  // Página nueva: arranca arriba, sin animación (antes de pintar, para la transición)
  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  // `key` cambia en cada navegación: anclas y clicks a la misma página desplazan suave
  useEffect(() => {
    const mismaPagina = prevPath.current === pathname
    prevPath.current = pathname
    if (hash) {
      const id = hash.slice(1)
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
    } else if (mismaPagina && key !== 'default') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, hash, key])

  return null
}

export function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/calculo"
          element={
            <Suspense fallback={<CalculoSkeleton />}>
              <CalculoPage />
            </Suspense>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}
