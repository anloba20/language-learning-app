import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthBrandPanel } from '../features/auth/components/AuthBrandPanel'
import { AuthForm } from '../features/auth/components/AuthForm'
import { AuthModeSwitch } from '../features/auth/components/AuthModeSwitch'
import { useAuth } from '../features/auth/auth.hooks'
import type { AuthFormValues, AuthMode } from '../features/auth/types'
import { loginUser, registerUser } from '../shared/api/auth'
import { UI_LANGUAGE_STORAGE_KEY, uiLanguages } from '../shared/i18n'
import './AuthPage.css'

const authFieldTranslationKeys: Record<keyof AuthFormValues, string> = {
  confirm_password: 'auth.form.confirmPassword',
  email: 'auth.form.email',
  nickname: 'auth.form.nickname',
  password: 'auth.form.password',
}

function createInitialAuthForm(mode: AuthMode): AuthFormValues {
  if (mode === 'register') {
    return {
      nickname: '',
      email: '',
      password: '',
      confirm_password: '',
    }
  }

  return {
    nickname: '',
    password: '',
  }
}

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [form, setForm] = useState<AuthFormValues>(() => createInitialAuthForm('login'))
  const { login } = useAuth()
  const { i18n, t } = useTranslation()

  const activeUiLanguage = i18n.resolvedLanguage ?? i18n.language
  const submitText = mode === 'login' ? t('auth.submit.signIn') : t('auth.submit.createAccount')
  const authHandler = {
    login: loginUser,
    register: registerUser,
  }

  function updateField(field: keyof AuthFormValues, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode)
    setForm(createInitialAuthForm(nextMode))
  }

  function validateForm(): string | null {
    for (const [field, value] of Object.entries(form) as Array<[keyof AuthFormValues, string]>) {
      if (value.trim() === '') {
        return t('auth.validation.required', { field: t(authFieldTranslationKeys[field]) })
      }
      if (field === 'confirm_password' && value !== form.password) {
        return t('auth.validation.passwordsMustMatch')
      }
    }
    return null
  }

  function changeUiLanguage(language: string) {
    localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, language)
    i18n.changeLanguage(language)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      notifications.show({
        title: mode === 'login' ? t('auth.notifications.loginFailed') : t('auth.notifications.registrationFailed'),
        message: validationError,
        color: 'grape',
      })
      return
    }

    try {
      const token = await authHandler[mode](form)
      login(token)
    } catch (error) {
      notifications.show({
        title: mode === 'login' ? t('auth.notifications.loginFailed') : t('auth.notifications.registrationFailed'),
        message: error instanceof Error ? error.message : t('auth.notifications.genericError'),
        color: 'grape',
      })
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-label={t('auth.ariaLabel')}>
        <AuthBrandPanel />

        <section className="auth-panel" aria-labelledby="auth-title">
          <div className="auth-panel-intro">
            <p className="auth-kicker">{t('app.name')}</p>
            <h1 id="auth-title">{t('app.tagline')}</h1>
            <div className="auth-languages" aria-label={t('auth.availableLanguagesAriaLabel')}>
              {uiLanguages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  className="auth-language-button"
                  data-active={activeUiLanguage === language.code || undefined}
                  onClick={() => changeUiLanguage(language.code)}
                >
                  {t(language.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <AuthModeSwitch mode={mode} onChange={switchMode} />

          <AuthForm
            mode={mode}
            form={form}
            submitText={submitText}
            onFieldChange={updateField}
            onSubmit={handleSubmit}
          />
        </section>
      </section>
    </main>
  )
}