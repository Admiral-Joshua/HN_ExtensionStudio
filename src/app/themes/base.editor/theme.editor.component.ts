import { Component, Inject } from "@angular/core";
import { HN_Theme, HN_Layout } from '../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemesService } from '../themes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: "./theme.editor.component.html"
})
export class ThemeEditorComponent {
    themeId: number = 0

    themeData: HN_Theme = new HN_Theme()

    baseLayouts: HN_Layout[]

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private service: ThemesService, private dialogRef: MatDialogRef<ThemeEditorComponent>, private snackbar: MatSnackBar) {
        if (data.themeId) {
            this.themeId = data.themeId;
        }
    }

    ngOnInit() {
        if (this.themeId > 0) {
            this.service.fetchTheme(this.themeId).subscribe(theme => {
                this.themeData = theme;
            })
        }

        this.service.getLayouts().subscribe(layouts => {
            this.baseLayouts = layouts;
        })
    }

    save() {
        if (this.themeId > 0) {
            this.service.updateTheme(this.themeId, this.themeData).subscribe(theme => {
                this.themeData = theme;
                this.snackbar.open('Theme Updated Successfully!', '', {
                    duration: 1200
                })
                this.close();
            })
        } else {
            this.service.createTheme(this.themeData).subscribe(theme => {
                this.themeData = theme;
                this.snackbar.open('Theme Created Successfully!', '', {
                    duration: 1200
                });
                this.close();
            })
        }
    }

    close() {
        this.dialogRef.close();
    }


}