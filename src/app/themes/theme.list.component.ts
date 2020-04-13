import { Component, OnInit } from "@angular/core";
import { HN_Theme } from './models';
import { ThemesService } from './themes.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ThemeEditorComponent } from './editor/theme.editor.component';

@Component({
    templateUrl: "./theme.list.component.html"
})
export class ThemeListComponent implements OnInit {
    themes: HN_Theme[]

    constructor(private service: ThemesService, private dialog: MatDialog) {}

    ngOnInit() {
        this.fetchThemes();
        this.openEditor();
    }

    fetchThemes() {
        this.service.fetchThemeList().subscribe(themes => {
            this.themes = themes;
        })
    }

    openEditor(themeId?: number) {
        let data: any = {};

        if (themeId) {
            data.themeId = themeId;
        }

        this.dialog.open(ThemeEditorComponent, {
            data: data,
            width: "95%",
            height: "95%"
        });
    }
    
}