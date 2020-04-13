export class HN_Theme {
    themeId: number
    id: string

    LayoutName: string
    BackgroundImagePath: string
    
    defaultHighlightColor: string
    defaultTopBarColor: string
    moduleColorSolidDefault: string
    moduleColorStrong: string
    moduleColorBacking: string
    exeModuleTopBar: string
    exeModuleTitleText: string
    warningColor: string
    subtleTextColor: string
    darkBackgroundColor: string
    indentBackgroundColor: string
    outlineColor: string
    lockedColor: string
    brightLockedColor: string
    brightUnlockedColor: string
    unlockedColor: string
    lightGray: string
    shellColor: string
    shellButtonColor: string
    semiTransText: string
    terminalTextColor: string
    topBarTextColor: string
    superLightWhite: string
    connectedNodeHighlight: string
    netmapToolTipColor: string
    netmapToolTipBackground: string
    topBarIconsColor: string
    thisComputerNode: string
    scanlinesColor: string

    constructor(layout?: string) {
        this.LayoutName = layout || 'HacknetBlue';
    }
}

export class HN_Layout {
    layoutId: number
    layout: string

    constructor(layoutId: number, layout: string) {
        this.layoutId = layoutId;
        this.layout = layout;
    }
}