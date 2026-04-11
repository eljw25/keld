import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer style={{ textAlign: 'center', padding: '2rem', fontSize: '0.8rem', color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
        © 2026 Eric Lee. All rights reserved.
      </footer>
    </BrowserRouter>
  )
}

export default App
