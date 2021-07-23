import { Request, Response } from "express";
import { connect } from "http2";
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
    const request = await connection.query(`
    SELECT * FROM songs WHERE name = $1
    `, [song.name]);

    if (request.rows.length > 0) return res.sendStatus(409);

    await connection.query(`
    INSERT INTO songs (name, "youtubeLink") VALUES ($1,$2)
    `, [song.name, song.youtubeLink]);
    
    res.sendStatus(201);
};

export async function getRandom(req: Request, res: Response) {
    const request = await connection.query(`SELECT * FROM songs ORDER BY score DESC`);
    const songs = request.rows;
    if (songs.length === 0) return res.sendStatus(404);

    let filteredSongs;

    if (Math.random() >= 0.3) {
        const highScore = songs.filter(item => item.score > 10);
        filteredSongs = highScore;
    } else {
        const lowScore = songs.filter(item => item.score <= 10);
        filteredSongs = lowScore;
    }

    if (filteredSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredSongs.length);
        res.send(filteredSongs[randomIndex]);
    } else {
        const randomIndex = Math.floor(Math.random() * songs.length);
        res.send(songs[randomIndex]);
    }
}