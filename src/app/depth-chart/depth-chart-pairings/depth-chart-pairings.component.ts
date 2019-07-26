import { Component, OnInit } from '@angular/core';
import { DepthChartListItem } from '../depth-chart-list-item';
import { DepthChartService } from '../depth-chart.service';

@Component({
  selector: 'app-depth-chart-pairings',
  templateUrl: './depth-chart-pairings.component.html',
  styleUrls: ['./depth-chart-pairings.component.css']
})
export class DepthChartPairingsComponent implements OnInit {
  items: DepthChartListItem[];

  constructor(private depthChartService: DepthChartService) {
    this.items = this.depthChartService.getPairings();
  }
  ngOnInit() {
  }

}
