import { z } from 'zod';

const cefrLevelToNumber = {
  a1: 1,
  a2: 2,
  b1: 3,
  b2: 4,
  c1: 5,
  c2: 6,
} as const;

const cefrLevelSchema = z
  .string()
  .transform((level) => level.toLowerCase())
  .pipe(z.enum(['a1', 'a2', 'b1', 'b2', 'c1', 'c2']))
  .transform((level) => cefrLevelToNumber[level]);

export const vocabularyParamsSchema = z.object({
  slug: z.string().min(1),
  level: cefrLevelSchema,
});

export const emptyQuerySchema = z.object({}).strict();

export type VocabularyParams = z.infer<typeof vocabularyParamsSchema>;