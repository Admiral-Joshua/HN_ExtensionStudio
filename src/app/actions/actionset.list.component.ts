import { Component, OnInit } from "@angular/core"
import { HN_ActionSet } from './models'
import { ActionsService } from './actions.service'
import { MatDialog } from '@angular/material/dialog'
import { ActionSetEditorComponent } from './actionset.editor/actionset.editor.component'
import { DeleteConfirmationComponent } from '../dialogs/deleteConfirmDialog/delete.confirmation.component'

@Component({
    templateUrl: "./actionset.list.component.html"
})
export class ActionSetListComponent implements OnInit {
    columns: string[] = ["name", "actionCount", "actions"]

    actionSets: HN_ActionSet[]

    constructor(private dialog: MatDialog, private service: ActionsService) { }

    ngOnInit() {
        this.loadActionSetList();
    }

    loadActionSetList() {
        this.service.fetchActionSets().subscribe(summary => {
            this.actionSets = summary;
        })
    }

    deleteActionSet(actionSet: HN_ActionSet) {
        let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            data: {
                title: "Delete Conditional Action Set",
                msg: 'This will delete all conditions and actions under this conditional action set. Are you sure you\'d like to do this?'
            }
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.service.deleteActionSet(actionSet.actionSetId).subscribe(() => {
                    this.loadActionSetList();
                })
            }
        })
    }

    openEditor(actionSet?: HN_ActionSet) {

        let dialogRef = this.dialog.open(ActionSetEditorComponent, {
            data: actionSet,
            width: "90%"
        })

        dialogRef.afterClosed().subscribe(() => {
            this.loadActionSetList();
        });
    }

}