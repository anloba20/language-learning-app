import { getUserProfile } from "../auth/auth.service";
import { getVocabulary } from "./vocabulary.database";
import { LanguagesNotFound } from "./vocabulary.errors";

export const fetchVocabulary = async (topicSlug: string, level: number, userId: string) => {
    try {
        const {native_language_id, foreign_language_id} = await getUserProfile(userId);
        if (!native_language_id || !foreign_language_id) {
          throw new LanguagesNotFound();
        }
        const vocabulary = await getVocabulary(topicSlug, level, {nativeLanguageId: native_language_id, foreignLanguageId: foreign_language_id});
        return vocabulary;
    } catch (error: unknown) {
        if (error instanceof LanguagesNotFound) {
            throw error;
        }
        throw error;
    }
};