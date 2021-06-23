import { List, VerticalLayout, ArrayCollection } from 'enta';
import { EpisodeSchema } from '../../../../graphql/schema/EpisodeSchema';
import Colors from '../../../../theme/Colors';
import Shadows from '../../../../theme/Shadows';
import EpisodesRow from './EpisodesRow';

export default class EpisodesList extends List<EpisodeSchema> {
    public constructor() {
        super();
        this.name = 'EpisodesList';
        this.percentWidth = 100;
        this.clip = 'hidden';
        this.height = 200;
        this.backgroundColor = Colors.WHITE;
        this.cornerSize = 8;
        this.ItemRendererClass = EpisodesRow;
        this.paddingY = 4;
        this.layout = new VerticalLayout();
        this.addFilter(Shadows.INNER_SHADOW_3);
        this.addFilter(Shadows.INNER_SHADOW_4);
    }

    private _episodes: Array<EpisodeSchema> | null = null;
    public set episodes(value: Array<EpisodeSchema> | null) {
        if (this._episodes === value) {
            return;
        }
        this._episodes = value;
        if (value) {
            this.dataProvider = new ArrayCollection(value);
        }
    }

    public get episodes(): Array<EpisodeSchema> | null {
        return this._episodes;
    }
}
customElements.define('episodes-list', EpisodesList);
