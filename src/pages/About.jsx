import Footer from '../components/Footer'
import AutoPlayVideo from '../components/AutoPlayVideo'
import leavesVideo from '../assets/leaves.mp4'
import staticVideo from '../assets/static.mp4'
import HEADSHOT from '../assets/portrait.png'
import CV from '../assets/resume.svg'
import DIAMOND_LEFT from '../assets/diamond-left.svg'
import DIAMOND_CENTER from '../assets/diamond-center.svg'
import DIAMOND_RIGHT from '../assets/diamond-right.svg'
import GLOBE from '../assets/fluid-globe.svg'
import { useLayoutEffect, useRef, useState } from 'react'
import { animateScrollToElement } from '../utils/scrollAnimation'

const TEAMS_AND_PROJECTS = [
  { name: 'Figma', role: 'Designer advocate', dates: 'Current', href: 'https://figma.com' },
  { name: 'Dusty Times', role: 'Design director', dates: 'Current', href: 'https://dustytimes.com' },
  { name: 'Experian', role: 'Product Design Manager', dates: '2020-2025', href: 'https://experian.com' },
  { name: 'Vuori Clothing', role: 'UX consultant', dates: '2020', href: 'https://vuori.com' },
  { name: 'onX Maps', role: 'Product designer', dates: '2020', href: 'https://onxmaps.com' },
  { name: 'Stance', role: 'UX designer', dates: '2016-2020', href: 'https://stance.com' },
  { name: 'Oakley', role: 'Interaction designer', dates: '2016', href: 'https://oakley.com' },
  { name: 'Fuse Interactive', role: 'Associate creative director', dates: '2011-2016', href: 'https://gofuse.com' },
  { name: 'NuContext', role: 'Art director', dates: '2006-2011', href: 'https://nucontext.com' },
]

export default function About() {
  const heroRef = useRef(null)
  const doLessRef = useRef(null)
  const betterRef = useRef(null)
  const [connector, setConnector] = useState(null)

  const scrollToTeamsAndProjects = (event) => {
    const target = document.getElementById('teams-and-projects')

    if (!target) return

    event.preventDefault()

    animateScrollToElement(target, {
      onComplete: () => window.history.pushState(null, '', '#teams-and-projects'),
    })
  }

  useLayoutEffect(() => {
    const updateConnector = () => {
      const hero = heroRef.current
      const doLess = doLessRef.current
      const better = betterRef.current

      if (!hero || !doLess || !better) return

      const heroRect = hero.getBoundingClientRect()
      const doLessRect = doLess.getBoundingClientRect()
      const betterRect = better.getBoundingClientRect()
      const gap = 24
      const radius = 48

      const start = {
        x: doLessRect.right - heroRect.left + gap,
        y: doLessRect.top - heroRect.top + doLessRect.height / 2,
      }
      const end = {
        x: betterRect.left - heroRect.left - gap,
        y: betterRect.top - heroRect.top + betterRect.height / 2,
      }
      const turnX = Math.min(
        Math.max(start.x + radius * 2, heroRect.width * 0.57),
        end.x - radius * 2
      )
      const turnDirection = end.y >= start.y ? 1 : -1
      const effectiveRadius = Math.max(
        0,
        Math.min(radius, Math.abs(end.y - start.y) / 2, (end.x - start.x) / 4)
      )

      const path = [
        `M ${start.x} ${start.y}`,
        `H ${turnX - effectiveRadius}`,
        `Q ${turnX} ${start.y} ${turnX} ${start.y + effectiveRadius * turnDirection}`,
        `V ${end.y - effectiveRadius * turnDirection}`,
        `Q ${turnX} ${end.y} ${turnX + effectiveRadius} ${end.y}`,
        `H ${end.x}`,
      ].join(' ')

      setConnector({
        width: heroRect.width,
        height: heroRect.height,
        path,
        start,
        end,
      })
    }

    updateConnector()

    const resizeObserver = new ResizeObserver(updateConnector)
    if (heroRef.current) resizeObserver.observe(heroRef.current)
    if (doLessRef.current) resizeObserver.observe(doLessRef.current)
    if (betterRef.current) resizeObserver.observe(betterRef.current)

    window.addEventListener('resize', updateConnector)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateConnector)
    }
  }, [])

  return (
    <div className="page">
      {/* Hero: Do less / better. */}
      <div className="about-hero">
        <AutoPlayVideo className="about-hero__video" src={leavesVideo} />
        <div className="about-hero__inner" ref={heroRef}>
          {connector && (
            <svg
              className="about-hero__connector"
              width={connector.width}
              height={connector.height}
              viewBox={`0 0 ${connector.width} ${connector.height}`}
              aria-hidden="true"
            >
              <path d={connector.path} />
              <circle cx={connector.start.x} cy={connector.start.y} r="3" />
              <circle cx={connector.end.x} cy={connector.end.y} r="3" />
            </svg>
          )}
          <div className="about-hero__left">
            <p className="about-hero__do-less" ref={doLessRef}>Do less</p>
          </div>
          <div className="about-hero__right">
            <p className="about-hero__better" ref={betterRef}>better.</p>
          </div>
        </div>
      </div>

      {/* Quote: The best brands don't feel applied */}
      <div className="section section--medium">
        <p className="quote">
          <span>I build brands that feel inevitable. </span>
          <span className="dim">Shaped with care, aligned from the start, and designed to endure. Every element works together, so product, identity, and story move as one. The result is a brand that holds its shape as it grows.</span>
        </p>
      </div>

      {/* Bio */}
      <div className="section section--expanded">
        <div className="bio">
          <div className="bio__content">
            <div className="accent-bar" />
          <p className="bio__tagline">Built to last.</p>
          <p className="bio__text">After years working in agencies, in-house, independently, and as a Product Design Manager, I’ve learned that the person selling the work is not always the person shaping it. Larger agencies can bring scale, but they also bring layers, overhead, and margin pressure. AI can make execution faster, but it cannot replace the taste, judgment, and experience required to know what to make, what to leave out, and how to protect the standard. Working with me means you get that senior perspective directly, without paying for agency overhead or wondering whether your key brand decisions are being handled by a junior designer with a prompt.</p>
          </div>
          <div className="bio__photo">
            <img src={HEADSHOT} alt="Brett McMillin" className="headshot" />
            <a className="cv_link" href="#teams-and-projects" aria-label="Jump to teams and projects" onClick={scrollToTeamsAndProjects}>
              <img src={CV} alt="Read my CV" className="cv_ring" />
            </a>
          </div>
        </div>
      </div>

      <div className="section tight">
          {/* Red Banner: Clarify / Design / Scale */}
          <div className="section section--wide">
            <div className="banner">
              <div className="banner__bg" />
              <AutoPlayVideo className="banner__video" src={staticVideo} />
              <div className="banner__bg-screen" />
              <div className="banner__shapes">
                <img src={DIAMOND_LEFT} alt="" />
                <img src={DIAMOND_CENTER} alt="" />
                <img src={DIAMOND_RIGHT} alt="" />
              </div>
            </div>
          </div>

          {/* Flow of the work */}
          <div className="section section--expanded">
            <div className="flow">
              <h1>Fluid by design</h1>
              <div className="flow__list">
                <p className="bio__text">I operate on a flexible, fluid model. I’m your primary partner and handle the majority of the work, but when a project needs another discipline, I bring in trusted collaborators for that specific need. You still work directly with me, and I remain the single point of contact throughout. The result is a focused experience with enough range to scale the team up or down as the work requires. At its core, my work is grounded in a set of capabilities that shape how brands are built and carried forward:</p>
              </div>
            </div>
          </div>


      {/* Services */}
      <div className="section section--expanded">
        <div className="bio">
          <div className="bio__content">
            <div className="services__cols">
              <div className="services__col">
                <strong>Foundation</strong>
                <ul>
                <li>Brand positioning</li>
                <li>Naming and verbal direction</li>
                <li>Logo and identity system</li>
                <li>Art direction</li>
                <li>Core brand toolkit</li>
                </ul> 
              </div>
              <div className="services__col">
                <strong>Scale</strong>
                <ul>
                  <li>Brand system design</li>
                  <li>AI and agentic workflow readiness</li>
                  <li>Product brand integration</li>
                  <li>Design system alignment</li>
                  <li>Campaign and launch frameworks</li>
                </ul> 
              </div>
              <div className="services__col">
                <strong>Stewardship</strong>
                <ul>
                  <li>Creative direction</li>
                  <li>Brand consultation</li>
                  <li>Launch support</li>
                  <li>Team enablement</li>
                  <li>Brand evolution</li>
                </ul> 
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>

      <div className="section section--expanded" id="teams-and-projects">
        <section className="teams-projects" aria-labelledby="teams-projects-heading">
          <div className="teams-projects__intro">
            <div className="accent-bar" />
            <h2 id="teams-projects-heading">Teams and projects</h2>
            <p>A short record of the companies, studios, and publications that shaped my approach to work.</p>
          </div>
          <div className="teams-projects__list">
            {TEAMS_AND_PROJECTS.map(({ name, role, dates, href }) => (
              <a className="teams-projects__item" href={href} key={name}>
                <span className="teams-projects__name">{name}</span>
                <span className="teams-projects__meta">
                  <span>{role}</span>
                  <span>{dates}</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
