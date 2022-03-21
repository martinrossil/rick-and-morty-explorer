import { DisplayContainer, ILabelElement, IColor } from 'enta';
import Colors from '../../theme/Colors';
import Typography from '../../theme/Typography';
import LabelExtended from './LabelExtended';

export default class Chip extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'Chip';
        this.addElement(this.textLabel);
        this.backgroundColor = Colors.BLUE_GRAY_200;
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
            this.textColor = Colors.GREEN_700;
            this.backgroundColor = Colors.GREEN_200;
            return
        }
        if (this.text === 'Dead') {
            this.textColor = Colors.RED_700;
            this.backgroundColor = Colors.RED_200;
            return;
        }
        if (this.text === 'Male') {
            this.textColor = Colors.BLUE_700;
            this.backgroundColor = Colors.BLUE_200;
            return;
        }
        if (this.text === 'Female') {
            this.textColor = Colors.PINK_700;
            this.backgroundColor = Colors.PINK_200;
            return;
        }
        if (this.text === 'Human') {
            this.textColor = Colors.ORANGE_700;
            this.backgroundColor = Colors.ORANGE_200;
            return;
        }
        if (this.text === 'Alien') {
            this.textColor = Colors.TEAL_700;
            this.backgroundColor = Colors.TEAL_200;
            return;
        }
        this.textColor = Colors.BLUE_GRAY_700;
        this.backgroundColor = Colors.BLUE_GRAY_200;
    }

    private _textColor: IColor = Colors.BLUE_GRAY_700;
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
            this._textLabel = new LabelExtended();
            this._textLabel.typeFace = Typography.TYPEFACE_BOLD;
            this._textLabel.fontSize = 12;
            this._textLabel.fontWeight = 700;
            this._textLabel.alignHorizontal = 'center';
            this._textLabel.alignVertical = 'middle';
            this._textLabel.textColor = this.textColor;
        }
        return this._textLabel;
    }
}
customElements.define('chip-element', Chip);
