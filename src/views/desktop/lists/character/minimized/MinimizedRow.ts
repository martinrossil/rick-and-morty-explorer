import { DisplayContainer, HorizontalLayout, ILabelElement, Cursor, IDisplayContainer } from 'enta';
import Factory from '../../../../shared/Factory';
import { CharacterSchema } from '../../../../../graphql/schema/CharacterSchema';
import Chip from '../../../../shared/Chip';
import ProfileBlock from './ProfileBlock';

export default class MinimizedRow extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'MinimizedRow';
        this.percentWidth = 100;
        this.height = 72;
        this.paddingX = 16;
        this.cursor = Cursor.POINTER;
        this.layout = new HorizontalLayout(32, 'left', 'middle');
        this.addElements([this.profile, this.gender, this.location, this.species, this.status, this.episodesContainer]);
    }

    private _character: CharacterSchema | null = null;
    public set character(value: CharacterSchema | null) {
        if (this._character === value) {
            return;
        }
        this._character = value;
        if (value) {
            this.profile.character = value;
            this.gender.text = value.gender;
            this.status.text = value.status;
            this.species.text = value.species;
            this.location.text = value.location.name;
            this.episodes.text = value.episode.length.toString();
        }
    }

    public get character(): CharacterSchema | null {
        return this._character;
    }

    private _episodesContainer!: IDisplayContainer;
    private get episodesContainer(): IDisplayContainer {
        if (!this._episodesContainer) {
            this._episodesContainer = new DisplayContainer();
            this._episodesContainer.size(70, 72);
            this.episodes.right = 0;
            this.episodes.verticalMiddle = 0;
            this._episodesContainer.addElement(this.episodes);
        }
        return this._episodesContainer;
    }

    private profile: ProfileBlock = new ProfileBlock();
    private gender: Chip = new Chip();
    private status: Chip = new Chip();
    private species: Chip = new Chip();
    private location: ILabelElement = Factory.regularLabel(100);
    private episodes: ILabelElement = Factory.regularLabel();
}
customElements.define('minimized-row', MinimizedRow);
