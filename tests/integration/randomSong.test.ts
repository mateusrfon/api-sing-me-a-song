import { any, number, string } from "joi";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";

import * as songFactorie from "./factories/songFactorie";

beforeEach(async () => {
    await connection.query("DELETE FROM songs");
  });
  
  afterAll(() => {
    connection.end();
  });

describe("POST /recommendations/random", () => {
    it("should return status 404 for no songs registered", async () => {
        const response = await supertest(app).get("/recommendations/random");
        expect(response.status).toBe(404);
    });

    it("should return a song object for songs available", async () => {
      await songFactorie.create();
      const response = await supertest(app).get("/recommendations/random");
      
      expect(response.body).toEqual(expect.objectContaining({ 
        id: expect.any(Number), 
        name: expect.any(String), 
        youtubeLink: expect.any(String), 
        score: expect.any(Number)
      }));
    });
})