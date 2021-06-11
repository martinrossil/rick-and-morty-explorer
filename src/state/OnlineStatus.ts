import { EventDispatcher } from 'enta';

export default class OnlineStatus extends EventDispatcher {
    public constructor() {
        super();
        this.name = 'OnlineStatus';
    }

    private _online = true;
    public set online(value: boolean) {
        if (this._online === value) {
            return;
        }
        this._online = value;
        this.dispatch('changed');
    }

    public get online(): boolean {
        return this._online;
    }

    private _hasOfflineNotificationBeenShown = false;
    public set hasOfflineNotificationBeenShown(value: boolean) {
        if (this._hasOfflineNotificationBeenShown === value) {
            return;
        }
        this._hasOfflineNotificationBeenShown = value;
    }

    public get hasOfflineNotificationBeenShown(): boolean {
        return this._hasOfflineNotificationBeenShown;
    }
}
