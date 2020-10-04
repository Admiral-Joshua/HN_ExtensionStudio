import { Component, Inject, OnInit } from '@angular/core';
import { faCog, faSave, faTimes, faWrench } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { HN_Theme } from '../models';
import { ThemesService } from '../themes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './gui.editor.component.html',
  styleUrls: ['./gui.editor.component.css', './hn.gui.layout/hn.display.style.css', './hn.gui.layout/hn.button.style.css']
})
export class ThemeGuiEditorComponent implements OnInit {

  closeIcon = faTimes;
  settingsIcon = faCog;
  saveIcon = faSave;
  emailIcon = faEnvelope;
  editIcon = faWrench;

  themeData: HN_Theme = new HN_Theme();

  opacitySettings: any = {
    moduleBacking: 0.25
  };

  themeId = 0;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private service: ThemesService, private dialogRef: MatDialogRef<ThemeGuiEditorComponent>) {
    if (this.data.themeId) {
      this.themeId = this.data.themeId;
    }
  }

  ngOnInit() {
    if (this.themeId > 0) {
      this.service.fetchTheme(this.themeId).subscribe((themeData) => {
        this.themeData = themeData;
      });
    }
  }

  saveTheme() {
    if (this.themeId > 0) {
      this.service.updateTheme(this.themeId, this.themeData).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.service.createTheme(this.themeData).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }


}
