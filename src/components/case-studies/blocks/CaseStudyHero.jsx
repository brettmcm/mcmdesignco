export default function CaseStudyHero({
  bgSrc,
  bgAlt = '',
  bgFallbackSrc,
  markVectorSrc,
  markVectorAlt = '',
  markVectorFallbackSrc,
}) {
  return (
    <div className="cs-hero">
      <img
        className="cs-hero__bg"
        src={bgSrc}
        alt={bgAlt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={
          bgFallbackSrc
            ? (e) => {
                e.currentTarget.src = bgFallbackSrc
              }
            : undefined
        }
      />
      <div className="cs-hero__inner">
        <div className="cs-hero__mark">
          {markVectorSrc ? (
            <img
              className="cs-hero__vector"
              src={markVectorSrc}
              alt={markVectorAlt}
              loading="eager"
              decoding="async"
              onError={
                markVectorFallbackSrc
                  ? (e) => {
                      e.currentTarget.src = markVectorFallbackSrc
                    }
                  : undefined
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
