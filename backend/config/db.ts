import { requireEnv } from "./env";

export const DB_HOST = requireEnv('DB_HOST');
export const DB_USER = requireEnv('DB_USER');
export const DB_PASSWORD = requireEnv('DB_PASSWORD');
export const DB_NAME = requireEnv('DB_NAME');