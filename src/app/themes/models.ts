export class HN_Theme {
    themeId: number;
    id = '';
    layoutId = 4;
    LayoutName: string;
    BackgroundImagePath: string;

    defaultHighlightColor = '#FF293F';
    defaultTopBarColor = '#4A070E';

    moduleColorSolidDefault = '#00CC84';
    moduleColorStrong = '#0E2819';
    //moduleColorBacking = 'rgba(5,7,6,0.30)';
    moduleColorBacking = {
        r: 5,
        g: 7,
        b: 6,
        a: 0.3
    };

    exeModuleTopBar = '#82411B';
    exeModuleTitleText = '#9B5525';

    warningColor = '#FF0000';
    subtleTextColor = '#5A5A5A';
    darkBackgroundColor = '#080808';
    indentBackgroundColor = '#0C0C0C';
    outlineColor = '#444444';

    lockedColor = '#411010';
    brightLockedColor = '#A00000';
    brightUnlockedColor = '#00A000';
    unlockedColor = '#274124';

    lightGray = '#274124';
    shellColor = '#DEC918';
    shellButtonColor = '#69BC18';
    semiTransText = '#787878';
    terminalTextColor = '#D5F5FF';
    topBarTextColor = '#7E7E7E';
    superLightWhite = '#020202';
    connectedNodeHighlight = '#DE0000';
    netmapToolTipColor = '#D5F5FF';
    netmapToolTipBackground = '#000000';
    topBarIconsColor = '#FFFFFF';
    thisComputerNode = '#5FDC53';
    scanlinesColor = {
        r: 255,
        g: 255,
        b: 255,
        a: 0.15
    };
}

export class HN_Layout {
    layoutId: number;
    layout: string;

    constructor(layoutId: number, layout: string) {
        this.layoutId = layoutId;
        this.layout = layout;
    }
}