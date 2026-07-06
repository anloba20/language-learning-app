import type { Request, Response } from 'express';
import { generateAccessToken } from './auth.service';
import { createUser } from './auth.database';

export const loginController = (req:Request, res: Response) => {
    // some code here to validate user credentials and generate a token
    const {userId, role} = req.body;
    const token = generateAccessToken({ userId, role });
    res.json({ token });
};

export const registerController = async (req:Request, res: Response) => {
    const { username, password } = req.body;
    // some code here to create a new user in the database
    await createUser(username, password);
    res.send('Register endpoint');
};

export const profileController = (req:Request, res: Response) => {
    res.send('Profile endpoint');
};  
