import connection from "../database";

export async function create(name: string) {
    try {
        await connection.query(`
        INSERT INTO genres (name) VALUES ($1)
        `, [name]);
    } catch(err) {
        console.error(err);
    }
}

export async function findByName(name: string) {
    try {
        const request = await connection.query(`
        SELECT * FROM genres WHERE name = $1
        `, [name]);
        
        return request.rows[0];
    } catch(err) {
        console.error(err);
    }
}