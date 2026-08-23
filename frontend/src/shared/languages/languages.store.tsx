import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { LanguagesContext } from './languages.context'
import type { Language } from './lanaguages.types'
import { fetchLanguages } from '../api/languages'

type LanguagesProviderProps = {
  children: ReactNode
}

export function LanguagesProvider({ children }: LanguagesProviderProps) {
  const [languages, setLanguages] = useState<Language[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadLanguages() {
      try {
        const loadedLanguages = await fetchLanguages()
        setLanguages(loadedLanguages)
      } catch {
        setError('Failed to load languages')
      } finally {
        setIsLoading(false)
      }
    }

    void loadLanguages()
  }, [])

  const value = useMemo(
    () => ({
      languages,
      isLoading,
      error,
    }),
    [languages, isLoading, error],
  )

  return (
    <LanguagesContext.Provider value={value}>
      {children}
    </LanguagesContext.Provider>
  )
}