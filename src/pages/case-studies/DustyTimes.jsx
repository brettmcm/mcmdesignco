import Footer from '../../components/Footer'
import CaseStudyHero from '../../components/case-studies/blocks/CaseStudyHero'
import CaseStudyRichTextSection from '../../components/case-studies/blocks/CaseStudyRichTextSection'
import CaseStudyRuleTextSection from '../../components/case-studies/blocks/CaseStudyRuleTextSection'
import CaseStudyImagePanel from '../../components/case-studies/blocks/CaseStudyImagePanel'
import CaseStudyTwoImageRow from '../../components/case-studies/blocks/CaseStudyTwoImageRow'
import CaseStudyMosaicGrid from '../../components/case-studies/blocks/CaseStudyMosaicGrid'
import CaseStudyNextTiles from '../../components/case-studies/blocks/CaseStudyNextTiles'
import heroImg from '../../assets/dt/dt7-vip0.jpg'
import dtLogo from '../../assets/dt/logo-white.svg'
import stackImg from '../../assets/dt/dt-stack.jpg'
import stack5Img from '../../assets/dt/dt5-stack.jpg'
import snake5Img from '../../assets/dt/dt5-snake.jpg'
import vip1Img from '../../assets/dt/dt7-vip1.jpg'
import vip2Img from '../../assets/dt/dt7-vip2.jpg'
import shipperImg from '../../assets/dt/dt7-shipper.jpg'
import spreadsImg from '../../assets/dt/dtspreads.gif'
import unitedImg from '../../assets/dt/united-in-dirt.jpg'
import canaryThumb from '../../assets/canary/thumb.png'
import bloopThumb from '../../assets/bloop/thumb.png'

export default function DustyTimes() {
  return (
    <div className="page page--case-study dustytimes">
      <CaseStudyHero bgSrc={heroImg} markVectorSrc={dtLogo} />

      <CaseStudyRichTextSection>
        <p>
          <span>Dusty Times was once the primary publication of the off-road racing world. </span>
          <span className="dim">Brett McM Design rebuilt it as a new kind of media brand.</span>
        </p>
        <p>
          <span className="dim">As founding partner and design director, Brett McMillin led the transformation of a legacy racing newspaper into an annual lifestyle journal with cultural relevance and long-term brand equity.</span>
        </p>
      </CaseStudyRichTextSection>

      {/* Context */}
      <div className="section section--expanded cs-layout--cols">
        <div className="cs-col">
          <CaseStudyImagePanel
            src={stackImg}
            alt="Stacked issues of Dusty Times"
            aspectWidth={2000}
            aspectHeight={1333}
            borderRadius={4}
          />
        </div>
        <div className="cs-col">
          <CaseStudyRuleTextSection heading="Context">
            <p>From 1983 to 2013, Dusty Times served as the connective tissue of the off-road community through race coverage and classifieds.</p>
            <p>When it shut down, the brand disappeared with it.</p>
            <p>In 2019, Custom Wheel House acquired the rights and set out to revive it. Not as a continuation, but as a redefinition.</p>
            <p>The opportunity was to take a known name and give it a new role in the culture.</p>
          </CaseStudyRuleTextSection>
        </div>
      </div>

      {/* Tension */}
      <div className="section section--narrow">
        <CaseStudyRuleTextSection heading="Tension">
          <p>The category had moved on from print.</p>
          <p>At the same time, off-road culture had not developed a visual or editorial standard that matched its evolution. Most media in the space remained purely functional.</p>
          <p>Launching a print publication under these conditions required a clear point of view.</p>
          <p>Dusty Times needed to justify its existence through quality, not frequency.</p>
        </CaseStudyRuleTextSection>
      </div>

      {/* Large image */}
      <div className="section section--wide">
        <CaseStudyImagePanel
          src={unitedImg}
          alt="United in Dirt"
          aspectWidth={1920}
          aspectHeight={1383}
          borderRadius={12}
        />
      </div>

      {/* Role */}
      <div className="section section--expanded cs-layout--cols">
        <div className="cs-col">
          <CaseStudyRuleTextSection heading="Role">
            <p>Brett McM Design operated as a founding partner, not a vendor.</p>
            <p>The scope included brand positioning, editorial posture, visual identity, art direction, publication design, production oversight, and quality standards across every output.</p>
            <p>The mandate was to build a brand that could carry forward for years, not just launch an issue.</p>
          </CaseStudyRuleTextSection>
        </div>
        <div className="cs-col">
          <CaseStudyMosaicGrid
            templateColumns="repeat(2, minmax(0, 1fr))"
            templateRows="repeat(2, minmax(0, 1fr))"
            gapX={4}
            gapY={4}
            height={560}
            borderRadius={2}
            tiles={[
              { key: 'r11', colStart: 1, rowStart: 1, images: [{ src: stack5Img, alt: '' }] },
              { key: 'r21', colStart: 2, rowStart: 1, images: [{ src: snake5Img, alt: '' }] },
              { key: 'r12', colStart: 1, rowStart: 2, images: [{ src: shipperImg, alt: '' }] },
              { key: 'r22', colStart: 2, rowStart: 2, images: [{ src: spreadsImg, alt: '' }] },
            ]}
          />
        </div>
      </div>

      {/* Strategic shift */}
      <div className="section section--narrow">
        <CaseStudyRuleTextSection heading="Strategic shift">
          <p>The most important decision was structural.</p>
          <p>Dusty Times moved from a monthly newspaper to an annual journal.</p>
          <p>This removed the pressure of news and created space for storytelling, photography, and pace.</p>
          <p>The publication became something to collect, not consume.</p>
        </CaseStudyRuleTextSection>
      </div>

      {/* Two-image row */}
      <div className="section section--wide">
        <CaseStudyTwoImageRow
          images={[
            { src: vip1Img, alt: '' },
            { src: vip2Img, alt: '' },
          ]}
          gap={8}
          aspectWidth={960}
          aspectHeight={720}
          borderRadius={4}
        />
      </div>

      {/* System */}
      <div className="section section--expanded cs-layout--stack">
        <div className="cs-max-900">
          <CaseStudyRuleTextSection heading="System">
            <p>The work focused on building a system that could scale with consistency.</p>
            <p>Photography was treated as the primary voice. Layouts created rhythm without excess. Typography remained restrained and confident. Editorial tone balanced authenticity with discipline.</p>
            <p>Each issue could evolve, but the identity remained intact.</p>
          </CaseStudyRuleTextSection>
        </div>
        <CaseStudyImagePanel
          src={spreadsImg}
          alt="Dusty Times magazine spreads"
          aspectWidth={1600}
          aspectHeight={900}
          borderRadius={4}
        />
      </div>

      {/* Constraints */}
      <div className="section section--narrow">
        <CaseStudyRuleTextSection heading="Constraints">
          <p>The project operated without a clear business model.</p>
          <p>Early issues were fully funded internally. Advertising was intentionally excluded to establish credibility. Distribution and audience willingness to pay were unknown.</p>
          <p>Production added another layer of complexity, requiring the team to learn the mechanics of print publishing in real time.</p>
        </CaseStudyRuleTextSection>
      </div>

      {/* Callout */}
      <CaseStudyRichTextSection>
        <p>
          <span>The first print run of Issue 01 was fully scrapped and reprinted to protect the standard of the brand. </span>
          <span className="dim">A sobering learning moment, and a decision set the tone for everything that followed. Brand above all else.</span>
        </p>
      </CaseStudyRichTextSection>

      {/* Editorial discipline */}
      <div className="section section--expanded cs-layout--cols">
        <div className="cs-col">
          <CaseStudyImagePanel
            src={stack5Img}
            alt="Dusty Times Issue 5 stack"
            aspectWidth={2000}
            aspectHeight={1333}
            borderRadius={4}
          />
        </div>
        <div className="cs-col">
          <CaseStudyRuleTextSection heading="Editorial discipline">
            <p>Growth created pressure to expand content.</p>
            <p>The decision was to narrow instead.</p>
            <p>Stories were selected based on alignment with the brand standard, not access or convenience. Strong material was rejected if it did not meet the level of execution required.</p>
            <p>This protected the integrity of the publication.</p>
          </CaseStudyRuleTextSection>
        </div>
      </div>

      {/* Impact + Future */}
      <CaseStudyRichTextSection>
        <p>
          <span>Dusty Times now operates as a cultural object within the off-road industry. </span>
          <span className="dim">It carries weight beyond its content. The original audience recognizes the legacy. A new audience engages with it as a modern expression of the culture.</span>
        </p>
        <p>
          <span className="dim">The brand has become a point of alignment for partners, contributors, and events. Dusty Times is expanding into a broader platform — the publication anchors a growing ecosystem of partnerships, sponsorships, and event integrations. Print remains central. The system is built to scale beyond it.</span>
        </p>
      </CaseStudyRichTextSection>

      <CaseStudyNextTiles tiles={[
        { to: '/case-studies/canary', label: 'Canary', thumb: canaryThumb },
        { to: '/case-studies/bloop', label: 'Bloop', thumb: bloopThumb },
      ]} />

      <Footer />
    </div>
  )
}
