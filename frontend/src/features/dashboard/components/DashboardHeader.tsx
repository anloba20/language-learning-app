import { Link, useLocation } from 'react-router-dom'
import catLogo from '../../../assets/cat-logo.png'
import './DashboardHeader.css'

const navLinks = [
  { label: 'Games', to: '#games' },
  { label: 'Progress', to: '#progress' },
  { label: 'Profile', to: '#profile' },
  { label: 'Logout', to: '#logout', isLogout: true },
]

type DashboardHeaderProps = {
  onLogout: () => void
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  const location = useLocation()
  const activeHash = location.hash || '#games'

  return (
    <nav className="dashboard-navbar" aria-label="Dashboard navigation">
      <div className="dashboard-brand">
        <span className="dashboard-brand-mark">
          <img className="dashboard-brand-logo" src={catLogo} alt="Language Games cat logo" />
        </span>
        <div>
          <p className="dashboard-brand-title">Language Games</p>
          <p className="dashboard-brand-subtitle">Learn by playing</p>
        </div>
      </div>

      <div className="dashboard-nav-links" aria-label="Main sections">
        {navLinks.map((link) => {
          const isActive = activeHash === link.to

          return (
            <Link
              aria-current={isActive ? 'page' : undefined}
              className={isActive ? 'dashboard-nav-link dashboard-nav-link-active' : 'dashboard-nav-link'}
              key={link.label}
              to={link.to}
              onClick={(event) => {
                if (link.isLogout) {
                  event.preventDefault()
                  onLogout()
                }
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}