import Footer from '../../components/Footer'
import CaseStudyHero from '../../components/case-studies/blocks/CaseStudyHero'
import CaseStudyRichTextSection from '../../components/case-studies/blocks/CaseStudyRichTextSection'
import CaseStudyRuleTextSection from '../../components/case-studies/blocks/CaseStudyRuleTextSection'
import CaseStudyMosaicGrid from '../../components/case-studies/blocks/CaseStudyMosaicGrid'
import CaseStudyImagePanel from '../../components/case-studies/blocks/CaseStudyImagePanel'
import CaseStudyTwoImageRow from '../../components/case-studies/blocks/CaseStudyTwoImageRow'
import CaseStudyNextTiles from '../../components/case-studies/blocks/CaseStudyNextTiles'
import heroImg from '../../assets/bloop/hero.png'
import bloopLogo from '../../assets/bloop/logo-white.svg'
import challenge01 from '../../assets/bloop/photoshoot-00.png'
import disrupt01 from '../../assets/bloop/disrupt-01.png'
import disrupt02 from '../../assets/bloop/disrupt-02.png'
import photoshoot01 from '../../assets/bloop/photoshoot-01.png'
import photoshoot02 from '../../assets/bloop/photoshoot-02.png'
import photoshoot03 from '../../assets/bloop/photoshoot-03.png'
import photoshoot04 from '../../assets/bloop/photoshoot-04.png'
import creative01 from '../../assets/bloop/creative-01.png'
import creative02 from '../../assets/bloop/creative-02.png'
import canaryThumb from '../../assets/canary/thumb.png'
import dustyThumb from '../../assets/dt/thumb.png'

export default function Bloop() {
  return (
    <div className="page page--case-study bloop">
      <CaseStudyHero bgSrc={heroImg} markVectorSrc={bloopLogo} />

      <CaseStudyRichTextSection>
        <p>
          <span>Bloop was founded on a simple tension. </span>
          <span className="dim">Most natural laundry soaps feel generic and dated. Most conventional detergents feel artificial and overengineered. The founders believed there was room for something better: a small-batch, toxin-free laundry soap with crafted scents that feel contemporary and desirable.</span>
        </p>
      </CaseStudyRichTextSection>

      {/* Challenge */}
      <div className="section section--expanded cs-layout--cols">
        <div className="cs-col">
          <CaseStudyRuleTextSection heading="The challenge">
            <p>The ambition was not to compete on claims. It was to change how a basic household product feels.</p>
            <p>Laundry is routine. But it touches identity. How you smell. How your home feels. What you choose to bring into your space.</p>
            <p>The opportunity was to build a brand that treats a utility like a cultural object.</p>
          </CaseStudyRuleTextSection>
        </div>
        <div className="cs-col">
          <CaseStudyMosaicGrid
            templateColumns="repeat(1, minmax(0, 1fr))"
            templateRows="repeat(1, minmax(0, 1fr))"
            height={625}
            borderRadius={2}
            tiles={[
              { key: 'c11', colStart: 1, rowStart: 1, images: [{ src: challenge01, alt: '' }] },
            ]}
          />
        </div>
      </div>

      {/* Strategic insight */}
      <div className="section section--narrow">
        <CaseStudyRuleTextSection heading="Strategic insight">
          <p>The category defaults to two extremes. Virtue signaling sustainability or loud freshness performance. We rejected both.</p>
          <p>Instead, we positioned Bloop as sensory first. A brand built around joy in the everyday. Not guilt. Not fear. Not perfection.</p>
          <p>The core narrative became simple and human:</p>
          <p>We smell good. We look good. We feel good.</p>
          <p>This reframed laundry from chore to ritual. It shifted the role of the product from necessity to enhancement and guided every decision that followed.</p>
        </CaseStudyRuleTextSection>
      </div>

      {/* Large image */}
      <div className="section section--wide">
        <CaseStudyImagePanel src={disrupt01} aspectWidth={1904} aspectHeight={1071} borderRadius={12} />
      </div>

      {/* Building the system */}
      <div className="section section--narrow">
        <CaseStudyRuleTextSection heading="Building the system">
          <p>The identity needed to feel modern, light, and confident. Not earthy. Not sterile.</p>
          <p>The wordmark balances softness and clarity. Rounded forms reference suds and softness while maintaining structure. Color is used to signal freshness and scent variation without leaning on predictable "eco" palettes.</p>
        </CaseStudyRuleTextSection>
      </div>

      {/* Large image */}
      <div className="section section--wide">
        <CaseStudyImagePanel src={disrupt02} aspectWidth={1904} aspectHeight={1071} borderRadius={12} />
      </div>

      {/* Continuation */}
      <div className="section section--narrow">
        <CaseStudyRuleTextSection>
          <p>Most importantly, the brand does not overclaim. The voice is honest about imperfection. Bloop commits to continuous improvement rather than purity theater. That stance builds trust in a category where exaggeration is common.</p>
          <p>The result is a system with clear architecture and room for growth across scents, formats, and future extensions.</p>
        </CaseStudyRuleTextSection>
      </div>

      {/* Two images */}
      <div className="section section--wide">
        <CaseStudyTwoImageRow
          images={[
            { src: creative01, alt: '' },
            { src: creative02, alt: '' },
          ]}
          gap={8}
          aspectWidth={710}
          aspectHeight={749}
          borderRadius={4}
        />
      </div>

      {/* Why it works */}
      <div className="section section--expanded cs-layout--stack">
        <div className="cs-max-900">
          <CaseStudyRuleTextSection heading="Why it works">
            <p>This was not about decoration. It was about strategic clarity.</p>
            <p>We helped the founders articulate what they were really building. A sensory brand inside a functional category. We created a system that connects product, identity, and story from day one.</p>
          </CaseStudyRuleTextSection>
        </div>
        <CaseStudyMosaicGrid
          templateColumns="repeat(2, minmax(0, 1fr))"
          templateRows="repeat(2, minmax(0, 1fr))"
          gapX={4}
          gapY={4}
          aspectWidth={1}
          aspectHeight={1}
          borderRadius={2}
          tiles={[
            { key: 's11', colStart: 1, rowStart: 1, images: [{ src: photoshoot01, alt: '' }] },
            { key: 's12', colStart: 2, rowStart: 1, images: [{ src: photoshoot02, alt: '' }] },
            { key: 's21', colStart: 1, rowStart: 2, images: [{ src: photoshoot03, alt: '' }] },
            { key: 's22', colStart: 2, rowStart: 2, images: [{ src: photoshoot04, alt: '' }] },
          ]}
        />
      </div>

      <CaseStudyRichTextSection>
        <p>
          <span className="dim">The outcome was a launch with immediate distinction and strong early engagement. More importantly, the brand feels inevitable. It fits the product. It fits the founders. It fits the culture it wants to live in.</span>
        </p>
        <p>
          <span>That alignment is the real result.</span>
        </p>
      </CaseStudyRichTextSection>

      <CaseStudyNextTiles tiles={[
        { to: '/case-studies/canary', label: 'Canary', thumb: canaryThumb },
        { to: '/case-studies/dusty-times', label: 'Dusty Times', thumb: dustyThumb },
      ]} />

      <Footer />
    </div>
  )
}
