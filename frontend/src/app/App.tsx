import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { AuthPage } from '../pages/AuthPage'
import { theme } from './theme'

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="bottom-right" zIndex={1000} />
      <AuthPage />
    </MantineProvider>
  )
}

export default App