import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type AuthMode = 'login' | 'register'

type AuthForm = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const initialForm: AuthForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function App() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [form, setForm] = useState<AuthForm>(initialForm)
  const [message, setMessage] = useState('')

  const title = mode === 'login' ? 'Welcome back' : 'Create account'
  const submitText = mode === 'login' ? 'Sign in' : 'Create account'

  const helperText = useMemo(() => {
    return mode === 'login'
      ? 'Continue your language practice.'
      : 'Start saving points and level progress.'
  }, [mode])

  function updateField(field: keyof AuthForm, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
    setMessage('')
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode)
    setForm(initialForm)
    setMessage('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.email.trim() || !form.password.trim()) {
      setMessage('Email and password are required.')
      return
    }

    if (mode === 'register') {
      if (!form.name.trim()) {
        setMessage('Name is required.')
        return
      }

      if (form.password !== form.confirmPassword) {
        setMessage('Passwords must match.')
        return
      }
    }

    setMessage(
      mode === 'login'
        ? 'Login form is ready for backend integration.'
        : 'Registration form is ready for backend integration.',
    )
  }

  return (
    <main className="auth-page">
      <section className="brand-panel" aria-label="Language learning app">
        <p className="eyebrow">Russian / Estonian / English</p>
        <h1>Language Learning App</h1>
        <p className="brand-copy">
          A game-based place to practice languages and keep progress in one account.
        </p>
        <div className="language-strip" aria-label="Supported languages">
          <span>RU</span>
          <span>ET</span>
          <span>EN</span>
        </div>
      </section>

      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="mode-switch" aria-label="Authentication mode">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => switchMode('login')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => switchMode('register')}
          >
            Register
          </button>
        </div>

        <div className="auth-heading">
          <h2 id="auth-title">{title}</h2>
          <p>{helperText}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === 'register' && (
            <label>
              <span>Name</span>
              <input
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
              />
            </label>
          )}

          <label>
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
            />
          </label>

          {mode === 'register' && (
            <label>
              <span>Confirm password</span>
              <input
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(event) => updateField('confirmPassword', event.target.value)}
              />
            </label>
          )}

          {message && <p className="form-message">{message}</p>}

          <button className="submit-button" type="submit">
            {submitText}
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
