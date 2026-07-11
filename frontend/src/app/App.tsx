import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useAuth } from '../features/auth/auth.hooks'
import { AuthProvider } from '../features/auth/auth.store'
import { AuthPage } from '../pages/AuthPage'
import { DashboardPage } from '../pages/DashboardPage'
import { theme } from './theme'

function AppContent() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <DashboardPage /> : <AuthPage />
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
