import { ILabelElement, LabelElement, IDisplayElement, DisplayElement, TextAlign, IColor } from 'enta';
import Colors from '../../theme/Colors';
import Typography from '../../theme/Typography';

export default class Factory {
    public static regularLabel(percentWidth = NaN, width = NaN, textAlign: TextAlign = 'left'): ILabelElement {
        const labelElement: ILabelElement = new LabelElement();
        labelElement.percentWidth = percentWidth;
        labelElement.width = width;
        labelElement.typeFace = Typography.TYPEFACE_REGULAR;
        labelElement.textColor = Colors.BLUE_GRAY_700;
        labelElement.textAlign = textAlign;
        return labelElement;
    }

    public static boldLabel(percentWidth = NaN, width = NaN, textColor: IColor = Colors.BLUE_GRAY_500): ILabelElement {
        const labelElement: ILabelElement = new LabelElement();
        labelElement.percentWidth = percentWidth;
        labelElement.width = width;
        labelElement.typeFace = Typography.TYPEFACE_BOLD;
        labelElement.textColor = textColor;
        labelElement.fontWeight = 700;
        return labelElement;
    }

    public static titleLabel(): ILabelElement {
        const labelElement: ILabelElement = new LabelElement();
        labelElement.text = 'Rick and Morty Explorer';
        labelElement.fontSize = 28;
        labelElement.textColor = Colors.WHITE;
        labelElement.typeFace = Typography.TYPEFACE_BOLD;
        labelElement.fontWeight = 700;
        labelElement.verticalMiddle = 0;
        labelElement.letterSpacing = 1;
        return labelElement;
    }

    public static headerLabel(text: string, percentWidth = 100, width = NaN, textAlign: TextAlign = 'left'): ILabelElement {
        const labelElement: ILabelElement = new LabelElement();
        labelElement.width = width;
        labelElement.percentWidth = percentWidth;
        labelElement.text = text;
        labelElement.fontSize = 14;
        labelElement.typeFace = Typography.TYPEFACE_BOLD;
        labelElement.textColor = Colors.BLUE_GRAY_500;
        labelElement.textAlign = textAlign;
        labelElement.fontWeight = 700;
        return labelElement;
    }

    public static line(): IDisplayElement {
        const line: IDisplayElement = new DisplayElement();
        line.percentWidth = 100;
        line.height = 1;
        line.backgroundColor = Colors.BLUE_GRAY_200;
        line.bottom = 0;
        return line;
    }

    private static _topBar: IDisplayElement;
    public static async topBar(): Promise<IDisplayElement> {
        if (!this._topBar) {
            const { default: TopBar } = await import('../../views/desktop/TopBar');
            this._topBar = new TopBar();
        }
        return this._topBar;
    }

    private static _characterList: IDisplayElement;
    public static async characterList(): Promise<IDisplayElement> {
        if (!this._characterList) {
            const { default: CharacterList } = await import('../../views/desktop/lists/character/CharacterList');
            this._characterList = new CharacterList();
        }
        return this._characterList;
    }

    private static _mobileTopBar: IDisplayElement;
    public static async mobileTopBar(): Promise<IDisplayElement> {
        const { default: MobileTopBar } = await import('../../views/mobile/MobileTopBar');
        this._mobileTopBar = new MobileTopBar();
        return this._mobileTopBar;
    }

    private static _mobileCharacterList: IDisplayElement;
    public static async mobileCharacterList(): Promise<IDisplayElement> {
        if (!this._mobileCharacterList) {
            const { default: MobileCharacterList } = await import('../../views/mobile/lists/MobileCharacterList');
            this._mobileCharacterList = new MobileCharacterList();
        }
        return this._mobileCharacterList;
    }

    private static _mobilePageNavigator: IDisplayElement;
    public static async mobilePageNavigator(): Promise<IDisplayElement> {
        if (!this._mobilePageNavigator) {
            const { default: MobilePageNavigator } = await import('../../views/mobile/MobilePageNavigator');
            this._mobilePageNavigator = new MobilePageNavigator();
        }
        return this._mobilePageNavigator;
    }
}
