import { IColor, Color } from 'enta';

export default class Colors {
    public static WHITE: IColor = new Color(0, 0, 100);
    public static OFFLINE: IColor = new Color(0, 0, 0, 0.2);
    public static TRANSPARENT: IColor = new Color(0, 0, 100, 0.0);
    public static WARM_GRAY_100: IColor = new Color(60, 5, 96);
    public static BLUE_GRAY_50: IColor = new Color(210, 40, 98);
    public static BLUE_GRAY_100: IColor = new Color(210, 40, 96);
    public static BLUE_GRAY_200: IColor = new Color(214, 32, 91);
    public static BLUE_GRAY_500: IColor = new Color(215, 16, 47);
    public static BLUE_GRAY_700: IColor = new Color(215, 25, 27);
    public static BLUE_GRAY_900: IColor = new Color(222, 47, 11);
    public static BLUE_200: IColor = new Color(213, 97, 87);
    public static BLUE_500: IColor = new Color(217, 91, 60);
    public static BLUE_700: IColor = new Color(224, 76, 48);
    public static BLUE_500_OPACITY_20: IColor = new Color(217, 91, 60, 0.2);
    public static RED_200: IColor = new Color(0, 96, 89);
    public static RED_700: IColor = new Color(0, 74, 42);
    public static GREEN_200: IColor = new Color(141, 79, 85);
    public static GREEN_700: IColor = new Color(142, 72, 29);
    public static PINK_200: IColor = new Color(326, 85, 90);
    public static PINK_700: IColor = new Color(335, 78, 42);
    public static ORANGE_200: IColor = new Color(32, 98, 83);
    public static ORANGE_700: IColor = new Color(17, 88, 40);
    public static TEAL_200: IColor = new Color(168, 84, 78);
    public static TEAL_700: IColor = new Color(175, 77, 26);
}
