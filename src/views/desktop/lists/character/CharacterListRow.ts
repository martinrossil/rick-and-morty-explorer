import { ItemRenderer, IDisplayElement } from 'enta';
import { CharacterSchema } from '../../../../graphql/schema/CharacterSchema';
import Factory from '../../../shared/Factory';
import MaximizedRow from './maximized/MaximizedRow';
import MinimizedRow from './minimized/MinimizedRow';

export default class CharacterListRow extends ItemRenderer<CharacterSchema> {
    public constructor() {
        super();
        this.name = 'CharacterListRow';
        this.percentWidth = 100;
        this.height = 72;
        this.clip = 'hidden';
        this.addElements([this.maximizedRow, this.minimizedRow, this.line]);
    }

    protected dataChanged(): void {
        if (this.data) {
            if (!this.selected) {
                this.minimizedRow.character = this.data;
            } else {
                this.maximizedRow.character = this.data;
            }
        }
    }

    protected selectedChanged(): void {
        if (this.selected) {
            this.height = 232;
            this.minimizedRow.visible = false;
            this.maximizedRow.visible = true;
            this.maximizedRow.character = this.data;
        } else {
            this.height = 72;
            this.minimizedRow.visible = true;
            this.maximizedRow.visible = false
            this.minimizedRow.character = this.data;
        }
    }

    private minimizedRow: MinimizedRow = new MinimizedRow();
    private maximizedRow: MaximizedRow = new MaximizedRow();
    private line: IDisplayElement = Factory.line();
}
customElements.define('character-list-row', CharacterListRow);
