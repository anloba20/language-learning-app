export type UserRole = 'user' | 'admin';

export type AuthTokenPayload = {
    userId: string;
    role: UserRole;
};
