import Header from '../components/Header'
import Footer from '../components/Footer'
import leavesVideo from '../assets/leaves.mp4'
import staticVideo from '../assets/static.mp4'
const HEADSHOT      = './src/assets/portrait.png'
const CV      = './src/assets/resume.svg'
const DIAMOND_LEFT  = './src/assets/diamond-left.svg'
const DIAMOND_CENTER= './src/assets/diamond-center.svg'
const DIAMOND_RIGHT = './src/assets/diamond-right.svg'
const GLOBE = './src/assets/fluid-globe.svg'

export default function About() {
  return (
    <div className="page">
      <Header />

      {/* Hero: Do less / better. */}
      <div className="about-hero">
      <video className="about-hero__video" autoPlay muted loop playsInline>
          <source src={leavesVideo} type="video/mp4" />
        </video>
        <div className="about-hero__inner">
          <div className="about-hero__left">
            <p className="about-hero__do-less">Do less</p>
          </div>
          <div className="about-hero__spacer">
<svg width="1191" height="458" viewBox="0 0 1191 458" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3333 16C21.3333 17.4728 22.5272 18.6667 24 18.6667C25.4728 18.6667 26.6667 17.4728 26.6667 16C26.6667 14.5272 25.4728 13.3333 24 13.3333C22.5272 13.3333 21.3333 14.5272 21.3333 16ZM1164.33 442C1164.33 443.473 1165.53 444.667 1167 444.667C1168.47 444.667 1169.67 443.473 1169.67 442C1169.67 440.527 1168.47 439.333 1167 439.333C1165.53 439.333 1164.33 440.527 1164.33 442ZM24 16V16.5H653.176V16V15.5H24V16ZM713.176 76H712.676V382H713.176H713.676V76H713.176ZM773.176 442V442.5H1167V442V441.5H773.176V442ZM713.176 382H712.676C712.676 415.413 739.763 442.5 773.176 442.5V442V441.5C740.315 441.5 713.676 414.861 713.676 382H713.176ZM653.176 16V16.5C686.037 16.5 712.676 43.1391 712.676 76H713.176H713.676C713.676 42.5868 686.59 15.5 653.176 15.5V16Z" fill="white" fillOpacity="0.3"/>
</svg>

          </div>
          <div className="about-hero__right">
            <p className="about-hero__better">better.</p>
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
            <p className="bio__tagline">Built to Last.</p>
            <p className="bio__text">I work with ambitious companies to build brand systems that align identity, product, and story from the start. After years working in agencies, in-house, and independently, I’ve seen a pattern: brands are often delivered as finished work, but rarely carried through with the same level of care. My focus now is more integrated — building the brand and staying close to how it’s applied, ensuring it holds up in the real world.</p>
          </div>
          <div className="bio__photo">
            <img src={HEADSHOT} alt="Brett McMillin" className="headshot" />
            <img src={CV} alt="CV Link" className="cv_ring" />
          </div>
        </div>
      </div>

      <div className="section tight">
          {/* Red Banner: Clarify / Design / Scale */}
          <div className="section section--wide">
            <div className="banner">
              <div className="banner__bg" />
              <video className="banner__video" autoPlay muted loop playsInline>
                <source src={staticVideo} type="video/mp4" />
              </video>
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
              <h1>Fluid by Design</h1>
              <div className="flow__list">
                <p className="bio__text">I operate on a flexible, "fluid" model. I’m your primary partner and handle the majority of the work, but when a project calls for additional disciplines, I bring in a trusted network of collaborators to support specific needs. You still work directly with me, and I remain the single point of contact throughout. The result is a more focused, turnkey experience — with the ability to scale the team up or down depending on what the work requires. At its core, my work is grounded in a set of capabilities that shape how brands are built and carried forward:</p>
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
                <li>Naming & verbal direction</li>
                <li>Logo & identity system</li>
                <li>Art direction</li>
                <li>Core brand toolkit</li>
                </ul> 
              </div>
              <div className="services__col">
                <strong>Scale</strong>
                <ul>
                  <li>Brand system design</li>
                  <li>AI & agentic workflow readiness</li>
                  <li>Product brand integration</li>
                  <li>Design system alignment</li>
                  <li>Campaign & launch frameworks</li>
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

      {/* Closing quote */}
      <div className="section section--medium">
        <p className="quote">
          <span className="dim">With experience leading product design teams and building scalable design systems, I approach brand with the same rigor as product: </span>
          <span>structured, intentional, and built to last.</span>
        </p>
      </div>

      <Footer />
    </div>
  )
}
