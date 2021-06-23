import { DisplayContainer, HorizontalLayout } from 'enta';
import { CharacterSchema } from '../../../../../graphql/schema/CharacterSchema';
import Avatar from '../../../../shared/Avatar';
import EpisodesList from '../../episodes/EpisodesList';
import MaxCharacterDetails from './MaxCharacterDetails';

export default class MaximizedRow extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'MaximizedRow';
        this.visible = false;
        this.percentWidth = 100;
        this.height = 232;
        this.padding = 16;
        this.layout = new HorizontalLayout(16);
        this.addElements([this.avatar, this.maxCharacterDetails, this.episodesList]);
    }

    private _character: CharacterSchema | null = null;
    public set character(value: CharacterSchema | null) {
        this._character = value;
        if (value) {
            this.avatar.character = value;
            this.maxCharacterDetails.character = value;
            this.episodesList.episodes = value.episode;
        }
    }

    public get character(): CharacterSchema | null {
        return this._character;
    }

    private avatar: Avatar = new Avatar(200, 4);
    private maxCharacterDetails: MaxCharacterDetails = new MaxCharacterDetails();
    private episodesList: EpisodesList = new EpisodesList();
}
customElements.define('maximized-row', MaximizedRow);
