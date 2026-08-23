import { createContext } from 'react'
import type { Language } from './languages.types'

export type LanguagesContextValue = {
  languages: Language[]
  isLoading: boolean
  error: string | null
}

export const LanguagesContext = createContext<LanguagesContextValue | null>(null)
