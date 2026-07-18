import { SegmentedControl } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import type { AuthMode } from '../types'

type AuthModeSwitchProps = {
  mode: AuthMode
  onChange: (mode: AuthMode) => void
}

export function AuthModeSwitch({ mode, onChange }: AuthModeSwitchProps) {
  const { t } = useTranslation()

  return (
    <SegmentedControl
      aria-label={t('auth.modes.ariaLabel')}
      className="mode-switch"
      classNames={{
        control: 'mode-switch-control',
        indicator: 'mode-switch-indicator',
        label: 'mode-switch-label',
      }}
      fullWidth
      radius="sm"
      size="sm"
      value={mode}
      onChange={(value) => onChange(value as AuthMode)}
      data={[
        { label: t('auth.modes.signIn'), value: 'login' },
        { label: t('auth.modes.register'), value: 'register' },
      ]}
    />
  )
}