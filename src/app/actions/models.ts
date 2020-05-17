export class HN_ActionSet {
    actionSetId: number
    name: string
    //actions: HN_Action[] = []
    conditions: HN_ActionCondition[]

    constructor(name: string) {
        this.name = name;
    }
}

export class HN_ActionCondition {
    conditionId: number
    typeId: number
    typeText: string
    needsMissionComplete: boolean = false
    requiredFlags: string = ''
    targetNodeId: number
    actions: HN_Action[]
    actionSetId: number

    constructor(typeId?: number, typeText?: string) {
        this.typeId = typeId || 0;
        this.typeText = typeText || '';
        this.actions = [];
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
    conditionId: number
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

export class HN_ConditionType extends HN_ActionType {
}