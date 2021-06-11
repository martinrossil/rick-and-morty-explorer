import { DisplayContainer, IImageElement, IPathElement, IDisplayElement } from 'enta';
import Factory from '../../../../shared/Factory';
import { CharacterSchema } from '../../../../../graphql/schema/CharacterSchema';
import Theme from '../../../../../theme/Theme';

export default class MaxProfileBlock extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'MaxProfileBlock';
        this.size(200, 200);
        this.cornerSize = 100;
        this.addFilter(Theme.INNER_SHADOW_1);
        this.addFilter(Theme.INNER_SHADOW_2);
        this.addElements([this.profile, this.shadowRing, this.profileRing]);
    }

    private _character: CharacterSchema | null = null;
    public set character(value: CharacterSchema | null) {
        if (this._character === value) {
            return;
        }
        this._character = value;
        if (value) {
            this.profile.source = Theme.AVATAR_URL + value.id + '.jpeg';
        }
    }

    public get character(): CharacterSchema | null {
        return this._character;
    }

    private profile: IImageElement = Factory.profileImage(200, 100);
    private shadowRing: IDisplayElement = Factory.shadowRing(200);
    private profileRing: IPathElement = Factory.ring(200, 4);
}
customElements.define('max-profile-block', MaxProfileBlock);
