import type { AuthFormValues } from '../../features/auth/types'

const API_BASE_URL = 'http://localhost:3000'

async function getErrorMessage(response: Response, fallbackMessage: string) {
  try {
    const data = await response.json()
    return data.message || fallbackMessage
  } catch {
    return fallbackMessage
  }
}

function saveToken(data: { token?: string; accessToken?: string }) {
  const token = data.token ?? data.accessToken

  if (token) {
    sessionStorage.setItem('token', token)
  }
}

export const registerUser = async (form: AuthFormValues): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Registration failed'))
  }

  const data = await response.json()
  saveToken(data)
}

export const loginUser = async (form: AuthFormValues): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Login failed'))
  }

  const data = await response.json()
  saveToken(data)
}