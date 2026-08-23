import { beforeEach, describe, expect, it, vi } from "vitest";
import { languageRouter } from "../languages.routes";
import express from "express";
import request from "supertest";
import { createAuthHeader } from "../../utils";
import { getLanguages } from "../languages.service";


vi.mock('../languages.service', () => ({
    getLanguages: vi.fn(),
}));

const app = express();
app.use(express.json());
app.use("/languages", languageRouter);

describe('languageController', () => {
    const getLanguagesMock = vi.mocked(getLanguages);

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should return 200 and languages for authorized request', async () => {
        const languages = [
            { id: '1', name: 'English', code: 'en' },
            { id: '2', name: 'Spanish', code: 'es' },
        ];
        getLanguagesMock.mockResolvedValue(languages);

        const res = await request(app).get('/languages').set(createAuthHeader({ userId: '1', role: 'user' }));

        expect(res.status).toBe(200);
        expect(res.body).toEqual(languages);
        expect(getLanguagesMock).toHaveBeenCalledOnce();
    });

    it('should return 401 if token is missing', async () => {
        const res = await request(app).get('/languages');

        expect(res.status).toBe(401);
        expect(getLanguagesMock).not.toHaveBeenCalled();
    });
});
