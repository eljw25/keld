// Nav.jsx — Top navigation bar
// Displays the KELD logo/tagline and a link to the About page

import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo — clicking takes you back to home */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>KELD</span>
          <span className={styles.tagline}>Korean-English Legal Dictionary</span>
        </Link>

        {/* Navigation links */}
        <div className={styles.links}>
          <Link to="/about" className={styles.link}>About</Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
