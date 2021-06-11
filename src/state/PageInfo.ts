import { EventDispatcher } from 'enta';
import { InfoSchema } from '../graphql/schema/InfoSchema';

export default class PageInfo extends EventDispatcher {
    public constructor() {
        super();
        this.name = 'PageInfo';
    }

    public update(info: InfoSchema): void {
        this.count = info.count;
        this.pages = info.pages;
        this.prev = info.prev;
        this.next = info.next;
    }

    private _page = 0;
    public set page(value: number) {
        if (this._page === value) {
            return;
        }
        this._page = value;
        this.notifyChange();
    }

    public get page(): number {
        return this._page;
    }

    private _filter = '';
    public set filter(value: string) {
        if (this._filter === value) {
            return;
        }
        this._filter = value;
        this.notifyChange();
    }

    public get filter(): string {
        return this._filter;
    }

    private _count = NaN;
    public set count(value: number) {
        if (isNaN(this._count) && isNaN(value)) {
            return;
        }
        if (this._count === value) {
            return;
        }
        this._count = value;
        this.notifyChange();
    }

    public get count(): number {
        return this._count;
    }

    private _pages = NaN;
    public set pages(value: number) {
        if (isNaN(this._pages) && isNaN(value)) {
            return;
        }
        if (this._pages === value) {
            return;
        }
        this._pages = value;
        this.notifyChange();
    }

    public get pages(): number {
        return this._pages;
    }

    private _prev: number | null = null;
    public set prev(value: number | null) {
        if (this._prev === value) {
            return;
        }
        this._prev = value;
        this.notifyChange();
    }

    public get prev(): number | null {
        return this._prev;
    }

    private _next: number | null = null;
    public set next(value: number | null) {
        if (this._next === value) {
            return;
        }
        this._next = value;
        this.notifyChange();
    }

    public get next(): number | null {
        return this._next;
    }

    private notifyChange(): void {
        this.dispatch('changed');
    }
}
