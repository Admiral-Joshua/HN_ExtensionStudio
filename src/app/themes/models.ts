export class HN_Theme {
    themeId: number
    id: string = ''
    layoutId: number = 4
    LayoutName: string
    BackgroundImagePath: string

    defaultHighlightColor: string = '#FF293F'
    defaultTopBarColor: string = '#4A070E'

    moduleColorSolidDefault: string = '#00CC84'
    moduleColorStrong: string = '#0E2819'
    moduleColorBacking: string = '#050706'

    exeModuleTopBar: string = '#82411B'
    exeModuleTitleText: string = '#9B5525'

    warningColor: string = '#FF0000'
    subtleTextColor: string = '#5A5A5A'
    darkBackgroundColor: string = '#080808'
    indentBackgroundColor: string = '#0C0C0C'
    outlineColor: string = '#444444'

    lockedColor: string = '#411010'
    brightLockedColor: string = '#A00000'
    brightUnlockedColor: string = '#00A000'
    unlockedColor: string = '#274124'

    lightGray: string = '#274124'
    shellColor: string = '#DEC918'
    shellButtonColor: string = '#69BC18'
    semiTransText: string = '#787878'
    terminalTextColor: string = '#D5F5FF'
    topBarTextColor: string = '#7E7E7E'
    superLightWhite: string = '#020202'
    connectedNodeHighlight: string = '#DE0000'
    netmapToolTipColor: string = '#D5F5FF'
    netmapToolTipBackground: string = '#000000'
    topBarIconsColor: string = '#FFFFFF'
    thisComputerNode: string = '#5FDC53'
    scanlinesColor: string = '#FFFFFF'
}

export class HN_Layout {
    layoutId: number
    layout: string

    constructor(layoutId: number, layout: string) {
        this.layoutId = layoutId;
        this.layout = layout;
    }
}