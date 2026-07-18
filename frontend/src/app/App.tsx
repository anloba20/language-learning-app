import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../features/auth/auth.hooks'
import { AuthProvider } from '../features/auth/auth.store'
import { AuthPage } from '../pages/auth/AuthPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { WordMatchPage } from '../pages/WordMatchPage'
import { theme } from './theme'

function AppContent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/games/word-match" element={<WordMatchPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="bottom-right" zIndex={1000} />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </MantineProvider>
  )
}

export default App