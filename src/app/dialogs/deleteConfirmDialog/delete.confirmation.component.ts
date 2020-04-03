import { Component, Inject } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    templateUrl: "./delete.confirmation.component.html",
    styleUrls: ["./delete.confirmation.component.css"]
})
export class DeleteConfirmationComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteConfirmationComponent>) {

    }

    confirm() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close(false);
    }
}