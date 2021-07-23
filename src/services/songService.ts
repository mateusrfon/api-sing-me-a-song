import * as songRepository from "../repositories/songRepository";

export async function existsByName(name: string) {
    try {
        const song = await songRepository.findByName(name);
        return song ? true : false;
    } catch(err) {
        console.log(err);
    }
}

export async function create(name: string, link: string) {
    try {
        await songRepository.create(name, link);
    } catch(err) {
        console.log(err);
    }
}

export async function existsById(id: number) {
    try {
        const song = await songRepository.findById(id);
        return song ? true : false;
    } catch(err) {
        console.log(err);
    }
}

export async function vote(id: number, type: string) {
    try {
        const update = type === "up" ? 1 : -1;
        const score = await songRepository.updateScore(id, update);
        return score;
    } catch(err) {
        console.log(err);
    }
}

export async function validateScore(id: number, score: number) {
    try {
        if (score < -5) {
            await songRepository.remove(id);
        }
    } catch(err) {
        console.log(err);
    }
}

export async function getRandom() {
    try {
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
    } catch(err) {
        console.log(err);
    }
}

export async function getTop(limit: number) {
    try {
        const songs = await songRepository.getByScoreDesc(limit);
        return songs;
    } catch(err) {
        console.log(err);
    }
}