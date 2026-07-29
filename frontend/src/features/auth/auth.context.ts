import { createContext } from 'react'
import type { AuthUserProfile } from './types'

export const TOKEN_STORAGE_KEY = 'token'

export type AuthContextValue = {
  token: string | null
  profile: AuthUserProfile | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  setProfile: (profile: AuthUserProfile | null) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
