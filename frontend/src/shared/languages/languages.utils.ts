import type { Language } from './languages.types'

export function getLanguageLabelKey(language: Pick<Language, 'code'>) {
  return `languages.names.${language.code}`
}

export function getLanguageCodeLabelKey(language: Pick<Language, 'code'>) {
  return `languages.codes.${language.code}`
}

export function getLanguageById(languages: Language[], id: string): Language | undefined {
  return languages.find((language) => language.id === id)
}
