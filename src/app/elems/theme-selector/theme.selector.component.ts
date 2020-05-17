import { Component, EventEmitter, Output, OnInit, Input } from "@angular/core"
import { ThemesService } from 'src/app/themes/themes.service';
import { FormControl } from '@angular/forms';
import { HN_Theme } from 'src/app/themes/models';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: "theme-selector",
    templateUrl: "./theme.selector.component.html"
})
export class ThemeSelectorComponent implements OnInit {

    @Input() themeId: number
    @Output() themeIdChange: EventEmitter<number> = new EventEmitter()
    change(e: MatSelectChange) {
        this.themeId = e.value;
        this.themeIdChange.emit(e.value);
    }

    //@Output() themeSelected: EventEmitter<string> = new EventEmitter();

    selectedThemeId: FormControl = new FormControl('')

    possibleThemes: HN_Theme[] = []

    constructor(private service: ThemesService) { }

    ngOnInit() {
        this.service.fetchThemeList().subscribe(themes => {
            this.possibleThemes = themes;
        })
    }
}