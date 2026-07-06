import type { Request, Response } from 'express';
import { generateAccessToken, registerUser } from './auth.service';
import { registerSchema } from './auth.schema';

export const loginController = (req:Request, res: Response) => {
    const {userId, role} = req.body;
    const token = generateAccessToken({ userId, role });
    res.json({ token });
};

export const registerController = async (req:Request, res: Response) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.issues });
        }   
        const createdUser = await registerUser(result.data);
        res.status(201).json(createdUser);
    } catch (error: any) {
        if (error.name === 'UserAlreadyExistsError') {
            return res.status(409).json({ message: 'Nickname or email already exists' });
        }
        throw error;
    }
};

export const profileController = (req:Request, res: Response) => {
    res.send('Profile endpoint');
};  
