// TermTab.jsx — Single term lookup tab
// User types a Korean legal term → gets Dictionary result + AI result side by side
// Dictionary result = fast, deterministic, from our curated list
// AI result = GPT-3.5-turbo, handles terms not in our dictionary

import { useState } from 'react'
import { translateTerm } from '../api'
import styles from './TermTab.module.css'

function TermTab() {
  const [input, setInput]     = useState('')      // Korean term the user typed
  const [result, setResult]   = useState(null)    // Result from backend
  const [loading, setLoading] = useState(false)   // Show spinner
  const [error, setError]     = useState(null)    // Error message

  // Called on form submit or Enter key
  async function handleLookup(e) {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await translateTerm(input)
      setResult(data)
    } catch (err) {
      setError('Lookup failed. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  // Copy text to clipboard helper
  function copy(text) {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className={styles.wrapper}>

      {/* Search input */}
      <form className={styles.searchRow} onSubmit={handleLookup}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter a Korean legal term (e.g. 절도, 폭행, 집행유예)"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        <button
          className={styles.searchBtn}
          type="submit"
          disabled={loading || !input.trim()}
        >
          {loading ? '...' : 'Look up'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {/* Results — two panels side by side */}
      {result && (
        <div className={styles.results}>

          {/* Dictionary result */}
          <div className={styles.resultCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>Dictionary</span>
              <span className={styles.cardBadge}>
                {result.dictionary ? 'Found' : 'Not in dictionary'}
              </span>
            </div>
            <div className={styles.cardBody}>
              {result.dictionary ? (
                <>
                  <p className={styles.translation}>{result.dictionary}</p>
                  <button className={styles.copyBtn} onClick={() => copy(result.dictionary)}>
                    Copy
                  </button>
                </>
              ) : (
                <p className={styles.notFound}>
                  This term is not in the curated dictionary. See AI result →
                </p>
              )}
            </div>
            <p className={styles.cardNote}>
              Curated from verified Korean legal sources. Deterministic.
            </p>
          </div>

          {/* AI result */}
          <div className={styles.resultCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>AI Translation</span>
              <span className={styles.cardBadge}>GPT-3.5</span>
            </div>
            <div className={styles.cardBody}>
              {result.ai ? (
                <>
                  <p className={styles.translation}>{result.ai}</p>
                  <button className={styles.copyBtn} onClick={() => copy(result.ai)}>
                    Copy
                  </button>
                </>
              ) : (
                <p className={styles.notFound}>AI result unavailable.</p>
              )}
            </div>
            <p className={styles.cardNote}>
              AI-generated. Verify before use in official contexts.
            </p>
          </div>

        </div>
      )}

      {/* Disclaimer */}
      <p className={styles.disclaimer}>
        For reference only. Verify translations before official use.
      </p>

    </div>
  )
}

export default TermTab
