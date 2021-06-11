import { DisplayContainer, HorizontalLayout } from 'enta';
import Theme from '../../../../theme/Theme';
import Factory from '../../../shared/Factory';

export default class CharacterListHeader extends DisplayContainer {
    public constructor() {
        super();
        this.name = 'CharacterListHeader';
        this.percentWidth = 100;
        this.height = 40;
        this.paddingX = 16;
        this.backgroundColor = Theme.BLUE_GRAY_50;
        this.cornerSizeTopLeft = this.cornerSizeTopRight = 8;
        this.layout = new HorizontalLayout(32, 'left', 'middle');
        this.addFilter(Theme.BOX_SHADOW_2);
        this.addElements([Factory.headerLabel('NAME'),
                            Factory.headerLabel('GENDER', NaN, 70, 'center'),
                            Factory.headerLabel('LOCATION'),
                            Factory.headerLabel('SPECIES', NaN, 70, 'center'),
                            Factory.headerLabel('STATUS', NaN, 70, 'center'),
                            Factory.headerLabel('EPISODES', NaN, 70, 'right')]);
    }
}
customElements.define('character-list-header', CharacterListHeader);
