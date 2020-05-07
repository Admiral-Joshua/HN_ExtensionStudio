import { Component, Inject, OnInit } from "@angular/core";
import { ActionsService } from '../actions.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HN_Action, HN_ActionType, HN_ActionSet } from '../models';
import { HN_Mission, HN_MissionFunction } from 'src/app/missions/models';
import { HN_Theme } from 'src/app/themes/models';
import { HN_CompNode } from 'src/app/models';
import { MissionService } from 'src/app/missions/missions.service';

@Component({
    templateUrl: "./action.editor.component.html"
})
export class ActionEditorComponent implements OnInit {
    actionId: number

    actionTypes: HN_ActionType[] = []

    visibleFields: string[] = []

    actionForm = new FormGroup({
        typeId: new FormControl(0),
        typeText: new FormControl(''),
        loadActionSetId: new FormControl(0),
        loadMissionId: new FormControl(0),
        switchThemeId: new FormControl(0),
        fileId: new FormControl(0),
        ircMessageId: new FormControl(0), 
        delayCompId: new FormControl(0),
        Delay: new FormControl(0),
        targetCompId: new FormControl(0),
        functionId: new FormControl(0),
        functionValue: new FormControl('')
    })

    possibleActionSets: HN_ActionSet[] = [];
    possibleMissions: HN_Mission[] = [];
    possibleThemes: HN_Theme[] = [];
    possibleNodes: HN_CompNode[] = [];
    possibleFunctions: HN_MissionFunction[] = [];

    constructor(private dialogRef: MatDialogRef<ActionEditorComponent>,
        private missionService: MissionService,
        private service: ActionsService,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        if (data && data.actionId > 0) {
            this.actionId = data.actionId;
        }
    }

    ngOnInit() {
        this.service.getActionTypes().subscribe(types => {
            this.actionTypes = types;
        })

        this.actionForm.get('typeId').valueChanges.subscribe(value => {
            this.updateVisibleFields(value);
        })
    }

    updateVisibleFields(typeId: number) {
        this.visibleFields = [];

        switch(typeId) {
            case 1:
                this.visibleFields.push('function');
                break;
            case 2:
                this.visibleFields.push('mission');
                break;
            case 10:
                this.visibleFields.push('comp');
            case 3:
            case 4:
                this.visibleFields.push('file');
                break;
            case 5: 
            case 6:
                this.visibleFields.push('comp');
                this.visibleFields.push('mission');
                break;
            case 9:
                this.visibleFields.push('comp');
                break;
            case 13:
                this.visibleFields.push('theme');
                break;

            
        }

        if (this.visibleFields.includes('function')) {
            this.missionService.getFunctionsList().subscribe(functions => {
                this.possibleFunctions = functions;
            })
        }

        if (this.visibleFields.includes('mission')) {
            this.missionService.getMissionList().subscribe(missions => {
                this.possibleMissions = missions;
            });
        }
    }

    selectFile(fileId: number) {
        if (fileId > 0) {
            this.actionForm.patchValue({
                fileId: fileId
            })
        }
    }
    
    formToAction() : HN_Action {
        let retVal = new HN_Action();

        Object.assign(retVal, this.actionForm.value);
        retVal.actionId = this.actionId;

        return retVal;
    }
    
    saveAction() {
        let actionInfo = this.formToAction();
        if (this.actionId > 0) {
            this.service.updateAction(this.actionId, actionInfo).subscribe((res) => {
                this.dialogRef.close(res);
            });
        } else {
            this.service.createAction(actionInfo).subscribe(res => {
                this.dialogRef.close(res);
            })
        }
    }

    close() {
        this.dialogRef.close();
    }
}