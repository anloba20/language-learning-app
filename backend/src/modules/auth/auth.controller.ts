import type { Request, Response } from 'express';
import { getUserProfile, registerUser, validateLoginCredentials } from './auth.service';
import { registerSchema } from './auth.schema';
import { InvalidCredentialsError, UserAlreadyExistsError, UserNotFoundError } from './auth.errors';

export const loginController = async (req:Request, res: Response) => {
    try {
        const token = await validateLoginCredentials(req.body);
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

export const profileController = async (req:Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userProfile = await getUserProfile(userId);
        res.status(200).json(userProfile);
    } catch (error: unknown) {
        if (error instanceof UserNotFoundError) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (error instanceof InvalidCredentialsError) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        throw error;
    }
};
