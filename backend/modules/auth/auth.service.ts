import * as argon2 from "argon2";
import { jwtSecret } from "../../config/auth";
import { AuthTokenPayload, RegisteredUser } from "./auth.types";
import jwt from 'jsonwebtoken';
import { createUser } from "./auth.database";
import { RegisterInput } from "./auth.schema";
import { UserAlreadyExistsError } from "./auth.errors";

export const generateAccessToken = (payload: AuthTokenPayload): string => {
    return jwt.sign(payload, jwtSecret as string, { expiresIn: '1h' });
}

export const hashPassword = async (password: string): Promise<string> => {
    return argon2.hash(password,  {
    type: argon2.argon2id,
});
}

export const registerUser = async ({ nickname, password, email }: RegisterInput): Promise<RegisteredUser> => {
    try {
        const passwordHash = await hashPassword(password);
        const {id, role} = await createUser({ nickname, password_hash: passwordHash, email });
        const token = generateAccessToken({ userId: id, role });
        return { "user": { id, nickname, email, role }, token };
    } catch (error: any) {
        if (error?.code === '23505') {
            throw new UserAlreadyExistsError();
        }
        throw error;
    }
}
