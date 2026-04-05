import { Link as RouterLink } from 'react-router-dom'
import Arrow from './Arrow'

export default function Link({ linkText, to, href = '#' }) {
  const Component = to ? RouterLink : 'a'

  return (
    <Component
      className="link"
      to={to}
      href={to ? undefined : href}
    >
      <span className="link-text">{linkText}</span>
      <Arrow />
    </Component>
  )
}
