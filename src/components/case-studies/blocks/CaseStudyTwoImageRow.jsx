import ResponsiveImage from '../../ResponsiveImage'

export default function CaseStudyTwoImageRow({
  images,
  gap = 8,
  aspectWidth,
  aspectHeight,
  borderRadius = 4,
}) {
  return (
    <div className="cs-two-image-row" style={{ gap: `${gap}px` }}>
      {images?.map((img, idx) => (
        <div key={img.src ?? idx} className="cs-two-image-row__tile">
          <div
            className="cs-two-image-row__frame"
            style={{
              aspectRatio: `${aspectWidth} / ${aspectHeight}`,
              borderRadius: `${borderRadius}px`,
            }}
          >
            <ResponsiveImage
              className="cs-two-image-row__img"
              src={img.src}
              alt={img.alt ?? ''}
              width={aspectWidth}
              height={aspectHeight}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 50vw"
              fallbackSrc={img.fallbackSrc}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
