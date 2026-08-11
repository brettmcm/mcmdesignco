import TWITTER from '../assets/icons/twitterx.svg'
import LINKEDIN from '../assets/icons/linkedin.svg'
import INSTAGRAM from '../assets/icons/instagram.svg'

const CONTACT_EMAIL = 'mailto:hello@brettmcm.com'
const SOCIAL_LINKS = {
  twitter: 'https://www.x.com/brettmcm',
  linkedin: 'https://www.linkedin.com/in/brettmcm',
  instagram: 'https://www.instagram.com/brettmcm',
}

export default function Footer() {
  return (
    <div className="footer-cta">
      <div className="footer-cta__body">
        <p className="footer-cta__heading">
          <strong>Let's talk </strong>
          <span className="dim">and build the brand with care from the start.</span>
        </p>
        <a className="footer-cta__btn" href={CONTACT_EMAIL}>Contact</a>
      </div>
      <div className="footer-bar">
        <span className="footer-bar__name">Brett McM Design</span>
        <div className="footer-bar__socials">
          <a
            className="footer-bar__social"
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="Brett McMillin on X"
          >
            <img src={TWITTER} alt="Twitter/X" width="24" height="24" loading="lazy" decoding="async" />
          </a>
          <a
            className="footer-bar__social"
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Brett McMillin on LinkedIn"
          >
            <img src={LINKEDIN} alt="LinkedIn" width="24" height="24" loading="lazy" decoding="async" />
          </a>
          <a
            className="footer-bar__social"
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Brett McMillin on Instagram"
          >
            <img src={INSTAGRAM} alt="Instagram" width="24" height="24" loading="lazy" decoding="async" />
          </a>
        </div>
      </div>
    </div>
  )
}
