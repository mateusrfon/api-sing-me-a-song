import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";

import * as songFactorie from "./factories/songFactorie";

beforeEach(async () => {
  await connection.query("DELETE FROM musics");
});

afterAll(() => {
  connection.end();
})

describe("POST /recommendations/:id/upvote", () => {
    it("should return status 404 for invalid song id", async () => {
        const response = await supertest(app).post("/recommendations/1/upvote");
        expect(response.status).toBe(404);
    });

    it("should return status 200 for valid id and add 1 to the score", async () => {
        const id = await songFactorie.create();

        const response = await supertest(app).post(`/recommendations/${id}/upvote`);
        expect(response.status).toBe(200);

        const requestScore = await connection.query(`
        SELECT score FROM musics WHERE id = $1
        `, [id]);
        expect(requestScore.rows[0]?.score).toBe(1);
    });
});

describe("POST /recommendations/:id/downvote", () => {
    it("should return status 404 for invalid song id", async () => {
        const response = await supertest(app).post("/recommendations/1/downvote");
        expect(response.status).toBe(404);
    });

    it("should return status 200 for valid id and remove 1 from the score", async () => {
        const id = await songFactorie.create();

        const response = await supertest(app).post(`/recommendations/${id}/downvote`);
        expect(response.status).toBe(200);

        const requestScore = await connection.query(`
        SELECT score FROM musics WHERE id = $1
        `, [id]);
        expect(requestScore.rows[0]?.score).toBe(-1);
    });

    it("should return status 200 and delete if score equals -5 on request", async () => {
        const { name, youtubeLink } = songFactorie.body(true);
        const newSong = await connection.query(`
        INSERT INTO musics (name, "youtubeLink", score) VALUES ($1, $2, -5) RETURNING id
        `, [name, youtubeLink]);
        const id = newSong.rows[0]?.id;

        const response = await supertest(app).post(`/recommendations/${id}/downvote`);
        expect(response.status).toBe(200);

        const request = await connection.query(`
        SELECT * FROM musics WHERE id = $1
        `, [id]);
        expect(request.rows[0]).toBe(undefined);
    })
});