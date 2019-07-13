import { Component, OnInit } from '@angular/core';
import { DepthChartListItem } from '../depth-chart-list-item';
import { DepthChartService } from '../depth-chart.service';

@Component({
  selector: 'app-depth-chart-list',
  templateUrl: './depth-chart-list.component.html',
  styleUrls: ['./depth-chart-list.component.css']
})
export class DepthChartListComponent implements OnInit {
  items: DepthChartListItem[];

  constructor(private depthChartService: DepthChartService) {
    this.items = this.depthChartService.getPlayers();
  }

  ngOnInit(): void {
  }
}
