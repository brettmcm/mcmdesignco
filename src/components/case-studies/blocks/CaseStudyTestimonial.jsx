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
          <img
            src={bgImageSrc}
            alt={bgImageAlt}
            onError={
              bgImageFallbackSrc
                ? (e) => {
                    e.currentTarget.src = bgImageFallbackSrc
                  }
                : undefined
            }
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
              <img
                src={authorLogoSrc}
                alt={authorName}
                onError={
                  authorLogoFallbackSrc
                    ? (e) => {
                        e.currentTarget.src = authorLogoFallbackSrc
                      }
                    : undefined
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

