import type { AuthMode } from '../types'

type AuthModeSwitchProps = {
  mode: AuthMode
  onChange: (mode: AuthMode) => void
}

export function AuthModeSwitch({ mode, onChange }: AuthModeSwitchProps) {
  return (
    <div className="mode-switch" aria-label="Authentication mode">
      <button
        type="button"
        className={mode === 'login' ? 'active' : ''}
        onClick={() => onChange('login')}
      >
        Sign in
      </button>
      <button
        type="button"
        className={mode === 'register' ? 'active' : ''}
        onClick={() => onChange('register')}
      >
        Register
      </button>
    </div>
  )
}
