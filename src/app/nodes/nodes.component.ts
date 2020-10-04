import { Component, OnInit } from "@angular/core";
import { HN_CompNode } from '../models';
import { NodesService } from './nodes.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { NodeEditorDialogComponent } from './node.editor/node.editor.component';
import { MusicUploadDialogComponent } from '../musics/music.manager/upload-dialog/music.upload.dialog';
import { DeleteConfirmationComponent } from '../dialogs/deleteConfirmDialog/delete.confirmation.component';

@Component({
    templateUrl: "./nodes.component.html",
    styleUrls: ["./nodes.component.css"]
})
export class NodeMapComponent implements OnInit {
    displayedColumns: string[] = ['name', 'ip', 'ports', 'portCount', 'fileCount', 'actions'];

    extensionId: number

    nodes: HN_CompNode[]

    constructor(private service: NodesService, private cookie: CookieService, private dialog: MatDialog) {
        this.extensionId = parseInt(cookie.get('extId'));
    }

    fetchNodeList() {
        this.service.getAllNodes(this.extensionId).subscribe(nodes => {
            this.nodes = nodes;
        });
    }

    ngOnInit() {
        this.fetchNodeList();
    }

    openEditor(row?: HN_CompNode) {
        let dialogRef = this.dialog.open(NodeEditorDialogComponent, {
            data: {
                nodeId: row ? row.nodeId : 0
            },
            width: "80%",
        });

        // When the dialog is closed, refresh the table.
        dialogRef.afterClosed().subscribe(() => {
            this.fetchNodeList();
        });
    }

    deleteNode(nodeId: number) {
        let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            data: {
                'type': "NodeId",
                'msg': "Are you sure you want to delete this node? This will also delete all files contained within this node?"
            }
        })

        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.service.deleteNode(nodeId).subscribe(() => {
                    this.fetchNodeList();
                });
            }
        });
    }
}