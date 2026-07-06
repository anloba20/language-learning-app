import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import express from 'express';
import { registerUser } from "../../auth.service";
import { registerController } from "../../auth.controller";
import { RegisteredUser } from "../../auth.types";
import { UserAlreadyExistsError } from "../../auth.errors";

vi.mock('../../auth.service', () => ({
    registerUser: vi.fn(),
    generateAccessToken: vi.fn(),
}));

const registerUserMock = vi.mocked(registerUser);

const app = express();
app.use(express.json());
app.post('/auth/register', registerController);


describe('AuthController', () => {

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