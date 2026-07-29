import { getUserProfile } from "../auth/auth.service";
import { getVocabulary } from "./vocabulary.database";
import { LanguagesNotFound } from "./vocabulary.errors";

export const fetchVocabulary = async (topicSlug: string, level: number, userId: string) => {
    try {
        const {native_language_id: nativeLanguageId, foreign_language_id: foreignLanguageId} = await getUserProfile(userId);
        if (!nativeLanguageId || !foreignLanguageId) {
          throw new LanguagesNotFound();
        }
        const vocabulary = await getVocabulary({
            topicSlug,
            level,
            nativeLanguageId,
            foreignLanguageId,
        });
        return vocabulary;
    } catch (error: unknown) {
        if (error instanceof LanguagesNotFound) {
            throw error;
        }
        throw error;
    }
};
