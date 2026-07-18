import { Request, Response } from 'express';
import { emptyQuerySchema, vocabularyParamsSchema } from './vocabulary.schema';
import { fetchVocabulary } from './vocabulary.service';

export const vocabularyController = async (req: Request, res: Response) => {
    const queryResult = emptyQuerySchema.safeParse(req.query);
    if (!queryResult.success) {
        return res.status(400).json({
            message: 'Query parameters are not allowed',
        });
    }

    const paramsResult = vocabularyParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
        return res.status(400).json({
            message: 'Invalid route parameters',
        });
    }

    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    const { slug: topicSlug, level } = paramsResult.data;
    const { userId } = req.user;
    const vocabulary = await fetchVocabulary(topicSlug, level, userId);
    return res.status(200).json(vocabulary);
};