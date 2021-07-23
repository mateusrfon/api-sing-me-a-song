import { Request, Response } from "express";
import * as genreService from "../services/genreService";
import { genreSchema } from "./schemas";

export async function add(req: Request, res: Response) {
    try {
        const genre = req.body;
        const validation = genreSchema.validate(genre);
        if (validation.error) return res.sendStatus(400);

        const exists = await genreService.existsByName(genre.name);
        if (exists) return res.sendStatus(409);

        await genreService.create(genre.name);
        res.sendStatus(201);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}