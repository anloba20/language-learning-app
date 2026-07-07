import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { AuthBrandPanel } from '../features/auth/components/AuthBrandPanel'
import { AuthForm } from '../features/auth/components/AuthForm'
import { AuthModeSwitch } from '../features/auth/components/AuthModeSwitch'
import { initialAuthForm } from '../features/auth/types'
import type { AuthFormValues, AuthMode } from '../features/auth/types'
import './AuthPage.css'

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [form, setForm] = useState<AuthFormValues>(initialAuthForm)
  const [message, setMessage] = useState('')

  const title = mode === 'login' ? 'Welcome back' : 'Create your account'
  const submitText = mode === 'login' ? 'Sign in' : 'Create account'

  const helperText = useMemo(() => {
    return mode === 'login'
      ? 'Continue from your last game.'
      : 'Start collecting points across Russian, Estonian, and English.'
  }, [mode])

  function updateField(field: keyof AuthFormValues, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
    setMessage('')
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode)
    setForm(initialAuthForm)
    setMessage('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

      if (form.password !== form.confirmPassword) {
        setMessage('Passwords must match.')
        return
      }
    }

    setMessage(mode === 'login' ? 'Welcome back.' : 'Account form is ready.')
  }

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-label="Authentication">
        <AuthBrandPanel />

        <section className="auth-panel" aria-labelledby="auth-title">
          <AuthModeSwitch mode={mode} onChange={switchMode} />

          <div className="auth-heading">
            <p className="auth-kicker">Language games</p>
            <h2 id="auth-title">{title}</h2>
            <p>{helperText}</p>
          </div>

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
