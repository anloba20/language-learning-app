import type { Request, Response } from 'express';

export const loginController = (req:Request, res: Response) => {
    res.send('Login endpoint');
};

export const registerController = (req:Request, res: Response) => {
    res.send('Register endpoint');
};

export const profileController = (req:Request, res: Response) => {
    res.send('Profile endpoint');
};  
