import { Request, Response } from "express";

import connection from "../database"; //temp

export async function add(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const request = await connection.query(`SELECT * FROM musics WHERE id = $1`, [id]);
    const song = request.rows[0];
    if (!song) return res.sendStatus(404);

    await connection.query(`UPDATE musics SET score = score + 1 WHERE id = $1`, [id]);

    res.sendStatus(200);
};

export async function remove(req: Request, res: Response) {

}