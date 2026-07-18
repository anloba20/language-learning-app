import request from "supertest";
import { describe, expect, it } from "vitest";
import { vocabularyRouter } from "../vocabulary.routes";
import express from "express";

const app = express();
app.use(express.json());
app.use("/vocabulary", vocabularyRouter);

describe.only('vocabularyController', () => {
    it('should return 200 and a message', async () => {
        const res = await request(app).get('/vocabulary/animals/level/1');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: 'Vocabulary controller is working!' });
    });

    it('should return filtered vocabulary items based on query parameters', async () => {
        const res = await request(app).get('/vocabulary/animals/level/1').query({ part_of_speech: 'noun' });
        expect(res.status).toBe(200);
        // Add more assertions based on the expected response structure
    });
});