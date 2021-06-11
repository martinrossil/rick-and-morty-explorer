import { CharacterSchema } from './CharacterSchema';
import { InfoSchema } from './InfoSchema';

export type CharacterPageSchema = {
    data: {
        characters: {
            info: InfoSchema,
            results: Array<CharacterSchema>
        }
    },
    errors: Array<{
        message: string
    }>
}
