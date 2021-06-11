import { DisplayContainer, IDisplayContainer, ILabelElement } from 'enta';
import Factory from '../shared/Factory';
import AppState from '../../state/AppState';
import Theme from '../../theme/Theme';
import NavigatorButton from '../desktop/lists/navigator/NavigatorButton';

export default class MobilePageNavigator extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'MobilePageNavigator';
        this.percentWidth = 100;
        this.height = 56;
        this.bottom = -1;
        this.addFilter(Theme.BOX_SHADOW_4);
        this.backgroundColor = Theme.BLUE_500;
        this.addElement(this.container);
        this.infoLabel.horizontalCenter = 0;
        this.infoLabel.verticalMiddle = 0;
        this.infoLabel.textColor = Theme.WHITE;
        this.previous.backgroundColor = Theme.WHITE;
        this.next.backgroundColor = Theme.WHITE;
        AppState.pageInfo.addEventListener('changed', () => {
            this.infoLabel.text = 'Page ' + AppState.pageInfo.page + ' of ' + AppState.pageInfo.pages;
        });
        AppState.onlineStatus.addEventListener('changed', () => {
            if (AppState.onlineStatus.online) {
                this.backgroundColor = Theme.BLUE_500;
            } else {
                this.backgroundColor = Theme.BLUE_GRAY_500;
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

    private previous: NavigatorButton = new NavigatorButton('PREVIOUS', Theme.ARROW_BACK, NaN, Theme.BLUE_500);
    private infoLabel: ILabelElement = Factory.boldLabel();
    private next: NavigatorButton = new NavigatorButton('NEXT', Theme.ARROW_FORWARD, 0, Theme.BLUE_500);
}
customElements.define('mobile-page-navigator', MobilePageNavigator);
