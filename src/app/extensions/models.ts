import { HN_CompNode } from '../models'

/*
"extensionId": 1,
"extensionName": "Test Extension 1",
"languageId": 1,
"allowSaves": true,
"description": "A short test extension to see how the Extensions API works.",
"startingThemeId": null,
"startingMusic": 3,
"startingMissionId": null,
"workshop_description": null,
"workshop_language": null,
"workshop_visibility": null,
"workshop_tags": null,
"workshop_img": null,
"workshop_id": null
*/
export class ExtensionInfo {
    extensionId: number
    extensionName: string
    languageId: number
    allowSaves: boolean
    description: string
    startingThemeId: number
    startingMusic: number
    startingMissionId: number
    workshop_description: string
    workshop_language: string
    workshop_visibility: number
    workshop_tags: string
    workshop_img: string
    workshop_id: string
    startingNodes: number[]

    Language: string
}

export class ExtensionLanguage {
    langId: number
    lang: string
    Language: string
}