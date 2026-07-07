import { Alert, Button, PasswordInput, Stack, TextInput } from '@mantine/core'
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
      <Stack gap="md">
        <TextInput
          label="Nickname"
          autoComplete="username"
          value={form.nickname}
          classNames={{ input: 'auth-input', label: 'auth-label' }}
          onChange={(event) => onFieldChange('nickname', event.target.value)}
        />

        {mode === 'register' && (
          <TextInput
            label="Email"
            type="email"
            autoComplete="email"
            value={form.email}
            classNames={{ input: 'auth-input', label: 'auth-label' }}
            onChange={(event) => onFieldChange('email', event.target.value)}
          />
        )}

        <PasswordInput
          label="Password"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          value={form.password}
          classNames={{ input: 'auth-input', label: 'auth-label', innerInput: 'auth-password-input' }}
          onChange={(event) => onFieldChange('password', event.target.value)}
        />

        {mode === 'register' && (
          <PasswordInput
            label="Confirm password"
            autoComplete="new-password"
            value={form.confirmPassword}
            classNames={{ input: 'auth-input', label: 'auth-label', innerInput: 'auth-password-input' }}
            onChange={(event) => onFieldChange('confirmPassword', event.target.value)}
          />
        )}

        {message && (
          <Alert className="form-message" radius="md">
            {message}
          </Alert>
        )}

        <Button className="submit-button" type="submit" fullWidth size="md">
          {submitText}
        </Button>
      </Stack>
    </form>
  )
}
