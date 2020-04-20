import { Component, Output, OnInit } from "@angular/core";
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HN_CompNode, HN_CompFile } from 'src/app/models';
import { NodesService } from 'src/app/nodes/nodes.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: "hn-file-selector",
    templateUrl: "./file-selector.component.html"
})
export class HNFileSelectorComponent implements OnInit {

    possibleNodes: HN_CompNode[] = []
    possibleFiles: HN_CompFile[] = []

    @Output() fileSelected: EventEmitter<string> = new EventEmitter();

    nodeId = new FormControl(0)
    fileId = new FormControl(0)
    
    constructor(private nodeService: NodesService, private cookies: CookieService) {
    }

    ngOnInit() {
        this.nodeService.getAllNodes(parseInt(this.cookies.get('extId'))).subscribe(nodes => {
            this.possibleNodes = nodes;
        })
    }

    nodeSelection(e: MatSelectChange) {
        if (e.value > 0) {
            // Retrieve list of files for this computer
            this.nodeService.getFilesList(e.value).subscribe(files => {
                this.possibleFiles = files;
            })
        }
    }
    
    fileSelection(e: MatSelectChange) {
        if (e.value > 0) {
            this.fileSelected.emit(e.value);
        }
    }

}