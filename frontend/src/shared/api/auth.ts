import i18n from '../i18n'
import type { AuthFormValues } from '../../features/auth/types'

const API_BASE_URL = 'http://localhost:3000'

const authErrorTranslationKeys: Record<string, string> = {
  AUTH_INVALID_CREDENTIALS: 'auth.serverErrors.invalidCredentials',
  AUTH_USER_ALREADY_EXISTS: 'auth.serverErrors.userAlreadyExists',
  AUTH_VALIDATION_FAILED: 'auth.serverErrors.validationFailed',
  AUTH_UNAUTHORIZED: 'auth.serverErrors.unauthorized',
  AUTH_USER_NOT_FOUND: 'auth.serverErrors.userNotFound',
}

type AuthResponse = {
  token?: string
}

type AuthErrorResponse = {
  code?: string
  message?: string
}

function getTranslatedErrorMessage(code?: string) {
  if (!code) {
    return null
  }

  const translationKey = authErrorTranslationKeys[code]
  return translationKey ? i18n.t(translationKey) : null
}

async function getErrorMessage(response: Response, fallbackMessage: string) {
  try {
    const data = (await response.json()) as AuthErrorResponse
    return getTranslatedErrorMessage(data.code) || data.message || fallbackMessage
  } catch {
    return fallbackMessage
  }
}

function getToken(data: AuthResponse) {
  const token = data.token

  if (!token) {
    throw new Error(i18n.t('auth.errors.tokenMissing'))
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
    throw new Error(await getErrorMessage(response, i18n.t('auth.errors.registrationFailed')))
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
    throw new Error(await getErrorMessage(response, i18n.t('auth.errors.loginFailed')))
  }

  const data = await response.json()
  return getToken(data)
}