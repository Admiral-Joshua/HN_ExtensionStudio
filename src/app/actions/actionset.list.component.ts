import { Component } from "@angular/core"
import { HN_ActionSet } from './models'
import { ActionsService } from './actions.service'
import { MatDialog } from '@angular/material/dialog'
import { ActionEditorComponent } from './action.editor/action.edtor.component'
import { ActionsListComponent } from './action.viewer/action.list.component'

@Component({
    templateUrl: "./actionset.list.component.html"
})
export class ActionSetListComponent {
    columns: string[] = ["name", "actionCount"]

    actionSets: HN_ActionSet[]

    constructor(private dialog: MatDialog, private service: ActionsService) {}

    fetchActionSummary(actionSetId: number) {
        this.service.fetchActionSets().subscribe(summary => {
            this.actionSets = summary;
        })
    }

    openEditor(actionSet?: HN_ActionSet) {

        this.dialog.open(ActionsListComponent, {
            data: actionSet,
            width: "90%"
        })
    }

}