import { IState, Machine, State } from 'enta';
import RickAndMortyExplorer from '../RickAndMortyExplorer';
import Factory from '../views/shared/Factory';

export default class LayoutMachine extends Machine<RickAndMortyExplorer> {
    public constructor(host: RickAndMortyExplorer) {
        super(host);
        this.initial.addTransition('load', this.loadComplete);
        window.addEventListener('load', this.send, { once: true });
        window.addEventListener('resize', () => {
            if (this.isMobile) {
                this.send(new CustomEvent('MOBILE'));
            } else {
                this.send(new CustomEvent('DESKTOP'));
            }
        });
    }

    private get isMobile(): boolean {
        return Math.max(window.innerWidth, document.documentElement.clientWidth) < 768;
    }

    private _loadComplete!: IState;
    private get loadComplete(): IState {
        if (!this._loadComplete) {
            this._loadComplete = new State('Update');
            this._loadComplete.addTransition('MOBILE', this.mobile);
            this._loadComplete.addTransition('DESKTOP', this.desktop);
            this._loadComplete.on = this.onLoadComplete.bind(this);
        }
        return this._loadComplete;
    }

    private async onLoadComplete(): Promise<void> {
        if (this.isMobile) {
            this.send(new CustomEvent('MOBILE'));
        } else {
            this.send(new CustomEvent('DESKTOP'));
        }
    }

    private _mobile!: IState;
    private get mobile(): IState {
        if (!this._mobile) {
            this._mobile = new State('Mobile');
            this._mobile.addTransition('DESKTOP', this.desktop);
            this._mobile.on = this.onMobile.bind(this);
        }
        return this._mobile;
    }

    private async onMobile(): Promise<void> {
        this.host.removeElements();
        this.host.addElements([await Factory.mobileCharacterList(),
                                await Factory.mobileTopBar(),
                                await Factory.mobilePageNavigator()
                            ]);
    }

    private _desktop!: IState;
    private get desktop(): IState {
        if (!this._desktop) {
            this._desktop = new State('Desktop');
            this._desktop.addTransition('MOBILE', this.mobile);
            this._desktop.on = this.onDesktop.bind(this);
        }
        return this._desktop;
    }

    private async onDesktop(): Promise<void> {
        this.host.removeElements();
        this.host.addElements([await Factory.characterList(),
                                await Factory.topBar()
                            ]);
    }
}
