import { useState } from 'react'
import DocumentTab from '../components/DocumentTab'
import TermTab from '../components/TermTab'
import styles from './Home.module.css'

const TABS = [
  {
    id: 'document',
    label: 'Document Translation',
    desc: 'Paste a full Korean legal record and get a complete English translation'
  },
  {
    id: 'term',
    label: 'Term Reference',
    desc: 'Look up a Korean legal term — dictionary result vs AI side by side'
  },
]

function Home() {
  const [activeTab, setActiveTab] = useState('document')

  return (
    <main className={styles.main}>
      <div className={styles.container}>

        <div className={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className={styles.tabDesc}>
          {TABS.find(t => t.id === activeTab)?.desc}
        </p>

        <div className={styles.content}>
          {activeTab === 'document' ? <DocumentTab /> : <TermTab />}
        </div>

      </div>
    </main>
  )
}

export default Home
