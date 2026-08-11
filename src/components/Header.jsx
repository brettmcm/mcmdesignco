import { Link, NavLink, useLocation } from 'react-router-dom'
import { animateScrollTo } from '../utils/scrollAnimation'
import LOGO_MARK from '../assets/logo.svg'

const CONTACT_EMAIL = 'mailto:hello@brettmcm.com'

export default function Header() {
  const location = useLocation()
  const scrollToTopOnCurrentPage = (path) => (event) => {
    if (location.pathname !== path) return

    event.preventDefault()

    animateScrollTo(0, {
      onComplete: () => window.history.pushState(null, '', path),
    })
  }

  return (
    <header className="header">
      <Link to="/" className="header-logo" onClick={scrollToTopOnCurrentPage('/')}>
        <div className="header-logo-mark">
          <img src={LOGO_MARK} alt="MCM logo mark" width="31" height="31" decoding="async" />
        </div>
        <span className="header-logo-name">Brett McM Design</span>
      </Link>
      <nav className="header-nav">
        <NavLink to="/" onClick={scrollToTopOnCurrentPage('/')}>Home</NavLink>
        <NavLink to="/work" onClick={scrollToTopOnCurrentPage('/work')}>Work</NavLink>
        <NavLink to="/about" onClick={scrollToTopOnCurrentPage('/about')}>About</NavLink>
        <a href={CONTACT_EMAIL}>Contact</a>
      </nav>
    </header>
  )
}
