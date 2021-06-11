import { DisplayContainer } from 'enta';
import AppState from '../../state/AppState';
import Theme from '../../theme/Theme';
import SearchField from '../shared/SearchField';

export default class MobileTopBar extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'TopBar';
        this.percentWidth = 100;
        this.height = 56;
        this.paddingX = 16;
        this.addFilter(Theme.BOX_SHADOW_1);
        this.addFilter(Theme.BOX_SHADOW_2);
        this.backgroundColor = Theme.BLUE_500;
        this.addElements([new SearchField(NaN, 100, 40)]);
        AppState.onlineStatus.addEventListener('changed', () => {
            if (AppState.onlineStatus.online) {
                this.backgroundColor = Theme.BLUE_500;
            } else {
                this.backgroundColor = Theme.BLUE_GRAY_500;
            }
        });
    }
}
customElements.define('mobile-top-bar', MobileTopBar);
