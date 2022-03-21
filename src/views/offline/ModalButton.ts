import { DisplayContainer, ILabelElement, IMouseTouch, Cursor, MouseTouchMachine } from 'enta';
import Factory from '../shared/Factory';
import Colors from '../../theme/Colors';

export default class ModalButton extends DisplayContainer implements IMouseTouch {
    public constructor() {
        super();
        this.name = 'ModalButton';
        this.cursor = 'pointer';
        this.cornerSize = 4;
        this.label.text = 'GOT IT :)';
        this.label.letterSpacing = 1;
        this.label.textColor = Colors.WHITE;
        this.label.fontSize = 14;
        this.paddingX = 16;
        this.paddingY = 14;
        this.backgroundColor = Colors.BLUE_GRAY_500;
        this.addElement(this.label);
    }

    private machine: MouseTouchMachine = new MouseTouchMachine(this);
    private label: ILabelElement = Factory.regularLabel();

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
        this.dispatch('GOT_IT', null, true);
    }
}
customElements.define('modal-button', ModalButton);
