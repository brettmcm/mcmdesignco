export default function CaseStudyMosaicGrid({
  templateColumns,
  templateRows,
  gapX = 0,
  gapY = 0,
  height,
  aspectWidth,
  aspectHeight,
  borderRadius = 2,
  tiles,
}) {
  return (
    <div
      className="cs-mosaic"
      style={{
        gridTemplateColumns: templateColumns,
        gridTemplateRows: templateRows,
        gap: `${gapY}px ${gapX}px`,
        height: height ? `${height}px` : undefined,
        aspectRatio:
          !height && aspectWidth && aspectHeight
            ? `${aspectWidth} / ${aspectHeight}`
            : undefined,
        borderRadius: `${borderRadius}px`,
      }}
    >
      {tiles?.map((tile) => (
        <div
          key={tile.key}
          className="cs-mosaic__tile"
          style={{
            gridColumn: `${tile.colStart} / span ${tile.colSpan ?? 1}`,
            gridRow: `${tile.rowStart} / span ${tile.rowSpan ?? 1}`,
          }}
        >
          {tile.bgColor ? (
            <div
              className="cs-mosaic__tile-bg"
              style={{ background: tile.bgColor }}
              aria-hidden="true"
            />
          ) : null}
          {tile.images?.map((img, idx) => (
            <img
              key={`${tile.key}-img-${idx}`}
              className="cs-mosaic__img"
              src={img.src}
              alt={img.alt ?? ''}
              loading="lazy"
              decoding="async"
              onError={
                img.fallbackSrc
                  ? (e) => {
                      e.currentTarget.src = img.fallbackSrc
                    }
                  : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  )
}
