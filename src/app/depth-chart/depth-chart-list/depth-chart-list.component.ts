import { Component, Input, OnInit } from '@angular/core';
import { DepthChartListItem } from '../depth-chart-list-item';

@Component({
  selector: 'app-depth-chart-list',
  templateUrl: './depth-chart-list.component.html',
  styleUrls: ['./depth-chart-list.component.css']
})
export class DepthChartListComponent implements OnInit {
  @Input() items: DepthChartListItem[];
  @Input() emptyMessage: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
