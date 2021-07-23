import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";

beforeEach(async () => {
    await connection.query("DELETE FROM genres");
})

afterAll(() => {
    connection.end();
})

describe("POST /genre", () => {
    it("should return status 400 for invalid name", async () => {
        const body = { name: "" };
        const response = await supertest(app).post("/genres").send(body);
        expect(response.status).toBe(400);
    });

    
});