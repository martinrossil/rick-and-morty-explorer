import { List, VerticalLayout } from 'enta';
import { CharacterSchema } from '../../../graphql/schema/CharacterSchema';
import AppState from '../../../state/AppState';
import MobileCharacterListRow from './MobileCharacterListRow';

export default class MobileCharacterList extends List<CharacterSchema> {
    public constructor() {
        super();
        this.name = 'CharacterList';
        this.percentWidth = this.percentHeight = 100;
        this.ItemRendererClass = MobileCharacterListRow;
        this.dataProvider = AppState.characters;
        this.paddingX = 8;
        this.paddingY = 64;
        this.layout = new VerticalLayout(8);
    }
}
customElements.define('mobile-character-list', MobileCharacterList);
