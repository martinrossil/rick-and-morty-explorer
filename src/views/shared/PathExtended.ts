import { PathElement } from 'enta';

export default class PathExtended extends PathElement {
    public constructor() {
        super();
        this.name = 'PathExtended';
    }
}
customElements.define('path-extended', PathExtended);
