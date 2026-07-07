import { jwtSecret } from "../../config/auth";
import { AuthTokenPayload } from "./auth.types";
import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: AuthTokenPayload): string => {
    return jwt.sign(payload, jwtSecret as string, { expiresIn: '1h' });
}
