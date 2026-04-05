import Header from '../components/Header'
import Footer from '../components/Footer'
import Arrow from '../components/Arrow'
import patternVideo from '../assets/pattern.mp4'
import staticVideo from '../assets/static.mp4'
import skyVideo from '../assets/sky.mp4'
import Link from '../components/Link'

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
      <Header />

      {/* Overview: Tagline */}
      <div className="section section--narrow overview">
        <div className="overview-accent" />
        <div className="overview-body">
          <p className="overview-heading">Helping ambitious companies build culturally sharp, scalable brand systems.</p>
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
          <video autoPlay muted loop playsInline>
            <source src={patternVideo} type="video/mp4" />
          </video>
          <video className="banner__video" autoPlay muted loop playsInline>
            <source src={staticVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Quote */}
      <div className="section section--medium">
        <p className="quote">
          <span>Execution alone is no longer an advantage.</span>
          {' '}
          <span className="dim">Speed is table stakes. More than ever you need taste and proven creative judgement to guide your brand to stand out in saturated markets.</span>
        </p>
      </div>

      {/* Case Study: Canary */}
      <div className="section section--expanded">
        <div className="case-study">
          <div className="case-study__content">
            <div className="case-study__logo" style={{ width: 120, height: 48 }}>
    
            <picture>
              <source srcset={CANARY_LOGO_DARK} media="(prefers-color-scheme: dark)" />
              <source srcset={CANARY_LOGO} media="(prefers-color-scheme: light)" />
              <img src={CANARY_LOGO} alt="Canary Logo" />
            </picture>

            </div>
            <p className="case-study__desc">Finding the subversive space in an industry saturated with green-washed, minimal brands presenting tired monotony.</p>
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
                  <source srcset={DUSTY_LOGO_DARK} media="(prefers-color-scheme: dark)" />
                <source srcset={DUSTY_LOGO} media="(prefers-color-scheme: light)" />
                <img src={DUSTY_LOGO} alt="Dusty Times Logo" />
              </picture>
            </div>
            <p className="case-study__desc">An annual lifestyle journal celebrating the world of desert racing and off-road culture. Spotlighting the spirit of adventure, resilience, and the relentless pursuit of victory by highlighting the stories on the fringes of the spotlight.</p>
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
                <source srcset={BLOOP_LOGO_DARK} media="(prefers-color-scheme: dark)" />
                <source srcset={BLOOP_LOGO} media="(prefers-color-scheme: light)" />
                <img src={BLOOP_LOGO} alt="Bloop Logo" />
              </picture>
            </div>
            <p className="case-study__desc">Transforming a once-hidden chore into a household celebration with small-batch, all-natural laundry soap that is free of both harmful chemicals and typical hippy scents.</p>
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
      <video autoPlay muted loop playsInline>
        <source src={skyVideo} type="video/mp4" />
      </video>
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
            <p className="services__heading">Your brand is more than just decorative</p>
            <a className="case-study__link" href="#">
            <Link to="/about" linkText="More about the approach" />
            </a>
          </div>
          <div className="services__list">
            <p className="services__item">
              <strong>Foundation.</strong> <span className="dim">The core identity is established through positioning, voice, and visual language so the brand feels clear and intentional from the start.</span>
            </p>
            <p className="services__item">
              <strong>Scale.</strong> <span className="dim">Flexible brand systems are designed to extend across product, marketing, and AI-driven workflows so the brand remains cohesive as complexity increases.</span>
            </p>
            <p className="services__item">
              <strong>Stewardship.</strong> <span className="dim">Ongoing direction and consultation are provided to support how the brand is applied, adapted, and refined so it stays sharp and aligned as the company grows.</span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
