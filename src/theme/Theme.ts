import { IColor, Color, IFilter, BoxShadowFilter, ITypeFace, TypeFace } from 'enta';
export default class Theme {
    public static BOX_SHADOW_1: IFilter = new BoxShadowFilter(0, 4, 3, NaN, new Color(0, 0, 0, 0.07));
    public static BOX_SHADOW_2: IFilter = new BoxShadowFilter(0, 2, 2, NaN, new Color(0, 0, 0, 0.06));
    public static BOX_SHADOW_3: IFilter = new BoxShadowFilter(0, -4, 3, NaN, new Color(0, 0, 0, 0.07));
    public static BOX_SHADOW_4: IFilter = new BoxShadowFilter(0, -2, 2, NaN, new Color(0, 0, 0, 0.06));
    public static INNER_SHADOW_1: IFilter = new BoxShadowFilter(0, 4, 4, NaN, new Color(0, 0, 0, 0.37), true);
    public static INNER_SHADOW_2: IFilter = new BoxShadowFilter(0, -4, 4, NaN, new Color(0, 0, 0, 0.37), true);
    public static INNER_SHADOW_3: IFilter = new BoxShadowFilter(2, 2, 2, NaN, new Color(0, 0, 0, 0.07), true);
    public static INNER_SHADOW_4: IFilter = new BoxShadowFilter(-2, -2, 2, NaN, new Color(0, 0, 0, 0.07), true);
    public static TYPEFACE_REGULAR: ITypeFace = new TypeFace('SK-Modernist', 0.69, 0.05, -0.06);
    public static TYPEFACE_BOLD: ITypeFace = new TypeFace('SK-Modernist', 0.69, 0.05, -0.06);
    public static AVATAR_URL = 'https://rickandmortyapi.com/api/character/avatar/';
    public static SEARCH = 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z';
    public static ARROW_BACK = 'M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z';
    public static ARROW_FORWARD = 'M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z';
}
