import { EpisodeSchema } from './EpisodeSchema';

export type CharacterSchema = {
    id: number;
    name: string;
    gender: string;
    status: string;
    species: string;
    location: {
        name: string;
    }
    episode: Array<EpisodeSchema>
}
