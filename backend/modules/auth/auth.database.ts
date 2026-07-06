import { db } from "../../db/database";
import { RegisterInput } from "./auth.schema";
import { RegisteredUser, RegisterUserInput } from "./auth.types";

export const createUser = async ({ nickname, password_hash, email }: RegisterUserInput): Promise<RegisteredUser> => {
        await db('users').insert({
            nickname,
            password_hash,
            email,
        }).returning('*');
    return { nickname, email };
}
