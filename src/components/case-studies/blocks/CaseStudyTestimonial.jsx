import ResponsiveImage from '../../ResponsiveImage'

export default function CaseStudyTestimonial({
  quoteParagraphs,
  authorName,
  authorRole,
  authorLogoSrc,
  bgImageSrc,
  bgImageFallbackSrc,
  authorLogoFallbackSrc,
  bgImageAlt = '',
}) {
  return (
    <div className="testimonial cs-testimonial">
      <div className="testimonial__bg" aria-hidden="true">
        {bgImageSrc ? (
          <ResponsiveImage
            src={bgImageSrc}
            alt={bgImageAlt}
            loading="lazy"
            decoding="async"
            fallbackSrc={bgImageFallbackSrc}
          />
        ) : null}
      </div>

      <div className="testimonial__content">
        <div className="testimonial__quote">
          {quoteParagraphs?.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="testimonial__footer">
          <p className="testimonial__author">
            <strong>{authorName}</strong>, <em>{authorRole}</em>
          </p>

          {authorLogoSrc ? (
            <div className="testimonial__logo">
              <ResponsiveImage
                src={authorLogoSrc}
                alt={authorName}
                loading="lazy"
                decoding="async"
                fallbackSrc={authorLogoFallbackSrc}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
