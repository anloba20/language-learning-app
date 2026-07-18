import type { AuthFormValues } from '../../features/auth/types'

const API_BASE_URL = 'http://localhost:3000'

type AuthResponse = {
  token?: string
}

async function getErrorMessage(response: Response, fallbackMessage: string) {
  try {
    const data = await response.json()
    return data.message || fallbackMessage
  } catch {
    return fallbackMessage
  }
}

function getToken(data: AuthResponse) {
  const token = data.token;

  if (!token) {
    throw new Error('Authentication token is missing')
  }

  return token
}

export const registerUser = async (form: AuthFormValues): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })

  if (response.status !== 201) {
    throw new Error(await getErrorMessage(response, 'Registration failed'))
  }

  const data = await response.json()
  return getToken(data)
}

export const loginUser = async (form: AuthFormValues): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })

  if (response.status !== 200) {
    throw new Error(await getErrorMessage(response, 'Login failed'))
  }

  const data = await response.json()
  return getToken(data)
}