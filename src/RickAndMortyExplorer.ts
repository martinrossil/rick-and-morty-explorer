import { ApplicationElement } from 'enta';
import AppMachine from './machines/AppMachine';
import LayoutMachine from './machines/LayoutMachine';
import Theme from './theme/Theme';
export default class RickAndMortyExplorer extends ApplicationElement {
    public constructor() {
        super();
        this.name = 'RickAndMortyExplorer';
        this.backgroundColor = Theme.WARM_GRAY_100;
    }

    private appMachine: AppMachine = new AppMachine(this);
    private layoutMachine = new LayoutMachine(this);
}
customElements.define('rick-and-morty-explorer', RickAndMortyExplorer);
