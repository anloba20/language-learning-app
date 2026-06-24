import express from 'express';
import { loginController, profileController, registerController } from './auth.controller';

export const authRouter = express.Router();

authRouter.post('/login', loginController); 

authRouter.post('/register', registerController);     

authRouter.get('/profile', profileController);
