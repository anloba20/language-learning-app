import './GameCategoriesMenu.css'

type LobbyGame = {
  title: string
  subtitle: string
  accent: 'pink' | 'violet' | 'blue' | 'green' | 'orange' | 'rose'
  tag: string
}

type LobbyCategory = {
  value: string
  label: string
  games: LobbyGame[]
}

const lobbyCategories: LobbyCategory[] = [
  {
    value: 'vocabulary',
    label: 'Vocabulary',
    games: [
      { title: 'Word Match', subtitle: 'Pair words fast', accent: 'violet', tag: 'WM' },
      { title: 'Memory Cards', subtitle: 'Remember translations', accent: 'pink', tag: 'MC' },
      { title: 'Flashcards', subtitle: 'Quick word review', accent: 'blue', tag: 'FC' },
      { title: 'Speed Translation', subtitle: 'Beat the timer', accent: 'green', tag: 'ST' },
      { title: 'Picture Words', subtitle: 'Learn by image', accent: 'rose', tag: 'PW' },
      { title: 'Word Hunt', subtitle: 'Find hidden words', accent: 'orange', tag: 'WH' },
    ],
  },
  {
    value: 'listening',
    label: 'Listening',
    games: [
      { title: 'Listen & Choose', subtitle: 'Pick the meaning', accent: 'blue', tag: 'LC' },
      { title: 'Audio Match', subtitle: 'Match sound to word', accent: 'violet', tag: 'AM' },
      { title: 'Sound Sprint', subtitle: 'React to phrases', accent: 'green', tag: 'SS' },
      { title: 'Phrase Echo', subtitle: 'Repeat short lines', accent: 'pink', tag: 'PE' },
      { title: 'Minimal Pairs', subtitle: 'Hear tiny changes', accent: 'rose', tag: 'MP' },
    ],
  },
  {
    value: 'spelling',
    label: 'Spelling',
    games: [
      { title: 'Type the Word', subtitle: 'Write it correctly', accent: 'green', tag: 'TW' },
      { title: 'Missing Letters', subtitle: 'Fill the gaps', accent: 'orange', tag: 'ML' },
      { title: 'Word Builder', subtitle: 'Build from pieces', accent: 'violet', tag: 'WB' },
      { title: 'Letter Rush', subtitle: 'Choose the order', accent: 'blue', tag: 'LR' },
      { title: 'Silent Letter', subtitle: 'Spot tricky words', accent: 'pink', tag: 'SL' },
    ],
  },
  {
    value: 'grammar',
    label: 'Grammar',
    games: [
      { title: 'Sentence Builder', subtitle: 'Make clean phrases', accent: 'rose', tag: 'SB' },
      { title: 'Choose Form', subtitle: 'Pick the right ending', accent: 'violet', tag: 'CF' },
      { title: 'Fix the Phrase', subtitle: 'Repair mistakes', accent: 'orange', tag: 'FP' },
      { title: 'Case Quest', subtitle: 'Practice structure', accent: 'blue', tag: 'CQ' },
      { title: 'Tiny Dialogues', subtitle: 'Complete replies', accent: 'green', tag: 'TD' },
    ],
  },
]

const dashboardStats = [
  { label: 'Points', value: '840' },
  { label: 'Words', value: '36' },
  { label: 'Streak', value: '4 days' },
]

export function GameCategoriesMenu() {
  return (
    <section className="dashboard-content" id="games" aria-labelledby="game-lobby-title">
      <div className="dashboard-summary" aria-label="Learning summary">
        <div className="dashboard-summary-main">
          <p className="dashboard-summary-kicker">Today&apos;s practice</p>
          <h2 className="dashboard-summary-title" id="game-lobby-title">
            Continue learning English
          </h2>
          <p className="dashboard-summary-copy">Russian to English - 8 words left in your current round</p>
        </div>

        <button className="continue-card" type="button">
          <span className="continue-card-label">Continue</span>
          <span className="continue-card-title">Word Match</span>
          <span className="continue-card-meta">Vocabulary - Level 2</span>
        </button>

        <div className="dashboard-stats" aria-label="Current progress">
          {dashboardStats.map((stat) => (
            <div className="dashboard-stat" key={stat.label}>
              <span className="dashboard-stat-value">{stat.value}</span>
              <span className="dashboard-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="game-lobby">
        <div className="lobby-categories">
          {lobbyCategories.map((category) => (
            <section className="lobby-category" key={category.value} aria-labelledby={`${category.value}-title`}>
              <div className="lobby-category-header">
                <div className="lobby-category-title-wrap">
                  <h3 className="lobby-category-title" id={`${category.value}-title`}>
                    {category.label}
                  </h3>
                </div>

                <div className="lobby-category-actions" aria-label={`${category.label} controls`}>
                  <span className="lobby-category-count">{category.games.length}</span>
                  <button className="lobby-arrow" type="button" aria-label={`Previous ${category.label} games`}>
                    {'<'}
                  </button>
                  <button className="lobby-arrow" type="button" aria-label={`Next ${category.label} games`}>
                    {'>'}
                  </button>
                </div>
              </div>

              <div className="lobby-game-row" aria-label={`${category.label} games`}>
                {category.games.map((game) => (
                  <button className={`lobby-game-card lobby-game-card-${game.accent}`} type="button" key={game.title}>
                    <span className="lobby-game-title">{game.title}</span>
                    <span className="lobby-game-subtitle">{game.subtitle}</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}