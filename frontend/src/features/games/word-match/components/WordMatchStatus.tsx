type WordMatchStatusProps = {
  completedLabel: string
  feedback: string | null
  isCompleted: boolean
  matchedCount: number
  matchedLabel: string
  mistakesCount: number
  mistakesLabel: string
  totalCount: number
}

export function WordMatchStatus({
  completedLabel,
  feedback,
  isCompleted,
  matchedCount,
  matchedLabel,
  mistakesCount,
  mistakesLabel,
  totalCount,
}: WordMatchStatusProps) {
  return (
    <div className="word-match-status" aria-live="polite">
      <span>{matchedCount} / {totalCount} {matchedLabel}</span>
      <span>{mistakesCount} {mistakesLabel}</span>
      {feedback && <span>{feedback}</span>}
      {isCompleted && <span>{completedLabel}</span>}
    </div>
  )
}