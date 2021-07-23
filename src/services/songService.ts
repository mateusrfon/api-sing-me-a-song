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

export async function validateScore(id: number, score: number) {
    if (score < -5) {
        await songRepository.remove(id);
    }
}

export async function getRandom() {
    const songs = await songRepository.getByScoreDesc(0);
    if (songs.length === 0) return null;

    let filteredSongs;

    if (Math.random() >= 0.3) {
        const highScore = songs.filter(item => item.score > 10);
        filteredSongs = highScore;
    } else {
        const lowScore = songs.filter(item => item.score <= 10);
        filteredSongs = lowScore;
    }

    let song;

    if (filteredSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredSongs.length);
        song = filteredSongs[randomIndex];
    } else {
        const randomIndex = Math.floor(Math.random() * songs.length);
        song = songs[randomIndex];
    }

    return song;
}

export async function getTop(limit: number) {
    const songs = await songRepository.getByScoreDesc(limit);
    return songs;
}