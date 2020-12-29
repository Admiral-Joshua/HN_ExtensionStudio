import { FormControl, FormGroup } from '@angular/forms';
import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import { HN_MissionFunction } from 'src/app/missions/models';
import { MissionService } from 'src/app/missions/missions.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
    templateUrl: './function.builder.component.html',
    selector: 'function-builder'
})
export class FunctionBuilderComponent implements OnInit {
    @Input() funcId: number;
    @Output() funcIdChange: EventEmitter<number> = new EventEmitter();

    @Input() funcMeta: string;
    @Output() funcMetaChange: EventEmitter<string> = new EventEmitter();

    @Input() funcVal: number;
    @Output() funcValChange: EventEmitter<number> = new EventEmitter();

    @Input() funcSuppress: boolean;
    @Output() funcSuppressChange: EventEmitter<boolean> = new EventEmitter();

    possibleFunctions: HN_MissionFunction[] = [];

    constructor(private service: MissionService) {
    }

    ngOnInit(): void {
        this.service.getFunctionsList().subscribe(functions => {
            this.possibleFunctions = functions;
        });
    }

    changeFunction(e: MatSelectChange) {
        this.funcId = e.value;
        this.funcIdChange.emit(e.value);
    }

    changeMeta(e: any) {
      this.funcMeta = e.target.value;
      this.funcMetaChange.emit(e.target.value);
    }

    changeValue(e: any) {
        this.funcVal = e.target.value;
        this.funcValChange.emit(e.target.value);
    }

    changeSuppress(e: any) {
      this.funcSuppress = e.target.value;
      this.funcSuppressChange.emit(e.target.value);
    }


}
