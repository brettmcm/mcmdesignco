import ResponsiveImage from '../../ResponsiveImage'

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
      <ResponsiveImage
        className="cs-hero__bg"
        src={bgSrc}
        alt={bgAlt}
        loading="eager"
        decoding="async"
        fetchpriority="high"
        fallbackSrc={bgFallbackSrc}
      />
      <div className="cs-hero__inner">
        <div className="cs-hero__mark">
          {markVectorSrc ? (
            <ResponsiveImage
              className="cs-hero__vector"
              src={markVectorSrc}
              alt={markVectorAlt}
              loading="eager"
              decoding="async"
              fallbackSrc={markVectorFallbackSrc}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
