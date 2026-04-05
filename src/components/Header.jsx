import { Link, NavLink } from 'react-router-dom'

const LOGO_MARK = '/src/assets/logo.svg'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <div className="header-logo-mark">
          <img src={LOGO_MARK} alt="MCM logo mark" />
        </div>
        <span className="header-logo-name">MCM Design Co.</span>
      </Link>
      <nav className="header-nav">
        <NavLink to="/about">About</NavLink>
        <span>Contact</span>
      </nav>
    </header>
  )
}
