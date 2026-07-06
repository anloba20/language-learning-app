import { RegisterInput } from "./auth.schema";

export type UserRole = 'user' | 'admin';

export type AuthTokenPayload = {
    userId: string;
    role: UserRole;
};

export type RegisteredUserDbType = Omit<RegisterInput, 'password'> & { id: string; role: UserRole };
export type RegisterUserInput = Omit<RegisterInput, 'password'> & { password_hash: string };
export interface RegisteredUser {
    user: RegisteredUserDbType;
    token: string;
}
export type UserCredentials = RegisteredUserDbType & {
    password_hash: string;
};