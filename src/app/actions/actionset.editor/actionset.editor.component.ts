import { Component, Inject } from "@angular/core";
import { ActionsService } from '../actions.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HN_Action, HN_ActionSet, HN_ActionCondition, HN_ConditionType, HN_ActionType } from '../models';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { DeleteConfirmationComponent } from 'src/app/dialogs/deleteConfirmDialog/delete.confirmation.component';
import { ActionEditorComponent } from '../action.editor/action.editor.component';

@Component({
    templateUrl: "./actionset.editor.component.html"
})
export class ActionSetEditorComponent {
    actionSetId: number = 0

    actionInfoForm = new FormGroup({
        name: new FormControl('')
    })

    conditions: HN_ActionCondition[] = []

    conditionTypeSelector = new FormControl(0)

    conditionTypes: HN_ConditionType[] = []

    conditionInfoForm = new FormGroup({
        requiredFlags: new FormControl(''),
        needsMissionComplete: new FormControl(false)
    })

    actionTypeSelector = new FormControl(0)

    actionTypes: HN_ActionType[] = []

    constructor(private dialog: MatDialog, private service: ActionsService, @Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<ActionSetEditorComponent>, private snackbar: MatSnackBar) {
        if (data && data.actionSetId > 0) {
            this.actionSetId = data.actionSetId;
        }
    }

    openActionEditor(conditionId: number, actionId: number) {
        let dialogRef = this.dialog.open(ActionEditorComponent, {
            data: {
                actionId: actionId
            }
        })
        dialogRef.afterClosed().subscribe(() => {
            this.reloadConditionActions(conditionId);
        })
    }

    ngOnInit() {
        if (this.actionSetId > 0) {
            this.loadActionSet();
        }

        this.service.getConditionTypes().subscribe(types => {
            this.conditionTypes = types;
        })

        this.service.getActionTypes().subscribe(types => {
            this.actionTypes = types;
        })
    }

    loadActionSet() {
        if (this.actionSetId > 0) {
            this.service.getActionSetInfo(this.actionSetId).subscribe(actionset => {
                this.actionInfoForm.patchValue({
                    name: actionset.name
                })

                this.conditions = actionset.conditions;
            })
        }
    }

    deleteCondition(condition: HN_ActionCondition) {
        let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            data: {
                title: 'Delete Action Condition',
                msg: 'This will delete this condition and all actions underneath it. Are you sure you want to do this?'
            }
        })

        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.service.deleteActionCondition(condition.conditionId).subscribe(() => {
                    this.snackbar.open('Deleted Action Condition Successfully!', '', {
                        duration: 1200
                    });
                    this.loadActionSet();
                })
            }
        })
    }

    addCondition() {
        let conditionTypeId = this.conditionTypeSelector.value;

        if (conditionTypeId > 0) {
            let conditionText = this.conditionTypes.find(type => type.typeId === conditionTypeId).typeText;

            let newCondition = new HN_ActionCondition(conditionTypeId, conditionText);
            newCondition.actionSetId = this.actionSetId;

            this.service.createActionCondition(newCondition).subscribe(res => {
                this.snackbar.open('Added Action Condition Successfully!', '', {
                    duration: 1200
                });
                this.conditions.push(res);
            });
        }

        this.conditionTypeSelector.setValue(0);
    }

    formToActionSet(): HN_ActionSet {
        let retVal = new HN_ActionSet(this.actionInfoForm.get('name').value);

        retVal.conditions = this.conditions;

        return retVal;
    }

    actionSetToForm(actionSet: HN_ActionSet) {
        this.actionSetId = actionSet.actionSetId;
        this.conditions = actionSet.conditions;
    }

    saveActionSet() {
        if (this.actionSetId > 0) {
            this.service.updateActionSet(this.actionSetId, this.formToActionSet()).subscribe(res => {
                this.snackbar.open('Conditional Action Set saved successfully!', '', {
                    duration: 1200
                })
            })
        } else {
            this.service.createActionSet(this.formToActionSet()).subscribe(res => {
                this.actionSetToForm(res);

                this.snackbar.open('Conditional Action Set created successfully!', '', {
                    duration: 1500
                });
            })
        }
    }

    close() {
        this.dialogRef.close();
    }

    reloadConditionActions(conditionId: number) {
        this.service.reloadConditionActions(conditionId).subscribe(actions => {
            let idx = this.conditions.findIndex(condition => condition.conditionId === conditionId);

            if (idx > -1) {
                this.conditions[idx].actions = actions;
            }
        })
    }

    createAction(conditionId: number) {
        let typeId = this.actionTypeSelector.value;
        let typeText = this.actionTypes.find(type => type.typeId === typeId).typeText;

        let newAction = new HN_Action();
        newAction.conditionId = conditionId;
        newAction.typeId = typeId;
        newAction.typeText = typeText;

        this.service.createAction(newAction).subscribe(() => {
            this.snackbar.open('Action Added', '', {
                duration: 1200
            });

            this.reloadConditionActions(conditionId);
        })
    }


}