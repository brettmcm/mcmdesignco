import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CaseStudyHero from '../../components/case-studies/blocks/CaseStudyHero'
import CaseStudyRichTextSection from '../../components/case-studies/blocks/CaseStudyRichTextSection'
import CaseStudyRuleTextSection from '../../components/case-studies/blocks/CaseStudyRuleTextSection'
import CaseStudyMosaicGrid from '../../components/case-studies/blocks/CaseStudyMosaicGrid'
import CaseStudyImagePanel from '../../components/case-studies/blocks/CaseStudyImagePanel'
import CaseStudyTwoImageRow from '../../components/case-studies/blocks/CaseStudyTwoImageRow'

const heroImg     = '/src/assets/canary/hero.png'
const canaryLogo  = '/src/assets/canary/logo-white.svg'
const challenge01 = '/src/assets/canary/challenge-01.png'
const challenge02 = '/src/assets/canary/challenge-02.png'
const challenge03 = '/src/assets/canary/challenge-03.png'
const challenge04 = '/src/assets/canary/challenge-04.png'
const disrupt01   = '/src/assets/canary/disrupt-01.png'
const disrupt02   = '/src/assets/canary/disrupt-02.png'
const photoshoot01 = '/src/assets/canary/photoshoot-01.png'
const photoshoot02 = '/src/assets/canary/photoshoot-02.png'
const photoshoot03 = '/src/assets/canary/photoshoot-03.png'
const photoshoot04 = '/src/assets/canary/photoshoot-04.png'
const scout01     = '/src/assets/canary/scout-01.png'
const scout02     = '/src/assets/canary/scout-02.png'
const creative01  = '/src/assets/canary/creative-01.png'
const creative02  = '/src/assets/canary/creative-02.png'
const creative03  = '/src/assets/canary/brush.gif'
const creative04  = '/src/assets/canary/creative-04.png'
const creative05  = '/src/assets/canary/creative-05.png'
const creative06  = '/src/assets/canary/creative-06.png'

export default function Canary() {
  return (
    <div className="page page--case-study canary">
      <Header />

      <CaseStudyHero bgSrc={heroImg} markVectorSrc={canaryLogo} />

      <CaseStudyRichTextSection>
        <p>
          <span>The sustainable personal care aisle had become visually predictable. </span>
          <span className="dim">Soft colors. Gentle typography. Earnest language about doing better.</span>
        </p>
        <p>
          <span className="dim">Everything looked responsible. Very little felt distinct.</span>
        </p>
      </CaseStudyRichTextSection>

      {/* Challenge */}
      <div className="section section--expanded cs-layout--cols">
        <div className="cs-col">
          <CaseStudyMosaicGrid
            templateColumns="repeat(2, minmax(0, 1fr))"
            templateRows="repeat(2, minmax(0, 1fr))"
            height={625}
            borderRadius={2}
            tiles={[
              { key: 'c11', colStart: 1, rowStart: 1, images: [{ src: challenge01, alt: '' }] },
              { key: 'c21', colStart: 2, rowStart: 1, images: [{ src: challenge02, alt: '' }] },
              { key: 'c12', colStart: 1, rowStart: 2, images: [{ src: challenge03, alt: '' }] },
              { key: 'c22', colStart: 2, rowStart: 2, bgColor: '#dfdfdf', images: [{ src: challenge04, alt: '' }] },
            ]}
          />
        </div>
        <div className="cs-col">
          <CaseStudyRuleTextSection heading="The challenge">
            <p>Canary saw an opening. They did not want to participate in the polite aesthetic that had come to define "clean." They believed sustainability could feel active and engaged, not muted and careful.</p>
            <p>At the same time, they were building products for real households. Adults and kids. Shared bathrooms. Daily routines.</p>
            <p>This created a real tension.</p>
            <p>Push too far into rebellion and lose families.<br aria-hidden="true" />Soften too much and become invisible.</p>
            <p>The brand needed to feel opinionated without feeling niche. Playful without feeling trivial. Serious about waste, but at home in everyday life.</p>
          </CaseStudyRuleTextSection>
        </div>
      </div>

      {/* Strategic insight */}
      <div className="section section--narrow">
        <CaseStudyRuleTextSection heading="Strategic insight">
          <p>The problem was not simply aesthetic. It was cultural.</p>
          <p>Many eco brands speak from a place of moral distance. They signal virtue. They imply correction.</p>
          <p>Canary did not want to correct people. They wanted to invite them.</p>
        </CaseStudyRuleTextSection>
      </div>

      {/* Large image */}
      <div className="section section--wide">
        <CaseStudyImagePanel src={disrupt01} aspectWidth={1904} aspectHeight={1071} borderRadius={12} />
      </div>

      {/* Copy + mosaic */}
      <div className="section section--wide cs-layout--cols">
        <div className="cs-col" style={{ maxWidth: 700 }}>
          <div className="cs-ruletext__body">
            <p>The shift was subtle but important. The enemy was not the consumer. It was plastic. It was wasteful systems that had become normal.</p>
            <p>That distinction allowed the brand to carry conviction without judgment.</p>
            <p>Subversion became optimism with clarity. Not aggression.</p>
          </div>
        </div>
        <div className="cs-col">
          <CaseStudyMosaicGrid
            templateColumns="1fr 0.25fr 1fr"
            templateRows="repeat(2, minmax(0, 1fr))"
            gapX={4}
            gapY={4}
            aspectWidth={1092}
            aspectHeight={813}
            borderRadius={2}
            tiles={[
              { key: 'm1', colStart: 1, rowStart: 2, images: [{ src: photoshoot04, alt: '' }] },
              { key: 'm2', colStart: 1, colSpan: 2, rowStart: 1, images: [{ src: photoshoot03, alt: '' }] },
              { key: 'm3', colStart: 3, rowStart: 1, images: [{ src: photoshoot02, alt: '' }] },
              { key: 'm4', colStart: 2, colSpan: 2, rowStart: 2, images: [{ src: photoshoot01, alt: '' }] },
            ]}
          />
        </div>
      </div>

      {/* Visual identity */}
      <div className="section section--expanded cs-layout--stack">
        <CaseStudyImagePanel src={disrupt02} aspectWidth={1344} aspectHeight={704} borderRadius={2} />
        <div className="cs-max-900">
          <CaseStudyRuleTextSection heading="Visual identity">
            <p>The identity holds tension deliberately.</p>
            <p>The wordmark is direct and confident. It shows up clearly on shelf. The typography is structured, not delicate. The language is plain about reducing plastic and rethinking habits.</p>
            <p>That gives the brand credibility with younger, design-aware consumers who expect brands to stand for something real.</p>
            <p>At the same time, the color system is energetic and welcoming. The mascot introduces personality without irony. The tone respects parents and speaks to children without condescension.</p>
            <p>Nothing is sarcastic. Nothing is preachy.</p>
            <p>Playfulness lives in expression. Conviction lives in stance.</p>
            <p>Because those roles are defined, a kid's toothpaste and an adult body product feel like parts of the same point of view.</p>
          </CaseStudyRuleTextSection>
        </div>
      </div>

      {/* Two images */}
      <div className="section section--wide">
        <CaseStudyTwoImageRow
          images={[
            { src: scout01, alt: '' },
            { src: scout02, alt: '' },
          ]}
          gap={8}
          aspectWidth={948}
          aspectHeight={733}
          borderRadius={4}
        />
      </div>

      {/* A system that adapts */}
      <div className="section section--expanded cs-layout--stack">
        <div className="cs-max-900">
          <CaseStudyRuleTextSection heading="A system that adapts">
            <p>The work resulted in a cohesive brand language that moves naturally from product to product.</p>
            <p>On shelf, Canary stands apart from the soft neutrals that surround it. In a family bathroom, it feels lively but not chaotic. In social channels, it can speak clearly about waste without shifting tone.</p>
            <p>There is range, but there is no drift.</p>
            <p>The brand feels intentional because each element plays a defined role. Nothing competes for attention. Nothing feels added for decoration.</p>
            <p>The identity does not sit on top of the product. It expresses what the product believes.</p>
          </CaseStudyRuleTextSection>
        </div>
        <CaseStudyMosaicGrid
          templateColumns="repeat(2, minmax(0, 1fr))"
          templateRows="repeat(3, minmax(0, 1fr))"
          gapX={4}
          gapY={4}
          height={2025}
          borderRadius={2}
          tiles={[
            { key: 's11', colStart: 1, rowStart: 1, images: [{ src: creative01, alt: '' }] },
            { key: 's12', colStart: 2, rowStart: 1, images: [{ src: creative02, alt: '' }] },
            { key: 's21', colStart: 1, rowStart: 2, images: [{ src: creative03, alt: '' }] },
            { key: 's22', colStart: 2, rowStart: 2, images: [{ src: creative04, alt: '' }] },
            { key: 's31', colStart: 1, rowStart: 3, images: [{ src: creative05, alt: '' }] },
            { key: 's32', colStart: 2, rowStart: 3, images: [{ src: creative06, alt: '' }] },
          ]}
        />
      </div>

      <CaseStudyRichTextSection>
        <p>
          <span>The most important work was not choosing colors or type. It was defining what Canary would not become. </span>
          <span className="dim">There were opportunities to lean harder into edge. There were opportunities to soften the work to feel safer. The discipline was in refusing both extremes.</span>
        </p>
        <p>
          <span className="dim">Canary is for real households. But it does not look or sound like a generic household brand. Holding that line required clarity and restraint. It gave Canary confidence in future decisions, not just this launch.</span>
        </p>
      </CaseStudyRichTextSection>

      {/* The outcome */}
      <div className="section section--narrow">
        <CaseStudyRuleTextSection heading="The outcome">
          <p>At launch, Canary did not blend into the eco aisle.</p>
          <p>It felt present. Confident. Engaged.</p>
          <p>It works for children and adults. For families and design-conscious young consumers. It carries a clear point of view without feeling exclusive.</p>
          <p>The result is a brand that feels deliberate in everyday life. Not loud. Not careful. Just clear.</p>
        </CaseStudyRuleTextSection>
      </div>

      <Footer />
    </div>
  )
}
