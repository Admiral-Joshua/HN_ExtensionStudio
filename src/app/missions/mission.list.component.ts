import { Component, OnInit } from "@angular/core";
import { HN_Mission } from './models';
import { MissionService } from './missions.service';
import { MatDialog } from '@angular/material/dialog';
import { MissionEditorDialogComponent } from './editor.dialog/mission.editor.dialog';

@Component({
    templateUrl: "./mission.list.component.html"
})
export class MissionListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'silent', 'check', 'start', 'end', 'attachments', 'actions']

    missions: HN_Mission[] = [];

    constructor(private service: MissionService, private dialog: MatDialog) {}

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
            data: data
        });

        dialogRef.afterClosed().subscribe(() => {
            this.fetchMissionList();
        });
    }
}