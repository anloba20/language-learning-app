import type { Language } from '../languages/languages.types'
import { API_BASE_URL } from './constants'

export const fetchLanguages = async (): Promise<Language[]> => {
  const response = await fetch(`${API_BASE_URL}/languages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch languages')
  }
  return response.json()
}
