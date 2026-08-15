import ResponsiveImage from '../../ResponsiveImage'

export default function CaseStudyImagePanel({
  src,
  fallbackSrc,
  alt = '',
  aspectWidth,
  aspectHeight,
  borderRadius = 12,
  mixBlendMode,
}) {
  return (
    <div
      className="cs-image-panel"
      style={{
        aspectRatio: `${aspectWidth} / ${aspectHeight}`,
        borderRadius: `${borderRadius}px`,
        mixBlendMode: mixBlendMode,
      }}
    >
      <ResponsiveImage
        className="cs-image-panel__img"
        src={src}
        alt={alt}
        width={aspectWidth}
        height={aspectHeight}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 100vw, min(100vw, 1904px)"
        fallbackSrc={fallbackSrc}
      />
    </div>
  )
}
