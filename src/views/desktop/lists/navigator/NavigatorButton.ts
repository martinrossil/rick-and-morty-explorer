import { DisplayContainer, Cursor, IInteractive, TouchMachine, IPathElement, PathElement, Rectangle, IColor } from 'enta';
import Theme from '../../../../theme/Theme';

export default class NavigatorButton extends DisplayContainer implements IInteractive {
    private event: string;
    public constructor(event: string, icon: string, right = NaN, iconColor: IColor) {
        super();
        this.name = 'NavigatorButton';
        this.event = event;
        this.path.pathData = icon;
        this.path.fillColor = iconColor;
        this.size(40, 40);
        this.cursor = Cursor.POINTER;
        this.cornerSize = 20;
        this.backgroundColor = Theme.BLUE_500;
        this.addElement(this.path);
        this.verticalMiddle = 0;
        this.right = right;
    }

    private machine: TouchMachine = new TouchMachine(this);

    private _path!: IPathElement;
    private get path(): IPathElement {
        if (!this._path) {
            this._path = new PathElement();
            this._path.size(24, 24);
            this._path.viewBox = new Rectangle(0, 0, 24, 24);
            this._path.horizontalCenter = this._path.verticalMiddle = 0;
        }
        return this._path;
    }

    public initial(e: Event): void {
        //
    }

    public hover(e: Event): void {
        //
    }

    public pressed(point: [number, number]): void {
        //
    }

    public triggered(): void {
        this.dispatch(this.event, null, true);
    }
}
customElements.define('navigator-button', NavigatorButton);
