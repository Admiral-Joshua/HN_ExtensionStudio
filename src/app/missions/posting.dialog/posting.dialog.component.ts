import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { EmailService } from '../email.dialog/email.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog"
import { BoardPostingService } from './posting.service';
import { HN_BoardPost } from '../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from 'src/app/dialogs/deleteConfirmDialog/delete.confirmation.component';

@Component({
    templateUrl: "./posting.dialog.component.html"
})
export class PostingDialogComponent {
    postingId: number

    postForm = new FormGroup({
        title: new FormControl(''),
        reqs: new FormControl(''),
        content: new FormControl(''),
        requiredRank: new FormControl(0)
    })

    constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private service: BoardPostingService, private dialogRef: MatDialogRef<PostingDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
        if (data.postingId) {
            this.postingId = data.postingId;
        }
    }

    ngOnInit() {
        if (this.postingId > 0) {
            this.service.getPosting(this.postingId).subscribe(info => {
                this.postingToForm(info);
            });
        }
    }

    postingToForm(posting: HN_BoardPost) {

        this.postForm.patchValue({
            title: posting.title,
            reqs: posting.reqs,
            content: posting.content,
            requiredRank: posting.requiredRank
        });
    }

    formToPosting(): HN_BoardPost {
        let retVal = new HN_BoardPost();

        retVal.title = this.postForm.get('title').value;
        retVal.content = this.postForm.get('content').value;
        retVal.requiredRank = this.postForm.get('requiredRank').value;
        retVal.reqs = this.postForm.get('reqs').value;

        return retVal;
    }

    savePosting() {
        let postInfo = this.formToPosting();
        if (this.postingId > 0) {
            this.service.updatePost(this.postingId, postInfo).subscribe(info => {
                this.postingToForm(info);

                this.close();
            });
        } else {
            this.service.createNewPost(postInfo).subscribe(info => {
                this.postingToForm(info);
                this.postingId = info.postingId;

                this.close();
            });
        }
    }

    deletePosting() {
        if (this.postingId > 0) {

            let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
                data: {
                    type: "Mission Board Post",
                    msg: "Are you sure you'd like to delete this board post,<br/>this will also remove it from the mission you are currently editing."
                }
            });

            dialogRef.afterClosed().subscribe(res => {
                if (res) {
                    this.service.deletePost(this.postingId).subscribe(() => {
                        this.postingId = 0;
                        this.snackbar.open('Post Deleted Successfully', '', {
                            duration: 1000
                        });
                        this.close();
                    });
                }
            })

        }

    }

    close() {
        this.dialogRef.close(this.postingId);
    }

}