import { beforeEach, describe, expect, it, vi } from "vitest";
import { getVocabulary } from "../vocabulary.database";
import { getUserProfile } from "../../auth/auth.service";
import { fetchVocabulary } from "../vocabulary.service";
import { LanguagesNotFound } from "../vocabulary.errors";

vi.mock('../../auth/auth.service', () => ({
  getUserProfile: vi.fn(),
}));

vi.mock('../vocabulary.database', () => ({
  getVocabulary: vi.fn(),
}));

describe('VocabularyService', () => {
    const getUserProfileMock = vi.mocked(getUserProfile);
    const getVocabularyMock = vi.mocked(getVocabulary);

    beforeEach(() => {
        vi.resetAllMocks();
    });
    describe('fetchVocabulary', () => {
        it('should fetch user native and foreign language IDs', async () => {
             const vocabulary = [
        {
          id: '1',
          topic_slug: 'animals',
          level: 1,
          source_text: 'кот',
          target_text: 'cat',
        },
      ];

      getUserProfileMock.mockResolvedValue({
        id: '1',
        nickname: 'nastya',
        email: 'nastya@mail.com',
        role: 'user',
        native_language_id: 2,
        foreign_language_id: 1,
      })
        getVocabularyMock.mockResolvedValue(vocabulary);

      await expect(fetchVocabulary('animals', 1, '1')).resolves.toEqual(vocabulary);

      expect(getUserProfileMock).toHaveBeenCalledWith('1');
      expect(getVocabularyMock).toHaveBeenCalledWith({
        topicSlug: 'animals',
        level: 1,
        nativeLanguageId: 2,
        foreignLanguageId: 1,
      });

    })
    it('should throw LanguagesNotFound error if user has no native or foreign language', async () => {
      getUserProfileMock.mockResolvedValue({
        id: '1',
        nickname: 'nastya',
        email: 'nastya@mail.ru',
        role: 'user',
        native_language_id: null,
        foreign_language_id: null,
      });
      await expect(fetchVocabulary('animals', 1, '1')).rejects.toBeInstanceOf(LanguagesNotFound);
      expect(getVocabularyMock).not.toHaveBeenCalled();
    });
    });
});