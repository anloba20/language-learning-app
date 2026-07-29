import { db } from "../../db/database";

import type { VocabularyParams } from './vocabulary.types';

export const getVocabulary = async ({ topicSlug, level, nativeLanguageId, foreignLanguageId }: VocabularyParams) => {
  return db.raw(`
    SELECT
  v.id,
  v.topic_slug,
  v.level,
  v.translations ->> native_language.code AS source_text,
  v.translations ->> foreign_language.code AS target_text
FROM vocabulary AS v, languages AS native_language, languages AS foreign_language
WHERE native_language.id = :nativeLanguageId
  AND foreign_language.id = :foreignLanguageId
  AND v.topic_slug = :topicSlug
  AND v.level = :level
  AND v.translations ->> native_language.code IS NOT NULL
  AND v.translations ->> foreign_language.code IS NOT NULL
ORDER BY random()
LIMIT 5
   `, { nativeLanguageId, foreignLanguageId, topicSlug, level });
};
