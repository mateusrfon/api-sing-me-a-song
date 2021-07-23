import connection from "../database";

export async function findByName(name: string) {
    const request = await connection.query(`
    SELECT * FROM songs WHERE name = $1
    `, [name]);

    return request.rows[0];
}

export async function create(name: string, link: string) {
    await connection.query(`
    INSERT INTO songs (name, "youtubeLink") VALUES ($1,$2)
    `, [name, link]);
}