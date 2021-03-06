import { DisplayContainer, ILabelElement } from 'enta';
import Factory from '../shared/Factory';
import AppState from '../../state/AppState';
import SearchField from '../shared/SearchField';
import Colors from '../../theme/Colors';
import Shadows from '../../theme/Shadows';

export default class TopBar extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'TopBar';
        this.percentWidth = 100;
        this.height = 56;
        this.paddingX = 16;
        this.backgroundColor = Colors.BLUE_500;
        this.addFilter(Shadows.BOX_SHADOW_1);
        this.addFilter(Shadows.BOX_SHADOW_2);
        this.addElements([this.titleLabel, new SearchField(256, NaN, 40, 0)]);
        AppState.onlineStatus.addEventListener('changed', () => {
            if (AppState.onlineStatus.online) {
                this.backgroundColor = Colors.BLUE_500;
            } else {
                this.backgroundColor = Colors.BLUE_GRAY_500;
            }
        });
    }

    private titleLabel: ILabelElement = Factory.titleLabel();
}
customElements.define('top-bar', TopBar);
