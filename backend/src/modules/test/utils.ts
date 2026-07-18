import jwt from 'jsonwebtoken';

import { jwtSecret } from '../../config/auth';
import type { AuthTokenPayload } from '../auth/auth.types';

export const createTestAuthToken = (
  payload: Partial<AuthTokenPayload> = {},
): string => {
  return jwt.sign(
    {
      userId: '1',
      role: 'user',
      ...payload,
    },
    jwtSecret,
    { expiresIn: '1h' },
  );
};

export const createAuthHeader = (
  payload?: Partial<AuthTokenPayload>,
): { Authorization: string } => {
  return {
    Authorization: `Bearer ${createTestAuthToken(payload)}`,
  };
};