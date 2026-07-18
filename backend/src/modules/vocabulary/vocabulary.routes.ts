import express from 'express';

import { authMiddleware } from '../auth/auth.middleware';
import { vocabularyController } from './vocabulary.controller';

export const vocabularyRouter = express.Router();

vocabularyRouter.get('/:topic_slug/level/:level', authMiddleware, vocabularyController);