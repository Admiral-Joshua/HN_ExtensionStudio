import { Component, OnInit } from "@angular/core";
import { ExtensionInfo } from './models';
import { ExtensionsService } from './extensions.service';

import { MatDialog } from "@angular/material/dialog";

import { DeleteConfirmationComponent } from "../dialogs/deleteConfirmDialog/delete.confirmation.component";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    templateUrl: "./extensions.component.html",
    selector: "extension-selector"
})
export class ExtensionSelectorComponent implements OnInit {
    extensions: ExtensionInfo[]

    constructor(private service: ExtensionsService, private dialog: MatDialog, private cookies: CookieService, private router: Router) {}

    ngOnInit() {
        this.service.listMyExtensions().subscribe(extensions => {
            this.extensions = extensions;
        });

        // TODO: Redirect if extension is already selected.
    }

    SelectExtension(extension) {
        console.log(`Preparing to load Extension with ID ${extension.extensionId}`);

        this.cookies.set('extId', extension.extensionId.toString());

        this.router.navigateByUrl('/extInfo');
    }

    CreateNewExtension() {
        this.cookies.check('extId') ? this.cookies.delete('extId') : false;
        this.router.navigateByUrl('/extInfo');
    }

    DeleteExtension(extension) {
        var dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            data: {
                type: "Extension",
                msg: `Are you sure you wish to <b>permanently</b> delete the extension with name ${extension.extensionName}?`
            }
        });

        dialogRef.afterClosed().subscribe(res => {
            if (res === true) {
                this.service.deleteExtension(extension.extensionId).subscribe(() => {
                    // Remove the extension from the GUI
                    let index = this.extensions.indexOf(extension);
                    if (index > -1) {
                        this.extensions.splice(index, 1);
                    }
                })
            }
        })
    }
}