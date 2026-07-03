import type { Request, Response, NextFunction } from 'express';
import { AuthTokenPayload } from './auth.types';
import { jwtSecret } from '../../config/env';
import jwt from 'jsonwebtoken';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    const userData = req.body;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const token = authHeader.split(' ')[1];
        const {role, userId}: AuthTokenPayload = jwt.verify(token, jwtSecret as string) as AuthTokenPayload;
        req.body = { ...userData, userId, role };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
   
}