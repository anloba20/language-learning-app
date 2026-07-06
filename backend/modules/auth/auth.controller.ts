import type { Request, Response } from 'express';
import { registerUser, validateLoginCredentials } from './auth.service';
import { loginSchema, registerSchema } from './auth.schema';
import { InvalidCredentialsError, UserAlreadyExistsError } from './auth.errors';

export const loginController = async (req:Request, res: Response) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.issues });
        }
        const token = await validateLoginCredentials(result.data);
        res.json({ token });
    } catch (error: unknown) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(401).json({ message: 'Invalid nickname or password' });
        }
        throw error;
    }
};

export const registerController = async (req:Request, res: Response) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.issues });
        }   
        const createdUser = await registerUser(result.data);
        res.status(201).json(createdUser);
    } catch (error: unknown) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).json({ message: 'Nickname or email already exists' });
        }
        throw error;
    }
};

export const profileController = (req:Request, res: Response) => {
    res.send('Profile endpoint');
};  
