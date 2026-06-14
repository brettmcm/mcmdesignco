import Footer from '../components/Footer'
import Arrow from '../components/Arrow'
import patternVideo from '../assets/pattern.mp4'
import staticVideo from '../assets/static.mp4'
import skyVideo from '../assets/sky.mp4'
import Link from '../components/Link'
import AutoPlayVideo from '../components/AutoPlayVideo'

const CANARY_LOGO  = './src/assets/canary/logo.svg'
const CANARY_LOGO_DARK  = './src/assets/canary/logo-white.svg'
const CANARY_IMG  = './src/assets/canary/thumb.png'
const DUSTY_LOGO   = './src/assets/dt/logo.svg'
const DUSTY_LOGO_DARK   = './src/assets/dt/logo-white.svg'
const DUSTY_IMG   = './src/assets/dt/thumb.png'
const BLOOP_LOGO   = './src/assets/bloop/logo.svg'
const BLOOP_LOGO_DARK   = './src/assets/bloop/logo-white.svg'
const BLOOP_IMG    = './src/assets/bloop/thumb.png'
const TESTIMONIAL_LOGO = './src/assets/canary/icon.svg'

export default function Home() {
  return (
    <div className="page page--home">
      {/* Overview: Tagline */}
      <div className="section section--narrow overview">
        <div className="accent-bar" />
        <div className="overview-body">
          <p className="overview-heading">Helping ambitious companies build brands with cultural edge, system-level discipline, and room to scale.</p>
          <div className="overview-services">
            <p>Brand strategy</p>
            <p>Visual identity</p>
            <p>Creative direction</p>
            <p>Brand consulting</p>
          </div>
        </div>
      </div>

      {/* Hero Video */}
      <div className="section section--wide">
        <div className="hero-image-wrap">
          <AutoPlayVideo src={patternVideo} />
          <AutoPlayVideo className="banner__video" src={staticVideo} />
        </div>
      </div>

      {/* Quote */}
      <div className="section section--medium">
        <p className="quote">
          <span>Execution alone is no longer an advantage.</span>
          {' '}
          <span className="dim">Speed is table stakes. Brands need taste, judgment, and a point of view strong enough to cut through saturated markets.</span>
        </p>
      </div>

      {/* Case Study: Canary */}
      <div className="section section--expanded">
        <div className="case-study">
          <div className="case-study__content">
            <div className="case-study__logo" style={{ width: 120, height: 48 }}>
    
            <picture>
              <source srcSet={CANARY_LOGO_DARK} media="(prefers-color-scheme: dark)" />
              <source srcSet={CANARY_LOGO} media="(prefers-color-scheme: light)" />
              <img src={CANARY_LOGO} alt="Canary Logo" />
            </picture>

            </div>
            <p className="case-study__desc">Finding a sharper lane in a category crowded with greenwashed minimalism, soft claims, and interchangeable restraint.</p>
            <Link to="/case-studies/canary" linkText="Read case study" />
          </div>
          <div className="case-study__image">
            <img src={CANARY_IMG} alt="Canary case study" style={{ zIndex: 1 }} />
          </div>
        </div>
      </div>

      {/* Case Study: Dusty Times */}
      <div className="section section--expanded">
        <div className="case-study">
          <div className="case-study__content">
            <div className="case-study__logo" style={{ width: 247, height: 50, overflow: 'hidden' }}>
              <picture>
                  <source srcSet={DUSTY_LOGO_DARK} media="(prefers-color-scheme: dark)" />
                <source srcSet={DUSTY_LOGO} media="(prefers-color-scheme: light)" />
                <img src={DUSTY_LOGO} alt="Dusty Times Logo" />
              </picture>
            </div>
            <p className="case-study__desc">Rebuilding a legacy off-road newspaper as an annual lifestyle journal with stronger photography, sharper editorial standards, and a new cultural role.</p>
            <Link to="/case-studies/dusty-times" linkText="Read case study" />
          </div>
          <div className="case-study__image">
            <img src={DUSTY_IMG} alt="Dusty Times case study" style={{ zIndex: 1 }} />
          </div>
        </div>
      </div>

      {/* Case Study: Bloop */}
      <div className="section section--expanded">
        <div className="case-study">
          <div className="case-study__content">
            <div className="case-study__logo" style={{ width: 131, height: 48 }}>
              <picture>
                <source srcSet={BLOOP_LOGO_DARK} media="(prefers-color-scheme: dark)" />
                <source srcSet={BLOOP_LOGO} media="(prefers-color-scheme: light)" />
                <img src={BLOOP_LOGO} alt="Bloop Logo" />
              </picture>
            </div>
            <p className="case-study__desc">Turning a hidden household chore into a sensory ritual for small-batch laundry soap with cleaner ingredients and scents that feel current.</p>
            <Link to="/case-studies/bloop" linkText="Read case study" />
          </div>
          <div className="case-study__image">
            <img src={BLOOP_IMG} alt="Bloop case study" />
          </div>
        </div>
      </div>

{/* Testimonial */}
<div className="section section--wide">
  <div className="testimonial">
    <div className="testimonial__bg" aria-hidden="true">
      <AutoPlayVideo src={skyVideo} />
    </div>
    <div className="testimonial__content">
      <div className="testimonial__quote">
        <p>We used MCM Design Co. when we first launched our brand, not only to create our brand logo, but also to build out our entire brand guide.</p>
        <p>We use this guidance in all of our packaging, website and marketing efforts and follow it religiously. Doing so has made the brand seem more professional, mature and elevated. We hear positive comments about our branding all of the time.</p>
      </div>
      <div className="testimonial__footer">
        <p className="testimonial__author"><strong>Luke</strong>, <em>Canary Founder</em></p>
        <div className="testimonial__logo">
          <img src={TESTIMONIAL_LOGO} alt="Canary" />
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Services */}
      <div className="section section--narrow">
        <div className="services__row">
          <div className="services__intro">
            <p className="services__heading">A brand should carry more than decoration</p>
            <Link to="/about" linkText="More about the approach" />
          </div>
          <div className="services__list">
            <p className="services__item">
              <strong>Foundation.</strong> <span className="dim">Positioning, voice, and visual language are built together so the brand has a clear center of gravity from the start.</span>
            </p>
            <p className="services__item">
              <strong>Scale.</strong> <span className="dim">The system is shaped to move across product, marketing, and AI-driven workflows without losing its point of view.</span>
            </p>
            <p className="services__item">
              <strong>Stewardship.</strong> <span className="dim">Ongoing creative direction keeps the brand sharp as it is applied, adapted, and tested in the real world.</span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
