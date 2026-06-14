import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Canary from './pages/case-studies/Canary'
import Bloop from './pages/case-studies/Bloop'
import DustyTimes from './pages/case-studies/DustyTimes'

const PAGE_TRANSITION_DURATION = 420

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const transitionTimerRef = useRef(null)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    return () => window.clearTimeout(transitionTimerRef.current)
  }, [])

  const handleRouteTransitionClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    const anchor = event.target.closest('a')

    if (!anchor) return

    const href = anchor.getAttribute('href')
    const target = anchor.getAttribute('target')

    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      (target && target !== '_self')
    ) {
      return
    }

    const url = new URL(anchor.href)

    if (url.origin !== window.location.origin) return

    const isSamePage = url.pathname === location.pathname && url.search === location.search

    if (isSamePage) return

    event.preventDefault()

    window.clearTimeout(transitionTimerRef.current)
    setIsFading(true)

    transitionTimerRef.current = window.setTimeout(() => {
      window.scrollTo(0, 0)
      navigate(`${url.pathname}${url.search}${url.hash}`)
      window.requestAnimationFrame(() => setIsFading(false))
    }, PAGE_TRANSITION_DURATION)
  }

  return (
    <div onClickCapture={handleRouteTransitionClick}>
      <Header />
      <main className={`route-transition${isFading ? ' route-transition--fading' : ''}`}>
        <div className="route-transition__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-studies/canary" element={<Canary />} />
            <Route path="/case-studies/bloop" element={<Bloop />} />
            <Route path="/case-studies/dusty-times" element={<DustyTimes />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
