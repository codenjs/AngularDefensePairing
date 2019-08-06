import { Component, Input } from '@angular/core';
import { DepthChartListItem } from 'src/app/depth-chart/depth-chart-list-item';

@Component({
  selector: 'app-list-item-empty',
  templateUrl: './list-item-empty.component.html',
  styleUrls: ['./list-item-empty.component.css']
})
export class ListItemEmptyComponent {
  @Input() items: DepthChartListItem[];
  @Input() message: string;
}
