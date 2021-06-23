import { PathElement } from 'enta';
import Colors from '../../theme/Colors';

export default class Ring extends PathElement {
    public constructor(diameter: number, strokeWidth: number) {
        super();
        this.name = 'Ring';
        this.size(diameter, diameter);
        this.strokeColor = Colors.BLUE_500;
        this.fillColor = Colors.TRANSPARENT;
        this.strokeWidth = strokeWidth;
    }

    protected validate(): void {
        super.validate();
        this.updatePathData();
    }

    private updatePathData(): void {
        const diameter = this.width;
        const corner = diameter * 0.5;
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
        this.pathData = d;
    }
}
customElements.define('ring-element', Ring);
