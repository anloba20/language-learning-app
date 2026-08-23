import { useAuth } from '../../features/auth/auth.hooks'
import { DashboardHeader } from '../../features/dashboard/components/DashboardHeader'
import { DashboardLanguageModal } from '../../features/dashboard/components/DashboardLanguageModal'
import { GameCategoriesMenu } from '../../features/dashboard/components/GameCategoriesMenu'
import { useState } from 'react'
import './DashboardPage.css'

export function DashboardPage() {
  const { logout } = useAuth()
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)

  return (
    <main className="dashboard-page">
      <DashboardLanguageModal
        isOpenRequested={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />

      <div className="dashboard-shell">
        <DashboardHeader
          onLanguageSettingsOpen={() => setIsLanguageModalOpen(true)}
          onLogout={logout}
        />
        <GameCategoriesMenu />
      </div>
    </main>
  )
}
