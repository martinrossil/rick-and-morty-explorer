import { characterPage } from './Queries';
import { CharacterPageSchema } from './schema/CharacterPageSchema';

export default class GraphQL {
    private static BASE_URL = 'https://rick-and-morty-api.graphcdn.app';

    private static cache: Map<string, CharacterPageSchema> = new Map();

    public static async getCharacterPage(name: string, page: number): Promise<CharacterPageSchema> {
        const cachedPage: CharacterPageSchema | undefined = GraphQL.cache.get(name + page);
        if (cachedPage) {
            return cachedPage;
        }
        const url: string = GraphQL.BASE_URL;
        try {
            const response = await fetch(url, this.characterPageRequest(name, page));
            const characterPageSchema = await response.json();
            GraphQL.cache.set(name + page, characterPageSchema);
            return characterPageSchema;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    private static characterPageRequest(name = '', page = 1): RequestInit {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: characterPage(name, page)
            })
        }
    }
}
