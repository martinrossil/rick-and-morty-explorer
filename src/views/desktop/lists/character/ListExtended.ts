import { List } from 'enta'
import { CharacterSchema } from '../../../../graphql/schema/CharacterSchema';

export default class ListExtended extends List<CharacterSchema> {
    public constructor() {
        super();
        this.name = 'ListExtended';
    }
}
customElements.define('list-extended', ListExtended);
