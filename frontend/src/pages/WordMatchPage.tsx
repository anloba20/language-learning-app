import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WordMatchBoard } from '../features/games/word-match/components/WordMatchBoard'
import { WordMatchHeader } from '../features/games/word-match/components/WordMatchHeader'
import { WordMatchStatus } from '../features/games/word-match/components/WordMatchStatus'
import { WordMatchVocabularySuggestions } from '../features/games/word-match/components/WordMatchVocabularySuggestions'
import { mockWordPairs } from '../features/games/word-match/mockWordPairs'
import type { VocabularyCandidate, WordMatchAttempt } from '../features/games/word-match/wordMatch.types'
import './WordMatchPage.css'

const MISTAKES_BEFORE_VOCABULARY_SUGGESTION = 3

function shuffleWordPairs<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

export function WordMatchPage() {
  const { t } = useTranslation()
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null)
  const [matchedIds, setMatchedIds] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const [attempts, setAttempts] = useState<WordMatchAttempt[]>([])
  const [mistakesByPairId, setMistakesByPairId] = useState<Record<string, number>>({})
  const [savedVocabularyIds, setSavedVocabularyIds] = useState<string[]>([])
  const targetPairs = useMemo(() => shuffleWordPairs(mockWordPairs), [])

  const mistakesCount = attempts.filter((attempt) => !attempt.isCorrect).length
  const isCompleted = matchedIds.length === mockWordPairs.length
  const vocabularyCandidates: VocabularyCandidate[] = mockWordPairs
    .map((pair) => ({
      pairId: pair.id,
      source: pair.source,
      target: pair.target,
      mistakesCount: mistakesByPairId[pair.id] ?? 0,
    }))
    .filter((candidate) => candidate.mistakesCount >= MISTAKES_BEFORE_VOCABULARY_SUGGESTION)

  function isMatched(pairId: string) {
    return matchedIds.includes(pairId)
  }

  function isSavedToVocabulary(pairId: string) {
    return savedVocabularyIds.includes(pairId)
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
      setFeedback(t('wordMatch.feedback.chooseWordFirst'))
      return
    }

    const isCorrect = selectedSourceId === pairId
    const nextAttempt: WordMatchAttempt = {
      sourcePairId: selectedSourceId,
      targetPairId: pairId,
      isCorrect,
    }

    setAttempts((currentAttempts) => [...currentAttempts, nextAttempt])

    if (isCorrect) {
      setMatchedIds((currentMatchedIds) => [...currentMatchedIds, pairId])
      setSelectedSourceId(null)
      setFeedback(t('wordMatch.feedback.correct'))
      return
    }

    setMistakesByPairId((currentMistakes) => ({
      ...currentMistakes,
      [selectedSourceId]: (currentMistakes[selectedSourceId] ?? 0) + 1,
    }))
    setSelectedSourceId(null)
    setFeedback(t('wordMatch.feedback.wrong'))
  }

  function saveVocabularyWord(pairId: string) {
    setSavedVocabularyIds((currentSavedIds) => {
      if (currentSavedIds.includes(pairId)) {
        return currentSavedIds
      }

      return [...currentSavedIds, pairId]
    })
  }

  function saveAllVocabularyWords() {
    setSavedVocabularyIds((currentSavedIds) => {
      const candidateIds = vocabularyCandidates.map((candidate) => candidate.pairId)
      return Array.from(new Set([...currentSavedIds, ...candidateIds]))
    })
  }

  function resetGame() {
    setSelectedSourceId(null)
    setMatchedIds([])
    setFeedback(null)
    setAttempts([])
    setMistakesByPairId({})
    setSavedVocabularyIds([])
  }

  return (
    <main className="word-match-page">
      <section className="word-match-shell" aria-labelledby="word-match-title">
        <WordMatchHeader
          backLabel={t('wordMatch.actions.back')}
          category={t('dashboard.categories.vocabulary')}
          resetLabel={t('wordMatch.actions.reset')}
          title={t('games.wordMatch.title')}
          onReset={resetGame}
        />

        <WordMatchStatus
          completedLabel={t('wordMatch.status.completed')}
          feedback={feedback}
          isCompleted={isCompleted}
          matchedCount={matchedIds.length}
          matchedLabel={t('wordMatch.status.matched')}
          mistakesCount={mistakesCount}
          mistakesLabel={t('wordMatch.status.mistakes')}
          totalCount={mockWordPairs.length}
        />

        <WordMatchBoard
          boardAriaLabel={t('wordMatch.boardAriaLabel')}
          isMatched={isMatched}
          selectedSourceId={selectedSourceId}
          sourceColumnTitle={t('wordMatch.columns.words')}
          sourcePairs={mockWordPairs}
          targetColumnTitle={t('wordMatch.columns.translations')}
          targetPairs={targetPairs}
          onSourceClick={handleSourceClick}
          onTargetClick={handleTargetClick}
        />

        {isCompleted && (
          <WordMatchVocabularySuggestions
            addAllLabel={t('wordMatch.vocabulary.addAll')}
            addLabel={t('wordMatch.vocabulary.add')}
            candidates={vocabularyCandidates}
            isSavedToVocabulary={isSavedToVocabulary}
            kicker={t('wordMatch.vocabulary.kicker')}
            mistakesLabel={t('wordMatch.status.mistakes')}
            savedLabel={t('wordMatch.vocabulary.saved')}
            title={t('wordMatch.vocabulary.title')}
            onSaveAll={saveAllVocabularyWords}
            onSaveWord={saveVocabularyWord}
          />
        )}
      </section>
    </main>
  )
}