import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing/app-routing.module"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTreeModule } from "@angular/material/tree";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

/* COMPONENTS */
import { LandingComponent } from './landing/landing.component';
import { ExtensionSelectorComponent } from './extensions/extensions.component';

/* DIALOG COMPONENTS */
import { DeleteConfirmationComponent} from "./dialogs/deleteConfirmDialog/delete.confirmation.component";

/* SERVICES */
import { ExtensionsService } from './extensions/extensions.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExtensionInfoComponent } from './extensions/info.editor/info.component';
import { MusicService } from './musics/music.service';
import { NodeMapComponent } from './nodes/nodes.component';
import { NodesService } from './nodes/nodes.service';
import { NodeEditorDialogComponent } from './nodes/node.editor/node.editor.component';
import { PortsService } from './nodes/ports.service';
import { MusicManagerComponent } from './musics/music.manager/music.manager.component';
import { MusicUploadDialogComponent } from './musics/music.manager/upload-dialog/music.upload.dialog';
import { MissionService } from './missions/missions.service';
import { MissionEditorDialogComponent } from './missions/editor.dialog/mission.editor.dialog';
import { MissionListComponent } from './missions/mission.list.component';
import { GoalEditorDialogComponent } from './missions/goal.editor/goal.editor.dialog';


export function getAuthToken() {
  //return localStorage.getItem("auth");
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODYwMTI3MTgsInVzZXJJZCI6NSwiaWF0IjoxNTg1OTI2MzE4fQ.235OMXP1ZHTBX7m1yUJ7m7wGsRYyDs3gS8LRRvOYc7M";
}

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmationComponent,
    LandingComponent,
    ExtensionInfoComponent,
    ExtensionSelectorComponent,
    NodeMapComponent,
    NodeEditorDialogComponent,
    MissionListComponent,
    MissionEditorDialogComponent,
    MusicManagerComponent,
    MusicUploadDialogComponent,
    GoalEditorDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getAuthToken,
        whitelistedDomains: ["dev.lunasphere.co.uk"]
      }
    }),
    AppRoutingModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatRippleModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTreeModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: "BASE_API_URL", useValue: environment.apiUrl },
    ExtensionsService,
    MusicService,
    NodesService,
    CookieService,
    PortsService,
    MissionService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirmationComponent,
    NodeEditorDialogComponent,
    MusicUploadDialogComponent,
    MissionEditorDialogComponent,
    GoalEditorDialogComponent]
})
export class AppModule { }

