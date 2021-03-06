import { DisplayContainer, IPathElement, ViewBox } from 'enta';
import AppState from '../../state/AppState';
import Colors from '../../theme/Colors';
import Icons from '../../theme/Icons';
import Shadows from '../../theme/Shadows';
import Typography from '../../theme/Typography';
import PathExtended from './PathExtended';

export default class SearchField extends DisplayContainer {
    public constructor(width = NaN, percentWidth = NaN, height = NaN, right = NaN) {
        super();
        this.name = 'SearchField';
        this.size(width, height);
        this.percentWidth = percentWidth;
        this.right = right;
        this.backgroundColor = Colors.WHITE;
        this.cornerSize = 8;
        this.alignVertical = 'middle';
        this.addFilter(Shadows.INNER_SHADOW_3);
        this.addFilter(Shadows.INNER_SHADOW_4);
        this.input.addEventListener('input', () => {
            this.dispatch('SEARCH', this.input.value, true);
        });
        AppState.onlineStatus.addEventListener('changed', () => {
            if (AppState.onlineStatus.online) {
                this.path.fillColor = Colors.BLUE_500;
                this.input.style.color = Colors.BLUE_500.toString();
            } else {
                this.path.fillColor = Colors.BLUE_GRAY_500;
                this.input.style.color = Colors.BLUE_GRAY_500.toString();
            }
        });
        this.addElement(this.path);
        this.appendChild(this.input);
    }

    private _path!: IPathElement;
    private get path(): IPathElement {
        if (!this._path) {
            this._path = new PathExtended();
            this._path.size(24, 24);
            this._path.viewBox = new ViewBox(0, 0, 24, 24);
            this._path.pathData = Icons.SEARCH;
            this._path.fillColor = Colors.BLUE_500;
            this._path.alignVertical = 'middle';
            this._path.left = 8;
        }
        return this._path;
    }

    private _input!: HTMLInputElement;
    private get input(): HTMLInputElement {
        if (!this._input) {
            this._input = document.createElement('input');
            this._input.style.backgroundColor = 'transparent';
            this._input.style.outline = 'none';
            this._input.style.border = 'none';
            this._input.style.position = 'absolute';
            this._input.style.transform = 'translateX(40px)';
            this._input.style.width = this.width - 64 + 'px';
            this._input.style.height = this.height - 4 + 'px';
            this._input.style.fontFamily = Typography.TYPEFACE_BOLD.fontFamily;
            this._input.style.fontSize = 18 + 'px';
            this._input.style.color = Colors.BLUE_500.toString();
            this._input.style.fontWeight = '700';
            this._input.setAttribute('aria-label', 'Search')
        }
        return this._input;
    }
}
customElements.define('search-field', SearchField);
