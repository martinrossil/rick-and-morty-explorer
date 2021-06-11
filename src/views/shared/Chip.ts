import { DisplayContainer, ILabelElement, LabelElement, IColor } from 'enta';
import Theme from '../../theme/Theme';

export default class Chip extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'Chip';
        this.addElement(this.textLabel);
        this.backgroundColor = Theme.BLUE_GRAY_200;
        this.width = 70;
        this.height = 20;
        this.cornerSize = 10;
    }

    private textChanged(): void {
        if (this.text.startsWith('Mythological')) {
            this.text = 'Myth';
            return;
        }
        if (this.text.startsWith('Poopybutthole')) {
            this.text = 'Butthole';
            return;
        }
        if (this.text === 'Alive') {
            this.textColor = Theme.GREEN_700;
            this.backgroundColor = Theme.GREEN_200;
            return
        }
        if (this.text === 'Dead') {
            this.textColor = Theme.RED_700;
            this.backgroundColor = Theme.RED_200;
            return;
        }
        if (this.text === 'Male') {
            this.textColor = Theme.BLUE_700;
            this.backgroundColor = Theme.BLUE_200;
            return;
        }
        if (this.text === 'Female') {
            this.textColor = Theme.PINK_700;
            this.backgroundColor = Theme.PINK_200;
            return;
        }
        if (this.text === 'Human') {
            this.textColor = Theme.ORANGE_700;
            this.backgroundColor = Theme.ORANGE_200;
            return;
        }
        if (this.text === 'Alien') {
            this.textColor = Theme.TEAL_700;
            this.backgroundColor = Theme.TEAL_200;
            return;
        }
        this.textColor = Theme.BLUE_GRAY_700;
        this.backgroundColor = Theme.BLUE_GRAY_200;
    }

    private _textColor: IColor = Theme.BLUE_GRAY_700;
    public set textColor(value: IColor) {
        if (this._textColor === value) {
            return;
        }
        this._textColor = value;
        this.textLabel.textColor = value;
    }

    public get textColor(): IColor {
        return this._textColor;
    }

    private _text = '';
    public set text(value: string) {
        if (this._text === value) {
            return;
        }
        this._text = value;
        this.textLabel.text = value;
        this.textChanged();
    }

    public get text(): string {
        return this._text;
    }

    private _textLabel!: ILabelElement;
    private get textLabel(): ILabelElement {
        if (!this._textLabel) {
            this._textLabel = new LabelElement();
            this._textLabel.typeFace = Theme.TYPEFACE_BOLD;
            this._textLabel.fontSize = 12;
            this._textLabel.fontWeight = 700;
            this._textLabel.horizontalCenter = 0;
            this._textLabel.verticalMiddle = 0;
            this._textLabel.textColor = this.textColor;
        }
        return this._textLabel;
    }
}
customElements.define('chip-element', Chip);
