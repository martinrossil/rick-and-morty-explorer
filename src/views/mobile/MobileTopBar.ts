import { DisplayContainer } from 'enta';
import AppState from '../../state/AppState';
import Colors from '../../theme/Colors';
import Shadows from '../../theme/Shadows';
import SearchField from '../shared/SearchField';

export default class MobileTopBar extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'TopBar';
        this.percentWidth = 100;
        this.height = 56;
        this.paddingX = 16;
        this.addFilter(Shadows.BOX_SHADOW_1);
        this.addFilter(Shadows.BOX_SHADOW_2);
        this.backgroundColor = Colors.BLUE_500;
        this.addElements([new SearchField(NaN, 100, 40)]);
        AppState.onlineStatus.addEventListener('changed', () => {
            if (AppState.onlineStatus.online) {
                this.backgroundColor = Colors.BLUE_500;
            } else {
                this.backgroundColor = Colors.BLUE_GRAY_500;
            }
        });
    }
}
customElements.define('mobile-top-bar', MobileTopBar);
