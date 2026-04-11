import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>KELD</span>
          <span className={styles.tagline}>Korean-English Legal Dictionary</span>
        </Link>

        <div className={styles.links}>
          <Link to="/about" className={styles.link}>About KELD</Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav
