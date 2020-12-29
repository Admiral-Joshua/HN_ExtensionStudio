import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from "@angular/material/radio";
import { ColorSketchModule } from 'ngx-color/sketch';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

/* COMPONENTS */
import { LandingComponent } from './landing/landing.component';
import { ExtensionSelectorComponent } from './extensions/extensions.component';

/* DIALOG COMPONENTS */
import { DeleteConfirmationComponent } from './dialogs/deleteConfirmDialog/delete.confirmation.component';

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
import { EmailDialogComponent } from './missions/email.dialog/email.dialog.component';
import { EmailService } from './missions/email.dialog/email.service';
import { ThemeListComponent } from './themes/theme.list.component';
import { ThemesService } from './themes/themes.service';
import { PostingDialogComponent } from './missions/posting.dialog/posting.dialog.component';
import { BoardPostingService } from './missions/posting.dialog/posting.service';
import { FileEditorDialogComponent } from './nodes/file.editor/file.editor.component';
import { ActionsService } from './actions/actions.service';
import { ActionSetListComponent } from './actions/actionset.list.component';
import { HNFileSelectorComponent } from './elems/file-selector/file-selector.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './app-routing/auth-interceptor';

import { DocumentationComponent } from './docs.component/docs.component';
import { ActionSetEditorComponent } from './actions/actionset.editor/actionset.editor.component';
import { FunctionBuilderComponent } from './elems/function-builder/function.builder.component';
import { ActionEditorComponent } from './actions/action.editor/action.editor.component';
import { NodeSelector } from './elems/node-selector/node.selector.component';
import { ThemeSelectorComponent } from './elems/theme-selector/theme.selector.component';

import { ThemeGuiEditorComponent } from './themes/gui.editor/gui.editor.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BuilderService } from './builder/builder.service';
import { BuilderComponent } from './builder/builder.component';
import {StoryboardComponent} from './missions/storyboard.editor/storyboard.component';


export function getAuthToken() {
  return localStorage.getItem("auth");
}

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmationComponent,
    LandingComponent,
    FunctionBuilderComponent,
    ExtensionInfoComponent,
    ExtensionSelectorComponent,
    NodeMapComponent,
    NodeEditorDialogComponent,
    MissionListComponent,
    MissionEditorDialogComponent,
    MusicManagerComponent,
    MusicUploadDialogComponent,
    GoalEditorDialogComponent,
    EmailDialogComponent,
    ThemeListComponent,
    PostingDialogComponent,
    FileEditorDialogComponent,
    HNFileSelectorComponent,
    ActionSetListComponent,
    ActionSetEditorComponent,
    ActionEditorComponent,
    DocumentationComponent,
    LoginComponent,
    RegisterComponent,
    NodeSelector,
    ThemeSelectorComponent,
    ThemeGuiEditorComponent,
    BuilderComponent,
    StoryboardComponent
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
        whitelistedDomains: ['hn.lunasphere.co.uk', 'dev.lunasphere.co.uk']
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
    MatSnackBarModule,
    MatTooltipModule,
    MatSliderModule,
    FontAwesomeModule,
    ColorSketchModule,
    MatRadioModule
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ExtensionsService,
    MusicService,
    NodesService,
    CookieService,
    PortsService,
    MissionService,
    EmailService,
    ThemesService,
    BoardPostingService,
    ActionsService,
    AuthService,
    BuilderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirmationComponent,
    NodeEditorDialogComponent,
    MusicUploadDialogComponent,
    MissionEditorDialogComponent,
    GoalEditorDialogComponent,
    EmailDialogComponent,
    PostingDialogComponent,
    FileEditorDialogComponent,
    ActionSetEditorComponent,
    ThemeGuiEditorComponent]
})
export class AppModule { }

