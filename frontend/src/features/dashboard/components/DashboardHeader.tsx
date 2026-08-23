import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import catLogo from '../../../assets/cat-logo.png'
import './DashboardHeader.css'
import { useLanguages } from '../../../shared/languages/languages.hooks'
import { useAuth } from '../../auth/auth.hooks'
import { getLanguageById, getLanguageCodeLabelKey } from '../../../shared/languages/languages.utils'

const navLinks = [
  { labelKey: 'navigation.games', to: '#games' },
  { labelKey: 'navigation.progress', to: '#progress' },
  { labelKey: 'navigation.profile', to: '#profile' },
  { labelKey: 'navigation.logout', to: '#logout', isLogout: true },
]

type DashboardHeaderProps = {
  onLanguageSettingsOpen: () => void
  onLogout: () => void
}

export function DashboardHeader({ onLanguageSettingsOpen, onLogout }: DashboardHeaderProps) {
  const location = useLocation()
  const { t } = useTranslation()
  const { profile } = useAuth()
  const { languages } = useLanguages()
  const activeHash = location.hash || '#games'
  const nativeLanguage = getLanguageById(languages, String(profile?.native_language_id))
  const learningLanguage = getLanguageById(languages, String(profile?.foreign_language_id))
  const languagePairLabel =
    nativeLanguage && learningLanguage
      ? `${t(getLanguageCodeLabelKey(nativeLanguage))} -> ${t(getLanguageCodeLabelKey(learningLanguage))}`
      : t('dashboard.languageModal.title')

  return (
    <nav className="dashboard-navbar" aria-label={t('navigation.ariaLabel')}>
      <div className="dashboard-brand">
        <span className="dashboard-brand-mark">
          <img className="dashboard-brand-logo" src={catLogo} alt={t('app.catLogoAlt')} />
        </span>
        <div>
          <p className="dashboard-brand-title">{t('app.name')}</p>
          <p className="dashboard-brand-subtitle">{t('app.tagline')}</p>
        </div>
      </div>

      <div className="dashboard-nav-area">
        <button
          type="button"
          className="dashboard-language-trigger"
          onClick={onLanguageSettingsOpen}
        >
          {languagePairLabel}
        </button>

        <div className="dashboard-nav-links" aria-label={t('navigation.mainSectionsAriaLabel')}>
          {navLinks.map((link) => {
            const isActive = !link.isLogout && activeHash === link.to

            return (
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? 'dashboard-nav-link dashboard-nav-link-active' : 'dashboard-nav-link'}
                key={link.labelKey}
                to={link.to}
                onClick={(event) => {
                  if (link.isLogout) {
                    event.preventDefault()
                    onLogout()
                  }
                }}
              >
                {t(link.labelKey)}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
