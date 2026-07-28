import type { VocabularyCandidate } from '../wordMatch.types'

type WordMatchVocabularySuggestionsProps = {
  addAllLabel: string
  addLabel: string
  candidates: VocabularyCandidate[]
  isSavedToVocabulary: (pairId: string) => boolean
  kicker: string
  mistakesLabel: string
  onSaveAll: () => void
  onSaveWord: (pairId: string) => void
  savedLabel: string
  title: string
}

export function WordMatchVocabularySuggestions({
  addAllLabel,
  addLabel,
  candidates,
  isSavedToVocabulary,
  kicker,
  mistakesLabel,
  onSaveAll,
  onSaveWord,
  savedLabel,
  title,
}: WordMatchVocabularySuggestionsProps) {
  if (candidates.length === 0) {
    return null
  }

  return (
    <section className="word-match-vocabulary" aria-labelledby="word-match-vocabulary-title">
      <div className="word-match-vocabulary-header">
        <div>
          <p className="word-match-kicker">{kicker}</p>
          <h2 id="word-match-vocabulary-title">{title}</h2>
        </div>

        <button className="word-match-reset" type="button" onClick={onSaveAll}>
          {addAllLabel}
        </button>
      </div>

      <div className="word-match-vocabulary-list">
        {candidates.map((candidate) => {
          const isSaved = isSavedToVocabulary(candidate.pairId)

          return (
            <div className="word-match-vocabulary-item" key={candidate.pairId}>
              <div>
                <span className="word-match-vocabulary-word">{candidate.source}</span>
                <span className="word-match-vocabulary-translation">{candidate.target}</span>
              </div>
              <span className="word-match-vocabulary-meta">{candidate.mistakesCount} {mistakesLabel}</span>
              <button
                className="word-match-vocabulary-button"
                disabled={isSaved}
                type="button"
                onClick={() => onSaveWord(candidate.pairId)}
              >
                {isSaved ? savedLabel : addLabel}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}