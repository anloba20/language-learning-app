import { useContext } from 'react'
import { LanguagesContext } from './languages.context'

export function useLanguages() {
  const context = useContext(LanguagesContext)

  if (!context) {
    throw new Error('useLanguages must be used within LanguagesProvider')
  }

  return context
}