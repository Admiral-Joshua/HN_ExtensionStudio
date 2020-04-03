export class HN_Mission {
    missionId: number
    id: string
    activeCheck: boolean
    shouldIgnoreSenderVerification: boolean
    missionStart: string
    missionEnd: string
    nextMission: number
    IsSilent: boolean
    emailId: number
    postingId: number

    goals: HN_MissionGoal[]
    email: HN_Email
}

export class HN_Email {
    emailId: number
    sender: string
    subject: string
    body: string
}

export class HN_BoardPost {
    postingId: number
    title: string
    reqs: string
    requiredRank: number
    content: string
}

export class HN_MissionGoal {
    goalId: number
    typeId: number
    typeText: string

    targetNodeId: number
    target: string
    file: string
    path: string
    keyword: string
    removal: boolean
    caseSensitive: boolean
    owner: string
    degree: string
    uni: string
    gpa: string
    mailServer: string
    recipient: string
    subject: string
    delay: number
}

export class HN_MGoalType {
    typeId: number
    typeText: string
}
