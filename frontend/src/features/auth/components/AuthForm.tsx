import { Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { AuthFormValues, AuthMode } from '../types'

type AuthFormProps = {
  mode: AuthMode
  form: AuthFormValues
  submitText: string
  onFieldChange: (field: keyof AuthFormValues, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function AuthForm({
  mode,
  form,
  submitText,
  onFieldChange,
  onSubmit,
}: AuthFormProps) {
  const { t } = useTranslation()

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <Stack gap={16}>
        <TextInput
          label={t('auth.form.nickname')}
          autoComplete="username"
          value={form.nickname}
          required
          classNames={{ input: 'auth-input', label: 'auth-label' }}
          onChange={(event) => onFieldChange('nickname', event.target.value)}
        />

        {mode === 'register' && (
          <TextInput
            label={t('auth.form.email')}
            type="email"
            autoComplete="email"
            required
            value={form.email ?? ''}
            classNames={{ input: 'auth-input', label: 'auth-label' }}
            onChange={(event) => onFieldChange('email', event.target.value)}
          />
        )}

        <PasswordInput
          label={t('auth.form.password')}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          value={form.password}
          required
          classNames={{ input: 'auth-input', label: 'auth-label', innerInput: 'auth-password-input' }}
          onChange={(event) => onFieldChange('password', event.target.value)}
        />

        {mode === 'register' && (
          <PasswordInput
            label={t('auth.form.confirmPassword')}
            autoComplete="new-password"
            required
            value={form.confirm_password ?? ''}
            classNames={{ input: 'auth-input', label: 'auth-label', innerInput: 'auth-password-input' }}
            onChange={(event) => onFieldChange('confirm_password', event.target.value)}
          />
        )}

        <Button classNames={{ root: 'submit-button' }} type="submit" fullWidth size="md">
          {submitText}
        </Button>
      </Stack>
    </form>
  )
}