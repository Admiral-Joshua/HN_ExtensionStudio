import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from "@angular/core";
import { ExtensionInfo, ExtensionLanguage } from '../models';
import { ExtensionsService } from '../extensions.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl } from '@angular/forms';

import { MatChipInputEvent } from "@angular/material/chips";
import {MatSnackBar} from '@angular/material/snack-bar';
import { HN_MusicTrack } from 'src/app/models';
import { MusicService } from 'src/app/musics/music.service';

@Component({
    templateUrl: "./info.component.html"
})
export class ExtensionInfoComponent implements OnInit {
    public extensionId: number = 0
    supportedLanguages: ExtensionLanguage[]
    musicTracks: HN_MusicTrack[]

    readonly chipAddKeyCodes: number[] = [COMMA, ENTER];

    workshop_tags: string[] = []

    infoForm = new FormGroup({
        extensionName: new FormControl(''),
        languageId: new FormControl(''),
        allowSaves: new FormControl(false),
        description: new FormControl(''),
        startingMusicId: new FormControl(''),

        wDescriptionIsSameAsExt: new FormControl(false),
        workshop_description: new FormControl(''),
        workshop_language: new FormControl(''),
        workshop_visibility: new FormControl(0),
        workshop_tags: new FormControl(''),
        workshop_img: new FormControl('')
        //workshop_id: new FormControl('')
    });

    constructor(private service: ExtensionsService, private musicService: MusicService, private cookies: CookieService, private _snackbar: MatSnackBar) {
    }

    ngOnInit() {
        // Get selected Extension ID.
        let cookieExists = this.cookies.check('extId');
        if (cookieExists) {
            this.extensionId = parseInt(this.cookies.get('extId'));

            // Load existing extension info (if available)
            this.loadExtensionInfo();
        }

        this.service.getAvailableLanguages().subscribe(languages => {
            this.supportedLanguages = languages;
        });

        this.musicService.listMyMusic().subscribe(tracks => {
            this.musicTracks = tracks;
        });

        // Subscribe to events on workshop_description checkbox
        this.infoForm.get('wDescriptionIsSameAsExt').valueChanges.subscribe(val => {
            if (val) {
                this.infoForm.get('workshop_description').setValue('');
                this.infoForm.get('workshop_description').disable();
            } else {
                this.infoForm.get('workshop_description').setValue('');
                this.infoForm.get('workshop_description').enable();
            }
        })
    }

    loadExtensionInfo() {
        if (this.extensionId > 0) {
            this.service.fetchExtensionInfo(this.extensionId).subscribe(info => {
                this.infoToForm(info);
            })
        }
    }

    saveExtensionInfo() {
        if (this.extensionId > 0) {
            this.service.updateExtension(this.formToInfo()).subscribe(info => {
                this.extensionId = info.extensionId;
                this.infoToForm(info);
                this._snackbar.open('Changes to ExtensionInfo Saved Successfully', 'Dismiss', {
                    duration: 2000
                });
            })
        } else {
            this.service.createExtension(this.formToInfo()).subscribe(info => {
                this.infoToForm(info);
                this._snackbar.open('Extension Created Successfully', 'Dismiss', {
                    duration: 3000
                });
            })
        }
    }

    infoToForm(info: ExtensionInfo) {
        this.infoForm.get('extensionName').setValue(info.extensionName);
        this.infoForm.get('languageId').setValue(info.languageId);
        this.infoForm.get('allowSaves').setValue(info.allowSaves);
        this.infoForm.get('description').setValue(info.description);
        this.infoForm.get('startingMusicId').setValue(info.startingMusic);

        this.infoForm.get('wDescriptionIsSameAsExt').setValue(info.workshop_description === info.description);

        this.infoForm.get('workshop_description').setValue(info.workshop_description);
        this.infoForm.get('workshop_language').setValue(info.workshop_language);
        this.infoForm.get('workshop_visibility').setValue(info.workshop_visibility);
        this.infoForm.get('workshop_tags').setValue(info.workshop_tags);
        this.infoForm.get('workshop_img').setValue(info.workshop_img);

        this.workshop_tags = (info.workshop_tags || '').split(",").filter(el => {return el.length != 0});
    }

    formToInfo() : ExtensionInfo {
        let info = new ExtensionInfo();

        if (this.extensionId > 0) {
            info.extensionId = this.extensionId;
        }
        info.extensionName = this.infoForm.get('extensionName').value;
        info.languageId = parseInt(this.infoForm.get('languageId').value);
        info.allowSaves = this.infoForm.get('allowSaves').value;
        info.description = this.infoForm.get('description').value;
        info.startingMusic = parseInt(this.infoForm.get('startingMusicId').value);

        // If workshop description should be the same as the extension's.
        if (this.infoForm.get('wDescriptionIsSameAsExt').value) {
            // make it so
            info.workshop_description = info.description;
        }

        info.workshop_tags = this.workshop_tags.join(',');

        return info;
    }

    addTag(event: MatChipInputEvent) {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.workshop_tags.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeTag(tag: string): void {
        const index = this.workshop_tags.indexOf(tag);
    
        if (index >= 0) {
          this.workshop_tags.splice(index, 1);
        }
    }
}
