import { ILabelElement, LabelElement, IDisplayElement, DisplayElement, TextAlign, IImageElement, ImageElement, IPathElement, PathElement } from 'enta';
import Theme from './theme/Theme';

export default class Factory {
    static regularLabel(percentWidth = NaN, width = NaN, textAlign: TextAlign = 'left'): ILabelElement {
        const labelElement: ILabelElement = new LabelElement();
        labelElement.percentWidth = percentWidth;
        labelElement.width = width;
        labelElement.typeFace = Theme.TYPEFACE_REGULAR;
        labelElement.textColor = Theme.BLUE_GRAY_700;
        labelElement.textAlign = textAlign;
        return labelElement;
    }

    static boldLabel(percentWidth = NaN, width = NaN): ILabelElement {
        const labelElement: ILabelElement = new LabelElement();
        labelElement.percentWidth = percentWidth;
        labelElement.width = width;
        labelElement.typeFace = Theme.TYPEFACE_BOLD;
        labelElement.textColor = Theme.BLUE_GRAY_500;
        labelElement.fontWeight = 700;
        return labelElement;
    }

    static titleLabel(): ILabelElement {
        const labelElement: ILabelElement = new LabelElement();
        labelElement.text = 'Rick and Morty Explorer';
        labelElement.fontSize = 28;
        labelElement.textColor = Theme.WHITE;
        labelElement.typeFace = Theme.TYPEFACE_BOLD;
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
        labelElement.typeFace = Theme.TYPEFACE_BOLD;
        labelElement.textColor = Theme.BLUE_GRAY_500;
        labelElement.textAlign = textAlign;
        labelElement.fontWeight = 700;
        return labelElement;
    }

    static line(): IDisplayElement {
        const line: IDisplayElement = new DisplayElement();
        line.percentWidth = 100;
        line.height = 1;
        line.backgroundColor = Theme.BLUE_GRAY_200;
        line.bottom = 0;
        return line;
    }

    static ring(diameter: number, strokeWidth: number): IPathElement {
        const ring: IPathElement = new PathElement();
        const corner = diameter * 0.5;
        ring.size(diameter, diameter);
        let d = '';
        d += 'M 0 ' + corner + ' ';
        d += 'A ' + corner + ' ' + corner + ' 0 0 1 ' + corner + ' 0 ';
        d += 'L ' + (diameter - corner) + ' 0 ';
        d += 'A ' + corner + ' ' + corner + ' 1 0 1 ' + diameter + ' ' + corner + ' ';
        d += 'L ' + diameter + ' ' + (diameter - corner) + ' ';
        d += 'A ' + corner + ' ' + corner + ' 1 0 1 ' + (diameter - corner) + ' ' + diameter + ' ';
        d += 'L ' + corner + ' ' + diameter + ' ';
        d += 'A ' + corner + ' ' + corner + ' 0 0 1 ' + '0 ' + (diameter - corner) + ' ';
        d += 'Z';
        ring.pathData = d;
        ring.strokeColor = Theme.BLUE_500;
        ring.fillColor = Theme.TRANSPARENT;
        ring.strokeWidth = strokeWidth;
        return ring;
    }

    static shadowRing(diameter: number): IDisplayElement {
        const shadowRing: IDisplayElement = new DisplayElement();
        shadowRing.size(diameter, diameter);
        shadowRing.cornerSize = diameter * 0.5;
        shadowRing.addFilter(Theme.INNER_SHADOW_1);
        shadowRing.addFilter(Theme.INNER_SHADOW_2);
        return shadowRing;
    }

    static profileImage(size: number, corner: number): IImageElement {
        const image: IImageElement = new ImageElement();
        image.backgroundColor = Theme.BLUE_GRAY_200;
        image.size(size, size);
        image.cornerSize = corner;
        image.clip = 'hidden';
        return image;
    }

    static shadowBox(): IDisplayElement {
        const box: IDisplayElement = new DisplayElement();
        box.enabled = false;
        box.percentWidth = 100;
        box.percentHeight = 100;
        box.cornerSize = 8;
        box.addFilter(Theme.INNER_SHADOW_3);
        box.addFilter(Theme.INNER_SHADOW_4);
        return box;
    }
}
