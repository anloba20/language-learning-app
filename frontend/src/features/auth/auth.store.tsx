import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext, TOKEN_STORAGE_KEY } from './auth.context'
import type { AuthUserProfile } from './types'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_STORAGE_KEY))
  const [profile, setProfile] = useState<AuthUserProfile | null>(null)

  const login = useCallback((nextToken: string) => {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, nextToken)
    setToken(nextToken)
    setProfile(null)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY)
    setToken(null)
    setProfile(null)
  }, [])

  const value = useMemo(
    () => ({
      token,
      profile,
      isAuthenticated: Boolean(token),
      login,
      logout,
      setProfile,
    }),
    [login, logout, profile, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
