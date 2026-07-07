import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import express from 'express';
import { getUserProfile, registerUser, validateLoginCredentials } from "../../auth.service";
import { loginController, profileController, registerController } from "../../auth.controller";
import type { RegisteredUser, UserProfileCredentials } from "../../auth.types";
import { InvalidCredentialsError, UserAlreadyExistsError, UserNotFoundError } from "../../auth.errors";
import type { LoginInput } from "../../auth.schema";
import { authMiddleware } from "../../auth.middleware";
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../../../../config/auth";


vi.mock('../../auth.service', () => ({
    registerUser: vi.fn(),
    validateLoginCredentials: vi.fn(),
    getUserProfile: vi.fn()
}));


const app = express();
app.use(express.json());
app.post('/auth/login', loginController);
app.post('/auth/register', registerController);
app.get('/auth/profile', authMiddleware, profileController);


describe('AuthController', () => {

    describe('registerController', () => {

        const registerUserMock = vi.mocked(registerUser);

        beforeEach(() => {
            vi.resetAllMocks();
        });

        it('should return 201 and user data for valid registration input', async () => {
            const input = {
                nickname: 'validNickname',
                password: 'validPassword123',
                confirm_password: 'validPassword123',
                email: 'nastjalo@mail.ru'
            };

            const expectedResult: RegisteredUser = {
                user: {
                    id: '1',
                    nickname: input.nickname,
                    email: input.email,
                    role: 'user',
                },
                token: 'test-token',
            };

            registerUserMock.mockResolvedValue(expectedResult);

            const res = await request(app)
                .post('/auth/register')
                .send(input);
            expect(res.status).toBe(201);
            expect(res.body).toEqual(expectedResult);

            expect(registerUserMock).toHaveBeenCalledOnce();
            expect(registerUserMock).toHaveBeenCalledWith(input);
        });

        it('should return 400 for invalid registration input', async () => {
            const input = {
                nickname: 'abc',
                password: 'short',
                email: 'invalid-email'
            };

            const res = await request(app)
                .post('/auth/register')
                .send(input);
            expect(res.status).toBe(400);
        });

        it('should return 409 if user already exists', async () => {
            const input = {
                nickname: 'existingNick',
                password: 'validPassword123',
                confirm_password: 'validPassword123',
                email: 'nastjalo@mail.ru'
            };

            registerUserMock.mockRejectedValue(new UserAlreadyExistsError());

            const res = await request(app)
                .post('/auth/register')
                .send(input);
            expect(res.status).toBe(409);
            expect(res.body).toEqual({ message: 'Nickname or email already exists' });
        });
    });

    describe('loginController', () => {

        const validateLoginCredentialsMock = vi.mocked(validateLoginCredentials);

        beforeEach(() => {
            vi.resetAllMocks();
        });

        it('should return 200 and token for valid login input', async () => {
            const input: LoginInput = {
                nickname: 'validNickname',
                password: 'validPassword123',
            };
            const expectedResult = 'test-token';
            validateLoginCredentialsMock.mockResolvedValue(expectedResult);
            const res = await request(app)
                .post('/auth/login')
                .send(input);

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ token: expectedResult });
            expect(validateLoginCredentialsMock).toHaveBeenCalledOnce();
            expect(validateLoginCredentialsMock).toHaveBeenCalledWith(input);
        });

        it('should return 400 for invalid login input', async () => {
            const input: LoginInput = {
                nickname: 'abc',
                password: 'short',
            };

            const res = await request(app)
                .post('/auth/login')
                .send(input);
            expect(res.status).toBe(400);
            expect(validateLoginCredentialsMock).not.toHaveBeenCalled();
        });

        it('should return 401 if credentials are invalid', async () => {
            const input: LoginInput = {
                nickname: 'validNickname',
                password: 'wrongPassword',
            };
            validateLoginCredentialsMock.mockRejectedValue(new InvalidCredentialsError());
            const res = await request(app)
                .post('/auth/login')
                .send(input);
            expect(res.status).toBe(401);
            expect(res.body).toEqual({ message: 'Invalid nickname or password' });
        });
    });

    describe('profileController', () => {
        const getUserProfileMock = vi.mocked(getUserProfile);

        beforeEach(() => {
            vi.resetAllMocks();
        });

        it('should return 200 and user profile for valid token', async () => {
            const expectedProfile: UserProfileCredentials = {
                id: '1',
                nickname: 'validNickname',
                email: 'validEmail@mail.com',
                role: 'user',
            };
            const token = jwt.sign(
                { userId: expectedProfile.id, role: expectedProfile.role },
                jwtSecret,
                { expiresIn: '1h' }
            );
            getUserProfileMock.mockResolvedValue(expectedProfile);

            const res = await request(app)
                .get('/auth/profile')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body).toEqual(expectedProfile);
            expect(getUserProfileMock).toHaveBeenCalledOnce();
            expect(getUserProfileMock).toHaveBeenCalledWith(expectedProfile.id);
        });

        it('should return 401 if token is missing', async () => {
            const res = await request(app)
                .get('/auth/profile');
            expect(res.status).toBe(401);
            expect(getUserProfileMock).not.toHaveBeenCalled();
        });

        it('should return 401 if token is invalid', async () => {
            const res = await request(app)
                .get('/auth/profile')
                .set('Authorization', 'Bearer invalid-token');
            expect(res.status).toBe(401);
            expect(getUserProfileMock).not.toHaveBeenCalled();
        });

        it('should return 404 if user is missing', async () => {
            const token = jwt.sign(
                { userId: '1', role: 'user' },
                jwtSecret,
                { expiresIn: '1h' }
            );
            getUserProfileMock.mockRejectedValue(new UserNotFoundError());
            const res = await request(app)
                .get('/auth/profile')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(404);
            expect(getUserProfileMock).toHaveBeenCalledOnce();
            expect(getUserProfileMock).toHaveBeenCalledWith('1');
        });
    });});
