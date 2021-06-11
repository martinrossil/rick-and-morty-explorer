import { DisplayContainer, IList, List, IDisplayElement, DisplayElement, VerticalLayout, ArrayCollection } from 'enta';
import { EpisodeSchema } from '../../../../graphql/schema/EpisodeSchema';
import Theme from '../../../../theme/Theme';
import EpisodesRow from './EpisodesRow';

export default class EpisodesList extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'EpisodesList';
        this.percentWidth = 100;
        this.clip = 'hidden';
        this.height = 200;
        this.backgroundColor = Theme.WHITE;
        this.cornerSize = 8;
        this.addElements([this.list, this.shadowBox]);
    }

    private _episodes: Array<EpisodeSchema> | null = null;
    public set episodes(value: Array<EpisodeSchema> | null) {
        if (this._episodes === value) {
            return;
        }
        this._episodes = value;
        if (value) {
            this.list.dataProvider = new ArrayCollection(value);
        }
    }

    public get episodes(): Array<EpisodeSchema> | null {
        return this._episodes;
    }

    private _shadowBox!: IDisplayElement;
    private get shadowBox(): IDisplayElement {
        if (!this._shadowBox) {
            this._shadowBox = new DisplayElement();
            this.shadowBox.enabled = false;
            this._shadowBox.percentWidth = 100;
            this._shadowBox.percentHeight = 100;
            this._shadowBox.cornerSize = 8;
            this._shadowBox.addFilter(Theme.INNER_SHADOW_3);
            this._shadowBox.addFilter(Theme.INNER_SHADOW_4);
        }
        return this._shadowBox;
    }

    private _list!: IList<EpisodeSchema>;

    private get list(): IList<EpisodeSchema> {
        if (!this._list) {
            this._list = new List();
            this._list.height = 200;
            this._list.percentWidth = 100;
            this._list.ItemRendererClass = EpisodesRow;
            this._list.cornerSize = 8;
            this._list.paddingY = 4;
            this._list.layout = new VerticalLayout();
        }
        return this._list;
    }
}
customElements.define('episodes-list', EpisodesList);
