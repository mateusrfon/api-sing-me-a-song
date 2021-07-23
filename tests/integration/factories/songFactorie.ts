import connection from "../../../src/database";
import faker from "faker";

export function body(valid: boolean) {
    const name = faker.random.word();
    if (valid) {
        return {
            name,
            youtubeLink: "https://www.youtube.com/watch?v=4vUtXdXmnRE&ab_channel=BASSBOOSTEDSONGS"
        }
    } else {
        return {
            name: "",
            youtubeLink: 1
        }
    }
}

export async function create() {
    const name = faker.random.word();
    const request = await connection.query(`
    INSERT INTO songs (name, "youtubeLink") VALUES ($1,$2) RETURNING id
    `, [name, "http://youtube.com/teste"]);
    return request.rows[0].id;
}