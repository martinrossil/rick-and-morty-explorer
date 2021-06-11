import { DisplayContainer, ILabelElement, IInteractive, TouchMachine, Cursor } from 'enta';
import Factory from '../shared/Factory';
import Theme from '../../theme/Theme';

export default class ModalButton extends DisplayContainer implements IInteractive {
    public constructor() {
        super();
        this.name = 'ModalButton';
        this.cursor = Cursor.POINTER;
        this.cornerSize = 4;
        this.label.text = 'GOT IT :)';
        this.label.letterSpacing = 1;
        this.label.textColor = Theme.WHITE;
        this.label.fontSize = 14;
        this.paddingX = 16;
        this.paddingY = 14;
        this.backgroundColor = Theme.BLUE_GRAY_500;
        this.addElement(this.label);
    }

    private machine: TouchMachine = new TouchMachine(this);
    private label: ILabelElement = Factory.regularLabel();

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
        this.dispatch('GOT_IT', null, true);
    }
}
customElements.define('modal-button', ModalButton);
