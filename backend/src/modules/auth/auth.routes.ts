import express from 'express';
import { loginController, profileController, registerController } from './auth.controller';
import { authMiddleware } from './auth.middleware';

export const authRouter = express.Router();

authRouter.post('/login', loginController);

authRouter.post('/register', registerController);

authRouter.get('/profile', authMiddleware, profileController);
