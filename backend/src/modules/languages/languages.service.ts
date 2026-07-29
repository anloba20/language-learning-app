import { DatabaseError } from "../generic/errors";
import { fetchLanguages } from "./languages.database";

export const getLanguages = async () => {
    try {
        const languages = await fetchLanguages();
        return languages;
    } catch {
       throw new DatabaseError('Failed to fetch languages from the database');
    }
};
