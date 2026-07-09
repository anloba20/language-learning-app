import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { AuthBrandPanel } from '../features/auth/components/AuthBrandPanel'
import { AuthForm } from '../features/auth/components/AuthForm'
import { AuthModeSwitch } from '../features/auth/components/AuthModeSwitch'
import type { AuthFormValues, AuthMode } from '../features/auth/types'
import './AuthPage.css'
import { loginUser, registerUser } from '../shared/api/auth'

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
  const [selectedLanguage, setSelectedLanguage] = useState('RU')

  const submitText = mode === 'login' ? 'Sign in' : 'Create account'
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
    for (const [field, value] of Object.entries(form)) {
      if (value.trim() === '') {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
      }
      if (field === 'confirm_password' && value !== form.password) {
        return 'Passwords must match.'
      }
    }
    return null
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationError = validateForm()
    if (validationError) {
       notifications.show({
        title: mode === 'login' ? 'Login failed' : 'Registration failed',
        message: validationError,
        color: 'grape',
      })
      return
    }

    try {
      await authHandler[mode](form)
    } catch (error) {
      console.log('error', error)
      notifications.show({
        title: mode === 'login' ? 'Login failed' : 'Registration failed',
        message: error instanceof Error ? error.message : 'Something went wrong. Try again.',
        color: 'grape',
      })
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-label="Authentication">
        <AuthBrandPanel />

        <section className="auth-panel" aria-labelledby="auth-title">
          <div className="auth-panel-intro">
            <p className="auth-kicker">Language games</p>
            <h1 id="auth-title">Learn by playing</h1>
            <div className="auth-languages" aria-label="Available languages">
              {['RU', 'EST', 'ENG', 'GER'].map((language) => (
                <button
                  key={language}
                  type="button"
                  className="auth-language-button"
                  data-active={selectedLanguage === language || undefined}
                  onClick={() => setSelectedLanguage(language)}
                >
                  {language}
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