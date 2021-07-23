import { Request, Response } from "express";
import Joi from "joi";

import connection from "../database"; //temp

const songSchema = Joi.object({
    name: Joi.string().required(),
    youtubeLink: Joi.string()
});

export async function add(req: Request, res: Response) {
    const song = req.body;
    const songValidation = songSchema.validate(song);
    if (songValidation.error) return res.sendStatus(400);

    //repositories
    await connection.query(`
    INSERT INTO musics (name, "youtubeLink") VALUES ($1,$2)
    `, [song.name, song.youtubeLink]);
    
    res.sendStatus(201);
};