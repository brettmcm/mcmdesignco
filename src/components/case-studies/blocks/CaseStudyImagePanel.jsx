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
      <img
        className="cs-image-panel__img"
        src={src}
        alt={alt}
        onError={
          fallbackSrc
            ? (e) => {
                e.currentTarget.src = fallbackSrc
              }
            : undefined
        }
      />
    </div>
  )
}

