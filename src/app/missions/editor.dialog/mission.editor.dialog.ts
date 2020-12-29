import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MissionService } from '../missions.service';
import {HN_Mission, HN_MissionGoal, HN_MissionBranch, MissionFunction} from '../models';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { GoalEditorDialogComponent } from '../goal.editor/goal.editor.dialog';
import { DeleteConfirmationComponent } from 'src/app/dialogs/deleteConfirmDialog/delete.confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';

@Component({
    templateUrl: 'mission.editor.dialog.html'
})
export class MissionEditorDialogComponent implements OnInit {
    missionStart = new MissionFunction();

    missionEnd = new MissionFunction();

    goalsDisplayedColumns: string[] = ['id', 'type', 'actions'];
    missionId = 0;

    missionForm = new FormGroup({
        id: new FormControl(''),
        activeCheck: new FormControl(false),
        shouldIgnoreSenderVerification: new FormControl(false),
        nextMission: new FormControl(0),
        IsSilent: new FormControl(false),

        missionStart_function: new FormControl(''),
        missionStart_value: new FormControl(0),
        missionStart_suppress: new FormControl(false),

        missionEnd_function: new FormControl(''),
        missionEnd_value: new FormControl(0),
        missionEnd_suppress: new FormControl(false)
    });

    emailForm = new FormGroup({
        sender: new FormControl(''),
        subject: new FormControl(''),
        body: new FormControl('')
    })


    activeGoals: HN_MissionGoal[] = []

    nextMissionOptions: HN_Mission[] = [];

    branchOptions: HN_Mission[] = [];
    missionBranches: HN_MissionBranch[] = [];

    constructor(private snackbar: MatSnackBar, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private service: MissionService, private dialogRef: MatDialogRef<MissionEditorDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
        if (data.missionId) {
            this.missionId = data.missionId;
        }
    }

    ngOnInit() {
        this.service.getMissionList(this.missionId).subscribe(missionList => {
            this.nextMissionOptions = missionList;
        });
        this.service.getMissionList(this.missionId).subscribe(missionList => {
            this.branchOptions = missionList;

            this.service.getBranches(this.missionId).subscribe(branches => {
                branches.forEach(item => {
                    let index = this.branchOptions.findIndex(option => option.missionId === item.missionTwo);
                    if (index > -1) {
                        this.branchOptions.splice(index, 1);
                    }
                });

                this.missionBranches = branches;
            })
        });

        if (this.missionId > 0) {
            this.fetchMissionGoals();
            this.service.getMissionInfo(this.missionId).subscribe(mission => {
                this.missionToForm(mission);
            });
        }
    }

    fetchMissionGoals() {
        this.service.getMissionGoals(this.missionId).subscribe(goals => {
            this.activeGoals = goals;
        });
    }

    addToBranches(e: MatSelectChange) {
        let mission = this.branchOptions.find(item => item.missionId == e.value);
        let idx = this.branchOptions.findIndex(item => item.missionId == e.value);

        if (this.missionId > 0) {
            let branch = new HN_MissionBranch(this.missionId, mission.missionId, mission.id);

            this.service.createBranch(branch).subscribe(branch => {
                let item = this.branchOptions.splice(idx, 1)[0];
                this.missionBranches.push(branch);
            });
        }
    }

    removeFromBranches(idx: number, branch: HN_MissionBranch) {
        if (this.missionId > 0 && branch.branchId > 0) {
            this.service.deleteBranch(branch.branchId).subscribe(() => {
                // SUCCESS - remove from GUI
                let item = this.missionBranches.splice(idx, 1)[0];

                let mission = this.nextMissionOptions.find(miss => {
                    return miss.missionId == item.missionTwo
                });

                if (mission) {
                    this.branchOptions.push(mission);
                }
            });
        }
    }

    formToMission(): HN_Mission {
        let retVal = new HN_Mission();

        // TODO: Get form data elements and map into Model.
        retVal.id = this.missionForm.get('id').value;
        retVal.activeCheck = this.missionForm.get('activeCheck').value;
        retVal.shouldIgnoreSenderVerification = this.missionForm.get('shouldIgnoreSenderVerification').value;

        retVal.missionStart = this.missionStart;

        retVal.missionEnd = this.missionEnd;

        retVal.nextMission = parseInt(this.missionForm.get('nextMission').value);
        retVal.IsSilent = this.missionForm.get('IsSilent').value;

        retVal.goals = this.activeGoals;

        return retVal;
    }

    missionToForm(mission: HN_Mission): void {

        this.missionForm.get('id').setValue(mission.id);
        this.missionForm.get('activeCheck').setValue(mission.activeCheck);
        this.missionForm.get('shouldIgnoreSenderVerification').setValue(mission.shouldIgnoreSenderVerification);
        this.missionForm.get('nextMission').setValue(mission.nextMission);
        this.missionForm.get('IsSilent').setValue(mission.IsSilent);

        this.missionStart = mission.missionStart;
        this.missionEnd = mission.missionEnd;
    }

    saveMission() {
        let mission = this.formToMission();

        if (this.missionId < 1) {

            this.service.createMission(mission).subscribe((res) => {
                this.snackbar.open('Mission Created Successfully', '', {
                    duration: 1000
                });
                this.dialogRef.close();
            });
        } else {
            this.service.updateMission(this.missionId, mission).subscribe((res) => {
                this.snackbar.open('Mission Updated Successfully', '', {
                    duration: 1000
                });
                this.dialogRef.close();
            })
        }
    }

    cancel() {
        this.dialogRef.close();
    }

    openGoalEditor(goalId?: number) {
        let data: any = {};
        if (goalId) {
            data.goalId = goalId;
        }

        let dialogRef = this.dialog.open(GoalEditorDialogComponent, {
            data: data,
            width: "720px",
            height: "560px;"
        });

        dialogRef.afterClosed().subscribe(goal => {
            // Make sure we got a goal (won't if user cancels)
            if (goal) {
                // Have we already got this goal in our set?
                let index = this.activeGoals.findIndex(item => {
                    return item.goalId === goal.goalId;
                });

                if (index > -1) {
                    this.activeGoals.splice(index, 1, goal);
                } else {
                    this.activeGoals.push(goal);
                }
                this.refreshGoals();
            }
        });
    }

    deleteGoal(goalId: number) {
        let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            data: {
                type: "Mission Goal",
                msg: "Are you sure you want to delete this Mission Goal?"
            }
        });

        dialogRef.afterClosed().subscribe(res => {
            // If confirmed, proceed with delete
            if (res) {
                this.service.deleteGoal(goalId).subscribe(() => {
                    // Deletion successful, remove from list
                    let idx = this.activeGoals.findIndex(goal => goal.goalId === goalId);
                    if (idx > -1) {
                        this.activeGoals.splice(idx, 1);
                    }
                });
            }
        });
    }

    refreshGoals() {
        this.changeDetectorRefs.detectChanges();
    }
}
