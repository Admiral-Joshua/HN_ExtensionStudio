import { Component } from '@angular/core';
import { faCog, faSave, faTimes, faWrench } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
    templateUrl: './gui.editor.component.html',
    styleUrls: ['./gui.editor.component.css', './hn.gui.layout/hn.display.style.css', './hn.gui.layout/hn.button.style.css']
})
export class ThemeGuiEditorComponent {

    constructor() { }


    closeIcon = faTimes;
    settingsIcon = faCog;
    saveIcon = faSave;
    emailIcon = faEnvelope;
    editIcon = faWrench;
}