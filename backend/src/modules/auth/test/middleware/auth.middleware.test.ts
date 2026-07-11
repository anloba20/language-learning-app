import { describe, expect, it } from "vitest";
import express from 'express';
import request from "supertest";
import { authMiddleware } from "../../auth.middleware";
import { generateAccessToken } from "../../auth.service";
import { authErrorCodes } from "../../auth.errors";

describe('AuthMiddleware', () => {
  const app = express();

  app.get('/protected', authMiddleware, (req, res) => {
    res.json(req.user);
  });

  it('should return 401 if Authorization header is missing', async () => {
    const response = await request(app)
      .get('/protected');

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(authErrorCodes.unauthorized);
  });

  it('should return 401 if Authorization header does not start with Bearer', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Invalid Token');

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(authErrorCodes.unauthorized);
  });

  it('should allow request with valid Authorization header', async () => {
    const token = generateAccessToken({
      userId: 'user_1',
      role: 'user',
    });

    const response = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      userId: 'user_1',
      role: 'user',
    });
  });

  it('should return 401 if Bearer token is invalid', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalid_token');

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(authErrorCodes.unauthorized);
  });
});
