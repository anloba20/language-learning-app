import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import express from 'express';
import { registerUser, validateLoginCredentials } from "../../auth.service";
import { loginController, registerController } from "../../auth.controller";
import type { RegisteredUser } from "../../auth.types";
import { InvalidCredentialsError, UserAlreadyExistsError } from "../../auth.errors";
import type { LoginInput } from "../../auth.schema";

vi.mock('../../auth.service', () => ({
    registerUser: vi.fn(),
    validateLoginCredentials: vi.fn(),
    generateAccessToken: vi.fn(),
}));


const app = express();
app.use(express.json());
app.post('/auth/login', loginController);
app.post('/auth/register', registerController);


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
});
