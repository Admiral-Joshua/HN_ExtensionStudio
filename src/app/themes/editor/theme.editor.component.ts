import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemesService } from '../themes.service';
import { HN_Theme, HN_Layout } from '../models';
import { element } from 'protractor';

@Component({
    templateUrl: "theme.editor.component.html",
    styleUrls: ["./hn-module-layout.css"]
})
export class ThemeEditorComponent implements OnInit {
    possibleLayouts: HN_Layout[] = [
        new HN_Layout(1, 'HacknetBlue'),
        new HN_Layout(2, 'mint')
    ]

    themeId: number

    themeData: HN_Theme = new HN_Theme();

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private service: ThemesService) {
        if (data.themeId) {
            this.themeId = data.themeId;
        }
    }

    randomInt(min, max): number {
        return Math.floor(Math.random() * max) + min;
    }

    ngOnInit() {
        if (this.themeId > 0) {
            this.service.fetchTheme(this.themeId).subscribe(theme => {
                // TODO: Load data into editor.
                this.themeData = theme;
            });
        }

        setInterval(() => {
            let all = document.getElementsByClassName("ssh-progress");
            let elements = document.getElementsByClassName("ssh-progress locked");

            if (elements.length < 1) {
                for (var idx in all) {
                    if (typeof all[idx] !== "number") {
                        all[idx].className = "ssh-progress locked";
                    }
                }
            } else {
                for (let i = 0; i < elements.length; i++) {
                    let element = elements[i];

                    element.innerHTML = this.randomInt(0, 255).toString();
                }

                let unlockTarget = elements[this.randomInt(0, elements.length)];

                unlockTarget.innerHTML = "0";
                unlockTarget.classList.remove("locked");
                unlockTarget.classList.add("unlocked");
            }

            let progress = document.getElementsByClassName("unlocked").length / all.length * 100;
            let pbarEl: any = document.getElementById("progress-bar-ssh");
            pbarEl.style.width = progress + "%";
        }, 300);
    }
}