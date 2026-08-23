import { db } from "../../db/database";

export const fetchLanguages = async () => {
    return db('languages').select('id', 'name', 'code').orderBy('id', 'asc');
};
