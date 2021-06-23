import { DisplayContainer, IDisplayContainer, ITextElement, ILabelElement, TextElement, VerticalLayout, HorizontalLayout } from 'enta';
import Factory from '../shared/Factory';
import ModalButton from './ModalButton';
import Colors from '../../theme/Colors';
import Shadows from '../../theme/Shadows';
import Typography from '../../theme/Typography';

export default class OfflineNotification extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'OfflineNotification';
        this.percentWidth = this.percentHeight = 100;
        this.backgroundColor = Colors.OFFLINE;
        this.addElement(this.modal);
    }

    private _modal!: IDisplayContainer;
    private get modal(): IDisplayContainer {
        if (!this._modal) {
            this._modal = new DisplayContainer();
            this._modal.width = 340;
            this._modal.cornerSize = 8;
            this._modal.backgroundColor = Colors.WHITE;
            this._modal.addFilter(Shadows.BOX_SHADOW_1);
            this._modal.addFilter(Shadows.BOX_SHADOW_2);
            this._modal.horizontalCenter = 0;
            this._modal.verticalMiddle = 0;
            this._modal.layout = new VerticalLayout(24);
            this._modal.addElements([this.bodyContainer, this.bottomBar]);
        }
        return this._modal;
    }

    private _bodyContainer!: IDisplayContainer;
    private get bodyContainer(): IDisplayContainer {
        if (!this._bodyContainer) {
            this._bodyContainer = new DisplayContainer();
            this._bodyContainer.percentWidth = 100;
            this._bodyContainer.paddingTop = 24;
            this._bodyContainer.paddingX = 24;
            this._bodyContainer.layout = new VerticalLayout(24);
            this._bodyContainer.addElements([this.titleLabel, this.bodyText]);
        }
        return this._bodyContainer;
    }

    private _titleLabel!: ILabelElement;
    private get titleLabel(): ILabelElement {
        if (!this._titleLabel) {
            this._titleLabel = Factory.boldLabel();
            this._titleLabel.text = 'You are now offline!';
            this._titleLabel.textColor = Colors.BLUE_GRAY_900;
            this._titleLabel.fontSize = 20;
        }
        return this._titleLabel;
    }

    private _bodyText!: ITextElement;
    private get bodyText(): ITextElement {
        if (!this._bodyText) {
            this._bodyText = new TextElement();
            this._bodyText.percentWidth = 100;
            this._bodyText.typeFace = Typography.TYPEFACE_REGULAR;
            this._bodyText.textColor = Colors.BLUE_GRAY_700;
            this._bodyText.lineHeight = 1.4;
            this._bodyText.text = 'The content you have been browsing until this point, is still available.\n\nWhen you loose your connection, the UI turns gray and back to blue when you are online again.';
        }
        return this._bodyText;
    }

    private _bottomBar!: IDisplayContainer;
    private get bottomBar(): IDisplayContainer {
        if (!this._bottomBar) {
            this._bottomBar = new DisplayContainer();
            this._bottomBar.height = 56;
            this._bottomBar.percentWidth = 100;
            this._bottomBar.paddingY = 9;
            this._bottomBar.paddingRight = 9;
            this._bottomBar.cornerSizeBottomLeft = 8;
            this._bottomBar.cornerSizeBottomRight = 8;
            this._bottomBar.backgroundColor = Colors.BLUE_GRAY_100;
            this._bottomBar.layout = new HorizontalLayout(0, 'right');
            this._bottomBar.addElement(new ModalButton());
        }
        return this._bottomBar;
    }
}
customElements.define('offline-notification', OfflineNotification);
