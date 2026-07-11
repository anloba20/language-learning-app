import { Button, Tabs } from '@mantine/core'
import { useState } from 'react'
import './GameCategoriesMenu.css'

const gameCategories = [
  {
    value: 'vocabulary',
    label: 'Vocabulary',
    description: 'Build words through matching, memory, and quick translation games.',
    games: ['Word Match', 'Memory Cards', 'Flashcards'],
  },
  {
    value: 'listening',
    label: 'Listening',
    description: 'Train your ear with short audio prompts and meaning checks.',
    games: ['Listen & Choose', 'Audio Match', 'Sound Sprint'],
  },
  {
    value: 'spelling',
    label: 'Spelling',
    description: 'Practice writing words correctly under light game pressure.',
    games: ['Type the Word', 'Missing Letters', 'Word Builder'],
  },
  {
    value: 'grammar',
    label: 'Grammar',
    description: 'Learn sentence structure with small focused challenges.',
    games: ['Sentence Builder', 'Choose Form', 'Fix the Phrase'],
  },
  {
    value: 'review',
    label: 'Review',
    description: 'Repeat older words and mistakes before they fade from memory.',
    games: ['Daily Review', 'Weak Words', 'Mixed Practice'],
  },
]

export function GameCategoriesMenu() {
  const [activeCategory, setActiveCategory] = useState(gameCategories[0].value)

  return (
    <section className="dashboard-content" id="games" aria-labelledby="game-categories-title">
      <div className="dashboard-heading">
        <h2 className="dashboard-heading-title" id="game-categories-title">
          Choose your practice
        </h2>
      </div>

      <Tabs
        value={activeCategory}
        onChange={(value) => {
          if (typeof value === 'string') {
            setActiveCategory(value)
          }
        }}
        classNames={{
          root: 'category-tabs',
          list: 'category-tabs-list',
          tab: 'category-tab',
          panel: 'category-tabs-panel',
        }}
      >
        <Tabs.List>
          {gameCategories.map((category) => (
            <Tabs.Tab key={category.value} value={category.value}>
              {category.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {gameCategories.map((category) => (
          <Tabs.Panel key={category.value} value={category.value}>
            <div className="category-detail">
              <div>
                <p className="category-detail-label">{category.label}</p>
                <h3 className="category-detail-title">{category.description}</h3>
              </div>

              <div className="category-games" aria-label={`${category.label} games`}>
                {category.games.map((game) => (
                  <article className="category-game-card" key={game}>
                    <span className="category-game-status">Mock game</span>
                    <h3>{game}</h3>
                    <p>Small practice round for your selected language pair.</p>
                    <Button classNames={{ root: 'category-game-button' }}>Open</Button>
                  </article>
                ))}
              </div>
            </div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </section>
  )
}