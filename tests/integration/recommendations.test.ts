import supertest from "supertest";
import app from "../../src/app";

import connection from "../../src/database";

describe("POST /recommendations", () => {
  it("should answer with status 200 and add song for valid params", async () => {
    const newSong = {
        name: "Teste Song",
        link: "https://www.youtube.com/watch?v=4vUtXdXmnRE&ab_channel=BASSBOOSTEDSONGS"
    }

    const response = await supertest(app).post("/recommendations").send(newSong);
    expect(response.status).toBe(201);

    const songs = await connection.query("SELECT * FROM musics");
    const song = songs.rows[0]
    expect(song.name).toBe(newSong.name);
  });
});