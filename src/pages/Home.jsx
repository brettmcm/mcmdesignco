import Footer from '../components/Footer'
import { useEffect, useRef, useState } from 'react'
import patternVideo from '../assets/pattern.mp4'
import staticVideo from '../assets/static.mp4'
import skyVideo from '../assets/sky.mp4'
import Link from '../components/Link'
import AutoPlayVideo from '../components/AutoPlayVideo'

const TESTIMONIAL_LOGO = './src/assets/canary/icon.svg'
const BG_RESTRAINT = './src/assets/bloop/creative-01.png'
const BG_TENSION = './src/assets/dt/united-in-dirt.jpg'
const BG_TEXTURE = './src/assets/canary/creative-01.png'
const BG_PRECISION = './src/assets/dt/dt7-vip1.jpg'
const BG_TASTE = './src/assets/dt/dt5-stack.jpg'

const WORKFLOW_STEPS = [
  {
    label: 'Restraint',
    sentence: 'Use less, but make every choice carry more weight.',
    image: BG_RESTRAINT,
  },
  {
    label: 'Tension',
    sentence: 'Let classic structure hold a few deliberately subversive moves.',
    image: BG_TENSION,
  },
  {
    label: 'Texture',
    sentence: 'Keep the work human, tactile, and just imperfect enough to feel alive.',
    image: BG_TEXTURE,
  },
  {
    label: 'Precision',
    sentence: 'Treat details as strategy, not decoration.',
    image: BG_PRECISION,
  },
  {
    label: 'Taste',
    sentence: 'Build a point of view strong enough to guide what belongs and what does not.',
    image: BG_TASTE,
  },
]

export default function Home() {
  const signalSectionRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isSignalBackgroundActive, setIsSignalBackgroundActive] = useState(false)
  const signal = WORKFLOW_STEPS[activeStep]

  useEffect(() => {
    const section = signalSectionRef.current

    if (!section) return

    const updateSignal = () => {
      const rect = section.getBoundingClientRect()
      const scrollWindow = Math.max(rect.height - window.innerHeight, 1)
      const rawProgress = -rect.top / scrollWindow
      const progress = Math.min(Math.max(rawProgress, 0), 1)
      const fadeIn = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight * 0.75), 0), 1)
      const fadeOut = Math.min(Math.max((rect.bottom - window.innerHeight * 0.2) / (window.innerHeight * 0.8), 0), 1)
      const backgroundProgress = Math.min(fadeIn, fadeOut)
      const backgroundBlur = (1 - backgroundProgress) * 3
      const activeLine = window.innerHeight * (window.innerWidth <= 1024 ? 0.58 : 0.52)
      const cards = Array.from(section.querySelectorAll('.home-signal__card'))
      const closestCard = cards.reduce((closest, card, index) => {
        const rect = card.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - activeLine)

        return distance < closest.distance ? { index, distance } : closest
      }, { index: 0, distance: Infinity })
      const nextStep = Math.min(
        WORKFLOW_STEPS.length - 1,
        closestCard.index
      )

      section.style.setProperty('--scroll-progress', `${progress * 100}%`)
      section.style.setProperty('--background-progress', backgroundProgress)
      section.style.setProperty('--background-blur', `${backgroundBlur}px`)
      section.style.setProperty('--stack-offset', `${progress * -760}px`)
      setActiveStep(nextStep)
      setIsSignalBackgroundActive(backgroundProgress > 0.01)
    }

    const interval = window.setInterval(updateSignal, 80)
    updateSignal()
    window.addEventListener('scroll', updateSignal, { passive: true })
    window.addEventListener('resize', updateSignal)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('scroll', updateSignal)
      window.removeEventListener('resize', updateSignal)
    }
  }, [])

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

      {/* Brand signal */}
      <div className="section section--wide home-signal-section">
        <section
          className={`home-signal${isSignalBackgroundActive ? ' is-background-active' : ''}`}
          ref={signalSectionRef}
          style={{ '--scroll-progress': '0%', '--background-progress': 0, '--background-blur': '10px', '--stack-offset': '0px' }}
          aria-labelledby="home-signal-heading"
        >
          <div className="home-signal__fixed-layer">
            <div className="home-signal__background" aria-hidden="true">
              {WORKFLOW_STEPS.map((step, index) => (
                <img
                  className={index === activeStep && isSignalBackgroundActive ? 'is-active' : undefined}
                  src={step.image}
                  alt=""
                  key={step.label}
                />
              ))}
            </div>
            <div className="home-signal__content">
              <div>
                <h1 id="home-signal-heading">Make the brand feel inevitable.</h1>
              </div>
              <div className="home-signal__active" aria-live="polite">
                <p>{signal.sentence}</p>
              </div>
              <div className="home-signal__link">
                <Link to="/work" linkText="See the work" />
              </div>
            </div>
          </div>
          <div className="home-signal__pin">
            <div className="home-signal__mobile-intro">
              <h1>Make the brand feel inevitable.</h1>
              <div className="home-signal__mobile-link">
                <Link to="/work" linkText="View Work" />
              </div>
            </div>
            <div className="home-signal__spacer" aria-hidden="true" />
            <div
              className="home-signal__stage"
              aria-hidden="true"
            >
              <div className="home-signal__stack">
                {WORKFLOW_STEPS.map((step, index) => (
                  <div
                    className={`home-signal__card${index === activeStep ? ' is-active' : ''}`}
                  key={step.label}
                >
                  <p className="home-signal__card-copy">
                    <strong className="home-signal__card-title">{step.label}.</strong>
                    {' '}
                    <span className="home-signal__card-desc">{step.sentence}</span>
                  </p>
                </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

{/* Testimonial */}
<div className="section section--wide">
  <div className="testimonial">
    <div className="testimonial__bg" aria-hidden="true">
      <AutoPlayVideo src={skyVideo} />
    </div>
    <div className="testimonial__content">
      <div className="testimonial__quote">
        <p>We used Brett when we first launched our brand, not only to create our brand logo, but also to build out our entire brand guide.</p>
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
