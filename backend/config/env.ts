import dotenv from 'dotenv';
dotenv.config();



const requireEnv = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
};

export const jwtSecret = requireEnv('JWT_SECRET');
export const DB_HOST = requireEnv('DB_HOST');
export const DB_USER = requireEnv('DB_USER');
export const DB_PASSWORD = requireEnv('DB_PASSWORD');
export const DB_NAME = requireEnv('DB_NAME');