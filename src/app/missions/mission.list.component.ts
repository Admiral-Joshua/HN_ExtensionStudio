import { Component, OnInit } from "@angular/core";
import { HN_Mission } from './models';
import { MissionService } from './missions.service';
import { MatDialog } from '@angular/material/dialog';
import { MissionEditorDialogComponent } from './editor.dialog/mission.editor.dialog';
import { EmailDialogComponent } from './email.dialog/email.dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostingDialogComponent } from './posting.dialog/posting.dialog.component';

@Component({
    templateUrl: "./mission.list.component.html"
})
export class MissionListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'silent', 'check', 'start', 'end', 'hasEmail', 'hasPosting', 'actions'] //'attachments'

    missions: HN_Mission[] = [];

    constructor(private snackbar: MatSnackBar, private service: MissionService, private dialog: MatDialog) {}

    ngOnInit() {
        this.fetchMissionList();
    }

    fetchMissionList() {
        this.service.getMissionList().subscribe(missions => {
            this.missions = missions;
        });
    }

    openEditor(missionId?: number) {
        let data: any = {};
        if (missionId) {
            data.missionId = missionId;
        }

        let dialogRef = this.dialog.open(MissionEditorDialogComponent, {
            data: data,
            width: '80%'
        });

        dialogRef.afterClosed().subscribe(() => {
            this.fetchMissionList();
        });
    }

    configureEmail(mission: HN_Mission) {
        let data: any = {};

        if (mission.emailId > 0) {
            data.emailId = mission.emailId;
        }

        let dialogRef = this.dialog.open(EmailDialogComponent, {
            data: data,
            width: "75%"
        });

        dialogRef.afterClosed().subscribe(emailId => {
            if (emailId > 0) {
                // Create or update the link between mission and email.
                this.service.linkEmail(mission.missionId, emailId).subscribe(() => {
                    this.snackbar.open('Email Linked up to Mission', '', {
                        duration: 1000
                    });
                });
                this.fetchMissionList();
            } else {
                this.fetchMissionList();
            }
        });
    }

    configurePosting(mission: HN_Mission) {
        let data: any = {};

        if (mission.postingId > 0) {
            data.postingId = mission.postingId;
        }

        let dialogRef = this.dialog.open(PostingDialogComponent, {
            data: data,
            width: "75%"
        });

        dialogRef.afterClosed().subscribe(postingId => {
            if (postingId > 0) {
                // Create or update the link between mission and board post.
                this.service.linkPosting(mission.missionId, postingId).subscribe(() => {
                    this.snackbar.open('Board Post Linked up to Mission', '', {
                        duration: 1000
                    });
                    this.fetchMissionList();
                });
            } else {
                this.fetchMissionList();
            }
        });
    }
}
