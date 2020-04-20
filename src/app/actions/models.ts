export class HN_ActionSet {
    actionSetId: number
    name: string
    count: number

    constructor(name: string) {
        this.name = name;
    }
}

export class HN_Action {
    actionId: number
    typeId: number
    typeText: string
    loadActionSetId: number
    loadMissionId: number
    switchThemeId: number
    fileId: number
    ircMessageId: number
    delayCompId: number
    Delay: number
    targetCompId: number
    functionId: number
    functionValue: string
}

export class IRCMessage {
    ircMessageId: number
    authorId: number
    message: string
}

export class IRCUser {
    ircUserId: number
    nodeId: number
    displayName: string
}

export class HN_ActionType {
    typeId: number
    typeText: string
}