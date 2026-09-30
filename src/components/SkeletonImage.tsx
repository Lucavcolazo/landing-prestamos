import { useCallback, useState, type ImgHTMLAttributes } from 'react'

/** Imagen con placeholder animado (skeleton) mientras carga. */
export function SkeletonImage({ className, onLoad, ...img }: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false)

  // Si la imagen ya estaba en caché, `onLoad` puede no dispararse
  const ref = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <span className={`skel-img${loaded ? ' is-loaded' : ''}${className ? ` ${className}` : ''}`}>
      <img
        ref={ref}
        {...img}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
      />
    </span>
  )
}
