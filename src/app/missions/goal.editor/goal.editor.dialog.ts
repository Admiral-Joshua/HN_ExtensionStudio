import { Component, OnInit, Inject } from "@angular/core";
import { HN_MGoalType, HN_MissionGoal } from '../models';
import { MissionService } from '../missions.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { HN_CompNode } from 'src/app/models';
import { NodesService } from 'src/app/nodes/nodes.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: "./goal.editor.dialog.html"
})
export class GoalEditorDialogComponent implements OnInit {
    missionId: number = 0
    goalId: number = 0
    typeText: string = ''
    goalTypes: HN_MGoalType[] = []
    possibleNodes: HN_CompNode[] = []

    goalForm = new FormGroup({
        typeId: new FormControl(0),

        targetNodeId: new FormControl(0),
        file: new FormControl(''),
        path: new FormControl(''),
        target: new FormControl(''),
        delay: new FormControl(0),

        keyword: new FormControl(''),

        removal: new FormControl(false),
        caseSensitive: new FormControl(false),

        owner: new FormControl(''),

        degree: new FormControl(''),
        uni: new FormControl(''),
        gpa: new FormControl(''),

        mailServer: new FormControl(''),
        recipient: new FormControl(''),
        subject: new FormControl('')
    })

    visibleFields: string[] = []

    // If goal is selected, load that.
    constructor(private snackbar: MatSnackBar, private dialogRef: MatDialogRef<GoalEditorDialogComponent>, private service: MissionService, private compService: NodesService, private cookieService: CookieService, @Inject(MAT_DIALOG_DATA) private data) {
        if (this.data.goalId) {
            this.goalId = this.data.goalId;
        }
        if (this.data.missionId) {
            this.missionId = this.data.missionId;
        }
    }

    ngOnInit() {
        // Set-up change detection on type selection
        this.goalForm.get('typeId').valueChanges.subscribe(value => {
            // Get the Goal Type string
            let goalTypeString = this.goalTypes.find(goalType => goalType.typeId === value).typeText;
            this.updateVisibleFields(goalTypeString);
        });

        this.service.getGoalTypes().subscribe(types => {
            this.goalTypes = types;
        });
        let extensionId = parseInt(this.cookieService.get('extId'));
        this.compService.getAllNodes(extensionId).subscribe(nodes => {
            this.possibleNodes = nodes;

            if (this.goalId > 0) {
                this.service.getGoalInfo(this.goalId).subscribe(info => {
                    this.goalToForm(info);
                });
            }
        });

    }

    goalToForm(goal: HN_MissionGoal) {

        this.goalForm.patchValue({
            caseSensitive : goal.caseSensitive,
            degree : goal.degree,
            delay : goal.delay,
            file : goal.file,
            gpa : goal.gpa,
            keyword : goal.keyword,
            mailServer : goal.mailServer,
            owner : goal.owner,
            path : goal.path,
            recipient : goal.recipient,
            removal : goal.removal,
            subject : goal.subject,
            target : goal.target,
            targetNodeId : goal.targetNodeId,
            typeId : goal.typeId,
            uni : goal.uni
        });
    }

    updateVisibleFields(txtValue: string) {
        this.typeText = txtValue;
        this.visibleFields = [];
        switch (txtValue) {
            case 'delay':
                this.visibleFields.push('delay');
                break;
            case 'filechange':
                this.visibleFields.push('keyword');
                this.visibleFields.push('removal');
                this.visibleFields.push('caseSensitive');
            case 'filedownload':
            case 'filedeletion':
                this.visibleFields.push('file');
            case 'clearfolder':
                this.visibleFields.push('targetNodeId');
                this.visibleFields.push('path');
                break;
            case 'fileupload':
                this.visibleFields.push('destTarget');
                this.visibleFields.push('destPath'); // DOUBLE CHECK DESTINATION FIELD(S)
                this.visibleFields.push('decrypt');
                this.visibleFields.push('decryptPass');
                this.visibleFields.push('targetNodeId');
                this.visibleFields.push('file');
                this.visibleFields.push('path');
                break;
            case 'getadmin':
            case 'getadminpasswordstring':
                this.visibleFields.push('targetNodeId');
                break;
            case 'getstring':
            case 'hasFlag':
                this.visibleFields.push('target');
                break;
            case 'AddDegree':
                this.visibleFields.push('degree');
                this.visibleFields.push('uni');
                this.visibleFields.push('gpa');
            case 'wipedegrees':
                this.visibleFields.push('owner');
                break;
            case 'sendemail':
                this.visibleFields.push('mailServer');
                this.visibleFields.push('recipient');
                this.visibleFields.push('subject');
                break;
            default:
                this.visibleFields = [];
        }
    }

    formToGoal(): HN_MissionGoal {
        let retVal: HN_MissionGoal = new HN_MissionGoal();

        retVal.caseSensitive = this.goalForm.get('caseSensitive').value;
        retVal.degree = this.goalForm.get('degree').value;
        retVal.delay = this.goalForm.get('delay').value;
        retVal.file = this.goalForm.get('file').value;
        retVal.gpa = this.goalForm.get('gpa').value;
        retVal.keyword = this.goalForm.get('keyword').value;
        retVal.mailServer = this.goalForm.get('mailServer').value;
        retVal.owner = this.goalForm.get('owner').value;
        retVal.path = this.goalForm.get('path').value;
        retVal.recipient = this.goalForm.get('recipient').value;
        retVal.removal = this.goalForm.get('removal').value;
        retVal.subject = this.goalForm.get('subject').value;
        retVal.target = this.goalForm.get('target').value;
        retVal.targetNodeId = this.goalForm.get('targetNodeId').value;
        retVal.typeId = this.goalForm.get('typeId').value;
        retVal.uni = this.goalForm.get('uni').value;

        if (this.goalId > 0) {
            retVal.goalId = this.goalId;
        }
        retVal.typeText = this.typeText;

        return retVal;
    }

    cancel() {
        this.dialogRef.close();
    }

    saveGoal() {
        let goalInfo = this.formToGoal();
        
        if (this.goalId > 0) {
            // Update existing goal
            this.service.updateGoal(this.goalId, goalInfo).subscribe(info => {
                this.goalToForm(info);
                this.snackbar.open('Changes Saved Successfully', '', {
                    duration: 1000
                })
                this.dialogRef.close(info);
            });
        } else {
            this.service.createGoal(goalInfo).subscribe(info => {
                this.goalId = info.goalId;
                this.goalToForm(info);
                this.snackbar.open('Goal Created Successfully', '', {
                    duration: 1000
                });
                this.dialogRef.close(info);
            });
        }
    }
}