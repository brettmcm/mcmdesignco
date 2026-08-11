import Footer from '../components/Footer'
import Link from '../components/Link'
import CANARY_LOGO from '../assets/canary/logo.svg'
import CANARY_LOGO_DARK from '../assets/canary/logo-white.svg'
import CANARY_IMG from '../assets/canary/thumb.webp'
import DUSTY_LOGO from '../assets/dt/logo.svg'
import DUSTY_LOGO_DARK from '../assets/dt/logo-white.svg'
import DUSTY_IMG from '../assets/dt/thumb.webp'
import BLOOP_LOGO from '../assets/bloop/logo.svg'
import BLOOP_LOGO_DARK from '../assets/bloop/logo-white.svg'
import BLOOP_IMG from '../assets/bloop/thumb.webp'

const PROJECTS = [
  {
    name: 'Canary',
    href: '/case-studies/canary',
    logo: CANARY_LOGO,
    logoDark: CANARY_LOGO_DARK,
    image: CANARY_IMG,
    logoStyle: { width: 120, height: 48 },
    description: 'Finding a sharper lane in a category crowded with greenwashed minimalism, soft claims, and interchangeable restraint.',
  },
  {
    name: 'Dusty Times',
    href: '/case-studies/dusty-times',
    logo: DUSTY_LOGO,
    logoDark: DUSTY_LOGO_DARK,
    image: DUSTY_IMG,
    logoStyle: { width: 247, height: 50, overflow: 'hidden' },
    description: 'Rebuilding a legacy off-road newspaper as an annual lifestyle journal with stronger photography, sharper editorial standards, and a new cultural role.',
  },
  {
    name: 'Bloop',
    href: '/case-studies/bloop',
    logo: BLOOP_LOGO,
    logoDark: BLOOP_LOGO_DARK,
    image: BLOOP_IMG,
    logoStyle: { width: 131, height: 48 },
    description: 'Turning a hidden household chore into a sensory ritual for small-batch laundry soap with cleaner ingredients and scents that feel current.',
  },
]

export default function Work() {
  return (
    <div className="page page--work">
      <div className="section section--medium work-intro">
        <div className="accent-bar" />
        <p className="quote">
          <span>Execution alone is no longer an advantage.</span>
          {' '}
          <span className="dim">Speed is table stakes. Brands need taste, judgment, and a point of view strong enough to cut through saturated markets.</span>
        </p>
      </div>

      {PROJECTS.map(({ name, href, logo, logoDark, image, logoStyle, description }) => (
        <div className="section section--expanded" key={name}>
          <div className="case-study">
            <div className="case-study__content">
              <div className="case-study__logo" style={logoStyle}>
                <picture>
                  <source srcSet={logoDark} media="(prefers-color-scheme: dark)" />
                  <source srcSet={logo} media="(prefers-color-scheme: light)" />
                  <img src={logo} alt={`${name} Logo`} loading="lazy" decoding="async" />
                </picture>
              </div>
              <p className="case-study__desc">{description}</p>
              <Link to={href} linkText="Read case study" />
            </div>
            <div className="case-study__image">
              <img src={image} alt={`${name} case study`} loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  )
}
