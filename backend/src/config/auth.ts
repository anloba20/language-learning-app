import { requireEnv } from "./env";

export const jwtSecret = requireEnv('JWT_SECRET');
