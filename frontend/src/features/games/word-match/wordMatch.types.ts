export type WordMatchAttempt = {
  sourcePairId: string
  targetPairId: string
  isCorrect: boolean
}

export type VocabularyCandidate = {
  pairId: string
  source: string
  target: string
  mistakesCount: number
}