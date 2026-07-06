import { db } from "../../db/database";
import { RegisteredUserDbType, RegisterUserInput } from "./auth.types";

export const createUser = async ({ nickname, password_hash, email }: RegisterUserInput): Promise<RegisteredUserDbType> => {
        const [{id, role}] =  await db('users').insert({
            nickname,
            password_hash,
            email: email.trim().toLowerCase(),
        }).returning(['id', 'role']);
    return { id, nickname, email, role };
}
