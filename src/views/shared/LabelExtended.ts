import { LabelElement } from 'enta';

export default class LabelExtended extends LabelElement {
    public constructor() {
        super();
        this.name = 'LabelExtended';
    }
}
customElements.define('label-extended', LabelExtended);
