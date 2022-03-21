import { ArrayCollection, DisplayContainer, HorizontalLayout, IDisplayContainer, ILabelElement, ItemRenderer, VerticalLayout } from 'enta';
import { CharacterSchema } from '../../../graphql/schema/CharacterSchema';
import Factory from '../../shared/Factory';
import Chip from '../../shared/Chip';
import MobileEpisodesList from './MobileEpisodesList';
import Colors from '../../../theme/Colors';
import Avatar from '../../shared/Avatar';
import Shadows from '../../../theme/Shadows';

export default class MobileCharacterListRow extends ItemRenderer<CharacterSchema> {
    public constructor() {
        super();
        this.name = 'CharacterListRow';
        this.cursor = 'pointer';
        this.percentWidth = 100;
        this.height = 80;
        this.clip = 'hidden';
        this.cornerSize = 8;
        this.padding = 16;
        this.backgroundColor = Colors.WHITE;
        this.gender.visible = false;
        this.status.visible = false;
        this.location.textColor = Colors.BLUE_GRAY_500;
        this.layout = new VerticalLayout(16);
        this.addFilter(Shadows.BOX_SHADOW_2);
        this.addElements([this.characterBlock, this.mobileEpisodesList]);
    }

    private _characterBlock!: IDisplayContainer;
    private get characterBlock(): IDisplayContainer {
        if (!this._characterBlock) {
            this._characterBlock = new DisplayContainer();
            this._characterBlock.percentWidth = 100;
            this._characterBlock.layout = new HorizontalLayout(16);
            this._characterBlock.addElements([this.avatar, this.textBlock]);
        }
        return this._characterBlock;
    }

    protected dataChanged(): void {
        if (this.data) {
            this.avatar.character = this.data;
            this.characterLabel.text = this.data.name;
            this.location.text = this.data.location.name;
            this.gender.text = this.data.gender;
            this.status.text = this.data.status;
        }
    }

    protected selectedChanged(): void {
        if (this.selected) {
            this.avatar.size(96, 96);
            this.avatar.strokeWidth = 3;
            this.height = NaN;
            this.textBlockLayout.verticalGap = 16;
            this.gender.visible = true;
            this.status.visible = true;
            this.style.cursor = 'none';
            if (this.data) {
                this.mobileEpisodesList.dataProvider = new ArrayCollection(this.data.episode);
            }
        } else {
            this.avatar.size(52, 52);
            this.avatar.strokeWidth = 1;
            this.height = 80;
            this.textBlockLayout.verticalGap = 8;
            this.gender.visible = false;
            this.status.visible = false;
            this.cursor = 'pointer';
        }
    }

    private _textBlock!: IDisplayContainer;
    private get textBlock(): IDisplayContainer {
        if (!this._textBlock) {
            this._textBlock = new DisplayContainer();
            this._textBlock.paddingTop = 12;
            this._textBlock.layout = this.textBlockLayout;
            this._textBlock.percentWidth = 100;
            this._textBlock.addElements([this.characterLabel, this.location, this.chipBlock]);
        }
        return this._textBlock;
    }

    private textBlockLayout: VerticalLayout = new VerticalLayout(8);

    private _chipBlock!: IDisplayContainer;
    private get chipBlock(): IDisplayContainer {
        if (!this._chipBlock) {
            this._chipBlock = new DisplayContainer();
            this._chipBlock.percentWidth = 100;
            this._chipBlock.height = 20;
            this._chipBlock.layout = new HorizontalLayout(16);
            this._chipBlock.addElements([this.gender, this.status]);
        }
        return this._chipBlock;
    }

    private avatar: Avatar = new Avatar(52, 1);
    private location: ILabelElement = Factory.regularLabel(100);
    private gender: Chip = new Chip();
    private status: Chip = new Chip();
    private characterLabel: ILabelElement = Factory.boldLabel(100, NaN, Colors.BLUE_GRAY_700);
    private mobileEpisodesList: MobileEpisodesList = new MobileEpisodesList();
}
customElements.define('mobile-character-list-row', MobileCharacterListRow);
