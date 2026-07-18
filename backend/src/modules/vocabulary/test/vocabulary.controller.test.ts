import request from "supertest";
import { describe, expect, it } from "vitest";
import { vocabularyRouter } from "../vocabulary.routes";
import express from "express";
import { createAuthHeader } from "../../test/utils.test";

const app = express();
app.use(express.json());
app.use("/vocabulary", vocabularyRouter);

describe('vocabularyController', () => {

    it('should return 401 if token is missing', async () => {
        const res = await request(app).get('/vocabulary/animals/level/1');

        expect(res.status).toBe(401);
    });

    it('should return 200 and a message for authorized request', async () => {
        const res = await request(app)
            .get('/vocabulary/animals/level/1')
            .set(createAuthHeader());

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Vocabulary controller is working!' });
    });

    it('should not allow authorized request with query parameters', async () => {
        const res = await request(app)
            .get('/vocabulary/animals/level/1')
            .query({ limit: 10 })
            .set(createAuthHeader());

        expect(res.status).toBe(400);
    });
});
