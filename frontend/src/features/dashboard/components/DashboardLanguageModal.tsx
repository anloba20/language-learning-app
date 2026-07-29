import { Button, Modal, Select, Stack } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../auth/auth.hooks'
import { getUserProfile, updateUserProfile } from '../../../shared/api/auth'
import './DashboardLanguageModal.css'

const languageValues = [
  { value: '2', labelKey: 'languages.russian' },
  { value: '1', labelKey: 'languages.english' },
  { value: '3', labelKey: 'languages.estonian' },
  { value: '4', labelKey: 'languages.german' },
  { value: '5', labelKey: 'languages.norwegian' },
] as const

export function DashboardLanguageModal() {
  const { t } = useTranslation()
  const { profile, setProfile, token } = useAuth()
  const [nativeLanguage, setNativeLanguage] = useState<string | null>(null)
  const [learningLanguage, setLearningLanguage] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const languageOptions = languageValues.map((language) => ({
    value: language.value,
    label: t(language.labelKey),
  }))
  const nativeLanguageOptions = languageOptions.filter((language) => language.value !== learningLanguage)
  const learningLanguageOptions = languageOptions.filter((language) => language.value !== nativeLanguage)
  const hasSameLanguages = Boolean(nativeLanguage && learningLanguage && nativeLanguage === learningLanguage)
  const canSaveLanguagePreferences = Boolean(nativeLanguage && learningLanguage && !hasSameLanguages)

  useEffect(() => {
    if (!token) {
      return
    }

    if (profile) {
      const profileNativeLanguage = profile.native_language_id ? String(profile.native_language_id) : null
      const profileLearningLanguage = profile.foreign_language_id ? String(profile.foreign_language_id) : null

      setNativeLanguage(profileNativeLanguage)
      setLearningLanguage(profileLearningLanguage)
      setIsOpen(!profileNativeLanguage || !profileLearningLanguage)
      return
    }

    let shouldIgnoreResponse = false

    async function loadProfile() {
      try {
        const loadedProfile = await getUserProfile(token)

        if (shouldIgnoreResponse) {
          return
        }

        setProfile(loadedProfile)
      } catch (error) {
        if (shouldIgnoreResponse) {
          return
        }

        setIsOpen(true)
        notifications.show({
          title: t('dashboard.languageModal.title'),
          message: error instanceof Error ? error.message : t('auth.notifications.genericError'),
          color: 'grape',
        })
      }
    }

    void loadProfile()

    return () => {
      shouldIgnoreResponse = true
    }
  }, [profile, setProfile, t, token])

  const handleSaveLanguagePreferences = async () => {
    if (!token || !nativeLanguage || !learningLanguage || hasSameLanguages) {
      return
    }

    try {
      setIsSaving(true)
      const updatedProfile = await updateUserProfile(token, {
        native_language_id: Number(nativeLanguage),
        foreign_language_id: Number(learningLanguage),
      })

      setProfile(updatedProfile)
      setIsOpen(false)
    } catch (error) {
      notifications.show({
        title: t('dashboard.languageModal.title'),
        message: error instanceof Error ? error.message : t('auth.notifications.genericError'),
        color: 'grape',
      })
    } finally {
      setIsSaving(false)
    }
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
          disabled={!canSaveLanguagePreferences || isSaving}
          loading={isSaving}
          classNames={{ root: 'language-modal-submit' }}
          onClick={handleSaveLanguagePreferences}
        >
          {t('dashboard.languageModal.continue')}
        </Button>
      </Stack>
    </Modal>
  )
}
