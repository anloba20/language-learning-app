import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchLanguages } from '../languages.database'
import { getLanguages } from '../languages.service'
import { DatabaseError } from '../../generic/errors'

vi.mock('../languages.database', () => ({
  fetchLanguages: vi.fn(),
}))

describe('LanguagesService', () => {
  const fetchLanguagesMock = vi.mocked(fetchLanguages)

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return languages from the database', async () => {
    const languages = [
      { id: '1', name: 'English', code: 'en' },
      { id: '2', name: 'Russian', code: 'ru' },
    ]

    fetchLanguagesMock.mockResolvedValue(languages)

    const result = await getLanguages()

    expect(result).toEqual(languages)
    expect(fetchLanguagesMock).toHaveBeenCalledOnce()
  })

 it('should throw DatabaseError if database request fails', async () => {
  fetchLanguagesMock.mockRejectedValue(new Error('Database is down'))

  const result = getLanguages()

  await expect(result).rejects.toThrow(DatabaseError)
  await expect(result).rejects.toThrow('Failed to fetch languages from the database')
  expect(fetchLanguagesMock).toHaveBeenCalledOnce()
})
})
