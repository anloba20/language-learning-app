import { beforeEach, describe, expect, it, vi } from "vitest";
import jwt from 'jsonwebtoken';
import {
    generateAccessToken,
    getUserProfile,
    hashPassword,
    registerUser,
    validateLoginCredentials,
} from "../../auth.service";
import type { AuthTokenPayload, RegisteredUserDbType, UserCredentials } from "../../auth.types";
import { jwtSecret } from "../../../../config/auth";
import { createUser, getUserById, getUserByNickname } from "../../auth.database";
import { InvalidCredentialsError, UserAlreadyExistsError, UserNotFoundError } from "../../auth.errors";

vi.mock('../../auth.database', () => ({
    createUser: vi.fn(),
    getUserById: vi.fn(),
    getUserByNickname: vi.fn(),
}));

const createUserMock = vi.mocked(createUser);
const getUserByIdMock = vi.mocked(getUserById);
const getUserByNicknameMock = vi.mocked(getUserByNickname);

describe('AuthService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    describe('generateAccessToken', () => {
        const payload = { userId: '123', role: 'user' as const };

        it('should generate a valid access token', () => {
            const token = generateAccessToken(payload);

            expect(token).not.toBeNull();
            expect(typeof token).toBe('string');
        });

        it('should generate a token that can be decoded to the original payload', () => {
            const token = generateAccessToken(payload);
            const decoded = jwt.verify(token, jwtSecret) as AuthTokenPayload;

            expect(decoded.userId).toBe(payload.userId);
            expect(decoded.role).toBe(payload.role);
        });
    });

    describe('registerUser', () => {
        it('should create user with hashed password, normalized email, and token', async () => {
            const input = {
                nickname: 'validNickname',
                password: 'validPassword123',
                confirm_password: 'validPassword123',
                email: 'NASTYA@MAIL.COM',
            };
            const createdUser: RegisteredUserDbType = {
                id: '1',
                nickname: input.nickname,
                email: 'nastya@mail.com',
                role: 'user',
            };

            createUserMock.mockResolvedValue(createdUser);

            const result = await registerUser(input);

            expect(createUserMock).toHaveBeenCalledOnce();
            expect(createUserMock).toHaveBeenCalledWith({
                nickname: input.nickname,
                email: 'nastya@mail.com',
                password_hash: expect.any(String),
            });
            expect(createUserMock.mock.calls[0][0].password_hash).not.toBe(input.password);
            expect(result.user).toEqual(createdUser);
            expect(typeof result.token).toBe('string');
        });

        it('should throw UserAlreadyExistsError for unique constraint violation', async () => {
            createUserMock.mockRejectedValue({ code: '23505' });

            await expect(registerUser({
                nickname: 'existingNickname',
                password: 'validPassword123',
                confirm_password: 'validPassword123',
                email: 'existing@mail.com',
            })).rejects.toBeInstanceOf(UserAlreadyExistsError);
        });
    });

    describe('validateLoginCredentials', () => {
        it('should throw InvalidCredentialsError if user does not exist', async () => {
            getUserByNicknameMock.mockResolvedValue(null);

            await expect(validateLoginCredentials({
                nickname: 'missingUser',
                password: 'validPassword123',
            })).rejects.toBeInstanceOf(InvalidCredentialsError);
        });

        it('should throw InvalidCredentialsError if password is wrong', async () => {
            const passwordHash = await hashPassword('validPassword123');
            const user: UserCredentials = {
                id: '1',
                nickname: 'validNickname',
                email: 'valid@mail.com',
                role: 'user',
                password_hash: passwordHash,
            };

            getUserByNicknameMock.mockResolvedValue(user);

            await expect(validateLoginCredentials({
                nickname: user.nickname,
                password: 'wrongPassword123',
            })).rejects.toBeInstanceOf(InvalidCredentialsError);
        });

        it('should return access token for valid credentials', async () => {
            const password = 'validPassword123';
            const user: UserCredentials = {
                id: '1',
                nickname: 'validNickname',
                email: 'valid@mail.com',
                role: 'user',
                password_hash: await hashPassword(password),
            };

            getUserByNicknameMock.mockResolvedValue(user);

            const token = await validateLoginCredentials({
                nickname: user.nickname,
                password,
            });
            const decoded = jwt.verify(token, jwtSecret) as AuthTokenPayload;

            expect(decoded.userId).toBe(user.id);
            expect(decoded.role).toBe(user.role);
        });
    });

    describe('getUserProfile', () => {
        it('should throw InvalidCredentialsError for invalid user id format', async () => {
            await expect(getUserProfile('abc')).rejects.toBeInstanceOf(InvalidCredentialsError);
            expect(getUserByIdMock).not.toHaveBeenCalled();
        });

        it('should throw UserNotFoundError for non-existing user id', async () => {
            getUserByIdMock.mockResolvedValue(null);

            await expect(getUserProfile('999999999999')).rejects.toBeInstanceOf(UserNotFoundError);
            expect(getUserByIdMock).toHaveBeenCalledWith('999999999999');
        });

        it('should return user profile for existing user id', async () => {
            const profile: RegisteredUserDbType = {
                id: '1',
                nickname: 'validNickname',
                email: 'valid@mail.com',
                role: 'user',
            };

            getUserByIdMock.mockResolvedValue(profile);

            await expect(getUserProfile(profile.id)).resolves.toEqual(profile);
            expect(getUserByIdMock).toHaveBeenCalledWith(profile.id);
        });
    });
});
