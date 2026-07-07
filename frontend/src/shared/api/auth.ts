import type { AuthFormValues } from '../../features/auth/types'

export const registerUser = async (form: AuthFormValues): Promise<void> => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Registration failed')
  }
}
