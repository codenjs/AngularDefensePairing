import { Component, OnInit } from '@angular/core';
import { DepthChartListItem } from '../depth-chart-list-item';
import { DepthChartService } from '../depth-chart.service';

@Component({
  selector: 'app-depth-chart-players',
  templateUrl: './depth-chart-players.component.html',
  styleUrls: ['./depth-chart-players.component.css']
})
export class DepthChartPlayersComponent implements OnInit {
  items: DepthChartListItem[];

  constructor(private depthChartService: DepthChartService) {
    this.items = this.depthChartService.getPlayers();
  }

  ngOnInit() {
  }

  onDeleted(index: number) {
    this.depthChartService.deletePlayer(index);
  }

  onReordered() {
    this.depthChartService.generatePairings();
  }
}
