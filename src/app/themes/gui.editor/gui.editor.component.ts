import { Component, Inject, OnInit } from '@angular/core';
import { faCog, faSave, faTimes, faWrench, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { HN_Theme, HN_Layout } from '../models';
import { ThemesService } from '../themes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { $ } from 'protractor';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './gui.editor.component.html',
  styleUrls: ['./gui.editor.component.css', './hn.gui.layout/hn.display.style.css', './hn.gui.layout/hn.button.style.css', './hn.gui.layout/hn.sshcrack.style.css']
})
export class ThemeGuiEditorComponent implements OnInit {

  imageFile: any;

  closeIcon = faTimes;
  settingsIcon = faCog;
  saveIcon = faSave;
  emailIcon = faEnvelope;
  editIcon = faWrench;
  chevronLeft = faChevronLeft;

  themeData: HN_Theme = new HN_Theme();

  opacitySettings: any = {
    moduleBacking: 0.25
  };

  themeId = 0;
  extensionId = 0;

  layouts: HN_Layout[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private service: ThemesService, private dialogRef: MatDialogRef<ThemeGuiEditorComponent>, private cookie: CookieService, private snackbar: MatSnackBar) {
    if (this.data.themeId) {
      this.themeId = this.data.themeId;
    }

    this.extensionId = parseInt(cookie.get('extId'));

    this.layouts = [];
  }

  fileSelected(e) {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      this.imageFile = e.target.files[0];

      // First update the preview to show the newly selected image...
      const reader = new FileReader();
      reader.onloadend = () => {
        document.getElementById('previewWindow').style.backgroundImage = `url("${reader.result}")`;
      };

      reader.readAsDataURL(this.imageFile);

      this.uploadThemeImage();
    }
  }

  uploadThemeImage() {
    // Second, are we editing an existing theme?
    if (this.themeId > 0 && this.imageFile) {
      // Yes, upload the new image
      const formData = new FormData();
      formData.append('extensionId', this.extensionId.toString());
      formData.append('themeId', this.themeId.toString());
      formData.append('bgimage', this.imageFile);

      this.service.uploadThemeImage(formData).subscribe(() => {
        this.snackbar.open('Theme background uploaded successfully!', '', {
          duration: 1000
        });
      });
    }
  }

  getThemeImage() {
    this.service.getThemeImage(this.themeId).subscribe((image) => {
      let tempUri = URL.createObjectURL(image);
      console.log(tempUri);
      document.getElementById('previewWindow').style.backgroundImage = `url('${tempUri}')`;
    });
  }

  colorUpdated(key: string, e: any, format?: string) {
    if (format === 'hex') {
      this.themeData[key] = e.color.hex;
    } else {
      this.themeData[key] = e.color.rgb;
    }
  }

  getRgba(color) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  }

  ngOnInit() {
    if (this.themeId > 0) {
      this.service.fetchTheme(this.themeId).subscribe((themeData) => {
        this.themeData = themeData;
      });
    }

    this.getThemeImage();

    this.service.getLayouts().subscribe((layouts) => {
      this.layouts = layouts;
    });
  }

  saveTheme() {
    console.log(this.themeData);
    if (this.themeId > 0) {
      this.service.updateTheme(this.themeId, this.themeData).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.service.createTheme(this.themeData).subscribe((theme: HN_Theme) => {
        if (theme.themeId > 0) {
          this.themeId = theme.themeId;
          this.uploadThemeImage();
          this.dialogRef.close();
        }
      });
    }
  }


}
