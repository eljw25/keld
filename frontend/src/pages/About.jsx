import { Link } from 'react-router-dom'
import styles from './About.module.css'

function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>

        <section className={styles.section}>
          <h1 className={styles.title}>What's KELD?</h1>
          <p className={styles.tagline}>Korean-English Legal Dictionary</p>
          <p className={styles.body}>
            KELD is a translation tool built for Korean legal documents: criminal records,
            court decisions, and law enforcement filings. It combines a curated dictionary
            of verified Korean legal terminology with an AI layer that handles terms outside
            the dictionary, returning accurate English translations with uncertain terms
            flagged for human review.
          </p>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.heading}>Built by</h2>
          <p className={styles.body}>
            Eric Lee, CS student at the University of Maryland and former KATUSA Sergeant.
          </p>
          <a
            href="https://jwericlee.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Portfolio →
          </a>
        </section>

        <div className={styles.divider} />

        <p className={styles.disclaimer}>
          KELD is intended for reference use only. Translations should be verified
          by a qualified legal professional before use in any official context.
        </p>

        <Link to="/" className={styles.back}>← Back to translator</Link>

      </div>
    </main>
  )
}

export default About
