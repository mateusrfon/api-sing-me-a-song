import connection from "../database";

export async function findByName(name: string) {
    try {
        const request = await connection.query(`
        SELECT * FROM songs WHERE name = $1
        `, [name]);
    
        return request.rows[0];
    } catch(err) {
        console.log(err);
    }
}

export async function create(name: string, link: string) {
    try {
        await connection.query(`
        INSERT INTO songs (name, "youtubeLink") VALUES ($1,$2)
        `, [name, link]);
    } catch(err) {
        console.log(err);
    }
}

export async function findById(id: number) {
    try {
        const request = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);
        return request.rows[0];
    } catch(err) {
        console.log(err);
    }
}

export async function updateScore(id: number, update: number) {
    try {
        const request = await connection.query(`
        UPDATE songs SET score = score + $1 WHERE id = $2 RETURNING score`
        , [update, id]);
        return request.rows[0].score;
    } catch(err) {
        console.log(err);
    }
}

export async function remove(id: number) {
    try {
        await connection.query(`DELETE FROM songs WHERE id = $1`, [id]);
    } catch(err) {
        console.log(err);
    }
}

export async function getByScoreDesc(limit: number) {
    try {
        let query = "SELECT * FROM songs ORDER BY score DESC";
        if (limit > 0) query = query + ` LIMIT ${limit}`;
    
        const request = await connection.query(query);
        return request.rows;
    } catch(err) {
        console.log(err);
    }
}