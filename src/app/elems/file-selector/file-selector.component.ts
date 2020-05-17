import { Component, Output, OnInit, Input } from "@angular/core";
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HN_CompNode, HN_CompFile } from 'src/app/models';
import { NodesService } from 'src/app/nodes/nodes.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: "file-selector",
    templateUrl: "./file-selector.component.html"
})
export class HNFileSelectorComponent implements OnInit {
    @Input() fileSource: FileSelectorSource = FileSelectorSource.TARGET

    possibleNodes: HN_CompNode[] = []
    possibleFiles: HN_CompFile[] = []

    private _nodeId: number;
    @Input() set nodeId(nodeId: number) {
        this._nodeId = nodeId;
        this.refreshFiles();
    }

    @Input() fileId: number = 0
    @Output() fileIdChange: EventEmitter<number> = new EventEmitter()
    change(e: MatSelectChange) {
        this.fileId = e.value;
        this.fileIdChange.emit(e.value);
    }


    constructor(private nodeService: NodesService, private cookies: CookieService) {
    }

    ngOnInit() {
        this.nodeService.getAllNodes(parseInt(this.cookies.get('extId'))).subscribe(nodes => {
            this.possibleNodes = nodes;
        })

        if (this.fileSource === FileSelectorSource.ALL) {
            this.nodeService.getAllFiles().subscribe(files => {
                this.possibleFiles = files;
            });
        }
    }

    refreshFiles() {
        if (this._nodeId > 0 && this.fileSource === FileSelectorSource.TARGET) {
            this.nodeService.getFilesList(this._nodeId).subscribe(files => {
                this.possibleFiles = files;
            });
        }
    }
}

export enum FileSelectorSource {
    TARGET = 0,
    ALL = 1
}