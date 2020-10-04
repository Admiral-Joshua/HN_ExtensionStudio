/*
 musicId | ownerId |    title*/
export class HN_MusicTrack {
    musicId: number
    ownerId: number
    title: string
    track: File
    player: HTMLAudioElement
}

export class HN_CompType {
    typeId: number
    typeText: string

    constructor(typeId: number, typeText: string) {
        this.typeId = typeId;
        this.typeText = typeText;
    }
}

export class HN_CompNode {
    nodeId: number
    id: string
    name: string
    ip: string
    securityLevel: number
    allowsDefaultBootModule: boolean
    icon: string
    typeId: number
    adminPass: string
    portsForCrack: number
    traceTime: number
    files: HN_CompFile[]
    ports: HN_Port[]
    tracker: boolean
    fwall_Level: number
    fwall_solution: string
    fwall_additional: number
    proxyTime: number

    adminInfoId: number // TODO: Proper Admin Handling
    visibleAtStartup: boolean
}

export class HN_Port {
    portId: number
    port: number
    portType: string
}

export class HN_CompFile {
    fileId: number
    path: string
    name: string
    contents: string

    constructor(path: string, name: string, contents?: string, fileId?: number) {
        this.path = path;
        this.name = name;
        this.contents = contents || '';
        this.fileId = fileId;
    }
}

export class HN_FileTemplate extends HN_CompFile {
    templateId: number
}