import { DisplayContainer, HorizontalLayout, IDisplayContainer, ILabelElement, ItemRenderer } from 'enta';
import Factory from '../../shared/Factory';
import { EpisodeSchema } from '../../../graphql/schema/EpisodeSchema';
import Colors from '../../../theme/Colors';

export default class MobileEpisodesRow extends ItemRenderer<EpisodeSchema> {
    public constructor() {
        super();
        this.name = 'MobileEpisodesRow';
        this.percentWidth = 100;
        this.height = 24;
        this.clip = 'hidden';
        this.paddingX = 16;
        this.layout = new HorizontalLayout(16, 'left', 'middle');
        this.nameLabel.fontSize = 14;
        this.nameLabel.textColor = Colors.BLUE_GRAY_700;
        this.addElements([this.season, this.nameLabel, this.episode]);
    }

    private _season!: IDisplayContainer;
    private get season(): IDisplayContainer {
        if (!this._season) {
            this._season = new DisplayContainer();
            this._season.height = 14;
            this._season.width = 28;
            this._season.cornerSize = 7;
            this._season.addElement(this.seasonLabel);
            this.seasonLabel.fontSize = 10;
            this.seasonLabel.horizontalCenter = 0;
            this.seasonLabel.verticalMiddle = 0;
            this.seasonLabel.textColor = Colors.BLUE_GRAY_700;
            this._season.backgroundColor = Colors.BLUE_GRAY_200;
        }
        return this._season;
    }

    private _episode!: IDisplayContainer;
    private get episode(): IDisplayContainer {
        if (!this._episode) {
            this._episode = new DisplayContainer();
            this._episode.height = 14;
            this._episode.width = 28;
            this._episode.cornerSize = 7;
            this._episode.backgroundColor = Colors.BLUE_GRAY_200;
            this.episodeLabel.fontSize = 10;
            this.episodeLabel.horizontalCenter = 0;
            this.episodeLabel.verticalMiddle = 0;
            this.episodeLabel.textColor = Colors.BLUE_GRAY_700;
            this._episode.addElement(this.episodeLabel);
        }
        return this._episode;
    }

    private episodeLabel: ILabelElement = Factory.boldLabel();
    private seasonLabel: ILabelElement = Factory.boldLabel();

    protected dataChanged(): void {
        if (this.data) {
            this.nameLabel.text = this.data.name;
            this.seasonLabel.text = this.data.episode.substr(0, 3);
            this.episodeLabel.text = this.data.episode.substr(3);
        }
    }

    private nameLabel: ILabelElement = Factory.boldLabel(100);
}
customElements.define('mobile-episodes-row', MobileEpisodesRow);
