import { Machine, IState, State, IEventListener } from 'enta';
import GraphQL from '../graphql/GraphQL';
import { CharacterPageSchema } from '../graphql/schema/CharacterPageSchema';
import { CharacterSchema } from '../graphql/schema/CharacterSchema';
import { InfoSchema } from '../graphql/schema/InfoSchema';
import RickAndMortyExplorer from '../RickAndMortyExplorer';
import AppState from '../state/AppState';
import OfflineNotification from '../views/offline/OfflineNotification';

export default class AppMachine extends Machine<RickAndMortyExplorer> {
    public constructor(host: RickAndMortyExplorer) {
        super(host);
        this.initial.addTransition('load', this.complete);
        window.addEventListener('load', this.send, { once: true });
        window.addEventListener('online', this.send);
        window.addEventListener('offline', this.send);
        host.addEventListener('PREVIOUS', this.send);
        host.addEventListener('NEXT', this.send);
        host.addEventListener('SEARCH', this.send);
        host.addEventListener('GOT_IT', this.send);
    }

    private _complete!: IState;
    private get complete(): IState {
        if (!this._complete) {
            this._complete = new State('Complete');
            this._complete.addTransition('FETCH', this.loading);
            this._complete.on = this.getInitialPage.bind(this);
        }
        return this._complete;
    }

    private _loading!: IState;
    private get loading(): IState {
        if (!this._loading) {
            this._loading = new State('Loading');
            this._loading.addTransition('RESULT', this.result);
            this._loading.addTransition('SEARCH', this.search);
            this._loading.addTransition('offline', this.offline);
            this._loading.on = this.getPageWithGraphQL.bind(this) as unknown as IEventListener;
        }
        return this._loading;
    }

    private _result!: IState;
    private get result(): IState {
        if (!this._result) {
            this._result = new State('Result');
            this._result.on = this.updateAppState.bind(this) as unknown as IEventListener;
            this._result.next = this.iddle;
        }
        return this._result;
    }

    private _search!: IState;
    private get search(): IState {
        if (!this._search) {
            this._search = new State('Search');
            this._search.on = this.loadPageWithSearchTerm.bind(this) as unknown as IEventListener;
            this._search.addTransition('FETCH', this.loading);
        }
        return this._search;
    }

    private _iddle!: IState;
    private get iddle(): IState {
        if (!this._iddle) {
            this._iddle = new State('Iddle');
            this._iddle.addTransition('NEXT', this.next);
            this._iddle.addTransition('PREVIOUS', this.previous);
            this._iddle.addTransition('SEARCH', this.search);
            this._iddle.addTransition('offline', this.offline);
            this._iddle.addTransition('online', this.online);
        }
        return this._iddle;
    }

    private _next!: IState;
    private get next(): IState {
        if (!this._next) {
            this._next = new State('Next');
            this._next.addTransition('FETCH', this.loading);
            this._next.addTransition('NO_MORE_PAGES', this.iddle);
            this._next.on = this.loadNextPageIfPossible.bind(this);
        }
        return this._next;
    }

    private _previous!: IState;
    private get previous(): IState {
        if (!this._previous) {
            this._previous = new State('Previous');
            this._previous.addTransition('FETCH', this.loading);
            this._previous.addTransition('NO_MORE_PAGES', this.iddle);
            this._previous.on = this.loadPreviousPageIfPossible.bind(this);
        }
        return this._previous;
    }

    private _offline!: IState;
    private get offline(): IState {
        if (!this._offline) {
            this._offline = new State('Offline');
            this._offline.addTransition('CONTINUE_TO_IDDLE', this.iddle);
            this._offline.addTransition('SHOW_NOTIFICATION', this.notification);
            this._offline.on = this.userLostConnection.bind(this);
        }
        return this._offline;
    }

    private _online!: IState;
    private get online(): IState {
        if (!this._online) {
            this._online = new State('online');
            this._online.on = this.userWentBackOnline.bind(this);
            this._online.next = this.iddle;
        }
        return this._online;
    }

    private _notification!: IState;
    private get notification(): IState {
        if (!this._notification) {
            this._notification = new State('Notification');
            this._notification.addTransition('GOT_IT', this.iddle);
            this._notification.on = this.showOfflineNotification.bind(this);
            this._notification.exit = this.removeOfflineNotification.bind(this);
        }
        return this._notification;
    }

    private userLostConnection(e: Event): void {
        this.setOfflineMode();
        this.notifyUserAboutOffline();
    }

    private setOfflineMode(): void {
        AppState.onlineStatus.online = false;
    }

    private notifyUserAboutOffline(): void {
        if (!AppState.onlineStatus.hasOfflineNotificationBeenShown) {
            AppState.onlineStatus.hasOfflineNotificationBeenShown = true;
            this.send(new CustomEvent('SHOW_NOTIFICATION'));
        } else {
            this.send(new CustomEvent('CONTINUE_TO_IDDLE'));
        }
    }

    private async getInitialPage(e: Event): Promise<void> {
        this.send(new CustomEvent('FETCH', { detail: { filter: '', page: 1 } }));
    }

    private userWentBackOnline(e: Event): void {
        AppState.onlineStatus.online = true;
    }

    private showOfflineNotification(e: Event): void {
        this.host.addElement(this.offlineNotification);
    }

    private removeOfflineNotification(e: Event): void {
        this.host.removeElement(this.offlineNotification);
    }

    private _offlineNotification!: OfflineNotification;
    private get offlineNotification(): OfflineNotification {
        if (!this._offlineNotification) {
            this._offlineNotification = new OfflineNotification();
        }
        return this._offlineNotification;
    }

    private loadPageWithSearchTerm(e : CustomEvent<string>): void {
        AppState.pageInfo.filter = e.detail;
        const filter: string = e.detail;
        this.send(new CustomEvent('FETCH', { detail: { filter, page: 1 } }));
    }

    private loadNextPageIfPossible(e: Event): void {
        if (AppState.pageInfo.next) {
            const filter: string = AppState.pageInfo.filter;
            const page: number = AppState.pageInfo.next;
            this.send(new CustomEvent('FETCH', { detail: { filter, page } }));
        } else {
            this.send(new CustomEvent('NO_MORE_PAGES'));
        }
    }

    private loadPreviousPageIfPossible(): void {
        if (AppState.pageInfo.prev) {
            const filter: string = AppState.pageInfo.filter;
            const page: number = AppState.pageInfo.prev;
            this.send(new CustomEvent('FETCH', { detail: { filter, page } }));
        } else {
            this.send(new CustomEvent('NO_MORE_PAGES'));
        }
    }

    private async getPageWithGraphQL(e: CustomEvent<{ filter: string, page: number }>): Promise<void> {
        try {
            const characterPage = await GraphQL.getCharacterPage(e.detail.filter, e.detail.page);
            this.send(new CustomEvent('RESULT', { detail: characterPage }));
        } catch (error) {
            this.send(new CustomEvent('offline'));
        }
    }

    private updateAppState(e: CustomEvent<CharacterPageSchema>): void {
        AppState.characters.removeAll();
        if (e.detail.data.characters) {
            const info: InfoSchema = e.detail.data.characters.info;
            const results: Array<CharacterSchema> = e.detail.data.characters.results;
            AppState.pageInfo.update(info);
            AppState.characters.addItems(results);
            if (info.prev) {
                AppState.pageInfo.page = info.prev + 1;
            } else if (info.next) {
                AppState.pageInfo.page = info.next - 1;
            } else {
                AppState.pageInfo.page = 1;
            }
        } else {
            AppState.pageInfo.prev = null;
            AppState.pageInfo.next = null;
            AppState.pageInfo.pages = 0;
            AppState.pageInfo.page = 0;
        }
    }
}
