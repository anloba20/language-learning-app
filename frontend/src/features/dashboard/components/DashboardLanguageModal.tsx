import { Button, Modal, Select, Stack } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../auth/auth.hooks'
import { getUserProfile, updateUserProfile } from '../../../shared/api/auth'
import './DashboardLanguageModal.css'
import { useLanguages } from '../../../shared/languages/languages.hooks'
import { getLanguageById, getLanguageLabelKey } from '../../../shared/languages/languages.utils'
import { changeUiLanguage } from '../../../shared/i18n'

type DashboardLanguageModalProps = {
  isOpenRequested?: boolean
  onClose?: () => void
}

export function DashboardLanguageModal({ isOpenRequested = false, onClose }: DashboardLanguageModalProps) {
  const { t } = useTranslation()
  const { profile, setProfile, token } = useAuth()
  const [nativeLanguage, setNativeLanguage] = useState<string | null>(null)
  const [learningLanguage, setLearningLanguage] = useState<string | null>(null)
  const [shouldOpenAfterProfileError, setShouldOpenAfterProfileError] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const profileNativeLanguage = profile?.native_language_id ? String(profile.native_language_id) : null
  const profileLearningLanguage = profile?.foreign_language_id ? String(profile.foreign_language_id) : null
  const selectedNativeLanguage = nativeLanguage ?? profileNativeLanguage
  const selectedLearningLanguage = learningLanguage ?? profileLearningLanguage
  const requiresLanguagePreferences = Boolean(profile && (!profileNativeLanguage || !profileLearningLanguage))
  const isOpen = requiresLanguagePreferences || shouldOpenAfterProfileError || isOpenRequested

  const { languages } = useLanguages()

  const languageOptions = languages.map((language) => ({
    value: language.id,
    label: t(getLanguageLabelKey(language)),
  }))
  const nativeLanguageOptions = languageOptions.filter((language) => language.value !== selectedLearningLanguage)
  const learningLanguageOptions = languageOptions.filter((language) => language.value !== selectedNativeLanguage)
  const hasSameLanguages = Boolean(
    selectedNativeLanguage &&
      selectedLearningLanguage &&
      selectedNativeLanguage === selectedLearningLanguage,
  )

  const canSaveLanguagePreferences = Boolean(selectedNativeLanguage && selectedLearningLanguage && !hasSameLanguages)

  useEffect(() => {
    if (!token || profile) {
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

        setShouldOpenAfterProfileError(true)
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

  useEffect(() => {
    const nativeLanguageCode = getLanguageById(languages, String(profile?.native_language_id))?.code

    if (nativeLanguageCode) {
      changeUiLanguage(nativeLanguageCode)
    }
  }, [languages, profile?.native_language_id])

  const handleSaveLanguagePreferences = async () => {
    if (!token || !selectedNativeLanguage || !selectedLearningLanguage || hasSameLanguages) {
      return
    }

    try {
      setIsSaving(true)
      const updatedProfile = await updateUserProfile(token, {
        native_language_id: Number(selectedNativeLanguage),
        foreign_language_id: Number(selectedLearningLanguage),
      })

      setProfile(updatedProfile)

      const savedNativeLanguage = getLanguageById(
        languages,
        String(updatedProfile.native_language_id),
      )

      if (savedNativeLanguage) {
        changeUiLanguage(savedNativeLanguage.code)
      }
      setShouldOpenAfterProfileError(false)
      onClose?.()
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
      onClose={() => {
        if (!requiresLanguagePreferences) {
          onClose?.()
        }
      }}
      title={t('dashboard.languageModal.title')}
      centered
      closeOnClickOutside={!requiresLanguagePreferences}
      closeOnEscape={!requiresLanguagePreferences}
      withCloseButton={!requiresLanguagePreferences}
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
          value={selectedNativeLanguage}
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
          value={selectedLearningLanguage}
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
