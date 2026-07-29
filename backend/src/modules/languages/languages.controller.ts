
import { DatabaseError } from "../generic/errors";
import type { Request, Response } from "express";
import { getLanguages } from "./languages.service";

export const languageController = async (_: Request, res: Response) => {
    try {
        const languages = await getLanguages();
        return res.status(200).json(languages);
    } catch (error: unknown) {
        throw error;
    }
};
