import * as songRepository from "../repositories/songRepository";

export async function exists(name: string) {
    const song = await songRepository.findByName(name);
    console.log(song);
    return song ? true : false;
}

export async function create(name: string, link: string) {
    await songRepository.create(name, link);
}