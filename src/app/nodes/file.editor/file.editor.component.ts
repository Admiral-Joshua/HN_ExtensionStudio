import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { NodesService } from '../nodes.service';
import { HN_CompFile, HN_FileTemplate } from 'src/app/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
    templateUrl: "file.editor.component.html"
})
export class FileEditorDialogComponent {
    fileId: number

    fileTemplates: HN_FileTemplate[] = [];

    fileForm = new FormGroup({
        path: new FormControl(''),
        name: new FormControl(''),
        contents: new FormControl('')
    })

    constructor(private service: NodesService, @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<FileEditorDialogComponent>) {
        if (data.fileId) {
            this.fileId = data.fileId
        }
    }

    ngOnInit() {
        if (this.fileId) {
            this.service.getFile(this.fileId).subscribe(data => {
                this.fileToForm(data);
            })
        }
        this.service.getTemplateList().subscribe(templates => {
            this.fileTemplates = templates;
        })
    }

    formToFile(): HN_CompFile {
        let retVal = new HN_CompFile(
            this.fileForm.get('path').value,
            this.fileForm.get('name').value,
            this.fileForm.get('contents').value
        );

        return retVal;
    }

    loadTemplate(e: MatSelectChange) {
        let fileData = this.fileTemplates.find(item => item.templateId === e.value);

        if (fileData) {
            this.fileForm.patchValue({
                path: fileData.path,
                name: fileData.name,
                contents: fileData.contents
            });
        } else {
            this.fileForm.patchValue({
                path: '',
                name: '',
                contents: ''
            });
        }
    }

    fileToForm(file: HN_CompFile) {
        this.fileForm.patchValue({
            path: file.path,
            name: file.name,
            contents: file.contents
        });
    }

    saveFile() {
        let file = this.formToFile();

        if (this.fileId > 0) {
            this.service.updateFile(this.fileId, file).subscribe(fileInfo => {
                this.close();
            })
        } else {
            this.service.createNewFile(file).subscribe(fileInfo => {
                this.fileId = fileInfo.fileId;
                this.close();
            })
        }
    }

    close() {
        this.dialogRef.close(this.fileId);
    }
}