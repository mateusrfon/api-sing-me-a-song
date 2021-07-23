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

describe("POST /recommendations", () => {
  it("should answer with status 200 and add song for valid params", async () => {
    const newSong = songFactorie.body(true);
    
    const response = await supertest(app).post("/recommendations").send(newSong);
    expect(response.status).toBe(201);

    const songs = await connection.query("SELECT * FROM musics");
    const song = songs.rows[0]
    expect(song?.name).toBe(newSong.name);
  });

  it("should answer with status 400 for invalid params", async () => {
    const invalidSong = songFactorie.body(false);

    const response = await supertest(app).post("/recommendations").send(invalidSong);
    expect(response.status).toBe(400);
  });
});