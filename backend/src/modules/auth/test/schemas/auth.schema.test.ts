import { describe, expect, it } from "vitest";
import { registerSchema } from "../../auth.schema";

const validRegisterInput = {
    nickname: 'validNickname',
    password: 'validPassword123',
    confirm_password: 'validPassword123',
    email: 'nastjalo@mail.ru',
};

describe('AuthSchema', () => {
    it('should validate a valid input', () => {
        const parseResult = registerSchema.safeParse(validRegisterInput);
        expect(parseResult.success).toBe(true);
        expect(parseResult.data).toEqual(validRegisterInput);
    });

    it('should return an error for invalid nickname', () => {
        const input = {
            ...validRegisterInput,
            nickname: 'ab',
        };

        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    path: ['nickname'],
                    message: 'Nickname must be at least 3 characters long',
                }),
            ]),
        );
    });

    it('should return an error for invalid password', () => {
        const input = {
            ...validRegisterInput,
            password: 'short',
            confirm_password: 'short',
        };

        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    path: ['password'],
                    message: 'Password must be at least 12 characters long',
                }),
            ]),
        );
    });

    it('should return an error if passwords do not match', () => {
        const input = {
            ...validRegisterInput,
            confirm_password: 'anotherPassword123',
        };

        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    path: ['confirm_password'],
                    message: 'Passwords must match',
                }),
            ]),
        );
    });

    it('should return an error for invalid email', () => {
        const input = {
            ...validRegisterInput,
            email: 'invalid-email',
        };

        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    path: ['email'],
                    message: 'Invalid email address',
                }),
            ]),
        );
    });

    it('should return an error for missing email field', () => {
        const { email: _email, ...input } = validRegisterInput;

        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ path: ['email'] }),
            ]),
        );
    });

    it('should return an error for extra fields', () => {
        const input = {
            ...validRegisterInput,
            role: 'admin',
        };

        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ message: 'Unrecognized key: "role"' }),
            ]),
        );
    });

    it('should return an error if nickname is too long', () => {
        const input = {
            ...validRegisterInput,
            nickname: 'thisNicknameIsWayTooLong',
        };

        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(false);
        expect(parseResult.error?.issues).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    path: ['nickname'],
                    message: 'Nickname must be at most 15 characters long',
                }),
            ]),
        );
    });

    it('should return success if nickname is exactly 15 characters long', () => {
        const input = {
            ...validRegisterInput,
            nickname: 'exactly15chars5',
        };

        const parseResult = registerSchema.safeParse(input);
        expect(parseResult.success).toBe(true);
    });
});
