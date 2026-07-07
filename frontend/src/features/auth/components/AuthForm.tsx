import type { FormEvent } from 'react'
import type { AuthFormValues, AuthMode } from '../types'

type AuthFormProps = {
  mode: AuthMode
  form: AuthFormValues
  message: string
  submitText: string
  onFieldChange: (field: keyof AuthFormValues, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function AuthForm({
  mode,
  form,
  message,
  submitText,
  onFieldChange,
  onSubmit,
}: AuthFormProps) {
  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      {mode === 'register' && (
        <label>
          <span>Name</span>
          <input
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => onFieldChange('name', event.target.value)}
          />
        </label>
      )}

      <label>
        <span>Email</span>
        <input
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => onFieldChange('email', event.target.value)}
        />
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          value={form.password}
          onChange={(event) => onFieldChange('password', event.target.value)}
        />
      </label>

      {mode === 'register' && (
        <label>
          <span>Confirm password</span>
          <input
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(event) => onFieldChange('confirmPassword', event.target.value)}
          />
        </label>
      )}

      {message && <p className="form-message">{message}</p>}

      <button className="submit-button" type="submit">
        {submitText}
      </button>
    </form>
  )
}
