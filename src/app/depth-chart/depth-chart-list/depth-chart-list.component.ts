import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DepthChartListItem } from '../depth-chart-list-item';

@Component({
  selector: 'app-depth-chart-list',
  templateUrl: './depth-chart-list.component.html',
  styleUrls: ['./depth-chart-list.component.css']
})
export class DepthChartListComponent implements OnInit {
  @Input() items: DepthChartListItem[];
  @Input() dragDropDisabled: boolean;
  @Input() emptyMessage: string;
  @Output() reordered = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.reordered.emit();
  }
}
