import * as genreRepository from "../repositories/genreRepository";

export async function create(name: string) {
    try {
        await genreRepository.create(name);
    } catch(err) {
        console.error(err);
    }
}

export async function existsByName(name: string) {
    try {
        const genre = await genreRepository.findByName(name);
        
        return genre ? true : false;
    } catch(err) {
        console.error(err);
    }
}