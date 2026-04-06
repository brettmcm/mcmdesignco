import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Canary from './pages/case-studies/Canary'
import Bloop from './pages/case-studies/Bloop'
import DustyTimes from './pages/case-studies/DustyTimes'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/case-studies/canary" element={<Canary />} />
      <Route path="/case-studies/bloop" element={<Bloop />} />
      <Route path="/case-studies/dusty-times" element={<DustyTimes />} />
    </Routes>
  )
}
