import { describe, expect, it } from "vitest";
import jwt from 'jsonwebtoken';
import type { AuthTokenPayload } from "../../auth.types";
import { generateAccessToken } from "../../auth.service";
import { jwtSecret } from "../../../../config/auth";


describe('AuthService', () => {
    const payload = { userId: '123', role: 'user' as const };
    it('should generate a valid access token', () => {
        const token = generateAccessToken(payload);
        expect(token).not.toBeNull();
        expect(typeof token).toBe('string');
    })

    it('should generate a token that can be decoded to the original payload', () => {
        const token = generateAccessToken(payload);
        const decoded: AuthTokenPayload = jwt.verify(token, jwtSecret as string) as AuthTokenPayload;
        expect(decoded.userId).toBe(payload.userId);
        expect(decoded.role).toBe(payload.role);
    })
})
