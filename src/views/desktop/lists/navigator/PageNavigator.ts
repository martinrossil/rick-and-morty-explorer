import { IDisplayContainer, DisplayContainer, ILabelElement } from 'enta';
import Factory from '../../../shared/Factory';
import NavigatorButton from './NavigatorButton';
import AppState from '../../../../state/AppState';
import Colors from '../../../../theme/Colors';
import Icons from '../../../../theme/Icons';
import Shadows from '../../../../theme/Shadows';

export default class PageNavigator extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'PageNavigator';
        this.percentWidth = 100;
        this.height = 56;
        this.bottom = -1;
        this.cornerSizeBottomLeft = this.cornerSizeBottomRight = 8;
        this.backgroundColor = Colors.WHITE;
        this.addFilter(Shadows.BOX_SHADOW_4);
        this.addElement(this.container);
        this.infoLabel.alignHorizontal = 'center';
        this.infoLabel.alignVertical = 'middle';
        AppState.pageInfo.addEventListener('changed', () => {
            this.infoLabel.text = 'Page ' + AppState.pageInfo.page + ' of ' + AppState.pageInfo.pages;
        });
        AppState.onlineStatus.addEventListener('changed', () => {
            if (AppState.onlineStatus.online) {
                this.previous.backgroundColor = Colors.BLUE_500;
                this.next.backgroundColor = Colors.BLUE_500;
            } else {
                this.previous.backgroundColor = Colors.BLUE_GRAY_500;
                this.next.backgroundColor = Colors.BLUE_GRAY_500;
            }
        });
    }

    private _container!: IDisplayContainer;
    private get container(): IDisplayContainer {
        if (!this._container) {
            this._container = new DisplayContainer();
            this._container.alignHorizontal = 'center';
            this._container.size(200, 56);
            this._container.addElements([this.previous,
                                        this.infoLabel,
                                        this.next]);
        }
        return this._container
    }

    private previous: NavigatorButton = new NavigatorButton('PREVIOUS', Icons.ARROW_BACK, NaN, Colors.WHITE);
    private infoLabel: ILabelElement = Factory.boldLabel();
    private next: NavigatorButton = new NavigatorButton('NEXT', Icons.ARROW_FORWARD, 0, Colors.WHITE);
}
customElements.define('page-navigator', PageNavigator);
