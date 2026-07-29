import { db } from "../../db/database";
import type { RegisteredUserDbType, RegisterUserInput, UserCredentials, UserProfileCredentials } from "./auth.types";
import type { UpdateProfileInput } from "./auth.schema";

export const createUser = async ({ nickname, password_hash, email }: RegisterUserInput): Promise<RegisteredUserDbType> => {
    const [{id, role}] =  await db('users').insert({
        nickname,
        password_hash,
        email,
    }).returning(['id', 'role']);
    return { id, nickname, email, role };
}

export const getUserByNickname = async (nickname: string): Promise<UserCredentials | null> => {
    const user = await db('users')
        .select('id', 'nickname', 'email', 'role', 'password_hash')
        .where('nickname', nickname)
        .first();
    return user || null;
}

export const getUserById = async (id: string): Promise<UserProfileCredentials | null> => {
    const user = await db('users')
        .select('id', 'nickname', 'email', 'role', 'native_language_id', 'foreign_language_id')
        .where({id})
        .first();
    return user || null;
}

export const updateUser = async (id: string, userData: UpdateProfileInput): Promise<UserProfileCredentials> => {
    const [user] = await db('users')
        .where({ id })
        .update({...userData, updated_at: db.fn.now()})
        .returning(['id', 'nickname', 'email', 'role', 'native_language_id', 'foreign_language_id']);
    return user;
};
