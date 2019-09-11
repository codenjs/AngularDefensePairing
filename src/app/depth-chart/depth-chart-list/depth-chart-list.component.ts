import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DepthChartMoveEventArgs } from '../depth-chart-move-event-args';
import { ListItem } from 'src/app/shared/list-item';

@Component({
  selector: 'app-depth-chart-list',
  templateUrl: './depth-chart-list.component.html',
  styleUrls: ['./depth-chart-list.component.css']
})
export class DepthChartListComponent implements OnInit {
  @Input() items: ListItem[];
  @Input() dragDropDisabled: boolean;
  @Input() emptyMessage: string;
  @Output() reordered = new EventEmitter<DepthChartMoveEventArgs>();
  @Output() deleted = new EventEmitter<number>();
  isDragActive: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    this.reordered.emit(new DepthChartMoveEventArgs(event.previousIndex, event.currentIndex));
  }

  delete(index: number) {
    this.deleted.emit(index);
  }

  isDeleteClickable(currentIndex: number): boolean {
    // Delete is not clickable when any item is being dragged or the list is disabled
    return !this.isDragActive && !this.dragDropDisabled;
  }
}
