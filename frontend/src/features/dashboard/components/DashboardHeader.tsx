import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import catLogo from '../../../assets/cat-logo.png'
import './DashboardHeader.css'

const navLinks = [
  { labelKey: 'navigation.games', to: '#games' },
  { labelKey: 'navigation.progress', to: '#progress' },
  { labelKey: 'navigation.profile', to: '#profile' },
  { labelKey: 'navigation.logout', to: '#logout', isLogout: true },
]

type DashboardHeaderProps = {
  onLogout: () => void
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  const location = useLocation()
  const { t } = useTranslation()
  const activeHash = location.hash || '#games'

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
    </nav>
  )
}