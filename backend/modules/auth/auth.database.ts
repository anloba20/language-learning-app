import { db } from "../../db/database";

export const createUser = async (username: string, password: string): Promise<void> => {
    await db('users').insert({ username, password });
}