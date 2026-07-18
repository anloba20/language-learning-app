import { db } from "../../db/database";

export const getVocabulary = async (topicSlug: string, level: number, {nativeLanguageId, foreignLanguageId}: {nativeLanguageId: number, foreignLanguageId: number}) => {
  return db.raw(`
    SELECT
  vocabulary.id,
  vocabulary.topic_slug,
  vocabulary.level,
  vocabulary.translations ->> native_language.code AS source_text,
  vocabulary.translations ->> foreign_language.code AS target_text
FROM vocabulary, languages AS native_language, languages AS foreign_language
WHERE native_language.id = ?
  AND foreign_language.id = ?
  AND vocabulary.topic_slug = ?
  AND vocabulary.level = ?
  AND vocabulary.translations ->> native_language.code IS NOT NULL
  AND vocabulary.translations ->> foreign_language.code IS NOT NULL
ORDER BY random()
LIMIT 5
   `, [nativeLanguageId, foreignLanguageId, topicSlug, level]);
};