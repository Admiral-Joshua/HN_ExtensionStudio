import {Component, OnInit, ViewChild} from '@angular/core';
import {HN_CompNode} from '../../models';
import {NodesService} from '../nodes.service';
import {CookieService} from 'ngx-cookie-service';
import {start} from 'repl';

@Component({
  selector: 'app-nodes-netmap-editor',
  templateUrl: './node.netmap.editor.html'
})
export class NodeNetmapEditorComponent implements OnInit {
  @ViewChild('nodesContainer') canvas;
  @ViewChild('nodeIcon') nodeIcon;

  extensionId = 0;
  nodes: HN_CompNode[] = [];

  constructor(private service: NodesService, private cookie: CookieService) {
    this.extensionId = parseInt(this.cookie.get('extId'));
  }

  ngOnInit() {
    this.service.getAllNodes(this.extensionId).subscribe((nodes) => {
      this.nodes = nodes;

      this.renderNodes();
    });
  }

  renderNodes() {
    // let x = 0;
    // let y = 0;

    const nodeDimensions = {
      width: 48,
      height: 48,
      margin: {
        x: 80,
        y: 35
      }
    };

    const perColumn = 5;

    const ctx = this.canvas.nativeElement.getContext('2d');

    ctx.clearRect(0, 0, 1920, 1080);


    this.nodes.forEach((node, i) => {

      const colNum = i % perColumn;
      const rowNum = Math.floor(i / 5);

      const startPoint = {
        x: rowNum * (nodeDimensions.width + (nodeDimensions.margin.x * 2)),
        y: colNum * (nodeDimensions.height + (nodeDimensions.margin.y * 2))
      };

      const textPos = {
        x: startPoint.x,
        y: startPoint.y + nodeDimensions.height
      };

      console.log('Node #' + i.toString(), node);

      ctx.fillStyle = '#008800';
      ctx.fillRect(startPoint.x + nodeDimensions.margin.x, startPoint.y + nodeDimensions.margin.y, nodeDimensions.width, nodeDimensions.height);

      ctx.globalCompositeOperation = 'destination-in';

      ctx.drawImage(this.nodeIcon.nativeElement, startPoint.x + nodeDimensions.margin.x, startPoint.y + nodeDimensions.margin.y, nodeDimensions.width, nodeDimensions.height);

      ctx.globalCompositeOperation = 'source-over';

      ctx.font = '12px Arial';

      ctx.fillStyle = '#000';

      let txtSize = ctx.measureText(node.name);
      ctx.fillText(node.name, nodeDimensions.width - (txtSize.width / 2), textPos.y);
    });
  }
}
