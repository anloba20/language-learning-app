import express from 'express';

export const vocabularyRouter = express.Router();

import { vocabularyController } from './vocabulary.controller';

vocabularyRouter.get('/:topic_slug/level/:level', vocabularyController);