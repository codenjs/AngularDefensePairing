import { Component, OnInit } from '@angular/core';
import { DepthChartService } from '../depth-chart.service';
import { ListItem } from 'src/app/shared/list-item';

@Component({
  selector: 'app-depth-chart-pairings',
  templateUrl: './depth-chart-pairings.component.html',
  styleUrls: ['./depth-chart-pairings.component.css']
})
export class DepthChartPairingsComponent implements OnInit {
  items: ListItem[];

  constructor(private depthChartService: DepthChartService) {
    this.items = this.depthChartService.getPairings();
  }
  ngOnInit() {
  }

}
