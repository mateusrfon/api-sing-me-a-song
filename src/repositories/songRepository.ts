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

export async function findById(id: number) {
    const request = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);
    return request.rows[0];
}

export async function updateScore(id: number, update: number) {
    const request = await connection.query(`
    UPDATE songs SET score = score + $1 WHERE id = $2 RETURNING score`
    , [update, id]);
    return request.rows[0].score;
}

export async function remove(id: number) {
    await connection.query(`DELETE FROM songs WHERE id = $1`, [id]);
}