import { Component, OnInit, Inject } from "@angular/core";
import { HN_Action, HN_ActionSet } from '../models';
import { ActionsService } from '../actions.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActionEditorComponent } from '../action.editor/action.edtor.component';
import { DeleteConfirmationComponent } from 'src/app/dialogs/deleteConfirmDialog/delete.confirmation.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    templateUrl: "./action.list.component.html"
})
export class ActionsListComponent implements OnInit {

    actionSetId: number
    actionSetInfo: HN_ActionSet = new HN_ActionSet('')

    actions: HN_Action[] = []

    infoForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('')
    })

    constructor(private dialogRef: MatDialogRef<ActionsListComponent>, private service: ActionsService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) {
        if (data && data.actionSetId > 0) {
            this.actionSetId = data.actionSetId;
        }
    }

    fetchActions() {
        this.service.fetchActions(this.actionSetId).subscribe(actions => {
            this.actions = actions;
        })
    }

    fetchInfo() {
        this.service.getActionSetInfo(this.actionSetId).subscribe(info => {
            this.actionSetInfo = info;
        });
    }

    ngOnInit() {
        if (this.actionSetId > 0) {
            this.fetchInfo();
            this.fetchActions();
        }
    }

    openEditor(actionId?: number) {
        let data: any = {};
        if (actionId) {
            data.actionId = actionId;
        }

        this.dialog.open(ActionEditorComponent, {
            data: data,
            width: "85%"
        })
    }

    saveActionSet() {

    }

    deleteAction(action: HN_Action) {
        // Confirm deletion
        let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            data: {
                msg: 'Are you sure you want to delete this action?',
                type: 'Action'
            }
        });

        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.service.deleteAction(action.actionId).subscribe(() => {
                    let idx = this.actions.findIndex(item => item.actionId === action.actionId);
                    if (idx > -1) {
                        this.actions.splice(idx, 1);
                    }
                });
            }
        });
    }

    close() {
        this.dialogRef.close();
    }
}