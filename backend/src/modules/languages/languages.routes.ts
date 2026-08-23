import express from 'express';

import { languageController } from './languages.controller';

export const languageRouter = express.Router();

languageRouter.get('/', languageController);
