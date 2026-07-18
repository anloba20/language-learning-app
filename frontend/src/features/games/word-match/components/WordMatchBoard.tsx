import type { WordPair } from '../mockWordPairs'

type WordMatchBoardProps = {
  boardAriaLabel: string
  isMatched: (pairId: string) => boolean
  onSourceClick: (pairId: string) => void
  onTargetClick: (pairId: string) => void
  selectedSourceId: string | null
  sourceColumnTitle: string
  sourcePairs: WordPair[]
  targetColumnTitle: string
  targetPairs: WordPair[]
}

export function WordMatchBoard({
  boardAriaLabel,
  isMatched,
  onSourceClick,
  onTargetClick,
  selectedSourceId,
  sourceColumnTitle,
  sourcePairs,
  targetColumnTitle,
  targetPairs,
}: WordMatchBoardProps) {
  return (
    <section className="word-match-board" aria-label={boardAriaLabel}>
      <div className="word-match-column">
        <h2>{sourceColumnTitle}</h2>

        <div className="word-match-list">
          {sourcePairs.map((pair) => (
            <button
              className="word-match-card"
              data-selected={selectedSourceId === pair.id || undefined}
              data-matched={isMatched(pair.id) || undefined}
              disabled={isMatched(pair.id)}
              key={pair.id}
              type="button"
              onClick={() => onSourceClick(pair.id)}
            >
              {pair.source}
            </button>
          ))}
        </div>
      </div>

      <div className="word-match-column">
        <h2>{targetColumnTitle}</h2>

        <div className="word-match-list">
          {targetPairs.map((pair) => (
            <button
              className="word-match-card"
              data-matched={isMatched(pair.id) || undefined}
              disabled={isMatched(pair.id)}
              key={pair.id}
              type="button"
              onClick={() => onTargetClick(pair.id)}
            >
              {pair.target}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}