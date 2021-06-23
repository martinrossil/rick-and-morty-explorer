import { List, VerticalLayout } from 'enta';
import { EpisodeSchema } from '../../../graphql/schema/EpisodeSchema';
import Shadows from '../../../theme/Shadows';
import MobileEpisodesRow from './MobileEpisodesRow';

export default class MobileEpisodesList extends List<EpisodeSchema> {
    public constructor() {
        super();
        this.name = 'MobileEpisodesList';
        this.percentWidth = 100;
        this.height = 160;
        this.ItemRendererClass = MobileEpisodesRow;
        this.cornerSize = 8;
        this.paddingY = 8;
        this.layout = new VerticalLayout(4);
        this.addFilter(Shadows.INNER_SHADOW_3);
        this.addFilter(Shadows.INNER_SHADOW_4);
    }
}
customElements.define('mobile-episodes-list', MobileEpisodesList);
