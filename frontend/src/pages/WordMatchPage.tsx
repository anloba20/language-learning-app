import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { mockWordPairs } from '../features/games/word-match/mockWordPairs'
import './WordMatchPage.css'

function shuffleWordPairs<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

export function WordMatchPage() {
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null)
  const [matchedIds, setMatchedIds] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const targetPairs = useMemo(() => shuffleWordPairs(mockWordPairs), [])

  const isCompleted = matchedIds.length === mockWordPairs.length

  function isMatched(pairId: string) {
    return matchedIds.includes(pairId)
  }

  function handleSourceClick(pairId: string) {
    if (isMatched(pairId)) {
      return
    }

    setSelectedSourceId(pairId)
    setFeedback(null)
  }

  function handleTargetClick(pairId: string) {
    if (isMatched(pairId)) {
      return
    }

    if (!selectedSourceId) {
      setFeedback('Choose a word first')
      return
    }

    if (selectedSourceId === pairId) {
      setMatchedIds((currentMatchedIds) => [...currentMatchedIds, pairId])
      setSelectedSourceId(null)
      setFeedback('Correct match')
      return
    }

    setSelectedSourceId(null)
    setFeedback('Not quite, try another pair')
  }

  function resetGame() {
    setSelectedSourceId(null)
    setMatchedIds([])
    setFeedback(null)
  }

  return (
    <main className="word-match-page">
      <section className="word-match-shell" aria-labelledby="word-match-title">
        <header className="word-match-header">
          <div>
            <p className="word-match-kicker">Vocabulary</p>
            <h1 id="word-match-title">Word Match</h1>
          </div>

          <div className="word-match-actions">
            <Link className="word-match-link" to="/dashboard">
              Back
            </Link>
            <button className="word-match-reset" type="button" onClick={resetGame}>
              Reset
            </button>
          </div>
        </header>

        <div className="word-match-status" aria-live="polite">
          <span>{matchedIds.length} / {mockWordPairs.length} matched</span>
          {feedback && <span>{feedback}</span>}
          {isCompleted && <span>Completed</span>}
        </div>

        <section className="word-match-board" aria-label="Word matching board">
          <div className="word-match-column">
            <h2>Words</h2>

            <div className="word-match-list">
              {mockWordPairs.map((pair) => (
                <button
                  className="word-match-card"
                  data-selected={selectedSourceId === pair.id || undefined}
                  data-matched={isMatched(pair.id) || undefined}
                  disabled={isMatched(pair.id)}
                  key={pair.id}
                  type="button"
                  onClick={() => handleSourceClick(pair.id)}
                >
                  {pair.source}
                </button>
              ))}
            </div>
          </div>

          <div className="word-match-column">
            <h2>Translations</h2>

            <div className="word-match-list">
              {targetPairs.map((pair) => (
                <button
                  className="word-match-card"
                  data-matched={isMatched(pair.id) || undefined}
                  disabled={isMatched(pair.id)}
                  key={pair.id}
                  type="button"
                  onClick={() => handleTargetClick(pair.id)}
                >
                  {pair.target}
                </button>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}