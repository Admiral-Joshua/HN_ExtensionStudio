import { Component, Output, Input } from "@angular/core";
import { EventEmitter } from '@angular/core';
import { NodesService } from 'src/app/nodes/nodes.service';
import { HN_CompNode } from 'src/app/models';
import { CookieService } from 'ngx-cookie-service';
import { MatSelectChange } from '@angular/material/select';

@Component({
    template: `<mat-form-field class="full-field">
    <mat-label>
    Target Computer
    </mat-label>
    <mat-select [value]="nodeId" (selectionChange)="change($event)">
    <mat-option *ngFor="let node of possibleNodes" [value]="node.nodeId">{{node.id}}</mat-option>
    </mat-select>
    </mat-form-field>`,
    selector: "node-selector"
})
export class NodeSelector {
    @Input() nodeId: number
    @Output() nodeIdChange: EventEmitter<number> = new EventEmitter()
    change(e: MatSelectChange) {
        this.nodeId = e.value;
        this.nodeIdChange.emit(e.value);
    }

    possibleNodes: HN_CompNode[] = []

    constructor(private service: NodesService, private cookies: CookieService) { }

    ngOnInit() {
        this.service.getAllNodes(parseInt(this.cookies.get('extId'))).subscribe(nodes => {
            this.possibleNodes = nodes;
        })
    }

}