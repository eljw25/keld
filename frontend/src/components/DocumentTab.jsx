import { useState } from 'react'
import { translateDocument } from '../api'
import styles from './DocumentTab.module.css'

const SAMPLE_TEXT = `피의자는 2023년 3월 15일 서울중앙지방법원에서 절도 및 폭행 혐의로 기소되었습니다.
판결: 징역 1년, 집행유예 2년.
추가 혐의: 업무방해.`

function DocumentTab() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleTranslate() {
    if (!input.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await translateDocument(input)
      if (data.error) throw new Error(data.error)
      setResult(data)
    } catch {
      setError('Translation failed. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSample() {
    setInput(SAMPLE_TEXT)
    setResult(null)
    setError(null)
  }

  function handleCopy() {
    if (result?.translation) {
      navigator.clipboard.writeText(result.translation)
    }
  }

  function renderTranslation(text) {
    const parts = text.split(/(\[UNCERTAIN:.*?\])/g)
    return parts.map((part, i) => {
      if (part.startsWith('[UNCERTAIN:')) {
        const term = part.replace('[UNCERTAIN:', '').replace(']', '').trim()
        return <mark key={i} className={styles.uncertain}>{term}</mark>
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelLabel}>Korean Input</span>
          <button className={styles.sampleBtn} onClick={handleSample}>
            Load sample
          </button>
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Paste Korean legal text here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={16}
        />
        <div className={styles.actions}>
          <button
            className={styles.translateBtn}
            onClick={handleTranslate}
            disabled={loading || !input.trim()}
          >
            {loading ? 'Translating...' : 'Translate'}
          </button>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelLabel}>English Output</span>
          {result && (
            <button className={styles.copyBtn} onClick={handleCopy}>
              Copy
            </button>
          )}
        </div>

        <div className={styles.output}>
          {!result && !loading && !error && (
            <p className={styles.placeholder}>Translation will appear here.</p>
          )}

          {loading && (
            <div className={styles.loading}>
              <span className={styles.spinner} />
              Translating...
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          {result && (
            <>
              <p className={styles.translationText}>
                {renderTranslation(result.translation)}
              </p>

              {result.uncertain_terms?.length > 0 && (
                <div className={styles.uncertainBox}>
                  <p className={styles.uncertainTitle}>
                    Terms flagged for review:
                  </p>
                  <ul>
                    {result.uncertain_terms.map((t, i) => (
                      <li key={i} className={styles.uncertainItem}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        <p className={styles.disclaimer}>
          For reference only. Verify translations before official use.
        </p>
      </div>

    </div>
  )
}

export default DocumentTab
