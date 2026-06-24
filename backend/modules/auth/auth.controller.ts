import type { Request, Response } from 'express';
import { generateAcсessToken } from './auth.service';

export const loginController = (req:Request, res: Response) => {
    // some code here to validate user credentials and generate a token
    const token = generateAcсessToken(req.body);
    res.json({ token });
};

export const registerController = (req:Request, res: Response) => {
    res.send('Register endpoint');
};

export const profileController = (req:Request, res: Response) => {
    res.send('Profile endpoint');
};  
