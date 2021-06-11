import { DisplayContainer, IImageElement, ILabelElement, HorizontalLayout } from 'enta';
import Factory from '../../../../shared/Factory';
import { CharacterSchema } from '../../../../../graphql/schema/CharacterSchema';
import Theme from '../../../../../theme/Theme';

export default class ProfileBlock extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'ProfileBlock';
        this.percentWidth = 100;
        this.height = 40;
        this.layout = new HorizontalLayout(16, 'left', 'middle');
        this.addElements([this.profile, this.characterLabel]);
    }

    private _character: CharacterSchema | null = null;
    public set character(value: CharacterSchema | null) {
        if (this._character === value) {
            return;
        }
        this._character = value;
        if (value) {
            this.characterLabel.text = value.name;
            this.profile.source = Theme.AVATAR_URL + value.id + '.jpeg';
            this.profile.alt = value.name;
        }
    }

    public get character(): CharacterSchema | null {
        return this._character;
    }

    private profile: IImageElement = Factory.profileImage(40, 20);

    private _characterLabel!: ILabelElement;
    private get characterLabel(): ILabelElement {
        if (!this._characterLabel) {
            this._characterLabel = Factory.boldLabel(100);
            this._characterLabel.percentWidth = 100;
            this._characterLabel.textColor = Theme.BLUE_GRAY_700;
        }
        return this._characterLabel;
    }
}
customElements.define('profile-block', ProfileBlock);
