import { jwtSecret } from "../../../utils/config/env";
import { AuthTokenPayload } from "./auth.types";
import jwt from 'jsonwebtoken';

export const generateAcсessToken = (payload: AuthTokenPayload): string => {
    return jwt.sign(payload, jwtSecret as string, { expiresIn: '1h' });
}