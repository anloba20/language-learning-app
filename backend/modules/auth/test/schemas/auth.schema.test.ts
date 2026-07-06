import { describe, expect, it } from "vitest";
import { registerSchema } from "../../auth.schema";

describe('AuthSchema', () => {
    it('should validate a valid input', () => {
        const input = {
            nickname: 'validNickname',
            password: 'validPassword123',
            email: 'nastjalo@mail.ru',
        };
        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(true);
        expect(parseResult.data).toEqual(input);
    });

    it('should return an error for invalid nickname', () => {
        const input = {
            nickname: 'ab',
            password: 'validPassword123',
            email: 'nastjalo@mail.ru',
        };

        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues[0].message).toBe("Nickname must be at least 3 characters long");
        expect(parseResult.error?.issues).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ path: ['nickname'] }),
        ]),
        );
    });

    it('should return an error for invalid password', () => {
        const input = {
            nickname: 'validNickname',
            password: 'short',
            email: 'nastjalo@mail.ru',
        };
        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues[0].message).toBe("Password must be at least 12 characters long");
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ path: ['password'] }),
            ]),
        );
    });

    it('should return an error for invalid email', () => {
        const input = {
            nickname: 'validNickname',
            password: 'validPassword123',
            email: 'invalid-email',
        };
          const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues[0].message).toBe("Invalid email address");
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ path: ['email'] }),
            ]),
        );
    });

    it('should return an error for missing email field', () => {
        const input = {
            nickname: 'validNickname',
            password: 'validPassword123',
        };
        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues[0].message).toBe("Invalid email address");
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ path: ['email'] }),
            ]),
        );
    });

    it('should return an error for extra fields', () => {
        const input = {
            nickname: 'validNickname',
            password: 'validPassword123',
            email: 'nastjalo@mail.ru',
            role: 'admin',
        };
        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues[0].message).toBe('Unrecognized key: "role"');
    });

    it('should return an error if nickname is too long', () => {
        const input = {
            nickname: 'thisNicknameIsWayTooLong',
            password: 'validPassword123',
            email: 'nastjalo@mail.ru',
        };
        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues[0].message).toBe("Nickname must be at most 15 characters long");
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ path: ['nickname'] }),
            ]),
        );
    });

    it('should return success if nickname is exactly 15 characters long', () => {
        const input = {
            nickname: 'exactly15chars5',
            password: 'validPassword123',
            email: 'nastjalo@mail.ru'
        };
        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(true);
    });
})
