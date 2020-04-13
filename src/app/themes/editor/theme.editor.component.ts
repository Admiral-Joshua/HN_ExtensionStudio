import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemesService } from '../themes.service';
import { HN_Theme, HN_Layout } from '../models';

@Component({
    templateUrl: "theme.editor.component.html",
    styleUrls: ["./hn-module-layout.css"]
})
export class ThemeEditorComponent implements OnInit {
    possibleLayouts: HN_Layout[] = [
        new HN_Layout(1, 'HacknetBlue'),
        new HN_Layout(2, 'mint')
    ]

    themeId: number

    themeData: HN_Theme = new HN_Theme();
    
    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private service: ThemesService) {
        if (data.themeId) {
            this.themeId = data.themeId;
        }
    }

    ngOnInit() {
        if (this.themeId > 0) {
            this.service.fetchTheme(this.themeId).subscribe(theme => {
                // TODO: Load data into editor.
                this.themeData = theme;
            });
        }
    }
}