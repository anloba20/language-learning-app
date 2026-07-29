import express from 'express';

import { authMiddleware } from '../auth/auth.middleware';
import { languageController } from './languages.controller';

export const languageRouter = express.Router();

languageRouter.get('/', authMiddleware, languageController);
