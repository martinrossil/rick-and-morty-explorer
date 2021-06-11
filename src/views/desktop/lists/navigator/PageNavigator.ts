import { IDisplayContainer, DisplayContainer, ILabelElement } from 'enta';
import Factory from '../../../shared/Factory';
import Theme from '../../../../theme/Theme';
import NavigatorButton from './NavigatorButton';
import AppState from '../../../../state/AppState';

export default class PageNavigator extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'PageNavigator';
        this.percentWidth = 100;
        this.height = 56;
        this.bottom = -1;
        this.cornerSizeBottomLeft = this.cornerSizeBottomRight = 8;
        this.backgroundColor = Theme.WHITE;
        this.addFilter(Theme.BOX_SHADOW_4);
        this.addElement(this.container);
        this.infoLabel.horizontalCenter = 0;
        this.infoLabel.verticalMiddle = 0;
        AppState.pageInfo.addEventListener('changed', () => {
            this.infoLabel.text = 'Page ' + AppState.pageInfo.page + ' of ' + AppState.pageInfo.pages;
        });
        AppState.onlineStatus.addEventListener('changed', () => {
            if (AppState.onlineStatus.online) {
                this.previous.backgroundColor = Theme.BLUE_500;
                this.next.backgroundColor = Theme.BLUE_500;
            } else {
                this.previous.backgroundColor = Theme.BLUE_GRAY_500;
                this.next.backgroundColor = Theme.BLUE_GRAY_500;
            }
        });
    }

    private _container!: IDisplayContainer;
    private get container(): IDisplayContainer {
        if (!this._container) {
            this._container = new DisplayContainer();
            this._container.horizontalCenter = 0;
            this._container.size(200, 56);
            this._container.addElements([this.previous,
                                        this.infoLabel,
                                        this.next]);
        }
        return this._container
    }

    private previous: NavigatorButton = new NavigatorButton('PREVIOUS', Theme.ARROW_BACK, NaN, Theme.WHITE);
    private infoLabel: ILabelElement = Factory.boldLabel();
    private next: NavigatorButton = new NavigatorButton('NEXT', Theme.ARROW_FORWARD, 0, Theme.WHITE);
}
customElements.define('page-navigator', PageNavigator);
