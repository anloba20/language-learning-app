import { Button, Modal, Select, Stack } from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './DashboardLanguageModal.css'

const LANGUAGE_PREFERENCES_STORAGE_KEY = 'language-preferences'

const languageValues = ['russian', 'english', 'estonian', 'german'] as const


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

export function DashboardLanguageModal() {
  const { t } = useTranslation()
  const [storedLanguagePreferences] = useState(() => getStoredLanguagePreferences())
  const [nativeLanguage, setNativeLanguage] = useState<string | null>(
    storedLanguagePreferences?.nativeLanguage ?? null,
  )
  const [learningLanguage, setLearningLanguage] = useState<string | null>(
    storedLanguagePreferences?.learningLanguage ?? null,
  )
  const [isOpen, setIsOpen] = useState(!storedLanguagePreferences)

  const languageOptions = languageValues.map((language) => ({
    value: language,
    label: t(`languages.${language}`),
  }))
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
    setIsOpen(false)
  }

  return (
    <Modal
      opened={isOpen}
      onClose={() => undefined}
      title={t('dashboard.languageModal.title')}
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
        <p className="language-modal-copy">{t('dashboard.languageModal.copy')}</p>

        <Select
          label={t('dashboard.languageModal.nativeLanguage')}
          placeholder={t('dashboard.languageModal.nativeLanguagePlaceholder')}
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
          label={t('dashboard.languageModal.learningLanguage')}
          placeholder={t('dashboard.languageModal.learningLanguagePlaceholder')}
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

        {hasSameLanguages && <p className="language-modal-error">{t('dashboard.languageModal.sameLanguageError')}</p>}

        <Button
          fullWidth
          disabled={!canSaveLanguagePreferences}
          classNames={{ root: 'language-modal-submit' }}
          onClick={handleSaveLanguagePreferences}
        >
          {t('dashboard.languageModal.continue')}
        </Button>
      </Stack>
    </Modal>
  )
}