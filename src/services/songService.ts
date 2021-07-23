import * as songRepository from "../repositories/songRepository";

export async function existsByName(name: string) {
    const song = await songRepository.findByName(name);
    return song ? true : false;
}

export async function create(name: string, link: string) {
    await songRepository.create(name, link);
}

export async function existsById(id: number) {
    const song = await songRepository.findById(id);
    return song ? true : false;
}

export async function vote(id: number, type: string) {
    const update = type === "up" ? 1 : -1;
    const score = await songRepository.updateScore(id, update);
    return score;
}

export async function checkScore(id: number, score: number) {
    if (score < -5) {
        await songRepository.remove(id);
    }
}