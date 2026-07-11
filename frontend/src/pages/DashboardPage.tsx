import { Button, Modal, Select, Stack } from '@mantine/core'
import { useState } from 'react'
import { useAuth } from '../features/auth/auth.hooks'
import './DashboardPage.css'

const LANGUAGE_PREFERENCES_STORAGE_KEY = 'language-preferences'

const languageOptions = [
  { value: 'russian', label: 'Russian' },
  { value: 'english', label: 'English' },
  { value: 'estonian', label: 'Estonian' },
  { value: 'german', label: 'German' },
]

type LanguagePreferences = {
  nativeLanguage: string
  learningLanguage: string
}

function getStoredLanguagePreferences(): LanguagePreferences | null {
  const rawPreferences = sessionStorage.getItem(LANGUAGE_PREFERENCES_STORAGE_KEY)

  if (!rawPreferences) {
    return null
  }

  try {
    const preferences = JSON.parse(rawPreferences) as Partial<LanguagePreferences>

    if (typeof preferences.nativeLanguage !== 'string' || typeof preferences.learningLanguage !== 'string') {
      return null
    }

    return {
      nativeLanguage: preferences.nativeLanguage,
      learningLanguage: preferences.learningLanguage,
    }
  } catch {
    return null
  }
}

export function DashboardPage() {
  const { logout } = useAuth()
  const [storedLanguagePreferences] = useState(() => getStoredLanguagePreferences())
  const [nativeLanguage, setNativeLanguage] = useState<string | null>(
    storedLanguagePreferences?.nativeLanguage ?? null,
  )
  const [learningLanguage, setLearningLanguage] = useState<string | null>(
    storedLanguagePreferences?.learningLanguage ?? null,
  )
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(!storedLanguagePreferences)

  const nativeLanguageOptions = languageOptions.filter((language) => language.value !== learningLanguage)
  const learningLanguageOptions = languageOptions.filter((language) => language.value !== nativeLanguage)
  const hasSameLanguages = Boolean(nativeLanguage && learningLanguage && nativeLanguage === learningLanguage)
  const canSaveLanguagePreferences = Boolean(nativeLanguage && learningLanguage && !hasSameLanguages)

  const handleSaveLanguagePreferences = () => {
    if (!nativeLanguage || !learningLanguage || hasSameLanguages) {
      return
    }

    sessionStorage.setItem(
      LANGUAGE_PREFERENCES_STORAGE_KEY,
      JSON.stringify({ nativeLanguage, learningLanguage }),
    )
    setIsLanguageModalOpen(false)
  }

  return (
    <main className="dashboard-page">
      <Modal
        opened={isLanguageModalOpen}
        onClose={() => undefined}
        title="Choose your languages"
        centered
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        classNames={{
          content: 'language-modal',
          header: 'language-modal-header',
          title: 'language-modal-title',
          body: 'language-modal-body',
        }}
      >
        <Stack gap={18}>
          <p className="language-modal-copy">
            Tell us your native language and what language you want to learn first.
          </p>

          <Select
            label="Native language"
            placeholder="Choose native language"
            data={nativeLanguageOptions}
            value={nativeLanguage}
            allowDeselect={false}
            classNames={{
              input: 'language-select-input',
              label: 'language-select-label',
              dropdown: 'language-select-dropdown',
              option: 'language-select-option',
            }}
            onChange={(value) => setNativeLanguage(typeof value === 'string' ? value : null)}
          />

          <Select
            label="Language to learn"
            placeholder="Choose language to learn"
            data={learningLanguageOptions}
            value={learningLanguage}
            allowDeselect={false}
            classNames={{
              input: 'language-select-input',
              label: 'language-select-label',
              dropdown: 'language-select-dropdown',
              option: 'language-select-option',
            }}
            onChange={(value) => setLearningLanguage(typeof value === 'string' ? value : null)}
          />

          {hasSameLanguages && (
            <p className="language-modal-error">Native language and learning language must be different.</p>
          )}

          <Button
            fullWidth
            disabled={!canSaveLanguagePreferences}
            classNames={{ root: 'language-modal-submit' }}
            onClick={handleSaveLanguagePreferences}
          >
            Continue
          </Button>
        </Stack>
      </Modal>

      <div className="dashboard-shell">
        <nav className="dashboard-navbar" aria-label="Dashboard navigation">
          <div className="dashboard-brand">
            <span className="dashboard-brand-mark">LG</span>
            <div>
              <p className="dashboard-brand-title">Language Games</p>
              <p className="dashboard-brand-subtitle">Learn by playing</p>
            </div>
          </div>

          <div className="dashboard-nav-links" aria-label="Main sections">
            <a className="dashboard-nav-link dashboard-nav-link-active" href="#games">
              Games
            </a>
            <a className="dashboard-nav-link" href="#progress">
              Progress
            </a>
            <a className="dashboard-nav-link" href="#profile">
              Profile
            </a>
          </div>

          <Button classNames={{ root: 'dashboard-logout' }} onClick={logout}>
            Logout
          </Button>
        </nav>

        <section className="dashboard-panel" aria-label="Dashboard preview">
          <p className="dashboard-kicker">Language games</p>
          <h1>Dashboard is coming next</h1>
          <p className="dashboard-copy">
            This screen will hold language selection, game cards, and progress after authentication.
          </p>
        </section>
      </div>
    </main>
  )
}