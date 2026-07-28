import { Link } from 'react-router-dom'

type WordMatchHeaderProps = {
  category: string
  title: string
  backLabel: string
  resetLabel: string
  onReset: () => void
}

export function WordMatchHeader({ category, title, backLabel, resetLabel, onReset }: WordMatchHeaderProps) {
  return (
    <header className="word-match-header">
      <div>
        <p className="word-match-kicker">{category}</p>
        <h1 id="word-match-title">{title}</h1>
      </div>

      <div className="word-match-actions">
        <Link className="word-match-link" to="/dashboard">
          {backLabel}
        </Link>
        <button className="word-match-reset" type="button" onClick={onReset}>
          {resetLabel}
        </button>
      </div>
    </header>
  )
}