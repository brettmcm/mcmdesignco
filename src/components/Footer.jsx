const TWITTER  = '/src/assets/icons/twitterx.svg'
const LINKEDIN  = '/src/assets/icons/linkedin.svg'
const INSTAGRAM = '/src/assets/icons/instagram.svg'

export default function Footer() {
  return (
    <div className="footer-cta">
      <div className="footer-cta__body">
        <p className="footer-cta__heading">
          <strong>Let's talk </strong>
          <span className="dim">and make plans to build your brand together.</span>
        </p>
        <a className="footer-cta__btn" href="#">Contact</a>
      </div>
      <div className="footer-bar">
        <span className="footer-bar__name">MCM Design Co.</span>
        <div className="footer-bar__socials">
          <div className="footer-bar__social">
            <img src={TWITTER} alt="Twitter/X" />
          </div>
          <div className="footer-bar__social">
            <img src={LINKEDIN} alt="LinkedIn" />
          </div>
          <div className="footer-bar__social">
            <img src={INSTAGRAM} alt="Instagram" />
          </div>
        </div>
      </div>
    </div>
  )
}
