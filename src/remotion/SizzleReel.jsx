import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { Video } from '@remotion/media'

const ease = Easing.bezier(0.16, 1, 0.3, 1)

const signalSteps = [
  { label: 'Restraint', copy: 'Use less, but make every choice carry more weight.', image: 'bloop-creative-01.png' },
  { label: 'Tension', copy: 'Let classic structure hold a few deliberately subversive moves.', image: 'dt-united-in-dirt.jpg' },
  { label: 'Texture', copy: 'Keep the work human, tactile, and just imperfect enough to feel alive.', image: 'canary-creative-01.png' },
  { label: 'Precision', copy: 'Treat details as strategy, not decoration.', image: 'dt7-vip1.jpg' },
  { label: 'Taste', copy: 'Build a point of view strong enough to guide what belongs.', image: 'dt5-stack.jpg' },
]

const projects = [
  { name: 'Canary', image: 'canary-thumb.png', logo: 'canary-logo.svg', copy: 'A sharper lane in a category crowded with greenwashed sameness.' },
  { name: 'Dusty Times', image: 'dt-thumb.png', logo: 'dt-logo.svg', copy: 'A legacy off-road newspaper rebuilt as a cultural annual.' },
  { name: 'Bloop', image: 'bloop-thumb.png', logo: 'bloop-logo.svg', copy: 'Laundry soap reframed as a sensory ritual.' },
]

const asset = (name) => staticFile(`mcm-reel/${name}`)

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
}

function fade(frame, start, end, outStart = end + 18, outEnd = outStart + 12) {
  const fadeIn = interpolate(frame, [start, end], [0, 1], { ...clamp, easing: ease })
  const fadeOut = interpolate(frame, [outStart, outEnd], [1, 0], { ...clamp, easing: ease })
  return fadeIn * fadeOut
}

function DeviceFrame({ children, progress = 0, scale = 1, x = 0, y = 0 }) {
  return (
    <div
      className="device"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      }}
    >
      <div className="device__chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="device__screen">
        <div className="site-page" style={{ transform: `translate3d(0, ${progress * -1490}px, 0)` }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function SiteHeader({ dark = false }) {
  return (
    <div className={`site-header${dark ? ' site-header--dark' : ''}`}>
      <div className="site-header__brand">
        <Img src={asset('logo.svg')} />
        <span>MCM Design Co.</span>
      </div>
      <div className="site-header__nav">
        <span>Work</span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </div>
  )
}

function HomePageMock({ frame }) {
  const active = Math.min(signalSteps.length - 1, Math.floor(interpolate(frame, [64, 150], [0, signalSteps.length], clamp)))

  return (
    <>
      <section className="overview-mock">
        <div className="accent" />
        <h1>Helping ambitious companies build brands with cultural edge, system-level discipline, and room to scale.</h1>
        <div className="service-list">
          <span>Brand strategy</span>
          <span>Visual identity</span>
          <span>Creative direction</span>
          <span>Brand consulting</span>
        </div>
      </section>

      <section className="hero-media">
        <Video src={asset('pattern.mp4')} muted loop className="hero-media__video" />
        <Video src={asset('static.mp4')} muted loop className="hero-media__video hero-media__video--blend" />
      </section>

      <section className="signal-mock">
        <div className="signal-mock__bg">
          {signalSteps.map((step, index) => (
            <Img
              key={step.label}
              src={asset(step.image)}
              style={{
                opacity: index === active ? 0.74 : 0,
                transform: `scale(${index === active ? 1.08 : 1.02})`,
              }}
            />
          ))}
        </div>
        <div className="signal-mock__copy">
          <h2>Make the brand feel inevitable.</h2>
          <p>{signalSteps[active].copy}</p>
        </div>
        <div className="signal-mock__stack">
          {signalSteps.map((step, index) => (
            <div className={`signal-card${index === active ? ' signal-card--active' : ''}`} key={step.label}>
              {step.label}.
            </div>
          ))}
        </div>
      </section>

      <section className="case-stack">
        {projects.map((project) => (
          <article className="case-row" key={project.name}>
            <div>
              <Img src={asset(project.logo)} className="case-row__logo" />
              <p>{project.copy}</p>
            </div>
            <Img src={asset(project.image)} className="case-row__image" />
          </article>
        ))}
      </section>

      <section className="testimonial-mock">
        <Video src={asset('sky.mp4')} muted loop className="testimonial-mock__video" />
        <div>
          <p>Brand guidance that made the work feel more professional, mature and elevated.</p>
          <span>Luke, Canary Founder</span>
        </div>
        <Img src={asset('canary-icon.svg')} />
      </section>
    </>
  )
}

function DetailCallouts({ frame }) {
  const first = fade(frame, 54, 66, 96, 112)
  const second = fade(frame, 104, 116, 150, 166)
  const third = fade(frame, 196, 208, 236, 250)

  return (
    <>
      <div
        className="callout callout--left"
        style={{
          opacity: first,
          transform: `translate3d(${interpolate(first, [0, 1], [-36, 0])}px, 0, 0)`,
        }}
      >
        <span>01</span>
        <p>Layered motion system</p>
      </div>
      <div
        className="callout callout--right"
        style={{
          opacity: second,
          transform: `translate3d(${interpolate(second, [0, 1], [36, 0])}px, 0, 0)`,
        }}
      >
        <span>02</span>
        <p>Scroll-driven brand signals</p>
      </div>
      <div
        className="callout callout--bottom"
        style={{
          opacity: third,
          transform: `translate3d(0, ${interpolate(third, [0, 1], [36, 0])}px, 0)`,
        }}
      >
        <span>03</span>
        <p>Case-study texture and proof</p>
      </div>
    </>
  )
}

function ProjectSweep({ frame }) {
  const opacity = fade(frame, 170, 184, 244, 260)
  const x = interpolate(frame, [170, 252], [980, -1020], { ...clamp, easing: ease })

  return (
    <div className="project-sweep" style={{ opacity }}>
      <div className="project-sweep__track" style={{ transform: `translate3d(${x}px, 0, 0)` }}>
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <Img src={asset(project.image)} />
            <div>
              <Img src={asset(project.logo)} />
              <p>{project.name}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function IntroOutro({ frame }) {
  const intro = fade(frame, 0, 18, 58, 74)
  const outro = interpolate(frame, [258, 284], [0, 1], { ...clamp, easing: ease })

  return (
    <>
      <div className="intro-lockup" style={{ opacity: intro }}>
        <Img src={asset('logo.svg')} />
        <p>MCM Design Co.</p>
        <h1>Website sizzle reel</h1>
      </div>
      <div className="outro-lockup" style={{ opacity: outro }}>
        <div className="accent" />
        <h2>Brands with edge, discipline, and room to scale.</h2>
        <p>mcmdesign.co</p>
      </div>
    </>
  )
}

export function McmSizzleReel() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const seconds = frame / fps
  const scroll = interpolate(frame, [36, 84, 118, 158, 210, 250], [0, 0.12, 0.42, 0.58, 0.82, 1], { ...clamp, easing: ease })
  const deviceScale = interpolate(frame, [0, 50, 112, 168, 242], [0.76, 0.88, 0.96, 0.82, 0.72], { ...clamp, easing: ease })
  const deviceX = interpolate(frame, [0, 112, 168, 242], [0, -42, 74, 0], { ...clamp, easing: ease })
  const backgroundShift = interpolate(frame, [0, 300], [0, -220], clamp)

  return (
    <AbsoluteFill className="reel">
      <div className="grain" />
      <div className="reel__backdrop" style={{ transform: `translate3d(0, ${backgroundShift}px, 0)` }}>
        <Video src={asset(seconds < 4.6 ? 'pattern.mp4' : 'sky.mp4')} muted loop className="reel__backdrop-video" />
      </div>
      <SiteHeader dark={frame > 96 && frame < 166} />
      <DeviceFrame progress={scroll} scale={deviceScale} x={deviceX} y={interpolate(frame, [0, 300], [78, -42], clamp)}>
        <HomePageMock frame={frame} />
      </DeviceFrame>
      <ProjectSweep frame={frame} />
      <DetailCallouts frame={frame} />
      <IntroOutro frame={frame} />
      <div className="timebar">
        <span style={{ width: `${(frame / 299) * 100}%` }} />
      </div>
    </AbsoluteFill>
  )
}
