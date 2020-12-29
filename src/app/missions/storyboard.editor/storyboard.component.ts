import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MissionService} from '../missions.service';
import {HN_Mission} from '../models';
import {MatDrawer, MatSidenav} from '@angular/material/sidenav';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';
import {MissionEditorDialogComponent} from '../editor.dialog/mission.editor.dialog';

declare var cytoscape;

@Component({
  selector: 'app-mission-storyboard',
  templateUrl: './storyboard.component.html'
})
export class StoryboardComponent implements OnInit {

  /* ICONS */
  checkIcon = faCheck;
  timesIcon = faTimes;
  // -----

  @ViewChild('missionDrawer') drawer;
  selectedMission: HN_Mission;

  private missions: HN_Mission[] = [];
  private graph: any;

  private graphData = {
    nodes: [],
    edges: [],
    stylesheet: cytoscape.stylesheet()
  };

  missionId: number;

  constructor(private service: MissionService, private dialog: MatDialog) {
  }

  selectMission(missionId: number): void {
    /*this.missionId = missionId;
    this.drawer.open();

    this.service.getMissionInfo(missionId).subscribe((info) => {
      this.selectedMission = info;
    });*/
    const data = {
      missionId
    };

    const dialogRef = this.dialog.open(MissionEditorDialogComponent, {
      data,
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.service.getMissionList().subscribe((missions) => {
        this.missions = missions;

        this.rebuildGraph();
      });
    });
  }

  private rebuildGraph(): void {
    if (this.graph) {
      this.graph.destroy();
    }

    this.prepareStyles();
    this.buildNodes();
    this.drawGraph();
  }

  ngOnInit(): void {
    this.service.getMissionList().subscribe((missions) => {
      this.missions = missions;

      this.rebuildGraph();
    });
  }

  private prepareStyles() {
    this.graphData.stylesheet = cytoscape.stylesheet()
      .selector('node')
      .css({
        'background-color': '#c329ff'
      })
      .selector('label')
      .css({
        'font-size': '10pt'
      })
      .selector('edge')
      .css({
        width: 3,
        'target-arrow-shape': 'triangle',
        'line-color': '#cc47ff',
        'target-arrow-color': '#cc47ff',
        'curve-style': 'bezier'
      });
  }

  private buildNodes() {
    this.graphData.nodes = [];
    this.graphData.edges = [];

    this.missions.forEach((mission) => {
      // const missionIdentifier = 'm'.concat(mission.missionId.toString());

      const label = mission.id;
      /*if (mission.missionStart) {
        label += '\n' + mission.missionStart.meta;
      }

      if (mission.missionEnd) {
        label += '\n' + mission.missionEnd.meta;
      }*/

      this.graphData.stylesheet
        .selector(`#${mission.missionId}`)
        .css({label});

      this.graphData.nodes.push({
        data: {
          id: mission.missionId
        }
      });

      if (mission.nextMission && mission.nextMission > 0) {
        this.graphData.edges.push({
          data: {
            source: mission.missionId,
            target: mission.nextMission
          }
        });
      }
    });
  }

  private drawGraph() {
    this.graph = cytoscape({
      container: document.getElementById('storyboard'),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: 'dagre'
      },

      style: this.graphData.stylesheet,

      elements: {
        nodes: this.graphData.nodes,
        edges: this.graphData.edges
      }
    });

    this.graph.on('click', 'node', (e: any) => {
      console.log('Clicked Mission: ', e.target.id());

      this.selectMission(e.target.id());
    });
  }

}
