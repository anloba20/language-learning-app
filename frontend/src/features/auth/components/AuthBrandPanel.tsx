import { useTranslation } from 'react-i18next'

export function AuthBrandPanel() {
  const { t } = useTranslation()

  return <section className="brand-panel" aria-label={t('app.brandAriaLabel')} />
}