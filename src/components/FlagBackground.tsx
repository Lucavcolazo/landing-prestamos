import { useEffect, useRef, useState } from 'react'

const SLICES = 37

/**
 * Fondo del hero: video de la bandera en loop (public/video/bandera.webm / .mp4).
 * El poster se muestra al instante mientras carga el video; si el video no se puede
 * reproducir, queda una bandera animada en CSS.
 * Al hacer scroll se difumina para que el contenido se lea mejor.
 */
export function FlagBackground() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      const h = el.parentElement?.offsetHeight || window.innerHeight
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.8)))
      el.style.opacity = String(1 - 0.75 * p)
      el.style.filter = p > 0 ? `blur(${(8 * p).toFixed(2)}px)` : ''
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

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
          className="flag__video"
          autoPlay={!reduceMotion}
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
