import { Component, Inject, OnInit } from "@angular/core";
import { HN_CompNode, HN_CompFile, HN_CompType, HN_Port } from 'src/app/models';
import { NodesService } from '../nodes.service';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { PortsService } from '../ports.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileEditorDialogComponent } from '../file.editor/file.editor.component';

class HN_CompIcon {
    icon: string
    name: string
    src: string

    constructor(icon: string, name: string, src?: string) {
        this.icon = icon;
        this.name = name;
        this.src = src || '';
    }
}

@Component({
    templateUrl: "./node.editor.component.html",
    styleUrls: ["./node.editor.component.css"]
})
export class NodeEditorDialogComponent implements OnInit {

    supportedIcons: HN_CompIcon[] = [
        new HN_CompIcon('laptop', 'Laptop'),
        new HN_CompIcon('chip', 'Chip'),
        new HN_CompIcon('kellis', 'Kellis'),
        new HN_CompIcon('tablet', 'Tablet'),
        new HN_CompIcon('ePhone', 'ePhone'),
        new HN_CompIcon('ePhone2', 'ePhone2'),
        //new HN_CompIcon('', '------ DLC Only --------'),
        new HN_CompIcon('Psylance', 'Psylance'),
        new HN_CompIcon('PacificAir', 'Pacific Air'),
        new HN_CompIcon('Alchemist', 'Alchemist'),
        new HN_CompIcon('DLCLaptop', 'DLC Laptop'),
        new HN_CompIcon('DLCPC1', 'DLC PC 1'),
        new HN_CompIcon('DLCPC2', 'DLC PC 2'),
        new HN_CompIcon('DLCServer', 'DLC Server')
    ];

    supportedTypes: HN_CompType[] = [
        new HN_CompType(1, 'Corporate'),
        new HN_CompType(2, 'Home'),
        new HN_CompType(3, 'Server'),
        new HN_CompType(4, 'Empty')
    ];

    allPorts: HN_Port[] = []
    activePorts: HN_Port[] = []
    filteredPorts: Observable<HN_Port[]>

    portSearch = new FormControl('');

    nodeId: number

    files: HN_CompFile[] = []

    nodeForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        ip: new FormControl(''),
        typeId: new FormControl(0),
        securityLevel: new FormControl(0),
        allowsDefaultBootModule: new FormControl(false),
        icon: new FormControl(''),
        adminPass: new FormControl(''),
        portsForCrack: new FormControl(0),
        traceTime: new FormControl(-1),
        tracker: new FormControl(false),
        firewallEnabled: new FormControl(false),
        fwall_Level: new FormControl(-1),
        fwall_solution: new FormControl(''),
        fwall_additional: new FormControl(0),
        proxyEnabled: new FormControl(false),
        proxyTime: new FormControl(0)
    });

    adminForm = new FormGroup({
        adminTypeId: new FormControl(0),
        resetPassword: new FormControl(false),
        isSuper: new FormControl(false)
    });

    constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private service: NodesService, private portService: PortsService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<NodeEditorDialogComponent>) {
        this.nodeId = data.nodeId || 0;
    }

    addFile(event: MatSelectChange) {
        if (event.value) {
            this.files.push(event.value);
        }
    }

    toggleFirewallControls() {
        if (this.nodeForm.get('firewallEnabled').value) {
            this.nodeForm.get('fwall_Level').enable();
            this.nodeForm.get('fwall_solution').enable();
            this.nodeForm.get('fwall_additional').enable();
        } else {
            this.nodeForm.get('fwall_Level').disable();
            this.nodeForm.get('fwall_solution').disable();
            this.nodeForm.get('fwall_additional').disable();
        }
    }

    toggleProxyControls() {
        if (this.nodeForm.get('proxyEnabled').value) {
            this.nodeForm.get('proxyTime').enable();
        } else {
            this.nodeForm.get('proxyTime').disable();
        }
    }

    ngOnInit() {
        this.nodeForm.get('firewallEnabled').valueChanges.subscribe(() => { this.toggleFirewallControls() });
        this.nodeForm.get('proxyEnabled').valueChanges.subscribe(() => { this.toggleProxyControls() });

        this.service.getAllPorts().subscribe(ports => {
            this.allPorts = ports;

            // Prevent node info loading till ports are downloaded.
            if (this.nodeId > 0) {
                this.service.getNodeInfo(this.nodeId).subscribe(info => {
                    this.nodeToForm(info);
                });

                this.portService.getCurrentPorts(this.nodeId).subscribe(ports => {
                    this.activePorts = ports;
                });
            }
        });

        this.refreshFileList();

        // Set-up autocomplete.
        this.filteredPorts = this.portSearch.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filterPorts(value))
            );

        this.toggleFirewallControls();
        this.toggleProxyControls();
    }

    refreshFileList() {
        if (this.nodeId > 0) {
            this.service.getFilesList(this.nodeId).subscribe(files => {
                this.files = files;
            });
        }
    }

    openFileEditor(fileId?: number) {
        let data: any = {};

        if (fileId) {
            data.fileId = fileId;
        }

        let dialogRef = this.dialog.open(FileEditorDialogComponent, {
            data: data
        });

        dialogRef.afterClosed().subscribe((fileId) => {
            if (fileId && this.nodeId > 0) {
                this.service.mapFile(fileId, this.nodeId).subscribe(() => {
                    this.refreshFileList();
                });
            } else {
                this.service.getFile(fileId).subscribe(data => {
                    this.files.push(data);
                });
            }
        });
    }

    deleteFile(fileId: number) {
        this.service.deleteFile(fileId).subscribe(() => {
            this.refreshFileList();
        });
    }

    formToNode(): HN_CompNode {
        let retVal = new HN_CompNode();

        retVal.id = this.nodeForm.get('id').value;
        retVal.name = this.nodeForm.get('name').value;
        retVal.ip = this.nodeForm.get('ip').value;
        retVal.securityLevel = this.nodeForm.get('securityLevel').value;
        retVal.allowsDefaultBootModule = this.nodeForm.get('allowsDefaultBootModule').value;
        retVal.icon = this.nodeForm.get('icon').value;
        retVal.adminPass = this.nodeForm.get('adminPass').value;
        retVal.portsForCrack = this.nodeForm.get('portsForCrack').value;
        retVal.traceTime = this.nodeForm.get('traceTime').value;
        retVal.tracker = this.nodeForm.get('tracker').value;
        retVal.typeId = this.nodeForm.get('typeId').value;
        retVal.fwall_Level = this.nodeForm.get('firewallEnabled').value ? this.nodeForm.get('fwall_Level').value : -1;
        retVal.fwall_solution = this.nodeForm.get('firewallEnabled').value ? this.nodeForm.get('fwall_solution').value : '';
        retVal.fwall_additional = this.nodeForm.get('firewallEnabled').value ? this.nodeForm.get('fwall_additional').value : 0;
        retVal.proxyTime = this.nodeForm.get('proxyEnabled').value ? this.nodeForm.get('proxyTime').value : -1;

        // If we're creating this node, upload the files and ports as well
        if (this.nodeId <= 0) {
            retVal.files = [];
            retVal.ports = this.activePorts;
        }

        return retVal;
    }

    nodeToForm(node: HN_CompNode) {
        this.nodeForm.patchValue({
            id: node.id,
            name: node.name,
            ip: node.ip,
            securityLevel: node.securityLevel,
            allowsDefaultBootModule: node.allowsDefaultBootModule,
            icon: node.icon,
            adminPass: node.adminPass,
            portsForCrack: node.portsForCrack,
            traceTime: node.traceTime,
            tracker: node.tracker,
            typeId: node.typeId,
            fwall_Level: node.fwall_Level,
            fwall_solution: node.fwall_solution,
            fwall_additional: node.fwall_additional,
            firewallEnabled: node.fwall_Level > -1,
            proxyEnabled: node.proxyTime > -1,
            proxyTime: node.proxyTime
        });

        this.toggleFirewallControls();
        this.toggleProxyControls();
    }

    cancel() {
        this.dialogRef.close();
    }

    saveNode() {
        let nodeInfo = this.formToNode();

        if (this.nodeId > 0) {
            this.service.updateNodeInfo(this.nodeId, nodeInfo).subscribe(info => {
                this.dialogRef.close();
            });
        } else {
            this.service.createNewNode(nodeInfo).subscribe(info => {
                this.dialogRef.close();
            });
        }
    }

    removePort(port: HN_Port) {
        // Perform update on DB.
        if (this.nodeId > 0) {
            this.portService.removePort(this.nodeId, port.portId).subscribe(() => {
                // On Success - remove from GUI.
                const index = this.activePorts.indexOf(port);

                if (index >= 0) {
                    this.activePorts.splice(index, 1);
                }

                // Notify user
                this.snackbar.open('Port Removed', '', {
                    duration: 1000
                })
            });
        }
    }

    addPort(port: HN_Port) {
        // Put it in the list.
        this.activePorts.push(port);

        // Clear input
        this.portSearch.setValue('', { emitEvent: false });

        // Notify user
        this.snackbar.open('Port Added', '', {
            duration: 1000
        })
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        let matchedPort = this._filterPorts(event.option.viewValue)[0];

        event.option.deselect();

        // Perform update on DB.
        if (this.nodeId > 0) {
            this.portService.addPort(this.nodeId, matchedPort.portId).subscribe(() => {
                this.addPort(matchedPort);
            });
        } else {
            this.addPort(matchedPort);
        }
    }

    displayNull() {
        return null;
    }

    private _filterPorts(value: string): HN_Port[] {
        const filterValue = value.toLowerCase();

        // Remove ports we already have.
        let newPorts = this.allPorts.filter(port => {
            for (var i = 0; i < this.activePorts.length; i++) {
                if (this.activePorts[i].portId === port.portId) {
                    return false;
                }
            }
            return true;
        });

        return newPorts.filter(port => { return port.portType.toLowerCase().includes(value.toLowerCase()) });
    }
}