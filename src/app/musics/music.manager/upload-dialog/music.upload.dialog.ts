import { Component } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { MusicService } from '../../music.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/dialogs/deleteConfirmDialog/delete.confirmation.component';

@Component({
    templateUrl: "./music.upload.dialog.html"
})
export class MusicUploadDialogComponent {
    musicForm = new FormGroup({
        title: new FormControl(''),
        file: new FormControl(''),
        fileSource: new FormControl('')
    })

    constructor(private service: MusicService, private dialog: MatDialog, private dialogRef: MatDialogRef<MusicUploadDialogComponent>) {}

    fileSelected(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.musicForm.patchValue({
                fileSource: file
            });
        }
    }

    startUpload() {
        const formData = new FormData();
        formData.append('title', this.musicForm.get('title').value);
        formData.append('track', this.musicForm.get('fileSource').value);
        
        this.service.uploadNewMusicTrack(formData).subscribe((res) => {
            this.dialogRef.close();
        });
    }
}