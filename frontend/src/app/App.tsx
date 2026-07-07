import { MantineProvider } from '@mantine/core'
import { AuthPage } from '../pages/AuthPage'
import { theme } from './theme'

function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthPage />
    </MantineProvider>
  )
}

export default App
