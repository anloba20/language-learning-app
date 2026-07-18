import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { vocabularyRouter } from "../vocabulary.routes";
import express from "express";
import { createAuthHeader } from "../../test/utils";
import { fetchVocabulary } from "../vocabulary.service";

vi.mock('../vocabulary.service', () => ({
    fetchVocabulary: vi.fn(),
}));

const app = express();
app.use(express.json());
app.use("/vocabulary", vocabularyRouter);

describe('vocabularyController', () => {
    const fetchVocabularyMock = vi.mocked(fetchVocabulary);

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should return 401 if token is missing', async () => {
        const res = await request(app).get('/vocabulary/animals/level/1');

        expect(res.status).toBe(401);
        expect(fetchVocabularyMock).not.toHaveBeenCalled();
    });

    it('should return 400 if query parameters are sent', async () => {
        const res = await request(app)
            .get('/vocabulary/animals/level/1')
            .query({ limit: 10 })
            .set(createAuthHeader());

        expect(res.status).toBe(400);
        expect(fetchVocabularyMock).not.toHaveBeenCalled();
    });

    it('should return 200 and vocabulary for authorized request', async () => {
        const vocabulary = [
            {
                id: '1',
                topic_slug: 'animals',
                level: 1,
                source_text: 'кот',
                target_text: 'cat',
            },
        ];
        fetchVocabularyMock.mockResolvedValue(vocabulary);

        const res = await request(app)
            .get('/vocabulary/animals/level/1')
            .set(createAuthHeader({ userId: '1', role: 'user' }));

        expect(res.status).toBe(200);
        expect(res.body).toEqual(vocabulary);
        expect(fetchVocabularyMock).toHaveBeenCalledOnce();
        expect(fetchVocabularyMock).toHaveBeenCalledWith('animals', 1, '1');
    });
});
