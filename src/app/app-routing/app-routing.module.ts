import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { LandingComponent } from "../landing/landing.component";
import { ExtensionSelectorComponent } from "../extensions/extensions.component";
import { ExtensionInfoComponent } from '../extensions/info.editor/info.component';
import { NodeMapComponent } from '../nodes/nodes.component';
import { NodeEditorDialogComponent } from '../nodes/node.editor/node.editor.component';
import { MusicManagerComponent } from '../musics/music.manager/music.manager.component';
import { MissionListComponent } from '../missions/mission.list.component';
import { ThemeListComponent } from '../themes/theme.list.component';
import { ActionSetListComponent } from '../actions/actionset.list.component';
import { DocumentationComponent } from '../documentation.component/docs.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingComponent
  },
  {
    path: 'docs',
    component: DocumentationComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
  /*{
    path: 'selector',
    component: ExtensionSelectorComponent
  },
  {
    path: "extInfo",
    component: ExtensionInfoComponent
  },
  {
    path: "nodes",
    component: NodeMapComponent
  },
  {
    path: "music",
    component: MusicManagerComponent
  },
  {
    path: "missions",
    component: MissionListComponent
  },
  {
    path: "themes",
    component: ThemeListComponent
  },
  {
    path: "actions",
    component: ActionSetListComponent
  }*/
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
