import { Link } from 'react-router-dom'
import styles from './About.module.css'

function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>

        <section className={styles.section}>
          <h1 className={styles.title}>About KELD</h1>
          <p className={styles.tagline}>Korean-English Legal Dictionary</p>
          <p className={styles.body}>
            KELD is a translation tool built for Korean legal documents — criminal records,
            court decisions, and law enforcement filings. It combines a curated dictionary
            of verified Korean legal terminology with an AI layer that handles terms outside
            the dictionary, returning accurate English translations with uncertain terms
            flagged for human review.
          </p>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.heading}>Why it was built</h2>
          <p className={styles.body}>
            While serving as a KATUSA interpreter at a U.S. military headquarters in South Korea,
            processing Korean criminal records for incoming personnel took days — done entirely by hand,
            term by term, with no tools available on the classified network.
            A JavaScript tool with a hardcoded legal dictionary cut that process from days to hours.
            KELD is the rebuilt, generalized version of that tool — open to anyone who needs it,
            with an AI layer that handles terminology beyond what any static dictionary can cover.
          </p>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.heading}>Built by</h2>
          <p className={styles.body}>
            Eric Lee — CS student at the University of Maryland, former KATUSA Sergeant.{' '}
            <a
              href="https://jwericlee.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Portfolio →
            </a>
          </p>
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
