import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import de from './locales/de.json'
import en from './locales/en.json'
import et from './locales/et.json'
import no from './locales/no.json'
import ru from './locales/ru.json'

export const UI_LANGUAGE_STORAGE_KEY = 'ui-language'

export const uiLanguages = [
  { code: 'ru', labelKey: 'languages.codes.ru' },
  { code: 'et', labelKey: 'languages.codes.et' },
  { code: 'en', labelKey: 'languages.codes.en' },
  { code: 'de', labelKey: 'languages.codes.de' },
  { code: 'no', labelKey: 'languages.codes.no' },
] as const

export const fallbackUiLanguage = 'en';
export const savedLanguage = localStorage.getItem(UI_LANGUAGE_STORAGE_KEY)

export function changeUiLanguage(language: string) {
  localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, language)
  i18n.changeLanguage(language)
}


i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    et: { translation: et },
    no: { translation: no },
    ru: { translation: ru },
  },
  lng: savedLanguage ?? 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n