import { Component, OnInit } from "@angular/core";
import { HN_Theme } from './models';
import { ThemesService } from './themes.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ThemeEditorComponent } from './base.editor/theme.editor.component';
import { DeleteConfirmationComponent } from '../dialogs/deleteConfirmDialog/delete.confirmation.component';
import { ThemeGuiEditorComponent } from './gui.editor/gui.editor.component';

@Component({
    templateUrl: "./theme.list.component.html"
})
export class ThemeListComponent implements OnInit {
    themes: HN_Theme[]

    constructor(private service: ThemesService, private dialog: MatDialog) { }

    ngOnInit() {
        this.fetchThemes();
        //this.openEditor();
    }

    fetchThemes() {
        this.service.fetchThemeList().subscribe(themes => {
            this.themes = themes;
        });
    }

    deleteTheme(themeId: number) {
        let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            data: {
                'type': "Theme",
                'msg': "Are you sure you want to delete this theme?<br/>Once deleted you will not be able to get it back again."
            }
        })

        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.service.deleteTheme(themeId).subscribe(() => {
                    this.fetchThemes();
                });
            }
        })
    }

    openEditor(themeId?: number) {
        let data: any = {};

        if (themeId) {
            data.themeId = themeId;
        }

        let dialogRef = this.dialog.open(ThemeGuiEditorComponent, {
            data: data,
            //width: "95%",
            //height: "80%"
        });

        dialogRef.afterClosed().subscribe(() => {
            this.fetchThemes();
        })
    }

}