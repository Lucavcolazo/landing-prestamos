import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/useReveal'

const SLICES = 37

/**
 * Fondo del hero: video de la bandera en loop (public/video/bandera.webm / .mp4).
 * El poster se muestra al instante mientras carga el video; si el video no se puede
 * reproducir, queda una bandera animada en CSS.
 * Al hacer scroll se difumina para que el contenido se lea mejor. En pantallas chicas solo
 * baja la opacidad (el blur sobre video es costoso en celulares de gama baja).
 * El video arranca y se pausa según esté en pantalla (sin `autoPlay`, para que el HTML
 * pre-generado sea igual al del navegador).
 */
export function FlagBackground() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)

  // Difuminado con el scroll
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const conBlur = window.matchMedia('(min-width: 761px) and (pointer: fine)')
    let frame = 0
    let idle = 0
    const update = () => {
      frame = 0
      const h = el.parentElement?.offsetHeight || window.innerHeight
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.8)))
      el.style.opacity = String(1 - 0.75 * p)
      el.style.filter = conBlur.matches && p > 0 ? `blur(${(8 * p).toFixed(2)}px)` : ''
    }
    const onScroll = () => {
      // `will-change` solo mientras hay scroll, no en reposo
      el.style.willChange = 'opacity, filter'
      window.clearTimeout(idle)
      idle = window.setTimeout(() => (el.style.willChange = ''), 200)
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(idle)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Reproducir el video solo mientras está en pantalla
  useEffect(() => {
    const el = wrapRef.current
    const video = videoRef.current
    if (!el || !video || prefersReducedMotion() || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [videoFailed])

  return (
    <div className="flag" ref={wrapRef} aria-hidden="true">
      {videoFailed ? (
        <div className="flag__css">
          {Array.from({ length: SLICES }, (_, i) => (
            <div
              key={i}
              className="flag__slice"
              style={{
                backgroundPositionX: `${(i / (SLICES - 1)) * 100}%`,
                animationDelay: `${-i * 0.14}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <video
          ref={videoRef}
          className="flag__video"
          muted
          loop
          playsInline
          preload="auto"
          poster="/video/bandera-poster.jpg"
          onError={() => setVideoFailed(true)}
        >
          <source src="/video/bandera.webm" type="video/webm" />
          <source src="/video/bandera.mp4" type="video/mp4" onError={() => setVideoFailed(true)} />
        </video>
      )}
    </div>
  )
}
