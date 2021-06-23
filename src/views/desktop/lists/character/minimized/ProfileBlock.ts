import { DisplayContainer, ILabelElement, HorizontalLayout } from 'enta';
import Factory from '../../../../shared/Factory';
import { CharacterSchema } from '../../../../../graphql/schema/CharacterSchema';
import Colors from '../../../../../theme/Colors';
import Avatar from '../../../../shared/Avatar';

export default class ProfileBlock extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'ProfileBlock';
        this.percentWidth = 100;
        this.height = 40;
        this.layout = new HorizontalLayout(16, 'left', 'middle');
        this.addElements([this.avatar, this.characterLabel]);
    }

    private _character: CharacterSchema | null = null;
    public set character(value: CharacterSchema | null) {
        if (this._character === value) {
            return;
        }
        this._character = value;
        if (value) {
            this.avatar.character = value;
            this.characterLabel.text = value.name;
        }
    }

    public get character(): CharacterSchema | null {
        return this._character;
    }

    private avatar: Avatar = new Avatar(40, 2);
    private characterLabel: ILabelElement = Factory.boldLabel(100, NaN, Colors.BLUE_GRAY_700);
}
customElements.define('profile-block', ProfileBlock);
