import { DisplayContainer, IMouseTouch, MouseTouchMachine, IPathElement, IColor, ViewBox } from 'enta';
import Colors from '../../../../theme/Colors';
import PathExtended from '../../../shared/PathExtended';

export default class NavigatorButton extends DisplayContainer implements IMouseTouch {
    private event: string;
    public constructor(event: string, icon: string, right = NaN, iconColor: IColor) {
        super();
        this.name = 'NavigatorButton';
        this.event = event;
        this.path.pathData = icon;
        this.path.fillColor = iconColor;
        this.size(40, 40);
        this.cursor = 'pointer';
        this.cornerSize = 20;
        this.backgroundColor = Colors.BLUE_500;
        this.addElement(this.path);
        this.alignVertical = 'middle';
        this.right = right;
    }

    private machine: MouseTouchMachine = new MouseTouchMachine(this);

    private _path!: IPathElement;
    private get path(): IPathElement {
        if (!this._path) {
            this._path = new PathExtended();
            this._path.size(24, 24);
            this._path.viewBox = new ViewBox(0, 0, 24, 24);
            this._path.alignHorizontal = 'center';
            this._path.alignVertical = 'middle';
        }
        return this._path;
    }

    public initial(e: Event): void {
        //
    }

    public hover(): void {
        //
    }

    public pressed(x: number, y: number): void {
        //
    }

    public clicked(): void {
        this.dispatch(this.event, null, true);
    }
}
customElements.define('navigator-button', NavigatorButton);
