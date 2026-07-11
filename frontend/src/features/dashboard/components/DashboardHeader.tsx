import { Button } from '@mantine/core'
import './DashboardHeader.css'

type DashboardHeaderProps = {
  onLogout: () => void
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <nav className="dashboard-navbar" aria-label="Dashboard navigation">
      <div className="dashboard-brand">
        <span className="dashboard-brand-mark">LG</span>
        <div>
          <p className="dashboard-brand-title">Language Games</p>
          <p className="dashboard-brand-subtitle">Learn by playing</p>
        </div>
      </div>

      <div className="dashboard-nav-links" aria-label="Main sections">
        <a className="dashboard-nav-link dashboard-nav-link-active" href="#games">
          Games
        </a>
        <a className="dashboard-nav-link" href="#progress">
          Progress
        </a>
        <a className="dashboard-nav-link" href="#profile">
          Profile
        </a>
      </div>

      <Button classNames={{ root: 'dashboard-logout' }} onClick={onLogout}>
        Logout
      </Button>
    </nav>
  )
}