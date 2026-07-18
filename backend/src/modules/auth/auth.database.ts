import { db } from "../../db/database";
import type { RegisteredUserDbType, RegisterUserInput, UserCredentials, UserProfileCredentials } from "./auth.types";

export const createUser = async ({ nickname, password_hash, email }: RegisterUserInput): Promise<RegisteredUserDbType> => {
        const [{id, role}] =  await db('users').insert({
            nickname,
            password_hash,
            email,
        }).returning(['id', 'role']);
    return { id, nickname, email, role };
}

export const getUserByNickname = async (nickname: string): Promise<UserCredentials | null> => {
    const [user] = await db('users')
        .select('*')
        .where('nickname', nickname)
    return user || null;
}

export const getUserById = async (id: string): Promise<UserProfileCredentials | null> => {
    return db('users').select('id', 'nickname', 'email', 'role', 'native_language_id', 'foreign_language_id').where({id}).first()
}
