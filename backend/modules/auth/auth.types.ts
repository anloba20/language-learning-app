import { RegisterInput } from "./auth.schema";

export type UserRole = 'user' | 'admin';

export type AuthTokenPayload = {
    userId: string;
    role: UserRole;
};

export type RegisteredUser = Omit<RegisterInput, 'password'>
export type RegisterUserInput = Omit<RegisterInput, 'password'> & { password_hash: string };