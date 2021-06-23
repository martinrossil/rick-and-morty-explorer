import { ILabelElement, LabelElement, IDisplayElement, DisplayElement, TextAlign, IColor } from 'enta';
import Colors from '../../theme/Colors';
import Typography from '../../theme/Typography';

export default class Factory {
    static regularLabel(percentWidth = NaN, width = NaN, textAlign: TextAlign = 'left'): ILabelElement {
        const labelElement: ILabelElement = new LabelElement();
        labelElement.percentWidth = percentWidth;
        labelElement.width = width;
        labelElement.typeFace = Typography.TYPEFACE_REGULAR;
        labelElement.textColor = Colors.BLUE_GRAY_700;
        labelElement.textAlign = textAlign;
        return labelElement;
    }

    static boldLabel(percentWidth = NaN, width = NaN, textColor: IColor = Colors.BLUE_GRAY_500): ILabelElement {
        const labelElement: ILabelElement = new LabelElement();
        labelElement.percentWidth = percentWidth;
        labelElement.width = width;
        labelElement.typeFace = Typography.TYPEFACE_BOLD;
        labelElement.textColor = textColor;
        labelElement.fontWeight = 700;
        return labelElement;
    }

    static titleLabel(): ILabelElement {
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

    static headerLabel(text: string, percentWidth = 100, width = NaN, textAlign: TextAlign = 'left'): ILabelElement {
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

    static line(): IDisplayElement {
        const line: IDisplayElement = new DisplayElement();
        line.percentWidth = 100;
        line.height = 1;
        line.backgroundColor = Colors.BLUE_GRAY_200;
        line.bottom = 0;
        return line;
    }
}
