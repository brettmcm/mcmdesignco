const sourceImages = import.meta.glob(
  ['../assets/**/*.webp', '../assets/dt/{dt6-book,dt3-back,dt4-spread,dt-coin}.jpg'],
  { eager: true, import: 'default' },
)

const responsiveImages = import.meta.glob(
  ['../assets/**/*.webp', '../assets/dt/{dt6-book,dt3-back,dt4-spread,dt-coin}.jpg'],
  {
    eager: true,
    import: 'default',
    query: {
      w: '480;768;1200;1600;2400',
      format: 'webp',
      as: 'srcset',
    },
  },
)

const responsiveByUrl = new Map(
  Object.keys(sourceImages).map((path) => [sourceImages[path], responsiveImages[path]]),
)

export default function ResponsiveImage({
  src,
  fallbackSrc,
  alt = '',
  sizes = '100vw',
  onError,
  ...props
}) {
  const srcSet = responsiveByUrl.get(src)

  const handleError = (event) => {
    onError?.(event)
    if (!event.defaultPrevented && fallbackSrc && event.currentTarget.src !== fallbackSrc) {
      event.currentTarget.srcset = ''
      event.currentTarget.src = fallbackSrc
    }
  }

  if (!srcSet) {
    return <img src={src} alt={alt} sizes={sizes} onError={handleError} {...props} />
  }

  return (
    <img
      {...props}
      src={src}
      srcSet={srcSet}
      alt={alt}
      sizes={sizes}
      onError={handleError}
    />
  )
}
