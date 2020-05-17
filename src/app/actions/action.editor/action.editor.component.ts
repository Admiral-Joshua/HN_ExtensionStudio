import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { HN_MissionFunction } from 'src/app/missions/models';
import { ActionsService } from '../actions.service';
import { HN_Action } from '../models';
import { FileSelectorSource } from 'src/app/elems/file-selector/file-selector.component';
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
    templateUrl: "./action.editor.component.html"
})
export class ActionEditorComponent {
    actionId: number = 0

    actionData: HN_Action

    functionData: HN_MissionFunction

    visibleFields: string[] = []

    fileSelectorSource: FileSelectorSource = FileSelectorSource.TARGET

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private service: ActionsService, private dialogRef: MatDialogRef<ActionEditorComponent>) {
        if (data && data.actionId) {
            this.actionId = data.actionId;
        }
    }

    ngOnInit() {
        if (this.actionId > 0) {
            this.service.getAction(this.actionId).subscribe(actionInfo => {
                this.actionData = actionInfo;

                this.updateVisibleFields();
            });
        }
    }

    updateVisibleFields() {
        this.visibleFields = [];

        switch (this.actionData.typeId) {
            case 1:
                this.visibleFields.push('function');
                break;
            case 21:
                this.visibleFields.push('newIP');
                this.visibleFields.push('targetNode');
                break;
            case 3:
            case 4:
            case 10:
                this.fileSelectorSource = this.actionData.typeId === 3 ? FileSelectorSource.ALL : FileSelectorSource.TARGET;
                this.visibleFields.push('fileSelector');
            case 9:
            case 19:
                this.visibleFields.push('targetNode');
                break;
            case 13:
                this.visibleFields.push('theme');
                break;
            default:
                console.log("Action Type not recognised, could not display appropriate fields.");

        }
    }

    close() {
        this.dialogRef.close();
    }

    save() {
        this.service.updateAction(this.actionId, this.actionData).subscribe(() => {
            this.dialogRef.close();
        })
    }

}