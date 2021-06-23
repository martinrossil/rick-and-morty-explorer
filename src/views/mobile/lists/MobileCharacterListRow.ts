import { ArrayCollection, DisplayContainer, HorizontalLayout, IDisplayContainer, IDisplayElement, IImageElement, ILabelElement, IPathElement, ItemRenderer, VerticalLayout, Cursor } from 'enta';
import { CharacterSchema } from '../../../graphql/schema/CharacterSchema';
import Theme from '../../../theme/Theme';
import Factory from '../../shared/Factory';
import Chip from '../../shared/Chip';
import MobileEpisodesList from './MobileEpisodesList';
import Colors from '../../../theme/Colors';

export default class MobileCharacterListRow extends ItemRenderer<CharacterSchema> {
    public constructor() {
        super();
        this.name = 'CharacterListRow';
        this.cursor = Cursor.POINTER;
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
        this.addFilter(Theme.BOX_SHADOW_2);
        this.addElements([this.characterBlock, this.mobileEpisodesList]);
    }

    private _characterBlock!: IDisplayContainer;
    private get characterBlock(): IDisplayContainer {
        if (!this._characterBlock) {
            this._characterBlock = new DisplayContainer();
            this._characterBlock.percentWidth = 100;
            this._characterBlock.layout = new HorizontalLayout(16);
            this._characterBlock.addElements([this.profileBlock, this.textBlock]);
        }
        return this._characterBlock;
    }

    protected dataChanged(): void {
        if (this.data) {
            this.profile.source = Theme.AVATAR_URL + this.data.id + '.jpeg';
            this.profile.alt = this.data.name;
            this.characterLabel.text = this.data.name;
            this.location.text = this.data.location.name;
            this.gender.text = this.data.gender;
            this.status.text = this.data.status;
        }
    }

    protected selectedChanged(): void {
        if (this.selected) {
            this.profileBlock.size(96, 96);
            this.height = NaN;
            this.profile.size(96, 96);
            this.profile.cornerSize = 48;
            this.shadowRing.size(96, 96);
            this.shadowRing.cornerSize = 48;
            this.profileRing.visible = false;
            this.profileRingLarge.visible = true;
            this.textBlockLayout.verticalGap = 16;
            this.gender.visible = true;
            this.status.visible = true;
            this.cursor = Cursor.NONE;
            if (this.data) {
                this.mobileEpisodesList.dataProvider = new ArrayCollection(this.data.episode);
            }
        } else {
            this.profileBlock.size(52, 52);
            this.height = 80;
            this.profile.size(52, 52);
            this.profile.cornerSize = 26;
            this.shadowRing.size(52, 52);
            this.shadowRing.cornerSize = 26;
            this.profileRing.visible = true;
            this.profileRingLarge.visible = false;
            this.textBlockLayout.verticalGap = 8;
            this.gender.visible = false;
            this.status.visible = false;
            this.cursor = Cursor.POINTER;
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

    private _profileBlock!: IDisplayContainer;
    private get profileBlock(): IDisplayContainer {
        if (!this._profileBlock) {
            this._profileBlock = new DisplayContainer();
            this._profileBlock.size(52, 52);
            this._profileBlock.cornerSize = 26;
            this.profileRingLarge.visible = false;
            this._profileBlock.addElements([this.profile, this.shadowRing, this.profileRing, this.profileRingLarge]);
        }
        return this._profileBlock;
    }

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

    private profile: IImageElement = Factory.profileImage(52, 52);
    private shadowRing: IDisplayElement = Factory.shadowRing(52);
    private profileRing: IPathElement = Factory.ring(52, 1);
    private profileRingLarge: IPathElement = Factory.ring(96, 3);
    private location: ILabelElement = Factory.regularLabel(100);
    private gender: Chip = new Chip();
    private status: Chip = new Chip();

    private _characterLabel!: ILabelElement;
    private get characterLabel(): ILabelElement {
        if (!this._characterLabel) {
            this._characterLabel = Factory.boldLabel(100);
            this._characterLabel.textColor = Colors.BLUE_GRAY_700;
            this._characterLabel.percentWidth = 100;
        }
        return this._characterLabel;
    }

    private mobileEpisodesList: MobileEpisodesList = new MobileEpisodesList();
}
customElements.define('mobile-character-list-row', MobileCharacterListRow);
