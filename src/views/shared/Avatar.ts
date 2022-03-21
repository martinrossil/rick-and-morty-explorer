import { DisplayContainer, DisplayElement, IDisplayElement, IImageElement, ImageElement } from 'enta';
import { CharacterSchema } from '../../graphql/schema/CharacterSchema';
import Colors from '../../theme/Colors';
import Shadows from '../../theme/Shadows';
import Ring from './Ring';

export default class Avatar extends DisplayContainer {
    public constructor(size: number, strokeWidth: number) {
        super();
        this.name = 'Avatar';
        this.strokeWidth = strokeWidth;
        this.size(size, size);
        this.cornerSize = this.width * 0.5;
        this.addElements([this.image, this.shadow, this.ring]);
    }

    private _strokeWidth = 0;
    public set strokeWidth(value: number) {
        if (this._strokeWidth === value) {
            return;
        }
        this._strokeWidth = value;
        this.ring.strokeWidth = value;
    }

    public get strokeWidth(): number {
        return this._strokeWidth;
    }

    protected validate(): void {
        super.validate();
        this.cornerSize = this.width * 0.5;
        this.image.size(this.width, this.height);
        this.image.cornerSize = this.width * 0.5;
        this.shadow.size(this.width, this.height);
        this.shadow.cornerSize = this.width * 0.5;
        this.ring.size(this.width, this.height);
    }

    private _character: CharacterSchema | null = null;
    public set character(value: CharacterSchema | null) {
        if (this._character === value) {
            return;
        }
        this._character = value;
        if (value) {
            this.image.source = 'https://rickandmortyapi.com/api/character/avatar/' + value.id + '.jpeg';
            this.image.alt = value.name;
        }
    }

    public get character(): CharacterSchema | null {
        return this._character;
    }

    private _image!: IImageElement;
    private get image(): IImageElement {
        if (!this._image) {
            this._image = new ImageElement();
            this._image.size(this.width, this.height);
            this._image.cornerSize = this.width * 0.5;
            this._image.clip = 'hidden';
            this._image.objectFit = 'cover';
            this._image.backgroundColor = Colors.BLUE_GRAY_200;
        }
        return this._image;
    }

    private _shadow!: IDisplayElement;
    private get shadow(): IDisplayElement {
        if (!this._shadow) {
            this._shadow = new DisplayElement();
            this._shadow.size(this.width, this.height);
            this._shadow.cornerSize = this.width * 0.5;
            this._shadow.addFilter(Shadows.INNER_SHADOW_1);
            this._shadow.addFilter(Shadows.INNER_SHADOW_2);
        }
        return this._shadow;
    }

    private ring: Ring = new Ring(this.width, this.strokeWidth);
}
customElements.define('avatar-element', Avatar);
