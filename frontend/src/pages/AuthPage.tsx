import { useState } from 'react'
import type { FormEvent } from 'react'
import { AuthBrandPanel } from '../features/auth/components/AuthBrandPanel'
import { AuthForm } from '../features/auth/components/AuthForm'
import { AuthModeSwitch } from '../features/auth/components/AuthModeSwitch'
import { initialAuthForm } from '../features/auth/types'
import type { AuthFormValues, AuthMode } from '../features/auth/types'
import './AuthPage.css'
import { registerUser } from '../shared/api/auth'

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [form, setForm] = useState<AuthFormValues>(initialAuthForm)
  const [message, setMessage] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('RU')

  const submitText = mode === 'login' ? 'Sign in' : 'Create account'

  function updateField(field: keyof AuthFormValues, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
    setMessage('')
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode)
    setForm(initialAuthForm)
    setMessage('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.nickname.trim() || !form.password.trim()) {
      setMessage('Nickname and password are required.')
      return
    }

    if (mode === 'register') {
      if (!form.email.trim()) {
        setMessage('Email is required.')
        return
      }

      if (form.password !== form.confirm_password) {
        setMessage('Passwords must match.')
        return
      }
    }
    if (mode === 'login') {
      setMessage('Login form is ready for backend integration.')
      return
    }

    try {
      await registerUser(form)
      setMessage('Account created.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Registration failed.')
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
              {['RU', 'EST', 'ENG'].map((language) => (
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
            message={message}
            submitText={submitText}
            onFieldChange={updateField}
            onSubmit={handleSubmit}
          />
        </section>
      </section>
    </main>
  )
}
