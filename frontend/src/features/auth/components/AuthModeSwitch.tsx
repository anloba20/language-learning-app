import { SegmentedControl } from '@mantine/core'
import type { AuthMode } from '../types'

type AuthModeSwitchProps = {
  mode: AuthMode
  onChange: (mode: AuthMode) => void
}

export function AuthModeSwitch({ mode, onChange }: AuthModeSwitchProps) {
  return (
    <SegmentedControl
      aria-label="Authentication mode"
      className="mode-switch"
      fullWidth
      radius="md"
      size="md"
      value={mode}
      onChange={(value) => onChange(value as AuthMode)}
      data={[
        { label: 'Sign in', value: 'login' },
        { label: 'Register', value: 'register' },
      ]}
    />
  )
}
