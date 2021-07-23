import { Request, Response } from "express";

import * as songService from "../services/songService";
import { songSchema } from "./schemas";

export async function add(req: Request, res: Response) {
    const song = req.body;
    const songValidation = songSchema.validate(song);
    if (songValidation.error) return res.sendStatus(400);

    const exists = await songService.existsByName(song.name);
    if (exists) return res.sendStatus(409);

    await songService.create(song.name, song.link);
    res.sendStatus(201);
};

export async function upVote(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const exists = await songService.existsById(id);
    if (!exists) return res.sendStatus(404);

    await songService.vote(id, "up");

    res.sendStatus(200);
};

export async function downVote(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const exists = await songService.existsById(id);
    if (!exists) return res.sendStatus(404);

    const score = await songService.vote(id, "down");

    await songService.validateScore(id, score);

    res.sendStatus(200);
}

export async function getRandom(req: Request, res: Response) {
    const song = await songService.getRandom();
    if (song === null) return res.sendStatus(404);
    
    res.send(song);
}

export async function getTop(req: Request, res: Response) {
    const amount = parseInt(req.params.amount);

    const songs = await songService.getTop(amount);

    if (songs.length === 0) return res.sendStatus(404);

    res.send(songs);
}