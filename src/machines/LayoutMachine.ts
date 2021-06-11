import { IState, Machine, State } from 'enta';
import RickAndMortyExplorer from '../RickAndMortyExplorer';
import CharacterList from '../views/desktop/lists/character/CharacterList';
import MobileCharacterList from '../views/mobile/lists/MobileCharacterList';
import MobilePageNavigator from '../views/mobile/MobilePageNavigator';
import MobileTopBar from '../views/mobile/MobileTopBar';
import TopBar from '../views/desktop/TopBar';

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

    private onMobile(): void {
        this.host.removeElements();
        this.host.addElements([this.mobileCharacterList, this.mobileTopBar, this.mobilePageNavigator]);
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

    private onDesktop(): void {
        this.host.removeElements();
        this.host.addElements([this.characterList, this.topBar]);
    }

    private _characterList!: CharacterList;
    private get characterList(): CharacterList {
        if (!this._characterList) {
            this._characterList = new CharacterList();
        }
        return this._characterList;
    }

    private _topBar!: TopBar;
    private get topBar(): TopBar {
        if (!this._topBar) {
            this._topBar = new TopBar();
        }
        return this._topBar;
    }

    private _mobileCharacterList!: MobileCharacterList;
    private get mobileCharacterList(): MobileCharacterList {
        if (!this._mobileCharacterList) {
            this._mobileCharacterList = new MobileCharacterList();
        }
        return this._mobileCharacterList;
    }

    private _mobileTopBar!: MobileTopBar;
    private get mobileTopBar(): MobileTopBar {
        if (!this._mobileTopBar) {
            this._mobileTopBar = new MobileTopBar();
        }
        return this._mobileTopBar;
    }

    private _mobilePageNavigator!: MobilePageNavigator;
    private get mobilePageNavigator(): MobilePageNavigator {
        if (!this._mobilePageNavigator) {
            this._mobilePageNavigator = new MobilePageNavigator();
        }
        return this._mobilePageNavigator;
    }
}
