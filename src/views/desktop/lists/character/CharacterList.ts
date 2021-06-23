import { VerticalLayout, DisplayContainer, IDisplayContainer, IList, List } from 'enta';
import { CharacterSchema } from '../../../../graphql/schema/CharacterSchema'
import CharacterListRow from './CharacterListRow';
import AppState from '../../../../state/AppState';
import Theme from '../../../../theme/Theme';
import CharacterListHeader from './CharacterListHeader';
import PageNavigator from '../navigator/PageNavigator';
import Colors from '../../../../theme/Colors';

export default class CharacterList extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'CharacterList';
        this.percentWidth = this.percentHeight = 100;
        this.paddingX = 16;
        this.paddingTop = 72;
        this.paddingBottom = 16;
        this.addElements([this.container]);
    }

    private _container!: IDisplayContainer;

    private get container(): IDisplayContainer {
        if (!this._container) {
            this._container = new DisplayContainer();
            this._container.percentWidth = this._container.percentHeight = 100;
            this._container.backgroundColor = Colors.WHITE;
            this._container.cornerSize = 8;
            this._container.addFilter(Theme.BOX_SHADOW_1);
            this._container.addFilter(Theme.BOX_SHADOW_2);
            this._container.addElements([this.list, new CharacterListHeader(), new PageNavigator()]);
        }
        return this._container;
    }

    private _list!: IList<CharacterSchema>;

    private get list(): IList<CharacterSchema> {
        if (!this._list) {
            this._list = new List();
            this._list.percentWidth = this._list.percentHeight = 100;
            this._list.paddingTop = 40;
            this._list.paddingBottom = 56;
            this._list.ItemRendererClass = CharacterListRow;
            this._list.dataProvider = AppState.characters;
            this._list.layout = new VerticalLayout();
        }
        return this._list;
    }
}
customElements.define('character-list', CharacterList);
