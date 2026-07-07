import * as argon2 from "argon2";
import { jwtSecret } from "../../config/auth";
import type { AuthTokenPayload, RegisteredUser } from "./auth.types";
import jwt from 'jsonwebtoken';
import { createUser, getUserById, getUserByNickname } from "./auth.database";
import type { LoginInput, RegisterInput } from "./auth.schema";
import { InvalidCredentialsError, UserAlreadyExistsError, UserNotFoundError } from "./auth.errors";

export const generateAccessToken = (payload: AuthTokenPayload): string => {
    return jwt.sign(payload, jwtSecret as string, { expiresIn: '1h' });
}

export const hashPassword = async (password: string): Promise<string> => {
    return argon2.hash(password,  {
    type: argon2.argon2id,
});
}

const verifyPassword = async (hashedPassword: string, plainPassword: string): Promise<boolean> => {
    return argon2.verify(hashedPassword, plainPassword);
}

const formatEmail = (email: string): string => {
    return email.trim().toLowerCase();
}

const isUniqueViolationError = (error: unknown): error is { code: '23505' } => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: unknown }).code === '23505'
    );
};

const isValidBigintId = (id: string): boolean => {
  return /^\d+$/.test(id);
};


export const registerUser = async ({ nickname, password, email }: RegisterInput): Promise<RegisteredUser> => {
    try {
        const passwordHash = await hashPassword(password);
        const formattedEmail = formatEmail(email);
        const {id, role} = await createUser({ nickname, password_hash: passwordHash, email: formattedEmail });
        const token = generateAccessToken({ userId: id, role });
        return { "user": { id, nickname, email: formattedEmail, role }, token };
    } catch (error: unknown) {
        if (isUniqueViolationError(error)) {
            throw new UserAlreadyExistsError();
        }
        throw error;
    }
}

export const validateLoginCredentials = async ({nickname, password}: LoginInput): Promise<string> => {
        const user = await getUserByNickname(nickname);
        if (!user) {
            throw new InvalidCredentialsError();
        }
        const verified = await verifyPassword(user.password_hash, password);
        if (!verified) {
            throw new InvalidCredentialsError();
        }
        const token = generateAccessToken({ userId: user.id, role: user.role });
        return token;

}

export const getUserProfile = async (id: string) => {
    const userIdValidation = isValidBigintId(id);
    if (!userIdValidation) {
        throw new InvalidCredentialsError();
    }
    const user = await getUserById(id);
    if (!user) {
        throw new UserNotFoundError();
    }
    return user;
}
