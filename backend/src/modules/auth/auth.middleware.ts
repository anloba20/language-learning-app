import type { Request, Response, NextFunction } from 'express';
import type { AuthTokenPayload } from './auth.types';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config/auth';
import { authErrorCodes } from './auth.errors';

const unauthorizedResponse = {
    code: authErrorCodes.unauthorized,
    message: 'Unauthorized',
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json(unauthorizedResponse);
    }
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json(unauthorizedResponse);
    }
    try {
        const token = authHeader.split(' ')[1];
        const {role, userId}: AuthTokenPayload = jwt.verify(token, jwtSecret as string) as AuthTokenPayload;
        req.user = { userId, role };
        next();
    } catch {
        return res.status(401).json(unauthorizedResponse);
    }
}
