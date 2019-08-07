import { Component, OnInit } from '@angular/core';
import { DepthChartMoveEventArgs } from '../depth-chart-move-event-args';
import { DepthChartService } from '../depth-chart.service';
import { ListItem } from 'src/app/shared/list-item';

@Component({
  selector: 'app-depth-chart-players',
  templateUrl: './depth-chart-players.component.html',
  styleUrls: ['./depth-chart-players.component.css']
})
export class DepthChartPlayersComponent implements OnInit {
  items: ListItem[];

  constructor(private depthChartService: DepthChartService) {
    this.items = this.depthChartService.getPlayers();
  }

  ngOnInit() {
  }

  onDeleted(index: number) {
    this.depthChartService.deletePlayer(index);
  }

  onReordered(args: DepthChartMoveEventArgs) {
    this.depthChartService.movePlayer(args);
  }
}
