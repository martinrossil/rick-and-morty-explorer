import { IDisplayContainer, DisplayContainer, ILabelElement, VerticalLayout, HorizontalLayout } from 'enta';
import Factory from '../../../../shared/Factory';
import { CharacterSchema } from '../../../../../graphql/schema/CharacterSchema';
import Chip from '../../../../shared/Chip';
import Colors from '../../../../../theme/Colors';
export default class MaxCharacterDetails extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'MaxCharacterDetails';
        this.percentHeight = 100;
        this.layout = new VerticalLayout(32, 'left', 'middle');
        this.location.textColor = Colors.BLUE_GRAY_500;
        this.addElements([this.nameLabel, this.location, this.horizontalContainer]);
    }

    private _character: CharacterSchema | null = null;
    public set character(value: CharacterSchema | null) {
        if (this._character === value) {
            return;
        }
        this._character = value;
        if (value) {
            this.nameLabel.text = value.name;
            this.location.text = value.location.name;
            this.gender.text = value.gender;
            this.status.text = value.status;
            this.species.text = value.species;
        }
    }

    public get character(): CharacterSchema | null {
        return this._character;
    }

    private _horizontalContainer!: IDisplayContainer;
    private get horizontalContainer(): IDisplayContainer {
        if (!this._horizontalContainer) {
            this._horizontalContainer = new DisplayContainer();
            this._horizontalContainer.height = 20;
            this._horizontalContainer.layout = new HorizontalLayout(16);
            this._horizontalContainer.addElements([this.gender, this.status, this.species]);
        }
        return this._horizontalContainer;
    }

    private nameLabel: ILabelElement = Factory.boldLabel(NaN, NaN, Colors.BLUE_GRAY_700);
    private location: ILabelElement = Factory.regularLabel();
    private gender: Chip = new Chip();
    private status: Chip = new Chip();
    private species: Chip = new Chip();
}
customElements.define('max-character-details', MaxCharacterDetails);
