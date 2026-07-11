import type { Request, Response } from 'express';
import { getUserProfile, registerUser, validateLoginCredentials } from './auth.service';
import { loginSchema, registerSchema } from './auth.schema';
import { authErrorCodes, InvalidCredentialsError, UserAlreadyExistsError, UserNotFoundError } from './auth.errors';

export const loginController = async (req:Request, res: Response) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                code: authErrorCodes.validationFailed,
                message: 'Invalid login data',
                errors: result.error.issues,
            });
        }
        const token = await validateLoginCredentials(result.data);
        res.json({ token });
    } catch (error: unknown) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(401).json({ code: error.code, message: error.message });
        }
        throw error;
    }
};

export const registerController = async (req:Request, res: Response) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                code: authErrorCodes.validationFailed,
                message: 'Invalid registration data',
                errors: result.error.issues,
            });
        }
        const createdUser = await registerUser(result.data);
        res.status(201).json(createdUser);
    } catch (error: unknown) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).json({ code: error.code, message: error.message });
        }
        throw error;
    }
};

export const profileController = async (req:Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ code: authErrorCodes.unauthorized, message: 'Unauthorized' });
        }
        const userProfile = await getUserProfile(userId);
        res.status(200).json(userProfile);
    } catch (error: unknown) {
        if (error instanceof UserNotFoundError) {
            return res.status(404).json({ code: error.code, message: error.message });
        }
        if (error instanceof InvalidCredentialsError) {
            return res.status(401).json({ code: authErrorCodes.unauthorized, message: 'Unauthorized' });
        }
        throw error;
    }
};
