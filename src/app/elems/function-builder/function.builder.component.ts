import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Output, Input } from "@angular/core";
import { HN_MissionFunction } from 'src/app/missions/models';
import { MissionService } from 'src/app/missions/missions.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
    templateUrl: "./function.builder.component.html",
    selector: "function-builder"
})
export class FunctionBuilderComponent {
    @Input() funcId: number
    @Output() funcIdChange: EventEmitter<number> = new EventEmitter();

    @Input() funcVal: string
    @Output() funcValChange: EventEmitter<string> = new EventEmitter();

    possibleFunctions: HN_MissionFunction[] = []

    constructor(private service: MissionService) {
    }

    ngOnInit() {
        this.service.getFunctionsList().subscribe(functions => {
            this.possibleFunctions = functions;
        })
    }

    changeFunction(e: MatSelectChange) {
        this.funcId = e.value;
        this.funcIdChange.emit(e.value);
    }

    changeValue(e: any) {
        this.funcVal = e.target.value;
        this.funcValChange.emit(e.target.value);
    }


}