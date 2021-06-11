import { DisplayContainer, DisplayElement, IArrayCollection, IDisplayElement, IList, List, VerticalLayout } from 'enta';
import Factory from '../../shared/Factory';
import { EpisodeSchema } from '../../../graphql/schema/EpisodeSchema';
import MobileEpisodesRow from './MobileEpisodesRow';

export default class MobileEpisodesList extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'MobileEpisodesList';
        this.percentWidth = 100;
        this.height = 160;
        this.addElements([this.shadowBox, this.list]);
    }

    public set dataProvider(value: IArrayCollection<EpisodeSchema> | null) {
        this.list.dataProvider = value;
    }

    public get dataProvider(): IArrayCollection<EpisodeSchema> | null {
        return this.list.dataProvider;
    }

    private shadowBox: IDisplayElement = Factory.shadowBox();

    private _list!: IList<EpisodeSchema>;

    private get list(): IList<EpisodeSchema> {
        if (!this._list) {
            this._list = new List();
            this._list.height = 160;
            this._list.percentWidth = 100;
            this._list.ItemRendererClass = MobileEpisodesRow;
            this._list.cornerSize = 8;
            this._list.paddingY = 8;
            this._list.layout = new VerticalLayout(4);
        }
        return this._list;
    }
}
customElements.define('mobile-episodes-list', MobileEpisodesList);
