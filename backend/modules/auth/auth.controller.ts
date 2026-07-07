import type { Request, Response } from 'express';
import { generateAccessToken } from './auth.service';

export const loginController = (req:Request, res: Response) => {
    // some code here to validate user credentials and generate a token
    const {userId, role} = req.body;
    const token = generateAccessToken({ userId, role });
    res.json({ token });
};

export const registerController = (req:Request, res: Response) => {
    res.send('Register endpoint');
};

export const profileController = (req:Request, res: Response) => {
    res.send('Profile endpoint');
};  
