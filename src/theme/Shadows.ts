import { BoxShadowFilter, Color, IFilter } from 'enta';

export default class Shadows {
    public static BOX_SHADOW_1: IFilter = new BoxShadowFilter(0, 4, 3, NaN, new Color(0, 0, 0, 0.07));
    public static BOX_SHADOW_2: IFilter = new BoxShadowFilter(0, 2, 2, NaN, new Color(0, 0, 0, 0.06));
    public static BOX_SHADOW_3: IFilter = new BoxShadowFilter(0, -4, 3, NaN, new Color(0, 0, 0, 0.07));
    public static BOX_SHADOW_4: IFilter = new BoxShadowFilter(0, -2, 2, NaN, new Color(0, 0, 0, 0.06));
    public static INNER_SHADOW_1: IFilter = new BoxShadowFilter(0, 4, 4, NaN, new Color(0, 0, 0, 0.37), true);
    public static INNER_SHADOW_2: IFilter = new BoxShadowFilter(0, -4, 4, NaN, new Color(0, 0, 0, 0.37), true);
    public static INNER_SHADOW_3: IFilter = new BoxShadowFilter(2, 2, 2, NaN, new Color(0, 0, 0, 0.07), true);
    public static INNER_SHADOW_4: IFilter = new BoxShadowFilter(-2, -2, 2, NaN, new Color(0, 0, 0, 0.07), true);
}
