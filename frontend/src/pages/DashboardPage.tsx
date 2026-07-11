import { useAuth } from '../features/auth/auth.hooks'
import { DashboardHeader } from '../features/dashboard/components/DashboardHeader'
import { DashboardLanguageModal } from '../features/dashboard/components/DashboardLanguageModal'
import { GameCategoriesMenu } from '../features/dashboard/components/GameCategoriesMenu'
import './DashboardPage.css'

export function DashboardPage() {
  const { logout } = useAuth()

  return (
    <main className="dashboard-page">
      <DashboardLanguageModal />

      <div className="dashboard-shell">
        <DashboardHeader onLogout={logout} />
        <GameCategoriesMenu />
      </div>
    </main>
  )
}