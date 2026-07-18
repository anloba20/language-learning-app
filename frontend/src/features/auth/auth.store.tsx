import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext, TOKEN_STORAGE_KEY } from './auth.context'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_STORAGE_KEY))

  const login = useCallback((nextToken: string) => {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, nextToken)
    setToken(nextToken)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY)
    setToken(null)
  }, [])

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [login, logout, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}