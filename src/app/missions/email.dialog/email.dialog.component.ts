import { Component, Inject } from "@angular/core";
import { MissionService } from '../missions.service';
import { EmailService } from './email.service';
import { FormGroup, FormControlDirective, FormControl } from '@angular/forms';
import { HN_Email, HN_EmailAttachment, HN_AttachmentType } from '../email.dialog/models';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from 'src/app/dialogs/deleteConfirmDialog/delete.confirmation.component';
import { HN_CompNode } from 'src/app/models';
import { NodesService } from 'src/app/nodes/nodes.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    templateUrl: "./email.dialog.component.html"
})
export class EmailDialogComponent {
    emailId: number

    attachmentTypes: HN_AttachmentType[] = []

    possibleNodes: HN_CompNode[]

    emailAttachments: HN_EmailAttachment[] = []

    emailForm = new FormGroup({
        sender: new FormControl(''),
        subject: new FormControl(''),
        body: new FormControl('')
    })

    attachmentForm = new FormGroup({
        attachmentType: new FormControl(0),
        title: new FormControl(''),
        content: new FormControl(''),
        comp: new FormControl(''),
        user: new FormControl(''),
        pass: new FormControl('')
    })

    visibleFields: string[] = [];

    constructor(private dialog: MatDialog, private cookies: CookieService, private nodeService: NodesService, private snackbar: MatSnackBar, private service: EmailService, @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<EmailDialogComponent>) {
        if (this.data.emailId > 0) {
            this.emailId = this.data.emailId;
        }
    }

    ngOnInit() {
        if (this.emailId > 0) {
            this.service.getEmail(this.emailId).subscribe(email => {
                this.emailToForm(email);
            });
            this.service.getAttachments(this.emailId).subscribe(attachments => {
                this.emailAttachments = attachments;
            });
        }

        this.service.getAttachmentTypes().subscribe(types => {
            this.attachmentTypes = types;
        });

        this.nodeService.getAllNodes(parseInt(this.cookies.get('extId'))).subscribe(nodes => {
            this.possibleNodes = nodes;
        });
    }

    close() {
        this.dialogRef.close(this.emailId);
    }

    saveEmail() {
        if (this.emailId > 0) {
            this.service.updateEmail(this.emailId, this.formToEmail()).subscribe(email => {
                this.emailToForm(email);
                this.snackbar.open('Email Saved Successfully', '', {
                    duration: 1000
                });
                this.close();
            });
        } else {
            this.service.createEmail(this.formToEmail()).subscribe(email => {
                this.emailId = email.emailId;
                this.emailToForm(email);
                this.snackbar.open('Email Created Successfully', '', {
                    duration: 1000
                });
                this.close();
            });
        }
    }

    resetAttachmentForm() {
        this.attachmentForm.patchValue({
            attachmentType: 0,
            title: '',
            content: '',
            user: '',
            comp: '',
            pass: ''
        });

        this.updateVisibleFields();
    }

    addAttachment() {
        let attachment = new HN_EmailAttachment();
        attachment.typeId = this.attachmentForm.get('attachmentType').value;
        attachment.title = this.attachmentForm.get('title').value;
        attachment.content = this.attachmentForm.get('content').value;
        attachment.comp = this.attachmentForm.get('comp').value;
        attachment.user = this.attachmentForm.get('user').value;
        attachment.pass = this.attachmentForm.get('pass').value;

        if (this.emailId > 0) {
            // Create attachment in DB first.
            this.service.createNewAttachment(attachment).subscribe(attachment => {
                this.service.mapAttachment(this.emailId, attachment.attachmentId).subscribe(() => {
                    this.emailAttachments.push(attachment);
                    this.resetAttachmentForm();
                    this.snackbar.open('Attachment Added Successfully', '', {
                        duration: 1000
                    });
                });
            });
        } else {
            this.emailAttachments.push(attachment);
            this.resetAttachmentForm();
        }
    }

    resolveTypeText(attachmentTypeId: number) {
        let item = this.attachmentTypes.find(item => item.typeId === attachmentTypeId);
        if (item) {
            return item.typeText;
        } else {
            return '';
        }
    }

    removeAttachment(attachment: HN_EmailAttachment) {
        if (this.emailId > 0) {
            this.service.unmapAttachment(this.emailId, attachment.attachmentId).subscribe((res) => {
                // Unmap successful
                // Delete attachment
                this.service.deleteAttachment(attachment.attachmentId).subscribe((res) => {
                    // Delete success - remove from list
                    let index = this.emailAttachments.findIndex(item => item.attachmentId === attachment.attachmentId);
                    if (index > -1) {
                        this.emailAttachments.splice(index, 1);
                    }
                    this.snackbar.open('Attachment Removed Successfully', '', {
                        duration: 1000
                    });
                });
            });
        } else {
            let index = this.emailAttachments.findIndex(item => item.attachmentId === attachment.attachmentId);
            if (index > -1) {
                this.emailAttachments.splice(index, 1);
                this.snackbar.open('Attachment Removed Successfully', '', {
                    duration: 1000
                });
            }
        }
    }

    updateVisibleFields() {
        this.visibleFields = [];
        
        switch(this.attachmentForm.get('attachmentType').value) {
            case 1:
                this.visibleFields.push('title');
                this.visibleFields.push('content');
                break;
            case 3:
                this.visibleFields.push('user');
                this.visibleFields.push('pass');
            case 2: 
                this.visibleFields.push('comp');
                break;
        }
    }

    emailToForm(email: HN_Email) : void {
        this.emailForm.patchValue({
            sender: email.sender,
            subject: email.subject,
            body: email.body
        });
    }

    deleteEmail() {
        if (this.emailId > 0) {
            let dialogRef =this.dialog.open(DeleteConfirmationComponent, {
                data: {
                    type: 'Mission Email',
                    msg: 'Are you sure you want to delete this Email.<br/>It will also be removed from the mission currently being edited.'
                }
            })

            dialogRef.afterClosed().subscribe(res => {
                if (res) {
                    this.service.deleteEmail(this.emailId).subscribe(() => {
                        // Deletion success
                        this.emailId = 0;
                        this.close();
                    })
                }
            })
        }
    }

    formToEmail() : HN_Email {
        let retVal = new HN_Email();
        retVal.sender = this.emailForm.get('sender').value;
        retVal.subject = this.emailForm.get('subject').value;
        retVal.body = this.emailForm.get('body').value;

        return retVal;
    }
}