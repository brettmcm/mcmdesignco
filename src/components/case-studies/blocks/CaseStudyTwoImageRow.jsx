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
            <img
              className="cs-two-image-row__img"
              src={img.src}
              alt={img.alt ?? ''}
              onError={
                img.fallbackSrc
                  ? (e) => {
                      e.currentTarget.src = img.fallbackSrc
                    }
                  : undefined
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}

