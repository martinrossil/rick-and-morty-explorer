import { ItemRenderer, ILabelElement, HorizontalLayout } from 'enta';
import Factory from '../../../shared/Factory';
import { EpisodeSchema } from '../../../../graphql/schema/EpisodeSchema';
import Colors from '../../../../theme/Colors';

export default class EpisodesRow extends ItemRenderer<EpisodeSchema> {
    public constructor() {
        super();
        this.name = 'CharacterListRow';
        this.percentWidth = 100;
        this.height = 36;
        this.paddingLeft = 16;
        this.paddingRight = 20;
        this.clip = 'hidden';
        this.layout = new HorizontalLayout(16, 'left', 'middle');
        this.addElements([this.nameLabel, this.season, this.episode]);
    }

    protected dataChanged(): void {
        if (this.data) {
            this.nameLabel.text = this.data.name;
            this.season.text = 'Season ' + parseInt(this.data.episode.substr(1, 2));
            this.episode.text = 'Episode ' + parseInt(this.data.episode.substr(4));
        }
    }

    private nameLabel: ILabelElement = Factory.boldLabel(100, NaN, Colors.BLUE_GRAY_700);
    private season: ILabelElement = Factory.regularLabel(NaN, 100, 'left');
    private episode: ILabelElement = Factory.regularLabel(NaN, 74, 'left');
}
customElements.define('episodes-row', EpisodesRow);
