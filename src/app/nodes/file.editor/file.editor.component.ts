import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { NodesService } from '../nodes.service';
import { HN_CompFile } from 'src/app/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
    templateUrl: "file.editor.component.html"
})
export class FileEditorDialogComponent {
    fileId: number

    fileTemplates: HN_CompFile[] = [
        new HN_CompFile('bin', 'SSHCrack.exe', '#SSH_CRACK#', 1),
        new HN_CompFile('bin', 'FTPBounce.exe', '#FTP_CRACK#', 2),
        new HN_CompFile('bin', 'WebServerWorm.exe', '#WEB_CRACK#', 3),
        new HN_CompFile('bin', 'SMTPOverflow.exe', '#SMTP_CRACK#', 4),
        new HN_CompFile('bin', 'SQLBufferOverflow.exe', '#SQL_CRACK#', 5),
        new HN_CompFile('bin', 'HexClock.exe', '#HEXCLOCK_EXE#', 6),
        new HN_CompFile('bin', 'Clock.exe', '#CLOCK_PROGRAM#', 7),
        new HN_CompFile('bin', 'Decypher.exe', '#DECYPHER_PROGRAM#', 8),
        new HN_CompFile('bin', 'DECHead.exe', '#DECHEAD_PROGRAM#', 9),
        new HN_CompFile('bin', 'KBTPortTest.exe', '#MEDICAL_PROGRAM#', 10),
        new HN_CompFile('bin', 'ThemeChanger.exe', '#THEMECHANGER_EXE#', 11),
        new HN_CompFile('bin', 'eosDeviceScan.exe', '#EOS_SCANNER_EXE#', 12),
        new HN_CompFile('bin', 'SecurityTracer.exe', '#SECURITYTRACER_PROGRAM#', 13),
        new HN_CompFile('bin', 'TorrentStreamInjector.exe', '#TORRENT_EXE#', 14),
        new HN_CompFile('bin', 'SSLTrojan.exe', '#SSL_EXE#', 15),
        new HN_CompFile('bin', 'FTPSprint.exe', '#FTP_FAST_EXE#', 16),
        new HN_CompFile('bin', 'SignalScramble.exe', '#SIGNAL_SCRAMBLER_EXE#', 17),
        new HN_CompFile('bin', 'MemForensics.exe', '#MEM_FORENSICS_EXE#', 18),
        new HN_CompFile('bin', 'MemDumpGenerator.exe', '#MEM_DUMP_GENERATOR#', 19),
        new HN_CompFile('bin', 'PacificPortcrusher.exe', '#PACIFIC_EXE#', 20),
        new HN_CompFile('bin', 'NetmapOrganizer.exe', '#NETMAP_ORGANIZER_EXE#', 21),
        new HN_CompFile('bin', 'ComShell.exe', '#SHELL_CONTROLLER_EXE#', 22),
        new HN_CompFile('bin', 'DNotes.exe', '#NOTES_DUMPER_EXE#', 23),
        new HN_CompFile('bin', 'Tuneswap.exe', '#DLC_MUSIC_EXE#', 24),
        new HN_CompFile('bin', 'Clockv2.exe', '#CLOCK_V2_EXE#', 25)
    ];

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
    }

    formToFile()  : HN_CompFile {
        let retVal = new HN_CompFile(
            this.fileForm.get('path').value,
            this.fileForm.get('name').value,
            this.fileForm.get('contents').value
        );

        return retVal;
    }

    loadTemplate(e: MatSelectChange) {
        let fileData = this.fileTemplates.find(item => item.fileId === e.value);

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

        if (this.fileId > 0 ) {
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