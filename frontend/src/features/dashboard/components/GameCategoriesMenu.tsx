import { useTranslation } from 'react-i18next'
import './GameCategoriesMenu.css'

type LobbyGame = {
  titleKey: string
  subtitleKey: string
  accent: 'pink' | 'violet' | 'blue' | 'green' | 'orange' | 'rose'
}

type LobbyCategory = {
  value: string
  labelKey: string
  games: LobbyGame[]
}

const lobbyCategories: LobbyCategory[] = [
  {
    value: 'vocabulary',
    labelKey: 'dashboard.categories.vocabulary',
    games: [
      { titleKey: 'games.wordMatch.title', subtitleKey: 'games.wordMatch.subtitle', accent: 'violet' },
      { titleKey: 'games.memoryCards.title', subtitleKey: 'games.memoryCards.subtitle', accent: 'pink' },
      { titleKey: 'games.flashcards.title', subtitleKey: 'games.flashcards.subtitle', accent: 'blue' },
      { titleKey: 'games.speedTranslation.title', subtitleKey: 'games.speedTranslation.subtitle', accent: 'green' },
      { titleKey: 'games.pictureWords.title', subtitleKey: 'games.pictureWords.subtitle', accent: 'rose' },
      { titleKey: 'games.wordHunt.title', subtitleKey: 'games.wordHunt.subtitle', accent: 'orange' },
    ],
  },
  {
    value: 'listening',
    labelKey: 'dashboard.categories.listening',
    games: [
      { titleKey: 'games.listenAndChoose.title', subtitleKey: 'games.listenAndChoose.subtitle', accent: 'blue' },
      { titleKey: 'games.audioMatch.title', subtitleKey: 'games.audioMatch.subtitle', accent: 'violet' },
      { titleKey: 'games.soundSprint.title', subtitleKey: 'games.soundSprint.subtitle', accent: 'green' },
      { titleKey: 'games.phraseEcho.title', subtitleKey: 'games.phraseEcho.subtitle', accent: 'pink' },
      { titleKey: 'games.minimalPairs.title', subtitleKey: 'games.minimalPairs.subtitle', accent: 'rose' },
    ],
  },
  {
    value: 'spelling',
    labelKey: 'dashboard.categories.spelling',
    games: [
      { titleKey: 'games.typeTheWord.title', subtitleKey: 'games.typeTheWord.subtitle', accent: 'green' },
      { titleKey: 'games.missingLetters.title', subtitleKey: 'games.missingLetters.subtitle', accent: 'orange' },
      { titleKey: 'games.wordBuilder.title', subtitleKey: 'games.wordBuilder.subtitle', accent: 'violet' },
      { titleKey: 'games.letterRush.title', subtitleKey: 'games.letterRush.subtitle', accent: 'blue' },
      { titleKey: 'games.silentLetter.title', subtitleKey: 'games.silentLetter.subtitle', accent: 'pink' },
    ],
  },
  {
    value: 'grammar',
    labelKey: 'dashboard.categories.grammar',
    games: [
      { titleKey: 'games.sentenceBuilder.title', subtitleKey: 'games.sentenceBuilder.subtitle', accent: 'rose' },
      { titleKey: 'games.chooseForm.title', subtitleKey: 'games.chooseForm.subtitle', accent: 'violet' },
      { titleKey: 'games.fixThePhrase.title', subtitleKey: 'games.fixThePhrase.subtitle', accent: 'orange' },
      { titleKey: 'games.caseQuest.title', subtitleKey: 'games.caseQuest.subtitle', accent: 'blue' },
      { titleKey: 'games.tinyDialogues.title', subtitleKey: 'games.tinyDialogues.subtitle', accent: 'green' },
    ],
  },
]

const dashboardStats = [
  { labelKey: 'dashboard.summary.stats.points', value: '840' },
  { labelKey: 'dashboard.summary.stats.words', value: '36' },
  { labelKey: 'dashboard.summary.stats.streak', valueKey: 'dashboard.summary.stats.streakValue' },
]

export function GameCategoriesMenu() {
  const { t } = useTranslation()

  return (
    <section className="dashboard-content" id="games" aria-labelledby="game-lobby-title">
      <div className="dashboard-summary" aria-label={t('dashboard.summary.ariaLabel')}>
        <div className="dashboard-summary-main">
          <p className="dashboard-summary-kicker">{t('dashboard.summary.kicker')}</p>
          <h2 className="dashboard-summary-title" id="game-lobby-title">
            {t('dashboard.summary.title')}
          </h2>
          <p className="dashboard-summary-copy">{t('dashboard.summary.copy')}</p>
        </div>

        <button className="continue-card" type="button">
          <span className="continue-card-label">{t('dashboard.summary.continueLabel')}</span>
          <span className="continue-card-title">{t('dashboard.summary.continueTitle')}</span>
          <span className="continue-card-meta">{t('dashboard.summary.continueMeta')}</span>
        </button>

        <div className="dashboard-stats" aria-label={t('dashboard.summary.statsAriaLabel')}>
          {dashboardStats.map((stat) => (
            <div className="dashboard-stat" key={stat.labelKey}>
              <span className="dashboard-stat-value">{'valueKey' in stat ? t(stat.valueKey) : stat.value}</span>
              <span className="dashboard-stat-label">{t(stat.labelKey)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="game-lobby">
        <div className="lobby-categories">
          {lobbyCategories.map((category) => {
            const categoryLabel = t(category.labelKey)

            return (
              <section className="lobby-category" key={category.value} aria-labelledby={`${category.value}-title`}>
                <div className="lobby-category-header">
                  <div className="lobby-category-title-wrap">
                    <h3 className="lobby-category-title" id={`${category.value}-title`}>
                      {categoryLabel}
                    </h3>
                  </div>

                  <div className="lobby-category-actions" aria-label={t('dashboard.lobby.categoryControlsAriaLabel', { category: categoryLabel })}>
                    <span className="lobby-category-count">{category.games.length}</span>
                    <button
                      className="lobby-arrow"
                      type="button"
                      aria-label={t('dashboard.lobby.previousCategoryGames', { category: categoryLabel })}
                    >
                      {'<'}
                    </button>
                    <button
                      className="lobby-arrow"
                      type="button"
                      aria-label={t('dashboard.lobby.nextCategoryGames', { category: categoryLabel })}
                    >
                      {'>'}
                    </button>
                  </div>
                </div>

                <div
                  className="lobby-game-row"
                  aria-label={t('dashboard.lobby.categoryGamesAriaLabel', { category: categoryLabel })}
                >
                  {category.games.map((game) => (
                    <button
                      className={`lobby-game-card lobby-game-card-${game.accent}`}
                      type="button"
                      key={game.titleKey}
                    >
                      <span className="lobby-game-title">{t(game.titleKey)}</span>
                      <span className="lobby-game-subtitle">{t(game.subtitleKey)}</span>
                    </button>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}