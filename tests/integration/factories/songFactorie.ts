import connection from "../../../src/database";

export function body(valid: boolean) {
    if (valid) {
        return {
            name: "Teste Song",
            youtubeLink: "https://www.youtube.com/watch?v=4vUtXdXmnRE&ab_channel=BASSBOOSTEDSONGS"
        }
    } else {
        return {
            name: "Teste Song",
            youtubeLink: 1
        }
    }
}

export async function create() {
    const request = await connection.query(`
    INSERT INTO songs (name, "youtubeLink") VALUES ($1,$2) RETURNING id
    `, ["Teste Song", "http://youtube.com/teste"]);
    return request.rows[0].id;
}