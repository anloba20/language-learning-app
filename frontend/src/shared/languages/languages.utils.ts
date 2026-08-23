import type { Language } from './lanaguages.types'

export function getLanguageLabelKey(language: Pick<Language, 'code'>) {
  return `languages.names.${language.code}`
}

export function getLanguageCodeLabelKey(language: Pick<Language, 'code'>) {
  return `languages.codes.${language.code}`
}
