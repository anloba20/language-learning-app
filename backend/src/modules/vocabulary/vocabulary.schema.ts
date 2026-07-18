import { z } from 'zod';

export const vocabularyParamsSchema = z.object({
  slug: z.string().min(1),
  level: z.coerce.number().int().min(1).max(6),
});

export const emptyQuerySchema = z.object({}).strict();

export type VocabularyParams = z.infer<typeof vocabularyParamsSchema>;